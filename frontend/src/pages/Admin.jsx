import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from 'recharts';
import { getReporte } from '../services/pedidoService';
import { useAuth } from '../context/AuthContext';

const ESTADO_COLOR = {
  pendiente:  'bg-yellow-900/40 text-yellow-300 border border-yellow-700',
  confirmado: 'bg-green-900/40 text-green-300 border border-green-700',
  cancelado:  'bg-rose-900/40 text-rose-300 border border-rose-700',
};

const PIE_COLORS = ['#22c55e', '#BC4368', '#eab308'];

const CHART_THEME = {
  grid: '#2e2e4a',
  text: '#CCCCCC',
  tooltip: { bg: '#1a1a2e', border: '#2e2e4a', text: '#E6E6E6' },
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-brand-900 border border-brand-500 rounded-lg px-4 py-3 text-xs">
      {label && <p className="text-silver mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color ?? '#D88DA6' }}>
          {p.name}: <span className="font-bold">{typeof p.value === 'number' && p.value > 1000
            ? `$${Number(p.value).toLocaleString('es-CO')}`
            : p.value}
          </span>
        </p>
      ))}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`card-enter bg-brand-800 border rounded-xl p-5 ${color}`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm font-semibold mt-1 text-silver">{label}</p>
    </div>
  );
}

