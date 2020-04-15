# Generated by Django 3.0.5 on 2020-04-15 17:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0007_auto_20200415_1730'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='priority',
            field=models.IntegerField(choices=[(1, 'Optimal Candidate'), (2, 'Considerable Candidate'), (3, 'Standard Candidate')], default=3),
        ),
        migrations.AlterField(
            model_name='listing',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 5, 16, 17, 47, 2, 686903), null=True),
        ),
    ]
