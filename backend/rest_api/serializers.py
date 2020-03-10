from rest_framework import serializers
from .models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Applicant
        fields = (
            'username',
            'password',
            'type'
        )
