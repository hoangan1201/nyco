# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-04-02 16:16
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0011_auto_20190402_1614'),
    ]

    operations = [
        migrations.RenameField(
            model_name='program',
            old_name='name_ar',
            new_name='display_name_ar',
        ),
        migrations.RenameField(
            model_name='program',
            old_name='name_bn',
            new_name='display_name_bn',
        ),
        migrations.RenameField(
            model_name='program',
            old_name='name_en',
            new_name='display_name_en',
        ),
        migrations.RenameField(
            model_name='program',
            old_name='name_es',
            new_name='display_name_es',
        ),
        migrations.RenameField(
            model_name='program',
            old_name='name_fr',
            new_name='display_name_fr',
        ),
        migrations.RenameField(
            model_name='program',
            old_name='name_ru',
            new_name='display_name_ru',
        ),
    ]