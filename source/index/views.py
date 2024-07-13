from django.shortcuts import render
from django.conf import settings
from constance import config
from django.contrib.auth import views as auth_views

def index(request):
    colors = config.COLORS.split(',')
    internal = "true" if settings.INTERNAL_SITE else "false"
    showAgencyPublic = "true" if config.SHOW_AGENCY_PUBLIC else "false"
    showAgencyInternal = "true" if config.SHOW_AGENCY_INTERNAL else "false"
    decimalPoints = config.DECIMAL_POINTS
    letsGoDestionation = config.LETS_GO_DESTINATION
    primaryBarColors = config.PRIMARY_BAR_COLORS.split(',')
    secondaryBarColors = config.SECONDARY_BAR_COLORS.split(',')
    matrixIconColors = config.MATRIX_ICON_COLORS.split(',')
    googleAnalyticsId = config.GOOGLE_ANALYTICS_ID.split(',')
    googleTagManager = config.GOOGLE_TAG_MANAGER_ID.split(',')
    mailchimpHost = config.MAILCHIMP_HOST.split(',')
    mailchimpUserId = config.MAILCHIMP_USER_ID.split(',')
    mailchimpFormId = config.MAILCHIMP_FORM_ID.split(',')
    return render(request, 'index/index.html', context={
      'colors':colors,
      'internal': internal,
      'showAgencyPublic': showAgencyPublic,
      'showAgencyInternal': showAgencyInternal,
      'decimalPoints': decimalPoints,
      'letsGoDestination': letsGoDestionation,
      'primaryBarColors': primaryBarColors,
      'secondaryBarColors': secondaryBarColors,
      'matrixIconColors': matrixIconColors,
      'googleAnalyticsId': googleAnalyticsId,
      'googleTagManager': googleTagManager,
      'mailchimpHost': mailchimpHost,
      'mailchimpUserId': mailchimpUserId,
      'mailchimpFormId': mailchimpFormId,
      'debug': settings.DEBUG
    })


def forgot_password(request):
  if request.method == 'POST':
    return auth_views.PasswordChangeView.as_view(request,
                          from_email=request.POST.get('email'))
  else:
    return render(request, 'forgot_password.html')
