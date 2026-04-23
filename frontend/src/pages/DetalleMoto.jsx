import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoto } from '../services/motoService';
import { createPedido, createDetalle } from '../services/pedidoService';
import { getVendedores } from '../services/vendedorService';
import { useAuth } from '../context/AuthContext';

const ESTADO_COLOR = {
  disponible: 'bg-green-100 text-green-800',
  reservada: 'bg-yellow-100 text-yellow-800',
  vendida: 'bg-red-100 text-red-800',
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

  if (cargando) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Cargando...</p></div>;
  if (!moto) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <button onClick={() => navigate('/productos')} className="text-blue-600 hover:underline mb-6 inline-block">
          ← Volver al catálogo
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-700 to-blue-950 flex items-center justify-center p-16">
              <span className="text-9xl">🏍️</span>
            </div>

            <div className="p-8 flex flex-col justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">YAMAHA</p>
                <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-2">{moto.nombre}</h1>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${ESTADO_COLOR[moto.estado]}`}>
                  {moto.estado?.toUpperCase()}
                </span>
                <p className="text-4xl font-bold text-blue-700 mb-2">
                  ${Number(moto.precio_lista).toLocaleString('es-CO')}
                </p>
                <p className="text-sm text-gray-400 mb-6">*Precio con IVA incluido, sujeto a modificaciones</p>

                {mensaje && (
                  <div className={`mb-4 p-3 rounded text-sm ${mensaje.includes('exitosamente') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {mensaje}
                  </div>
                )}

                <button
                  onClick={handleComprar}
                  disabled={comprando || moto.estado !== 'disponible'}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg text-lg transition"
                >
                  {comprando ? 'Procesando...' : moto.estado === 'disponible' ? 'COMPRAR AHORA' : 'NO DISPONIBLE'}
                </button>
              </div>

              <p className="text-sm text-gray-400 mt-4">Stock disponible: {moto.stock} unidades</p>
            </div>
          </div>

          <div className="border-t border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Especificaciones Técnicas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'CILINDRAJE', value: `${moto.cilindraje} cc` },
                { label: 'TIPO', value: moto.tipo_moto },
                { label: 'AÑO', value: moto.anio },
                { label: 'COMBUSTIBLE', value: moto.tipo_combustible },
                { label: 'POTENCIA MÁXIMA', value: moto.potencia_maxima || '-' },
                { label: 'TORQUE MÁXIMO', value: moto.torque_maximo || '-' },
                { label: 'PESO', value: moto.peso || '-' },
                { label: 'TIPO MOTOR', value: moto.tipo_motor || '-' },
                { label: 'VELOCIDADES', value: moto.velocidades ? `${moto.velocidades} vel.` : '-' },
                { label: 'COLOR', value: moto.color || '-' },
              ].map((spec) => (
                <div key={spec.label} className="bg-blue-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-blue-600 uppercase">{spec.label}</p>
                  <p className="text-gray-900 font-medium mt-1">{spec.value}</p>
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
