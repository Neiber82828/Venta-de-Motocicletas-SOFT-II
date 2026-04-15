from django.db import models

# Create your models here.
class Motocicleta(models.Model):
    TIPO_CHOICES = [
        ('naked', 'Naked/Street'),
        ('automatica', 'Automatica'),
        ('deportiva', 'Deportiva'),
        ('adventure', 'Adventure'),
        ('motocross', 'Motocross/Enduro'),
        ('cuatrimoto','cuatrimoto'),
        
    ]
    tipo_moto= models.CharField(max_length=100, choices=TIPO_CHOICES)
    anio=models.IntegerField()
    cilindraje=models.IntegerField()
    tipo_combustible=models.CharField(max_length=50)
    precio_lista=models.DecimalField(max_digits=12, decimal_places=2)
    stock = models.IntegerField(default=0)
    
    class Meta:
        db_table = "MOTOCICLETAS"
    
    
    def __str__(self):
        return f"{self.tipo_moto} {self.año}"
