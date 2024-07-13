"""Serializer framework for Django Rest"""
from collections import defaultdict
from rest_framework import serializers
from apps.common_metrics.models import CommonMetric, MetricFact, CommonMetricVisualization, CommonMetricsMarquee
from apps.data_stories.models import DataStory, NarrativeSection
from apps.page.models import BasicPage, LandingPage, MainNavigationItem, AgencyItem, FooterNavigationItem, Footer
from apps.programs.models import Program, Contact, Agency, Location, ClientAverage, ProgramLink
from apps.visualizations.models import (
    Sankey, BarChart, DataStorySankey, DataStoryBarChart, DataStoryLineChart, DataStoryLineChartDataSet,
    DataStoryBarChartDataSet, DataStoryLineChartDataSet, DataStoryStackedBarChartDataSet, DataStoryStackedBarChart,
    DataStoryDualAxisLineAndColumnDataSet, DataStorySankeyDataSet, MapChart, Coordinate, ShapeFileCoordinate,
    ScatterChart, DataStoryScatterChart, DataStoryScatterChartDataSet, Boxplot, DataStoryBoxplot, DataStoryBoxplotDataSet
)
import json
import logging
from .helpers import authenticated_helper
from parler_rest.serializers import TranslatableModelSerializer
from parler_rest.fields import TranslatedFieldsField
from fluent_contents.models import ContentItem
from apps.plugins.models import WysiwygBlockItem, BaseVisualizationBlockItem, CommonMetricBarChart
from django.utils.translation import get_language
from easy_thumbnails.files import get_thumbnailer

logger = logging.getLogger(__name__)

class FooterSerializer(serializers.ModelSerializer):
  class Meta:
    model = Footer
    fields = '__all__'

class AgencyItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    """ Agency Item Serializer """
    class Meta:
        model = AgencyItem
        fields = '__all__'

    def get_image(self, obj):
      options = {'size': (0, 150), 'scale': True, 'upscale': True, 'crop': 'smart'}
      image = obj.image
      thumbnail_url = get_thumbnailer(image.file)
      try:
        url = thumbnail_url.get_thumbnail(options).url
      except:
        url = obj.image.url

      return {
        'url': url,
        'alt': image.default_alt_text,
      }

class ProgramLinkSerializer(serializers.ModelSerializer):
    """ Program Link Serializer """
    class Meta:
        model = ProgramLink
        fields = 'url', 'label'


class ContentItemSerializer(serializers.ModelSerializer):
  """ Page Serializer """
  class Meta:
    model = ContentItem
    fields ='__all__'


class WYSIWYGBLOCKItemSerializer(serializers.ModelSerializer):
  type = serializers.SerializerMethodField()
  title = serializers.SerializerMethodField()
  content = serializers.SerializerMethodField()
  """ wyswyg serializer """
  class Meta:
    model = WysiwygBlockItem
    fields = '__all__'

class PageSerializer(TranslatableModelSerializer):
    """ Page Serializer """
    # program_link = ProgramLinkSerializer(many=True, read_only=True, source="program_links")
    agency_items = AgencyItemSerializer(many=True, read_only=True, source="agencies")
    translations = TranslatedFieldsField(shared_model=BasicPage)
    contents = serializers.SerializerMethodField()

    class Meta:
        model = BasicPage
        fields = '__all__'

    def get_contents(self, obj):
      contents = []
      content_items = obj.content.get_content_items().filter(language_code=get_language())
      for content in content_items:
        item = content.as_simple_dictionary()
        contents.append(item)
      return contents

class LandingPageSerializer(serializers.ModelSerializer):
    """ Landing Page Serializer """
    class Meta:
        model = LandingPage
        fields = '__all__'


class MainNavigationItemSerializer(serializers.ModelSerializer):
    """ Main Navigation Item Serializer """

    slug = serializers.SerializerMethodField()

    class Meta:
        model = MainNavigationItem
        fields = '__all__'

    def get_slug(self, obj):
        if obj.basic_page:
            return obj.basic_page.slug
        elif obj.landing_page:
            return obj.landing_page.slug
        else:
            return None


