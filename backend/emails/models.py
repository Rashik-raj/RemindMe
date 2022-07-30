from django.db import models

# Create your models here.
from schedules.models import Schedule
from users.models import User
from utils.base_model import TimeStampedModel
from utils.db_constants import EmailStatus


class Email(TimeStampedModel):
    class Meta:
        db_table = 'email'
        verbose_name = 'Email'
        verbose_name_plural = 'Emails'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='schedule_emails')
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    status = models.CharField(choices=EmailStatus.choices, max_length=13, default=EmailStatus.INITIATED)
    response = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Email of schedule {self.schedule.name} of {self.user}"
