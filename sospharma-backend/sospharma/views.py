from django.conf import settings
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
import json
import requests
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, renderer_classes
import pandas as pd

@api_view(['POST'])
@renderer_classes([JSONRenderer])
# @permission_classes([IsAuthenticated])
def index(request):
    data = {}
    columns = ['name', 'price']
    df = pd.read_excel(f"{settings.MEDIA_ROOT}/data/SOS-Pharma Medicaments_OK.xlsx", engine='openpyxl', names=columns)
    df.dropna(inplace=True)
    data['drugs'] = json.loads(df.to_json(orient='records', indent=4))
    # with open(f"{settings.MEDIA_ROOT}/data/drugs.json") as file:
        # data['drugs'] = json.load(file)
    with open(f"{settings.MEDIA_ROOT}/data/geolocation.json") as file:
        data['locations'] = json.load(file)
    return Response(status=HTTP_200_OK, data=data)
