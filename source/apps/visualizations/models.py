from django.db import models
# import csv

from filer.fields.file import FilerFileField

from smart_selects.db_fields import ChainedManyToManyField
from django.contrib.postgres.fields import JSONField
from apps.abstract.models import OrderedModel, CommonModel
from apps.common_metrics.models import (MetricCategory, MetricCategorySubGroup)
from apps.programs.models import Agency
from parler.models import TranslatableModel, TranslatedFields
from django.core.validators import MinValueValidator


class VisualizationModel(CommonModel, TranslatableModel):
    program, agency, subgroup = 'program', 'agency', 'subgroup'

    aggregation_choices = (
        (program, program),
        (agency, agency),
        (subgroup, subgroup)
    )
    # translations = TranslatedFields(
    #     title=models.CharField(max_length=255),
    # )

    # metric_category_class = apps.get_model("common_metrics.MetricCategory")
    title = models.CharField(max_length=255)
    short_title = models.CharField(
        max_length=255,
        blank=True,
        help_text="This title is required for the small card display and for the file name when data is exported")
    description = models.TextField()
    x_axis_title = models.CharField(max_length=255, blank=True)
    y_axis_title = models.CharField(max_length=255, blank=True)
    metric_name = models.ForeignKey('common_metrics.MetricName',
                                    blank=True, null=True, on_delete=models.CASCADE)
    metric_category = models.ManyToManyField(MetricCategory, blank=True, null=True)
    metric_subgroup = ChainedManyToManyField(
        MetricCategorySubGroup,
        chained_field='metric_category',
        chained_model_field='metric_category',
        blank=True,
        null=True)

    agency = models.ManyToManyField(Agency)
    aggregate_by = models.CharField(max_length=255, choices=aggregation_choices)
    # data_set = FilerFileField(null=True, blank=True, on_delete=models.SET_NULL)
    decimal_points = models.IntegerField(default=0,
                                         help_text="The number of decimal points to be displayed on datapoints. This truncates rather than rounds. If set at 2 the value 20 will display as 20.00, the value 20.666 will display as 20.66, the value 20.6 will display as 20.60")
    is_year = models.BooleanField(default=1,
                                  help_text="Controls the formatting of axis numbers. If checked axis numbers will not have commas.")


    class Meta:
        abstract = True


class DataStoryVisualizationModel(CommonModel):
    title = models.CharField(max_length=255)
    short_title = models.CharField(
        max_length=255,
        blank=True,
        help_text="This title is required for the small card display and for the file name when data is exported")
    description = models.TextField()
    data_notes = models.TextField(blank=True)
    x_axis_title = models.CharField(max_length=255, blank=True)
    y_axis_title = models.CharField(max_length=255, blank=True)
    decimal_points = models.IntegerField(default=0,
                                         help_text="The number of decimal points to be displayed on datapoints. This truncates rather than rounds. If set at 2 the value 20 will display as 20.00, the value 20.666 will display as 20.66, the value 20.6 will display as 20.60")
    is_year = models.BooleanField(default=1,
                                  help_text="Controls the formatting of axis numbers. If checked axis numbers will not have commas.")

    # data_set = FilerFileField(null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        abstract = True


class Sankey(VisualizationModel):
    hide_tooltips = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class BarChart(VisualizationModel):
    # column bar chart
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)

    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "column bar charts"


class LineChart(VisualizationModel):
    # column bar chart
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    is_area = models.BooleanField(default=False, help_text="If checked, will display as an area chart.")
    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "line/area charts"


class ScatterChart(VisualizationModel):
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    is_year = models.BooleanField(default=False, help_text="Controls the formatting of axis numbers. If checked axis numbers will not have commas.")
    x_axis_tick_interval = models.SmallIntegerField(null=True, blank=True, help_text="Optionally, override the default interval with which ticks are shown on the X axis.", validators=[MinValueValidator(1)])
    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "scatter charts"

class Boxplot(VisualizationModel):
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    is_year = models.BooleanField(default=False, help_text="Controls the formatting of axis numbers. If checked axis numbers will not have commas.")
    color_by_category = models.BooleanField(default=False, help_text="Alternate color of boxplots by category. By default, colors will only alternate by series (when multiple boxplots are displayed per category).")

    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "boxplots"

class StackedBarChart(VisualizationModel):
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    disable_distribution_view = models.BooleanField(default=False)

    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title


class MapChart(CommonModel):
    title = models.CharField(max_length=255)
    short_title = models.CharField(
        max_length=255,
        blank=True,
        help_text="This title is required for the small card display and for the file name when data is exported")
    description = models.TextField()
    table_column_name = models.CharField(max_length=255, default="value", help_text="The column name that will appear in the table view")
    shapefile = JSONField(blank=True, null=True)
    shapefile_file = FilerFileField(blank=True, null=True, on_delete=models.CASCADE)
    use_default_map = models.BooleanField(default=False)
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class ShapeFileCoordinate(CommonModel):
    hckey = models.CharField(max_length=255, blank=True, verbose_name="HC-Key")
    title = models.CharField(max_length=255, blank=True)
    tooltip_content = models.CharField(max_length=255, blank=True)

    map_chart = models.ForeignKey('MapChart', null=True, on_delete=models.SET_NULL)

