from rest_framework import serializers
from .models import *

# This file defines the data included in the response for the associated models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = (
            'username',
            'email',
            'password',
            'type',
            'company',
            'first_name',
            'last_name',
            'address',
            'admin',
            'manager'
        )


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = (
            'address1',
            'address2',
            'city',
            'zip_code',
            'country'
        )


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = (
            'name',
            'description',
            'address',
        )


class AssociationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Association
        fields = (
            'name',
            'description',
            'address',
            'companies',
        )


class CommitteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Committee
        fields = (
            'name',
            'members',
        )


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = (
            'title',
            'description',
            'date',
            'active',
            'company',
            'committee',
            'internal_only',
        )


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = (
            'applicant',
            'listing',
            'status',
        )
