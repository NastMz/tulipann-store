from django.db import models
from .Specification import Specification
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class FeatureManager(models.Manager):
    """
    This class is the manager for the Feature model, it handles the create_feature() function
    which creates a new Feature object and saves it in the database.
    """

    def create_feature(self, name, **extra_fields):
        """
        This function creates a new Feature object and saves it in the database.

        Args:
            name (str): The name of the feature.
            **extra_fields: Additional fields for the Feature object.

        Returns:
            feature (Feature): The created feature object.
        """
        if not name and not extra_fields:
            raise ValueError('You must fill in all fields')
        id = f'feature{Feature.objects.all().count() + 1}'
        feature = self.model(id=id,
                             name=name,
                             **extra_fields)
        feature.save(using=self._db)
        return feature


class Feature(SoftDeleteModel):
    """
    This class defines the Feature model.
    The Feature model represents a feature of a product.
    """
    id = models.CharField(primary_key=True, max_length=10, db_column='feature_id')
    name = models.CharField(max_length=20, db_column='feature_name')
    title = models.CharField(max_length=20)
    description = models.TextField()
    image = models.CharField(max_length=255)
    hash = models.CharField(max_length=255)
    specification = models.ForeignKey(Specification, on_delete=models.CASCADE)

    objects = FeatureManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_feature'

    def __str__(self):
        return f'{self.name} ({self.specification.summary})'
