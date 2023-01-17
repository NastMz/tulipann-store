from django.db import models
from .Subcategory import Subcategory
from .Product import Product
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class ProductSubcategoryManager(models.Manager):

    def create_product_subcategory(self, product, subcategory):
        if not subcategory and not product:
            raise ValueError('You must fill in all fields')
        product_subcategory = self.model(product=product,
                                         subcategory=subcategory)
        product_subcategory.save(using=self._db)
        return product_subcategory


class ProductSubcategory(SoftDeleteModel):
    product_subcategory_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE)

    objects = ProductSubcategoryManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_productsubcategory'
        unique_together = (('subcategory', 'product'),)

    def __str__(self):
        return f'{self.product.product_name} ({self.subcategory.subcategory_name})'
