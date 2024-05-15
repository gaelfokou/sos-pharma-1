from rest_framework import serializers
from .models import Order, OrderDrug
from payment.serializers import PaymentSerializer

class OrderDrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDrug
        fields = ('id', 'price', 'quantity', 'prescription', 'currency', 'order', 'drug')

class OrderSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    phone = serializers.IntegerField(required=True)
    city = serializers.CharField(required=True)
    quarter = serializers.CharField(required=True)
    payment = PaymentSerializer(read_only=True)
    orderdrugs = OrderDrugSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'name', 'phone', 'city', 'quarter', 'created_at', 'updated_at', 'payment', 'orderdrugs')
