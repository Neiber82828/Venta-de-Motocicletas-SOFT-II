//instalar dependencias
sudo apt update
sudo apt install python3 python3-pip python3-venv mysql-server mysql-client nodejs npm -y

//verificar versiones
python3 --version   # debe ser 3.10+
node --version      # debe ser 18+
mysql --version

//configurar MySQL
sudo systemctl start mysql
sudo mysql_secure_installation


//Activar el entorno virtual en backend
cd backend

source venv/bin/activate  

//desactivar el entorno virtual
deactivate

//para frontend instalar estas dependencias
npm install
npm install axios react-router-dom
npx tailwindcss init

//version mas compatible React+Vite
npm uninstall tailwindcss
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

//Cada vez que se cambia un modelo en la bases de datos ejecutar estos 2 comandos
python manage.py makemigrations
python manage.py migrate


//Pasos de desarrollo
1. Modelos Django (todas las tablas del diagrama ER)

usuarios/models.py     → Cliente, Vendedor, Administrador
motos/models.py        → Motocicleta
pedidos/models.py      → Pedido, DetallePedido, HistorialEstadoPedido

2. Serializers (convierten los modelos a JSON)
3. Views + URLs (los endpoints de la API)
4. Probar la API con Postman o el navegador
5. Conectar React con axios
6. Construir las vistas una por una