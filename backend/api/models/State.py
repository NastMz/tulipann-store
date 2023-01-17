from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class StateManager(models.Manager):

    def create_state(self, state_name):
        if not state_name:
            raise ValueError('You must put a name for the state')
        state_id = f'state{State.objects.all().count() + 1}'
        state = self.model(state_id=state_id,
                           state_name=state_name)
        state.save(using=self._db)
        return state


class State(SoftDeleteModel):
    state_id = models.CharField(primary_key=True, max_length=8)
    state_name = models.CharField(max_length=20)

    objects = StateManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_state'

    def __str__(self):
        return self.state_name
