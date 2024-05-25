from rest_framework import serializers
from .models import Drug
from order.serializers import OrderDrugSerializer

class DrugSerializer(serializers.ModelSerializer):
    orderdrugs = OrderDrugSerializer(many=True, read_only=True)

    class Meta:
        model = Drug
        fields = ('id', 'name', 'orderdrugs')
