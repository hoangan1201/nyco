# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-05-29 11:58
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('visualizations', '0028_auto_20190529_0950'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mapchart',
            name='shapefile',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
    ]