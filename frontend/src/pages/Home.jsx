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
    <div className="min-h-screen bg-brand-800 page-enter">
      {/* Carrusel */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Carousel />
      </div>

      {/* Categorías */}
      <section className="py-16 bg-brand-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-3 text-snow">
            Nuestras Categorías
          </h2>
          <p className="text-center text-silver mb-12">Encuentra la moto perfecta para tu estilo</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categorias.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/productos?filtro=${cat.filtro}`)}
                className="card-enter group bg-brand-700 border border-brand-500 hover:border-rose-primary p-8 rounded-xl text-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_28px_rgba(188,67,104,0.3)] hover:-translate-y-2"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <h3 className="text-xl font-bold text-snow mb-2">{cat.nombre}</h3>
                <p className="text-silver text-sm">{cat.desc}</p>
                <div className="mt-4 text-xs font-semibold text-rose-mid group-hover:text-rose-light transition">
                  Ver modelos →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-brand-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-3 text-snow">
            Productos Destacados
          </h2>
          <p className="text-center text-silver mb-12">Los modelos más populares de nuestro catálogo</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {destacados.map((moto) => (
              <div
                key={moto.id}
                className="card-enter group bg-brand-700 border border-brand-500 hover:border-rose-primary rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_28px_rgba(188,67,104,0.25)] hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-rose-primary to-brand-900 p-12 text-center text-5xl group-hover:from-rose-mid transition-all duration-300">
                  🏍️
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase text-rose-mid">
                    {TIPO_LABELS[moto.tipo_moto] ?? moto.tipo_moto}
                  </span>
                  <h3 className="text-lg font-bold text-snow mt-1 mb-2">
                    {moto.nombre}
                  </h3>
                  <p className="text-2xl font-bold text-rose-light mb-4">
                    ${Number(moto.precio_lista).toLocaleString()}
                  </p>
                  <button
                    onClick={() => navigate(`/productos/${moto.id}`)}
                    className="w-full bg-rose-primary hover:bg-rose-mid text-white py-2 rounded-lg transition-all duration-300 font-semibold hover:shadow-[0_0_16px_rgba(188,67,104,0.5)]"
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