class FooterNavigationItemSerializer(serializers.ModelSerializer):
    """ Footer Navigation Item Serializer """

    slug = serializers.SerializerMethodField()

    class Meta:
        model = FooterNavigationItem
        fields = '__all__'

    def get_slug(self, obj):
        if obj.basic_page:
            return obj.basic_page.slug
        elif obj.landing_page:
            return obj.landing_page.slug
        else:
            return None


class ContactSerializer(serializers.ModelSerializer):
    """ Contact Serializer """
    class Meta:
        model = Contact
        fields = 'order', 'name', 'email', 'phone'


class LocationSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Location
        fields = 'latitude', 'longitude', 'title', 'description'

    def get_title(self, obj):
        program = obj.program
        if program.display_name:
            return program.display_name
        return program.name

    def get_description(self,obj):
        return obj.program.description


class ClientAverageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientAverage
        fields = 'name',


class ProgramSerializer(serializers.ModelSerializer):
    """ Program Serializer """
    contact = ContactSerializer(many=True, read_only=True, source="contact_set")
    location = LocationSerializer(many=True, read_only=True, source="location_set")
    program_link = ProgramLinkSerializer(many=True, read_only=True, source="programlink_set")
    filter_categories = serializers.SerializerMethodField()

    class Meta:
        model = Program
        fields = 'filter_categories', 'contact', 'description', 'program_link', 'name', 'agency', 'location'

    def flatten_list(self, list_to_flatten):
        return [item for sublist in list_to_flatten for item in sublist]

    def get_filter_categories(self, obj):
        populations_served = self.flatten_list(obj.populations_served.all().values_list('name'))
        try:
            average_yearly_clients = obj.average_yearly_clients.name
        except AttributeError:
            average_yearly_clients = ''
        program_types = self.flatten_list(list(obj.program_types.all().values_list('name')))
        neighborhood = self.flatten_list(list(obj.neighborhood.all().values_list('name')))


        return {
            'populations_served' : populations_served,
            'average_yearly_clients': [average_yearly_clients],
            'program_types': program_types,
            'neighborhoods': neighborhood,
            'agency': [obj.agency.acronym],
        }

class CommonMetricSerializer(serializers.ModelSerializer):
    """ Common Metric Serializer """
    # first_common_metric = serializers.SerializerMethodField()
    data_story = serializers.SerializerMethodField()
    translations = TranslatedFieldsField(shared_model=CommonMetric)

    class Meta:
        model = CommonMetric
        fields = ('id', 'translations', 'order', 'description', 'slug', 'title', 'data_story',)

    def get_data_story(self, obj):
        if obj.data_story:
            return obj.data_story.slug
        return None
    # def get_first_common_metric(self, obj):
    #     """ Gets filtered queryset """
    #     return CommonMetricDetailSerializer(instance=CommonMetric.objects.first()).data

    # def get_agency_program_data(self, obj):
    #     """ Gets agency program data """
    #     agency_program_dict = defaultdict(list)
    #     for agency in Agency.objects.all().prefetch_related('program_set'):
    #         for program in agency.program_set.all():
    #             agency_program_dict[agency.acronym].append({program.id:program.name})
    #
    #     return agency_program_dict


def queryset_list_filter(list, key, value):
    """ Gets filtered queryset """
    filtered_list = []
    for inst in list:
        if getattr(inst, key) == value:
            filtered_list.append(inst)
    return filtered_list


class BarChartSerializer(serializers.ModelSerializer):
    """ Bar Chart Serializer """
    metric_facts = serializers.SerializerMethodField()
    chart_type = serializers.SerializerMethodField()

    class Meta:
        model = BarChart
        fields = '__all__'

    def get_chart_type(self, obj):
        """ gets chart type """
        return 'bar_chart'

    def get_metric_facts(self, obj):
        """ gets metric fact """
        metric_facts = MetricFact.objects.all().prefetch_related('subgroup', 'program')
        if obj.metric_name:
            metric_facts = metric_facts.filter(metric_name=obj.metric_name)
        if obj.metric_category:
            metric_facts = metric_facts.filter(category=obj.metric_category)

        metric_facts = list(metric_facts)

        # unique_categories = set([getattr(fact, obj.aggregate_by).name
        # for fact in metric_facts])
        serialized_data = MetricFactSerializer(instance=metric_facts, many=True, context=self.context).data

        return serialized_data


