import uuid
from django.db import models
from .User import User
from .PaymentMethod import PaymentMethod
from .State import State
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class OrderManager(models.Manager):

    def create_order(self, user, **extra_fields):
        if not user and not extra_fields:
            raise ValueError('You must fill in all fields')
        order = self.model(user=user,
                           **extra_fields)
        order.save(using=self._db)
        return order


class Order(SoftDeleteModel):
    order_id = models.CharField(primary_key=True, default=uuid.uuid4().hex, editable=False, max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)
    state = models.ForeignKey(State, on_delete=models.CASCADE)

    objects = OrderManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_order'

    def __str__(self):
        return f'{self.user.first_name} ({self.order_id})'
