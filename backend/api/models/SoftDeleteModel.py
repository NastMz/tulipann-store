from django.db import models
from .SoftDeleteManager import SoftDeleteManager


class SoftDeleteModel(models.Model):
    is_deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()
    all_objects = models.Manager()

    def soft_delete(self):
        self.is_deleted = True
        self.save()

    def restore(self):
        self.is_deleted = False
        self.save()

    class Meta:
        abstract = True
