# Generated by Django 2.2 on 2021-01-08 01:25

from django.db import migrations
from django.conf import settings
from django.utils import translation
from fluent_contents.models import Placeholder
from apps.plugins.models import WysiwygBlockItem


def forwards(apps, schema_editor):
    BasicPage = apps.get_model('page', 'BasicPage')
    translation.activate(settings.LANGUAGE_CODE)

    for page in BasicPage.objects.all():
        try:
            placeholder = Placeholder.objects.get_by_slot(page, "article_content")
        except Placeholder.DoesNotExist:
            placeholder = Placeholder.objects.create_for_object(page, "article_content")
        if page.top_wysiwyg:
            WysiwygBlockItem.objects.create_for_placeholder(
                placeholder, sort_order=0, language_code=settings.LANGUAGE_CODE, content=page.top_wysiwyg)
        if page.bottom_wysiwyg:
            WysiwygBlockItem.objects.create_for_placeholder(
                placeholder, sort_order=0, language_code=settings.LANGUAGE_CODE, content=page.bottom_wysiwyg)


def backwards(apps, schema_editor):
    """ Not sure how to do that yet
    """
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('page', '0014_auto_20210105_0448'),
        ('plugins', '0006_auto_20210120_1654'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]