from django.shortcuts import render
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response

# Create your views here.
# All these viewsets contain basic CRUD methods
# The queryset is the data to be used from the database
# The serializer class identifies which data format to use


class UserViewSet(viewsets.ModelViewSet):
    # API endpoint that allows users to be viewed or edited.
    queryset = Applicant.objects.all().order_by('type')
    serializer_class = UserSerializer


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all().order_by('country')
    serializer_class = LocationSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('name')
    serializer_class = CompanySerializer


class AssociationViewSet(viewsets.ModelViewSet):
    queryset = Association.objects.all().order_by('name')
    serializer_class = AssociationSerializer


class CommitteeViewSet(viewsets.ModelViewSet):
    queryset = Committee.objects.all().order_by('name')
    serializer_class = CommitteeSerializer


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all().order_by('date')
    serializer_class = ListingSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by('status')
    serializer_class = ApplicationSerializer
