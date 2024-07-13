from modeltranslation.translator import translator, TranslationOptions
from .models import Program, Contact, Agency, ProgramType, Population, Neighborhood, ProgramLink


class ProgramTranslationOptions(TranslationOptions):
    fields = ('description', 'display_name')


translator.register(Program, ProgramTranslationOptions)


class NeighborhoodTranslationOptions(TranslationOptions):
    fields = ('name',)


translator.register(Neighborhood, NeighborhoodTranslationOptions)


class ContactTranslationOptions(TranslationOptions):
    fields = ('name',)


translator.register(Contact, ContactTranslationOptions)


class AgencyTranslationOptions(TranslationOptions):
    fields = ('display_name',)

    # 'acronym' is causing problems as primary key


translator.register(Agency, AgencyTranslationOptions)


class ProgramTypeTranslationOptions(TranslationOptions):
    fields = ('name',)


translator.register(ProgramType, ProgramTypeTranslationOptions)


class ProgramLinkTranslationOptions(TranslationOptions):
    fields = ('label',)


translator.register(ProgramLink, ProgramLinkTranslationOptions)


class PopulationTranslationOptions(TranslationOptions):
    fields = ('name',)


translator.register(Population, PopulationTranslationOptions)


# class LocationTranslationOptions(TranslationOptions):
#     fields = ('title', 'tooltip_content')
#
#
# translator.register(Location, LocationTranslationOptions)
