from rest_framework import serializers
from ..models import Specification, Feature
from ..serializers import FeatureSerializer


class SpecificationSerializer(serializers.ModelSerializer):
    def serialize_front(product):
        db_spec = Specification.all_objects.filter(product=product.id)

        features = []

        for spec in db_spec:
            if Feature.all_objects.filter(specification=spec.id).exists():
                features.append(FeatureSerializer.serialize_front(specification=spec.id))

        specs = {
            'summary': spec.summary,
            'options': features
        }

        return specs

    def serialize_get_crud(specification):
        return {
            'id': specification.id,
            'summary': specification.summary,
            'productId': specification.product.id
        }

    class Meta:
        model = Specification
        fields = (
            'summary',
            'product'
        )


