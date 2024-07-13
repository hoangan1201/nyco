"""
Django settings for django_boilerplate project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# -*- coding: utf-8 -*-
import os
from .tinymce import TinyMCESettings
from django.utils.translation import ugettext_lazy as _
from django.conf import locale
from django.conf import global_settings
import dj_database_url
import sys

env = os.environ.get

# ENVIRONMENT
ENVIRONMENT = env('environment')

########################
# MAIN DJANGO SETTINGS #
########################

AWS_ACCESS_KEY_ID = os.environ.get("AWS_APP_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_APP_SECRET_ACCESS_KEY")
AWS_S3_ACCESS_KEY_ID = os.environ.get("AWS_S3_ACCESS_KEY_ID")
AWS_S3_SECRET_ACCESS_KEY = os.environ.get("AWS_S3_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_S3_BUCKET_NAME")
AWS_S3_ADDRESSING_STYLE = 'path'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
MAINTENANCE_MODE_IGNORE_ADMIN_SITE = True
MAINTENANCE_MODE_TEMPLATE = 'Maintenance_Page.html'

ADMINS = (
    ("Blenderbox", "development@blenderbox.com"),
)

USE_DJANGO_JQUERY = True
JQUERY_URL = False

INTERNAL_SITE = False
if env("INTERNAL") == 'True':
    INTERNAL_SITE = True


def get_path(*args):
    return os.path.realpath(os.path.join(*args))


BASE_DIR = get_path(os.path.dirname(__file__), "../")

# UPDATE: with any server the application is running on. Can be updated in the
# environment specific settings.
ALLOWED_HOSTS = (
    'project.org',
    'project.dev2.bbox.ly',
    'localhost',
    'dev.wdp.bbox.ly',
    '127.0.0.1',
    'staging-public.wdp.bbox.ly',
    'staging-internal.wdp.bbox.ly',
    'internal-stg-alb-wdp-2-1960469157.us-east-1.elb.amazonaws.com',
    'internal-stg-alb-public-wdp-2-1778618308.us-east-1.elb.amazonaws.com',
    'stg.workforcedata.nyc.gov',
    'stage.workforcedataportal.nycnet',
    'internal-prd-alb-wdp-2-1788847635.us-east-1.elb.amazonaws.com',
    'internal-prd-alb-public-wdp-2-1150578492.us-east-1.elb.amazonaws.com',
    'workforcedata.nyc.gov',
    'workforcedataportal.nycnet',
    'internal-wdp-dev-internal-2125775345.us-east-1.elb.amazonaws.com',
    'internal-wdp-dev-public-1767615171.us-east-1.elb.amazonaws.com',
    'dev.workforcedataportal.nycnet'
)

ALLOWED_CIDR_NETS = (
    '10.138.80.0/25',
    '10.138.80.128/25',
    '10.138.109.64/26',
    '10.138.109.0/26'
)

MANAGERS = ADMINS

# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
TIME_ZONE = 'America/New_York'
LANGUAGE_CODE = 'en'
DEFAULT_LANGUAGE = 0
# MODELTRANSLATION_DEFAULT_LANGUAGE = 'fr'
LANGUAGES = [
    ('en', _('English')),
    ('ar', _('Arabic')),
    ('bn', _('Bengali')),
    ('fr', _('French')),
    ('es', _('Spanish')),
    ('pl', _('Polish')),
    ('zh-hant', _('Chinese')),
    ('ht', _('Haitian Creole')),
    ('ko', _('Korean')),
    ('ru', _('Russian')),
    ('ur', _('Urdu')),
]

EXTRA_LANG_INFO = {
    'ht': {
        'bidi': False,  # right-to-left
        'code': 'ht',
        'name': 'Haitian Creole',
        'name_local': 'Kreyòl Ayisyen',  # unicode codepoints here
    },
}

LANGUAGES_BIDI = ['ar', 'ur']
LANGUAGE_ORDERING = ['ar', 'bn', 'zh-hant', 'en',
                     'fr', 'pl', 'ht', 'ko', 'ru', 'es', 'ur']
# Suffixes that are used for model fields marked as translatable.
LANGUAGE_FIELD_SUFFIXES = (
    'en', 'ar', 'bn', 'fr', 'es', 'pl', 'zh_hant', 'ht', 'ko', 'ru', 'ur',
)

LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locale/'),
)


LANG_INFO = locale.LANG_INFO.copy()
LANG_INFO.update(EXTRA_LANG_INFO)
locale.LANG_INFO = LANG_INFO
# Languages using BiDi (right-to-left) layout
global_settings.LANGUAGES = global_settings.LANGUAGES + \
    [("ht", 'Haitian Creole'), ]

PARLER_DEFAULT_LANGUAGE_CODE = 'en'

PARLER_LANGUAGES = {
    1: (
        {'code': 'en'},
        {'code': 'ar'},
        {'code': 'bn'},
        {'code': 'fr'},
        {'code': 'es'},
        {'code': 'pl'},
        {'code': 'zh-hant'},
        {'code': 'ko'},
        {'code': 'ru'},
        {'code': 'ur'},
        {'code': 'ht'},
    ),
}

# UPDATE: Set the project title
SITE_TITLE = "Workforce Data Portal"
SITE_ID = 1

# USE_I18N = True
# USE_L10N = False
# USE_TZ = True

# DEBUG should be set in your local settings, it defaults to False
DEBUG = env('DEBUG')

# This must be set in your local settings file
SECRET_KEY = env('SECRET_KEY')

MESSAGE_STORAGE = 'django.contrib.messages.storage.fallback.FallbackStorage'

MIDDLEWARE = (
    'allow_cidr.middleware.AllowCIDRMiddleware',
    # Caching first
    'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.contrib.redirects.middleware.RedirectFallbackMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',

    # Caching last
    'django.middleware.cache.FetchFromCacheMiddleware',
    
    # maintenance-mode middleware (must be at the end)
    'maintenance_mode.middleware.MaintenanceModeMiddleware',
)

REDIS_PASSWORD = os.getenv('REDIS_PASSWORD', None)
REDIS_HOST = os.getenv('REDIS_HOST', 'redis')
REDIS_PORT = os.getenv('REDIS_PORT', '6379')

#############################################################################
# Cache
#############################################################################
CACHES = {
    'default': {
        'BACKEND': 'redis_cache.RedisCache',
        'LOCATION': '%s:%s' % (REDIS_HOST, REDIS_PORT),
        'OPTIONS': {
            'DB': 4,
            'PASSWORD': REDIS_PASSWORD,
            'CONNECTION_POOL_CLASS': 'redis.BlockingConnectionPool',
            'CONNECTION_POOL_CLASS_KWARGS': {
                'max_connections': 50,
                'timeout': 20,
            },
            'MAX_CONNECTIONS': 1000,
            'PICKLE_VERSION': -1,
        },
    },
}

TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [
        get_path(BASE_DIR, "templates"),
    ],
    'APP_DIRS': True,
    'OPTIONS': {
        'context_processors': (
            'django.contrib.auth.context_processors.auth',
            'django.template.context_processors.debug',
            'django.template.context_processors.i18n',
            'django.template.context_processors.media',
            'django.template.context_processors.static',
            'django.template.context_processors.tz',
            'django.template.context_processors.csrf',
            'django.template.context_processors.request',
            'django.contrib.messages.context_processors.messages',

            'sekizai.context_processors.sekizai',
            'constance.context_processors.config',
        )
    }
}]

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

ROOT_URLCONF = 'settings.urls'

#############
# DATABASES #
#############


DJANGO_MODE = os.environ.get('DJANGO_MODE', '')
DATABASE_URL = os.environ.get('DATABASE_URL', '')
DATA_ROOT = get_path(BASE_DIR, 'data/')
# if DATABASE_URL not specified or running in test, use sqlite
if not DATABASE_URL or len(set(sys.argv) & set(('test', 'zen'))) > 0 or DJANGO_MODE == 'build':
    DATABASE_URL = 'sqlite:///{}'.format(os.path.join(DATA_ROOT, 'db.sqlite3'))
DATABASES = {}
print(DATABASE_URL)
DATABASES['default'] = dj_database_url.parse(DATABASE_URL)
# Dummy cache for dev


#########
# PATHS #
#########

MEDIA_URL = '/media/'
MEDIA_ROOT = '/app/data/media'
if os.environ.get('ENVIRONMENT') == 'local':
    MEDIA_ROOT = '/app/data/media/'
STATICFILES_DIRS = (get_path(BASE_DIR, "../public"),)
AWS_LOCATION = 'media'
AWS_S3_CUSTOM_DOMAIN = os.environ.get('AWS_S3_CUSTOM_DOMAIN')
STATIC_URL = '/static/'
STATIC_ROOT = '/app/data/static/'
STATICFILES_DIRS = (get_path(BASE_DIR, "../public"),)
ADMIN_MEDIA_PREFIX = '%sadmin/' % STATIC_URL

if not env('ENVIRONMENT') == 'local':
    FILER_STORAGES = {
        'public': {
            'main': {
                'ENGINE': 'settings.storage_backends.S3Boto3Storage',
            },
            'thumbnails': {
                'ENGINE': 'settings.storage_backends.S3Boto3Storage',
            }
        }
    }

    THUMBNAIL_DEFAULT_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# UPDATE: Change this to wherever you want the URL to live. Feel free to be
# creative with this one.
ADMIN_NAMESPACE = "manage"


################
# APPLICATIONS #
################

# Local apps
DJANGO_APPS = (

    # modeltranslation has to be before admin
    'modeltranslation',
    'parler',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.humanize',
    'django.contrib.messages',
    'django.contrib.redirects',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.sitemaps',
    'django.contrib.admin',
    'django.contrib.admindocs',
    'django.contrib.staticfiles',
)

THIRD_PARTY_APPS = (
    # Django CMS
    # Has to appear before cms
    'constance',
    'constance.backends.database',
    'django_extensions',
    'filer',
    'fluent_contents',
    'easy_thumbnails',
    'import_export',
    'gunicorn',
    'rest_framework',
    'smart_selects',
    'tinymce',
    'treebeard',
    'webpack_loader',
    'maintenance_mode',
)

# Needed to accurately capture user state in drf
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ('rest_framework.authentication.SessionAuthentication',),
}

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'react/bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    }
}

if not DEBUG:
    WEBPACK_LOADER['DEFAULT'].update({
        'BUNDLE_DIR_NAME': 'dist/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-prod.json')
    })

# UPDATE: remove the news app when not using it. Add new apps here.
LOCAL_APPS = (
    'apps.abstract',
    'apps.page',
    'apps.data_stories',
    'apps.common_metrics',
    'apps.programs',
    'apps.translation_strings',
    'apps.visualizations',
    'apps.plugins',
    'index',
)
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

########################
# APPLICATION SETTINGS #
########################

# UPDATE: Set our akismet key here for any forms we're submitting.
AKISMET_SECRET_API_KEY = ''

# # CKEditor Settings
# CKEDITOR_SETTINGS = {
#     'contentsCss': '{}stylesheets/admin/ckeditor.css'.format(STATIC_URL),  # copy compiled sass/css file here
#     'toolbar': [
#         ('Undo', 'Redo',),
#         ('cmsplugins', '-', 'ShowBlocks',),
#         ('Format', 'Styles',),
#         ('Link', 'Unlink', 'Image', 'Iframe', 'Anchor',),
#         ('PasteText', 'PasteFromWord',),
#         ('Maximize', '',),
#         '/',
#         ('Bold', 'Italic', 'Underline', '-', 'Subscript', 'Superscript', '-', 'RemoveFormat',),
#         ('JustifyLeft', 'JustifyCenter', 'JustifyRight',),
#         ('HorizontalRule',),
#         ('NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Table',),
#         ('Source',)
#     ],
#     'stylesSet': [  #inline styles
#         {
#             'name': 'Button',
#             'element': 'span',
#             'attributes': {'class': 'button'},
#         },
#         {
#             'name': 'Large Paragraph',
#             'element': 'p',
#             'attributes': {'class': 'large'}
#         },
#     ],
# }

# Le CMS
CMS_PLACEHOLDER_CONF = {
    'copy': {
        'plugins': (
            'FilerImagePlugin', 'FilerFilePlugin', 'SnippetPlugin',
            'TextPlugin',
        ),
        'name': 'Copy',
    },
    'home.html copy': {
        'plugins': (
            'SnippetPlugin', 'TextPlugin',
        ),
        'name': 'Copy',
    },
    'aside': {
        'plugins': ('TextPlugin',),
        'name': 'Aside',
    },
}
CMS_TEMPLATES = (
    ('default.html', "Default"),
    ('home.html', "Home"),
)
CMS_REDIRECTS = True
CMS_SEO_FIELDS = True
CMS_USE_TINYMCE = True

COMPRESS_ENABLED = True
COMPASS_COMMAND = ' && '.join([
    'cd %s' % get_path(BASE_DIR, '../', 'public'),
    'sass --scss --compass {infile} {outfile}',
])
COMPRESS_PRECOMPILERS = (
    # Sass
    ('text/x-scss', COMPASS_COMMAND),
    ('text/x-sass', 'sass {infile} {outfile}'),
)

CONSTANCE_BACKEND = 'constance.backends.database.DatabaseBackend'

CONSTANCE_CONFIG = {
    'COLORS': ("#3C72FB, #B49BFF, #972FFA, #36B9E3, #48FACE, #36E360, #D0EE11, #FBE0FC, #E5FFD8, #B49BFF", "Comma seperated list of hex values (in single quotes) of colors for graphs. There should be a minimum of 8."),
    'SHOW_AGENCY_PUBLIC': (False, "Show the Agency filters to the public on Common Metrics", bool),
    'SHOW_AGENCY_INTERNAL': (True, "Show the Agency filters to internal users on Common Metrics", bool),
    'DECIMAL_POINTS': (2, "Display chart data with desired number of decimal points"),
    'LETS_GO_DESTINATION': ("common-metrics", "Select section ID in homepage as let's go button leads (Eg. data-stories)"),
    'PRIMARY_BAR_COLORS': ("#3194E0, #C9EEFE, #0C264D, #003C7A, #071F42", "Comma seperated list of hex values (in single quotes) of colors for primary bar colors in homepage. There should be 5 colors."),
    'SECONDARY_BAR_COLORS': ("#81a1e6, #a8dd7c, #d2fcaf, #c1c7f5, #b0afe9", "Comma seperated list of hex values (in single quotes) of colors for secondary bar colors in homepage. There should be 5 colors."),
    'MATRIX_ICON_COLORS': ("#A8DD7C, #C9EEFE, #2A82C7, #008D49, #4BAC4C, #3194E0, #003C7A, #24588D", "Comma seperated list of hex values (in single quotes) of colors for common matrix icon. There should be 8 colors."),
    'GOOGLE_ANALYTICS_ID': ("UA-XXXXXXX-X", "Google Analytics"),
    'GOOGLE_TAG_MANAGER_ID': ("GTM-XXXXXXX-X", "Google Tag Manager"),
    'MAILCHIMP_HOST': ("us18...", "Mailchimp Host"),
    'MAILCHIMP_USER_ID': ("", "Mailchimp User Id"),
    'MAILCHIMP_FORM_ID': ("", "Mailchimp Form Id")
}

FILER_URL = MEDIA_URL
FILER_ALLOW_REGULAR_USERS_TO_ADD_ROOT_FOLDERS = True

HTML5_DATE_FORMAT = "%Y-%m-%d"
HTML5_DATE_TIME_FORMAT = "%Y-%m-%d %H:%i"

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
         'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    }
}

SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_AGE = None

# Easy Thumbnails
THUMBNAIL_PROCESSORS = (
    'easy_thumbnails.processors.autocrop',
    'easy_thumbnails.processors.colorspace',
    'easy_thumbnails.processors.filters',
    # 'easy_thumbnails.processors.scale_and_crop',
    'filer.thumbnail_processors.scale_and_crop_with_subject_location',
)

# TinyMCE config for the CMS
tinymce_settings = TinyMCESettings(STATIC_URL)
TINYMCE_DEFAULT_CONFIG = tinymce_settings.default_config
TINYMCE_SPELLCHECKER = tinymce_settings.spellchecker

# If using haystack
# HAYSTACK_ROUTERS = ['aldryn_search.router.LanguageRouter',]
# HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'


DATA_UPLOAD_MAX_MEMORY_SIZE = 52428800

FLUENT_CONTENTS_PLACEHOLDER_CONFIG = {
    'visualizations': {
        'plugins': ('CommonMetricSankeyPlugin', 'CommonMetricBarChartPlugin', 'CommonMetricLineChartPlugin', 'CommonMetricStackedBarChartPlugin', 'CommonMetricDualAxisLineAndColumnPlugin',) # 'CommonMetricScatterChartPlugin', 'CommonMetricBoxplotPlugin',
    },
    'content_editor': {
        'plugins': ('WysiwygBlockPlugin', 'EmbedBlockPlugin')
    },
    'data_story_content': {
        'plugins': ('WysiwygBlockPlugin', 'ImageBlockPlugin', 'EmbedBlockPlugin')
    },
    'contents': {
        'plugins': ('WysiwygBlockPlugin', 'ImageBlockItemPlugin', 'EmbedBlockPlugin', 'DataStorySankeyPlugin', 'DataStoryBarChartPlugin', 'DataStoryLineChartPlugin', 'DataStoryScatterChartPlugin', 'DataStoryBoxplotPlugin', 'DataStoryStackedBarChartPlugin', 'DataStoryDualAxisLineAndColumnPlugin', 'DataStoryMapChartPlugin',)
    },
    'second_column': {
        'plugins': ('LinkBlockPlugin',)
    },
    'third_column': {
        'plugins': ('LinkBlockPlugin',)
    }
}

if env('ENVIRONMENT') == 'local':
    # Debug Toolbar
    INSTALLED_APPS += (
        'debug_toolbar',
    )

    MIDDLEWARE += (
        'debug_toolbar.middleware.DebugToolbarMiddleware',
    )

    def show_toolbar(request):
        if 'debug' in request.GET:
            on = request.GET.get('debug') == "on"
            request.session['show_toolbar'] = on
        elif 'show_toolbar' in request.session:
            on = request.session['show_toolbar']
        else:
            on = True
            request.session['show_toolbar'] = on

        return True

    DEBUG_TOOLBAR_CONFIG = {
        'INTERCEPT_REDIRECTS': False,
        'SHOW_TOOLBAR_CALLBACK': 'settings.local.show_toolbar',
    }

    DEBUG_TOOLBAR_PANELS = [
        'debug_toolbar.panels.versions.VersionsPanel',
        'debug_toolbar.panels.timer.TimerPanel',
        'debug_toolbar.panels.settings.SettingsPanel',
        'debug_toolbar.panels.headers.HeadersPanel',
        'debug_toolbar.panels.request.RequestPanel',
        'debug_toolbar.panels.sql.SQLPanel',
        'debug_toolbar.panels.staticfiles.StaticFilesPanel',
        'debug_toolbar.panels.templates.TemplatesPanel',
        'debug_toolbar.panels.cache.CachePanel',
        'debug_toolbar.panels.signals.SignalsPanel',
        'debug_toolbar.panels.logging.LoggingPanel',
        'debug_toolbar.panels.redirects.RedirectsPanel',
    ]

if not os.environ.get('ENVIRONMENT') == 'local':
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = 'email-smtp.us-east-1.amazonaws.com'
    EMAIL_PORT = '587'
    EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
    EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
    EMAIL_USE_TLS = True
    DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL')
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'email-smtp.us-east-1.amazonaws.com'
EMAIL_PORT = '587'
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL')

if not (os.environ.get('ENVIRONMENT') == 'local') and not os.environ.get('ENVIRONMENT') == 'staging':
    REDIS_PASSWORD = os.getenv('REDIS_PASSWORD', None)
    REDIS_HOST = os.getenv('REDIS_HOST', 'redis')
    REDIS_PORT = os.getenv('REDIS_PORT', '6379')

    #############################################################################
    # Cache
    #############################################################################
    CACHES = {
        'default': {
            'BACKEND': 'redis_cache.RedisCache',
            'LOCATION': '%s:%s' % (REDIS_HOST, REDIS_PORT),
            'OPTIONS': {
                'DB': 4,
                'PASSWORD': REDIS_PASSWORD,
                'CONNECTION_POOL_CLASS': 'redis.BlockingConnectionPool',
                'CONNECTION_POOL_CLASS_KWARGS': {
                    'max_connections': 50,
                    'timeout': 20,
                },
                'MAX_CONNECTIONS': 1000,
                'PICKLE_VERSION': -1,
            },
        },
    }