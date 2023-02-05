from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class StateManager(models.Manager):
    """
    This class is a manager for the State model that implements a custom method
    to create a new state object.
    """

    def create_state(self, name, percentage):
        """
        This method creates a new state object.

        Args:
        - name (str): The name of the state to be created.

        Returns:
        - State: The newly created state object.
        """
        if not name:
            raise ValueError('You must put a name for the state')
        id = f'state{State.objects.all().count() + 1}'
        state = self.model(id=id,
                           name=name,
                           percentage=percentage)
        state.save(using=self._db)
        return state


class State(SoftDeleteModel):
    """
    This class representing a state order.
    """
    id = models.CharField(primary_key=True, max_length=8, db_column='state_id')
    name = models.CharField(max_length=20, db_column='state_name')
    percentage = models.PositiveIntegerField()

    objects = StateManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_state'

    def __str__(self):
        return self.name
