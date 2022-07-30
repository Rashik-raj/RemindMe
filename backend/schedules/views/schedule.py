from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from emails.models import Email
from schedules.models import Schedule
from schedules.serializers.schedule import ScheduleSerializer
from schedules.tasks.schedule import send_schedule_mail
from utils.permissions import SchedulePermission


class ScheduleViewSet(ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [SchedulePermission]

    def get_queryset(self):
        get_all = self.request.query_params.get('all', 'false').lower() == 'true'
        if get_all:
            return self.queryset.all()
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = ScheduleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['POST'], url_path="preview", url_name="schedule email preview")
    def schedule_email_preview(self, request, *args, **kwargs):
        schedule = self.get_object()
        email = Email.objects.create(schedule_id=schedule.id, user=schedule.user)
        send_schedule_mail.delay(schedule_id=schedule.id, email_id=email.id)
        return Response(status=status.HTTP_200_OK)
