from rest_framework import serializers
from ..models import City


class CitySerializer(serializers.ModelSerializer):
    def serialize_get_crud(city):
        return {
            'id': city.id,
            'name': city.name,
            'departmentId': city.department.id
        }

    class Meta:
        model = City
        fields = (
            'name',
            )

