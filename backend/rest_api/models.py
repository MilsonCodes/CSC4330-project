from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import datetime
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

# Create your models here.
# This will be used to create the database schemas
# AFTER EDITING THIS FILE YOU MUST RUN THE FOLLOWING COMMANDS:
# python manage.py makemigrations
# python manage.py migrate

STATUS = [('Pending', 'Pending'), ('Rejected',
                                   'Rejected'), ('Accepted', 'Accepted')]
TYPES = [('Applicant', 'Applicant'), ('Employee',
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

    def __str__(self):
        return self.name + ", " + self.address.city


class Association(models.Model):  # Group of companies
    name = models.CharField(max_length=64,)
    description = models.CharField(max_length=256, null=True)
    address = models.ForeignKey(Address, models.CASCADE,)
    companies = models.ManyToManyField(Company)

    def __str__(self):
        return self.name


class Profile(models.Model):  # Abstract model for all managers, employees, and applicants
    user = models.OneToOneField(User, on_delete=models.CASCADE) # Connect to user model
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
    # Description of user
    bio = models.CharField(max_length=1024, null=True, blank=True)
    # User skills
    skills = models.TextField(null=True, blank=True)
    type = models.CharField(max_length=16, choices=TYPES, default='Applicants',)

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
def save_user_profile(sender, instance, **kwargs):
    try:
        instance.profile.save()
    except:
        print('No User associated with Profile')

class Committee(models.Model):  # Search committee in charge of applications
    name = models.CharField(max_length=1056, null=True)
    # Managers that are part of committee
    members = models.ManyToManyField(Profile)
    company = models.ForeignKey(Company, models.CASCADE, null=True)
    def __str__(self):
        return self.name


class Listing(models.Model):  # Job posting model
    title = models.CharField(max_length=1024, )  # Position available
    description = models.CharField(
        max_length=1024, )  # Description of work load
    # Date listing ends, default is one month from now
    date = models.DateTimeField(null=True, blank=True, default=datetime.datetime.now()+datetime.timedelta(days=31))
    active = models.BooleanField(default=True)  # True only for open positions
    company = models.ForeignKey(Company, models.CASCADE, )
    # Committee/Manager that controls the listing
    committee = models.ForeignKey(Committee, models.CASCADE, )
    # True when Profile must already work for the company
    internal_only = models.BooleanField(default=False)
    # Key words to search applicant resumes
    key_words = models.TextField()

    def __str__(self):
        return self.title + ", " + self.company.address.city


class Application(models.Model): 
    choices = [
        (1, 'Optimal Candidate'),
        (2, 'Considerable Candidate'),
        (3, 'Standard Candidate')
    ]
    # Link between Listing and Profile
    profile = models.ForeignKey(Profile, models.CASCADE)  # Person applying for job
    listing = models.ForeignKey(Listing, models.CASCADE)  # Listing applied for
    # Either pending, accepted, or rejected
    status = models.CharField(max_length=8, choices=STATUS, default='Pending',)
    # date submitted
    date_submitted = models.DateTimeField(auto_now_add=True)
    # priority of applicant compared to listing
    priority = models.IntegerField(choices=choices, default=3)

    # Override save method
    def save(self, *args, **kwargs):
        # Get job listing
        listing = self.listing
        # Get applicant
        applicant = self.profile
        # Get applicant resume
        resume = applicant.resume
        # Find job listing key words and split on comma
        key_words = listing.key_words.split(', ')
        # Find user skills and split on comma
        skills = applicant.skills.split(', ')
        # Max key words a user could match with
        total_points = len(key_words)
        # Number of elements in key words but not in skills
        difference = len(list(set(key_words)-set(skills)))
        # Calculate amount of key words met out of total
        points = total_points - difference
        # Check resume exists
        if resume.name is not '':
            # Open file for read only
            with open(resume.name, 'rb') as res_file:
                # Read first line of file
                line = res_file.readline().decode('latin-1')
                # Loop while there are more lines
                while line:
                    # Split line into words
                    words = line.split(' ')
                    # Compare words to key_words
                    difference = len(list(set(key_words) - set(words)))
                    # Gain points for matching words
                    point_gain = total_points - difference
                    points += point_gain
                    # Read next line
                    line = res_file.readline().decode('latin-1')
        # Highest priority from 51-100% match
        if (points > total_points/2):
            self.priority = 1
        # Second priority from 10-50% match
        elif (points >= total_points/10):
            self.priority = 2
        # Third priority for less than 10%
        else:
            self.priority = 3
        super(Application, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.listing) + "- " + self.profile.last_name + ": " + self.status
