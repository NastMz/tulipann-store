from django.db import models
from .Category import Category
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class SubcategoryManager(models.Manager):
    """
    Manager class for the Subcategory model.
    """

    def create_subcategory(self, name, category):
        """
        Create a new subcategory instance.

        Args:
            name (str): The name of the subcategory.
            category (Category): The category that the subcategory belongs to.

        Returns:
            Subcategory: The created subcategory instance.
        """
        if not name and not category:
            raise ValueError('You must fill in all fields')
        id = f'subcategory{Subcategory.objects.all().count() + 1}'
        subcategory = self.model(id=id,
                                 name=name,
                                 category=category)
        subcategory.save(using=self._db)
        return subcategory


class Subcategory(SoftDeleteModel):
    """
    Represent a subcategory of a product
    """
    id = models.CharField(primary_key=True, max_length=14, db_column='subcategory_id')
    name = models.CharField(max_length=50, db_column='subcategory_name')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    objects = SubcategoryManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_subcategory'

    def __str__(self):
        return self.name
