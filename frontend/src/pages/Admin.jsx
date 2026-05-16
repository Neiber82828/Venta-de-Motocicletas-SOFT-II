import React, { useState, useEffect } from 'react';
import { getReporte } from '../services/pedidoService';
import { useAuth } from '../context/AuthContext';

const ESTADO_COLOR = {
  pendiente:  'bg-yellow-900/40 text-yellow-300 border border-yellow-700',
  confirmado: 'bg-green-900/40 text-green-300 border border-green-700',
  cancelado:  'bg-rose-900/40 text-rose-300 border border-rose-700',
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

  useEffect(() => { cargarReporte({}); }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    const params = {};
    if (filtros.fecha_inicio) params.fecha_inicio = filtros.fecha_inicio;
    if (filtros.fecha_fin)    params.fecha_fin    = filtros.fecha_fin;
    if (filtros.estado !== 'todos') params.estado = filtros.estado;
    cargarReporte(params);
  };

  const inputClass =
    'bg-brand-700 border border-brand-500 text-snow rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-primary focus:ring-1 focus:ring-rose-primary transition';
  const labelClass = 'block text-xs font-semibold text-silver uppercase mb-1 tracking-wide';

  return (
    <div className="min-h-screen bg-brand-800 py-10 page-enter">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-brand-700 border border-brand-500 rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-rose-primary to-rose-mid px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.first_name?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <div>
                <p className="text-white font-bold text-lg">Panel Administrador</p>
                <p className="text-white/70 text-sm">{user.first_name || user.username}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Filtros */}
            <form onSubmit={handleBuscar} className="flex flex-wrap gap-4 items-end mb-8 bg-brand-800 border border-brand-600 p-5 rounded-xl">
              <div>
                <label className={labelClass}>Fecha Inicio</label>
                <input type="date" value={filtros.fecha_inicio}
                  onChange={(e) => setFiltros({ ...filtros, fecha_inicio: e.target.value })}
                  className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Fecha Fin</label>
                <input type="date" value={filtros.fecha_fin}
                  onChange={(e) => setFiltros({ ...filtros, fecha_fin: e.target.value })}
                  className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Estado</label>
                <select value={filtros.estado}
                  onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                  className={inputClass}>
                  <option value="todos">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <button type="submit"
                className="bg-rose-primary hover:bg-rose-mid text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_16px_rgba(188,67,104,0.4)]">
                Buscar
              </button>
            </form>

            {reporte && (
              <>
                {/* Estadísticas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Pedidos', value: reporte.total,       color: 'border-rose-primary text-rose-light' },
                    { label: 'Confirmados',   value: reporte.confirmados, color: 'border-green-600 text-green-300' },
                    { label: 'Cancelados',    value: reporte.cancelados,  color: 'border-rose-700 text-rose-300' },
                    { label: 'Pendientes',    value: reporte.pendientes,  color: 'border-yellow-600 text-yellow-300' },
                  ].map((stat) => (
                    <div key={stat.label}
                      className={`card-enter bg-brand-800 border rounded-xl p-5 ${stat.color}`}>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm font-semibold mt-1 text-silver">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Más / menos vendida */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-brand-800 border border-brand-600 rounded-xl p-5">
                    <p className="text-xs text-rose-mid uppercase font-semibold mb-1 tracking-wide">Moto más vendida</p>
                    <p className="text-snow font-bold">{reporte.mas_vendida}</p>
                  </div>
                  <div className="bg-brand-800 border border-brand-600 rounded-xl p-5">
                    <p className="text-xs text-silver uppercase font-semibold mb-1 tracking-wide">Moto menos vendida</p>
                    <p className="text-snow font-bold">{reporte.menos_vendida}</p>
                  </div>
                </div>

                {/* Tabla */}
                <h3 className="text-lg font-bold text-snow mb-4">Historial de Pedidos</h3>
                {cargando ? (
                  <p className="text-silver text-center py-8">Cargando...</p>
                ) : reporte.pedidos.length === 0 ? (
                  <p className="text-silver text-center py-8">No hay pedidos con estos filtros.</p>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-brand-500">
                    <table className="w-full text-sm">
                      <thead className="bg-brand-900 text-silver border-b border-brand-600">
                        <tr>
                          {['ID Pedido', 'Cliente', 'Vendedor', 'Monto', 'Estado', 'Fecha'].map((h) => (
                            <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-600">
                        {reporte.pedidos.map((p) => (
                          <tr key={p.id} className="hover:bg-brand-600 transition-colors duration-150">
                            <td className="px-4 py-3 font-mono text-silver text-xs">#{String(p.id).padStart(6, '0')}</td>
                            <td className="px-4 py-3 font-medium text-snow">{p.cliente_nombre}</td>
                            <td className="px-4 py-3 text-silver">{p.vendedor_nombre}</td>
                            <td className="px-4 py-3 font-semibold text-rose-light">${Number(p.monto_total).toLocaleString('es-CO')}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ESTADO_COLOR[p.estado]}`}>
                                {p.estado.charAt(0).toUpperCase() + p.estado.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-silver">{new Date(p.fecha_pedido).toLocaleDateString('es-CO')}</td>
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
