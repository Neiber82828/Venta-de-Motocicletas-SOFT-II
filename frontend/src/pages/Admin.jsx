import React, { useState, useEffect } from 'react';
import { getReporte } from '../services/pedidoService';
import { useAuth } from '../context/AuthContext';

const ESTADO_COLOR = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  confirmado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
};

function Admin() {
  const { user } = useAuth();
  const [filtros, setFiltros] = useState({ fecha_inicio: '', fecha_fin: '', estado: 'todos' });
  const [reporte, setReporte] = useState(null);
  const [cargando, setCargando] = useState(true);
  const cargarReporte = (params) => {
    setCargando(true);
    getReporte(params)
      .then(setReporte)
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarReporte({});
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    const params = {};
    if (filtros.fecha_inicio) params.fecha_inicio = filtros.fecha_inicio;
    if (filtros.fecha_fin) params.fecha_fin = filtros.fecha_fin;
    if (filtros.estado !== 'todos') params.estado = filtros.estado;
    cargarReporte(params);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-blue-900 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.first_name?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <div>
                <p className="text-white font-bold text-lg">Panel Administrador</p>
                <p className="text-blue-300 text-sm">{user.first_name || user.username}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleBuscar} className="flex flex-wrap gap-4 items-end mb-8">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Fecha Inicio</label>
                <input
                  type="date"
                  value={filtros.fecha_inicio}
                  onChange={(e) => setFiltros({ ...filtros, fecha_inicio: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Fecha Fin</label>
                <input
                  type="date"
                  value={filtros.fecha_fin}
                  onChange={(e) => setFiltros({ ...filtros, fecha_fin: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Estado</label>
                <select
                  value={filtros.estado}
                  onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg text-sm font-semibold transition"
              >
                Buscar
              </button>
            </form>

            {reporte && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Pedidos', value: reporte.total, color: 'bg-blue-50 text-blue-800' },
                    { label: 'Confirmados', value: reporte.confirmados, color: 'bg-green-50 text-green-800' },
                    { label: 'Cancelados', value: reporte.cancelados, color: 'bg-red-50 text-red-800' },
                    { label: 'Pendientes', value: reporte.pendientes, color: 'bg-yellow-50 text-yellow-800' },
                  ].map((stat) => (
                    <div key={stat.label} className={`rounded-xl p-5 ${stat.color}`}>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm font-semibold mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Moto más vendida</p>
                    <p className="text-gray-900 font-bold">{reporte.mas_vendida}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Moto menos vendida</p>
                    <p className="text-gray-900 font-bold">{reporte.menos_vendida}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-4">Historial de Pedidos</h3>
                {cargando ? (
                  <p className="text-gray-500 text-center py-8">Cargando...</p>
                ) : reporte.pedidos.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No hay pedidos con estos filtros.</p>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-sm">
                      <thead className="bg-blue-900 text-white">
                        <tr>
                          <th className="px-4 py-3 text-left">ID Pedido</th>
                          <th className="px-4 py-3 text-left">Cliente</th>
                          <th className="px-4 py-3 text-left">Vendedor</th>
                          <th className="px-4 py-3 text-left">Monto</th>
                          <th className="px-4 py-3 text-left">Estado</th>
                          <th className="px-4 py-3 text-left">Fecha</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {reporte.pedidos.map((p) => (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-mono text-gray-500">#{String(p.id).padStart(6, '0')}</td>
                            <td className="px-4 py-3 font-medium text-gray-900">{p.cliente_nombre}</td>
                            <td className="px-4 py-3 text-gray-600">{p.vendedor_nombre}</td>
                            <td className="px-4 py-3 font-semibold">${Number(p.monto_total).toLocaleString('es-CO')}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ESTADO_COLOR[p.estado]}`}>
                                {p.estado.charAt(0).toUpperCase() + p.estado.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-500">{new Date(p.fecha_pedido).toLocaleDateString('es-CO')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
