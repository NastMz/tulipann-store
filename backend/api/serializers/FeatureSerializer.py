from rest_framework import serializers
from ..models import Feature


class FeatureSerializer(serializers.ModelSerializer):
    def serialize_front(specification):
        db_features = list(Feature.all_objects.prefetch_related('specification').filter(specification=specification))

        features = []
        for feature in db_features:
            features.append({
                'id': feature.feature_id,
                'name': feature.feature_name,
                'title': feature.title,
                'description': feature.description.replace("\\n", "\n"),
                'image': feature.image,
                'hash': feature.hash,
            })
        return features

    def serialize_get_crud(feature):
        return {
            'feature_id': feature.feature_id,
            'feature_name': feature.feature_name,
            'title': feature.title,
            'description': feature.description.replace("\\n", "\n"),
            'image': feature.image,
            'hash': feature.hash,
            'specification': feature.specification.specification_id
        }

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
