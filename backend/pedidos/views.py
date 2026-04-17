from django.shortcuts import render
from rest_framework import viewsets
from .models import DetallePedido, HistorialEstadoPedido, Pedido
from .serializers import DetallePedidoSerializer, HistorialEstadoPedidoSerializer, PedidoSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    
    
class DetallePedidoViewSet(viewsets.ModelViewSet):
    queryset = DetallePedido.objects.all()
    serailizer_class = DetallePedidoSerializer
    

class HistorialEstadoPedidoViewSet(viewsets.ModelViewSet):
    queryset = HistorialEstadoPedido.objects.all()
    serializer_class = HistorialEstadoPedidoSerializer
    
