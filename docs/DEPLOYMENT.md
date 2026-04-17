# Guía de Despliegue en Producción

## Variables de Entorno para Producción

### Backend

```
DEBUG=False
SECRET_KEY=generar-una-clave-segura-aleatoria
ALLOWED_HOSTS=tu-dominio.com,www.tu-dominio.com

DB_NAME=proyecto_db_prod
DB_USER=user_prod
DB_PASSWORD=contraseña-muy-segura
DB_HOST=ip-servidor-db
DB_PORT=3306
```

## Despliegue del Backend

### Con Gunicorn

1. Instala Gunicorn:
```bash
pip install gunicorn
```

2. Ejecuta:
```bash
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

### Con Docker

Crea un `Dockerfile` en la carpeta backend:

```dockerfile
FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
```

## Despliegue del Frontend

1. Build:
```bash
npm run build
```

2. Sirve con un servidor estático:
```bash
npm install -g serve
serve -s build -l 3000
```

## Nginx - Configuración de Reverse Proxy

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## SSL con Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

## Mantenimiento

- Realiza backups regulares de la base de datos
- Monitorea logs
- Actualiza dependencias regularmente
- Realiza pruebas antes de desplegar cambios
