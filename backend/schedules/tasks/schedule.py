from datetime import date

from dateutil.relativedelta import relativedelta

from celery_app import app
from emails.models import Email
from schedules.models import Schedule
from utils.db_constants import EmailStatus


@app.task(name='send_schedule_email')
def send_schedule_mail(schedule_id, email_id):
    schedule = Schedule.objects.get(id=schedule_id)
    schedule.send_schedule_email()
    schedule.email_set.filter(id=email_id).update(status=EmailStatus.SUCCESS)
    return f"Successfully sent email for schedule id {schedule.id}"


@app.task(name="send_all_scheduled_emails")
def send_all_scheduled_emails():
    today = date.today()
    three_day_before = today + relativedelta(days=3)
    two_day_before = today + relativedelta(days=2)
    one_day_before = today + relativedelta(days=1)
    for date_to_send in (three_day_before, two_day_before, one_day_before, today):
        for schedule in Schedule.objects.filter(next_date=date_to_send):
            email = Email.objects.create(schedule_id=schedule.id, user=schedule.user)
            schedule.send_schedule_email()
            email.status = EmailStatus.SUCCESS
            email.save(update_fields=['status'])
            if date_to_send == today:
                schedule.update_next_date()
