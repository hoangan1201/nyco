# Generated by Django 2.2 on 2021-02-23 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0019_auto_20210210_2148'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProgramMapPageIntroduction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True, verbose_name='Updated at')),
                ('introduction', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AlterField(
            model_name='program',
            name='internal_status',
            field=models.CharField(choices=[('D', 'Draft'), ('P', 'Published')], default='D', help_text='Draft hides it from unauthenticated users.', max_length=1, verbose_name='Internal Status'),
        ),
        migrations.AlterField(
            model_name='program',
            name='public_status',
            field=models.CharField(choices=[('D', 'Draft'), ('P', 'Published')], default='D', help_text='Draft hides it from unauthenticated users.', max_length=1, verbose_name='Public Status'),
        ),
    ]