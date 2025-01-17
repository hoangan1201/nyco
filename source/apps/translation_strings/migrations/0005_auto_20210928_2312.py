# Generated by Django 2.2 on 2021-09-28 23:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('translation_strings', '0004_translationstring_text_pl'),
    ]

    operations = [
        migrations.RenameField(
            model_name='translationstring',
            old_name='text_ar',
            new_name='frontend_text_ar',
        ),
        migrations.RenameField(
            model_name='translationstring',
            old_name='text_bn',
            new_name='frontend_text_bn',
        ),
        migrations.RenameField(
            model_name='translationstring',
            old_name='text_es',
            new_name='frontend_text_es',
        ),
        migrations.RenameField(
            model_name='translationstring',
            old_name='text_fr',
            new_name='frontend_text_fr',
        ),
        migrations.RenameField(
            model_name='translationstring',
            old_name='text_ht',
            new_name='frontend_text_ht',
        ),
        migrations.RenameField(
            model_name='translationstring',
            old_name='text_ko',
            new_name='frontend_text_ko',
        ),
        migrations.RenameField(
            model_name='translationstring',
            old_name='text_pl',
            new_name='frontend_text_pl',
        ),
        migrations.RenameField(
            model_name='translationstring',
            old_name='text_ru',
            new_name='frontend_text_ru',
        ),
        migrations.RenameField(
            model_name='translationstring',
            old_name='text_ur',
            new_name='frontend_text_ur',
        ),
        migrations.RenameField(
            model_name='translationstring',
            old_name='text_zh_hant',
            new_name='frontend_text_zh_hant',
        ),
        migrations.RemoveField(
            model_name='translationstring',
            name='text_en',
        ),
        migrations.AddField(
            model_name='translationstring',
            name='frontend_text',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='translationstring',
            name='frontend_text_en',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='translationstring',
            name='text',
            field=models.CharField(blank=True, max_length=255, unique=True),
        ),
    ]
