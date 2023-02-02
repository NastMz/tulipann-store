from django.db import models
from .Subcategory import Subcategory
from .Product import Product
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class ProductSubcategoryManager(models.Manager):
    """
    Custom manager for the ProductSubcategory model.
    """

    def create_product_subcategory(self, product, subcategory):
        """
        Create a new ProductSubcategory object.

        Args:
            product (Product): The Product object to be associated with this ProductSubcategory.
            subcategory (Subcategory): The Subcategory object to be associated with this ProductSubcategory.

        Returns:
            ProductSubcategory: The created ProductSubcategory object.

        Raises:
            ValueError: If product or subcategory is not provided.
        """
        if not subcategory and not product:
            raise ValueError('You must fill in all fields')
        product_subcategory = self.model(product=product,
                                         subcategory=subcategory)
        product_subcategory.save(using=self._db)
        return product_subcategory


class ProductSubcategory(SoftDeleteModel):
    """
    Model representing a product's association with a subcategory.
    """
    id = models.AutoField(primary_key=True, db_column='product_subcategory_id')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE)

    objects = ProductSubcategoryManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_productsubcategory'
        unique_together = (('subcategory', 'product'),)

    def __str__(self):
        return f'{self.product.name} ({self.subcategory.name})'
