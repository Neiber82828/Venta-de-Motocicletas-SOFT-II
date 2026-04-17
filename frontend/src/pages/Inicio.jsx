export default function Inicio() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">Motos YAMAHA</h1>
      <p className="text-gray-400 mb-8">Durabilidad, estilo y economía</p>
      <a href="/catalogo"
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold">
        COMPRA AHORA
      </a>
    </div>
  )
}