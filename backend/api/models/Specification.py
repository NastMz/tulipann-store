from django.db import models
from .Product import Product
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class SpecificationManager(models.Manager):
    """
    Manager class for Specification model.
    """
    def create_specification(self, summary, **extra_fields):
        """
        Method to create a new Specification object.
        Args:
            summary (str): Summary of specification.
            **extra_fields: Additional fields for specification.

        Returns:
            Specification: The created specification.

        Raises:
            ValueError: If summary and extra_fields are not provided.
        """
        if not summary and not extra_fields:
            raise ValueError('You must fill in all fields')
        id = f'specification{Specification.objects.all().count() + 1}'
        specification = self.model(id=id,
                                   summary=summary,
                                   **extra_fields)
        specification.save(using=self._db)
        return specification


class Specification(SoftDeleteModel):
    """
    Specification model representing a product specification.
    """
    id = models.CharField(primary_key=True, max_length=16, db_column='specification_id')
    summary = models.CharField(max_length=255)
    product = models.OneToOneField(Product, on_delete=models.CASCADE)

    objects = SpecificationManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_specification'

    def __str__(self):
        return f'{self.product.name} ({self.summary})'
