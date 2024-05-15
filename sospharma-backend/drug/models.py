from django.db import models
from django.utils.translation import gettext_lazy as _

class Drug(models.Model):
    name = models.CharField(_('Name'), max_length=255)

    class Meta:
        verbose_name = _('Drug')
        verbose_name_plural = _('Drugs')

    def __str__(self):
        return "{}".format(self.name)
