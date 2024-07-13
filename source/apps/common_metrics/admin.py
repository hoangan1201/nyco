from __future__ import unicode_literals

from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .forms import CommonMetricVisualizationForm
from modeltranslation.admin import TranslationAdmin

from apps.abstract.admin import (
    PUBLISHING_INFO, PUBLISHING_DISPLAY, PUBLISHING_ACTIONS)

from .import_export_resources import MetricFactResource, MetricCategorySubGroupResource
# from .models import CommonMetric, MetricCategory, MetricCategorySubGroup, MetricFact, CommonMetricVisualization, MetricName
from .models import *

from fluent_contents.admin import PlaceholderFieldAdmin
from parler.admin import TranslatableAdmin
from tinymce.widgets import TinyMCE
from django.utils.translation import get_language, get_language_bidi
from django.conf import settings

class CommonMetricVisualization(admin.TabularInline):
    """ narrative section inline for Data Stories
    """
    form = CommonMetricVisualizationForm
    model = CommonMetricVisualization
    extra = 1
    # can we make all visualization foreignkeys autocomplete https://docs.djangoproject.com/en/2.1/ref/contrib/admin/#django.contrib.admin.ModelAdmin.autocomplete_fields
    # might not work since its inline

class CommonMetricAdmin(PlaceholderFieldAdmin, TranslatableAdmin):
    list_display = ['metric_name', 'order'] + PUBLISHING_DISPLAY
    list_filter = ('translations__title',)
    search_fields = ('translations__title',)
    actions = PUBLISHING_ACTIONS
    # inlines = [CommonMetricVisualization]
    list_editable = (
        'public_status', 'internal_status', 'order',
    )
    fieldsets = [
        PUBLISHING_INFO,
        (None, {'fields': [
            'order',
            'title',
            'slug',
            'metric_total',
            'description',
            'data_story',
            'metric_name',
            'distribution_view_tooltip',
            'visualizations',
        ]}),
    ]
    
    def get_prepopulated_fields(self, request, obj=None):
        # can't use `prepopulated_fields = ..` because it breaks the admin validation
        # for translated fields. This is the official django-parler workaround.
        return {
            'slug': ('title',)
        }

    formfield_overrides = {
        models.TextField: {'widget': TinyMCE(mce_attrs={'language': get_language()})},
    }

class MetricFactAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = MetricFactResource


class MetricCategorySubGroupAdmin(ImportExportModelAdmin, TranslationAdmin):
    list_display = ('name', 'get_metric_category_name','order',)

    list_editable = ('order',)

    resource_class = MetricCategorySubGroupResource

    def get_metric_category_name(self, obj):
        return obj.metric_category.name

class MetricCategoryAdmin(TranslationAdmin):
    list_display = ('name',)

class MetricNameAdmin(TranslationAdmin):
    list_display = ('name',)

    def has_add_permission(self, request):
        return False

admin.site.register(MetricName, MetricNameAdmin)
admin.site.register(CommonMetric, CommonMetricAdmin)
admin.site.register(MetricFact, MetricFactAdmin)
admin.site.register(MetricCategorySubGroup, MetricCategorySubGroupAdmin)
admin.site.register(MetricCategory, MetricCategoryAdmin)
