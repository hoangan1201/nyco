from django.db import models
from django.utils.translation import ugettext_lazy as _
from fluent_contents.models import ContentItem, PlaceholderField
from filer.fields.image import FilerImageField
from tinymce import models as tinymce_models
from smart_selects.db_fields import ChainedManyToManyField
from django.contrib.postgres.fields import JSONField
from apps.common_metrics.models import MetricCategory, MetricCategorySubGroup
from apps.programs.models import Agency
from apps.abstract.models import CommonModel
from apps.visualizations.models import DataStoryBarChart
from django.core.validators import URLValidator, MinValueValidator

class WysiwygBlockItem(ContentItem):
    title = models.CharField(_("Title"), max_length=200, null=True, blank=True)
    content = tinymce_models.HTMLField(null=True, blank=True)

    def __str__(self):
        if self.title:
          return self.title
        return "WYSIWYG Block"

    class Meta:
        verbose_name = _("WYSIWYG block")
        verbose_name_plural = _("WYSIWYG blocks")

    def as_simple_dictionary(self):
      return {
        'type': 'wysiwyg',
        'title': self.title,
        'content': self.content,
      }
class BaseVisualizationBlockItem(ContentItem):
    program, agency, subgroup = 'program', 'agency', 'subgroup'

    aggregation_choices = (
        (program, program),
        (agency, agency),
        (subgroup, subgroup)
    )

    title = models.CharField(max_length=255)
    short_title = models.CharField(
        max_length=255,
        blank=True,
        help_text="This title is required for the small card display and for the file name when data is exported"
    )
    description = tinymce_models.HTMLField(null=True, blank=True)
    chart_tooltip = tinymce_models.HTMLField(null=True, blank=True)
    data_notes = tinymce_models.HTMLField(null=True, blank=True)
    x_axis_title = models.CharField(max_length=255, blank=True)
    y_axis_title = models.CharField(max_length=255, blank=True)
    metric_name = models.ForeignKey(
        'common_metrics.MetricName',
        blank=True, null=True,
        on_delete=models.CASCADE
    )
    metric_category = models.ManyToManyField(
        MetricCategory,
        blank=True,
        null=True
    )
    metric_subgroup = ChainedManyToManyField(
        MetricCategorySubGroup,
        chained_field='metric_category',
        chained_model_field='metric_category',
        blank=True,
        null=True
    )
    agency = models.ManyToManyField(Agency)
    aggregate_by = models.CharField(
        max_length=255,
        choices=aggregation_choices
    )
    decimal_points = models.IntegerField(default=0, help_text="The number of decimal points to be displayed on datapoints. This truncates rather than rounds. If set at 2 the value 20 will display as 20.00, the value 20.666 will display as 20.66, the value 20.6 will display as 20.60")
    is_year = models.BooleanField(default=1, help_text="Controls the formatting of axis numbers. If checked axis numbers will not have commas.")

    class Meta:
        abstract = True

class CommonMetricSankey(BaseVisualizationBlockItem):
    BaseVisualizationBlockItem._meta.get_field("metric_category").db_table = "contentitems_sankey_metriccategory"
    BaseVisualizationBlockItem._meta.get_field("metric_subgroup").db_table = "contentitems_sankey_metricsubgroup"
    BaseVisualizationBlockItem._meta.get_field("agency").db_table = "contentitems_sankey_agency"
    hide_tooltips = models.BooleanField(default=False)

    def __str__(self):
      if not self.title:
        return "Common Metric Sankey Chart"
      return self.title

    def get_type(self):
      return 'sankey'

    class Meta:
        verbose_name = _("Sankey")
        verbose_name_plural = _("Sankeys")


class CommonMetricBarChart(BaseVisualizationBlockItem):
    BaseVisualizationBlockItem._meta.get_field("metric_category").db_table = "contentitems_barchart_metriccategory"
    BaseVisualizationBlockItem._meta.get_field("metric_subgroup").db_table = "contentitems_barchart_metricsubgroup"
    BaseVisualizationBlockItem._meta.get_field("agency").db_table = "contentitems_barchart_agency"

    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
      if not self.title:
        return "Common Metric Bar Chart"
      return self.title

    def get_type(self):
      return 'bar'

    class Meta:
        verbose_name = _("Bar Chart")
        verbose_name_plural = _("Bar Charts")


