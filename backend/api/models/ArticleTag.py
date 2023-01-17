from django.db import models
from .Article import Article
from .Tag import Tag
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class ArticleTagManager(models.Manager):

    def create_article_tag(self, article, tag):
        if not article and not tag:
            raise ValueError('You must fill in all fields')
        article_tag = self.model(article=article,
                                 tag=tag)
        article_tag.save(using=self._db)
        return article_tag


class ArticleTag(SoftDeleteModel):
    article_tag_id = models.AutoField(primary_key=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    objects = ArticleTagManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_articletag'
        unique_together = (('article', 'tag'),)

    def __str__(self):
        return f'{self.article_id} ({self.tag_id})'
