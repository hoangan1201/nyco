from modeltranslation.translator import translator, TranslationOptions
from .models import PageModel, BasicPage, LandingPage, AgencyItem, MainNavigationItem, FooterNavigationItem


class PageModelTranslationOptions(TranslationOptions):
    fields = ('title',)


translator.register(PageModel, PageModelTranslationOptions)


class LandingPageTranslationOptions(PageModelTranslationOptions):
    fields = ('description', 'homepage_description')


translator.register(LandingPage, LandingPageTranslationOptions)


class AgencyItemTranslationOptions(TranslationOptions):
    fields = ('title', 'description', 'link_title',)


translator.register(AgencyItem, AgencyItemTranslationOptions)


# class ProgramLinkTranslationOptions(TranslationOptions):
#     fields = ('link_title',)
#
#
# translator.register(ProgramLink, ProgramLinkTranslationOptions)


class MainNavigationItemTranslationOptions(TranslationOptions):
    fields = ('title', 'hover_description',)


translator.register(MainNavigationItem, MainNavigationItemTranslationOptions)


class FooterNavigationItemTranslationOptions(TranslationOptions):
    fields = ('title',)


translator.register(FooterNavigationItem, FooterNavigationItemTranslationOptions)
