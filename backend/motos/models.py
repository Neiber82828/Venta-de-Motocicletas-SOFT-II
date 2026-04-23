from django.db import models

class Motocicleta(models.Model):
    TIPO_CHOICES = [
        ('naked', 'Naked/Street'),
        ('automatica', 'Automática'),
        ('deportiva', 'Deportiva'),
        ('adventure', 'Adventure'),
        ('motocross', 'Motocross/Enduro'),
        ('cuatrimoto', 'Cuatrimoto'),
    ]
    ESTADO_CHOICES = [
        ('disponible', 'Disponible'),
        ('reservada', 'Reservada'),
        ('vendida', 'Vendida'),
    ]

    nombre = models.CharField(max_length=200)
    tipo_moto = models.CharField(max_length=100, choices=TIPO_CHOICES)
    anio = models.IntegerField()
    cilindraje = models.IntegerField()
    tipo_combustible = models.CharField(max_length=50, default='Gasolina')
    precio_lista = models.DecimalField(max_digits=12, decimal_places=2)
    stock = models.IntegerField(default=0)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='disponible')
    potencia_maxima = models.CharField(max_length=100, blank=True)
    torque_maximo = models.CharField(max_length=100, blank=True)
    peso = models.CharField(max_length=50, blank=True)
    tipo_motor = models.CharField(max_length=100, blank=True)
    velocidades = models.IntegerField(null=True, blank=True)
    color = models.CharField(max_length=100, blank=True)

    class Meta:
        db_table = 'MOTOCICLETAS'

    def __str__(self):
        return f"{self.nombre} ({self.anio})"
