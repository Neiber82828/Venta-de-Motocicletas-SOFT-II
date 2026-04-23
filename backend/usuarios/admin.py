from django.contrib import admin
from .models import Cliente, Vendedor, Administrador

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'tipo_documento', 'numero_documento', 'telefono')
    search_fields = ('user__first_name', 'apellido', 'user__email')

@admin.register(Vendedor)
class VendedorAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'telefono')
    search_fields = ('user__first_name', 'apellido')

@admin.register(Administrador)
class AdministradorAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'telefono')
    search_fields = ('user__first_name', 'apellido')
