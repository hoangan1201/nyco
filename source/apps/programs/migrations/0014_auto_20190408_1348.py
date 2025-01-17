# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-04-08 13:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0013_auto_20190402_1619'),
    ]

    operations = [
        migrations.AddField(
            model_name='agency',
            name='display_name_ht',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='agency',
            name='display_name_ko',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='agency',
            name='display_name_ur',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='agency',
            name='display_name_zh_hant',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='contact',
            name='name_ht',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='contact',
            name='name_ko',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='contact',
            name='name_ur',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='contact',
            name='name_zh_hant',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='neighborhood',
            name='name_ht',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='neighborhood',
            name='name_ko',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='neighborhood',
            name='name_ur',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='neighborhood',
            name='name_zh_hant',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='population',
            name='name_ht',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='population',
            name='name_ko',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='population',
            name='name_ur',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='population',
            name='name_zh_hant',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='description_ht',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='description_ko',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='description_ur',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='description_zh_hant',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='display_name_ht',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='display_name_ko',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='display_name_ur',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='display_name_zh_hant',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='programtype',
            name='name_ht',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='programtype',
            name='name_ko',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='programtype',
            name='name_ur',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='programtype',
            name='name_zh_hant',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
