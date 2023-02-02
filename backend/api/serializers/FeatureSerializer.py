from rest_framework import serializers
from ..models import Feature


class FeatureSerializer(serializers.ModelSerializer):
    def serialize_front(specification):
        db_features = list(Feature.all_objects.prefetch_related('specification').filter(specification=specification))

        features = []
        for feature in db_features:
            features.append({
                'id': feature.id,
                'name': feature.name,
                'title': feature.title,
                'description': feature.description.replace("\\n", "\n"),
                'image': {
                    'src': feature.image,
                    'hash': feature.hash
                }
            })
        return features

    def serialize_get_crud(feature):
        return {
            'id': feature.id,
            'name': feature.name,
            'title': feature.title,
            'description': feature.description.replace("\\n", "\n"),
            'image': {
                    'src': feature.image,
                    'hash': feature.hash
            },
            'specificationId': feature.specification.id
        }

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
