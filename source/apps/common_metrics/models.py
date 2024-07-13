from django.db import models

from tinymce import models as tinymce_models

from apps.abstract.models import OrderedModel
from apps.page.models import PageModel
from apps.programs.models import Program, Agency
from apps.data_stories.models import DataStory
#from apps.visualizations.models import Sankey, BarChart
from django.utils.translation import ugettext_lazy as _
from fluent_contents.models import PlaceholderField
from apps.abstract.models import StatusModel, OrderedModel, TranslatableStatusManager
from parler.models import TranslatableModel, TranslatedFields
from dynamic_decimal.db.fields import DynamicDecimalField



class MetricName(models.Model):
    display_name = models.CharField(max_length=255)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class CommonMetric(StatusModel, TranslatableModel):
    order = models.PositiveSmallIntegerField(
        _("Order"), default=0, help_text=("1 appears before 2, used in landing page dropdown")
    )
    slug = models.SlugField(max_length=255, unique=True)
    data_story = models.ForeignKey(DataStory, related_name='metric_story', blank=True, null=True, on_delete=models.CASCADE)
    # charts = models.ManyToManyField('vis')
    metric_name = models.ForeignKey(MetricName, on_delete=models.CASCADE)
    metric_total = models.CharField(max_length=10)
    visualizations = PlaceholderField("visualizations")
    translations = TranslatedFields(
        title=models.CharField(max_length=255),
        description=models.TextField(),
        distribution_view_tooltip = tinymce_models.HTMLField(null=True, blank=True)
    )
    class Meta:
        ordering = ('order',)
    objects = TranslatableStatusManager()

    def clean(self):
      number = CommonMetricsMarquee.objects.all().values('person_id', 'metric_id')
      if not self.metric_name.id == 11:
        number = number.filter(metric_id = self.metric_name.id)
      self.metric_total = str(len(list(set(list(number.values_list('person_id'))))))



class CommonMetricVisualization(OrderedModel):
    sankey = models.OneToOneField('visualizations.Sankey', blank=True, null=True, on_delete=models.SET_NULL)
    bar_chart = models.OneToOneField('visualizations.BarChart', blank=True, null=True, on_delete=models.SET_NULL)
    stacked_bar_chart = models.OneToOneField('visualizations.StackedBarChart', blank=True,
                                     null=True, on_delete=models.SET_NULL)
    map_chart = models.OneToOneField('visualizations.MapChart', blank=True, null=True, on_delete=models.SET_NULL)
    dual_axis_line_and_column = models.OneToOneField('visualizations.DualAxisLineAndColumn', blank=True, null=True, on_delete=models.SET_NULL)
    line_chart = models.OneToOneField('visualizations.LineChart', blank=True, null=True, on_delete=models.SET_NULL)
    # scatter_chart = models.OneToOneField('visualizations.ScatterChart', blank=True, null=True, on_delete=models.SET_NULL)
    # boxplot = models.OneToOneField('visualizations.Boxplot', blank=True, null=True, on_delete=models.SET_NULL)

    common_metric = models.ForeignKey('CommonMetric', null=True, on_delete=models.SET_NULL)


class MetricCategory(models.Model):
    display_name = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255, primary_key=True, null=False)

    def __str__(self):
        return self.name


class MetricCategorySubGroup(OrderedModel):
    metric_category = models.ForeignKey(MetricCategory, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class MetricFact(models.Model):
    """ """
    metric_name = models.ForeignKey(MetricName, on_delete=models.CASCADE)
    interval_type = models.CharField(max_length=255)
    period = models.CharField(max_length=255)
    category = models.ForeignKey(MetricCategory, on_delete=models.CASCADE)
    subgroup = models.ForeignKey(MetricCategorySubGroup, on_delete=models.CASCADE)
    metric_count = DynamicDecimalField()
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    agency = models.ForeignKey(Agency, on_delete=models.CASCADE)

    def __str__(self):
        return self.metric_name.name


class CommonMetricsMarquee(models.Model):
  agency_id = models.CharField(db_column='AGENCY_ID', max_length=3, blank=True, null=True)  # Field name made lowercase.
  program_id = models.CharField(db_column='program_id', max_length=3, blank=True,
                                null=True)  # Field name made lowercase.
  person_id = models.CharField(db_column='PERSON_ID', max_length=26, blank=True,
                               null=True)  # Field name made lowercase.
  event_dt = models.CharField(db_column='EVENT_DT', max_length=19, blank=True, null=True)  # Field name made lowercase.
  metric_name = models.CharField(db_column='metric_name', max_length=19, blank=True,
                                 null=True)  # Field name made lowercase.
  year = models.BigIntegerField(db_column='year', blank=True, null=True)  # Field name made lowercase.
  fiscal_year = models.BigIntegerField(db_column='FISCAL_YEAR', blank=True, null=True)  # Field name made lowercase.
  quarter_year = models.CharField(db_column='QUARTER_YEAR', max_length=7, blank=True,
                                  null=True)  # Field name made lowercase.
  metric_id = models.IntegerField(db_column='metric_id',
                                  null=True)
  class Meta:
    managed = False
    db_table = 'common_metrics_marquee'
