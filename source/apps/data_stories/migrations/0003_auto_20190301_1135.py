# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-03-01 11:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_stories', '0002_auto_20190220_1355'),
    ]

    operations = [
        migrations.AddField(
            model_name='datastory',
            name='description_ru',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='datastory',
            name='title_ru',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='narrativesection',
            name='description_ru',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='narrativesection',
            name='title_ru',
            field=models.CharField(max_length=255, null=True),
        ),
    ]