from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import datetime
import logging


# Create your models here.
# This will be used to create the database schemas
# AFTER EDITING THIS FILE YOU MUST RUN THE FOLLOWING COMMANDS:
# python manage.py makemigrations todos
# python manage.py migrate todos

STATUS = [('Pending', 'Pending'), ('Rejected',
                                   'Rejected'), ('Accepted', 'Accepted')]


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
    description = models.CharField(max_length=256, )  # Info about the company

    def __str__(self):
        return self.name + ", " + self.address.city


class Association(models.Model):  # Group of companies
    name = models.CharField(max_length=64,)
    description = models.CharField(max_length=256,)
    address = models.ForeignKey(Address, models.CASCADE,)
    companies = models.ManyToManyField(Company)

    def __str__(self):
        return self.name


class Applicant(models.Model):  # Abstract model for all managers, employees, and applicants
    user = models.ForeignKey(
        User, on_delete=models.CASCADE,)  # Link to Django model
    name = models.CharField(max_length=64,)  # First name
    last_name = models.CharField(max_length=64,)  # Last name
    email = models.CharField(max_length=64,)  # Contact email
    address = models.ForeignKey(
        Address, models.CASCADE, null=True)  # Place of residence
    # Applicants can upload a resume
    resume = models.FileField(blank=True, null=True)
    # Only for managers/search committee members
    manager = models.BooleanField(default=False, )
    # If Applicant.company is not null, applicant is employee
    company = models.ForeignKey(Company, models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name + " " + self.last_name + ": " + str(self.company)


# Method for linking user and applicant creation
@receiver(post_save, sender=User)
def create_user_applicant(sender, instance, created, **kwargs):
    if created:
        Applicant.objects.create(user=instance)


@receiver(post_save, sender=User)  # Method for updating user model changes
def save_user_profile(sender, instance, **kwargs):
    try:
        instance.applicant.save()
    except:
        logging.warning("No applicant associatied with user: " + str(instance))


class Committee(models.Model):  # Search committee in charge of applications
    name = models.CharField(max_length=1056, null=True)
    # Managers that are part of committee
    members = models.ManyToManyField(Applicant)

    def __str__(self):
        return self.name


class Listing(models.Model):  # Job posting model
    title = models.CharField(max_length=1024, )  # Position available
    description = models.CharField(
        max_length=1024, )  # Description of work load
    # Date listing ends, default is one month from now
    date = models.DateField(
        default=datetime.datetime.now()+datetime.timedelta(days=31))
    active = models.BooleanField(default=True)  # True only for open positions
    company = models.ForeignKey(Company, models.CASCADE, )
    # Committee/Manager that controls the listing
    committee = models.ForeignKey(Committee, models.CASCADE, )
    # True when applicant must already work for the company
    internal_only = models.BooleanField(default=False)

    def __str__(self):
        return self.title + ", " + self.company.address.city


class Application(models.Model):  # Link between Listing and Applicant
    applicants = models.ManyToManyField(
        Applicant, )  # Person applying for job
    listing = models.ForeignKey(Listing, models.CASCADE)  # Listing applied for
    # Either pending, accepted, or rejected
    status = models.CharField(max_length=8, choices=STATUS, default='Pending',)
    # resume of associated applicant

    def __str__(self):
        return str(self.listing) + "- " + self.applicant.last_name + ": " + self.status
