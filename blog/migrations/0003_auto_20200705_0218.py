# Generated by Django 3.0.8 on 2020-07-05 02:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20200705_0216'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image_path',
            field=models.CharField(max_length=200),
        ),
    ]
