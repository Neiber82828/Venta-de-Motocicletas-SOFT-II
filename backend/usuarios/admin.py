from django.contrib import admin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'telefono', 'fecha_creacion')
    search_fields = ('nombre', 'email')
    list_filter = ('fecha_creacion',)
    readonly_fields = ('fecha_creacion', 'fecha_actualizacion')
