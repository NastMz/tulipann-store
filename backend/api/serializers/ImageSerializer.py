from rest_framework import serializers
from ..models import Image


class ImageSerializer(serializers.ModelSerializer):
    def serialize_front(product):
        db_images = list(Image.all_objects.prefetch_related('product').filter(product=product))

        images = []
        for image in db_images:
            images.append({
                'src': image.image_name,
                'hash': image.hash
            })

        return images

    def serialize_get_crud(image):
        return {
            'image_id': image.image_id,
            'image_name': image.image_name,
            'hash': image.hash,
            'product': image.product.product_id
        }

    class Meta:
        model = Image
        fields = (
            'image_name',
            'hash',
            'product'
        )
