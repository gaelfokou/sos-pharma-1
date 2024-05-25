from django.shortcuts import render
from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import LimitOffsetPagination
from .models import Drug
from .serializers import DrugSerializer
from django.shortcuts import get_object_or_404
from django.http.request import QueryDict

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create(request):
    if Drug.objects.filter(name=request.data['name']).exists():
        drug = Drug.objects.get(name=request.data['name'])
        serializer = DrugSerializer(drug)
        return Response(status=HTTP_200_OK, data=serializer.data)
    else:
        serializer = DrugSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=HTTP_200_OK, data=serializer.data)
        return Response(status=HTTP_400_BAD_REQUEST, data=serializer.errors)
