from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import datetime
import logging


# Create your models here.
# This will be used to create the database schemas
# AFTER EDITING THIS FILE YOU MUST RUN THE FOLLOWING COMMANDS:
# python manage.py makemigrations
# python manage.py migrate

STATUS = [('Pending', 'Pending'), ('Rejected',
                                   'Rejected'), ('Accepted', 'Accepted')]
TYPES = [('Profile', 'Profile'), ('Employee',
                                      'Employee'), ('Manager', 'Manager'), ('Stakeholder', 'Stakeholder'), ('Administrator', 'Administrator')]


class Address(models.Model):  # Model for addresses of employees and companies
    address1 = models.CharField(  # Number and street name
        "Address line 1", max_length=1024, blank=True, )
    address2 = models.CharField(  # Additional information
        "Address line 2", max_length=1024, blank=True, )
    zip_code = models.CharField(
        "ZIP / Postal code", max_length=12, )  # ZIP code
    city = models.CharField("City", max_length=1024, )  # City
    country = models.CharField("Country", max_length=32, )  # Country

    def __str__(self):
        return self.address1 + " " + self.city


class Company(models.Model):  # Table for storing companies
    name = models.CharField(max_length=64, )  # Company name
    # Where the company operates
    address = models.ForeignKey(Address, models.CASCADE, )
    description = models.CharField(
        max_length=256, null=True)  # Info about the company
    key = models.CharField(max_length=1024, blank=True)

    def save(self, *args, **kwargs):
        key = self.name + ": " + self.address.city
        super(Company, self).save(*args, **kwargs)

    def __str__(self):
        return self.name + ", " + self.address.city


class Association(models.Model):  # Group of companies
    name = models.CharField(max_length=64,)
    description = models.CharField(max_length=256, null=True)
    address = models.ForeignKey(Address, models.CASCADE,)
    companies = models.ManyToManyField(Company)

    def __str__(self):
        return self.name


class Profile(models.Model):  # Abstract model for all managers, employees, and Profiles
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField('first', max_length=64,)  # First name
    last_name = models.CharField('last', max_length=64,)  # Last name
    address = models.ForeignKey(
        Address, models.CASCADE, null=True)  # Place of residence
    # Profiles can upload a resume
    resume = models.FileField(blank=True, null=True)
    # Only for managers/search committee members
    manager = models.BooleanField(default=False, )
    # If Profile.company is not null, Profile is employee
    company = models.ForeignKey(Company, models.CASCADE, null=True, )
    admin = models.BooleanField(default=False)
    stakeholder = models.BooleanField(default=False)
    type = models.CharField(max_length=16, choices=TYPES, default='Profile',)

    def save(self, *args, **kwargs):
        if self.company:
            self.type = 'Employee'
        if self.manager:
            self.type = 'Manager'
        if self.stakeholder:
            self.type = 'Stakeholder'
        if self.admin:
            self.type = 'Administrator'
        super(Profile, self).save(*args, **kwargs)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_Profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_Profile(sender, instance, **kwargs):
    try:
        instance.profile.save()
    except:
        print('No User associated with Profile')

class Committee(models.Model):  # Search committee in charge of applications
    name = models.CharField(max_length=1056, null=True)
    # Managers that are part of committee
    members = models.ManyToManyField(Profile)

    def __str__(self):
        return self.name


class Listing(models.Model):  # Job posting model
    title = models.CharField(max_length=1024, )  # Position available
    description = models.CharField(
        max_length=1024, )  # Description of work load
    # Date listing ends, default is one month from now
    date = models.DateTimeField(null=True, blank=True)
    active = models.BooleanField(default=True)  # True only for open positions
    company = models.ForeignKey(Company, models.CASCADE, )
    # Committee/Manager that controls the listing
    committee = models.ForeignKey(Committee, models.CASCADE, )
    # True when Profile must already work for the company
    internal_only = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.date = datetime.datetime.now()+datetime.timedelta(days=31)
        super(Listing, self).save(*args, **kwargs)

    def __str__(self):
        return self.title + ", " + self.company.address.city


class Application(models.Model):  # Link between Listing and Profile
    Profile = models.OneToOneField(
        Profile, models.CASCADE)  # Person applying for job
    listing = models.ForeignKey(Listing, models.CASCADE)  # Listing applied for
    # Either pending, accepted, or rejected
    status = models.CharField(max_length=8, choices=STATUS, default='Pending',)
    # resume of associated Profile

    def __str__(self):
        return str(self.listing) + "- " + self.Profile.last_name + ": " + self.status
