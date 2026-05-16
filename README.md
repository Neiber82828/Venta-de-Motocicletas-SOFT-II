# Venta de Motocicletas Yamaha

Plataforma web de venta de motocicletas con tres roles de usuario: cliente, vendedor y administrador.

- **Frontend**: React + Tailwind CSS
- **Backend**: Django REST Framework + SQLite
- **Autenticación**: Token Authentication

## Roles del sistema

| Usuario | Contraseña | Rol |
|---|---|---|
| `admin_sistema` | `AdminUIS2026` | Administrador — reportes y consultas |
| `vendedor_yamaha` | `Vendedor2026` | Vendedor — registrar y gestionar pedidos |
| `cliente_yamaha` | `Test2026` | Cliente — explorar catálogo y comprar |
| `cliente_juan` | `Test2026` | Cliente — Juan Pérez |
| `cliente_sofia` | `Test2026` | Cliente — Sofía Ramírez |
| `cliente_mario` | `Test2026` | Cliente — Mario López |
| `cliente_laura` | `Test2026` | Cliente — Laura Gómez |

---

## Instalación y arranque

### Backend

**Linux / Mac**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
bash start.sh
```

**Windows (CMD o PowerShell)**
```cmd
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

> `start.sh` no funciona en Windows, por eso los tres últimos comandos se ejecutan manualmente.
> Si los datos ya existen, `seed_data` los omite sin error.

El servidor queda disponible en http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm start
```

La aplicación queda disponible en http://localhost:3000.

---

## Estructura del proyecto

```
├── backend/
│   ├── config/          # Configuración Django (settings, urls)
│   ├── usuarios/        # Modelos Cliente, Vendedor, Administrador
│   │   └── management/
│   │       └── commands/
│   │           └── seed_data.py   # Datos iniciales
│   ├── motos/           # Modelo Motocicleta y catálogo
│   ├── pedidos/         # Pedidos, detalles e historial de estados
│   ├── requirements.txt
│   └── start.sh         # Script de arranque
└── frontend/
    └── src/
        ├── context/     # AuthContext (sesión)
        ├── pages/       # Home, Productos, DetalleMoto, Login,
        │                #   Perfil, Vendedor, Admin
        ├── components/  # Navbar, Footer
        └── services/    # API: auth, motos, pedidos, clientes, vendedores
```

---

## Comandos útiles

```bash
# Reiniciar datos desde cero (borra pedidos existentes)
python manage.py seed_data --reset

# Acceder al panel de administración de Django
python manage.py createsuperuser
# → http://localhost:8000/admin
```
