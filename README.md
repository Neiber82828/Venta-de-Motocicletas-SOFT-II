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

---

## Instalación y arranque

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
bash start.sh
```

El script `start.sh` ejecuta automáticamente:
1. `python manage.py migrate` — aplica las migraciones
2. `python manage.py seed_data` — carga usuarios y motos iniciales
3. `python manage.py runserver` — inicia el servidor en http://localhost:8000

> Si los datos ya existen, `seed_data` los omite sin error.

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
