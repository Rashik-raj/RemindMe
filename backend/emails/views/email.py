from rest_framework.mixins import ListModelMixin
from rest_framework.viewsets import GenericViewSet

from emails.models import Email
from emails.serializers.email import EmailSerializer
from utils.permissions import SuperUserPermission


class EmailViewSet(ListModelMixin, GenericViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    permission_classes = (SuperUserPermission,)
