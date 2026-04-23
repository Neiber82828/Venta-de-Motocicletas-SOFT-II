#!/bin/bash
set -e

echo "=== Aplicando migraciones ==="
python manage.py migrate --noinput

echo "=== Inicializando datos base ==="
python manage.py seed_data

echo "=== Iniciando servidor ==="
python manage.py runserver 0.0.0.0:8000