class CommonMetricVisualizationSerializer(serializers.ModelSerializer):
    """ Common Metric Visualization Serializer """
    facts = serializers.SerializerMethodField()
    line_facts = serializers.SerializerMethodField()
    chart_config = serializers.SerializerMethodField()
    hide_interactive_legend = serializers.SerializerMethodField()

    class Meta:
        model = CommonMetricVisualization
        fields = '__all__'

    def metric_facts_filtering(self, obj):
        """ gets metric fact """
        metric_facts = MetricFact.objects.all().prefetch_related('subgroup', 'program', 'agency')
        if obj.metric_name:
            metric_facts = metric_facts.filter(metric_name=obj.metric_name)
        if obj.metric_category.exists():
            metric_facts = metric_facts.filter(category__in=obj.metric_category.all())
        if obj.metric_subgroup.exists():
            metric_facts = metric_facts.filter(subgroup__in=obj.metric_subgroup.all())
        if obj.agency.exists():
            metric_facts = metric_facts.filter(agency__in=obj.agency.all())

        metric_facts = list(metric_facts)

        return MetricFactSerializer(instance=metric_facts,
                                    many=True, context=self.context).data

    def get_line_facts(self, obj):
        _, type = self.find_chart_type(obj)
        if type == 'dual_axis':
            metric_facts = MetricFact.objects.all().prefetch_related('subgroup', 'program', 'agency')
            if obj.dual_axis_line_and_column.metric_name:
                metric_facts = metric_facts.filter(metric_name=obj.dual_axis_line_and_column.metric_name)
            if obj.dual_axis_line_and_column.line_metric_category.exists():
                metric_facts = metric_facts.filter(
                    category__in=obj.dual_axis_line_and_column.line_metric_category.all())
            if obj.dual_axis_line_and_column.line_metric_subgroup.exists():
                metric_facts = metric_facts.filter(
                    subgroup__in=obj.dual_axis_line_and_column.line_metric_subgroup.all())
            if obj.dual_axis_line_and_column.line_agency.exists():
                metric_facts = metric_facts.filter(agency__in=obj.dual_axis_line_and_column.line_agency.all())

            metric_facts = list(metric_facts)

            return MetricFactSerializer(instance=metric_facts,
                                        many=True, context=self.context).data

        return None

    def find_chart_type(self, obj):
        """ gets chart type"""
        if obj.bar_chart:
            return obj.bar_chart, 'bar'

        if obj.stacked_bar_chart:
            return obj.stacked_bar_chart, 'stacked_bar_chart'

        if obj.dual_axis_line_and_column:
            return obj.dual_axis_line_and_column, 'dual_axis'

        if obj.line_chart:
            return obj.line_chart, 'line_chart'

        if obj.scatter_chart:
            return obj.scatter_chart, 'scatter_chart'

        if obj.boxplot:
            return obj.boxplot, 'boxplot'

        return None, None

    def get_facts(self, obj):
        """ gets metric fact"""
        # RETURNS CHART TYPE, UNUSED FOR NOW
        chart, type = self.find_chart_type(obj)

        return self.metric_facts_filtering(chart)

    def get_chart_config(self, obj):
        """ Gets chart config"""
        chart, type = self.find_chart_type(obj)
        config_options = {
            'type': type,
            'title': chart.title,
            'shortTitle': chart.short_title,
            'description': chart.description,
            'xAxisTitle': chart.x_axis_title,
            'yAxisTitle':  chart.y_axis_title,
            'aggregrateBy': chart.aggregate_by,
            'decimalPoints': chart.decimal_points,
            'isYear': chart.is_year,
        }

        if type == 'dual_axis':
            config_options['secondaryYAxisTitle'] = chart.alternate_axis_title

        if type == 'line_chart':
            config_options['isArea'] = chart.is_area

        if type == 'boxplot':
            config_options['colorByCategory'] = chart.color_by_category

        if type == 'scatter_chart':
            config_options['xAxisTickInterval'] = chart.x_axis_tick_interval;

        return config_options

    def get_hide_interactive_legend(self, obj):
        chart, _ = self.find_chart_type(obj)
        if chart.hide_interactive_legend:
            return chart.hide_interactive_legend
        return False


