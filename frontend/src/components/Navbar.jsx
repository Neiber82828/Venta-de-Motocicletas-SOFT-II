import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import YamahaLogo from '../images/yamaha-logo.png';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuAbierto(false);
    navigate('/');
  };

  const linkPerfil =
    user?.rol === 'administrador' ? '/admin' :
    user?.rol === 'vendedor' ? '/vendedor' :
    '/perfil';

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={YamahaLogo} alt="Yamaha Logo" className="h-10 w-auto" />
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-200 transition">Inicio</Link>
            <Link to="/productos" className="hover:text-blue-200 transition">Productos</Link>
            <Link to="/contacto" className="hover:text-blue-200 transition">Contacto</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuAbierto(!menuAbierto)}
                  className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {user.first_name?.[0]?.toUpperCase() ?? user.username[0].toUpperCase()}
                  </div>
                  <span className="text-sm">{user.first_name || user.username}</span>
                  <span className="text-xs">▾</span>
                </button>

                {menuAbierto && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.first_name || user.username}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.rol}</p>
                    </div>
                    <Link
                      to={linkPerfil}
                      onClick={() => setMenuAbierto(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {user.rol === 'administrador' ? 'Panel Admin' : user.rol === 'vendedor' ? 'Panel Vendedor' : 'Mi Perfil'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold transition"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
