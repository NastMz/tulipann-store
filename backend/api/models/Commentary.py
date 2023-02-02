from django.db import models
from .Product import Product
from .User import User
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class CommentaryManager(models.Manager):
    """
    Manager for the Commentary model.
    """
    def create_commentary(self, rate, **extra_fields):
        """
        Creates a new Commentary instance with the given data.

        Args:
            rate (int): The rating of the commentary, must be positive.
            **extra_fields: Extra fields to add to the commentary instance.

        Returns:
            Commentary: The created commentary instance.

        Raises:
            ValueError: If rate and extra_fields are not provided.
        """
        if not rate and not extra_fields:
            raise ValueError('You must fill in all fields')
        id = f'commentary{Commentary.objects.all().count() + 1}'
        commentary = self.model(id=id,
                                rate=rate,
                                **extra_fields)
        commentary.save(using=self._db)
        return commentary


class Commentary(SoftDeleteModel):
    """
    A model representing a commentary made by a user about a product.
    """
    id = models.CharField(primary_key=True, max_length=13, db_column='commentary_id')
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
        return f'{self.user.firstName} (rate {self.rate} - {self.product.name})'
