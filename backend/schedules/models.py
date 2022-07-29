from django.contrib.auth.models import User
from django.db import models

from utils.base_model import TimeStampedModel
from utils.db_constants import ScheduleInterval


class Schedule(TimeStampedModel):
    class Meta:
        db_table = 'schedule'
        verbose_name = 'Schedule'
        verbose_name_plural = 'Schedules'

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500)
    interval = models.CharField(choices=ScheduleInterval.choices, max_length=13, default=ScheduleInterval.ANNUALLY)
    date = models.DateField()
    next_date = models.DateField(blank=True)

    def __str__(self):
        return f"Schedule {self.name} of {self.user}"
