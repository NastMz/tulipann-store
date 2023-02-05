from rest_framework import serializers
from ..models import State


class StateSerializer(serializers.ModelSerializer):
    def serialize_get_crud(state):
        return {
            'id': state.id,
            'name': state.name,
            'percentage': state.percentage
        }

    class Meta:
        model = State
        fields = (
            'name',
            'percentage'
            )

