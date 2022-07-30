"""
run command celery -A celery_app.app worker -l INFO
run command celery -A celery_app.app beat -l INFO
run command celery -A celery_app.app flower --port=5555
"""
import os

import django
from celery import Celery
from celery.beat import crontab

from load_env import env

os.environ.setdefault('DJANGO_SETTINGS_MODULE', env('DJANGO_SETTINGS_MODULE'))
django.setup()

app = Celery('remindme', broker=env('CELERY_BROKER_URL'), backend=env('CELERY_BACKEND_URL'))
app.conf.update({'timezone': 'Asia/Kathmandu'})
app.conf.update(
    {
        "beat_schedule": {
            "periodic_send_all_scheduled_emails": {
                "task": "send_all_scheduled_emails",
                "schedule": crontab(hour=0, minute=0),
            }
        },
    }
)


app.autodiscover_tasks()
