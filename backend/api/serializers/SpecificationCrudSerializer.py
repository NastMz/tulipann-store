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
        if Specification.all_objects.filter(summary=summary).exists():
            raise serializers.ValidationError({'summary': ('summary already exists')})
        return super().validate(args)

    def create(self, validated_data):
        return Specification.objects.create_specification(**validated_data)