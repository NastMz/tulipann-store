from django.db import models
from .SoftDeleteManager import SoftDeleteManager


class SoftDeleteModel(models.Model):
    """
    Abstract model that adds soft delete functionality to an inheriting model.
    """
    is_deleted = models.BooleanField(default=False)
    objects = SoftDeleteManager()
    all_objects = models.Manager()

    def soft_delete(self):
        """
        Soft delete the current instance by setting is_deleted to True.
        """
        self.is_deleted = True
        self.save()

    def restore(self):
        """
        Restore the current instance by setting is_deleted to False.
        """
        self.is_deleted = False
        self.save()

    class Meta:
        abstract = True
