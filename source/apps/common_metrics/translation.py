from modeltranslation.translator import translator, TranslationOptions
from .models import MetricName, CommonMetric, MetricCategory, MetricCategorySubGroup, MetricFact
from apps.page.translation import PageModelTranslationOptions

class MetricNameTranslationOptions(TranslationOptions):
    fields = ('display_name',)

translator.register(MetricName, MetricNameTranslationOptions)

# class CommonMetricTranslationOptions(PageModelTranslationOptions):
#     fields = ('description',)
#
# translator.register(CommonMetric, CommonMetricTranslationOptions)


class MetricCategoryTranslationOptions(TranslationOptions):
    fields = ('display_name',)

    # 'name' is causing problems as primary key

translator.register(MetricCategory, MetricCategoryTranslationOptions)


class MetricCategorySubGroupTranslationOptions(TranslationOptions):
    fields = ('display_name', 'name',)

translator.register(MetricCategorySubGroup, MetricCategorySubGroupTranslationOptions)
