from django.conf import settings
from django.shortcuts import render
from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework.response import Response
import json
import requests
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from .models import Order, OrderDrug
from drug.models import Drug
from .serializers import OrderSerializer, OrderDrugSerializer
from django.shortcuts import get_object_or_404
from django.http.request import QueryDict

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list(request):
    search = request.GET.get('search', '')
    page_size = request.GET.get('page_size', settings.REST_FRAMEWORK['PAGE_SIZE'])

    paginator = PageNumberPagination()
    paginator.page_size = page_size
    orders = Order.objects.all()
    orders = orders.filter(
        (Q(name__icontains=search) | Q(phone__icontains=search) | Q(city__icontains=search) | Q(quarter__icontains=search) | Q(drugs__in=Drug.objects.filter(name__icontains=search)))
    ).distinct().order_by('-id')
    context = paginator.paginate_queryset(orders, request)
    serializer = OrderSerializer(context, many=True)
    serializer_data = []
    for data in serializer.data:
        data = dict(data)
        for orderdrug in data['orderdrugs']:
            drug = Drug.objects.get(id=orderdrug['drug'])
            orderdrug['name'] = drug.name
        serializer_data.append(data)
    return paginator.get_paginated_response(serializer_data)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create(request):
    token = request.META.get('HTTP_AUTHORIZATION')
    data = dict(request.data)
    phone = str(data['phone'])
    phone = '237' + phone[-9:]
    data['phone'] = phone
    serializer = OrderSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        id = serializer.data['id']
        currency = ''
        amount = 0
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8',
            'Authorization': token,
        }
        for data in request.data['drugs']:
            data['order'] = id
            response = requests.post(settings.REDIRECT_BASE_URL + '/api/drug/create/', data=json.dumps(data), headers=headers)

            if response.status_code == 200:
                data['drug'] = response.json()['id']
                serializer = OrderDrugSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    amount += int(float(serializer.data['price']))*int(float(serializer.data['quantity']))
                    currency = serializer.data['currency']
                else:
                    order = Order.objects.get(id=id)
                    order.delete()
                    return Response(status=HTTP_400_BAD_REQUEST, data=serializer.errors)
            else:
                order = Order.objects.get(id=id)
                order.delete()
                return Response(status=HTTP_400_BAD_REQUEST, data=response.json())
        data = {
            'amount': amount,
            'currency': currency,
            'from': phone,
            'description': 'Paiement de la commande',
            'external_reference': '',
            'order': id,
        }
        response = requests.post(settings.REDIRECT_BASE_URL + '/api/payment/create/', data=json.dumps(data), headers=headers)

        if response.status_code == 200:
            order = Order.objects.get(id=id)
            serializer = OrderSerializer(order)
            data = dict(serializer.data)
            for orderdrug in data['orderdrugs']:
                drug = Drug.objects.get(id=orderdrug['drug'])
                orderdrug['name'] = drug.name
            return Response(status=HTTP_200_OK, data=data)
        else:
            order = Order.objects.get(id=id)
            order.delete()
            return Response(status=HTTP_400_BAD_REQUEST, data=response.json())
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data=serializer.errors)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def retrieve(request, id):
    token = request.META.get('HTTP_AUTHORIZATION')
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8',
        'Authorization': token,
    }
    queryset = Order.objects.all()
    order = get_object_or_404(queryset, pk=id)
    serializer = OrderSerializer(order)
    payment = str(serializer.data['payment']['id'])
    response = requests.get(settings.REDIRECT_BASE_URL + '/api/payment/retrieve/'+payment+'/', headers=headers)

    if response.status_code == 200:
        order = Order.objects.get(id=id)
        serializer = OrderSerializer(order)
    return Response(status=HTTP_200_OK, data=serializer.data)
