from rest_framework import serializers
from ..models import Image


class ImageCrudSerializer(serializers.ModelSerializer):
    image_name = serializers.CharField(max_length=255)
    hash = serializers.CharField(max_length=255)

    class Meta:
        model = Image
        fields = (
            'image_name',
            'hash',
            'product')

    def create(self, validated_data):
        return Image.objects.create_image(**validated_data)