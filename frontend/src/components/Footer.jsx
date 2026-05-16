import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Yamaha Oficial</h3>
            <p className="text-gray-400">
              Motos de alta calidad y rendimiento para todo tipo de conductor.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="text-gray-400 space-y-2">
              <li><Link to="/" className="hover:text-white transition">Inicio</Link></li>
              <li><Link to="/productos" className="hover:text-white transition">Productos</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <p className="text-gray-400">Email: info@yamaha.com</p>
            <p className="text-gray-400">Tel: +34 123 456 789</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Yamaha. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
