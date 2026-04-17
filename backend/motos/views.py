from django.shortcuts import render
from rest_framework import viewsets
from .models import Motocicleta
from .serializers import MotocicletaSerializer


class MotocicletaViewSet(viewsets.ModelViewSet):
    queryset = Motocicleta.objects.all()
    serializer_class = MotocicletaSerializer
