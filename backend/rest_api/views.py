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
from rest_framework.decorators import api_view
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
from django.shortcuts import get_object_or_404

# Debugging tool
logger = logging.getLogger(__name__)

# Create your views here.
# All these viewsets contain basic CRUD methods
# The queryset is the data to be used from the database
# The serializer class identifies which data format to use

class AuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer

    # Blacklist user's refresh token
    def sign_out(self, request, *args, **kwargs):
        # Get token from header and splice name
        token = RefreshToken(request.data['refresh'])
        # Make refresh token invalid
        token.blacklist()
        data = { 'message': 'Logout successful' }
        return Response(data, status=status.HTTP_200_OK)


    # Registration method
    def create(self, request, *args, **kwargs):
        # Splice all data from request
        profile = request.data['profile']
        address = profile['address']
        first = profile['first_name']
        last = profile['last_name']
        bio = profile['bio']
        skills = profile['skills']
        company = Company.objects.get(id=profile['company'])
        admin = profile['admin']
        holder = profile['stakeholder']
        man = profile['manager']
        line1 = address['line1']
        line2 = address['line2']
        zip_c = address['zip']
        city = address['city']
        country = address['country']
        # Use serializer to format data
        serializer = self.get_serializer(data=request.data)
        # Check validity
        serializer.is_valid(raise_exception=True)
        # Create User instance
        self.perform_create(serializer)
        # Get user
        usr = User.objects.get(username=request.data['username'])
        # register token to user
        token = RefreshToken.for_user(usr)
        # Prepare return data
        data = {
            'refresh': str(token),
            'access': str(token.access_token),
            'user': serializer.data
        }
        # Create address object and save
        address_obj = Address.objects.create(address1=line1, address2=line2, zip_code=zip_c, city=city, country=country)
        address_obj.save()
        # Create matching profile object and save
        pro = Profile.objects.create(first_name=first, last_name=last, address=address_obj, company=company, admin=admin, stakeholder=holder, manager=man, user=usr, bio=bio, skills=skills)
        pro.save()
        return Response(data, status=status.HTTP_201_CREATED)

# API endpoint that allows users to be viewed or edited.
class UserViewSet(viewsets.ModelViewSet):
    # Get all profiles
    queryset = Profile.objects.all().order_by('type')
    # Format profiles based on serializer
    serializer_class = ProfileSerializer
    # Require token permissions to access associated routes
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        data = request.data
        usr = User.objects.get(id=data['user']['id'])
        address = None
        if usr is not None:
            usr.username = data['user']['username']
            usr.email = data['user']['email']
            usr.save()
        company = Company.objects.get(id=data['company']['id'])
        try:
            address = Address.objects.get(id=data['address']['id'])
        except:
            pass
        pro = Profile.objects.get(id=data['id'])
        if pro is not None:
            if company is not None:
                pro.company = company
            if address is None:
                address = Address.objects.create(address1=data['address']['address1'], address2=data['address']['address2'], city=data['address']['city'], zip_code=data['address']['zip_code'], country=data['address']['country'])
                address.save()
            pro.address = address
            pro.first_name = data['first_name']
            pro.last_name = data['last_name']
            pro.bio = data['bio']
            pro.skills = data['skills']
            address.save()
            pro.save()
        data = pro
        return Response(data, status=status.HTTP_200_OK)

    def get_queryset(self):
        # Get specific user from url
        user = self.request.query_params.get('user', None)
        # Set data set to be default (all profiles)
        queryset = self.queryset
        # Check user exists
        if user is not None:
            # Set data set to be profiles matching user id
            queryset = Profile.objects.filter(user=user)
        # Return data set
        return queryset

# API enpoint for accessing Company Model
class CompanyViewSet(viewsets.ModelViewSet):
    # Get all companies by default
    queryset = Company.objects.all().order_by('name')
    serializer_class = CompanySerializer
    permission_classes = (IsAuthenticated,)

    # Method for listing company with its active listings
    def listings(self, request, **kwargs):
        # Get companys matching parameter in url and format data based on serializer
        queryset = [Company.objects.get(id=kwargs['company_id'])]
        serializer = CompanySerializer(queryset, many=True)
        # Get listings that are active and by the company, then format data based on serializer
        listset = Listing.objects.filter(company=kwargs['company_id'], active=True)
        listdata = ShortListingSerializer(listset, many=True)
        # Format data for HTTP response
        data = {
            'company': serializer.data,
            'listings': listdata.data
        }
        return Response(data, status=status.HTTP_200_OK)

# API endpoint for access Address model
class LocationViewSet(viewsets.ModelViewSet):
    # Get all addresses
    queryset = Address.objects.all().order_by('id')
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)

# API endpoint for accessing Company model [read only]
class CompanyList(generics.ListAPIView):
    queryset = Company.objects.all().order_by('name')
    serializer_class = CompanySerializer
    # No authentication, used for user registration

# API end point for accessing Association model
class AssociationViewSet(viewsets.ModelViewSet):
    queryset = Association.objects.all().order_by('name')
    serializer_class = AssociationSerializer
    permission_classes = (IsAuthenticated,)

# API endpoint for accessing Committee model
class CommitteeViewSet(viewsets.ModelViewSet):
    queryset = Committee.objects.all().order_by('name')
    serializer_class = CommitteeSerializer
    permission_classes = (IsAuthenticated,)

# API enpoint for accessing Listing model
class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all().order_by('date')
    serializer_class = ListingSerializer
    permission_classes = (IsAuthenticated,)

# API endpoint for accessing Application model
class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by('status')
    serializer_class = ApplicationSerializer
    permission_classes = (IsAuthenticated,)
