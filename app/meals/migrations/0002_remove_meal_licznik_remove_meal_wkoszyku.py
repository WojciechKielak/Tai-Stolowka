# Generated by Django 4.2.2 on 2023-06-13 20:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='meal',
            name='licznik',
        ),
        migrations.RemoveField(
            model_name='meal',
            name='wkoszyku',
        ),
    ]
