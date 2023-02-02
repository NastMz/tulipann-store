from django.db import models


class SoftDeleteManager(models.Manager):
    """
    Restore the current instance by setting is_deleted to False.
    """

    def get_queryset(self):
        """
        Return a queryset containing all objects where is_deleted is False.
        """
        return super().get_queryset().filter(is_deleted=False)
