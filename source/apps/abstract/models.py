# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import datetime

from django.db import models
from django.utils.translation import ugettext_lazy as _
from parler.managers import TranslatableManager

# Use **BLANK instead of null=True, blank=True
BLANK = {'blank': True, 'null': True}

# Set up the statuses so they're globally accessible
HIDDEN, DRAFT, PUBLISHED = 'H', 'D', 'P'

STATUSES = (
    (DRAFT, "Draft"),
    (PUBLISHED, "Published"),
)


class CommonModel(models.Model):
    """ This is an abstract model which will be inherited by nearly all models.
    When the object is created it will get a created_at timestamp and each
    time it is modified it will recieve a updated_at time stamp as well.
    """
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(
        _("Updated at"), auto_now=True, db_index=True, editable=False)

    def get_meta_name(self):
        return self._meta.object_name

    class Meta:
        abstract = True


class OrderedModel(models.Model):
    """ An abstract model for ordering via an integer.
    """
    order = models.PositiveSmallIntegerField(
        _("Order"), default=0, help_text=("1 appears before 2")
    )

    class Meta:
        abstract = True
        ordering = ('order',)


class StatusManager(models.Manager):
    """ This adds a query method to pull all published records. """
    def published(self):
        today = datetime.date.today()

        return super(StatusManager, self).filter(
            status=PUBLISHED,
            pub_date__lte=today,
        ).filter(
            models.Q(expire_date__gt=today) |
            models.Q(expire_date__isnull=True)
        )

    def published_or_hidden(self):
        today = datetime.date.today()

        return super(StatusManager, self).filter(
            status__in=[PUBLISHED, HIDDEN],
            pub_date__lte=today,
        ).filter(
            models.Q(expire_date__gt=today) |
            models.Q(expire_date__isnull=True)
        )


class TranslatableStatusManager(StatusManager, TranslatableManager):
    pass


class StatusModel(CommonModel):
    """ This abstract model has the same properties as the Common Model, but it
    allows for statuses to be applied to the object.
    """
    expire_date = models.DateField(
        _("Expiration Date"), blank=True, db_index=True, null=True)
    pub_date = models.DateField(
        _("Published Date"), db_index=True, default=datetime.date.today,
        help_text=_("Date to be published")
    )
    updated_date = models.DateField(
        _("Updated Date"), blank=True, db_index=True, null=True,
        help_text=_("Updated Date")
    )
    internal_status = models.CharField(
        _("Internal Status"), max_length=1, choices=STATUSES, default=DRAFT,
        help_text="Draft hides it from unauthenticated users."
    )
    public_status = models.CharField(
      _("Public Status"), max_length=1, choices=STATUSES, default=DRAFT,
      help_text="Draft hides it from unauthenticated users."
    )

    # This must be RE-DECLARED in the inheriting class!
    objects = StatusManager()

    class Meta:
        abstract = True

    def is_published(self):
        """ This returns True if the object is published, and False otherwise.
        """
        today = datetime.date.today()
        return (
            self.status == PUBLISHED and
            self.pub_date <= today and

            # Not expired
            (self.expire_date is None or
                self.expire_date > today)
        )

    def is_hidden(self):
        return self.status == HIDDEN

    def is_published_or_hidden(self):
        """ This returns True if the object is published, and False otherwise.
        """
        return self.is_hidden() or self.is_published()
