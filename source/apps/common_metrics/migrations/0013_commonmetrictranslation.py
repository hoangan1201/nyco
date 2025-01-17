# Generated by Django 2.2 on 2021-01-20 23:11

from django.db import migrations, models
import django.db.models.deletion
import parler.fields
import parler.models


class Migration(migrations.Migration):

    dependencies = [
        ('common_metrics', '0012_auto_20210120_2300'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommonMetricTranslation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('ttitle', models.CharField(max_length=255)),
                ('tdescription', models.TextField()),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='common_metrics.CommonMetric')),
            ],
            options={
                'verbose_name': 'common metric Translation',
                'db_table': 'common_metrics_commonmetric_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases=(parler.models.TranslatedFieldsModelMixin, models.Model),
        ),
    ]
