from import_export import resources, widgets

from .models import TranslationString
from import_export.fields import Field


class TranslationStringResource(resources.ModelResource):
    class Meta:
        model = TranslationString
        fields = ('text',)
        skip_unchanged=True
        import_id_fields = ['text']
