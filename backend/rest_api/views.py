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
        token.blacklist()
        data = { 'message': 'Logout successful' }
        return Response(data, status=status.HTTP_200_OK)


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
        # headers = self.get_success_headers(serializer.data)
        data = {
            'refresh': str(token),
            'access': str(token.access_token),
            'user': serializer.data
        }
        address_obj = Address.objects.create(address1=line1, address2=line2, zip_code=zip_c, city=city, country=country)
        address_obj.save()
        pro = Profile.objects.create(first_name=first, last_name=last, address=address_obj, company=company, admin=admin, stakeholder=holder, manager=man, user=usr)
        pro.save()
        return Response(data, status=status.HTTP_201_CREATED)

class UserViewSet(viewsets.ModelViewSet):
    # API endpoint that allows users to be viewed or edited.
    queryset = Profile.objects.all().order_by('type')
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        user = self.request.query_params.get('user', None)
        queryset = self.queryset
        if user is not None:
            queryset = Profile.objects.filter(user=user)
        return queryset


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all().order_by('id')
    serializer_class = LocationSerializer
    permission_classes = (IsAuthenticated,)


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('name')
    serializer_class = CompanySerializer
    permission_classes = (IsAuthenticated,)

    def listings(self, request, **kwargs):
        queryset = [Company.objects.get(id=kwargs['company_id'])]
        serializer = CompanySerializer(queryset, many=True)
        listset = Listing.objects.filter(company=kwargs['company_id'], active=True)
        listdata = ShortListingSerializer(listset, many=True)
        data = {
            'company': serializer.data,
            'listings': listdata.data
        }
        return Response(data, status=status.HTTP_200_OK)

class CompanyList(generics.ListAPIView):
    queryset = Company.objects.all().order_by('name')
    serializer_class = CompanySerializer

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
