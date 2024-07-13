from django.utils.translation import ugettext_lazy as _
from fluent_contents.extensions import ContentPlugin, plugin_pool

from .models import CommonMetricSankey, CommonMetricBarChart, CommonMetricLineChart, CommonMetricScatterChart, CommonMetricBoxplot, CommonMetricStackedBarChart, CommonMetricDualAxisLineAndColumn
from .models import WysiwygBlockItem, EmbedBlockItem, ImageBlockItem, MapChartBlockItem, LinkPlugin
from .models import DataStorySankey, DataStoryBarChart, DataStoryLineChart, DataStoryScatterChart, DataStoryBoxplot, DataStoryStackedBarChart, DataStoryDualAxisLineAndColumn, DataStoryMapChart


@plugin_pool.register
class LinkBlockPlugin(ContentPlugin):
  model = LinkPlugin
  category = _("Misc blocks")

@plugin_pool.register
class WysiwygBlockPlugin(ContentPlugin):
    model = WysiwygBlockItem
    category = _("Simple blocks")
    cache_output = False # Temporary set for development


@plugin_pool.register
class CommonMetricSankeyPlugin(ContentPlugin):
    model = CommonMetricSankey
    category = _("Visualizations")
    cache_output = False


@plugin_pool.register
class CommonMetricBarChartPlugin(ContentPlugin):
    model = CommonMetricBarChart
    category = _("Visualizations")
    cache_output = False


@plugin_pool.register
class CommonMetricLineChartPlugin(ContentPlugin):
    model = CommonMetricLineChart
    category = _("Visualizations")
    cache_output = False


# @plugin_pool.register
# class CommonMetricScatterChartPlugin(ContentPlugin):
#     model = CommonMetricScatterChart
#     category = _("Visualizations")
#     cache_output = False


# @plugin_pool.register
# class CommonMetricBoxplotPlugin(ContentPlugin):
#     model = CommonMetricBoxplot
#     category = _("Visualizations")
#     cache_output = False


@plugin_pool.register
class CommonMetricStackedBarChartPlugin(ContentPlugin):
    model = CommonMetricStackedBarChart
    category = _("Visualizations")
    cache_output = False


@plugin_pool.register
class CommonMetricDualAxisLineAndColumnPlugin(ContentPlugin):
    model = CommonMetricDualAxisLineAndColumn
    category = _("Visualizations")
    cache_output = False


@plugin_pool.register
class EmbedBlockPlugin(ContentPlugin):
    model = EmbedBlockItem
    category = _("Simple blocks")
    cache_output = False


@plugin_pool.register
class ImageBlockItemPlugin(ContentPlugin):
    model = ImageBlockItem
    category = _("Simple blocks")
    cache_output = False

@plugin_pool.register
class MapChartPlugin(ContentPlugin):
    model = MapChartBlockItem
    category = _("Visualizations")
    cache_output = False
    fieldsets = (
        (None, {
            'fields': ('title', 'short_title', 'description', 'shapefile', 'use_default_map', 'hide_tooltips', 'hide_interactive_legend',)
        }),
        (_("Shape File Coordinate"), {
            'fields': ('hckey', 'shapefile_title', 'shapefile_tooltip_content',)
        }),
        (_("Shape File Coordinate"), {
            'fields': ('latitude', 'longitude', 'coordinate_title', 'coordinate_tooltip_content', )
        })
    )


@plugin_pool.register
class DataStorySankeyPlugin(ContentPlugin):
    model = DataStorySankey
    category = _("Visualizations")
    cache_output = False


@plugin_pool.register
class DataStoryBarChartPlugin(ContentPlugin):
    model = DataStoryBarChart
    category = _("Visualizations")
    cache_output = False

@plugin_pool.register
class DataStoryLineChartPlugin(ContentPlugin):
    model = DataStoryLineChart
    category = _("Visualizations")
    cache_output = False


@plugin_pool.register
class DataStoryScatterChartPlugin(ContentPlugin):
    model = DataStoryScatterChart
    category = _("Visualizations")
    cache_output = False


@plugin_pool.register
class DataStoryBoxplotPlugin(ContentPlugin):
    model = DataStoryBoxplot
    category = _("Visualizations")
    cache_output = False


@plugin_pool.register
class DataStoryStackedBarChartPlugin(ContentPlugin):
    model = DataStoryStackedBarChart
    category = _("Visualizations")
    cache_output = False


@plugin_pool.register
class DataStoryDualAxisLineAndColumnPlugin(ContentPlugin):
    model = DataStoryDualAxisLineAndColumn
    category = _("Visualizations")
    cache_output = False


@plugin_pool.register
class DataStoryMapChartPlugin(ContentPlugin):
    model = DataStoryMapChart
    category = _("Visualizations")
    cache_output = False
