from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class RoleManager(models.Manager):

    def create_role(self, role_name):
        if not role_name:
            raise ValueError('You must put a name for the role')
        role_id = f'role{Role.objects.all().count() + 1}'
        role = self.model(role_id=role_id,
                          role_name=role_name)
        role.save(using=self._db)
        return role


class Role(SoftDeleteModel):
    role_id = models.CharField(primary_key=True, max_length=6)
    role_name = models.CharField(max_length=20)

    objects = RoleManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_role'

    def __str__(self):
        return self.role_name
