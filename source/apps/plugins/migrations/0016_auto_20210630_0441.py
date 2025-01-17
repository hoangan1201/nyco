# Generated by Django 2.2 on 2021-06-30 04:41

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('plugins', '0015_auto_20210630_0041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commonmetricbarchart',
            name='chart_tooltip',
            field=tinymce.models.HTMLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='commonmetricdualaxislineandcolumn',
            name='chart_tooltip',
            field=tinymce.models.HTMLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='commonmetriclinechart',
            name='chart_tooltip',
            field=tinymce.models.HTMLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='commonmetricsankey',
            name='chart_tooltip',
            field=tinymce.models.HTMLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='commonmetricstackedbarchart',
            name='chart_tooltip',
            field=tinymce.models.HTMLField(blank=True, null=True),
        ),
    ]
