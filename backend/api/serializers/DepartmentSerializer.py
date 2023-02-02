from rest_framework import serializers
from ..models import Department


class DepartmentSerializer(serializers.ModelSerializer):
    def serialize_get_crud(department):
        return {
            'id': department.id,
            'name': department.name
        }

    class Meta:
        model = Department
        fields = (
            'name',
            )

