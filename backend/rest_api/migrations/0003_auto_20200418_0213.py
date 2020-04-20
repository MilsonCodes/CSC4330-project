# Generated by Django 3.0.5 on 2020-04-18 02:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0002_auto_20200415_2109'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 5, 19, 2, 13, 37, 965754), null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='bio',
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='skills',
            field=models.TextField(blank=True, null=True),
        ),
    ]