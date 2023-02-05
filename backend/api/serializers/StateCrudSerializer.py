from rest_framework import serializers
from ..models import State


class StateCrudSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=20)

    class Meta:
        model = State
        fields = ('name',
                  'percentage')
    
    def validate(self, args):
        name = args.get('name', None)
        percentage = args.get('percentage', None)
        messages = []
        if State.all_objects.filter(name=name).exists():
            messages.append('Este estado ya se encuentra registrado')

        if percentage < 0:
            messages.append('El porcentaje no puede ser menor a cero')

        if messages:
            raise serializers.ValidationError(messages)
        return super().validate(args)

    def create(self, validated_data):
        return State.objects.create_state(**validated_data)
