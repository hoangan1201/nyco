# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-03-06 18:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visualizations', '0011_auto_20190306_1533'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='datastorydualaxislineandcolumn',
            name='dual_axis_type',
        ),
        migrations.AddField(
            model_name='datastorydualaxislineandcolumndataset',
            name='dual_axis_type',
            field=models.CharField(default='bar', max_length=255),
            preserve_default=False,
        ),
    ]
