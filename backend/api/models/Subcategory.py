from django.db import models
from .Category import Category
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class SubcategoryManager(models.Manager):

    def create_subcategory(self, subcategory_name, category):
        if not subcategory_name and not category:
            raise ValueError('You must fill in all fields')
        subcategory_id = f'subcategory{Subcategory.objects.all().count() + 1}'
        subcategory = self.model(subcategory_id=subcategory_id,
                                 subcategory_name=subcategory_name,
                                 category=category)
        subcategory.save(using=self._db)
        return subcategory


class Subcategory(SoftDeleteModel):
    subcategory_id = models.CharField(primary_key=True, max_length=14)
    subcategory_name = models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    objects = SubcategoryManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_subcategory'

    def __str__(self):
        return self.subcategory_name
