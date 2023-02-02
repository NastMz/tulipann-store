from django.db import models
from .Category import Category
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class ProductManager(models.Manager):
    """
    Custom manager for the Product model.
    """

    def create_product(self, name, **extra_fields):
        """
        Creates a new Product instance with the provided information.

        Args:
            name (str): The name of the product.
            **extra_fields: Additional fields for the Product model.

        Returns:
            Product: The newly created Product instance.

        Raises:
            ValueError: If the name and extra_fields are not provided.
        """
        if not name and not extra_fields:
            raise ValueError('You must fill in all fields')
        id = f'product{Product.objects.all().count() + 1}'
        product = self.model(id=id,
                             name=name,
                             **extra_fields)
        product.save(using=self._db)
        return product


class Product(SoftDeleteModel):
    """
    Model representing a Product in the system.
    """
    id = models.CharField(primary_key=True, max_length=10, db_column='product_id')
    name = models.CharField(max_length=50, db_column='product_name')
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
        return self.name
