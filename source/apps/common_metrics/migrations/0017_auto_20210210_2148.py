# Generated by Django 2.2 on 2021-02-10 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common_metrics', '0016_merge_20210125_1232'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='commonmetric',
            name='status',
        ),
        migrations.AddField(
            model_name='commonmetric',
            name='internal_status',
            field=models.CharField(choices=[('H', 'Hidden'), ('D', 'Draft'), ('P', 'Published')], default='D', help_text='Draft hides it from unauthenticated users.', max_length=1, verbose_name='Status'),
        ),
        migrations.AddField(
            model_name='commonmetric',
            name='public_status',
            field=models.CharField(choices=[('H', 'Hidden'), ('D', 'Draft'), ('P', 'Published')], default='D', help_text='Draft hides it from unauthenticated users.', max_length=1, verbose_name='Status'),
        ),
    ]