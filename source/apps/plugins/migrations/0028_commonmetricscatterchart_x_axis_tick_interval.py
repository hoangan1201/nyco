# Generated by Django 2.2 on 2023-08-04 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plugins', '0027_commonmetricboxplot_color_by_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='commonmetricscatterchart',
            name='x_axis_tick_interval',
            field=models.SmallIntegerField(blank=True, help_text='Optionally, override the default interval with which ticks are shown on the X axis.', null=True),
        ),
    ]
