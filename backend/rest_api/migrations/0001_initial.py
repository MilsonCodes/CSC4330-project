# Generated by Django 3.0.3 on 2020-03-09 00:28

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address1', models.CharField(blank=True, max_length=1024, verbose_name='Address line 1')),
                ('address2', models.CharField(blank=True, max_length=1024, verbose_name='Address line 2')),
                ('zip_code', models.CharField(max_length=12, verbose_name='ZIP / Postal code')),
                ('city', models.CharField(max_length=1024, verbose_name='City')),
                ('country', models.CharField(max_length=32, verbose_name='Country')),
            ],
        ),
        migrations.CreateModel(
            name='Applicant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('last_name', models.CharField(max_length=64)),
                ('email', models.CharField(max_length=64)),
                ('resume', models.FileField(null=True, upload_to='')),
                ('manager', models.BooleanField(default=False)),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.Address')),
            ],
        ),
        migrations.CreateModel(
            name='Committee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1056, null=True)),
                ('members', models.ManyToManyField(to='rest_api.Applicant')),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(max_length=256)),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.Address')),
            ],
        ),
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=1024)),
                ('description', models.CharField(max_length=1024)),
                ('date', models.DateField(default=datetime.datetime(2020, 4, 9, 0, 28, 29, 410528))),
                ('active', models.BooleanField(default=True)),
                ('internal_only', models.BooleanField(default=False)),
                ('committee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.Committee')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.Company')),
            ],
        ),
        migrations.CreateModel(
            name='Association',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(max_length=256)),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.Address')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.Company')),
            ],
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Rejected', 'Rejected'), ('Accepted', 'Accepted')], default=1, max_length=8)),
                ('appicant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.Applicant')),
                ('listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.Listing')),
            ],
        ),
        migrations.AddField(
            model_name='applicant',
            name='company',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='rest_api.Company'),
        ),
        migrations.AddField(
            model_name='applicant',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]