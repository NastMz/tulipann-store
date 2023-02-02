from rest_framework import serializers
from ..models import Image


class ImageSerializer(serializers.ModelSerializer):
    def serialize_front(product):
        db_images = list(Image.all_objects.prefetch_related('product').filter(product=product))

        images = []
        for image in db_images:
            images.append({
                'src': image.src,
                'hash': image.hash
            })

        return images

    def serialize_get_crud(image):
        return {
            'id': image.id,
            'image': {
                'src': image.src,
                'hash': image.hash
            },
            'productId': image.product.id
        }

    class Meta:
        model = Image
        fields = (
            'src',
            'hash',
            'product'
        )
