# Generated by Django 2.2 on 2021-07-01 04:13

from django.db import migrations
import dynamic_decimal.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('common_metrics', '0019_commonmetrictranslation_distribution_view_tooltip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='metricfact',
            name='metric_count',
            field=dynamic_decimal.db.fields.DynamicDecimalField(max_length=255),
        ),
    ]
