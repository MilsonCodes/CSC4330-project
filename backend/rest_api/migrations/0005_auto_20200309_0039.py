# Generated by Django 3.0.3 on 2020-03-09 00:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0004_auto_20200309_0039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicant',
            name='resume',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='listing',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 4, 9, 0, 39, 17, 289757)),
        ),
    ]
