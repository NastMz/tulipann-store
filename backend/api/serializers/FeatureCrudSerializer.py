from rest_framework import serializers
from ..models import Feature


class FeatureCrudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = (
            'name',
            'title',
            'description',
            'image',
            'hash',
            'specification'
        )

    def validate(self, args):
        name = args.get('name', None)
        specification = args.get('specification', None)
        messages = []

        if Feature.all_objects.filter(name=name, specification=specification).exists():
            messages.append('La característica ya se encuentra registrada')
            raise serializers.ValidationError(messages)

        return super().validate(args)

    def create(self, validated_data):
        return Feature.objects.create_feature(**validated_data)