from django import template
from datetime import datetime
from django.template.defaultfilters import stringfilter
import re
from django.utils.text import Truncator

from apps.translation_strings.models import TranslationString
from apps.page.models import LandingPage

register = template.Library()


@register.simple_tag
def get_translated_strings():
    translations = TranslationString.objects.all()
    return translations

@register.simple_tag
def get_data_story():
    data_story_landing = LandingPage.objects.get(slug='data-stories')
    return data_story_landing


@register.simple_tag
def get_common_metric():
    common_metric_landing = LandingPage.objects.get(slug='common-metrics')
    return common_metric_landing

@register.simple_tag
def get_homepage():
    homepage = LandingPage.objects.get(slug='-')
    return homepage

@register.simple_tag
def get_homepage_description():
    homepage = LandingPage.objects.get(slug='-')
    homepage_description = re.sub(".\n","", homepage.homepage_description)

    return homepage_description
