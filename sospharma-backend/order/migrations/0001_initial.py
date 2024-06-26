# Generated by Django 4.2.3 on 2024-05-16 17:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('drug', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='Name')),
                ('phone', models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='Phone')),
                ('city', models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='City')),
                ('quarter', models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='Quarter')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Order',
                'verbose_name_plural': 'Orders',
            },
        ),
        migrations.CreateModel(
            name='OrderDrug',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(blank=True, decimal_places=2, default=None, max_digits=10, null=True, verbose_name='Price')),
                ('quantity', models.PositiveIntegerField(blank=True, default=None, null=True, verbose_name='Quantity')),
                ('prescription', models.CharField(blank=True, choices=[('Oui', 'Oui'), ('Non', 'Non')], default='Non', max_length=255, null=True, verbose_name='Prescription')),
                ('currency', models.CharField(blank=True, choices=[('USD', 'USD'), ('EUR', 'EUR'), ('XAF', 'XAF')], default='XAF', max_length=255, null=True, verbose_name='Currency')),
                ('drug', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orderdrugs', to='drug.drug')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orderdrugs', to='order.order')),
            ],
            options={
                'verbose_name': 'OrderDrug',
                'verbose_name_plural': 'OrderDrugs',
            },
        ),
        migrations.AddField(
            model_name='order',
            name='drugs',
            field=models.ManyToManyField(related_name='orders', through='order.OrderDrug', to='drug.drug'),
        ),
    ]
