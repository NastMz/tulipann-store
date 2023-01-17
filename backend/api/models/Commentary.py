from django.db import models
from .Product import Product
from .User import User
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class CommentaryManager(models.Manager):

    def create_commentary(self, rate, **extra_fields):
        if not rate and not extra_fields:
            raise ValueError('You must fill in all fields')
        commentary_id = f'commentary{Commentary.objects.all().count() + 1}'
        commentary = self.model(commentary_id=commentary_id,
                                rate=rate,
                                **extra_fields)
        commentary.save(using=self._db)
        return commentary


class Commentary(SoftDeleteModel):
    commentary_id = models.CharField(primary_key=True, max_length=13)
    rate = models.PositiveIntegerField()
    text = models.CharField(max_length=255)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    objects = CommentaryManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_commentary'

    def __str__(self):
        return f'{self.user.first_name} (rate {self.rate} - {self.product.product_name})'
