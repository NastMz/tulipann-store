from rest_framework import serializers
from api.models import *


class UserSerializer(serializers.ModelSerializer):
    def serialize_front(user):
        return {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone': user.phone,
            'city': user.city,
        }

    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'phone',
            'city',
            'role'
        )


class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, write_only=True)
    
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'password',
            'phone',
            'city',
            'address',
        )
