from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'email', 'telefono', 'fecha_creacion', 'fecha_actualizacion']
        read_only_fields = ['id', 'fecha_creacion', 'fecha_actualizacion']
