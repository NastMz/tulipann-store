from rest_framework import serializers
from ..models import Role


class RoleSerializer(serializers.ModelSerializer):
    def serialize_get_crud(role):
        return {
            'role_id': role.role_id,
            'role_name': role.role_name
        }

    class Meta:
        model = Role
        fields = (
            'role_name',
            )

