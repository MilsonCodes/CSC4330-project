# Generated by Django 3.0.3 on 2020-03-09 04:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0016_auto_20200309_0352'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 4, 9, 4, 44, 55, 959550)),
        ),
    ]
