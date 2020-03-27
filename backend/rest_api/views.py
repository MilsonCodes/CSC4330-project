from django.shortcuts import render
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import status
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
import logging

logger = logging.getLogger(__name__)

# Create your views here.
# All these viewsets contain basic CRUD methods
# The queryset is the data to be used from the database
# The serializer class identifies which data format to use

class AuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Registration method
    def create(self, request, *args, **kwargs):
        # token = Token.objects.create()
        logger.info(request)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class UserViewSet(viewsets.ModelViewSet):
    # API endpoint that allows users to be viewed or edited.
    queryset = Profile.objects.all().order_by('type')
    serializer_class = ProfileSerializer


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
