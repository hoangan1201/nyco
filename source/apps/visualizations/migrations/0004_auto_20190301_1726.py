# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-03-01 17:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('visualizations', '0003_auto_20190301_1135'),
    ]

    operations = [
        migrations.CreateModel(
            name='BarChartDataSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True, verbose_name='Updated at')),
                ('series_name', models.TextField()),
                ('series_name_en', models.TextField(null=True)),
                ('series_name_ar', models.TextField(null=True)),
                ('series_name_bn', models.TextField(null=True)),
                ('series_name_fr', models.TextField(null=True)),
                ('series_name_es', models.TextField(null=True)),
                ('series_name_ru', models.TextField(null=True)),
                ('series_data', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='DataStoryBarChartDataSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True, verbose_name='Updated at')),
                ('series_name', models.TextField()),
                ('series_name_en', models.TextField(null=True)),
                ('series_name_ar', models.TextField(null=True)),
                ('series_name_bn', models.TextField(null=True)),
                ('series_name_fr', models.TextField(null=True)),
                ('series_name_es', models.TextField(null=True)),
                ('series_name_ru', models.TextField(null=True)),
                ('series_data', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='DataStoryDualAxisLineAndColumnDataSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True, verbose_name='Updated at')),
                ('series_name', models.TextField()),
                ('series_name_en', models.TextField(null=True)),
                ('series_name_ar', models.TextField(null=True)),
                ('series_name_bn', models.TextField(null=True)),
                ('series_name_fr', models.TextField(null=True)),
                ('series_name_es', models.TextField(null=True)),
                ('series_name_ru', models.TextField(null=True)),
                ('series_data', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='DataStorySankeyDataSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True, verbose_name='Updated at')),
                ('sankey_to', models.TextField()),
                ('sankey_to_en', models.TextField(null=True)),
                ('sankey_to_ar', models.TextField(null=True)),
                ('sankey_to_bn', models.TextField(null=True)),
                ('sankey_to_fr', models.TextField(null=True)),
                ('sankey_to_es', models.TextField(null=True)),
                ('sankey_to_ru', models.TextField(null=True)),
                ('sankey_from', models.TextField()),
                ('sankey_from_en', models.TextField(null=True)),
                ('sankey_from_ar', models.TextField(null=True)),
                ('sankey_from_bn', models.TextField(null=True)),
                ('sankey_from_fr', models.TextField(null=True)),
                ('sankey_from_es', models.TextField(null=True)),
                ('sankey_from_ru', models.TextField(null=True)),
                ('sankey_step', models.TextField()),
                ('sankey_count', models.TextField()),
                ('sankey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='visualizations.DataStorySankey')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='DualAxisLineAndColumnDataSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True, verbose_name='Updated at')),
                ('series_name', models.TextField()),
                ('series_name_en', models.TextField(null=True)),
                ('series_name_ar', models.TextField(null=True)),
                ('series_name_bn', models.TextField(null=True)),
                ('series_name_fr', models.TextField(null=True)),
                ('series_name_es', models.TextField(null=True)),
                ('series_name_ru', models.TextField(null=True)),
                ('series_data', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SankeyDataSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True, verbose_name='Updated at')),
                ('sankey_to', models.TextField()),
                ('sankey_to_en', models.TextField(null=True)),
                ('sankey_to_ar', models.TextField(null=True)),
                ('sankey_to_bn', models.TextField(null=True)),
                ('sankey_to_fr', models.TextField(null=True)),
                ('sankey_to_es', models.TextField(null=True)),
                ('sankey_to_ru', models.TextField(null=True)),
                ('sankey_from', models.TextField()),
                ('sankey_from_en', models.TextField(null=True)),
                ('sankey_from_ar', models.TextField(null=True)),
                ('sankey_from_bn', models.TextField(null=True)),
                ('sankey_from_fr', models.TextField(null=True)),
                ('sankey_from_es', models.TextField(null=True)),
                ('sankey_from_ru', models.TextField(null=True)),
                ('sankey_step', models.TextField()),
                ('sankey_count', models.TextField()),
                ('sankey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='visualizations.Sankey')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='barchart',
            name='categories',
            field=models.CharField(default=' ', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='barchart',
            name='suffix',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='datastorybarchart',
            name='categories',
            field=models.CharField(default=' ', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='datastorybarchart',
            name='suffix',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='datastorydualaxislineandcolumn',
            name='categories',
            field=models.CharField(default=' ', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='datastorydualaxislineandcolumn',
            name='dual_axis_type',
            field=models.CharField(default=' ', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='datastorydualaxislineandcolumn',
            name='suffix',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='datastorystackedbarchart',
            name='categories',
            field=models.CharField(default=' ', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='datastorystackedbarchart',
            name='suffix',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='dualaxislineandcolumn',
            name='categories',
            field=models.CharField(default=' ', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='dualaxislineandcolumn',
            name='dual_axis_type',
            field=models.CharField(default=' ', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='dualaxislineandcolumn',
            name='suffix',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='stackedbarchart',
            name='categories',
            field=models.CharField(default=' ', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='stackedbarchart',
            name='suffix',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='dualaxislineandcolumndataset',
            name='dual_axis_line_and_column',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='visualizations.DualAxisLineAndColumn'),
        ),
        migrations.AddField(
            model_name='datastorydualaxislineandcolumndataset',
            name='dual_axis_line_and_column',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='visualizations.DataStoryDualAxisLineAndColumn'),
        ),
        migrations.AddField(
            model_name='datastorybarchartdataset',
            name='bar_chart',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='visualizations.DataStoryStackedBarChart'),
        ),
        migrations.AddField(
            model_name='barchartdataset',
            name='bar_chart',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='visualizations.BarChart'),
        ),
    ]
