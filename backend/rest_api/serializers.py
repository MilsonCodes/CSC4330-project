from rest_framework import serializers
from .models import *

# This file defines the data included in the response for the associated models

# Define data organization for user model
class UserSerializer(serializers.ModelSerializer):
    # Organize profile data
    profile = serializers.PrimaryKeyRelatedField(read_only=True, many=False)
    class Meta:
        #Register to user model
        model = User
        fields = (
            'id', # User id
            'username', # Username (for logging in, password ommitted)
            'email', # email address used for registration
            'profile', # profile associated with user
        )

# Define data organization for Address model
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = (
            'id', 
            'address1', # Line 1 of address
            'address2', # Line 2 of address
            'city', # City
            'zip_code', # Postal code
            'country', # Country
        )

# Class for organizing company data
class CompanySerializer(serializers.ModelSerializer):
    # Format Address based on serializer
    address = LocationSerializer(required=True)
    class Meta:
        model = Company
        fields = (
            'id',
            'name', # Company name
            'description', # Company mission
            'address', # Company Location
        )

# Class for organizing profile data
class ProfileSerializer(serializers.ModelSerializer):
    # Format User based on serializer
    user = UserSerializer(required=True)
    # Format Company based on serializer
    company = CompanySerializer(required=True)
    address = LocationSerializer(required=True)
    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
            'type', # Manager, Applicant, Stakeholder, Applicant
            'company',
            'first_name',
            'last_name',
            'address',
            'admin',
            'manager'
        )

# Class for organizing Association data
class AssociationSerializer(serializers.ModelSerializer):
    address = LocationSerializer(required=True)
    companies = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Association
        fields = (
            'id',
            'name',
            'description',
            'address',
            'companies',
        )

# Class for organizing Committee data
class CommitteeSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Committee
        fields = (
            'name',
            'members',
        )

# class for organizing Listing data
class ListingSerializer(serializers.ModelSerializer):
    company = CompanySerializer(required=True)
    class Meta:
        model = Listing
        fields = (
            'id',
            'title',
            'description',
            'date',
            'active',
            'company',
            'committee',
            'internal_only',
        )

# Class for organizing Listing data for company pages
class ShortListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = (
            'id',
            'title',
            'description',
            'date',
            'active',
            'internal_only',
        )

# Class for organizing Application data
class ApplicationSerializer(serializers.ModelSerializer):
    Profile = ProfileSerializer(required=True)
    listing = ListingSerializer(required=True)
    class Meta:
        model = Application
        fields = (
            'id',
            'Profile',
            'listing',
            'status',
        )
