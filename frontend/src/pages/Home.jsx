import React from 'react';
import Carousel from '../components/Carousel';

function Home() {
  const categorias = [
    { icon: '🏍️', nombre: 'Deportivas', desc: 'Velocidad y adrenalina' },
    { icon: '🏃', nombre: 'Touring', desc: 'Viajes cómodos' },
    { icon: '🛵', nombre: 'Scooter', desc: 'Urbanas y prácticas' },
    { icon: '🚲', nombre: 'Cruiser', desc: 'Estilo y comodidad' },
  ];

  const productos_destacados = [
    { id: 1, nombre: 'Yamaha YZF-R1', precio: '$18,500', img: '🏍️' },
    { id: 2, nombre: 'Yamaha MT-09', precio: '$9,200', img: '🏍️' },
    { id: 3, nombre: 'Yamaha XMAX', precio: '$5,800', img: '🛵' },
    { id: 4, nombre: 'Yamaha XSR900', precio: '$10,500', img: '🏍️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Carrusel */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Carousel />
      </div>

      {/* Categorías */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Nuestras Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categorias.map((cat, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-center hover:shadow-lg transition cursor-pointer"
              >
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {cat.nombre}
                </h3>
                <p className="text-gray-600">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {productos_destacados.map((prod) => (
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
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promoción */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¡Oferta Especial!
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Descuento de hasta 20% en motos seleccionadas
          </p>
          <button className="bg-white text-red-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
            Ver Oferta
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
