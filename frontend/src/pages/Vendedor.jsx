import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPedidos, createPedido, createDetalle, cambiarEstado } from '../services/pedidoService';
import { getMotos } from '../services/motoService';
import { getClientes } from '../services/clienteService';

const ESTADO_COLOR = {
  pendiente:  'bg-yellow-900/40 text-yellow-300 border border-yellow-700',
  confirmado: 'bg-green-900/40 text-green-300 border border-green-700',
  cancelado:  'bg-rose-900/40 text-rose-300 border border-rose-700',
};

function Vendedor() {
  const { user } = useAuth();
  const [tab, setTab] = useState('registrar');

  const [clientes, setClientes] = useState([]);
  const [motos, setMotos] = useState([]);
  const [form, setForm] = useState({ id_cliente: '', id_motocicleta: '', cantidad: 1 });
  const [enviando, setEnviando] = useState(false);
  const [mensajeForm, setMensajeForm] = useState('');

  const [pedidos, setPedidos] = useState([]);
  const [cargandoPedidos, setCargandoPedidos] = useState(true);
  const [cambiando, setCambiando] = useState(null);
  const [pedidoActivo, setPedidoActivo] = useState(null);

  useEffect(() => {
    Promise.all([getClientes(), getMotos()])
      .then(([c, m]) => {
        setClientes(Array.isArray(c) ? c : []);
        const items = Array.isArray(m) ? m : m.results ?? [];
        setMotos(items.filter((mo) => mo.estado === 'disponible'));
      })
      .catch(() => {});
  }, []);

  const cargarPedidos = () => {
    setCargandoPedidos(true);
    getPedidos()
      .then((data) => setPedidos(Array.isArray(data) ? data : data.results ?? []))
      .catch(() => {})
      .finally(() => setCargandoPedidos(false));
  };

  useEffect(() => { cargarPedidos(); }, []);

  const motoSeleccionada = motos.find((m) => String(m.id) === String(form.id_motocicleta));

  const handleRegistrar = async (e) => {
    e.preventDefault();
    if (!form.id_cliente || !form.id_motocicleta) {
      setMensajeForm('Selecciona un cliente y una moto.');
      return;
    }
    setEnviando(true);
    setMensajeForm('');
    try {
      const monto = motoSeleccionada
        ? Number(motoSeleccionada.precio_lista) * Number(form.cantidad)
        : 0;
      const pedido = await createPedido({
        id_cliente: Number(form.id_cliente),
        id_vendedor: user.perfil_id,
        monto_total: monto,
        cantidad: Number(form.cantidad),
      });
      await createDetalle({
        id_pedido: pedido.id,
        id_motocicleta: Number(form.id_motocicleta),
        precio_unitario: motoSeleccionada.precio_lista,
        cantidad: Number(form.cantidad),
      });
      setMensajeForm('Pedido registrado exitosamente.');
      setForm({ id_cliente: '', id_motocicleta: '', cantidad: 1 });
      cargarPedidos();
    } catch {
      setMensajeForm('Error al registrar el pedido. Intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  const handleCambiarEstado = async (pedidoId, nuevoEstado) => {
    setCambiando(pedidoId);
    await cambiarEstado(pedidoId, nuevoEstado);
    cargarPedidos();
    setCambiando(null);
  };

  const inputClass =
    'w-full bg-brand-800 border border-brand-500 text-snow rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-primary focus:ring-1 focus:ring-rose-primary transition';
  const labelClass = 'block text-xs font-semibold text-silver uppercase mb-1 tracking-wide';

  return (
    <div className="min-h-screen bg-brand-800 py-10 page-enter">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-brand-700 border border-brand-500 rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-rose-primary to-rose-mid px-8 py-6 flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.first_name?.[0]?.toUpperCase() ?? 'V'}
            </div>
            <div>
              <p className="text-white font-bold text-lg">Panel Vendedor</p>
              <p className="text-white/70 text-sm">{user.first_name || user.username}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-brand-600">
            {[
              { key: 'registrar', label: 'Registrar Pedido' },
              { key: 'gestionar', label: 'Gestionar Pedidos' },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-6 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                  tab === t.key
                    ? 'border-rose-primary text-rose-light'
                    : 'border-transparent text-silver hover:text-snow'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {tab === 'registrar' && (
              <form onSubmit={handleRegistrar} className="max-w-lg space-y-5 fade-in">
                <h2 className="text-xl font-bold text-snow mb-4">Nuevo Pedido</h2>

                <div>
                  <label className={labelClass}>Cliente</label>
                  <select value={form.id_cliente}
                    onChange={(e) => setForm({ ...form, id_cliente: e.target.value })}
                    className={inputClass}>
                    <option value="">Seleccionar cliente...</option>
                    {clientes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre} {c.apellido} — {c.username}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Motocicleta</label>
                  <select value={form.id_motocicleta}
                    onChange={(e) => setForm({ ...form, id_motocicleta: e.target.value })}
                    className={inputClass}>
                    <option value="">Seleccionar moto...</option>
                    {motos.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nombre} — ${Number(m.precio_lista).toLocaleString('es-CO')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Cantidad</label>
                  <input type="number" min="1" value={form.cantidad}
                    onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                    className={inputClass} />
                </div>

                {motoSeleccionada && (
                  <div className="bg-brand-800 border border-rose-primary/30 rounded-xl p-4 text-sm fade-in">
                    <p className="text-silver">Moto: <span className="font-semibold text-snow">{motoSeleccionada.nombre}</span></p>
                    <p className="text-silver">Precio unitario: <span className="font-semibold text-rose-light">${Number(motoSeleccionada.precio_lista).toLocaleString('es-CO')}</span></p>
                    <p className="text-snow font-bold mt-2 text-base">
                      Total: ${(Number(motoSeleccionada.precio_lista) * Number(form.cantidad)).toLocaleString('es-CO')}
                    </p>
                  </div>
                )}

                {mensajeForm && (
                  <p className={`text-sm px-4 py-3 rounded-lg fade-in ${mensajeForm.includes('exitosamente') ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-rose-900/40 text-rose-300 border border-rose-700'}`}>
                    {mensajeForm}
                  </p>
                )}

                <button type="submit" disabled={enviando}
                  className="w-full bg-rose-primary hover:bg-rose-mid disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_16px_rgba(188,67,104,0.4)]">
                  {enviando ? 'Registrando...' : 'Registrar Pedido'}
                </button>
              </form>
            )}

            {tab === 'gestionar' && (
              <div className="fade-in">
                <h2 className="text-xl font-bold text-snow mb-6">Pedidos</h2>
                {cargandoPedidos ? (
                  <p className="text-silver text-center py-8">Cargando...</p>
                ) : pedidos.length === 0 ? (
                  <p className="text-silver text-center py-8">No hay pedidos registrados.</p>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-brand-500">
                    <table className="w-full text-sm">
                      <thead className="bg-brand-900 border-b border-brand-600">
                        <tr>
                          {['ID', 'Cliente', 'Monto', 'Estado', 'Fecha', 'Acción'].map((h) => (
                            <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider text-silver">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-600">
                        {pedidos.map((p) => (
                          <React.Fragment key={p.id}>
                            <tr
                              className="hover:bg-brand-600 cursor-pointer transition-colors duration-150"
                              onClick={() => setPedidoActivo(pedidoActivo === p.id ? null : p.id)}
                            >
                              <td className="px-4 py-3 font-mono text-silver text-xs">#{String(p.id).padStart(6, '0')}</td>
                              <td className="px-4 py-3 font-medium text-snow">{p.cliente_nombre}</td>
                              <td className="px-4 py-3 font-semibold text-rose-light">${Number(p.monto_total).toLocaleString('es-CO')}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ESTADO_COLOR[p.estado]}`}>
                                  {p.estado.charAt(0).toUpperCase() + p.estado.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-silver">{new Date(p.fecha_pedido).toLocaleDateString('es-CO')}</td>
                              <td className="px-4 py-3">
                                {p.estado === 'pendiente' && (
                                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                    <button disabled={cambiando === p.id}
                                      onClick={() => handleCambiarEstado(p.id, 'confirmado')}
                                      className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs disabled:opacity-50 transition">
                                      Confirmar
                                    </button>
                                    <button disabled={cambiando === p.id}
                                      onClick={() => handleCambiarEstado(p.id, 'cancelado')}
                                      className="bg-rose-primary hover:bg-rose-mid text-white px-3 py-1 rounded-lg text-xs disabled:opacity-50 transition">
                                      Cancelar
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                            {pedidoActivo === p.id && p.detalles?.length > 0 && (
                              <tr>
                                <td colSpan={6} className="bg-brand-800 px-6 py-3 border-t border-brand-600">
                                  <p className="text-xs font-semibold text-rose-mid uppercase mb-2 tracking-wide">Motos del pedido</p>
                                  {p.detalles.map((d, i) => (
                                    <div key={i} className="flex justify-between text-sm py-1 border-b border-brand-600 last:border-0">
                                      <span className="text-snow font-medium">{d.motocicleta?.nombre ?? 'Motocicleta'}</span>
                                      <span className="text-silver">{d.cantidad} × ${Number(d.precio_unitario).toLocaleString('es-CO')}</span>
                                    </div>
                                  ))}
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendedor;
