# Generated by Django 2.2 on 2021-01-13 03:32

from django.db import migrations, models
import django.db.models.deletion
import smart_selects.db_fields


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0018_auto_20190529_0741'),
        ('common_metrics', '0011_auto_20190910_1330'),
        ('fluent_contents', '0001_initial'),
        ('plugins', '0005_merge_20210111_1515'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommonMetricBarChart',
            fields=[
                ('contentitem_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='fluent_contents.ContentItem')),
                ('title', models.CharField(max_length=255)),
                ('short_title', models.CharField(blank=True, help_text='This title is required for the small card display and for the file name when data is exported', max_length=255)),
                ('description', models.TextField()),
                ('x_axis_title', models.CharField(blank=True, max_length=255)),
                ('y_axis_title', models.CharField(blank=True, max_length=255)),
                ('aggregate_by', models.CharField(choices=[('program', 'program'), ('agency', 'agency'), ('subgroup', 'subgroup')], max_length=255)),
                ('hide_tooltips', models.BooleanField(default=False)),
                ('hide_interactive_legend', models.BooleanField(default=False)),
                ('suffix', models.CharField(blank=True, max_length=255)),
                ('agency', models.ManyToManyField(db_table='contentitems_barchart_agency', to='programs.Agency')),
                ('metric_category', models.ManyToManyField(blank=True, db_table='contentitems_barchart_metriccategory', null=True, to='common_metrics.MetricCategory')),
                ('metric_name', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricName')),
                ('metric_subgroup', smart_selects.db_fields.ChainedManyToManyField(blank=True, chained_field='metric_category', chained_model_field='metric_category', db_table='contentitems_barchart_metricsubgroup', null=True, to='common_metrics.MetricCategorySubGroup')),
            ],
            options={
                'verbose_name': 'Bar Chart',
                'verbose_name_plural': 'Bar Charts',
                'db_table': 'contentitem_plugins_commonmetricbarchart',
            },
            bases=('fluent_contents.contentitem',),
        ),
        migrations.CreateModel(
            name='CommonMetricDualAxisLineAndColumn',
            fields=[
                ('contentitem_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='fluent_contents.ContentItem')),
                ('title', models.CharField(max_length=255)),
                ('short_title', models.CharField(blank=True, help_text='This title is required for the small card display and for the file name when data is exported', max_length=255)),
                ('description', models.TextField()),
                ('x_axis_title', models.CharField(blank=True, max_length=255)),
                ('y_axis_title', models.CharField(blank=True, max_length=255)),
                ('aggregate_by', models.CharField(choices=[('program', 'program'), ('agency', 'agency'), ('subgroup', 'subgroup')], max_length=255)),
                ('hide_tooltips', models.BooleanField(default=False)),
                ('hide_interactive_legend', models.BooleanField(default=False)),
                ('line_aggregate_by', models.CharField(choices=[('agency', 'agency'), ('subgroup', 'subgroup')], max_length=255)),
                ('alternate_axis_title', models.CharField(blank=True, max_length=255, null=True)),
                ('dual_axis_type', models.CharField(choices=[('line', 'line'), ('bar', 'bar')], max_length=255)),
                ('suffix', models.CharField(blank=True, max_length=255)),
                ('agency', models.ManyToManyField(db_table='contentitems_dualaxischart_agency', to='programs.Agency')),
                ('line_agency', models.ManyToManyField(db_table='contentitems_dualaxischart_lineagency', related_name='plugins_line_agency', to='programs.Agency')),
                ('line_metric_category', models.ManyToManyField(blank=True, db_table='contentitems_dualaxischart_linemetriccategory', null=True, related_name='plugins_line_metriccategory', to='common_metrics.MetricCategory')),
                ('line_metric_subgroup', smart_selects.db_fields.ChainedManyToManyField(blank=True, chained_field='line_metric_category', chained_model_field='metric_category', db_table='contentitems_dualaxischart_linemetricsubgroup', null=True, related_name='plugins_line_metricsubgroup', to='common_metrics.MetricCategorySubGroup')),
                ('metric_category', models.ManyToManyField(blank=True, db_table='contentitems_dualaxischart_metriccategory', null=True, to='common_metrics.MetricCategory')),
                ('metric_name', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricName')),
                ('metric_subgroup', smart_selects.db_fields.ChainedManyToManyField(blank=True, chained_field='metric_category', chained_model_field='metric_category', db_table='contentitems_dualaxischart_metricsubgroup', null=True, to='common_metrics.MetricCategorySubGroup')),
            ],
            options={
                'verbose_name': 'Dual Axis Line And Column Chart',
                'verbose_name_plural': 'Dual Axis Line And Column Charts',
                'db_table': 'contentitem_plugins_commonmetricdualaxislineandcolumn',
            },
            bases=('fluent_contents.contentitem',),
        ),
        migrations.CreateModel(
            name='CommonMetricLineChart',
            fields=[
                ('contentitem_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='fluent_contents.ContentItem')),
                ('title', models.CharField(max_length=255)),
                ('short_title', models.CharField(blank=True, help_text='This title is required for the small card display and for the file name when data is exported', max_length=255)),
                ('description', models.TextField()),
                ('x_axis_title', models.CharField(blank=True, max_length=255)),
                ('y_axis_title', models.CharField(blank=True, max_length=255)),
                ('aggregate_by', models.CharField(choices=[('program', 'program'), ('agency', 'agency'), ('subgroup', 'subgroup')], max_length=255)),
                ('hide_tooltips', models.BooleanField(default=False)),
                ('hide_interactive_legend', models.BooleanField(default=False)),
                ('suffix', models.CharField(blank=True, max_length=255)),
                ('agency', models.ManyToManyField(db_table='contentitems_linechart_agency', to='programs.Agency')),
                ('metric_category', models.ManyToManyField(blank=True, db_table='contentitems_linechart_metriccategory', null=True, to='common_metrics.MetricCategory')),
                ('metric_name', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricName')),
                ('metric_subgroup', smart_selects.db_fields.ChainedManyToManyField(blank=True, chained_field='metric_category', chained_model_field='metric_category', db_table='contentitems_linechart_metricsubgroup', null=True, to='common_metrics.MetricCategorySubGroup')),
            ],
            options={
                'verbose_name': 'Line Chart',
                'verbose_name_plural': 'Line Charts',
                'db_table': 'contentitem_plugins_commonmetriclinechart',
            },
            bases=('fluent_contents.contentitem',),
        ),
        migrations.CreateModel(
            name='CommonMetricSankey',
            fields=[
                ('contentitem_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='fluent_contents.ContentItem')),
                ('title', models.CharField(max_length=255)),
                ('short_title', models.CharField(blank=True, help_text='This title is required for the small card display and for the file name when data is exported', max_length=255)),
                ('description', models.TextField()),
                ('x_axis_title', models.CharField(blank=True, max_length=255)),
                ('y_axis_title', models.CharField(blank=True, max_length=255)),
                ('aggregate_by', models.CharField(choices=[('program', 'program'), ('agency', 'agency'), ('subgroup', 'subgroup')], max_length=255)),
                ('hide_tooltips', models.BooleanField(default=False)),
                ('agency', models.ManyToManyField(db_table='contentitems_sankey_agency', to='programs.Agency')),
                ('metric_category', models.ManyToManyField(blank=True, db_table='contentitems_sankey_metriccategory', null=True, to='common_metrics.MetricCategory')),
                ('metric_name', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricName')),
                ('metric_subgroup', smart_selects.db_fields.ChainedManyToManyField(blank=True, chained_field='metric_category', chained_model_field='metric_category', db_table='contentitems_sankey_metricsubgroup', null=True, to='common_metrics.MetricCategorySubGroup')),
            ],
            options={
                'verbose_name': 'Sankey',
                'verbose_name_plural': 'Sankeys',
                'db_table': 'contentitem_plugins_commonmetricsankey',
            },
            bases=('fluent_contents.contentitem',),
        ),
        migrations.CreateModel(
            name='CommonMetricStackedBarChart',
            fields=[
                ('contentitem_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='fluent_contents.ContentItem')),
                ('title', models.CharField(max_length=255)),
                ('short_title', models.CharField(blank=True, help_text='This title is required for the small card display and for the file name when data is exported', max_length=255)),
                ('description', models.TextField()),
                ('x_axis_title', models.CharField(blank=True, max_length=255)),
                ('y_axis_title', models.CharField(blank=True, max_length=255)),
                ('aggregate_by', models.CharField(choices=[('program', 'program'), ('agency', 'agency'), ('subgroup', 'subgroup')], max_length=255)),
                ('hide_tooltips', models.BooleanField(default=False)),
                ('hide_interactive_legend', models.BooleanField(default=False)),
                ('disable_distribution_view', models.BooleanField(default=False)),
                ('suffix', models.CharField(blank=True, max_length=255)),
                ('agency', models.ManyToManyField(db_table='contentitems_stackedbarchart_agency', to='programs.Agency')),
                ('metric_category', models.ManyToManyField(blank=True, db_table='contentitems_stackedbarchart_metriccategory', null=True, to='common_metrics.MetricCategory')),
                ('metric_name', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='common_metrics.MetricName')),
                ('metric_subgroup', smart_selects.db_fields.ChainedManyToManyField(blank=True, chained_field='metric_category', chained_model_field='metric_category', db_table='contentitems_stackedbarchart_metricsubgroup', null=True, to='common_metrics.MetricCategorySubGroup')),
            ],
            options={
                'verbose_name': 'Stacked Bar Chart',
                'verbose_name_plural': 'Stacked Bar Charts',
                'db_table': 'contentitem_plugins_commonmetricstackedbarchart',
            },
            bases=('fluent_contents.contentitem',),
        ),
        migrations.RemoveField(
            model_name='dualaxislineandcolumnblockitem',
            name='contentitem_ptr',
        ),
        migrations.RemoveField(
            model_name='dualaxislineandcolumnblockitem',
            name='dual_axis_line_and_column',
        ),
        migrations.RemoveField(
            model_name='linechartblockitem',
            name='contentitem_ptr',
        ),
        migrations.RemoveField(
            model_name='linechartblockitem',
            name='line_chart',
        ),
        migrations.RemoveField(
            model_name='sankeyblockitem',
            name='contentitem_ptr',
        ),
        migrations.RemoveField(
            model_name='sankeyblockitem',
            name='sankey',
        ),
        migrations.RemoveField(
            model_name='stackedbarchartblockitem',
            name='contentitem_ptr',
        ),
        migrations.RemoveField(
            model_name='stackedbarchartblockitem',
            name='stacked_bar_chart',
        ),
        migrations.DeleteModel(
            name='BarChartBlockItem',
        ),
        migrations.DeleteModel(
            name='DualAxisLineAndColumnBlockItem',
        ),
        migrations.DeleteModel(
            name='LineChartBlockItem',
        ),
        migrations.DeleteModel(
            name='SankeyBlockItem',
        ),
        migrations.DeleteModel(
            name='StackedBarChartBlockItem',
        ),
    ]