from django.db import models
from .Order import Order
from .Product import Product
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class OrderProductManager(models.Manager):

    def create_order_product(self, quantity, order, product):
        if not quantity and not order and not product:
            raise ValueError('You must fill in all fields')
        order_product = self.model(quantity=quantity,
                                   order=order,
                                   product=product)
        order_product.save(using=self._db)
        return order_product


class OrderProduct(SoftDeleteModel):
    order_product_id = models.AutoField(primary_key=True)
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
        return f'{self.order.order_id} ({self.product.product_name})'
