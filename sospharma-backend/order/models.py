from django.db import models
from django.utils.translation import gettext_lazy as _
from drug.models import Drug
import uuid

class Order(models.Model):
    name = models.CharField(_('Name'), max_length=255, blank=True, null=True, default=None)
    phone = models.CharField(_('Phone'), max_length=255, blank=True, null=True, default=None)
    city = models.CharField(_('City'), max_length=255, blank=True, null=True, default=None)
    quarter = models.CharField(_('Quarter'), max_length=255, blank=True, null=True, default=None)
    drugs = models.ManyToManyField(Drug, related_name='orders', through='OrderDrug')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Order')
        verbose_name_plural = _('Orders')

    def __str__(self):
        return "{}".format(self.name)

class OrderDrug(models.Model):
    price = models.DecimalField(_('Price'), max_digits=10, decimal_places=2, blank=True, null=True, default=None)
    quantity = models.PositiveIntegerField(_('Quantity'), blank=True, null=True, default=None)

    OUI = 'Oui'
    NON = 'Non'

    PRESCRIPTION_CHOICES = (
        (OUI, _('Oui')),
        (NON, _('Non')),
    )

    prescription = models.CharField(_('Prescription'), max_length=255, choices=PRESCRIPTION_CHOICES, blank=True, null=True, default=NON)

    USD = 'USD'
    EUR = 'EUR'
    XAF = 'XAF'

    CURRENCY_CHOICES = (
        (USD, _('USD')),
        (EUR, _('EUR')),
        (XAF, _('XAF')),
    )

    currency = models.CharField(_('Currency'), max_length=255, choices=CURRENCY_CHOICES, blank=True, null=True, default=XAF)
    order = models.ForeignKey(Order, related_name='orderdrugs', on_delete=models.CASCADE)
    drug = models.ForeignKey(Drug, related_name='orderdrugs', on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('OrderDrug')
        verbose_name_plural = _('OrderDrugs')

    def __str__(self):
        return "{}, {}".format(self.order.name, self.drug.name)