class CommonMetricLineChart(BaseVisualizationBlockItem):
    BaseVisualizationBlockItem._meta.get_field("metric_category").db_table = "contentitems_linechart_metriccategory"
    BaseVisualizationBlockItem._meta.get_field("metric_subgroup").db_table = "contentitems_linechart_metricsubgroup"
    BaseVisualizationBlockItem._meta.get_field("agency").db_table = "contentitems_linechart_agency"

    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    suffix = models.CharField(max_length=255, blank=True)
    is_area = models.BooleanField(default=False, help_text="If checked, will display as an area chart.")

    def __str__(self):
      if not self.title:
        return "Common Metric Line/Area Chart"
      return self.title

    def get_type(self):
      return 'line_chart'

    class Meta:
        verbose_name = _("Line/Area Chart")
        verbose_name_plural = _("Line/Area Charts")


class CommonMetricScatterChart(BaseVisualizationBlockItem):
    BaseVisualizationBlockItem._meta.get_field("metric_category").db_table = "contentitems_scatterchart_metriccategory"
    BaseVisualizationBlockItem._meta.get_field("metric_subgroup").db_table = "contentitems_scatterchart_metricsubgroup"
    BaseVisualizationBlockItem._meta.get_field("agency").db_table = "contentitems_scatterchart_agency"
    is_year = models.BooleanField(default=False, help_text="Controls the formatting of axis numbers. If checked axis numbers will not have commas.")
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    suffix = models.CharField(max_length=255, blank=True)
    x_axis_tick_interval = models.SmallIntegerField(null=True, blank=True, help_text="Optionally, override the default interval with which ticks are shown on the X axis.", validators=[MinValueValidator(1)])

    def __str__(self):
      if not self.title:
        return "Common Metric Scatter Chart"
      return self.title

    def get_type(self):
      return 'scatter_chart'

    class Meta:
        verbose_name = _("Scatter Chart")
        verbose_name_plural = _("Scatter Charts")


class CommonMetricBoxplot(BaseVisualizationBlockItem):
    BaseVisualizationBlockItem._meta.get_field("metric_category").db_table = "contentitems_boxplot_metriccategory"
    BaseVisualizationBlockItem._meta.get_field("metric_subgroup").db_table = "contentitems_boxplot_metricsubgroup"
    BaseVisualizationBlockItem._meta.get_field("agency").db_table = "contentitems_boxplot_agency"
    is_year = models.BooleanField(default=False, help_text="Controls the formatting of axis numbers. If checked axis numbers will not have commas.")
    color_by_category = models.BooleanField(default=False, help_text="Alternate the color of boxplots by category. By default, colors will only alternate by series (when multiple boxplots are displayed per category).")
    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
      if not self.title:
        return "Common Metric Boxplot"
      return self.title

    def get_type(self):
      return 'boxplot'

    class Meta:
        verbose_name = _("Boxplot")
        verbose_name_plural = _("Boxplots")


class CommonMetricStackedBarChart(BaseVisualizationBlockItem):
    BaseVisualizationBlockItem._meta.get_field("metric_category").db_table = "contentitems_stackedbarchart_metriccategory"
    BaseVisualizationBlockItem._meta.get_field("metric_subgroup").db_table = "contentitems_stackedbarchart_metricsubgroup"
    BaseVisualizationBlockItem._meta.get_field("agency").db_table = "contentitems_stackedbarchart_agency"

    hide_tooltips = models.BooleanField(default=False)
    hide_interactive_legend = models.BooleanField(default=False)
    disable_distribution_view = models.BooleanField(default=False)
    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
      if not self.title:
        return "Common Metric Stacked Bar Chart"
      return self.title

    def get_type(self):
      return 'stacked_bar_chart'

    class Meta:
        verbose_name = _("Stacked Bar Chart")
        verbose_name_plural = _("Stacked Bar Charts")


