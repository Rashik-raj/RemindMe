from dateutil.relativedelta import relativedelta
from django.db import models
from django.template.loader import render_to_string
from django.utils.html import strip_tags

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
        if not self.id:
            self.update_next_date(save=False)
        if self.id:
            previous_schedule = Schedule.objects.get(id=self.id)
            if previous_schedule.date != self.date:
                self.update_next_date(save=False)
        super().save(*args, **kwargs)

    def update_next_date(self, save=True):
        if save:
            self.next_date = self.next_date + relativedelta(**self.get_interval_dict())
            self.save()
        else:
            self.next_date = self.date + relativedelta(**self.get_interval_dict())

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

    def send_schedule_email(self):
        email_context = {
            "first_name": self.user.first_name,
            "schedule_name": self.name,
            "schedule_description": self.description,
            "schedule_date": self.date,
        }
        html_message = render_to_string('emails/schedule.html', email_context)
        message = strip_tags(html_message)
        subject = f"Schedule: {self.name} remainder"
        self.user.email_user(subject, message, html_message=html_message)
