# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-03-13 15:41
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('page', '0004_auto_20190305_1304'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='footernavigationitem',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='mainnavigationitem',
            name='slug',
        ),
        migrations.AlterField(
            model_name='footernavigationitem',
            name='landing_page',
            field=models.ForeignKey(blank=True, help_text='only landing pages should be common metrics and data stories', null=True, on_delete=django.db.models.deletion.CASCADE, to='page.LandingPage'),
        ),
        migrations.AlterField(
            model_name='mainnavigationitem',
            name='landing_page',
            field=models.ForeignKey(blank=True, help_text='only landing pages should be common metrics and data stories', null=True, on_delete=django.db.models.deletion.CASCADE, to='page.LandingPage'),
        ),
    ]
