"""
URL configuration for bonsplansserver project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from .views import list, create, retrieve, delivery, payment, copy

urlpatterns = [
    path('', list, name='order_list'),
    path('create/', create, name='order_create'),
    path('retrieve/<int:id>/', retrieve, name='order_retrieve'),
    path('delivery/<int:id>/', delivery, name='order_delivery'),
    path('payment/<int:id>/', payment, name='order_payment'),
    path('copy/<int:id>/', copy, name='order_copy'),
]
