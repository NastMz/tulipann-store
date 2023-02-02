from rest_framework import serializers
from ..models import State


class StateCrudSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=20)

    class Meta:
        model = State
        fields = ('name',)
    
    def validate(self, args):
        name = args.get('name', None)
        if State.all_objects.filter(name=name).exists():
            raise serializers.ValidationError({'name': 'state already exists'})
        return super().validate(args)

    def create(self, validated_data):
        return State.objects.create_state(**validated_data)