from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .models import Motocicleta
from .serializers import MotociletaSerializer


class MotocicletaViewSet(ModelViewSet):
    queryset = Motocicleta.objects.all()
    serializer_class = MotociletaSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        qs = Motocicleta.objects.all()
        tipo = self.request.query_params.get('tipo_moto')
        estado = self.request.query_params.get('estado')
        if tipo:
            qs = qs.filter(tipo_moto=tipo)
        if estado:
            qs = qs.filter(estado=estado)
        return qs
