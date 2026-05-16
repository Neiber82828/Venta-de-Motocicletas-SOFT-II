import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from usuarios.models import Cliente, Vendedor, Administrador
from motos.models import Motocicleta
from pedidos.models import Pedido, DetallePedido, HistorialEstadoPedido


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
    {
        'username': 'cliente_juan',
        'first_name': 'Juan',
        'email': 'juan.perez@mail.com',
        'password': 'Cliente2026',
        'is_staff': False,
        'rol': 'cliente',
        'perfil': {
            'apellido': 'Pérez',
            'tipo_documento': 'cc',
            'numero_documento': '87654321',
            'telefono': '3112345678',
            'direccion': 'Carrera 12 #34-56, Medellín',
        },
    },
    {
        'username': 'cliente_sofia',
        'first_name': 'Sofía',
        'email': 'sofia.ramirez@mail.com',
        'password': 'Cliente2026',
        'is_staff': False,
        'rol': 'cliente',
        'perfil': {
            'apellido': 'Ramírez',
            'tipo_documento': 'cc',
            'numero_documento': '11223344',
            'telefono': '3189876543',
            'direccion': 'Avenida 80 #45-12, Bogotá',
        },
    },
    {
        'username': 'cliente_mario',
        'first_name': 'Mario',
        'email': 'mario.torres@mail.com',
        'password': 'Cliente2026',
        'is_staff': False,
        'rol': 'cliente',
        'perfil': {
            'apellido': 'Torres',
            'tipo_documento': 'cc',
            'numero_documento': '55667788',
            'telefono': '3005551234',
            'direccion': 'Calle 72 #10-30, Cali',
        },
    },
    {
        'username': 'cliente_laura',
        'first_name': 'Laura',
        'email': 'laura.gomez@mail.com',
        'password': 'Cliente2026',
        'is_staff': False,
        'rol': 'cliente',
        'perfil': {
            'apellido': 'Gómez',
            'tipo_documento': 'cc',
            'numero_documento': '99887766',
            'telefono': '3156667788',
            'direccion': 'Calle 100 #15-20, Barranquilla',
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

COMENTARIOS_CONFIRMADO = [
    'Pago verificado, pedido aprobado.',
    'Cliente realizó transferencia exitosamente.',
    'Documentos en regla, pedido confirmado.',
    'Pago en efectivo recibido.',
    'Financiamiento aprobado por la entidad.',
]

COMENTARIOS_CANCELADO = [
    'Cliente desistió de la compra.',
    'Problemas con el financiamiento.',
    'Moto no disponible en el color solicitado.',
    'Cliente no se presentó a recoger.',
    'Solicitud de cancelación por el cliente.',
]


class Command(BaseCommand):
    help = 'Inicializa los datos base del sistema (usuarios, motocicletas y pedidos de ejemplo)'

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
            HistorialEstadoPedido.objects.all().delete()
            DetallePedido.objects.all().delete()
            Pedido.objects.all().delete()
            Motocicleta.objects.all().delete()
            User.objects.filter(is_superuser=False).delete()

        self._crear_usuarios()
        self._crear_motos()
        self._crear_pedidos()
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

    def _crear_pedidos(self):
        if Pedido.objects.count() >= 30:
            self.stdout.write('  Pedidos ya existen (30+), se omite la generación.')
            return

        clientes = list(Cliente.objects.all())
        vendedores = list(Vendedor.objects.all())
        motos = list(Motocicleta.objects.all())

        if not clientes or not vendedores or not motos:
            self.stdout.write(self.style.WARNING('  No hay clientes, vendedores o motos para crear pedidos.'))
            return

        # Distribución de estados: 12 confirmados, 10 pendientes, 8 cancelados
        estados = (
            ['confirmado'] * 12
            + ['pendiente'] * 10
            + ['cancelado'] * 8
        )
        random.shuffle(estados)

        ahora = timezone.now()

        for i, estado in enumerate(estados):
            cliente = random.choice(clientes)
            vendedor = random.choice(vendedores)
            moto = random.choice(motos)
            cantidad = random.randint(1, 2)
            monto_total = moto.precio_lista * cantidad

            # Fecha aleatoria en los últimos 12 meses
            dias_atras = random.randint(1, 365)
            fecha_pedido = ahora - timedelta(days=dias_atras)

            pedido = Pedido.objects.create(
                id_cliente=cliente,
                id_vendedor=vendedor,
                monto_total=monto_total,
                estado=estado,
                cantidad=cantidad,
            )
            # Actualizar la fecha porque el campo usa auto_now_add
            Pedido.objects.filter(pk=pedido.pk).update(fecha_pedido=fecha_pedido)

            DetallePedido.objects.create(
                id_pedido=pedido,
                id_motocicleta=moto,
                precio_unitario=moto.precio_lista,
                cantidad=cantidad,
                estado=estado,
            )

            # Historial para pedidos que cambiaron de estado
            if estado in ('confirmado', 'cancelado'):
                comentario = (
                    random.choice(COMENTARIOS_CONFIRMADO)
                    if estado == 'confirmado'
                    else random.choice(COMENTARIOS_CANCELADO)
                )
                historial = HistorialEstadoPedido.objects.create(
                    id_pedido=pedido,
                    id_vendedor=vendedor,
                    estado_anterior='pendiente',
                    estado_nuevo=estado,
                    comentarios=comentario,
                )
                fecha_cambio = fecha_pedido + timedelta(hours=random.randint(1, 48))
                HistorialEstadoPedido.objects.filter(pk=historial.pk).update(fecha_cambio=fecha_cambio)

        self.stdout.write(f'  Creados 30 pedidos aleatorios.')
