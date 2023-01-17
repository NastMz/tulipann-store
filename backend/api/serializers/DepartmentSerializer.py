from rest_framework import serializers
from ..models import Department


class DepartmentSerializer(serializers.ModelSerializer):
    def serialize_get_crud(department):
        return {
            'department_id': department.department_id,
            'department_name': department.department_name
        }

    class Meta:
        model = Department
        fields = (
            'department_name',
            )

