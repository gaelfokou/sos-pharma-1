from django.db import models
from django.utils.translation import gettext_lazy as _
from drug.models import Drug
import uuid
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class Order(models.Model):
    name = models.CharField(_('Name'), max_length=255, blank=True, null=True, default=None)
    phone = models.CharField(_('Phone'), max_length=255, blank=True, null=True, default=None)
    city = models.CharField(_('City'), max_length=255, blank=True, null=True, default=None)
    quarter = models.CharField(_('Quarter'), max_length=255, blank=True, null=True, default=None)
    drugs = models.ManyToManyField(Drug, related_name='orders', through='OrderDrug')

    OUI = 'Oui'
    NON = 'Non'

    DELIVERY_CHOICES = (
        (OUI, _('Oui')),
        (NON, _('Non')),
    )

    delivery = models.CharField(_('Delivery'), max_length=255, choices=DELIVERY_CHOICES, blank=True, null=True, default=NON)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Order')
        verbose_name_plural = _('Orders')

    def __str__(self):
        return "{}".format(self.name)

    @staticmethod
    def thread_send_mail(data):
        msg_html = render_to_string('order/email/new_payment.html', {'data': data})
        msg_html = msg_html.replace('\n', '').replace('\r', '')
        msg_plain = strip_tags(msg_html)
        send_mail('Nouvelle commande', msg_plain, settings.DEFAULT_FROM_EMAIL, [settings.DEFAULT_TO_EMAIL], fail_silently=False, html_message=msg_html)

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
