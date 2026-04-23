from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Cliente, Vendedor, Administrador
from .serializers import (
    RegisterClienteSerializer, ClienteSerializer,
    VendedorSerializer, AdministradorSerializer, UserProfileSerializer
)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
    token, _ = Token.objects.get_or_create(user=user)
    profile = UserProfileSerializer(user).data
    return Response({'token': token.key, 'user': profile})


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterClienteSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        profile = UserProfileSerializer(user).data
        return Response({'token': token.key, 'user': profile}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    return Response(UserProfileSerializer(request.user).data)


class ClienteViewSet(ReadOnlyModelViewSet):
    queryset = Cliente.objects.select_related('user').all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]


class VendedorViewSet(ReadOnlyModelViewSet):
    queryset = Vendedor.objects.select_related('user').all()
    serializer_class = VendedorSerializer
    permission_classes = [IsAuthenticated]
