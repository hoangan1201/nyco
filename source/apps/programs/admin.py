from __future__ import unicode_literals
from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from apps.abstract.admin import (
    PUBLISHING_INFO, PUBLISHING_ACTIONS, PUBLISHING_DISPLAY)
from modeltranslation.admin import TranslationAdmin, TranslationStackedInline

from .import_export_resources import LocationResource, ProgramResource
from .forms import ContactForm, LocationForm, ProgramLinkForm
from .models import Program, Contact, ProgramType, Population, ClientAverage, Agency, Location, Neighborhood, ProgramLink


class LocationImportAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = LocationResource
    model = Location


admin.site.register(Location, LocationImportAdmin)


class NeighborhoodAdmin(TranslationAdmin):
    model = Neighborhood


admin.site.register(Neighborhood, NeighborhoodAdmin)


class AgencyAdmin(TranslationAdmin):
    model = Agency


admin.site.register(Agency, AgencyAdmin)


class ProgramTypeAdmin(TranslationAdmin):
    model = ProgramType


admin.site.register(ProgramType, ProgramTypeAdmin)


class PopulationAdmin(TranslationAdmin):
    model = Population


admin.site.register(Population, PopulationAdmin)


class ClientAverageAdmin(admin.ModelAdmin):
    model = ClientAverage


admin.site.register(ClientAverage, ClientAverageAdmin)


class ContactAdmin(TranslationStackedInline):
    """ contact inline for programs
    """
    form = ContactForm
    model = Contact
    extra = 1


class ProgramLinkAdmin(TranslationStackedInline):
    """ contact inline for programs
    """
    form = ProgramLinkForm
    model = ProgramLink
    extra = 1


class LocationAdmin(admin.StackedInline):
    """ location inline for programs
    """
    form = LocationForm
    model = Location
    extra = 1


class ProgramAdmin(ImportExportModelAdmin, TranslationAdmin):
    list_display = ['name',] + PUBLISHING_DISPLAY
    resource_class = ProgramResource
    list_filter = ('name',)
    search_fields = ('name',)
    actions = PUBLISHING_ACTIONS
    inlines = [ContactAdmin, LocationAdmin, ProgramLinkAdmin]
    list_editable = (
        'public_status', 'internal_status'
    )
    filter_horizontal = ('populations_served', 'program_types', 'neighborhood')


admin.site.register(Program, ProgramAdmin)
