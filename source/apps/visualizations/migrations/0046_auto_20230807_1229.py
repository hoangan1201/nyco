# Generated by Django 2.2 on 2023-08-07 12:29

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visualizations', '0045_auto_20230804_1425'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datastoryscatterchart',
            name='x_axis_tick_interval',
            field=models.SmallIntegerField(blank=True, help_text='Optionally, override the default interval with which ticks are shown on the X axis.', null=True, validators=[django.core.validators.MinValueValidator(1)]),
        ),
        migrations.AlterField(
            model_name='scatterchart',
            name='x_axis_tick_interval',
            field=models.SmallIntegerField(blank=True, help_text='Optionally, override the default interval with which ticks are shown on the X axis.', null=True, validators=[django.core.validators.MinValueValidator(1)]),
        ),
    ]