from import_export import resources, widgets
from import_export.fields import Field
from django.conf import settings
from .models import BasicPage
from django.apps import apps
from fluent_contents.models import Placeholder
from apps.plugins.models import WysiwygBlockItem

class BasicPageResource(resources.ModelResource):
    class Meta:
      id = Field(column_name="basic_page_id", attribute='interval_type')

      model = BasicPage
      skip_unchanged=False
      import_id_fields = ['id']

    def before_import_row(self, row, **kwargs):
        languages = settings.LANGUAGES
        title = row['title']
        page = BasicPage.objects.get(translations__title=title)
        row['basic_page_id'] = page.id
        try:
            placeholder = Placeholder.objects.get_by_slot(page, "article_content")
        except Placeholder.DoesNotExist:
            placeholder = Placeholder.objects.create_for_object(page, "article_content")

        BasicPageTranslation = apps.get_model('page', 'BasicPageTranslation')
        for language in languages:
          lang_code = language[0]
          if lang_code == 'zh-hant':
            lang_code = 'zh_hant'
          # print(language)
          title_row = row['title_'+lang_code]
          top_wysiwyg_row = row['top_wysiwyg_'+lang_code]
          bottom_wysiwyg_row = row['bottom_wysiwyg_' + lang_code]
          # print(title_row, page.id, page.title, language[0])
          trans, test = BasicPageTranslation.objects.get_or_create(
            master_id=page.id,
            language_code=language[0],
          )
          trans.title = title_row
          print(trans.master_id, trans.title, trans.language_code, test)
          trans.save()
          if top_wysiwyg_row:
            WysiwygBlockItem.objects.create_for_placeholder(
              placeholder, sort_order=0, language_code=language[0], content=top_wysiwyg_row)
          if bottom_wysiwyg_row:
            WysiwygBlockItem.objects.create_for_placeholder(
              placeholder, sort_order=0, language_code=language[0], content=bottom_wysiwyg_row)
