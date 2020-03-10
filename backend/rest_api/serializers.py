from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = (
            'username',
            'password',
            'type',
            'company',
        )
