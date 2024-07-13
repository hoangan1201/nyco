from .defaults import *

DEBUG = TEMPLATE_DEBUG = False
LOCAL_SERVE = False

MEDIA_ROOT = get_path(BASE_DIR, '../../../shared/media/')
STATIC_ROOT = get_path(BASE_DIR, '../../../shared/static/')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'react'), # We do this so that django's collectstatic copies or our bundles to the STATIC_ROOT or syncs them to whatever storage we use.
)


SECRET_KEY = None

DATABASES = {
    'default': {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "django",
        "HOST": "localhost",
        "USER": "root",
        "PASSWORD": "",
    },
}

# Cache settings
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.PyLibMCCache',
        'KEY_PREFIX': "django",
        'LOCATION': '127.0.0.1:11211',
        'TIMEOUT': 300,
        'BINARY': True,
        'OPTIONS': {'behaviors': {'tcp_nodelay': True, 'ketama': True}},
    },
}
CACHE_MIDDLEWARE_ANONYMOUS_ONLY = True
#CONSTANCE_DATABASE_CACHE_BACKEND = 'memcached://127.0.0.1:11211/'

#SESSION_ENGINE = 'django.contrib.sessions.backends.cached_db'
SESSION_ENGINE = "django.contrib.sessions.backends.db"

# Let's take out all the whitespace in our CSS
COMPRESS_CSS_FILTERS = (
    ('compressor.filters.cssmin.CSSMinFilter'),
    ('compressor.filters.css_default.CssAbsoluteFilter'),
)

# Email settings
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_PASSWORD = ''
EMAIL_HOST_USER = ''
EMAIL_PORT = '587'
EMAIL_SUBJECT_PREFIX = '[django.org]'
EMAIL_USE_TLS = True



LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'error_file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filters': ['require_debug_false'],
            'filename': get_path(BASE_DIR, '../../../shared/logs/django_errors.log'),
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins', 'error_file'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

# If using haystack
# HAYSTACK_CONNECTIONS = {
#     'default': {
#         'ENGINE': 'haystack.backends.elasticsearch_backend.ElasticsearchSearchEngine',
#         'URL': 'http://127.0.0.1:9200/',
#         'INDEX_NAME': '_prod',
#     }
# }