# Generated by Django 3.0.3 on 2020-03-09 03:32

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0012_auto_20200309_0329'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicant',
            name='address',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='rest_api.Address'),
        ),
        migrations.AlterField(
            model_name='listing',
            name='date',
            field=models.DateField(default=datetime.datetime(2020, 4, 9, 3, 32, 40, 639183)),
        ),
    ]