class CommonMetricVisualizationSerializer2(serializers.ModelSerializer):
  """ Common Metric Visualization Serializer """
  facts = serializers.SerializerMethodField()
  line_facts = serializers.SerializerMethodField()
  chart_config = serializers.SerializerMethodField()
  hide_interactive_legend = serializers.SerializerMethodField()

  class Meta:
    model = CommonMetricBarChart
    fields = '__all__'

  def metric_facts_filtering(self, obj):
    """ gets metric fact """
    metric_facts = obj.metric_name.metricfact_set.all().prefetch_related('subgroup', 'program', 'agency')
    if obj.metric_category.exists():
      metric_facts = metric_facts.filter(category__in=obj.metric_category.all())
    if obj.metric_subgroup.exists():
      metric_facts = metric_facts.filter(subgroup__in=obj.metric_subgroup.all())
    if obj.agency.exists():
      metric_facts = metric_facts.filter(agency__in=obj.agency.all())

    metric_facts = list(metric_facts)

    return MetricFactSerializer(instance=metric_facts,
                                many=True, context=self.context).data

  def get_line_facts(self, obj):
    _, type = self.find_chart_type(obj)
    if type == 'dual_axis':
      metric_facts = obj.metric_name.metricfact_set.all().prefetch_related('subgroup', 'program', 'agency')
      if obj.line_metric_category.exists():
        metric_facts = metric_facts.filter(
          category__in=obj.line_metric_category.all())
      if obj.line_metric_subgroup.exists():
        metric_facts = metric_facts.filter(
          subgroup__in=obj.line_metric_subgroup.all())
      if obj.line_agency.exists():
        metric_facts = metric_facts.filter(agency__in=obj.line_agency.all())

      metric_facts = list(metric_facts)

      return MetricFactSerializer(instance=metric_facts,
                                  many=True, context=self.context).data

    return None

  def find_chart_type(self, obj):
    """ gets chart type"""
    return obj, obj.get_type()

  def get_facts(self, obj):
    """ gets metric fact"""
    # RETURNS CHART TYPE, UNUSED FOR NOW
    chart, type = self.find_chart_type(obj)

    return self.metric_facts_filtering(chart)

  def get_chart_config(self, obj):
    """ Gets chart config"""
    chart, type = self.find_chart_type(obj)
    config_options = {
      'type': type,
      'title': chart.title,
      'shortTitle': chart.short_title,
      'description': chart.description,
      'xAxisTitle': chart.x_axis_title,
      'yAxisTitle': chart.y_axis_title,
      'aggregrateBy': chart.aggregate_by,
      'chart_tooltip': chart.chart_tooltip,
      'decimalPoints': chart.decimal_points,
      'isYear': chart.is_year,
    }

    if type == 'dual_axis':
      config_options['secondaryYAxisTitle'] = chart.alternate_axis_title

    if type == 'line_chart':
        config_options['isArea'] = chart.is_area

    if type == 'boxplot':
        config_options['colorByCategory'] = chart.color_by_category

    if type == 'scatter_chart':
        config_options['xAxisTickInterval'] = chart.x_axis_tick_interval;

    return config_options

  def get_hide_interactive_legend(self, obj):
    chart, _ = self.find_chart_type(obj)
    if chart.hide_interactive_legend:
      return chart.hide_interactive_legend
    return False


