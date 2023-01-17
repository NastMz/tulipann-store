from rest_framework import serializers
from ..models import State


class StateSerializer(serializers.ModelSerializer):
    def serialize_get_crud(state):
        return {
            'state_id': state.state_id,
            'state_name': state.state_name
        }

    class Meta:
        model = State
        fields = (
            'state_name',
            )

