# Generated by Django 2.2 on 2021-01-05 04:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('page', '0012_basicpage_translatable_fields'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='basicpage',
            name='bottom_wysiwyg',
        ),
        migrations.RemoveField(
            model_name='basicpage',
            name='title',
        ),
        migrations.RemoveField(
            model_name='basicpage',
            name='top_wysiwyg',
        ),
    ]