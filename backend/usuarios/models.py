from django.db import models
from django.contrib.auth.models import User

class Cliente(models.Model):
    TIPO_DOC_CHOICES = [
        ('cc', 'Cédula de Ciudadanía'),
        ('ce', 'Cédula de Extranjería'),
        ('pasaporte', 'Pasaporte'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cliente')
    apellido = models.CharField(max_length=100)
    tipo_documento = models.CharField(max_length=20, choices=TIPO_DOC_CHOICES, default='cc')
    numero_documento = models.CharField(max_length=20)
    telefono = models.CharField(max_length=15, blank=True)
    direccion = models.TextField(blank=True)

    class Meta:
        db_table = 'CLIENTES'

    def __str__(self):
        return f"{self.user.first_name} {self.apellido}"


class Vendedor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='vendedor')
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15, blank=True)

    class Meta:
        db_table = 'VENDEDORES'

    def __str__(self):
        return f"{self.user.first_name} {self.apellido}"


class Administrador(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='administrador')
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15, blank=True)

    class Meta:
        db_table = 'ADMINISTRADORES'

    def __str__(self):
        return f"{self.user.first_name} {self.apellido}"