class CommonMetricDualAxisLineAndColumn(BaseVisualizationBlockItem):
    BaseVisualizationBlockItem._meta.get_field("metric_category").db_table = "contentitems_dualaxischart_metriccategory"
    BaseVisualizationBlockItem._meta.get_field("metric_subgroup").db_table = "contentitems_dualaxischart_metricsubgroup"
    BaseVisualizationBlockItem._meta.get_field("agency").db_table = "contentitems_dualaxischart_agency"

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
    line_metric_category = models.ManyToManyField(
        MetricCategory,
        blank=True,
        null=True,
        related_name="plugins_line_metriccategory",
        db_table="contentitems_dualaxischart_linemetriccategory"
    )
    line_metric_subgroup = ChainedManyToManyField(
        MetricCategorySubGroup,
        chained_field='line_metric_category',
        chained_model_field='metric_category',
        blank=True,
        null=True,
        related_name="plugins_line_metricsubgroup",
        db_table="contentitems_dualaxischart_linemetricsubgroup"
    )
    line_agency = models.ManyToManyField(
        Agency,
        related_name="plugins_line_agency",
        db_table="contentitems_dualaxischart_lineagency"
    )
    line_aggregate_by = models.CharField(max_length=255, choices=aggregation_choices)
    alternate_axis_title = models.CharField(max_length=255, blank=True, null=True)
    dual_axis_type = models.CharField(max_length=255, choices=axis_choices)
    suffix = models.CharField(max_length=255, blank=True)

    def __str__(self):
      if not self.title:
        return "Common Metric Dual Axis Chart"
      return self.title

    def get_type(self):
      return 'dual_axis'

    class Meta:
        verbose_name = _("Dual Axis Line And Column Chart")
        verbose_name_plural = _("Dual Axis Line And Column Charts")


class EmbedBlockItem(ContentItem):
    title =  models.CharField(_("Title"), max_length=200, blank=True, null=True)
    embed_code = models.CharField(max_length=3000)

    def __str__(self):
        if self.title:
          return self.title
        return "Embed Block"

    def as_simple_dictionary(self):
      return {
        'type': 'embed',
        'title': self.title,
        'embed_code': self.embed_code
      }

class ImageBlockItem(ContentItem):
    title = models.CharField(_("Title"), max_length=200, blank=True, null=True)
    image = FilerImageField(null=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("Image block")
        verbose_name_plural = _("Image blocks")

    def __str__(self):
        if self.title:
          return self.title
        return "Image Block"

    def as_simple_dictionary(self):
      return {
        'type': 'image',
        'title': self.title,
        'alt': self.image.default_alt_text,
        'src': self.image.url,
        'caption': self.image.default_caption,
      }

class MapChartBlockItem(ContentItem):
  title = models.CharField(max_length=255)
  short_title = models.CharField(
    max_length=255,
    blank=True,
    help_text="This title is required for the small card display and for the file name when data is exported"
  )
  description = tinymce_models.HTMLField(null=True, blank=True)
  shapefile = JSONField(blank=True, null=True)
  use_default_map = models.BooleanField(default=False)
  hide_tooltips = models.BooleanField(default=False)
  hide_interactive_legend = models.BooleanField(default=False)

  # shape file coordinate
  hckey = models.CharField(max_length=255, blank=True, verbose_name="HC-Key")
  shapefile_title = models.CharField(max_length=255, blank=True)
  shapefile_tooltip_content = models.CharField(max_length=255, blank=True)

  # coordinate
  latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
  longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True)
  coordinate_title = models.CharField(max_length=255, blank=True)
  coordinate_tooltip_content = models.CharField(max_length=255, blank=True)

  def __str__(self):
    if not self.title:
      return "Map Chart"
    return self.title

  class Meta:
    verbose_name = _("Map Chart")
    verbose_name_plural = _("Map Charts")

class BaseDataStoryVisualizationBlockItem(ContentItem):
  title = models.CharField(max_length=255, null=True, blank=True)

  class Meta:
    abstract = True


class DataStorySankey(BaseDataStoryVisualizationBlockItem):
  sankey = models.ForeignKey('visualizations.DataStorySankey', null=True, blank=True, on_delete=models.CASCADE)

  def __str__(self):
    if not self.title:
      return "Data Story Sankey Chart"
    return self.title

  def get_type(self):
    return 'sankey'

  class Meta:
    verbose_name = _("Data Story Sankey")
    verbose_name_plural = _("Data Story Sankeys")


