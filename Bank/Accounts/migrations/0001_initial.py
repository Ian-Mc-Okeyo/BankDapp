# Generated by Django 4.1.7 on 2023-03-27 19:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account_number', models.CharField(max_length=200)),
                ('id_number', models.CharField(max_length=200)),
                ('balance', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_id', models.CharField(max_length=250)),
                ('transaction_type', models.CharField(max_length=200)),
                ('amount', models.CharField(max_length=200)),
                ('account_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Accounts.account')),
            ],
        ),
    ]