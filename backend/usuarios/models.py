from django.db import models

# Create your models here.
class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    tipo_documento = models.CharField(max_length=20)
    numero_documento = models.CharField(max_length=20, unique=True)
    telefono = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    direccion = models.TextField()
    
    class Meta:
        db_table = 'CLIENTES'

    def __str__(self):
        return f"{self.nombre} {self.apellido}"


class Vendedor(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20)

    class Meta:
        db_table = 'VENDEDORES'

    def __str__(self):
        return f"{self.nombre} {self.apellido}"


class Administrador(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20)

    class Meta:
        db_table = 'ADMINISTRADORES'

    def __str__(self):
        return f"{self.nombre} {self.apellido}"