class CommonMetricDetailListSerializer(serializers.ModelSerializer):
    """ Common Metric Serializer """
    common_metric_menu_items = serializers.SerializerMethodField()
    agency_program_data = serializers.SerializerMethodField()
    page_info = serializers.SerializerMethodField()
    common_metric = serializers.SerializerMethodField()

    class Meta:
        model = CommonMetric
        fields = ('common_metric_menu_items', 'agency_program_data', 'common_metric', 'page_info')

    def get_common_metric_menu_items(self, obj):
        # GETS ALL COMMON METRICS TO POPULATE MENU

        common_metric_menu_items = []
        common_metrics = authenticated_helper(CommonMetric.objects.all().prefetch_related('translations'), self.context['user'])

        for common_metric in common_metrics:
            common_metric_menu_items.append(CommonMetricSerializer(instance=common_metric).data)

        return common_metric_menu_items

    def get_agency_program_data(self, obj):
        """ Gets agency program data """
        agency_program_dict = defaultdict(list)
        for agency in Agency.objects.all().prefetch_related('program_set'):
            program_qs = authenticated_helper(agency.program_set.all().order_by('display_name'), self.context['user'])
            for program in program_qs:
                agency_label = agency.acronym
                if agency.display_name:
                    agency_label = agency.display_name
                program_name = program.name
                if program.display_name:
                    program_name = program.display_name
                agency_program_dict[agency_label].append({program.workforce_id: program_name})

        return agency_program_dict

    def get_common_metric(self, obj):
        return CommonMetricDetailSerializer(instance=obj).data

    def get_page_info(self, obj):
        return LandingPageSerializer(instance=LandingPage.objects.get(slug='common-metrics')).data

class CommonMetricDetailSerializer(serializers.ModelSerializer):
    """ Serializer for common metric detail page"""
    # visualization = CommonMetricVisualizationSerializer(
    #     many=True,
    #     read_only=True,
    #     source="commonmetricvisualization_set")
    year_range = serializers.SerializerMethodField()
    quarter_year_range = serializers.SerializerMethodField()
    translations = TranslatedFieldsField(shared_model=CommonMetric)
    visualization = serializers.SerializerMethodField()
    marqueeNumber = serializers.SerializerMethodField()
    metric_id = serializers.SerializerMethodField()


    class Meta:
        model = CommonMetric
        fields = ('id', 'metric_id', 'year_range', 'quarter_year_range', 'visualization', 'translations', 'description', 'title', 'metric_total', 'marqueeNumber')

    def get_metric_id(self, obj):
      return obj.metric_name.id

    def get_marqueeNumber(self,obj):
      return int(obj.metric_total.replace(',', ''))


    def get_visualization(self, obj):
      content_items = obj.visualizations.get_content_items().filter(language_code=get_language()).prefetch_related(
        'metric_name',
        'metric_name__metricfact_set',
      )
      return CommonMetricVisualizationSerializer2(content_items, many=True).data

    def get_year_range(self, obj):
        years = list(MetricFact.objects.filter(metric_name=obj.metric_name, interval_type="YEAR")
                      .order_by('period').values_list('period', flat=True))

        first_year = int(years[0])
        last_year = int(years[-1])+1

        year_range = [str(year) for year in range(first_year, last_year)]

        return year_range
    
    def append_quarter_to_list_helper(self, quarter, year_range, result):
        year_substr, quarter_substr = quarter.lower().split('-q')
        year_substr = int(year_substr)
        quarter_substr = int(quarter_substr)

        # Need to correct for some outliers, e.g. a single quarter with data from 2015-Q4,
        # because yearly data doesn't actually begin until 2017.
        # Let's only show quarters within the year range
        if year_substr >= int(year_range[0]) and year_substr <= int(year_range[-1]):
            result.append(quarter)

        return year_substr, quarter_substr

    def get_quarter_year_range(self, obj):
        quarters = list(MetricFact.objects.filter(
            metric_name=obj.metric_name, interval_type="QUARTER_YEAR"
        ).order_by('period').values_list('period', flat=True))

        quarter_range = []
        first_quarter = quarters[0]
        last_quarter = quarters[-1]

        year_range = self.get_year_range(obj)

        # Add all quarters between first_quarter and last_quarter
        cur_quarter: str = first_quarter
        while (cur_quarter != last_quarter):
            year_substr, quarter_substr = self.append_quarter_to_list_helper(cur_quarter, year_range, quarter_range)
            
            if (quarter_substr == 4):
                cur_quarter = f'{year_substr + 1}-Q1'
            else:
                cur_quarter = f'{year_substr}-Q{quarter_substr + 1}'
               
        self.append_quarter_to_list_helper(last_quarter, year_range, quarter_range)

        return quarter_range


