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
        ('programs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommonMetric',
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
                ('order', models.PositiveSmallIntegerField(default=0, help_text='1 appears before 2, used in landing page dropdown', verbose_name='Order')),
                ('description', models.TextField()),
                ('description_en', models.TextField(null=True)),
                ('description_ar', models.TextField(null=True)),
                ('description_bn', models.TextField(null=True)),
                ('description_fr', models.TextField(null=True)),
                ('description_es', models.TextField(null=True)),
            ],
            options={
                'ordering': ('order',),
            },
          bases=(TranslatableModel, models.Model),

        ),
        migrations.CreateModel(
            name='CommonMetricVisualization',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveSmallIntegerField(default=0, help_text='1 appears before 2', verbose_name='Order')),
            ],
            options={
                'ordering': ('order',),
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='MetricCategory',
            fields=[
                ('display_name', models.CharField(blank=True, max_length=255, null=True)),
                ('display_name_en', models.CharField(blank=True, max_length=255, null=True)),
                ('display_name_ar', models.CharField(blank=True, max_length=255, null=True)),
                ('display_name_bn', models.CharField(blank=True, max_length=255, null=True)),
                ('display_name_fr', models.CharField(blank=True, max_length=255, null=True)),
                ('display_name_es', models.CharField(blank=True, max_length=255, null=True)),
                ('name', models.CharField(max_length=255, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='MetricCategorySubGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display_name', models.CharField(blank=True, max_length=255)),
                ('display_name_en', models.CharField(blank=True, max_length=255, null=True)),
                ('display_name_ar', models.CharField(blank=True, max_length=255, null=True)),
                ('display_name_bn', models.CharField(blank=True, max_length=255, null=True)),
                ('display_name_fr', models.CharField(blank=True, max_length=255, null=True)),
                ('display_name_es', models.CharField(blank=True, max_length=255, null=True)),
                ('name', models.CharField(blank=True, max_length=255)),
                ('name_en', models.CharField(blank=True, max_length=255, null=True)),
                ('name_ar', models.CharField(blank=True, max_length=255, null=True)),
                ('name_bn', models.CharField(blank=True, max_length=255, null=True)),
                ('name_fr', models.CharField(blank=True, max_length=255, null=True)),
                ('name_es', models.CharField(blank=True, max_length=255, null=True)),
                ('metric_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricCategory')),
            ],
        ),
        migrations.CreateModel(
            name='MetricFact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('interval_type', models.CharField(max_length=255)),
                ('interval_type_en', models.CharField(max_length=255, null=True)),
                ('interval_type_ar', models.CharField(max_length=255, null=True)),
                ('interval_type_bn', models.CharField(max_length=255, null=True)),
                ('interval_type_fr', models.CharField(max_length=255, null=True)),
                ('interval_type_es', models.CharField(max_length=255, null=True)),
                ('period', models.CharField(max_length=255)),
                ('metric_count', models.DecimalField(decimal_places=2, max_digits=19)),
                ('agency', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Agency')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricCategory')),
            ],
        ),
        migrations.CreateModel(
            name='MetricName',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display_name', models.CharField(max_length=255)),
                ('display_name_en', models.CharField(max_length=255, null=True)),
                ('display_name_ar', models.CharField(max_length=255, null=True)),
                ('display_name_bn', models.CharField(max_length=255, null=True)),
                ('display_name_fr', models.CharField(max_length=255, null=True)),
                ('display_name_es', models.CharField(max_length=255, null=True)),
                ('name', models.CharField(max_length=255)),
                ('name_en', models.CharField(max_length=255, null=True)),
                ('name_ar', models.CharField(max_length=255, null=True)),
                ('name_bn', models.CharField(max_length=255, null=True)),
                ('name_fr', models.CharField(max_length=255, null=True)),
                ('name_es', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='metricfact',
            name='metric_name',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricName'),
        ),
        migrations.AddField(
            model_name='metricfact',
            name='metric_name_ar',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricName'),
        ),
        migrations.AddField(
            model_name='metricfact',
            name='metric_name_bn',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricName'),
        ),
        migrations.AddField(
            model_name='metricfact',
            name='metric_name_en',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricName'),
        ),
        migrations.AddField(
            model_name='metricfact',
            name='metric_name_es',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricName'),
        ),
        migrations.AddField(
            model_name='metricfact',
            name='metric_name_fr',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricName'),
        ),
        migrations.AddField(
            model_name='metricfact',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Program'),
        ),
        migrations.AddField(
            model_name='metricfact',
            name='subgroup',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricCategorySubGroup'),
        ),
    ]