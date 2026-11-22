from django.db import models


class Article(models.Model):
    """An entry of the cabinet's gazette (growing notes, history, care)."""

    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    summary = models.CharField(max_length=240)
    body = models.TextField(help_text="Paragraphs separated by a blank line.")
    tags = models.JSONField(default=list, blank=True)
    published_on = models.DateField()

    class Meta:
        ordering = ["-published_on", "id"]

    def __str__(self) -> str:
        return self.title