function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState('resumen');
  const [filtros, setFiltros] = useState({ fecha_inicio: '', fecha_fin: '', estado: 'todos' });
  const [reporte, setReporte] = useState(null);
  const [cargando, setCargando] = useState(true);

  const cargarReporte = (params) => {
    setCargando(true);
    getReporte(params).then(setReporte).finally(() => setCargando(false));
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

  const pieData = reporte ? [
    { name: 'Confirmados', value: reporte.confirmados },
    { name: 'Cancelados',  value: reporte.cancelados },
    { name: 'Pendientes',  value: reporte.pendientes },
  ] : [];

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

          {/* Tabs */}
          <div className="flex border-b border-brand-600">
            {[
              { key: 'resumen',     label: 'Resumen' },
              { key: 'graficas',    label: 'Gráficas' },
              { key: 'historial',   label: 'Historial de Pedidos' },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-6 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                  tab === t.key
                    ? 'border-rose-primary text-rose-light'
                    : 'border-transparent text-silver hover:text-snow'
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Filtros */}
            <form onSubmit={handleBuscar}
              className="flex flex-wrap gap-4 items-end mb-8 bg-brand-800 border border-brand-600 p-5 rounded-xl">
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
                Aplicar filtros
              </button>
            </form>

            {cargando && <p className="text-silver text-center py-16">Cargando datos...</p>}

            {reporte && !cargando && (
              <>
                {/* ── RESUMEN ── */}
                {tab === 'resumen' && (
                  <div className="fade-in space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <StatCard label="Total Pedidos" value={reporte.total}       color="border-rose-primary text-rose-light" />
                      <StatCard label="Confirmados"   value={reporte.confirmados} color="border-green-600 text-green-300" />
                      <StatCard label="Cancelados"    value={reporte.cancelados}  color="border-rose-700 text-rose-300" />
                      <StatCard label="Pendientes"    value={reporte.pendientes}  color="border-yellow-600 text-yellow-300" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-brand-800 border border-brand-600 rounded-xl p-5">
                        <p className="text-xs text-rose-mid uppercase font-semibold mb-1 tracking-wide">Moto más vendida</p>
                        <p className="text-snow font-bold text-lg">{reporte.mas_vendida}</p>
                      </div>
                      <div className="bg-brand-800 border border-brand-600 rounded-xl p-5">
                        <p className="text-xs text-silver uppercase font-semibold mb-1 tracking-wide">Moto menos vendida</p>
                        <p className="text-snow font-bold text-lg">{reporte.menos_vendida}</p>
                      </div>
                    </div>

                    {/* Mini gráfica de torta en resumen */}
                    <div className="bg-brand-800 border border-brand-600 rounded-xl p-6">
                      <p className="text-snow font-bold mb-4">Distribución de pedidos por estado</p>
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                            dataKey="value" paddingAngle={3}>
                            {pieData.map((_, i) => (
                              <Cell key={i} fill={PIE_COLORS[i]} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend formatter={(v) => <span style={{ color: CHART_THEME.text }}>{v}</span>} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* ── GRÁFICAS ── */}
                {tab === 'graficas' && (
                  <div className="fade-in space-y-8">

                    {/* Ingresos por mes */}
                    <div className="bg-brand-800 border border-brand-600 rounded-xl p-6">
                      <p className="text-snow font-bold mb-1">Ingresos por mes</p>
                      <p className="text-silver text-xs mb-5">Total en pesos colombianos</p>
                      <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={reporte.pedidos_por_mes}
                          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={CHART_THEME.grid} />
                          <XAxis dataKey="mes" tick={{ fill: CHART_THEME.text, fontSize: 11 }} />
                          <YAxis tick={{ fill: CHART_THEME.text, fontSize: 11 }}
                            tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} />
                          <Tooltip content={<CustomTooltip />} />
                          <Line type="monotone" dataKey="ingresos" name="Ingresos"
                            stroke="#BC4368" strokeWidth={2} dot={{ fill: '#BC4368', r: 4 }}
                            activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Pedidos por mes */}
                    <div className="bg-brand-800 border border-brand-600 rounded-xl p-6">
                      <p className="text-snow font-bold mb-1">Pedidos por mes</p>
                      <p className="text-silver text-xs mb-5">Cantidad de pedidos registrados</p>
                      <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={reporte.pedidos_por_mes}
                          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={CHART_THEME.grid} />
                          <XAxis dataKey="mes" tick={{ fill: CHART_THEME.text, fontSize: 11 }} />
                          <YAxis tick={{ fill: CHART_THEME.text, fontSize: 11 }} allowDecimals={false} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="pedidos" name="Pedidos" fill="#CA6889" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Ventas por moto */}
                    <div className="bg-brand-800 border border-brand-600 rounded-xl p-6">
                      <p className="text-snow font-bold mb-1">Unidades vendidas por modelo</p>
                      <p className="text-silver text-xs mb-5">Cantidad de unidades por motocicleta</p>
                      <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={reporte.ventas_por_moto} layout="vertical"
                          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={CHART_THEME.grid} />
                          <XAxis type="number" tick={{ fill: CHART_THEME.text, fontSize: 11 }} allowDecimals={false} />
                          <YAxis type="category" dataKey="moto" tick={{ fill: CHART_THEME.text, fontSize: 11 }} width={80} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="unidades" name="Unidades" fill="#BC4368" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Torta estados */}
                    <div className="bg-brand-800 border border-brand-600 rounded-xl p-6">
                      <p className="text-snow font-bold mb-1">Pedidos por estado</p>
                      <p className="text-silver text-xs mb-5">Proporción de estados de los pedidos</p>
                      <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                          <Pie data={pieData} cx="50%" cy="50%" outerRadius={110}
                            dataKey="value" paddingAngle={3} label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={{ stroke: '#CCCCCC' }}>
                            {pieData.map((_, i) => (
                              <Cell key={i} fill={PIE_COLORS[i]} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* ── HISTORIAL ── */}
                {tab === 'historial' && (
                  <div className="fade-in">
                    <h3 className="text-lg font-bold text-snow mb-4">Historial de Pedidos</h3>
                    {reporte.pedidos.length === 0 ? (
                      <p className="text-silver text-center py-8">No hay pedidos con estos filtros.</p>
                    ) : (
                      <div className="overflow-x-auto rounded-xl border border-brand-500">
                        <table className="w-full text-sm">
                          <thead className="bg-brand-900 border-b border-brand-600">
                            <tr>
                              {['ID Pedido', 'Cliente', 'Vendedor', 'Monto', 'Estado', 'Fecha'].map((h) => (
                                <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-silver">{h}</th>
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
