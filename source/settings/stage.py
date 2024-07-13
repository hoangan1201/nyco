from .defaults import *

DEBUG = TEMPLATE_DEBUG = False
LOCAL_SERVE = False

MEDIA_ROOT = get_path(BASE_DIR, '../../../shared/media/')
STATIC_ROOT = get_path(BASE_DIR, '../../../shared/static/')

SECRET_KEY = None

DATABASES = {
    'default': {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "django",
        "HOST": "localhost",
        "USER": "root",
        "PORT": 5433,
        "PASSWORD": "",
    },
}

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.PyLibMCCache',
        'KEY_PREFIX': "django_stage",
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

COMPRESS_CSS_FILTERS = (
    ('compressor.filters.cssmin.CSSMinFilter'),
    ('compressor.filters.css_default.CssAbsoluteFilter'),
)


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
#         'INDEX_NAME': '_stage',
#     }
# }