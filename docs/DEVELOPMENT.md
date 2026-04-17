# Guía de Desarrollo

## Estructura de Carpetas Recomendada

### Backend Django

```
backend/
├── apps/
│   ├── usuarios/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── tests.py
│   ├── productos/
│   │   └── (misma estructura)
│   └── __init__.py
├── config/
├── static/
├── media/
└── templates/
```

### Frontend React

```
frontend/src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── Forms/
│   │   └── FormUsuario.jsx
│   └── Common/
│       └── Loading.jsx
├── pages/
│   ├── Home.jsx
│   ├── Usuarios.jsx
│   └── NotFound.jsx
├── services/
│   ├── api.js
│   ├── userService.js
│   └── productService.js
├── context/
│   └── AuthContext.jsx
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

## Crear una Nueva App en Django

```bash
cd backend
python manage.py startapp nombreapp
```

Luego:
1. Agrega la app a `INSTALLED_APPS` en `config/settings.py`
2. Define modelos en `apps/nombreapp/models.py`
3. Registra en `apps/nombreapp/admin.py`
4. Crea `apps/nombreapp/serializers.py`
5. Crea `apps/nombreapp/views.py`
6. Crea `apps/nombreapp/urls.py`
7. Incluye urls en `config/urls.py`

## Crear una Nueva Página en React

1. Crea el archivo en `src/pages/NombrePagina.jsx`
2. Crea un componente funcional
3. Importa en `src/App.jsx`
4. Agrega una ruta en el Router

## CORS - Conexión Frontend-Backend

El backend está configurado para aceptar solicitudes del frontend en:
- `http://localhost:3000`

Si necesitas cambiar el puerto o agregar más orígenes, edita `CORS_ALLOWED_ORIGINS` en `config/settings.py`.

## Variables de Entorno

### Backend (.env)
- `DEBUG=True` (False en producción)
- `SECRET_KEY=` (Generar con Django)
- `DB_NAME=proyecto_db`
- `DB_USER=proyecto_user`
- `DB_PASSWORD=`
- `DB_HOST=localhost`
- `DB_PORT=3306`

### Frontend (.env)
- `REACT_APP_API_URL=http://localhost:8000`

## Testing

### Backend
```bash
python manage.py test
```

### Frontend
```bash
npm test
```

## Build para Producción

### Frontend
```bash
npm run build
```

### Backend
```bash
python manage.py collectstatic
```
