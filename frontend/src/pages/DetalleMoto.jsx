import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoto } from '../services/motoService';
import { createPedido, createDetalle } from '../services/pedidoService';
import { getVendedores } from '../services/vendedorService';
import { useAuth } from '../context/AuthContext';
import { getMotoImage } from '../utils/motoImages';

const ESTADO_COLOR = {
  disponible: 'bg-green-900/40 text-green-300 border border-green-700',
  reservada:  'bg-yellow-900/40 text-yellow-300 border border-yellow-700',
  vendida:    'bg-rose-900/40 text-rose-300 border border-rose-700',
};

function DetalleMoto() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [moto, setMoto] = useState(null);
  const [vendedores, setVendedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [comprando, setComprando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    Promise.all([
      getMoto(id),
      user ? getVendedores() : Promise.resolve([]),
    ])
      .then(([motoData, vendedoresData]) => {
        setMoto(motoData);
        setVendedores(vendedoresData);
      })
      .catch(() => navigate('/productos'))
      .finally(() => setCargando(false));
  }, [id]);

  const handleComprar = async () => {
    if (!user) { navigate('/login'); return; }
    if (user.rol !== 'cliente') { setMensaje('Solo los clientes pueden realizar pedidos.'); return; }
    if (!vendedores.length) { setMensaje('No hay vendedores disponibles en este momento.'); return; }
    setComprando(true);
    try {
      const pedido = await createPedido({
        id_cliente: user.perfil_id,
        id_vendedor: vendedores[0].id,
        monto_total: moto.precio_lista,
        cantidad: 1,
      });
      await createDetalle({
        id_pedido: pedido.id,
        id_motocicleta: moto.id,
        precio_unitario: moto.precio_lista,
        cantidad: 1,
      });
      setMensaje('¡Pedido creado exitosamente! Revisa tu perfil para ver el estado.');
    } catch {
      setMensaje('Error al crear el pedido. Intenta nuevamente.');
    } finally {
      setComprando(false);
    }
  };

  if (cargando) return (
    <div className="min-h-screen bg-brand-800 flex items-center justify-center">
      <p className="text-silver">Cargando...</p>
    </div>
  );
  if (!moto) return null;

  return (
    <div className="min-h-screen bg-brand-800 py-10 page-enter">
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => navigate('/productos')}
          className="text-rose-mid hover:text-rose-light transition mb-6 inline-flex items-center gap-1 text-sm font-medium"
        >
          ← Volver al catálogo
        </button>

        <div className="bg-brand-700 border border-brand-500 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Imagen */}
            <div className="bg-gradient-to-br from-rose-primary/20 to-brand-900 flex items-center justify-center p-6 min-h-96">
              {getMotoImage(moto.nombre)
                ? <img src={getMotoImage(moto.nombre)} alt={moto.nombre}
                    className="w-full h-80 object-contain" />
                : <span className="text-9xl drop-shadow-2xl">🏍️</span>
              }
            </div>

            {/* Info y compra */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-rose-mid uppercase tracking-widest">YAMAHA</p>
                <h1 className="text-3xl font-bold text-snow mt-1 mb-3">{moto.nombre}</h1>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${ESTADO_COLOR[moto.estado]}`}>
                  {moto.estado?.toUpperCase()}
                </span>
                <p className="text-4xl font-bold text-rose-light mb-1">
                  ${Number(moto.precio_lista).toLocaleString('es-CO')}
                </p>
                <p className="text-xs text-silver mb-6">*Precio con IVA incluido, sujeto a modificaciones</p>

                {mensaje && (
                  <div className={`mb-4 p-3 rounded-lg text-sm fade-in ${mensaje.includes('exitosamente') ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-rose-900/40 text-rose-300 border border-rose-700'}`}>
                    {mensaje}
                  </div>
                )}

                <button
                  onClick={handleComprar}
                  disabled={comprando || moto.estado !== 'disponible'}
                  className="w-full bg-rose-primary hover:bg-rose-mid disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-lg transition-all duration-300 hover:shadow-[0_0_24px_rgba(188,67,104,0.6)]"
                >
                  {comprando ? 'Procesando...' : moto.estado === 'disponible' ? 'COMPRAR AHORA' : 'NO DISPONIBLE'}
                </button>
              </div>

              <p className="text-sm text-silver mt-4">Stock disponible: {moto.stock} unidades</p>
            </div>
          </div>

          {/* Especificaciones */}
          <div className="border-t border-brand-600 p-8">
            <h2 className="text-xl font-bold text-snow mb-6">Especificaciones Técnicas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'CILINDRAJE',     value: `${moto.cilindraje} cc` },
                { label: 'TIPO',           value: moto.tipo_moto },
                { label: 'AÑO',            value: moto.anio },
                { label: 'COMBUSTIBLE',    value: moto.tipo_combustible },
                { label: 'POT. MÁXIMA',    value: moto.potencia_maxima  || '-' },
                { label: 'TORQUE MÁXIMO',  value: moto.torque_maximo    || '-' },
                { label: 'PESO',           value: moto.peso             || '-' },
                { label: 'TIPO MOTOR',     value: moto.tipo_motor       || '-' },
                { label: 'VELOCIDADES',    value: moto.velocidades ? `${moto.velocidades} vel.` : '-' },
                { label: 'COLOR',          value: moto.color            || '-' },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="card-enter bg-brand-800 border border-brand-500 hover:border-rose-primary/40 rounded-xl p-4 transition-all duration-200"
                >
                  <p className="text-xs font-bold text-rose-mid uppercase tracking-wider">{spec.label}</p>
                  <p className="text-snow font-medium mt-1 capitalize">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleMoto;
