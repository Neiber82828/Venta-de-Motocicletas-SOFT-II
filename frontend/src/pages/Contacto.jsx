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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    setTimeout(() => setEnviado(false), 5000);
  };

  const inputClass =
    'w-full bg-brand-700 border border-brand-500 text-snow placeholder-silver rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-rose-primary focus:ring-1 focus:ring-rose-primary transition';

  const labelClass = 'block text-xs font-semibold text-silver uppercase mb-1 tracking-wide';

  const info = [
    { titulo: 'Dirección', contenido: 'Calle Principal 123\n28000 Madrid, España' },
    { titulo: 'Teléfono', contenido: '+34 (91) 123-4567\nLunes a Viernes 9AM – 6PM' },
    { titulo: 'Email', contenido: 'info@yamaha.es\nventas@yamaha.es' },
  ];

  return (
    <div className="min-h-screen bg-brand-800 py-12 page-enter">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-snow mb-2 text-center">Contacto</h1>
        <p className="text-silver text-center mb-12">Estamos aquí para ayudarte</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Información */}
          <div className="space-y-5 slide-left">
            <h2 className="text-2xl font-bold text-snow mb-6">Información de Contacto</h2>

            {info.map((item) => (
              <div
                key={item.titulo}
                className="bg-brand-700 border border-brand-500 hover:border-rose-primary p-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(188,67,104,0.2)]"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-rose-mid mb-2">{item.titulo}</h3>
                <p className="text-silver text-sm whitespace-pre-line">{item.contenido}</p>
              </div>
            ))}

            <div className="bg-brand-700 border border-brand-500 hover:border-rose-primary p-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(188,67,104,0.2)]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-mid mb-3">Redes Sociales</h3>
              <div className="flex gap-4 text-2xl">
                <span className="cursor-pointer hover:scale-125 transition-transform duration-200">📘</span>
                <span className="cursor-pointer hover:scale-125 transition-transform duration-200">𝕏</span>
                <span className="cursor-pointer hover:scale-125 transition-transform duration-200">📷</span>
                <span className="cursor-pointer hover:scale-125 transition-transform duration-200">▶️</span>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div>
            <h2 className="text-2xl font-bold text-snow mb-6">Envíanos un Mensaje</h2>

            {enviado && (
              <div className="mb-6 p-4 bg-green-900/40 border border-green-600 text-green-300 rounded-xl fade-in">
                ✓ ¡Mensaje enviado! Nos pondremos en contacto pronto.
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-brand-700 border border-brand-500 p-8 rounded-xl space-y-5"
            >
              <div>
                <label className={labelClass}>Nombre</label>
                <input type="text" name="nombre" value={formData.nombre}
                  onChange={handleChange} required className={inputClass} placeholder="Tu nombre" />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange} required className={inputClass} placeholder="tu@email.com" />
              </div>

              <div>
                <label className={labelClass}>Teléfono</label>
                <input type="tel" name="telefono" value={formData.telefono}
                  onChange={handleChange} className={inputClass} placeholder="+34 123 456 789" />
              </div>

              <div>
                <label className={labelClass}>Asunto</label>
                <input type="text" name="asunto" value={formData.asunto}
                  onChange={handleChange} required className={inputClass} placeholder="¿En qué podemos ayudarte?" />
              </div>

              <div>
                <label className={labelClass}>Mensaje</label>
                <textarea name="mensaje" value={formData.mensaje} onChange={handleChange}
                  required rows="5" className={inputClass} placeholder="Escribe tu mensaje aquí..." />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-primary hover:bg-rose-mid text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(188,67,104,0.5)]"
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
