from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from .models import *
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    # API endpoint that allows users to be viewed or edited.
    queryset = Applicant.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserList(generics.ListAPIView):
    queryset = Applicant.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = Applicant.objects.all()
    serializer_class = UserSerializer
