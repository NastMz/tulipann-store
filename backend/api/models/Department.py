from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class DepartmentManager(models.Manager):
    """
    Custom manager for the Department model.
    """

    def create_department(self, name):
        """
        Create a new department instance and save it to the database.

        Args:
            name (str): The name of the department.

        Returns:
            Department: The created department instance.

        Raises:
            ValueError: If name is not provided.
        """
        if not name:
            raise ValueError('You must put a name for the department')
        id = f'department{Department.objects.all().count() + 1}'
        department = self.model(id=id,
                                name=name)
        department.save(using=self._db)
        return department


class Department(SoftDeleteModel):
    """
    Model representing a department.
    """
    id = models.CharField(primary_key=True, max_length=12, db_column='department_id')
    name = models.CharField(unique=True, max_length=30, db_column='department_name')

    objects = DepartmentManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_department'

    def __str__(self):
        return self.name
