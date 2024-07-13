from django import template
from datetime import datetime

from apps.page.models import MainNavigationItem, FooterNavigationItem, Footer
from api.v1.serializers import FooterSerializer
register = template.Library()


@register.simple_tag
def get_main_items():
    items = MainNavigationItem.objects.all().order_by('order')
    return items

@register.simple_tag
def get_footer_items():
    footer = Footer.objects.first()
    firstColumn = MainNavigationItem.objects.all().order_by('order')
    secondColumn = []
    thirdColumn = []
    for item in footer.second_column.get_content_items():
      secondColumn.append(item.as_simple_dictionary())
    for item in footer.third_column.get_content_items():
      thirdColumn.append(item.as_simple_dictionary())

    return {'firstColumn':firstColumn, 'secondColumn': secondColumn, 'thirdColumn': thirdColumn}
