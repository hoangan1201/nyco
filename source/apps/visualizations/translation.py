from modeltranslation.translator import translator, TranslationOptions
from .models import ShapeFileCoordinate, DataStoryVisualizationModel, VisualizationModel, LineChart, ScatterChart, Boxplot, BarChart, StackedBarChart, Sankey, MapChart, DualAxisLineAndColumn, DataStoryBarChart, DataStoryLineChart, DataStoryScatterChart, DataStoryBoxplot, DataStoryStackedBarChart, DataStorySankey, DataStoryDualAxisLineAndColumn, DataStoryBarChartDataSet, DataStoryLineChartDataSet, DataStoryScatterChartDataSet, DataStoryBoxplotDataSet, DataStorySankeyDataSet, DataStoryDualAxisLineAndColumnDataSet, Coordinate, DataStoryStackedBarChartDataSet


class VisualizationModelTranslationOptions(TranslationOptions):
    fields = ('title', 'short_title', 'description', 'x_axis_title', 'y_axis_title')


translator.register(VisualizationModel, VisualizationModelTranslationOptions)


class LineChartTranslationOptions(TranslationOptions):
    fields = ('suffix',)


translator.register(LineChart, LineChartTranslationOptions)


# class ScatterChartTranslationOptions(TranslationOptions):
#     fields = ('suffix',)


# translator.register(ScatterChart, ScatterChartTranslationOptions)


# class BoxplotTranslationOptions(TranslationOptions):
#     fields = ()


# translator.register(Boxplot, BoxplotTranslationOptions)


class BarChartTranslationOptions(TranslationOptions):
    fields = ('suffix',)


translator.register(BarChart, BarChartTranslationOptions)


class SankeyTranslationOptions(VisualizationModelTranslationOptions):
    pass


translator.register(Sankey, SankeyTranslationOptions)


class StackedBarChartTranslationOptions(VisualizationModelTranslationOptions):
    fields = ('suffix',)


translator.register(StackedBarChart, StackedBarChartTranslationOptions)


class MapChartTranslationOptions(TranslationOptions):
    fields = ('title', 'short_title', 'description')


translator.register(MapChart, MapChartTranslationOptions)


class DualAxisLineAndColumnTranslationOptions(VisualizationModelTranslationOptions):
    fields = ('suffix', 'alternate_axis_title')


translator.register(DualAxisLineAndColumn, DualAxisLineAndColumnTranslationOptions)


class DataStoryVisualizationModelTranslationOptions(TranslationOptions):
    fields = ('title', 'short_title', 'description', 'data_notes', 'x_axis_title', 'y_axis_title')


translator.register(DataStoryVisualizationModel, DataStoryVisualizationModelTranslationOptions)


class DataStoryBarChartTranslationOptions(DataStoryVisualizationModelTranslationOptions):
    fields = ('categories', 'suffix')


translator.register(DataStoryBarChart, DataStoryBarChartTranslationOptions)


class DataStoryLineChartTranslationOptions(DataStoryVisualizationModelTranslationOptions):
    fields = ('categories', 'suffix')


translator.register(DataStoryLineChart, DataStoryLineChartTranslationOptions)


class DataStoryScatterChartTranslationOptions(DataStoryVisualizationModelTranslationOptions):
    fields = ('suffix',)


translator.register(DataStoryScatterChart, DataStoryScatterChartTranslationOptions)

class DataStoryBoxplotTranslationOptions(DataStoryVisualizationModelTranslationOptions):
    fields = ('categories',)


translator.register(DataStoryBoxplot, DataStoryBoxplotTranslationOptions)


class DataStorySankeyTranslationOptions(DataStoryVisualizationModelTranslationOptions):
    pass


translator.register(DataStorySankey, DataStorySankeyTranslationOptions)


class DataStoryStackedBarChartTranslationOptions(DataStoryVisualizationModelTranslationOptions):
    fields = ('categories', 'suffix')


translator.register(DataStoryStackedBarChart, DataStoryStackedBarChartTranslationOptions)


class DataStoryDualAxisLineAndColumnTranslationOptions(DataStoryVisualizationModelTranslationOptions):
    fields = ('categories', 'suffix', 'alternate_axis_title')


translator.register(DataStoryDualAxisLineAndColumn, DataStoryDualAxisLineAndColumnTranslationOptions)


class DataStorySankeyDataSetTranslationOptions(TranslationOptions):
    pass


translator.register(DataStorySankeyDataSet, DataStorySankeyDataSetTranslationOptions)


class DataStoryBarChartDataSetTranslationOptions(TranslationOptions):
    fields = ('series_name',)


translator.register(DataStoryBarChartDataSet, DataStoryBarChartDataSetTranslationOptions)


class DataStoryLineChartDataSetTranslationOptions(TranslationOptions):
    fields = ('series_name',)


translator.register(DataStoryLineChartDataSet, DataStoryLineChartDataSetTranslationOptions)


class DataStoryScatterChartDataSetTranslationOptions(TranslationOptions):
    fields = ('series_name',)


translator.register(DataStoryScatterChartDataSet, DataStoryScatterChartDataSetTranslationOptions)


class DataStoryBoxplotDataSetTranslationOptions(TranslationOptions):
    fields = ('series_name',)


translator.register(DataStoryBoxplotDataSet, DataStoryBoxplotDataSetTranslationOptions)


class DataStoryStackedBarChartDataSetTranslationOptions(TranslationOptions):
    fields = ('series_name',)


translator.register(DataStoryStackedBarChartDataSet, DataStoryStackedBarChartDataSetTranslationOptions)


class DataStoryDualAxisLineAndColumnDataSetTranslationOptions(TranslationOptions):
    fields = ('series_name',)


translator.register(DataStoryDualAxisLineAndColumnDataSet, DataStoryDualAxisLineAndColumnDataSetTranslationOptions)


class CoordinateTranslationOptions(TranslationOptions):
    fields = ('title', 'tooltip_content')


translator.register(Coordinate, CoordinateTranslationOptions)

class ShapeFileCoordinateTranslationOptions(TranslationOptions):
    fields = ('title', 'tooltip_content')


translator.register(ShapeFileCoordinate, ShapeFileCoordinateTranslationOptions)
