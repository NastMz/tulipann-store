from django.db import models
from .Product import Product
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class SpecificationManager(models.Manager):

    def create_specification(self, summary, **extra_fields):
        if not summary and not extra_fields:
            raise ValueError('You must fill in all fields')
        specification_id = f'specification{Specification.objects.all().count() + 1}'
        specification = self.model(specification_id=specification_id,
                                   summary=summary,
                                   **extra_fields)
        specification.save(using=self._db)
        return specification


class Specification(SoftDeleteModel):
    specification_id = models.CharField(primary_key=True, max_length=16)
    summary = models.CharField(max_length=255)
    product = models.OneToOneField(Product, on_delete=models.CASCADE)

    objects = SpecificationManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_specification'

    def __str__(self):
        return f'{self.product.product_name} ({self.summary})'
