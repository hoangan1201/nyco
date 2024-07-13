from __future__ import unicode_literals

from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from .import_export_resource import TranslationStringResource
from import_export.admin import ImportExportModelAdmin


from .models import TranslationString


class TranslationStringAdmin(TranslationAdmin, ImportExportModelAdmin):
    model = TranslationString
    resource_class = TranslationStringResource
admin.site.register(TranslationString, TranslationStringAdmin)
