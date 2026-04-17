import { useEffect, useState } from 'react'
import { getReporteAdmin } from '../services/api'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'

const COLORS = ['#22c55e', '#ef4444', '#eab308']

export default function Admin() {
  const [reporte, setReporte] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const cargarReporte = () => {
    setLoading(true)
    getReporteAdmin(fechaInicio, fechaFin)
      .then(res => setReporte(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { cargarReporte() }, [])

  if (loading) return <p className="text-center mt-10 text-gray-500">Cargando reporte...</p>

  const dataPie = [
    { name: 'Confirmados', value: reporte.confirmados },
    { name: 'Cancelados', value: reporte.cancelados },
    { name: 'Pendientes', value: reporte.pendientes },
  ]

  const dataBar = [
    { name: 'Confirmados', cantidad: reporte.confirmados },
    { name: 'Cancelados', cantidad: reporte.cancelados },
    { name: 'Pendientes', cantidad: reporte.pendientes },
  ]

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="bg-white rounded-lg p-4 flex justify-between items-center mb-4 shadow">
        <h1 className="text-xl font-bold">Panel Administrador</h1>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg p-4 flex flex-wrap gap-4 items-end mb-4 shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
          <input type="date" value={fechaInicio}
            onChange={e => setFechaInicio(e.target.value)}
            className="border rounded px-3 py-1 mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
          <input type="date" value={fechaFin}
            onChange={e => setFechaFin(e.target.value)}
            className="border rounded px-3 py-1 mt-1" />
        </div>
        <button onClick={cargarReporte}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          BUSCAR
        </button>
        <button onClick={cargarReporte}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          GENERAR REPORTE
        </button>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Total Pedidos</p>
          <p className="text-3xl font-bold text-blue-600">{reporte.total_pedidos}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Confirmados</p>
          <p className="text-3xl font-bold text-green-600">{reporte.confirmados}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Cancelados</p>
          <p className="text-3xl font-bold text-red-600">{reporte.cancelados}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Ingresos Totales</p>
          <p className="text-2xl font-bold text-green-700">
            ${Number(reporte.ingresos_totales).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Motos destacadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500 text-sm mb-1">🏆 Moto más vendida</p>
          <p className="font-bold text-lg text-blue-700">{reporte.moto_mas_vendida}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500 text-sm mb-1">📉 Moto menos vendida</p>
          <p className="font-bold text-lg text-red-600">{reporte.moto_menos_vendida}</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* Gráfica de barras */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-center mb-4">Pedidos por Estado</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataBar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#3b82f6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de torta */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-center mb-4">Distribución de Pedidos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {dataPie.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historial de pedidos */}
      <div className="bg-black text-white text-center py-2 rounded-t font-bold">
        HISTORIAL DE PEDIDOS
      </div>
      <div className="bg-white rounded-b shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 border">ID PEDIDO</th>
              <th className="p-2 border">CLIENTE</th>
              <th className="p-2 border">CANTIDAD</th>
              <th className="p-2 border">ESTADO</th>
              <th className="p-2 border">FECHA</th>
            </tr>
          </thead>
          <tbody>
            {reporte.historial.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-400">
                  No hay pedidos en este rango de fechas
                </td>
              </tr>
            ) : (
              reporte.historial.map(p => (
                <tr key={p.id} className="text-center border-b hover:bg-gray-50">
                  <td className="p-2 border">{String(p.id).padStart(3, '0')}</td>
                  <td className="p-2 border">{p.cliente}</td>
                  <td className="p-2 border">{p.cantidad}</td>
                  <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-white text-xs font-bold
                      ${p.estado === 'confirmado' ? 'bg-green-500' :
                        p.estado === 'cancelado' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                      {p.estado}
                    </span>
                  </td>
                  <td className="p-2 border">{p.fecha}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}