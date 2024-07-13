# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.http import Http404
from django.template import RequestContext


def get_status_object_or_404(model, **kwargs):
    """ Checks for an object in the given model with the given
    kwargs, but also checks if it's published. This will raise
    a 404 if the object does not exist.
    """
    try:
        obj = model.objects.published_or_hidden().get(**kwargs)

    except model.DoesNotExist:
        raise Http404

    else:
        return obj


def get_status_list_or_404(model, **kwargs):
    """ Attempts to get a list of objects in the given model with
    the given kwargs, but also checks if they're published. This
    will raise a 404 error if the list is empty.
    """
    objs = model.objects.published().filter(**kwargs)

    try:
        assert objs.exists()

    except AssertionError:
        raise Http404

    else:
        return objs
