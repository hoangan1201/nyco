# import os

from django.conf import settings
from django.conf.urls import include, static, url
from django.urls import path
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.sitemaps.views import sitemap
from django.conf.urls.i18n import i18n_patterns
from django.contrib.auth.views import PasswordResetView
from django.views.generic import TemplateView
from django.http import HttpResponse

# from api.v1.views import PageList
#
admin.autodiscover()

sitemaps = {
}
# urlpatterns = [
#     url(r'^api/', include('api.urls')),
#     url(r'^tinymce/', include('tinymce.urls')),
#     # Django Admin
#     url(r"^%s/" % settings.ADMIN_NAMESPACE, include(admin.site.urls)),
#     url('', include('index.urls')),
# ]
urlpatterns = [
    # Django Admin
    url(r'^accounts/password_reset/', PasswordResetView.as_view(), name='admin_password_reset'),
    url(r'^account/', include('django.contrib.auth.urls')),
    path("%s/" % settings.ADMIN_NAMESPACE, admin.site.urls),
    #Allows you to toggle on/off via super_user url
    url(r'^maintenance-mode/', include('maintenance_mode.urls')),
    url(r'^Maintenance_Page.html', TemplateView.as_view(template_name='Maintenance_Page.html')),
    url(r'^en/sitemap.xml', lambda _: HttpResponse(open('/app/source/sitemap.xml').read(), content_type='text/xml'))
]
urlpatterns += i18n_patterns(
    url(r'^api/', include('api.urls')),
    url(r'^tinymce/', include('tinymce.urls')),
    url('', include('index.urls')),

)

if settings.DEBUG:
    urlpatterns += static.static(
                        settings.MEDIA_URL,
                        document_root=settings.MEDIA_ROOT,
                        show_indexes=True,
                    ) + staticfiles_urlpatterns()
