import debug_toolbar
from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^chaining/', include('smart_selects.urls')),
    url(r'^__debug__/', include(debug_toolbar.urls)),
    url('', views.index, name="index"),

]