class Coordinate(CommonModel):
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
    title = models.CharField(max_length=255, blank=True)
    tooltip_content = models.CharField(max_length=255, blank=True)

    map_chart = models.ForeignKey('MapChart', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return str(self.latitude) + " " + str(self.longitude)


class DualAxisLineAndColumn(VisualizationModel):
    program, agencies, subgroup, line, bar  = 'program', 'agency', 'subgroup', 'line', 'bar'

    aggregation_choices = (
        (agencies, agencies),
        (subgroup, subgroup)
    )

    axis_choices = (
        (line, line),
        (bar, bar)
    )

    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    line_metric_category = models.ManyToManyField(MetricCategory, blank=True, null=True, related_name="line_metric_category")
    line_metric_subgroup = ChainedManyToManyField(
        MetricCategorySubGroup,
        chained_field='line_metric_category',
        chained_model_field='metric_category',
        blank=True,
        null=True,
        related_name="line_metric_subgroup"
    )
    line_agency = models.ManyToManyField(Agency, related_name="line_agency")
    line_aggregate_by = models.CharField(max_length=255, choices=aggregation_choices)
    alternate_axis_title = models.CharField(max_length=255, blank=True, null=True)
    dual_axis_type = models.CharField(max_length=255, choices=axis_choices)
    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title


class DataStorySankey(DataStoryVisualizationModel):
    hide_tooltips = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "data stories sankeys"

    # def save(self, **kwargs):
    #     super(DataStorySankey, self).save(**kwargs)
    #     if self.data_set:
    #         """creates sankey data set data by parsing CSV file """
    #         data_file = self.data_set.path
    #         data = csv.reader(open(data_file, mode='r'), delimiter=',')

    #         for column in data:
    #             series = DataStorySankeyDataSet()

    #             series.sankey_to = column[0]
    #             series.sankey_from = column[1]
    #             series.sankey_step = column[2]
    #             series.sankey_count = column[3]
    #             series.sankey = self

    #             series.save()

    #     super(DataStorySankey, self).save(**kwargs)


class DataStorySankeyDataSet(CommonModel):
    sankey_line = models.TextField()
    sankey = models.ForeignKey(DataStorySankey, on_delete=models.CASCADE)


class DataStoryLineChart(DataStoryVisualizationModel):
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    is_area = models.BooleanField(default=False, help_text="If checked, will display as an area chart.")

    categories = models.TextField(blank=True,
                                  help_text="This should be a comma separated set of strings. For example: Under 16,16 to 19,20 to 24,25 to 54")
    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "data stories line/area charts"


class DataStoryScatterChart(DataStoryVisualizationModel):
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    is_year = models.BooleanField(default=0, help_text="Controls the formatting of axis numbers. If checked axis numbers will not have commas.")
    suffix = models.CharField(max_length=255, blank=True)
    x_axis_tick_interval = models.SmallIntegerField(null=True, blank=True, help_text="Optionally, override the default interval with which ticks are shown on the X axis.", validators=[MinValueValidator(1)])

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "data stories scatter charts"


class DataStoryBoxplot(DataStoryVisualizationModel):
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    is_year = models.BooleanField(default=0, help_text="Controls the formatting of axis numbers. If checked axis numbers will not have commas.")
    suffix = models.CharField(max_length=255, blank=True)
    color_by_category = models.BooleanField(default=False, help_text="Alternate color of boxplots by category. By default, colors will only alternate by series (when multiple boxplots are displayed per category).")

    categories = models.TextField(blank=True,
                                  help_text="This should be a comma separated set of strings. For example: Under 16,16 to 19,20 to 24,25 to 54")
    
    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "data stories boxplots"


class DataStoryBarChart(DataStoryVisualizationModel):
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    decimal_points = models.IntegerField(default=0,
                                         help_text="The number of decimal points to be displayed on datapoints. This truncates rather than rounds. If set at 2 the value 20 will display as 20.00, the value 20.666 will display as 20.66, the value 20.6 will display as 20.60")
    is_year = models.BooleanField(default=1,
                                  help_text="Controls the formatting of axis numbers. If checked axis numbers will not have commas.")
    categories = models.TextField(blank=True,
                                  help_text="This should be a comma separated set of strings. For example: Under 16,16 to 19,20 to 24,25 to 54")
    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "data stories column bar charts"

    # def save(self, **kwargs):
    #     super(DataStoryBarChart, self).save(**kwargs)

    #     if self.data_set:
    #         """creates bar chart data set data by parsing CSV file """
    #         data_file = self.data_set.path
    #         data = csv.reader(open(data_file, mode='r'), delimiter=',')

    #         for column in data:
    #             series = DataStoryBarChartDataSet()

    #             self.categories = column[0]
    #             series.series_name = column[1]
    #             series.series_data = column[2]
    #             series.bar_chart = self

    #             series.save()

    #     super(DataStoryBarChart, self).save(**kwargs)


class DataStoryStackedBarChart(DataStoryVisualizationModel):
    # column bar chart
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)

    categories = models.TextField(blank=True, help_text="This should be a comma separated set of strings. For example: Under 16,16 to 19,20 to 24,25 to 54")
    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "data stories stacked bar charts"

    # def save(self, **kwargs):
    #     super(DataStoryStackedBarChart, self).save(**kwargs)
    #     if self.data_set:
    #         """creates bar chart data set data by parsing CSV file """
    #         data_file = self.data_set.path
    #         data = csv.reader(open(data_file, mode='r'), delimiter=',')

    #         for column in data:
    #             series = DataStoryStackedBarChartDataSet()

    #             self.categories = column[0]
    #             series.series_name = column[1]
    #             series.series_data = column[2]
    #             series.bar_chart = self

    #             series.save()

    #     super(DataStoryStackedBarChart, self).save(**kwargs)


