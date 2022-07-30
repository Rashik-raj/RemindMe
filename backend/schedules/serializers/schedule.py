from rest_framework import serializers

from schedules.models import Schedule
from users.serializers.user import UserDetailSerializer


class ScheduleSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    class Meta:
        model = Schedule
        exclude = ("created_at", "updated_at")
