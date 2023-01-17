from django.db import models
from .Specification import Specification
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class FeatureManager(models.Manager):

    def create_feature(self, feature_name, **extra_fields):
        if not feature_name and not extra_fields:
            raise ValueError('You must fill in all fields')
        feature_id = f'feature{Feature.objects.all().count() + 1}'
        feature = self.model(feature_id=feature_id,
                             feature_name=feature_name,
                             **extra_fields)
        feature.save(using=self._db)
        return feature


class Feature(SoftDeleteModel):
    feature_id = models.CharField(primary_key=True, max_length=10)
    feature_name = models.CharField(max_length=20)
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
        return f'{self.feature_name} ({self.specification.summary})'
