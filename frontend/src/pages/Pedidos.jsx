import { useEffect, useState } from 'react'
import { getPedidos } from '../services/api'

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    getPedidos()
      .then(res => setPedidos(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Mis Pedidos</h2>
      {pedidos.length === 0 ? (
        <p className="text-gray-500">No hay pedidos registrados.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(p => (
              <tr key={p.id}>
                <td className="border p-2 text-center">{p.id}</td>
                <td className="border p-2 text-center">{p.fecha_pedido}</td>
                <td className="border p-2 text-center">${Number(p.monto_total).toLocaleString()}</td>
                <td className="border p-2 text-center">{p.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}