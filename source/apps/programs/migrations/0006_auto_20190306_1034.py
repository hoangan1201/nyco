# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-03-06 10:34
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import filer.fields.file


class Migration(migrations.Migration):

    dependencies = [
        ('filer', '0010_auto_20180414_2058'),
        ('programs', '0005_auto_20190305_0959'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='program',
            name='location',
        ),
        migrations.AddField(
            model_name='location',
            name='program',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='programs.Program'),
        ),
        migrations.AddField(
            model_name='location',
            name='title',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='location',
            name='title_ar',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='title_bn',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='title_en',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='title_es',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='title_fr',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='title_ru',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='tooltip_content',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='location',
            name='tooltip_content_ar',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='tooltip_content_bn',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='tooltip_content_en',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='tooltip_content_es',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='tooltip_content_fr',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='tooltip_content_ru',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='location_file',
            field=filer.fields.file.FilerFileField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='filer.File'),
        ),
    ]
