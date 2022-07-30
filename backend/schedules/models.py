from dateutil.relativedelta import relativedelta

from django.db import models

from users.models import User
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

    def save(self, *args, **kwargs):
        self.update_next_date(save=False)
        super().save(*args, **kwargs)

    def update_next_date(self, save=True):
        self.next_date = self.date + relativedelta(**self.get_interval_dict())
        if save:
            self.save()

    def get_interval_dict(self):
        if self.interval == ScheduleInterval.ANNUALLY:
            return {'years': 1}
        elif self.interval == ScheduleInterval.SEMI_ANNUALLY:
            return {'months': 6}
        elif self.interval == ScheduleInterval.QUARTERLY:
            return {'months': 3}
        else:
            return {'months': 1}

    def is_owner(self, user):
        return self.user == user
