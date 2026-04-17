import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex items-center justify-between">
      <span className="text-blue-500 font-bold text-xl">🏍️ YAMAHA</span>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">Inicio</Link>
        <Link to="/catalogo" className="hover:text-blue-400">Productos</Link>
        <Link to="/pedidos" className="hover:text-blue-400">Mis Pedidos</Link>
      </div>
    </nav>
  )
}