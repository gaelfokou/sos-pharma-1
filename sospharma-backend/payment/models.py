from django.db import models
from django.utils.translation import gettext_lazy as _
from order.models import Order
import uuid

class Payment(models.Model):
    amount = models.DecimalField(_('Amount'), max_digits=10, decimal_places=2, blank=True, null=True, default=None)

    USD = 'USD'
    EUR = 'EUR'
    XAF = 'XAF'

    CURRENCY_CHOICES = (
        (USD, _('USD')),
        (EUR, _('EUR')),
        (XAF, _('XAF')),
    )

    currency = models.CharField(_('Currency'), max_length=255, choices=CURRENCY_CHOICES, blank=True, null=True, default=XAF)

    PENDING = 'PENDING'
    SUCCESSFUL = 'SUCCESSFUL'
    FAILED = 'FAILED'

    STATUS_CHOICES = (
        (PENDING, _('PENDING')),
        (SUCCESSFUL, _('SUCCESSFUL')),
        (FAILED, _('FAILED')),
    )

    operator = models.CharField(_('Operator'), max_length=255, blank=True, null=True, default=None)
    code = models.CharField(_('Code'), max_length=255, blank=True, null=True, default=None)
    operator_reference = models.CharField(_('Operator reference'), max_length=255, blank=True, null=True, default=None)
    status = models.CharField(_('Status'), max_length=255, choices=STATUS_CHOICES, blank=True, null=True, default=PENDING)
    reason = models.CharField(_('Reason'), max_length=255, blank=True, null=True, default=None)
    order = models.ForeignKey(Order, related_name='payments', on_delete=models.CASCADE)
    reference = models.UUIDField(default=uuid.uuid4, editable=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Payment')
        verbose_name_plural = _('Payments')
