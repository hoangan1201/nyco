# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-04-03 18:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visualizations', '0018_auto_20190402_1614'),
    ]

    operations = [
        migrations.AddField(
            model_name='datastorystackedbarchartdataset',
            name='series_name_ar',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='datastorystackedbarchartdataset',
            name='series_name_bn',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='datastorystackedbarchartdataset',
            name='series_name_en',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='datastorystackedbarchartdataset',
            name='series_name_es',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='datastorystackedbarchartdataset',
            name='series_name_fr',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='datastorystackedbarchartdataset',
            name='series_name_ru',
            field=models.CharField(max_length=500, null=True),
        ),
    ]