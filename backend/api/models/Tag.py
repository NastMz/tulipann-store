from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class TagManager(models.Manager):

    def create_tag(self, tag_name):
        if not tag_name:
            raise ValueError('You must put a name for the tag')
        tag_id = f'tag{Tag.objects.all().count() + 1}'
        tag = self.model(tag_id=tag_id,
                         tag_name=tag_name)
        tag.save(using=self._db)
        return tag


class Tag(SoftDeleteModel):
    tag_id = models.CharField(primary_key=True, max_length=5)
    tag_name = models.CharField(max_length=20)

    objects = TagManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_tag'

    def __str__(self):
        return self.tag_name
