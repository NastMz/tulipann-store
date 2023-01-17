from django.db import models
from .Product import Product
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class ImageManager(models.Manager):

    def create_image(self, image_name, **extra_fields):
        if not image_name and not extra_fields:
            raise ValueError('You must fill in all fields')
        image_id = f'image{Image.objects.all().count() + 1}'
        image = self.model(image_id=image_id,
                           image_name=image_name,
                           **extra_fields)
        image.save(using=self._db)
        return image


class Image(SoftDeleteModel):
    image_id = models.CharField(primary_key=True, max_length=8)
    image_name = models.CharField(max_length=255)
    hash = models.CharField(max_length=255)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    objects = ImageManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_image'

    def __str__(self):
        return self.image_name
