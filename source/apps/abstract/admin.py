# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import csv
from datetime import datetime

from django.http import HttpResponse

PUBLISHING_INFO = (
    'Publishing Information', {
        'fields': ['public_status', 'internal_status', 'pub_date', 'expire_date', 'updated_date'],
        'classes': ['collapse']
    }
)

PUBLISHING_DISPLAY = ['public_status', 'internal_status']
def make_publicly_published(modeladmin, request, queryset):
  queryset.update(public_status='P')


make_publicly_published.short_description = "Mark selected as published publicly"


def make_publicly_unpublished(modeladmin, request, queryset):
  queryset.update(public_status='D')


make_publicly_unpublished.short_description = "Mark selected as draft publicly"

def make_internally_published(modeladmin, request, queryset):
  queryset.update(internal_status='P')
make_internally_published.short_description = "Mark selected as published internally"

def make_internally_unpublished(modeladmin, request, queryset):
  queryset.update(internal_status='D')
make_internally_unpublished.short_description = "Mark selected as draft internally"

PUBLISHING_ACTIONS = [make_publicly_published, make_publicly_unpublished, make_internally_published, make_internally_unpublished]

def export_select_fields_csv_action(
    description="Export objects as CSV file", fields=None, exclude=None,
    header=True
):
    """
    This function returns an export csv action

    'fields' is a list of tuples denoting the field and label to be exported.
    Labels make up the header row of the exported file if header=True.

        fields=[
                ('field1', 'label1'),
                ('field2', 'label2'),
                ('field3', 'label3'),
            ]

    'exclude' is a flat list of fields to exclude. If 'exclude' is passed,
    'fields' will not be used. Either use 'fields' or 'exclude.'

        exclude=['field1', 'field2', field3]

    'header' is whether or not to output the column names as the first row

    Based on: http://djangosnippets.org/snippets/2020/
    """

    def export_as_csv(modeladmin, request, queryset):
        """
        Generic csv export admin action.
        based on http://djangosnippets.org/snippets/1697/, updated for python3
        """
        date = datetime.strftime(datetime.now(), "%Y.%m.%d.%H%m")

        opts = modeladmin.model._meta

        field_names = [field.name for field in opts.fields]
        labels = []

        if exclude:
            field_names = [v for v in field_names if v not in exclude]
        elif fields:
            field_names = [k for k, v in fields]
            labels = [v for k, v in fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=%s_%s.csv' % (
            str(opts).replace('.', '_'), date
        )

        writer = csv.writer(response)
        if header:
            if labels:
                writer.writerow(labels)
            else:
                writer.writerow(field_names)

        for obj in queryset:
            writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = description
    return export_as_csv
