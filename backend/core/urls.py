"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from motos.views import MotocicletaViewSet
from usuarios.views import ClienteViewSet, VendedorViewSet, AdministradorViewSet
from pedidos.views import PedidoViewSet, DetallePedidoViewSet, HistorialEstadoPedidoViewSet

router = DefaultRouter()
router.register(r'motocicletas', MotocicletaViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'vendedores', VendedorViewSet)
router.register(r'administradores', AdministradorViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'detalles-pedido', DetallePedidoViewSet)
router.register(r'historial-pedidos', HistorialEstadoPedidoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
