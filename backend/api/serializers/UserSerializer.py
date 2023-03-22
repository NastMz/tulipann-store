from rest_framework import serializers
from api.models import *


class UserSerializer(serializers.ModelSerializer):
    def serialize_front(user):
        role = Role.all_objects.get(id=user.role.id)
        return {
            'firstName': user.firstName,
            'lastName': user.lastName,
            'email': user.email,
            'phone': user.phone,
            'departmentId': user.department.id,
            'cityId': user.city.id,
            'roleId': role.id
        }

    def serialize_get_crud(user):
        role = Role.all_objects.get(id=user.role.id)
        return {
            'id': user.id,
            'firstName': user.firstName,
            'lastName': user.lastName,
            'email': user.email,
            'phone': user.phone,
            'departmentId': user.department.id,
            'cityId': user.city.id,
            'roleId': role.id
        }

    class Meta:
        model = User
        fields = (
            'firstName',
            'lastName',
            'email',
            'phone',
            'city',
            'role'
        )


class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, write_only=True)

    def serialize_get_self(user):
        return {
            'id': user.id,
            'firstName': user.firstName,
            'lastName': user.lastName,
            'email': user.email,
            'phone': user.phone,
            'departmentId': user.department.id,
            'cityId': user.city.id,
            'address': user.address
        }

    class Meta:
        model = User
        fields = (
            'id',
            'firstName',
            'lastName',
            'email',
            'password',
            'phone',
            'department',
            'city',
            'address',
        )
