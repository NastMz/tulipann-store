from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class RoleManager(models.Manager):
    """
    Custom manager for the Role model.
    """
    def create_role(self, name):
        """
        Creates a new role object.

        Args:
            name (str): The name of the role.

        Returns:
            Role: The created role object.

        Raises:
            ValueError: If the name is not provided.
        """
        if not name:
            raise ValueError('You must put a name for the role')
        id = f'role{Role.objects.all().count() + 1}'
        role = self.model(id=id,
                          name=name)
        role.save(using=self._db)
        return role


class Role(SoftDeleteModel):
    """
    Model representing a role within the system.
    """
    id = models.CharField(primary_key=True, max_length=6, db_column='role_id')
    name = models.CharField(max_length=20, db_column='role_name')

    objects = RoleManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_role'

    def __str__(self):
        return self.name
