import React, { useState } from 'react';

function Productos() {
  const [filtro, setFiltro] = useState('todos');

  const productos = [
    { id: 1, nombre: 'Yamaha YZF-R1', precio: '$18,500', categoria: 'deportiva', img: '🏍️' },
    { id: 2, nombre: 'Yamaha MT-09', precio: '$9,200', categoria: 'naked', img: '🏍️' },
    { id: 3, nombre: 'Yamaha XMAX', precio: '$5,800', categoria: 'scooter', img: '🛵' },
    { id: 4, nombre: 'Yamaha XSR900', precio: '$10,500', categoria: 'retro', img: '🏍️' },
    { id: 5, nombre: 'Yamaha YZF-R6', precio: '$12,300', categoria: 'deportiva', img: '🏍️' },
    { id: 6, nombre: 'Yamaha Tricker', precio: '$4,200', categoria: 'scooter', img: '🛵' },
    { id: 7, nombre: 'Yamaha FZ-S', precio: '$6,800', categoria: 'naked', img: '🏍️' },
    { id: 8, nombre: 'Yamaha V-Max', precio: '$16,900', categoria: 'cruiser', img: '🏍️' },
  ];

  const productosFiltrados = filtro === 'todos' 
    ? productos 
    : productos.filter(p => p.categoria === filtro);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Catálogo de Productos</h1>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-6 py-2 rounded ${
              filtro === 'todos' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-900 border border-gray-300'
            } transition`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltro('deportiva')}
            className={`px-6 py-2 rounded ${
              filtro === 'deportiva' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-900 border border-gray-300'
            } transition`}
          >
            Deportivas
          </button>
          <button
            onClick={() => setFiltro('scooter')}
            className={`px-6 py-2 rounded ${
              filtro === 'scooter' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-900 border border-gray-300'
            } transition`}
          >
            Scooter
          </button>
          <button
            onClick={() => setFiltro('naked')}
            className={`px-6 py-2 rounded ${
              filtro === 'naked' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-900 border border-gray-300'
            } transition`}
          >
            Naked
          </button>
          <button
            onClick={() => setFiltro('cruiser')}
            className={`px-6 py-2 rounded ${
              filtro === 'cruiser' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-900 border border-gray-300'
            } transition`}
          >
            Cruiser
          </button>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {productosFiltrados.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-900 p-12 text-center text-5xl">
                {prod.img}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {prod.nombre}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  {prod.precio}
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition mb-2">
                  Comprar
                </button>
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded transition">
                  Más Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Productos;
