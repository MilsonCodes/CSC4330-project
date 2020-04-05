from rest_framework import serializers
from .models import *

# This file defines the data included in the response for the associated models
class UserSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(read_only=True, many=False)
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'profile',
        )

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = (
            'id',
            'address1',
            'address2',
            'city',
            'zip_code',
            'country'
        )


class CompanySerializer(serializers.ModelSerializer):
    address = LocationSerializer(required=True)
    class Meta:
        model = Company
        fields = (
            'id',
            'name',
            'description',
            'address',
        )

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    company = CompanySerializer(required=True)
    address = LocationSerializer(required=True)
    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
            'type',
            'company',
            'first_name',
            'last_name',
            'address',
            'admin',
            'manager'
        )

class AssociationSerializer(serializers.ModelSerializer):
    address = LocationSerializer(required=True)
    companies = CompanySerializer(required=True)
    class Meta:
        model = Association
        fields = (
            'id',
            'name',
            'description',
            'address',
            'companies',
        )


class CommitteeSerializer(serializers.ModelSerializer):
    members = ProfileSerializer(required=True)
    class Meta:
        model = Committee
        fields = (
            'name',
            'members',
        )


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

class ApplicationSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    listing = ListingSerializer(required=True)
    class Meta:
        model = Application
        fields = (
            'id',
            'profile',
            'listing',
            'status',
        )
