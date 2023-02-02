from django.db import models
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class TagManager(models.Manager):
    """
    Custom manager for Tag model.
    """

    def create_tag(self, name):
        """
        Creates a new Tag instance.

        Args:
            name (str): The name of the tag.

        Returns:
            Tag: The created Tag instance.
        """
        if not name:
            raise ValueError('You must put a name for the tag')
        id = f'tag{Tag.objects.all().count() + 1}'
        tag = self.model(id=id,
                         name=name)
        tag.save(using=self._db)
        return tag


class Tag(SoftDeleteModel):
    """
    Model representing a Tag of an Article.
    """
    id = models.CharField(primary_key=True, max_length=5, db_column='tag_id')
    name = models.CharField(max_length=20, db_column='tag_name')

    objects = TagManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_tag'

    def __str__(self):
        return self.name
