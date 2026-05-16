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
    <nav className="bg-brand-500 text-snow shadow-lg border-b-2 border-rose-primary/40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={YamahaLogo} alt="Yamaha Logo" className="h-10 w-auto" />
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-snow hover:text-rose-light transition font-medium">Inicio</Link>
            <Link to="/productos" className="text-snow hover:text-rose-light transition font-medium">Productos</Link>
            <Link to="/contacto" className="text-snow hover:text-rose-light transition font-medium">Contacto</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuAbierto(!menuAbierto)}
                  className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 border border-brand-500 px-4 py-2 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-rose-primary rounded-full flex items-center justify-center font-bold text-sm text-white">
                    {user.first_name?.[0]?.toUpperCase() ?? user.username[0].toUpperCase()}
                  </div>
                  <span className="text-sm text-snow">{user.first_name || user.username}</span>
                  <span className="text-xs text-silver">▾</span>
                </button>

                {menuAbierto && (
                  <div className="absolute right-0 mt-2 w-48 bg-brand-600 border border-brand-500 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-brand-500">
                      <p className="text-sm font-semibold text-snow">{user.first_name || user.username}</p>
                      <p className="text-xs text-silver capitalize">{user.rol}</p>
                    </div>
                    <Link
                      to={linkPerfil}
                      onClick={() => setMenuAbierto(false)}
                      className="block px-4 py-2 text-sm text-silver hover:bg-brand-700 hover:text-snow transition"
                    >
                      {user.rol === 'administrador' ? 'Panel Admin' : user.rol === 'vendedor' ? 'Panel Vendedor' : 'Mi Perfil'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-rose-light hover:bg-brand-700 transition"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-rose-primary hover:bg-rose-mid px-6 py-2 rounded-lg font-bold text-white transition-all duration-300 shadow-[0_0_16px_rgba(188,67,104,0.5)] hover:shadow-[0_0_24px_rgba(188,67,104,0.7)]"
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
