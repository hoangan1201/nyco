# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-04-03 11:52
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations
import django.db.models.deletion
import filer.fields.image


class Migration(migrations.Migration):

    dependencies = [
        ('page', '0006_auto_20190322_1315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agencyitem',
            name='image',
            field=filer.fields.image.FilerImageField(on_delete=django.db.models.deletion.CASCADE, to=settings.FILER_IMAGE_MODEL),
        ),
    ]
