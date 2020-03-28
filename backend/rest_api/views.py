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
from django.contrib.auth import authenticate
import logging
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


logger = logging.getLogger(__name__)

# Create your views here.
# All these viewsets contain basic CRUD methods
# The queryset is the data to be used from the database
# The serializer class identifies which data format to use

class AuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer

    def sign_out(request):
        token = RefreshToken(request.headers['Authentication'][7:])
        token.blacklist()
        data = {'count': queryset.count()}
        return Response(data, status=status.HTTP_201_CREATED)


    # Registration method
    def create(self, request, *args, **kwargs):
        profile = request.data['profile']
        address = profile['address']
        first = profile['first_name']
        last = profile['last_name']
        company = Company.objects.get(id=profile['company'])
        admin = profile['admin']
        holder = profile['stakeholder']
        man = profile['manager']
        line1 = address['line1']
        line2 = address['line2']
        zip_c = address['zip']
        city = address['city']
        country = address['country']
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        usr = User.objects.get(username=request.data['username'])
        token = RefreshToken.for_user(usr)
        headers = self.get_success_headers(serializer.data)
        header = {
            'refresh': str(token),
            'access': str(token.access_token),
        }
        address_obj = Address.objects.create(address1=line1, address2=line2, zip_code=zip_c, city=city, country=country)
        address_obj.save()
        pro = Profile.objects.create(first_name=first, last_name=last, address=address_obj, company=company, admin=admin, stakeholder=holder, manager=man, user=usr)
        pro.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=header)

class UserViewSet(viewsets.ModelViewSet):
    # API endpoint that allows users to be viewed or edited.
    queryset = Profile.objects.all().order_by('type')
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)



class LocationViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all().order_by('country')
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('name')
    serializer_class = CompanySerializer
    permission_classes = (IsAuthenticated,)


class AssociationViewSet(viewsets.ModelViewSet):
    queryset = Association.objects.all().order_by('name')
    serializer_class = AssociationSerializer
    permission_classes = (IsAuthenticated,)


class CommitteeViewSet(viewsets.ModelViewSet):
    queryset = Committee.objects.all().order_by('name')
    serializer_class = CommitteeSerializer
    permission_classes = (IsAuthenticated,)


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all().order_by('date')
    serializer_class = ListingSerializer
    permission_classes = (IsAuthenticated,)


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by('status')
    serializer_class = ApplicationSerializer
    permission_classes = (IsAuthenticated,)
