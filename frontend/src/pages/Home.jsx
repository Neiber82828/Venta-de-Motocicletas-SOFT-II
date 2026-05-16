import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { getMotos } from '../services/motoService';

const TIPO_LABELS = {
  naked: 'Naked',
  automatica: 'Automática',
  deportiva: 'Deportiva',
  adventure: 'Adventure',
  motocross: 'Motocross',
  cuatrimoto: 'Cuatrimoto',
};

function Home() {
  const navigate = useNavigate();
  const [destacados, setDestacados] = useState([]);

  const categorias = [
    { icon: '🏍️', nombre: 'Deportivas', desc: 'Velocidad y adrenalina', filtro: 'deportiva' },
    { icon: '🏔️', nombre: 'Adventure', desc: 'Viajes sin límites', filtro: 'adventure' },
    { icon: '🛵', nombre: 'Scooter', desc: 'Urbanas y prácticas', filtro: 'automatica' },
    { icon: '🏁', nombre: 'Naked', desc: 'Estilo y potencia', filtro: 'naked' },
  ];

  useEffect(() => {
    getMotos()
      .then((data) => {
        const items = Array.isArray(data) ? data : data.results ?? [];
        setDestacados(items.slice(0, 4));
      })
      .catch(() => {});
  }, []);

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
                onClick={() => navigate(`/productos?filtro=${cat.filtro}`)}
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
            {destacados.map((moto) => (
              <div
                key={moto.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-900 p-12 text-center text-5xl">
                  🏍️
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase text-blue-600">
                    {TIPO_LABELS[moto.tipo_moto] ?? moto.tipo_moto}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">
                    {moto.nombre}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    ${Number(moto.precio_lista).toLocaleString()}
                  </p>
                  <button
                    onClick={() => navigate(`/productos/${moto.id}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
