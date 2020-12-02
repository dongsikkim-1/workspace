# Generated by Django 3.1.3 on 2020-12-02 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api_test', '0004_auto_20201202_0631'),
    ]

    operations = [
        migrations.CreateModel(
            name='departments',
            fields=[
                ('department_id', models.IntegerField(primary_key=True, serialize=False)),
                ('department_name', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'departments',
            },
        ),
    ]