class DataStoryBarChartDataSet(CommonModel):
    series_name = models.CharField(max_length=500, help_text="This will be the individual bar's title in the legend. For example: Part-Time")
    series_data = models.TextField(help_text="This should be all data points for the individual series. They should be comma seperated and surrounded by brackets and have the same number of entries as categories. For Example: [80, 70, 55, 92]")

    bar_chart = models.ForeignKey(DataStoryBarChart, on_delete=models.CASCADE)


class DataStoryLineChartDataSet(CommonModel):
    series_name = models.CharField(max_length=500, help_text="This will be the individual line's title in the legend. For example: Part-Time")
    series_data = models.TextField(help_text="This should be all data points for the individual series. They should be comma seperated and surrounded by brackets and have the same number of entries as categories. For Example: [80, 70, 55, 92]")

    line_chart = models.ForeignKey(DataStoryLineChart, on_delete=models.CASCADE)

class DataStoryScatterChartDataSet(CommonModel):
    series_name = models.CharField(max_length=500, help_text="This will be the individual line's title in the legend. For example: Part-Time")
    series_data = models.TextField(help_text="This should be all data points for the individual series. This is a list of 2-value data points, comma-seperated and surrounded by brackets. For example: [[80, 70], [55, 92], [23, 18]]. Additional tooltip information can be added after the second parameter, in double quotes. For example: [[80, 70, \"Agency: NYCHA\"]].")

    scatter_chart = models.ForeignKey(DataStoryScatterChart, on_delete=models.CASCADE)

class DataStoryBoxplotDataSet(CommonModel):
    series_name = models.CharField(max_length=500, blank=True, help_text="If you have multiple overlaying series of boxplots, this label will distinguish them.")
    series_data = models.TextField(help_text="This should be a list of boxplots, comma-separated and surrounded by brackets. Each boxplot is itself a list of five values: low, q1, median, q3 and high. For example: [[0, 1, 2, 3, 4], [2, 3, 4, 5, 6]].")
    series_outliers = models.TextField(help_text="Optional: the outliers of each box plot, comma-separated and surrounded by brackets. For example, if the first boxplot has two outliers at Y=0.5 and Y=10, and the second boxplot has no outliers: [[0.5, 10], []].", blank=True, null=True)

    boxplot = models.ForeignKey(DataStoryBoxplot, on_delete=models.CASCADE)

class DataStoryStackedBarChartDataSet(CommonModel):
    series_name = models.CharField(max_length=500)
    series_data = models.TextField()

    bar_chart = models.ForeignKey(DataStoryStackedBarChart, on_delete=models.CASCADE)


class DataStoryDualAxisLineAndColumn(DataStoryVisualizationModel):
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)

    categories = models.TextField(blank=True,
                                  help_text="This should be a comma separated set of strings. It should not include the line category For example: Under 16,16 to 19,20 to 24,25 to 54")
    suffix = models.CharField(max_length=255, blank=True)
    alternate_axis_title = models.CharField(max_length=255, blank=True, null=True)


    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "data stories dual axes line and columns"

    # def save(self, **kwargs):
    #     super(DataStoryDualAxisLineAndColumn, self).save(**kwargs)
    #     if self.data_set:
    #         """creates dual axis data set data by parsing CSV file """
    #         data_file = self.data_set.path
    #         data = csv.reader(open(data_file, mode='r'), delimiter=',')

    #         for column in data:
    #             series = DataStoryDualAxisLineAndColumnDataSet()

    #             self.categories = column[0]
    #             series.series_name = column[1]
    #             series.series_data = column[2]
    #             self.dual_axis_type = column[3]
    #             series.dual_axis_line_and_column = self

    #             series.save()

    #     super(DataStoryDualAxisLineAndColumn, self).save(**kwargs)


class DataStoryDualAxisLineAndColumnDataSet(CommonModel):
    line, bar = 'line', 'bar'

    axis_choices = (
        (line, line),
        (bar,bar)
    )
    series_name = models.CharField(max_length=500)
    series_data = models.TextField()
    dual_axis_type = models.CharField(max_length=255, choices=axis_choices)

    dual_axis_line_and_column = models.ForeignKey(DataStoryDualAxisLineAndColumn, on_delete=models.CASCADE)
