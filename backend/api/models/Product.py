from django.db import models
from .Category import Category
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class ProductManager(models.Manager):

    def create_product(self, product_name, **extra_fields):
        if not product_name and not extra_fields:
            raise ValueError('You must fill in all fields')
        product_id = f'product{Product.objects.all().count() + 1}'
        product = self.model(product_id=product_id,
                             product_name=product_name,
                             **extra_fields)
        product.save(using=self._db)
        return product


class Product(SoftDeleteModel):
    product_id = models.CharField(primary_key=True, max_length=10)
    product_name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    stock = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    objects = ProductManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_product'

    def __str__(self):
        return self.product_name