class SankeySerializer(serializers.ModelSerializer):
    """ Serializer for sankey"""
    class Meta:
        model = Sankey
        fields = '__all__'


class MetricFactSerializer(serializers.ModelSerializer):
    """ Serializer for single metric fact"""
    program = serializers.SerializerMethodField()
    subgroup = serializers.SerializerMethodField()
    agency = serializers.SerializerMethodField()

    class Meta:
        model = MetricFact
        fields = ('category', 'subgroup', 'metric_count', 'program', 'agency', 'interval_type', 'period')


    def get_program(self, obj):
        return self.preferred_name(obj.program)

    def get_agency(self, obj):
        if self.preferred_name(obj.agency):
            return self.preferred_name(obj.agency)
        return obj.agency.acronym

    def get_subgroup(self, obj):
        return self.preferred_name(obj.subgroup)

    def preferred_name(self, obj):
        if obj.display_name:
            return obj.display_name
        return obj.name


class DataStoryStackedBarChartDataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataStoryStackedBarChartDataSet
        fields = ['series_name', 'series_data']


class NarrativeSectionSerializer(serializers.ModelSerializer):
    """ Narrative Section Serializer """
    chart = serializers.SerializerMethodField()

    class Meta:
        model = NarrativeSection
        fields = ['chart', 'title', 'description', 'order']

    def get_chart(self, obj):
        if obj.stacked_bar_chart:
            return DataStoryStackedBarChartSerializer(instance=obj.stacked_bar_chart).data
        if obj.bar_chart:
            return DataStoryBarChartSerializer(instance=obj.bar_chart).data
        if obj.line_chart:
            return DataStoryLineChartSerializer(instance=obj.line_chart).data
        if obj.scatter_chart:
            return DataStoryScatterChartSerializer(instance=obj.scatter_chart).data
        if obj.boxplot:
            return DataStoryBoxplotSerializer(instance=obj.boxplot).data
        if obj.dual_axis_line_and_column:
            return DataStoryDualAxisCharSerializer(instance=obj.dual_axis_line_and_column).data
        if obj.sankey:
            return DataStorySankeySerializer(instance=obj.sankey).data
        if obj.map_chart:
            return MapChartSerializer(instance=obj.map_chart).data
            return None


class CoordinateSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    class Meta:
        model = Coordinate
        fields = 'latitude', 'longitude', 'title'

    def get_title(self, obj):
        return '<span class="map_tooltip_title">' + obj.title + '</span><br/>' + '<span class="map_tooltip_content">' + obj.tooltip_content + '</span>'


class ShapeFileCoordinateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShapeFileCoordinate
        fields = 'hckey', 'title', 'tooltip_content'

class MapChartSerializer(serializers.ModelSerializer):
    chart_config = serializers.SerializerMethodField()
    coordinates = CoordinateSerializer(many=True, read_only=True, source="coordinate_set")
    shapefile_coordinates= ShapeFileCoordinateSerializer(many=True, read_only=True, source="shapefilecoordinate_set")
    shapefile = serializers.SerializerMethodField()
    class Meta:
        model = MapChart
        fields = 'chart_config', 'coordinates', 'shapefile_coordinates', 'use_default_map', 'shapefile'

    def get_shapefile(self,obj):
      if obj.shapefile_file:
        return json.loads(obj.shapefile_file.file.read())
      else:
        return obj.shapefile

      return False
    def get_chart_config(self, obj):
        chart_options = {
            'type': 'map_chart',
            'title': obj.title,
            'tableColumn': obj.table_column_name,
            'shortTitle': obj.short_title,
            'description': obj.description,
        }

        return chart_options


