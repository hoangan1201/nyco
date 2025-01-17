# Generated by Django 2.2 on 2021-01-20 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common_metrics', '0011_auto_20190910_1330'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommonMetricsMarquee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('agency_id', models.CharField(blank=True, db_column='AGENCY_ID', max_length=3, null=True)),
                ('program_id', models.CharField(blank=True, db_column='PROGRAM_ID', max_length=3, null=True)),
                ('person_id', models.CharField(blank=True, db_column='PERSON_ID', max_length=26, null=True)),
                ('event_dt', models.CharField(blank=True, db_column='EVENT_DT', max_length=19, null=True)),
                ('metric_name', models.CharField(blank=True, db_column='METRIC_NAME', max_length=19, null=True)),
                ('year', models.BigIntegerField(blank=True, db_column='YEAR', null=True)),
                ('fiscal_year', models.BigIntegerField(blank=True, db_column='FISCAL_YEAR', null=True)),
                ('quarter_year', models.CharField(blank=True, db_column='QUARTER_YEAR', max_length=7, null=True)),
            ],
            options={
                'db_table': 'common_metrics_marquee',
                'managed': False,
            },
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='description_ar',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='description_bn',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='description_en',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='description_es',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='description_fr',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='description_ht',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='description_ko',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='description_pl',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='description_ru',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='description_ur',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='description_zh_hant',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='title_ar',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='title_bn',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='title_en',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='title_es',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='title_fr',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='title_ht',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='title_ko',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='title_pl',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='title_ru',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='title_ur',
        ),
        migrations.RemoveField(
            model_name='commonmetric',
            name='title_zh_hant',
        ),
    ]
