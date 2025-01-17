# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-02-20 10:21
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion
from parler.models import TranslatableModel


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('visualizations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DataStory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True, verbose_name='Updated at')),
                ('expire_date', models.DateField(blank=True, db_index=True, null=True, verbose_name='Expiration Date')),
                ('pub_date', models.DateField(db_index=True, default=datetime.date.today, help_text='Date to be published', verbose_name='Published Date')),
                ('status', models.CharField(choices=[('H', 'Hidden'), ('D', 'Draft'), ('P', 'Published')], default='D', help_text='Hidden is publicly available, but not a part of the nav or lists. Draft hides it from unauthenticated users.', max_length=1, verbose_name='Status')),
                ('title', models.CharField(max_length=255)),
                ('title_en', models.CharField(max_length=255, null=True)),
                ('title_ar', models.CharField(max_length=255, null=True)),
                ('title_bn', models.CharField(max_length=255, null=True)),
                ('title_fr', models.CharField(max_length=255, null=True)),
                ('title_es', models.CharField(max_length=255, null=True)),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('description', models.TextField()),
                ('description_en', models.TextField(null=True)),
                ('description_ar', models.TextField(null=True)),
                ('description_bn', models.TextField(null=True)),
                ('description_fr', models.TextField(null=True)),
                ('description_es', models.TextField(null=True)),
                ('icon', models.CharField(blank=True, choices=[('IA', 'Icon A'), ('IA', 'Icon B')], default=('IA', 'Icon A'), max_length=255, null=True)),
                ('homepage_featured', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name_plural': 'data stories',
            },
            bases=(TranslatableModel, models.Model),

        ),
        migrations.CreateModel(
            name='NarrativeSection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveSmallIntegerField(default=0, help_text='1 appears before 2', verbose_name='Order')),
                ('title', models.CharField(max_length=255)),
                ('title_en', models.CharField(max_length=255, null=True)),
                ('title_ar', models.CharField(max_length=255, null=True)),
                ('title_bn', models.CharField(max_length=255, null=True)),
                ('title_fr', models.CharField(max_length=255, null=True)),
                ('title_es', models.CharField(max_length=255, null=True)),
                ('description', models.TextField()),
                ('description_en', models.TextField(null=True)),
                ('description_ar', models.TextField(null=True)),
                ('description_bn', models.TextField(null=True)),
                ('description_fr', models.TextField(null=True)),
                ('description_es', models.TextField(null=True)),
                ('bar_chart', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='narrative_bar_chart', to='visualizations.DataStoryBarChart')),
                ('data_story', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='data_stories.DataStory')),
                ('dual_axis_line_and_column', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='narrative_axis_chart', to='visualizations.DataStoryDualAxisLineAndColumn')),
                ('map_chart', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='narrative_map', to='visualizations.DataStoryMapChart')),
                ('sankey', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='narrative_sankey', to='visualizations.DataStorySankey')),
                ('stacked_bar_chart', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='narrative_stacked_bar_chart', to='visualizations.DataStoryStackedBarChart')),
            ],
            options={
                'ordering': ('order',),
                'abstract': False,
            },
        ),
    ]
