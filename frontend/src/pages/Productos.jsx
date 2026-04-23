import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [filtro, setFiltro] = useState('todos');
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Catálogo de Motos</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          {['todos', 'deportiva', 'naked', 'automatica', 'adventure', 'motocross', 'cuatrimoto'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className={`px-6 py-2 rounded capitalize ${
                filtro === tipo
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-300'
              } transition`}
            >
              {tipo === 'todos' ? 'Todos' : TIPO_LABELS[tipo] ?? tipo}
            </button>
          ))}
        </div>

        {cargando && (
          <p className="text-center text-gray-500 py-16">Cargando motos...</p>
        )}
        {error && (
          <p className="text-center text-red-500 py-16">{error}</p>
        )}
        {!cargando && !error && motosFiltradas.length === 0 && (
          <p className="text-center text-gray-500 py-16">No hay motos en esta categoría.</p>
        )}

        {!cargando && !error && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {motosFiltradas.map((moto) => (
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
                  <h3 className="text-lg font-bold text-gray-900 mt-1 mb-1">
                    {moto.nombre}
                  </h3>
                  <p className="text-sm text-gray-400 mb-1">{moto.anio} · {moto.cilindraje} cc</p>
                  <p className="text-sm text-gray-500 mb-2">{moto.tipo_combustible}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    ${Number(moto.precio_lista).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Stock: {moto.stock} unidades
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
        )}
      </div>
    </div>
  );
}

export default Productos;
