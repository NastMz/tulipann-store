from rest_framework import serializers
from ..models import Feature


class FeatureCrudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = (
            'feature_name',
            'title',
            'description',
            'image',
            'hash',
            'specification'
        )

    def validate(self, args):
        feature_name = args.get('feature_name', None)
        specification = args.get('specification', None)
        if Feature.all_objects.filter(feature_name=feature_name, specification=specification).exists():
            raise serializers.ValidationError({'Feature': ('Feature already exists')})
        return super().validate(args)

    def create(self, validated_data):
        return Feature.objects.create_feature(**validated_data)