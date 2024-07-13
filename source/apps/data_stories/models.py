from django.db import models

from tinymce import models as tinymce_models

from apps.page.models import PageModel
from apps.abstract.models import OrderedModel, StatusModel, TranslatableStatusManager
#from apps.visualizations.models import Sankey
from fluent_contents.models import PlaceholderField
from parler.models import TranslatableModel, TranslatedFields


class DataStory(StatusModel, TranslatableModel):
    slug = models.SlugField(max_length=255, unique=True)
    icon = models.CharField(null=True, blank=True, max_length=255, choices=(
        ('Column', 'Column Icon'),
        ('Dots', 'Dots Icon'),
        ('Histogram', 'Histogram Icon'),
        ('Bar', 'Bar Icon'),
        ('Sankey', 'Sankey Icon'),
    ), default=('Column', 'Column Icon'))
    homepage_featured = models.BooleanField(default=False)
    contents = PlaceholderField("contents")
    translations = TranslatedFields(
        title=models.CharField(max_length=255),
        description = models.TextField()
    )


    objects = TranslatableStatusManager()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "data stories"


class NarrativeSection(OrderedModel):
    title = models.CharField(max_length=255)
    description = models.TextField()

    data_story = models.ForeignKey('DataStory', null=True, on_delete=models.SET_NULL)

    # visualizations foreignkeys
    sankey = models.ForeignKey('visualizations.DataStorySankey', related_name='narrative_sankey', null=True, blank=True, on_delete=models.CASCADE)
    bar_chart = models.ForeignKey('visualizations.DataStoryBarChart', related_name='narrative_bar_chart', null=True, blank=True, on_delete=models.CASCADE)
    stacked_bar_chart = models.ForeignKey('visualizations.DataStoryStackedBarChart', related_name='narrative_stacked_bar_chart', null=True, blank=True, on_delete=models.CASCADE)
    map_chart = models.ForeignKey('visualizations.MapChart', related_name='narrative_map', null=True, blank=True, on_delete=models.CASCADE)
    dual_axis_line_and_column = models.ForeignKey('visualizations.DataStoryDualAxisLineAndColumn', related_name='narrative_axis_chart', null=True, blank=True, on_delete=models.CASCADE)
    line_chart = models.ForeignKey('visualizations.DataStoryLineChart', related_name='narrative_line_chart', null=True,
                                  blank=True, on_delete=models.CASCADE)
    scatter_chart = models.ForeignKey('visualizations.DataStoryScatterChart', related_name='narrative_scatter_chart', null=True, blank=True, on_delete=models.CASCADE)
    boxplot = models.ForeignKey('visualizations.DataStoryBoxplot', related_name='narrative_boxplot', null=True, blank=True, on_delete=models.CASCADE)
