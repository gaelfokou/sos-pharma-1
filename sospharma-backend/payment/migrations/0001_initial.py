# Generated by Django 4.2.3 on 2024-05-16 17:17

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(blank=True, decimal_places=2, default=None, max_digits=10, null=True, verbose_name='Amount')),
                ('currency', models.CharField(blank=True, choices=[('USD', 'USD'), ('EUR', 'EUR'), ('XAF', 'XAF')], default='XAF', max_length=255, null=True, verbose_name='Currency')),
                ('operator', models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='Operator')),
                ('code', models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='Code')),
                ('operator_reference', models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='Operator reference')),
                ('status', models.CharField(blank=True, choices=[('PENDING', 'PENDING'), ('SUCCESSFUL', 'SUCCESSFUL'), ('FAILED', 'FAILED')], default='PENDING', max_length=255, null=True, verbose_name='Status')),
                ('reason', models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='Reason')),
                ('reference', models.UUIDField(default=uuid.uuid4, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('order', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='payment', to='order.order')),
            ],
            options={
                'verbose_name': 'Payment',
                'verbose_name_plural': 'Payments',
            },
        ),
    ]
