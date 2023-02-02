from django.db import models
from .Product import Product
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class ImageManager(models.Manager):
    """
    Manager for the Image model. This class is responsible for creating new Image instances.
    """

    def create_image(self, src, **extra_fields):
        """
        Creates a new Image instance with the given image name and any additional fields provided.
        Args:
            src (str): Required. The direction of the image.
            **extra_fields (kwargs): Additional fields to be added to the Image object.

        Returns:
            Image: An Image object with the given parameters.

        Raises:
            ValueError: If src is not provided.
        """
        if not src and not extra_fields:
            raise ValueError('You must fill in all fields')
        id = f'image{Image.objects.all().count() + 1}'
        image = self.model(id=id,
                           src=src,
                           **extra_fields)
        image.save(using=self._db)
        return image


class Image(SoftDeleteModel):
    """
    The Image model represents an image associated with a Product.
    """
    id = models.CharField(primary_key=True, max_length=8, db_column='image_id')
    src = models.CharField(max_length=255)
    hash = models.CharField(max_length=255)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    objects = ImageManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_image'

    def __str__(self):
        return self.src
