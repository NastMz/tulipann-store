from rest_framework import serializers
from ..models import State


class StateSerializer(serializers.ModelSerializer):
    def serialize_get_crud(state):
        return {
            'id': state.id,
            'name': state.name
        }

    class Meta:
        model = State
        fields = (
            'name',
            )

