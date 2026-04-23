import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPedidos, createPedido, createDetalle, cambiarEstado } from '../services/pedidoService';
import { getMotos } from '../services/motoService';
import { getClientes } from '../services/clienteService';

const ESTADO_COLOR = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  confirmado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
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
      });
  }, []);

  const cargarPedidos = () => {
    setCargandoPedidos(true);
    getPedidos()
      .then((data) => setPedidos(Array.isArray(data) ? data : data.results ?? []))
      .finally(() => setCargandoPedidos(false));
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-blue-900 px-8 py-6 flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.first_name?.[0]?.toUpperCase() ?? 'V'}
            </div>
            <div>
              <p className="text-white font-bold text-lg">Panel Vendedor</p>
              <p className="text-blue-300 text-sm">{user.first_name || user.username}</p>
            </div>
          </div>

          <div className="flex border-b border-gray-200">
            {[
              { key: 'registrar', label: 'Registrar Pedido' },
              { key: 'gestionar', label: 'Gestionar Pedidos' },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-6 py-3 text-sm font-semibold transition border-b-2 ${
                  tab === t.key
                    ? 'border-blue-700 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {tab === 'registrar' && (
              <form onSubmit={handleRegistrar} className="max-w-lg space-y-5">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Nuevo Pedido</h2>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Cliente</label>
                  <select
                    value={form.id_cliente}
                    onChange={(e) => setForm({ ...form, id_cliente: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar cliente...</option>
                    {clientes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre} {c.apellido} — {c.username}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Motocicleta</label>
                  <select
                    value={form.id_motocicleta}
                    onChange={(e) => setForm({ ...form, id_motocicleta: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar moto...</option>
                    {motos.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nombre} — ${Number(m.precio_lista).toLocaleString('es-CO')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={form.cantidad}
                    onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {motoSeleccionada && (
                  <div className="bg-blue-50 rounded-lg p-4 text-sm">
                    <p className="text-gray-600">Moto: <span className="font-semibold text-gray-900">{motoSeleccionada.nombre}</span></p>
                    <p className="text-gray-600">Precio unitario: <span className="font-semibold">${Number(motoSeleccionada.precio_lista).toLocaleString('es-CO')}</span></p>
                    <p className="text-gray-600 font-semibold mt-1">
                      Total: ${(Number(motoSeleccionada.precio_lista) * Number(form.cantidad)).toLocaleString('es-CO')}
                    </p>
                  </div>
                )}

                {mensajeForm && (
                  <p className={`text-sm px-3 py-2 rounded ${mensajeForm.includes('exitosamente') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {mensajeForm}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 text-white font-semibold py-2 rounded-lg transition"
                >
                  {enviando ? 'Registrando...' : 'Registrar Pedido'}
                </button>
              </form>
            )}

            {tab === 'gestionar' && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Pedidos</h2>
                {cargandoPedidos ? (
                  <p className="text-gray-500 text-center py-8">Cargando...</p>
                ) : pedidos.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No hay pedidos registrados.</p>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-sm">
                      <thead className="bg-blue-900 text-white">
                        <tr>
                          <th className="px-4 py-3 text-left">ID</th>
                          <th className="px-4 py-3 text-left">Cliente</th>
                          <th className="px-4 py-3 text-left">Monto</th>
                          <th className="px-4 py-3 text-left">Estado</th>
                          <th className="px-4 py-3 text-left">Fecha</th>
                          <th className="px-4 py-3 text-left">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {pedidos.map((p) => (
                          <React.Fragment key={p.id}>
                            <tr
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => setPedidoActivo(pedidoActivo === p.id ? null : p.id)}
                            >
                              <td className="px-4 py-3 font-mono text-gray-500">#{String(p.id).padStart(6, '0')}</td>
                              <td className="px-4 py-3 font-medium text-gray-900">{p.cliente_nombre}</td>
                              <td className="px-4 py-3 font-semibold">${Number(p.monto_total).toLocaleString('es-CO')}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ESTADO_COLOR[p.estado]}`}>
                                  {p.estado.charAt(0).toUpperCase() + p.estado.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-500">{new Date(p.fecha_pedido).toLocaleDateString('es-CO')}</td>
                              <td className="px-4 py-3">
                                {p.estado === 'pendiente' && (
                                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                    <button
                                      disabled={cambiando === p.id}
                                      onClick={() => handleCambiarEstado(p.id, 'confirmado')}
                                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                                    >
                                      Confirmar
                                    </button>
                                    <button
                                      disabled={cambiando === p.id}
                                      onClick={() => handleCambiarEstado(p.id, 'cancelado')}
                                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                            {pedidoActivo === p.id && p.detalles?.length > 0 && (
                              <tr>
                                <td colSpan={6} className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Motos del pedido</p>
                                  {p.detalles.map((d, i) => (
                                    <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-200 last:border-0">
                                      <span className="text-gray-800 font-medium">{d.motocicleta?.nombre ?? 'Motocicleta'}</span>
                                      <span className="text-gray-500">{d.cantidad} × ${Number(d.precio_unitario).toLocaleString('es-CO')}</span>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendedor;
