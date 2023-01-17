from rest_framework import serializers
from ..models import State


class StateCrudSerializer(serializers.ModelSerializer):
    state_name = serializers.CharField(max_length=20)

    class Meta:
        model = State
        fields = ('state_name',)
    
    def validate(self, args):
        state_name = args.get('state_name', None)
        if State.all_objects.filter(state_name=state_name).exists():
            raise serializers.ValidationError({'state_name': ('state already exists')})
        return super().validate(args)

    def create(self, validated_data):
        return State.objects.create_state(**validated_data)