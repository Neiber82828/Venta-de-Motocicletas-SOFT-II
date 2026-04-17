import React, { useState } from 'react';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Contacto
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Información de Contacto
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-600 mb-2">Dirección</h3>
                <p className="text-gray-600">
                  Calle Principal 123<br />
                  28000 Madrid, España
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-600 mb-2">Teléfono</h3>
                <p className="text-gray-600">
                  +34 (91) 123-4567<br />
                  Horario: Lunes a Viernes 9AM - 6PM
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-600 mb-2">Email</h3>
                <p className="text-gray-600">
                  info@yamaha.es<br />
                  ventas@yamaha.es
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-600 mb-2">Redes Sociales</h3>
                <p className="text-2xl space-x-4">
                  <span className="cursor-pointer hover:text-blue-600 transition">📘</span>
                  <span className="cursor-pointer hover:text-blue-400 transition">𝕏</span>
                  <span className="cursor-pointer hover:text-pink-600 transition">📷</span>
                  <span className="cursor-pointer hover:text-red-600 transition">▶️</span>
                </p>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Envíanos un Mensaje
            </h2>

            {enviado && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                ✓ ¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                  placeholder="+34 123 456 789"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Asunto</label>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Mensaje</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
