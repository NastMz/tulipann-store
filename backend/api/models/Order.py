import uuid
import random
from django.db import models

from .ShippingAddress import ShippingAddress
from .User import User
from .State import State
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


def uuid_hex():
    """
    Generates a unique hexadecimal identifier using uuid.uuid4()
    Returns:
        string of the hexadecimal identifier
    """
    return str(uuid.uuid4().hex)


class OrderManager(models.Manager):
    """
    Order Manager class that handles custom manager methods for the Order model.
    """

    def create_order(self, user, **extra_fields):
        """
        Creates a new Order instance.

        Args:
            user (User): User instance that the order is associated with.
            **extra_fields: Additional fields to be added to the Order instance.

        Returns:
            Order: The newly created Order instance.

        Raises:
            ValueError: If the user parameter is not passed.
        """
        if not user and not extra_fields:
            raise ValueError('You must fill in all fields')
        id = uuid_hex()
        order = self.model(id=id,
                           user=user,
                           **extra_fields)
        order.save(using=self._db)
        return order


class Order(SoftDeleteModel):
    """
    Order model that represents an order in the system.
    """
    id = models.CharField(primary_key=True, editable=False, max_length=255, db_column='order_id')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    address = models.ForeignKey(ShippingAddress, on_delete=models.CASCADE)
    shippingValue = models.PositiveIntegerField(db_column='shipping_value')
    details = models.JSONField()

    objects = OrderManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_order'

    def __str__(self):
        return f'{self.user.firstName} ({self.id})'
