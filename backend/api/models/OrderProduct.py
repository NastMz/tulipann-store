from django.db import models
from .Order import Order
from .Product import Product
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class OrderProductManager(models.Manager):
    """
    OrderProductManager handles the creation of OrderProduct instances.
    """
    def create_order_product(self, quantity, order, product):
        """
        Creates an OrderProduct instance with the given parameters and saves it to the database.
        Args:
            quantity (int): The quantity of the product in the order.
            order (Order): The order that the product belongs to.
            product (Product): The product being ordered.
        Returns:
            The newly created OrderProduct instance.
        """
        if not quantity and not order and not product:
            raise ValueError('You must fill in all fields')
        order_product = self.model(quantity=quantity,
                                   order=order,
                                   product=product)
        order_product.save(using=self._db)
        return order_product


class OrderProduct(SoftDeleteModel):
    """
    OrderProduct represents the relationship between an Order and a Product.
    """
    id = models.AutoField(primary_key=True, db_column='order_product_id')
    quantity = models.PositiveIntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    objects = OrderProductManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_orderproduct'
        unique_together = (('order', 'product'),)

    def __str__(self):
        return f'{self.order.id} ({self.product.name})'
