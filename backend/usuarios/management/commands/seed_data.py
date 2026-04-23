from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from usuarios.models import Cliente, Vendedor, Administrador
from motos.models import Motocicleta


USUARIOS = [
    {
        'username': 'admin_sistema',
        'first_name': 'Admin',
        'email': 'admin@yamaha.com',
        'password': 'AdminUIS2026',
        'is_staff': True,
        'rol': 'administrador',
        'perfil': {'apellido': 'Sistema', 'telefono': '3001234567'},
    },
    {
        'username': 'vendedor_yamaha',
        'first_name': 'Carlos',
        'email': 'vendedor@yamaha.com',
        'password': 'Vendedor2026',
        'is_staff': False,
        'rol': 'vendedor',
        'perfil': {'apellido': 'López', 'telefono': '3109876543'},
    },
    {
        'username': 'cliente_yamaha',
        'first_name': 'Ana',
        'email': 'cliente_yamaha@mail.com',
        'password': 'Test2026',
        'is_staff': False,
        'rol': 'cliente',
        'perfil': {
            'apellido': 'Yamaha',
            'tipo_documento': 'cc',
            'numero_documento': '12345678',
            'telefono': '3201234567',
            'direccion': 'Calle 45 #23-10, Bucaramanga',
        },
    },
]

MOTOS = [
    {
        'nombre': 'Yamaha MT-15',
        'tipo_moto': 'naked',
        'anio': 2024,
        'cilindraje': 155,
        'tipo_combustible': 'Gasolina',
        'precio_lista': 15500000,
        'stock': 10,
        'estado': 'disponible',
        'potencia_maxima': '18.4 CV @ 10,000 rpm',
        'torque_maximo': '14.1 Nm @ 8,000 rpm',
        'peso': '139 kg',
        'tipo_motor': 'Monocilíndrico 4T SOHC',
        'velocidades': 6,
        'color': 'Azul/Negro',
    },
    {
        'nombre': 'Yamaha MT-07',
        'tipo_moto': 'naked',
        'anio': 2024,
        'cilindraje': 689,
        'tipo_combustible': 'Gasolina',
        'precio_lista': 32000000,
        'stock': 5,
        'estado': 'disponible',
        'potencia_maxima': '73.4 CV @ 9,000 rpm',
        'torque_maximo': '68 Nm @ 6,500 rpm',
        'peso': '184 kg',
        'tipo_motor': 'Bicilíndrico en paralelo 4T',
        'velocidades': 6,
        'color': 'Gris/Negro',
    },
    {
        'nombre': 'Yamaha YZF-R15',
        'tipo_moto': 'deportiva',
        'anio': 2024,
        'cilindraje': 155,
        'tipo_combustible': 'Gasolina',
        'precio_lista': 17500000,
        'stock': 8,
        'estado': 'disponible',
        'potencia_maxima': '18.6 CV @ 10,000 rpm',
        'torque_maximo': '14.2 Nm @ 8,500 rpm',
        'peso': '142 kg',
        'tipo_motor': 'Monocilíndrico 4T SOHC VVA',
        'velocidades': 6,
        'color': 'Azul Racing',
    },
    {
        'nombre': 'Yamaha YZF-R3',
        'tipo_moto': 'deportiva',
        'anio': 2024,
        'cilindraje': 321,
        'tipo_combustible': 'Gasolina',
        'precio_lista': 22000000,
        'stock': 4,
        'estado': 'disponible',
        'potencia_maxima': '42 CV @ 10,750 rpm',
        'torque_maximo': '29.5 Nm @ 9,000 rpm',
        'peso': '169 kg',
        'tipo_motor': 'Bicilíndrico en paralelo 4T DOHC',
        'velocidades': 6,
        'color': 'Blanco/Azul',
    },
    {
        'nombre': 'Yamaha NMAX 155',
        'tipo_moto': 'automatica',
        'anio': 2024,
        'cilindraje': 155,
        'tipo_combustible': 'Gasolina',
        'precio_lista': 14000000,
        'stock': 12,
        'estado': 'disponible',
        'potencia_maxima': '15.1 CV @ 8,000 rpm',
        'torque_maximo': '13.9 Nm @ 6,000 rpm',
        'peso': '131 kg',
        'tipo_motor': 'Monocilíndrico 4T SOHC Blue Core',
        'velocidades': 0,
        'color': 'Negro mate',
    },
    {
        'nombre': 'Yamaha FZ-S FI',
        'tipo_moto': 'naked',
        'anio': 2023,
        'cilindraje': 149,
        'tipo_combustible': 'Gasolina',
        'precio_lista': 9800000,
        'stock': 15,
        'estado': 'disponible',
        'potencia_maxima': '12.4 CV @ 8,000 rpm',
        'torque_maximo': '12.8 Nm @ 6,000 rpm',
        'peso': '135 kg',
        'tipo_motor': 'Monocilíndrico 4T SOHC FI',
        'velocidades': 5,
        'color': 'Azul/Negro',
    },
    {
        'nombre': 'Yamaha Ténéré 700',
        'tipo_moto': 'adventure',
        'anio': 2024,
        'cilindraje': 689,
        'tipo_combustible': 'Gasolina',
        'precio_lista': 38000000,
        'stock': 3,
        'estado': 'disponible',
        'potencia_maxima': '72 CV @ 9,000 rpm',
        'torque_maximo': '68 Nm @ 6,500 rpm',
        'peso': '205 kg',
        'tipo_motor': 'Bicilíndrico en paralelo 4T CP2',
        'velocidades': 6,
        'color': 'Gris Rally',
    },
    {
        'nombre': 'Yamaha WR450F',
        'tipo_moto': 'motocross',
        'anio': 2024,
        'cilindraje': 449,
        'tipo_combustible': 'Gasolina',
        'precio_lista': 26000000,
        'stock': 6,
        'estado': 'disponible',
        'potencia_maxima': '63 CV @ 9,500 rpm',
        'torque_maximo': '51 Nm @ 7,500 rpm',
        'peso': '118 kg',
        'tipo_motor': 'Monocilíndrico 4T DOHC',
        'velocidades': 5,
        'color': 'Azul/Blanco',
    },
]


