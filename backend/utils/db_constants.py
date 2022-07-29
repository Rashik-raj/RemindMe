from django.db.models import TextChoices


class ScheduleInterval(TextChoices):
    ANNUALLY = "ANNUALLY"
    SEMI_ANNUALLY = "SEMI ANNUALLY"
    MONTHLY = "MONTHLY"
    QUARTERLY = "QUARTERLY"


class EmailStatus(TextChoices):
    INITIATED = "INITIATED"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"
