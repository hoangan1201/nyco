from __future__ import unicode_literals

from django.contrib import admin
from .forms import CoordinateForm, DataStoryBarChartDataSetForm, DataStoryScatterChartDataSetForm, DataStoryBoxplotDataSetForm, DataStorySankeyDataSetForm, DataStoryDualAxisLineAndColumnDataSetForm, DataStoryStackedBarChartDataSetForm, DataStoryLineChartDataSetForm
from modeltranslation.admin import TranslationAdmin, TranslationStackedInline

from .models import Sankey, LineChart, ScatterChart, Boxplot, BarChart, StackedBarChart, MapChart, DualAxisLineAndColumn, DataStorySankey, DataStoryBarChart, DataStoryLineChart, DataStoryScatterChart, DataStoryBoxplot, DataStoryStackedBarChart, DataStoryDualAxisLineAndColumn, Coordinate, DataStoryBarChartDataSet, DataStorySankeyDataSet, DataStoryDualAxisLineAndColumnDataSet, DataStoryStackedBarChartDataSet, DataStoryLineChartDataSet, DataStoryScatterChartDataSet, DataStoryBoxplotDataSet, ShapeFileCoordinate


class SankeyAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)


class BarChartAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)


class LineChartAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)


class ScatterChartAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)


class BoxplotAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)


class DualAxisLineAndColumnAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)


class StackedBarChartAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)


class ShapeFileCoordinate(TranslationStackedInline):
    """ coordinate inline for maps
    """
    model = ShapeFileCoordinate
    fieldsets = (
        ('ShapeFile Coordinates', {
            'classes': ('collapse',),
            'fields': ('hckey',
                       'title',
                       'tooltip_content',)},),
    )
    extra = 1


class Coordinate(TranslationStackedInline):
    """ coordinate inline for maps
    """
    form = CoordinateForm
    model = Coordinate
    extra = 1


class MapChartAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)

    inlines = [ShapeFileCoordinate, Coordinate]


class DataStorySankeyDataSet(TranslationStackedInline):
    """ data set inline for sankeys
    """
    form = DataStorySankeyDataSetForm
    model = DataStorySankeyDataSet
    extra = 1


class DataStorySankeyAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)

    inlines = [DataStorySankeyDataSet]


class DataStoryBarChartDataSet(TranslationStackedInline):
    """ data set inline for bar charts
    """
    form = DataStoryBarChartDataSetForm
    model = DataStoryBarChartDataSet
    extra = 1


class DataStoryLineChartDataSet(TranslationStackedInline):
    """ data set inline for bar charts
    """
    form = DataStoryLineChartDataSetForm
    model = DataStoryLineChartDataSet
    extra = 1


class DataStoryScatterChartDataSet(TranslationStackedInline):
    """ data set inline for bar charts
    """
    form = DataStoryScatterChartDataSetForm
    model = DataStoryScatterChartDataSet
    extra = 1


class DataStoryBoxplotDataSet(TranslationStackedInline):
    """ data set inline for boxplots
    """
    form = DataStoryBoxplotDataSetForm
    model = DataStoryBoxplotDataSet
    extra = 1


class DataStoryStackedBarChartDataSet(TranslationStackedInline):
    """ data set inline for bar charts
    """
    form = DataStoryStackedBarChartDataSetForm
    model = DataStoryStackedBarChartDataSet
    extra = 1


class DataStoryBarChartAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)

    inlines = [DataStoryBarChartDataSet]

class DataStoryLineChartAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)

    inlines = [DataStoryLineChartDataSet]

class DataStoryScatterChartAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)

    inlines = [DataStoryScatterChartDataSet]

class DataStoryBoxplotAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)

    inlines = [DataStoryBoxplotDataSet]

class DataStoryDualAxisLineAndColumnDataSet(TranslationStackedInline):
    """ data set inline for dual axis line and columns
    """
    form = DataStoryDualAxisLineAndColumnDataSetForm
    model = DataStoryDualAxisLineAndColumnDataSet
    extra = 1


class DataStoryDualAxisLineAndColumnAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)

    inlines = [DataStoryDualAxisLineAndColumnDataSet]


class DataStoryStackedBarChartAdmin(TranslationAdmin):
    list_display = ('title',)
    list_filter = ('title',)
    search_fields = ('title',)

    inlines = [DataStoryStackedBarChartDataSet]


admin.site.register(Sankey, SankeyAdmin)
admin.site.register(LineChart, LineChartAdmin)
# admin.site.register(ScatterChart, ScatterChartAdmin)
# admin.site.register(Boxplot, BoxplotAdmin)
admin.site.register(BarChart, BarChartAdmin)
admin.site.register(StackedBarChart, StackedBarChartAdmin)
admin.site.register(MapChart, MapChartAdmin)
admin.site.register(DualAxisLineAndColumn, DualAxisLineAndColumnAdmin)
admin.site.register(DataStorySankey, DataStorySankeyAdmin)
admin.site.register(DataStoryBarChart, DataStoryBarChartAdmin)
admin.site.register(DataStoryLineChart, DataStoryLineChartAdmin)
admin.site.register(DataStoryScatterChart, DataStoryScatterChartAdmin)
admin.site.register(DataStoryBoxplot, DataStoryBoxplotAdmin)
admin.site.register(DataStoryDualAxisLineAndColumn, DataStoryDualAxisLineAndColumnAdmin)
admin.site.register(DataStoryStackedBarChart, DataStoryStackedBarChartAdmin)
