# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-04-08 13:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_stories', '0005_auto_20190401_1708'),
    ]

    operations = [
        migrations.AddField(
            model_name='datastory',
            name='description_ht',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='datastory',
            name='description_ko',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='datastory',
            name='description_ur',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='datastory',
            name='description_zh_hant',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='datastory',
            name='title_ht',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='datastory',
            name='title_ko',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='datastory',
            name='title_ur',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='datastory',
            name='title_zh_hant',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='narrativesection',
            name='description_ht',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='narrativesection',
            name='description_ko',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='narrativesection',
            name='description_ur',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='narrativesection',
            name='description_zh_hant',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='narrativesection',
            name='title_ht',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='narrativesection',
            name='title_ko',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='narrativesection',
            name='title_ur',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='narrativesection',
            name='title_zh_hant',
            field=models.CharField(max_length=255, null=True),
        ),
    ]