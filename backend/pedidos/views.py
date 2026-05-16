from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Pedido, DetallePedido, HistorialEstadoPedido
from .serializers import PedidoSerializer, PedidoCreateSerializer, DetallePedidoSerializer
from usuarios.models import Vendedor


class PedidoViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PedidoCreateSerializer
        return PedidoSerializer

    def get_queryset(self):
        user = self.request.user
        qs = Pedido.objects.select_related(
            'id_cliente__user', 'id_vendedor__user'
        ).prefetch_related('detallepedido_set__id_motocicleta')
        if hasattr(user, 'cliente'):
            qs = qs.filter(id_cliente=user.cliente)
        return qs.order_by('-fecha_pedido')

    @action(detail=True, methods=['patch'], url_path='cambiar-estado')
    def cambiar_estado(self, request, pk=None):
        pedido = self.get_object()
        nuevo_estado = request.data.get('estado')
        comentarios = request.data.get('comentarios', '')

        if nuevo_estado not in ['pendiente', 'confirmado', 'cancelado']:
            return Response({'error': 'Estado inválido'}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        if not hasattr(user, 'vendedor') and not hasattr(user, 'administrador'):
            return Response({'error': 'Sin permiso'}, status=status.HTTP_403_FORBIDDEN)

        vendedor = user.vendedor if hasattr(user, 'vendedor') else pedido.id_vendedor

        HistorialEstadoPedido.objects.create(
            id_pedido=pedido,
            id_vendedor=vendedor,
            estado_anterior=pedido.estado,
            estado_nuevo=nuevo_estado,
            comentarios=comentarios,
        )
        pedido.estado = nuevo_estado
        pedido.save()
        return Response(PedidoSerializer(pedido).data)

    @action(detail=False, methods=['get'], url_path='reporte')
    def reporte(self, request):
        user = request.user
        if not hasattr(user, 'administrador') and not hasattr(user, 'vendedor'):
            return Response({'error': 'Sin permiso'}, status=status.HTTP_403_FORBIDDEN)

        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        estado = request.query_params.get('estado')

        qs = Pedido.objects.all()
        if fecha_inicio:
            qs = qs.filter(fecha_pedido__date__gte=fecha_inicio)
        if fecha_fin:
            qs = qs.filter(fecha_pedido__date__lte=fecha_fin)
        if estado and estado != 'todos':
            qs = qs.filter(estado=estado)

        counts_by_estado = {
            row['estado']: row['n']
            for row in qs.values('estado').annotate(n=Count('id'))
        }

        ventas_moto = list(
            DetallePedido.objects
            .filter(id_pedido__in=qs)
            .values('id_motocicleta__nombre')
            .annotate(total=Sum('cantidad'))
            .order_by('-total')
        )

        mas_vendida = ventas_moto[0]['id_motocicleta__nombre'] if ventas_moto else '-'
        menos_vendida = ventas_moto[-1]['id_motocicleta__nombre'] if len(ventas_moto) > 1 else '-'

        pedidos_data = PedidoSerializer(qs.order_by('-fecha_pedido')[:50], many=True).data

        ventas_por_moto = [
            {
                'moto': row['id_motocicleta__nombre'].replace('Yamaha ', ''),
                'unidades': row['total'],
                'ingresos': float(row['ingresos'] or 0),
            }
            for row in DetallePedido.objects
            .filter(id_pedido__in=qs)
            .values('id_motocicleta__nombre')
            .annotate(total=Sum('cantidad'), ingresos=Sum('precio_unitario'))
            .order_by('-total')
        ]

        pedidos_por_mes = [
            {
                'mes': row['mes'].strftime('%b %Y'),
                'pedidos': row['n'],
                'ingresos': float(row['ingresos'] or 0),
            }
            for row in qs.annotate(mes=TruncMonth('fecha_pedido'))
            .values('mes')
            .annotate(n=Count('id'), ingresos=Sum('monto_total'))
            .order_by('mes')
        ]

        return Response({
            'total': qs.count(),
            'confirmados': counts_by_estado.get('confirmado', 0),
            'cancelados': counts_by_estado.get('cancelado', 0),
            'pendientes': counts_by_estado.get('pendiente', 0),
            'mas_vendida': mas_vendida,
            'menos_vendida': menos_vendida,
            'pedidos': pedidos_data,
            'ventas_por_moto': ventas_por_moto,
            'pedidos_por_mes': pedidos_por_mes,
        })


class DetallePedidoViewSet(ModelViewSet):
    serializer_class = DetallePedidoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pedido_id = self.request.query_params.get('pedido')
        qs = DetallePedido.objects.select_related('id_motocicleta')
        if pedido_id:
            qs = qs.filter(id_pedido=pedido_id)
        return qs

    def perform_create(self, serializer):
        detalle = serializer.save()
        moto = detalle.id_motocicleta
        moto.stock = max(0, moto.stock - detalle.cantidad)
        if moto.stock == 0:
            moto.estado = 'vendida'
        moto.save()
