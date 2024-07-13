from modeltranslation.translator import translator, TranslationOptions
from .models import TranslationString


class TranslationStringTranslationOptions(TranslationOptions):
    fields = ('frontend_text',)


translator.register(TranslationString, TranslationStringTranslationOptions)
