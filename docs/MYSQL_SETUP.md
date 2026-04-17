# Guía de Configuración de MySQL

## Instalación de MySQL

### En Linux
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo mysql_secure_installation
```

### En macOS
```bash
brew install mysql
mysql_secure_installation
```

### En Windows
Descarga desde: https://dev.mysql.com/downloads/mysql/

## Crear Base de Datos

```sql
-- Conectarse como root
mysql -u root -p

-- Crear base de datos
CREATE DATABASE proyecto_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario (recomendado no usar root)
CREATE USER 'proyecto_user'@'localhost' IDENTIFIED BY 'tu_contraseña_segura';

-- Otorgar permisos
GRANT ALL PRIVILEGES ON proyecto_db.* TO 'proyecto_user'@'localhost';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- Verificar
SHOW DATABASES;
```

## Configuración en Django

Actualiza el archivo `backend/.env`:

```
DB_NAME=proyecto_db
DB_USER=proyecto_user
DB_PASSWORD=tu_contraseña_segura
DB_HOST=localhost
DB_PORT=3306
```

## Comandos MySQL Útiles

```bash
# Conectarse
mysql -u proyecto_user -p proyecto_db

# Ver tablas
SHOW TABLES;

# Ver estructura de una tabla
DESCRIBE nombre_tabla;

# Respaldar base de datos
mysqldump -u proyecto_user -p proyecto_db > backup.sql

# Restaurar base de datos
mysql -u proyecto_user -p proyecto_db < backup.sql
```

## Verificar Conexión desde Django

```bash
python manage.py dbshell
```
