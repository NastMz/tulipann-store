from rest_framework import serializers
from ..models import Specification


class SpecificationCrudSerializer(serializers.ModelSerializer):
    summary = serializers.CharField(max_length=255)

    class Meta:
        model = Specification
        fields = (
            'summary',
            'product'
            )
    
    def validate(self, args):
        summary = args.get('summary', None)
        messages = []
        if Specification.all_objects.filter(summary=summary).exists():
            messages.append('Este resumen ya se encuentra registrado')
            raise serializers.ValidationError(messages)
        return super().validate(args)

    def create(self, validated_data):
        return Specification.objects.create_specification(**validated_data)