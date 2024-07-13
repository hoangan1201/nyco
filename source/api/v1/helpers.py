from django.conf import settings
def authenticated_helper(qs, user):
    if not user.is_authenticated:
      if settings.INTERNAL_SITE:
        qs = qs.filter(internal_status='P')
      else:
        qs = qs.filter(public_status='P')
    return qs

