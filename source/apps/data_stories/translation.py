from modeltranslation.translator import translator, TranslationOptions
from .models import DataStory, NarrativeSection
from apps.page.translation import PageModelTranslationOptions

# class DataStoryTranslationOptions(PageModelTranslationOptions):
#     fields = ('description',)
#
# translator.register(DataStory, DataStoryTranslationOptions)


class NarrativeSectionTranslationOptions(TranslationOptions):
    fields = ('title', 'description',)

translator.register(NarrativeSection, NarrativeSectionTranslationOptions)
