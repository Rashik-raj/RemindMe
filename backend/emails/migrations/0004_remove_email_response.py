# Generated by Django 4.0.6 on 2022-07-30 09:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('emails', '0003_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='email',
            name='response',
        ),
    ]