# Proyecto Web Fullstack

## Descripción
Proyecto web completo con arquitectura moderna:
- **Frontend**: React + Tailwind CSS
- **Backend**: Django + Django REST Framework
- **Base de datos**: MySQL

## Estructura del Proyecto

```
Proyecto prueba/
├── frontend/          # Aplicación React
│   ├── public/
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas
│   │   ├── services/      # Servicios API
│   │   ├── styles/        # Estilos CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.example
├── backend/           # Aplicación Django
│   ├── config/        # Configuración principal
│   ├── apps/          # Aplicaciones Django
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
├── docs/              # Documentación
└── README.md
```

## Instalación

### Backend (Django)

1. Navega a la carpeta backend:
```bash
cd backend
```

2. Crea un entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\\Scripts\\activate
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

4. Configura las variables de entorno:
```bash
cp .env.example .env
# Edita .env con tus credenciales de MySQL
```

5. Realiza las migraciones:
```bash
python manage.py migrate
```

6. Crea un superusuario:
```bash
python manage.py createsuperuser
```

7. Inicia el servidor:
```bash
python manage.py runserver
```

### Frontend (React)

1. Navega a la carpeta frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
# Edita .env si es necesario
```

4. Inicia el servidor de desarrollo:
```bash
npm start
```

## Configuración de MySQL

1. Crea la base de datos:
```sql
CREATE DATABASE proyecto_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'usuario_proyecto'@'localhost' IDENTIFIED BY 'contraseña_segura';
GRANT ALL PRIVILEGES ON proyecto_db.* TO 'usuario_proyecto'@'localhost';
FLUSH PRIVILEGES;
```

2. Actualiza el archivo `.env` del backend con estos datos.

## Acceso a la Aplicación

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **Admin Django**: http://localhost:8000/admin

## Próximos Pasos

1. **Crear Apps Django**: 
   - Crea apps para diferentes módulos (usuarios, productos, etc.)
   - Define modelos en `models.py`
   - Crea serializadores en `serializers.py`
   - Crea vistas API en `views.py`

2. **Crear Componentes React**:
   - Componentes para listados
   - Formularios
   - Páginas específicas

3. **Integración API**:
   - Crea servicios para consumir endpoints
   - Maneja estados con Context API o Redux

## Recursos Útiles

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Licencia

MIT
