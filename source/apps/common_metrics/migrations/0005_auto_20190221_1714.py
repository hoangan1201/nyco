# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-02-21 17:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common_metrics', '0004_auto_20190220_1619'),
    ]

    operations = [
        migrations.AddField(
            model_name='metricname',
            name='display_name_ar',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='metricname',
            name='display_name_bn',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='metricname',
            name='display_name_en',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='metricname',
            name='display_name_es',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='metricname',
            name='display_name_fr',
            field=models.CharField(max_length=255, null=True),
        ),
    ]