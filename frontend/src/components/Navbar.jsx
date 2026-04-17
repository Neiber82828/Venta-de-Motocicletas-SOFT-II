import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import YamahaLogo from '../images/yamaha-logo.png';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', searchTerm);
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={YamahaLogo} 
              alt="Yamaha Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Menu */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-200 transition">
              Inicio
            </Link>
            <Link to="/productos" className="hover:text-blue-200 transition">
              Productos
            </Link>
            <Link to="/contacto" className="hover:text-blue-200 transition">
              Contacto
            </Link>
          </div>

          {/* Buscador */}
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-l text-black focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-r transition"
            >
              🔍
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
