from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class Department(SoftDeleteModel):
    """
    Model representing a department.
    """
    id = models.CharField(primary_key=True, max_length=14, db_column='department_id')
    name = models.CharField(unique=True, max_length=30, db_column='department_name')

    objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_department'

    def __str__(self):
        return self.name
