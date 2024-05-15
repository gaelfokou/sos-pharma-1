from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'amount', 'currency', 'operator', 'code', 'operator_reference', 'status', 'reason', 'order', 'reference', 'created_at', 'updated_at')
