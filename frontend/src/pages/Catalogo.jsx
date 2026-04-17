import { useEffect, useState } from 'react'
import { getMotocicletas } from '../services/api'

export default function Catalogo() {
  const [motos, setMotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMotocicletas()
      .then(res => setMotos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-10">Cargando motos...</p>

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Catálogo de Motocicletas</h2>
      {motos.length === 0 ? (
        <p className="text-gray-500">No hay motocicletas registradas aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {motos.map(moto => (
            <div key={moto.id} className="border rounded-lg p-4 shadow">
              <h3 className="font-bold text-lg">{moto.tipo_moto} {moto.año}</h3>
              <p className="text-gray-600">Cilindraje: {moto.cilindraje} cc</p>
              <p className="text-gray-600">Combustible: {moto.tipo_combustible}</p>
              <p className="text-blue-600 font-bold mt-2">
                ${Number(moto.precio_lista).toLocaleString()}
              </p>
              <p className={`text-sm mt-1 ${moto.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {moto.stock > 0 ? `Stock: ${moto.stock}` : 'Sin stock'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}