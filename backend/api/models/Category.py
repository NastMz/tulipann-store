from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class CategoryManager(models.Manager):

    def create_category(self, category_name, image, hash):
        if not category_name and not image:
            raise ValueError('You must put a name and image to the category')
        category_id = f'category{Category.objects.all().count() + 1}'
        category = self.model(category_id=category_id,
                              category_name=category_name,
                              image=image,
                              hash=hash)
        category.save(using=self._db)
        return category


class Category(SoftDeleteModel):
    category_id = models.CharField(primary_key=True, max_length=10)
    category_name = models.CharField(max_length=50)
    image = models.CharField(max_length=255)
    hash = models.CharField(max_length=255)

    objects = CategoryManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_category'

    def __str__(self):
        return self.category_name
