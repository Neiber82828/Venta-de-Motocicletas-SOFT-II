from rest_framework import serializers
from .models import Motocicleta

class MotociletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motocicleta
        fields = [
            'id', 'nombre', 'tipo_moto', 'anio', 'cilindraje',
            'tipo_combustible', 'precio_lista', 'stock', 'estado',
            'potencia_maxima', 'torque_maximo', 'peso', 'tipo_motor',
            'velocidades', 'color',
        ]
