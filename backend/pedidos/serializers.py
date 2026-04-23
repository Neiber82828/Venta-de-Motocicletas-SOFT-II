from rest_framework import serializers
from motos.models import Motocicleta
from motos.serializers import MotociletaSerializer
from .models import Pedido, DetallePedido, HistorialEstadoPedido


class DetallePedidoSerializer(serializers.ModelSerializer):
    motocicleta = MotociletaSerializer(source='id_motocicleta', read_only=True)
    id_motocicleta = serializers.PrimaryKeyRelatedField(
        queryset=Motocicleta.objects.all(),
        write_only=True,
    )
    id_pedido = serializers.PrimaryKeyRelatedField(
        queryset=Pedido.objects.all(),
        write_only=True,
    )

    class Meta:
        model = DetallePedido
        fields = ['id', 'id_pedido', 'id_motocicleta', 'motocicleta', 'precio_unitario', 'cantidad', 'estado']


class HistorialSerializer(serializers.ModelSerializer):
    vendedor_nombre = serializers.SerializerMethodField()

    class Meta:
        model = HistorialEstadoPedido
        fields = ['id', 'fecha_cambio', 'estado_anterior', 'estado_nuevo', 'comentarios', 'vendedor_nombre']

    def get_vendedor_nombre(self, obj):
        v = obj.id_vendedor
        return f"{v.user.first_name} {v.apellido}"


class PedidoSerializer(serializers.ModelSerializer):
    detalles = DetallePedidoSerializer(source='detallepedido_set', many=True, read_only=True)
    historial = HistorialSerializer(source='historialestadopedido_set', many=True, read_only=True)
    cliente_nombre = serializers.SerializerMethodField()
    vendedor_nombre = serializers.SerializerMethodField()

    class Meta:
        model = Pedido
        fields = [
            'id', 'id_cliente', 'id_vendedor', 'fecha_pedido',
            'monto_total', 'estado', 'cantidad',
            'cliente_nombre', 'vendedor_nombre',
            'detalles', 'historial',
        ]
        read_only_fields = ['fecha_pedido']

    def get_cliente_nombre(self, obj):
        c = obj.id_cliente
        return f"{c.user.first_name} {c.apellido}"

    def get_vendedor_nombre(self, obj):
        v = obj.id_vendedor
        return f"{v.user.first_name} {v.apellido}"


class PedidoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ['id', 'id_cliente', 'id_vendedor', 'monto_total', 'estado', 'cantidad']
        read_only_fields = ['id']
