from django.db import models

from apps.abstract.models import CommonModel


class TranslationString(CommonModel):
    text = models.CharField(max_length=255, blank=True, unique=True, verbose_name='Key')
    frontend_text = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.text

    def translated_string(self):
      if self.frontend_text:
        return self.frontend_text
      return self.text
