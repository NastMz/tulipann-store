from django.db import models

from .Department import Department
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class City(SoftDeleteModel):
    """
    Model representing a city.
    """
    id = models.CharField(primary_key=True, max_length=12, db_column='city_id')
    name = models.CharField(unique=True, max_length=30, db_column='city_name')
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_city'

    def __str__(self):
        return self.name
