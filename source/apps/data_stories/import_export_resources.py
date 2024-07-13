from import_export import resources, widgets
from import_export.fields import Field
from django.conf import settings
from .models import DataStory
from django.apps import apps
from fluent_contents.models import Placeholder

class DataStoryResource(resources.ModelResource):
    class Meta:
      id = Field(column_name="datastory_id", attribute='interval_type')

      model = DataStory
      skip_unchanged=False
      import_id_fields = ['id']

    def before_import_row(self, row, **kwargs):
        languages = settings.LANGUAGES
        id = row['id']
        print('hit')
        page = DataStory.objects.get(id=id)
        DataStoryTranslation = apps.get_model('data_stories', 'DataStoryTranslation')
        for language in languages:
          lang_code = language[0]
          if lang_code == 'zh-hant':
            lang_code = 'zh_hant'
          # print(language)
          title_row = row['title_'+lang_code]

          description = row['description_'+lang_code]
          # print(title_row, page.id, page.title, language[0])
          trans, test = DataStoryTranslation.objects.get_or_create(
            master_id=page.id,
            language_code=language[0],
          )
          trans.title = title_row
          trans.description = description
          print(trans.master_id, trans.title, trans.language_code, test)
          trans.save()
