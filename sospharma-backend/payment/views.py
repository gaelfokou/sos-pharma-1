from django.conf import settings
from django.shortcuts import render
from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework.response import Response
import json
import requests
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import LimitOffsetPagination
from .models import Payment
from .serializers import PaymentSerializer
from django.shortcuts import get_object_or_404
from django.http.request import QueryDict

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def token(request):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8',
    }
    data = {
        'username': settings.CAMPAY_APP_USERNAME,
        'password': settings.CAMPAY_APP_PASSWORD,
    }
    response = requests.post(settings.CAMPAY_URL + '/api/token/', data=json.dumps(data), headers=headers)

    if response.status_code == 200:
        return Response(status=HTTP_200_OK, data=response.json())
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data=response.json())

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create(request):
    data = dict(request.data)
    order = data['order']
    token = request.META.get('HTTP_AUTHORIZATION')
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8',
        'Authorization': token,
    }
    response = requests.post(settings.CAMPAY_URL + '/api/collect/', data=json.dumps(data), headers=headers)

    if response.status_code == 200:
        response = requests.get(settings.CAMPAY_URL + '/api/transaction/'+response.json()['reference']+'/', headers=headers)

        if response.status_code == 200:
            data = response.json()
            data['order'] = order
            serializer = PaymentSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=HTTP_200_OK, data=serializer.data)
            else:
                return Response(status=HTTP_400_BAD_REQUEST, data=serializer.errors)
        else:
            return Response(status=HTTP_400_BAD_REQUEST, data=response.json())
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data=response.json())

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
    queryset = Payment.objects.all()
    payment = get_object_or_404(queryset, pk=id)
    reference = str(payment.reference)
    response = requests.get(settings.CAMPAY_URL + '/api/transaction/'+reference+'/', headers=headers)

    if response.status_code == 200:
        serializer = PaymentSerializer(payment, data=response.json(), partial=True)
        if serializer.is_valid():
            serializer.save()
        return Response(status=HTTP_200_OK, data=response.json())
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data=response.json())
