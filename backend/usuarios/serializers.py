from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Cliente, Vendedor, Administrador


class RegisterClienteSerializer(serializers.ModelSerializer):
    apellido = serializers.CharField(write_only=True)
    tipo_documento = serializers.CharField(write_only=True, required=False)
    numero_documento = serializers.CharField(write_only=True)
    telefono = serializers.CharField(write_only=True, required=False, allow_blank=True)
    direccion = serializers.CharField(write_only=True, required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'email', 'password',
                  'apellido', 'tipo_documento', 'numero_documento', 'telefono', 'direccion']

    def create(self, validated_data):
        extra = {
            'apellido': validated_data.pop('apellido'),
            'tipo_documento': validated_data.pop('tipo_documento', 'cc'),
            'numero_documento': validated_data.pop('numero_documento'),
            'telefono': validated_data.pop('telefono', ''),
            'direccion': validated_data.pop('direccion', ''),
        }
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        Cliente.objects.create(user=user, **extra)
        return user


class ClienteSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='user.first_name')
    email = serializers.EmailField(source='user.email')
    username = serializers.CharField(source='user.username')

    class Meta:
        model = Cliente
        fields = ['id', 'nombre', 'apellido', 'email', 'username',
                  'tipo_documento', 'numero_documento', 'telefono', 'direccion']


class VendedorSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='user.first_name')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Vendedor
        fields = ['id', 'nombre', 'apellido', 'email', 'telefono']


class AdministradorSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='user.first_name')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Administrador
        fields = ['id', 'nombre', 'apellido', 'email', 'telefono']


class UserProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField(source='pk')
    username = serializers.CharField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    rol = serializers.SerializerMethodField()
    perfil_id = serializers.SerializerMethodField()

    def _resolve_role(self, obj):
        if hasattr(obj, 'administrador'):
            return 'administrador', obj.administrador.id
        if hasattr(obj, 'vendedor'):
            return 'vendedor', obj.vendedor.id
        if hasattr(obj, 'cliente'):
            return 'cliente', obj.cliente.id
        return 'desconocido', None

    def get_rol(self, obj):
        return self._resolve_role(obj)[0]

    def get_perfil_id(self, obj):
        return self._resolve_role(obj)[1]
