from rest_framework import serializers
from ..models import Role


class RoleSerializer(serializers.ModelSerializer):
    def serialize_get_crud(role):
        return {
            'id': role.id,
            'name': role.name
        }

    class Meta:
        model = Role
        fields = (
            'name',
            )

