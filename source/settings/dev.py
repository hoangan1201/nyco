from .defaults import *
import yaml

DEBUG = TEMPLATE_DEBUG = True
LOCAL_SERVE = False

MEDIA_ROOT = get_path(BASE_DIR, '../../../shared/media/')
STATIC_ROOT = get_path(BASE_DIR, '../../../shared/static/')

SECRET_KEY = "h+adv!y$y%8ytjw_4o&icx(#2o3kx^kj5iu*2h90wl)wp+e95^"

with open('/var/www/dev.wdp.bbox.ly/shared/source/settings/secrets.yml', 'rb') as f:
    DATABASES = yaml.load(f.read())['dev']['databases']

# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.memcached.PyLibMCCache',
#         'KEY_PREFIX': "wdp_dev",
#         'LOCATION': '127.0.0.1:11211',
#         'TIMEOUT': 300,
#         'BINARY': True,
#         'OPTIONS': {'tcp_nodelay': True, 'ketama': True},
#     },
# }
# CACHE_MIDDLEWARE_ANONYMOUS_ONLY = True
#CONSTANCE_DATABASE_CACHE_BACKEND = 'memcached://127.0.0.1:11211/'

#SESSION_ENGINE = 'django.contrib.sessions.backends.cached_db'
SESSION_ENGINE = "django.contrib.sessions.backends.db"


# INSTALLED_APPS += (
#     'corsheaders',
# )

MIDDLEWARE += (
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.BrokenLinkEmailsMiddleware',
    'django.middleware.common.CommonMiddleware',
)

# CORS_ORIGIN_ALLOW_ALL = True


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

# Allows 404 pages to be tested on dev
CMS_TEMPLATES += (
    ('404.html', "404"),
)


# If using haystack
# HAYSTACK_CONNECTIONS = {
#     'default': {
#         'ENGINE': 'haystack.backends.elasticsearch_backend.ElasticsearchSearchEngine',
#         'URL': 'http://127.0.0.1:9200/',
#         'INDEX_NAME': '_stage',
#     }
# }