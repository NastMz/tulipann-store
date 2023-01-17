from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class DepartmentManager(models.Manager):

    def create_department(self, department_name):
        if not department_name:
            raise ValueError('You must put a name for the department')
        department_id = f'department{Department.objects.all().count() + 1}'
        department = self.model(department_id=department_id,
                                department_name=department_name)
        department.save(using=self._db)
        return department


class Department(SoftDeleteModel):
    department_id = models.CharField(primary_key=True, max_length=12)
    department_name = models.CharField(unique=True, max_length=30)

    objects = DepartmentManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_department'

    def __str__(self):
        return self.department_name
