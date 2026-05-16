import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-brand-900 text-snow py-12 mt-16 border-t border-brand-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-snow">Yamaha Oficial</h3>
            <p className="text-silver text-sm leading-relaxed">
              Motos de alta calidad y rendimiento para todo tipo de conductor.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-snow">Enlaces</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-silver hover:text-rose-light transition text-sm">Inicio</Link></li>
              <li><Link to="/productos" className="text-silver hover:text-rose-light transition text-sm">Productos</Link></li>
              <li><Link to="/contacto" className="text-silver hover:text-rose-light transition text-sm">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-snow">Contacto</h3>
            <p className="text-silver text-sm">Email: info@yamaha.com</p>
            <p className="text-silver text-sm">Tel: +34 123 456 789</p>
          </div>
        </div>
        <div className="border-t border-brand-600 pt-8 text-center">
          <p className="text-silver text-sm">&copy; 2026 Yamaha. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
