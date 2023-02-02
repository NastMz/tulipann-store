from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class CategoryManager(models.Manager):
    """
    Manager for the Category model.
    """

    def create_category(self, name, image, hash):
        """
        Create a new category.

        Arguments:
            name (str): Name of the category.
            image (str): Image of the category.
            hash (str): Hash of the category.

        Returns:
            Category: The created category instance.
        """
        if not name and not image:
            raise ValueError('You must put a name and image to the category')
        id = f'category{Category.objects.all().count() + 1}'
        category = self.model(id=id,
                              name=name,
                              image=image,
                              hash=hash)
        category.save(using=self._db)
        return category


class Category(SoftDeleteModel):
    """
    Model for the category.
    """
    id = models.CharField(primary_key=True, max_length=10, db_column='category_id')
    name = models.CharField(max_length=50, db_column='category_name')
    image = models.CharField(max_length=255)
    hash = models.CharField(max_length=255)

    objects = CategoryManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_category'

    def __str__(self):
        return self.name