class DataStoryListSerializer(TranslatableModelSerializer):
  """ Data Story Serializer """
  page_info = serializers.SerializerMethodField()
  translations = TranslatedFieldsField(shared_model=DataStory)

  def get_page_info(self, obj):
    return LandingPageSerializer(instance=LandingPage.objects.get(slug='data-stories')).data


  class Meta:
    model = DataStory
    fields = '__all__'


class DataStorySerializer(TranslatableModelSerializer):
    """ Data Story Serializer """
    narrative_section = NarrativeSectionSerializer(many=True, read_only=True, source="narrativesection_set")
    page_info = serializers.SerializerMethodField()
    contents = serializers.SerializerMethodField()
    translations = TranslatedFieldsField(shared_model=DataStory)

    def get_page_info(self, obj):
        return LandingPageSerializer(instance=LandingPage.objects.get(slug='data-stories')).data

    def get_contents(self, obj):
      contents = []
      content_items = obj.contents.get_content_items().filter(language_code=get_language())
      for content in content_items:
        content_plugins = ['wysiwygblockitem', 'imageblockitem', 'embedblockitem']
        if content.polymorphic_ctype.model in content_plugins:
          item = content.as_simple_dictionary()
          contents.append(item)
        else:
          if content.polymorphic_ctype.model == 'datastorybarchart':
            contents.append(DataStoryBarChartSerializer(instance=content.bar_chart).data)
          elif content.polymorphic_ctype.model == 'datastorylinechart':
            contents.append(DataStoryLineChartSerializer(instance=content.line_chart).data)
          elif content.polymorphic_ctype.model == 'datastoryscatterchart':
            contents.append(DataStoryScatterChartSerializer(instance=content.scatter_chart).data)
          elif content.polymorphic_ctype.model == 'datastoryboxplot':
            contents.append(DataStoryBoxplotSerializer(instance=content.boxplot).data)
          elif content.polymorphic_ctype.model == 'datastorystackedbarchart':
            contents.append(DataStoryStackedBarChartSerializer(instance=content.stacked_bar_chart).data)
          elif content.polymorphic_ctype.model == 'datastorydualaxislineandcolumn':
            contents.append(DataStoryDualAxisCharSerializer(instance=content.dual_axis_line_and_column).data)
          elif content.polymorphic_ctype.model == 'datastorymapchart':
            contents.append(MapChartSerializer(instance=content.map_chart).data)
          elif content.polymorphic_ctype.model == 'datastorysankey':
            contents.append(DataStorySankeySerializer(instance=content.sankey).data)
      return contents

    class Meta:
        model = DataStory
        fields = '__all__'


def get_chart_options(obj, type):
    chart_options = {
        'type': type,
        'title': obj.title,
        'shortTitle': obj.short_title,
        'description': obj.description,
        'data_notes': obj.data_notes,
        'xAxisTitle': obj.x_axis_title,
        'yAxisTitle':  obj.y_axis_title,
      'decimalPoints': obj.decimal_points,
      'isYear': obj.is_year,
    }

    if type == 'dual_axis':
        chart_options['secondaryYAxisTitle'] = obj.alternate_axis_title

    if type == 'line_chart':
        chart_options['isArea'] = obj.is_area

    if type == 'boxplot':
        chart_options['colorByCategory'] = obj.color_by_category

    if type == 'scatter_chart':
        chart_options['xAxisTickInterval'] = obj.x_axis_tick_interval;

    return chart_options


class DataStoryStackedBarChartSerializer(serializers.ModelSerializer):
    chart_data = DataStoryStackedBarChartDataSetSerializer(
        many=True,
        read_only=True,
        source="datastorystackedbarchartdataset_set"
    )
    chart_config = serializers.SerializerMethodField()

    class Meta:
        model = DataStoryStackedBarChart
        fields = ['hide_tooltips', 'hide_interactive_legend', 'categories', 'suffix', 'chart_data', 'chart_config']

    def get_chart_config(self, obj):
        """ Gets chart config"""
        return get_chart_options(obj, 'stacked_bar_chart')


class DataStoryBarChartDataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataStoryBarChartDataSet
        fields = ['series_name', 'series_data']

class DataStoryLineChartDataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataStoryLineChartDataSet
        fields = ['series_name', 'series_data']

class DataStoryScatterChartDataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataStoryScatterChartDataSet
        fields = ['series_name', 'series_data']

class DataStoryBoxplotDataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataStoryBoxplotDataSet
        fields = ['series_name', 'series_data', 'series_outliers']


class DataStoryBarChartSerializer(serializers.ModelSerializer):
    chart_data = DataStoryBarChartDataSetSerializer(
        many=True,
        read_only=True,
        source="datastorybarchartdataset_set"
    )
    chart_config = serializers.SerializerMethodField()

    class Meta:
        model = DataStoryBarChart
        fields = ['hide_tooltips', 'hide_interactive_legend', 'categories', 'suffix', 'chart_data', 'chart_config']

    def get_chart_config(self, obj):
        """ Gets chart config"""
        return get_chart_options(obj, 'bar_chart')

class DataStoryLineChartSerializer(serializers.ModelSerializer):
    chart_data = DataStoryLineChartDataSetSerializer(
        many=True,
        read_only=True,
        source="datastorylinechartdataset_set"
    )
    chart_config = serializers.SerializerMethodField()

    class Meta:
        model = DataStoryLineChart
        fields = ['hide_tooltips', 'hide_interactive_legend', 'categories', 'suffix', 'chart_data', 'chart_config']

    def get_chart_config(self, obj):
        """ Gets chart config"""
        return get_chart_options(obj, 'line_chart')

class DataStoryScatterChartSerializer(serializers.ModelSerializer):
    chart_data = DataStoryScatterChartDataSetSerializer(
        many=True,
        read_only=True,
        source="datastoryscatterchartdataset_set"
    )
    chart_config = serializers.SerializerMethodField()

    class Meta:
        model = DataStoryScatterChart
        fields = ['hide_tooltips', 'hide_interactive_legend', 'suffix', 'chart_data', 'chart_config', 'x_axis_tick_interval']

    def get_chart_config(self, obj):
        """ Gets chart config"""
        return get_chart_options(obj, 'scatter_chart')
    
class DataStoryBoxplotSerializer(serializers.ModelSerializer):
    chart_data = DataStoryBoxplotDataSetSerializer(
        many=True,
        read_only=True,
        source="datastoryboxplotdataset_set"
    )
    chart_config = serializers.SerializerMethodField()

    class Meta:
        model = DataStoryBoxplot
        fields = ['hide_tooltips', 'hide_interactive_legend', 'categories', 'chart_data', 'chart_config']

    def get_chart_config(self, obj):
        """ Gets chart config"""
        return get_chart_options(obj, 'boxplot')



class DataStoryDualAxisChartDataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataStoryDualAxisLineAndColumnDataSet
        fields = ['series_name', 'series_data', 'dual_axis_type']


class DataStoryDualAxisCharSerializer(serializers.ModelSerializer):
    chart_data = DataStoryDualAxisChartDataSetSerializer(
        many=True,
        read_only=True,
        source="datastorydualaxislineandcolumndataset_set"
    )
    chart_config = serializers.SerializerMethodField()

    class Meta:
        model = DataStoryBarChart
        fields = ['hide_tooltips', 'hide_interactive_legend', 'categories', 'suffix', 'chart_data', 'chart_config']

    def get_chart_config(self, obj):
        """ Gets chart config"""
        return get_chart_options(obj, 'dual_axis')


class DataStorySankeyDataSetSerializer(serializers.ModelSerializer):
    sankey_data = serializers.SerializerMethodField()
    class Meta:
        model = DataStorySankeyDataSet
        fields = ['sankey_data']

    def get_sankey_data(self, obj):
        return obj.sankey_line.splitlines()


class DataStorySankeySerializer(serializers.ModelSerializer):
    chart_data = DataStorySankeyDataSetSerializer(
        many=True,
        read_only=True,
        source="datastorysankeydataset_set"
    )
    chart_config = serializers.SerializerMethodField()

    class Meta:
        model = DataStorySankey
        fields = '__all__'

    def get_chart_config(self, obj):
        """ Gets chart config"""
        return get_chart_options(obj, 'sankey')
