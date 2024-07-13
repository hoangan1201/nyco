import sys

import environ

from .defaults import *


# Read environment vars from .env file
env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)
environ.Env.read_env()

DEBUG = LOCAL_SERVE = env('DEBUG')

SECRET_KEY = env('SECRET_KEY')

# python -m smtpd -n -c DebuggingServer localhost:1025
EMAIL_HOST = "localhost"
EMAIL_PORT = 1025

if len(set(sys.argv) & set(('test', 'zen'))) > 0:
    # Running tests, so just use a sqlite db
    DATABASES = {
        'default': {
            'ENGINE': "django.db.backends.sqlite3",
            'NAME': "test.db",
        },
    }
else:
    # Real database when not testing
    DATABASES = {
        'default': env.db()
    }

# Dummy cache for dev
CACHES = {
    'default': {
        'BACKEND': "django.core.cache.backends.dummy.DummyCache",
    },
}
INTERNAL_IPS = ('127.0.0.1',)

ALLOWED_HOSTS = ["127.0.0.1"]

# DB backed sessions for testing since cache dumps itself
SESSION_ENGINE = "django.contrib.sessions.backends.db"
#
# # Debug Toolbar
# INSTALLED_APPS += (
#     'debug_toolbar',
# )
#
# MIDDLEWARE_CLASSES += (
#     'debug_toolbar.middleware.DebugToolbarMiddleware',
# )
#
#
# def show_toolbar(request):
#     if 'debug' in request.GET:
#         on = request.GET.get('debug') == "on"
#         request.session['show_toolbar'] = on
#     elif 'show_toolbar' in request.session:
#         on = request.session['show_toolbar']
#     else:
#         on = True
#         request.session['show_toolbar'] = on
#
#     return True
#
# DEBUG_TOOLBAR_CONFIG = {
#     'INTERCEPT_REDIRECTS': False,
#     'SHOW_TOOLBAR_CALLBACK': 'settings.local.show_toolbar',
# }
#
# DEBUG_TOOLBAR_PANELS = [
#     'debug_toolbar.panels.versions.VersionsPanel',
#     'debug_toolbar.panels.timer.TimerPanel',
#     'debug_toolbar.panels.settings.SettingsPanel',
#     'debug_toolbar.panels.headers.HeadersPanel',
#     'debug_toolbar.panels.request.RequestPanel',
#     'debug_toolbar.panels.sql.SQLPanel',
#     'debug_toolbar.panels.staticfiles.StaticFilesPanel',
#     'debug_toolbar.panels.templates.TemplatesPanel',
#     'debug_toolbar.panels.cache.CachePanel',
#     'debug_toolbar.panels.signals.SignalsPanel',
#     'debug_toolbar.panels.logging.LoggingPanel',
#     'debug_toolbar.panels.redirects.RedirectsPanel',
# ]
#
