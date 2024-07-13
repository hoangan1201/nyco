"""
    Endpoints for our JSON API for the Workforce Data Portal React App
"""
from django.conf.urls import url

from .views import (PageDetail, LandingPageList, LandingPageDetail, DataStoryList,
                    DataStoryDetail, ProgramList, ProgramDetail, CommonMetricList, CommonMetricDetail, MarqueNumber, MailChimp )

urlpatterns = [
    url(r'^pages/(?P<slug>[\w-]+)/', PageDetail.as_view()),

    # url(r'^pages/', PageList.as_view()),

    url(r'^landing-pages/(?P<slug>[\w-]+)/', LandingPageDetail.as_view()),

    url(r'^landing-pages/', LandingPageList.as_view()),

    url(r'^data-stories/(?P<slug>[\w-]+)/', DataStoryDetail.as_view()),

    url(r'^data-stories/', DataStoryList.as_view()),

    url(r'^common-metrics/(?P<slug>[\w-]+)/', CommonMetricDetail.as_view()),

    url(r'^common-metrics/', CommonMetricList.as_view()),

    url(r'^programs/(?P<slug>[\w-]+)/', ProgramDetail.as_view()),

    url(r'^programs/', ProgramList.as_view()),

    url(r'^marquee/', MarqueNumber.as_view()),

    url(r'^mailchimp/', MailChimp.as_view()),
]
