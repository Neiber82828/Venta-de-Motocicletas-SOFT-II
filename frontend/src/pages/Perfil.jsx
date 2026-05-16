import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPedidos, cambiarEstado } from '../services/pedidoService';

const ESTADO_COLOR = {
  pendiente:  'bg-yellow-900/40 text-yellow-300 border border-yellow-700',
  confirmado: 'bg-green-900/40 text-green-300 border border-green-700',
  cancelado:  'bg-rose-900/40 text-rose-300 border border-rose-700',
};

function Perfil() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pedidoActivo, setPedidoActivo] = useState(null);

  useEffect(() => {
    getPedidos()
      .then((data) => setPedidos(Array.isArray(data) ? data : data.results ?? []))
      .catch(() => {})
      .finally(() => setCargando(false));
  }, []);

  const handleCancelar = async (pedidoId) => {
    await cambiarEstado(pedidoId, 'cancelado');
    setPedidos((prev) =>
      prev.map((p) => (p.id === pedidoId ? { ...p, estado: 'cancelado' } : p))
    );
    setPedidoActivo(null);
  };

  return (
    <div className="min-h-screen bg-brand-800 py-10 page-enter">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-brand-700 border border-brand-500 rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-rose-primary to-rose-mid px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.first_name?.[0]?.toUpperCase() ?? user.username[0].toUpperCase()}
              </div>
              <div>
                <p className="text-white font-bold text-xl">{user.first_name || user.username}</p>
                <p className="text-white/70 text-sm capitalize">{user.rol}</p>
              </div>
            </div>
            <span className="text-white/70 text-sm">{user.email}</span>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-snow">Mis Pedidos</h2>
              <span className="bg-rose-primary/20 text-rose-light border border-rose-primary/40 text-sm font-semibold px-3 py-1 rounded-full">
                {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''}
              </span>
            </div>

            {cargando && <p className="text-silver text-center py-8">Cargando...</p>}

            {!cargando && pedidos.length === 0 && (
              <div className="text-center py-12 text-silver">
                <p className="text-4xl mb-3">🏍️</p>
                <p>Aún no tienes pedidos. ¡Explora nuestro catálogo!</p>
              </div>
            )}

            <div className="space-y-3">
              {pedidos.map((pedido) => (
                <div
                  key={pedido.id}
                  className="card-enter border border-brand-500 hover:border-rose-primary/50 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <div
                    className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-brand-600 transition-colors duration-150"
                    onClick={() => setPedidoActivo(pedidoActivo === pedido.id ? null : pedido.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-silver text-xs font-mono">#{String(pedido.id).padStart(6, '0')}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ESTADO_COLOR[pedido.estado]}`}>
                        {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="text-rose-light font-semibold">${Number(pedido.monto_total).toLocaleString('es-CO')}</span>
                      <span className="text-silver">{new Date(pedido.fecha_pedido).toLocaleDateString('es-CO')}</span>
                      <span className="text-silver text-xs">{pedidoActivo === pedido.id ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {pedidoActivo === pedido.id && (
                    <div className="border-t border-brand-600 px-6 py-4 bg-brand-800 fade-in">
                      <p className="text-xs text-rose-mid mb-3 uppercase font-semibold tracking-wide">Motos del pedido</p>
                      {pedido.detalles?.map((d, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-brand-600 last:border-0">
                          <span className="text-snow font-medium">{d.motocicleta?.nombre ?? 'Motocicleta'}</span>
                          <span className="text-silver text-sm">
                            {d.cantidad} × ${Number(d.precio_unitario).toLocaleString('es-CO')}
                          </span>
                        </div>
                      ))}

                      {pedido.estado === 'pendiente' && (
                        <button
                          onClick={() => handleCancelar(pedido.id)}
                          className="mt-4 bg-rose-primary hover:bg-rose-mid text-white text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_0_12px_rgba(188,67,104,0.4)]"
                        >
                          Cancelar Pedido
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
