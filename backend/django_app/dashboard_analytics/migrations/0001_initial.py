# Generated by Django 3.2.8 on 2021-10-06 15:22

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
                ('Address', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('Balance', models.IntegerField()),
                ('Name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Account_Type',
            fields=[
                ('Account_TypeID', models.IntegerField(primary_key=True, serialize=False)),
                ('Type', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Instrument_Type',
            fields=[
                ('Instrument_TypeID', models.IntegerField(primary_key=True, serialize=False)),
                ('Type', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('Transaction_ID', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('Timestamp', models.DateField()),
                ('Amount', models.IntegerField()),
                ('Instrument_TypeID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard_analytics.instrument_type')),
                ('Receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Receiver', to='dashboard_analytics.account')),
                ('Sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Sender', to='dashboard_analytics.account')),
            ],
        ),
        migrations.AddField(
            model_name='account',
            name='Account_TypeID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard_analytics.account_type'),
        ),
    ]