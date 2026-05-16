import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getMotos } from '../services/motoService';

const TIPO_LABELS = {
  naked: 'Naked',
  automatica: 'Automática',
  deportiva: 'Deportiva',
  adventure: 'Adventure',
  motocross: 'Motocross',
  cuatrimoto: 'Cuatrimoto',
};

function Productos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filtro, setFiltro] = useState(searchParams.get('filtro') ?? 'todos');
  const [motos, setMotos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMotos()
      .then((data) => {
        const items = Array.isArray(data) ? data : data.results ?? [];
        setMotos(items);
      })
      .catch(() => setError('No se pudo conectar con el servidor.'))
      .finally(() => setCargando(false));
  }, []);

  const motosFiltradas = filtro === 'todos'
    ? motos
    : motos.filter((m) => m.tipo_moto === filtro);

  return (
    <div className="min-h-screen bg-brand-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-snow mb-2">Catálogo de Motos</h1>
        <p className="text-silver mb-8">Explora nuestra colección completa</p>

        <div className="flex flex-wrap gap-3 mb-10">
          {['todos', 'deportiva', 'naked', 'automatica', 'adventure', 'motocross', 'cuatrimoto'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                filtro === tipo
                  ? 'bg-rose-primary text-white shadow-[0_0_12px_rgba(188,67,104,0.4)]'
                  : 'bg-brand-700 text-silver border border-brand-500 hover:border-rose-mid hover:text-snow'
              }`}
            >
              {tipo === 'todos' ? 'Todos' : TIPO_LABELS[tipo] ?? tipo}
            </button>
          ))}
        </div>

        {cargando && (
          <p className="text-center text-silver py-16">Cargando motos...</p>
        )}
        {error && (
          <p className="text-center text-rose-light py-16">{error}</p>
        )}
        {!cargando && !error && motosFiltradas.length === 0 && (
          <p className="text-center text-silver py-16">No hay motos en esta categoría.</p>
        )}

        {!cargando && !error && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {motosFiltradas.map((moto) => (
              <div
                key={moto.id}
                className="group bg-brand-700 border border-brand-500 hover:border-rose-primary rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(188,67,104,0.2)] hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-rose-primary to-brand-900 p-12 text-center text-5xl">
                  🏍️
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase text-rose-mid">
                    {TIPO_LABELS[moto.tipo_moto] ?? moto.tipo_moto}
                  </span>
                  <h3 className="text-lg font-bold text-snow mt-1 mb-1">
                    {moto.nombre}
                  </h3>
                  <p className="text-sm text-silver mb-1">{moto.anio} · {moto.cilindraje} cc</p>
                  <p className="text-sm text-silver mb-2">{moto.tipo_combustible}</p>
                  <p className="text-2xl font-bold text-rose-light mb-4">
                    ${Number(moto.precio_lista).toLocaleString()}
                  </p>
                  <p className="text-sm text-silver mb-4">
                    Stock: {moto.stock} unidades
                  </p>
                  <button
                    onClick={() => navigate(`/productos/${moto.id}`)}
                    className="w-full bg-rose-primary hover:bg-rose-mid text-white py-2 rounded-lg transition font-semibold"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Productos;
