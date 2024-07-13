"""
    Endpoints for our JSON API for the Workforce Data Portal React App
"""
from django.conf.urls import url, include

urlpatterns = [
    url(r'^v1/', include('api.v1.urls')),
]