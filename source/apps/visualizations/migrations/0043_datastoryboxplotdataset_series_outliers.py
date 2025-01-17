# Generated by Django 2.2 on 2023-07-17 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visualizations', '0042_auto_20230713_1156'),
    ]

    operations = [
        migrations.AddField(
            model_name='datastoryboxplotdataset',
            name='series_outliers',
            field=models.TextField(blank=True, help_text='Optional: the outliers of each box plot, comma-separated and surrounded by brackets. For example, if the first boxplot has two outliers at Y=0.5 and Y=10, and the second boxplot has no outliers: [[0.5, 10], []].', null=True),
        ),
    ]
