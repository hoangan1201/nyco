import json
import logging
import requests
import os

from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import generics, permissions, status, viewsets
from rest_framework.decorators import api_view, detail_route, list_route, permission_classes
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from django.db.models import Count

from .serializers import (
    PageSerializer, LandingPageSerializer, MainNavigationItemSerializer, DataStorySerializer, DataStoryListSerializer,
    ProgramSerializer, CommonMetricDetailListSerializer)
from .helpers import authenticated_helper
from apps.page.models import BasicPage, LandingPage, MainNavigationItem
from apps.data_stories.models import DataStory, NarrativeSection
from apps.common_metrics.models import CommonMetric, CommonMetricsMarquee
from apps.programs.models import Program

logger = logging.getLogger(__name__)

class SiteListAPIView(generics.ListAPIView):
  def list(self, request, *args, **kwargs):
    queryset = self.filter_queryset(self.get_queryset())

    user = self.request.user
    queryset = authenticated_helper(self.queryset.all(), user)

    serializer = self.get_serializer(queryset, many=True)
    return Response(serializer.data)


class PageDetail(APIView):

    def get(self, request, slug, format=None):
        user = request.user
        queryset = authenticated_helper(BasicPage.objects.all(), user)
        page = get_object_or_404(queryset, slug=slug)

        serializer = PageSerializer(page)
        return Response(serializer.data)


# class PageList(generics.ListAPIView):
#
#     queryset = BasicPage.objects.all()
#     serializer_class = PageSerializer


class LandingPageDetail(APIView):

    def get(self, request, slug, format=None):
        user = request.user
        queryset = authenticated_helper(LandingPage.objects.all(), user)
        page = get_object_or_404(queryset, slug=slug)
        serializer = LandingPageSerializer(page)
        return Response(serializer.data)


class LandingPageList(SiteListAPIView):

  serializer_class = LandingPageSerializer
  queryset = LandingPage.objects.all()

  # def get_queryset(self):
  #   user = self.request.user
  #   queryset = authenticated_helper(self.queryset, user)
  #   return queryset

class MainNavigationItemList(SiteListAPIView):

    queryset = MainNavigationItem.objects.all()
    serializer_class = MainNavigationItemSerializer

    def get_queryset(self):
      user = self.request.user
      queryset = authenticated_helper(self.queryset, user)
      return queryset


class DataStoryDetail(APIView):

    def get_serializer_context(self):
        return {"slug": self.kwargs['slug']}

    def get(self, request, slug, format=None):
        user = request.user
        queryset = authenticated_helper(DataStory.objects.all(), user)

        page = get_object_or_404(queryset, slug=slug)
        serializer = DataStorySerializer(page)
        return Response(serializer.data)


class DataStoryList(SiteListAPIView):
    queryset = DataStory.objects.all()
    serializer_class = DataStoryListSerializer


class CommonMetricDetail(APIView):

    # Cache page for the requested url
    @method_decorator(cache_page(60*60*2))
    def get(self, request, slug, format=None):
        user = request.user
        queryset = authenticated_helper(CommonMetric.objects.prefetch_related('metric_name', 'translations'), user)
        page = get_object_or_404(queryset, slug=slug)
        serializer = CommonMetricDetailListSerializer(
            page,
            context={'user': request.user}
        )

        return Response(serializer.data)


class CommonMetricList(APIView):
    @method_decorator(cache_page(60 * 60 * 2))
    def get(self, request, slug=None, format=None):
        common_metric = authenticated_helper(CommonMetric.objects.prefetch_related('metric_name', 'translations').all(), request.user)
        page = common_metric.first()
        serializer = CommonMetricDetailListSerializer(
            page,
            context={'user': request.user}
        )

        return Response(serializer.data)


class ProgramDetail(APIView):
    def get(self, request, slug, format=None):
        user = request.user
        queryset = authenticated_helper(Program.objects.all(), user)
        page = get_object_or_404(queryset, slug=slug)
        serializer = ProgramSerializer(page)
        return Response(serializer.data)


class ProgramList(SiteListAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer


class MarqueNumber(APIView):
  def get(self, request, format=None):
      programs = request.GET.getlist('programs[]')
      years = request.GET.getlist('years[]')
      quarter_year = request.GET.getlist('quarterYears[]')
      slug = int(request.GET.get('metric'))
      number = CommonMetricsMarquee.objects.all()
      if not slug == 11:
        number = CommonMetricsMarquee.objects.filter(metric_id=slug)
      if quarter_year:
        number = number.filter(quarter_year__in=quarter_year)
      if programs:
        number = number.filter(program_id__in=programs)
      if years:
        number = number.filter(year__in=years)
      count = len(list(set(list(number.values_list('person_id')))))
      return Response({'count':count})
  
class MailChimp(APIView):
   def get(self, request, format=None):
      env = os.environ.get
      API_KEY = env('API_KEY')
      LIST_ID = env('LIST_ID')
      LOCATION = env('LOCATION')
      
      api_url = f'https://{LOCATION}.mailchimp.com/3.0/lists/{LIST_ID}/members'

      headers = {
          'Content-Type': 'application/json',
          'Authorization': f'apikey {API_KEY}'
      }

      req = json.loads(request.GET.get('data'))

      data = {
        'email_address': req['email_address'],
        'status': req['status'],
        'merge_fields': {
            'MMERGE1': req['merge_fields']['MMERGE1'],
            'MMERGE8': req['merge_fields']['MMERGE8'],
            'MMERGE7': req['merge_fields']['MMERGE7'],
        }
      }
      
      response = requests.post(api_url, headers=headers, data=json.dumps(data))

      if response.status_code == requests.codes.ok:
          response_json = json.loads(response.content)
      else:
          return Response({'response': json.loads(response.content)})

      return Response({'response': response_json})
