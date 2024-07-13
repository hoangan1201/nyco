from django.db import models
from tinymce import models as tinymce_models

from filer.fields.image import FilerImageField
from apps.abstract.models import StatusModel, OrderedModel, TranslatableStatusManager
from fluent_contents.models import PlaceholderField
from parler.models import TranslatableModel, TranslatedFields
from django.core.validators import URLValidator

class PageModel(StatusModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)

    class Meta:
        abstract = True


class AgencyItem(OrderedModel):
    title = models.CharField(max_length=255)
    image = FilerImageField(on_delete=models.CASCADE)
    description = models.TextField()
    link_title = models.CharField(max_length=255)
    link_url = models.CharField(max_length=255)

    def __str__(self):
        return self.title


# class ProgramLink(OrderedModel):
#     link_title = models.CharField(max_length=255)
#     link_url = models.CharField(max_length=255)
#
#     def __str__(self):
#         return self.link_title


class BasicPage(StatusModel, TranslatableModel):
    slug = models.SlugField(max_length=255, unique=True)
    translations = TranslatedFields(
        title=models.CharField(max_length=255),
    )
    content = PlaceholderField("article_content")

    # program_links = models.ManyToManyField(ProgramLink, blank=True)
    agencies = models.ManyToManyField(AgencyItem, blank=True)

    objects = TranslatableStatusManager()

    def __str__(self):
        return self.title



class LandingPage(PageModel):
    description = tinymce_models.HTMLField(null=True, blank=True)
    homepage_description=tinymce_models.HTMLField(null=True, blank=True)

    def __str__(self):
        return self.title


class MainNavigationItem(OrderedModel):
    title = models.CharField(max_length=255)
    hover_description = models.TextField()
    basic_page = models.ForeignKey('BasicPage', null=True, blank=True, on_delete=models.CASCADE)
    landing_page = models.ForeignKey('LandingPage', null=True, blank=True, on_delete=models.CASCADE, help_text="only landing pages should be common metrics and data stories")


S, T = "S", "T"
STATUSES = (
    (S, "Second"),
    (T, "Third"),
)

class OptionalSchemeURLValidator(URLValidator):
  def __call__(self, value):
    if '://' not in value and value.startswith('/'):
      # Validate as if it were http://
      value = 'http://site.com/' + value
    super(OptionalSchemeURLValidator, self).__call__(value)


class FooterNavigationItem(OrderedModel):
    title = models.CharField(max_length=255)
    column = models.CharField(
      max_length=1, choices=STATUSES, blank=True, null=True
    )
    url = models.CharField(max_length=200, validators=[OptionalSchemeURLValidator()], null=True)
    external = models.BooleanField(default=False)


class Footer(TranslatableModel):
  translations = TranslatedFields(
    title=models.CharField(max_length=255),
  )
  second_column = PlaceholderField("second_column")
  third_column = PlaceholderField("third_column")
