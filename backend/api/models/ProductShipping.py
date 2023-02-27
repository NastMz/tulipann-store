from django.db import models
from .Product import Product
from .Department import Department
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class ProductShippingManager(models.Manager):
    """
    Custom manager for the ProductShipping model.
    """

    def create_product_shipping(self, product, department):
        """
        Creates an ProductShipping object and saves it to the database.
        Args:
            product (Product): The product object.
            department (Department): The department for the product.
        Returns:
            ProductShipping: The created product with department object.
        """
        if not product and not department:
            raise ValueError('You must fill in all fields')
        product_department = self.model(product=product,
                                 department=department)
        product_department.save(using=self._db)
        return product_department


class ProductShipping(SoftDeleteModel):
    """
    Model representing a many-to-many relationship between products and departments.
    """
    id = models.AutoField(primary_key=True, db_column='product_shipping_id')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    objects = ProductShippingManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_productshipping'
        unique_together = (('product', 'department'),)

    def __str__(self):
        return f'{self.id} ({self.id})'
