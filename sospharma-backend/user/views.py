from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.response import Response
import json
import requests
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAdminUser])
def retrieve(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(status=HTTP_200_OK, data=serializer.data)
