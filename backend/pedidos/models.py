from django.db import models
from usuarios.models import Cliente, Vendedor
from motos.models import Motocicleta

class Pedido(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('confirmado', 'Confirmado'),
        ('cancelado', 'Cancelado'),
    ]

    id_cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT, db_column='id_cliente')
    id_vendedor = models.ForeignKey(Vendedor, on_delete=models.PROTECT, db_column='id_vendedor')
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    monto_total = models.DecimalField(max_digits=12, decimal_places=2)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    cantidad = models.IntegerField(default=1)

    class Meta:
        db_table = 'PEDIDOS'

    def __str__(self):
        return f"Pedido {self.id} - {self.estado}"


class DetallePedido(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('confirmado', 'Confirmado'),
        ('cancelado', 'Cancelado'),
    ]

    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, db_column='id_pedido')
    id_motocicleta = models.ForeignKey(Motocicleta, on_delete=models.PROTECT, db_column='id_motocicleta')
    precio_unitario = models.DecimalField(max_digits=12, decimal_places=2)
    cantidad = models.IntegerField(default=1)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')

    class Meta:
        db_table = 'DETALLES_PEDIDO'

    def __str__(self):
        return f"Detalle pedido {self.id_pedido.id}"


class HistorialEstadoPedido(models.Model):
    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, db_column='id_pedido')
    id_vendedor = models.ForeignKey(Vendedor, on_delete=models.PROTECT, db_column='id_vendedor')
    fecha_cambio = models.DateTimeField(auto_now_add=True)
    estado_anterior = models.CharField(max_length=20)
    estado_nuevo = models.CharField(max_length=20)
    comentarios = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'HISTORIALES_ESTADO_PEDIDOS'

    def __str__(self):
        return f"Historial pedido {self.id_pedido.id}: {self.estado_anterior} → {self.estado_nuevo}"