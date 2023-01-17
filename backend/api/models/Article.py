import base64
from django.db import models
from django.utils import timezone
from .User import User
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class ArticleManager(models.Manager):

    def create_article(self, title, summary, banner, user, content, hash):
        if not title:
            raise ValueError('You must fill in all fields')
        article_id = f'article{Article.objects.all().count() + 1}'
        now = timezone.now()
        binary_data = base64.b64decode(content)
        article = self.model(article_id=article_id,
                             title=title,
                             summary=summary,
                             banner=banner,
                             hash=hash,
                             date=now,
                             content=bytes(binary_data),
                             user=user)
        article.save(using=self._db)
        return article


class Article(SoftDeleteModel):
    article_id = models.CharField(primary_key=True, max_length=10)
    title = models.CharField(max_length=255)
    summary = models.CharField(max_length=255)
    content = models.BinaryField()
    banner = models.CharField(max_length=255)
    hash = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    objects = ArticleManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_article'

    def __str__(self):
        return self.title