class Command(BaseCommand):
    help = 'Inicializa los datos base del sistema (usuarios y motocicletas)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Elimina y recrea todos los datos (cuidado: borra pedidos)',
        )

    def handle(self, *args, **options):
        reset = options['reset']

        if reset:
            self.stdout.write('Eliminando datos existentes...')
            Motocicleta.objects.all().delete()
            User.objects.filter(is_superuser=False).delete()

        self._crear_usuarios()
        self._crear_motos()
        self.stdout.write(self.style.SUCCESS('Datos inicializados correctamente.'))

    def _crear_usuarios(self):
        for datos in USUARIOS:
            username = datos['username']
            if User.objects.filter(username=username).exists():
                self.stdout.write(f'  Usuario ya existe: {username}')
                continue

            user = User.objects.create_user(
                username=username,
                first_name=datos['first_name'],
                email=datos['email'],
                password=datos['password'],
                is_staff=datos.get('is_staff', False),
            )

            rol = datos['rol']
            perfil = datos['perfil']

            if rol == 'administrador':
                Administrador.objects.create(user=user, **perfil)
            elif rol == 'vendedor':
                Vendedor.objects.create(user=user, **perfil)
            elif rol == 'cliente':
                Cliente.objects.create(user=user, **perfil)

            self.stdout.write(f'  Creado {rol}: {username}')

    def _crear_motos(self):
        for datos in MOTOS:
            nombre = datos['nombre']
            if Motocicleta.objects.filter(nombre=nombre).exists():
                self.stdout.write(f'  Moto ya existe: {nombre}')
                continue
            Motocicleta.objects.create(**datos)
            self.stdout.write(f'  Creada moto: {nombre}')
