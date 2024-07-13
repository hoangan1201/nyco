from __future__ import unicode_literals

from django.contrib import admin
from modeltranslation.admin import TranslationAdmin

from apps.abstract.admin import (
    PUBLISHING_INFO, PUBLISHING_ACTIONS, PUBLISHING_DISPLAY)
from .models import BasicPage, LandingPage, MainNavigationItem, FooterNavigationItem, AgencyItem, Footer
from fluent_contents.admin import PlaceholderFieldAdmin
from parler.admin import TranslatableAdmin
from import_export.admin import ImportExportModelAdmin
from .import_export_resources import BasicPageResource
class AgencyItemAdmin(TranslationAdmin):
    model = AgencyItem
admin.site.register(AgencyItem, AgencyItemAdmin)


# class ProgramLinkAdmin(admin.ModelAdmin):
#     model = ProgramLink
# admin.site.register(ProgramLink, ProgramLinkAdmin)


class BasicPageAdmin(PlaceholderFieldAdmin, TranslatableAdmin, ImportExportModelAdmin):
    list_display = ['title', 'slug',] + PUBLISHING_DISPLAY
    list_display_links = ('title', 'slug')
    list_filter = ('translations__title', 'slug',)
    search_fields = ('title',)
    actions = PUBLISHING_ACTIONS
    list_editable = (
        'public_status', 'internal_status'
    )
    resource_class = BasicPageResource
    filter_horizontal = ('agencies',)
    # prepopulated_fields = {'slug': ('translations__title',)}

    def get_prepopulated_fields(self, request, obj=None):
        # can't use `prepopulated_fields = ..` because it breaks the admin validation
        # for translated fields. This is the official django-parler workaround.
        return {
            'slug': ('title',)
        }

    class Media:
        js = ('js/tiny_mce/fluent-integration.js',)

admin.site.register(BasicPage, BasicPageAdmin)


class LandingPageAdmin(TranslationAdmin):
    list_display = ['title', 'slug',] + PUBLISHING_DISPLAY
    list_filter = ('title', 'slug',)
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}
    actions = PUBLISHING_ACTIONS
    list_editable = (
        'public_status', 'internal_status'
    )
    fieldsets = [
        PUBLISHING_INFO,
        (None, {'fields': [
            'title',
            'slug',
            'description',
            'homepage_description'
        ]}),
    ]
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(LandingPage, LandingPageAdmin)


class MainNavigationItemAdmin(TranslationAdmin):
    list_display = ('title', 'order')
    list_filter = ('title', 'order',)
    search_fields = ('title',)
    list_editable = (
        'order',
    )

admin.site.register(MainNavigationItem, MainNavigationItemAdmin)


class FooterNavigationItemAdmin(TranslationAdmin):
    list_display = ('title', 'order')
    list_filter = ('title', 'order',)
    search_fields = ('title',)
    list_editable = (
        'order',
    )

admin.site.register(FooterNavigationItem, FooterNavigationItemAdmin)


class FooterAdmin(PlaceholderFieldAdmin, TranslatableAdmin):
  list_display = ('title',)

admin.site.register(Footer, FooterAdmin)