class DataStoryBarChart(BaseDataStoryVisualizationBlockItem):
  bar_chart = models.ForeignKey('visualizations.DataStoryBarChart', null=True, blank=True, on_delete=models.CASCADE)

  def __str__(self):
    if not self.title:
      return "Data Story Bar Chart"
    return self.title

  def get_type(self):
    return 'bar'

  class Meta:
    verbose_name = _("Data Story Bar Chart")
    verbose_name_plural = _("Data Story Bar Charts")


class DataStoryLineChart(BaseDataStoryVisualizationBlockItem):
  line_chart = models.ForeignKey('visualizations.DataStoryLineChart', null=True, blank=True, on_delete=models.CASCADE)

  def __str__(self):
    if not self.title:
      return "Data Story Line/Area Chart"
    return self.title

  def get_type(self):
    return 'line_chart'

  class Meta:
    verbose_name = _("Data Story Line/Area Chart")
    verbose_name_plural = _("Data Story Line/Area Charts")


class DataStoryScatterChart(BaseDataStoryVisualizationBlockItem):
  scatter_chart = models.ForeignKey('visualizations.DataStoryScatterChart', null=True, blank=True, on_delete=models.CASCADE)

  def __str__(self):
    if not self.title:
      return "Data Story Scatter Chart"
    return self.title

  def get_type(self):
    return 'scatter_chart'

  class Meta:
    verbose_name = _("Data Story Scatter Chart")
    verbose_name_plural = _("Data Story Scatter Charts")


class DataStoryBoxplot(BaseDataStoryVisualizationBlockItem):
  boxplot = models.ForeignKey('visualizations.DataStoryBoxplot', null=True, blank=True, on_delete=models.CASCADE)

  def __str__(self):
    if not self.title:
      return "Data Story Boxplot"
    return self.title

  def get_type(self):
    return 'boxplot'

  class Meta:
    verbose_name = _("Data Story Boxplot")
    verbose_name_plural = _("Data Story Boxplots")


class DataStoryStackedBarChart(BaseDataStoryVisualizationBlockItem):
  stacked_bar_chart = models.ForeignKey('visualizations.DataStoryStackedBarChart', null=True, blank=True,
                                        on_delete=models.CASCADE)

  def __str__(self):
    if not self.title:
      return "Data Story Stacked Bar Chart"
    return self.title

  def get_type(self):
    return 'stacked_bar_chart'

  class Meta:
    verbose_name = _("Data Story Stacked Bar Chart")
    verbose_name_plural = _("Data Story Stacked Bar Charts")


class DataStoryDualAxisLineAndColumn(BaseDataStoryVisualizationBlockItem):
  dual_axis_line_and_column = models.ForeignKey('visualizations.DataStoryDualAxisLineAndColumn', null=True, blank=True,
                                                on_delete=models.CASCADE)

  def __str__(self):
    if not self.title:
      return "Data Story Dual Axis Chart"
    return self.title

  def get_type(self):
    return 'dual_axis'

  class Meta:
    verbose_name = _("Data Story Dual Axis Line And Column Chart")
    verbose_name_plural = _("Data Story Dual Axis Line And Column Charts")


class DataStoryMapChart(BaseDataStoryVisualizationBlockItem):
  map_chart = models.ForeignKey('visualizations.MapChart', null=True, blank=True, on_delete=models.CASCADE)

  def __str__(self):
    if not self.title:
      return "Data Story Map Chart"
    return self.title

  def get_type(self):
    return 'map_chart'

  class Meta:
    verbose_name = _("Data Story Map Chart")
    verbose_name_plural = _("Data Story Map Charts")

class OptionalSchemeURLValidator(URLValidator):
  def __call__(self, value):
    if '://' not in value and value.startswith('/'):
      # Validate as if it were http://
      value = 'http://site.com/' + value
    super(OptionalSchemeURLValidator, self).__call__(value)

class LinkPlugin(ContentItem):
  url = models.CharField(max_length=200, validators=[OptionalSchemeURLValidator()], null=True)
  link_text = models.CharField(max_length=200, null=True)
  external = models.BooleanField(default=False)

  def __str__(self):
    return 'Link Plugin'

  def as_simple_dictionary(self):
    return {
      'text': self.link_text,
      'url': self.url,
      'external': self.external
    }
