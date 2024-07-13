from __future__ import unicode_literals

from django.contrib import admin
from .forms import NarrativeSectionForm
from modeltranslation.admin import TranslationAdmin, TranslationStackedInline
from fluent_contents.admin import PlaceholderFieldAdmin
from parler.admin import TranslatableAdmin
from import_export.admin import ImportExportModelAdmin
from .import_export_resources import DataStoryResource
from apps.abstract.admin import (
    PUBLISHING_INFO, PUBLISHING_ACTIONS, PUBLISHING_DISPLAY)

from .models import DataStory, NarrativeSection
from fluent_contents.admin import PlaceholderFieldAdmin

class NarrativeSection(TranslationStackedInline):
    """ narrative section inline for Data Stories
    """
    model = NarrativeSection
    fieldsets = (
                 ('Narrative Information', {
                     'classes': ('collapse',),
                     'fields': ('order',
        'title',
        'description',)},),
                 ('Charts', {
                     'classes': ('collapse',),
                     'description':'<div>Please add only one chart per narrative section</div>',
                     'fields': ('sankey', 'bar_chart', 'stacked_bar_chart', 'map_chart', 'dual_axis_line_and_column', 'line_chart', 'scatter_chart', 'boxplot')},),
    )
    extra = 1


class DataStoryAdmin(PlaceholderFieldAdmin, TranslatableAdmin, ImportExportModelAdmin):
    list_display = ['title', 'homepage_featured'] + PUBLISHING_DISPLAY
    list_filter = ('translations__title',)
    search_fields = ('translations__title',)
    actions = PUBLISHING_ACTIONS
    list_editable = (
        'public_status', 'internal_status',
    )
    resource_class = DataStoryResource
    fieldsets = [
        PUBLISHING_INFO,
        (None, {'fields': [
            'title',
            'slug',
            'description',
            'icon',
            'homepage_featured',
            'contents',
        ]}),
    ]

    def get_prepopulated_fields(self, request, obj=None):
      # can't use `prepopulated_fields = ..` because it breaks the admin validation
      # for translated fields. This is the official django-parler workaround.
      return {
        'slug': ('title',)
      }

    class Media:
      js = ('js/tiny_mce/fluent-integration.js',)


admin.site.register(DataStory, DataStoryAdmin)

