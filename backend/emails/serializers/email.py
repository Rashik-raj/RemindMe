from rest_framework import serializers

from emails.models import Email
from schedules.serializers.schedule import ScheduleSerializer
from users.serializers.user import UserDetailSerializer


class EmailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    schedule = ScheduleSerializer(read_only=True)

    class Meta:
        model = Email
        fields = ("id", "user", "schedule", "status")
