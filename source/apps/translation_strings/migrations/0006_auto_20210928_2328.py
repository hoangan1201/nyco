# Generated by Django 2.2 on 2021-09-28 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('translation_strings', '0005_auto_20210928_2312'),
    ]

    operations = [
        migrations.AlterField(
            model_name='translationstring',
            name='text',
            field=models.CharField(blank=True, max_length=255, unique=True, verbose_name='Key'),
        ),
    ]