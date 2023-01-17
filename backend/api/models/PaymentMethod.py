from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class PaymentManager(models.Manager):

    def create_payment(self, payment_name):
        if not payment_name:
            raise ValueError('You must put a name for the payment method')
        payment_id = f'payment{PaymentMethod.objects.all().count() + 1}'
        payment = self.model(payment_id=payment_id,
                             payment_name=payment_name)
        payment.save(using=self._db)
        return payment


class PaymentMethod(SoftDeleteModel):
    payment_id = models.CharField(primary_key=True, max_length=9)
    payment_name = models.CharField(max_length=30)

    objects = PaymentManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_paymentmethod'

    def __str__(self):
        return self.payment_name
