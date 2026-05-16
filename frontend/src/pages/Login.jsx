import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import YamahaLogo from '../images/yamaha-logo.png';

function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [modo, setModo] = useState('login');
  const [form, setForm] = useState({
    username: '', password: '', first_name: '', apellido: '',
    email: '', numero_documento: '', telefono: '',
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      if (modo === 'login') {
        await login(form.username, form.password);
      } else {
        await register(form);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al procesar. Verifica tus datos.');
    } finally {
      setCargando(false);
    }
  };

  const inputClass =
    'w-full bg-brand-800 border border-brand-500 text-snow placeholder-silver rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-primary focus:ring-1 focus:ring-rose-primary transition';
  const labelClass = 'block text-xs font-semibold text-silver uppercase tracking-wide mb-1';

  return (
    <div className="min-h-screen bg-brand-800 flex items-center justify-center px-4 page-enter">
      <div className="bg-brand-700 border border-brand-500 rounded-2xl shadow-2xl w-full max-w-md p-8">

        {/* Logo y título */}
        <div className="text-center mb-8">
          <img src={YamahaLogo} alt="Yamaha" className="h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-snow">
            {modo === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="text-silver text-sm mt-1">
            {modo === 'login' ? 'Bienvenido de vuelta' : 'Únete a nosotros'}
          </p>
        </div>

        {error && (
          <div className="bg-rose-900/40 border border-rose-700 text-rose-300 px-4 py-3 rounded-lg mb-4 text-sm fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {modo === 'register' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Nombre</label>
                  <input name="first_name" value={form.first_name} onChange={handleChange}
                    required placeholder="Tu nombre" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Apellido</label>
                  <input name="apellido" value={form.apellido} onChange={handleChange}
                    required placeholder="Tu apellido" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  required placeholder="tu@email.com" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Número de documento</label>
                <input name="numero_documento" value={form.numero_documento} onChange={handleChange}
                  required placeholder="Cédula o pasaporte" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Teléfono</label>
                <input name="telefono" value={form.telefono} onChange={handleChange}
                  placeholder="+57 300 000 0000" className={inputClass} />
              </div>
            </>
          )}

          <div>
            <label className={labelClass}>Usuario</label>
            <input name="username" value={form.username} onChange={handleChange}
              required placeholder="Tu usuario" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange}
              required placeholder="••••••••" className={inputClass} />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-rose-primary hover:bg-rose-mid text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 hover:shadow-[0_0_20px_rgba(188,67,104,0.5)] mt-2"
          >
            {cargando ? 'Cargando...' : modo === 'login' ? 'Ingresar' : 'Registrarse'}
          </button>
        </form>

        <p className="text-center text-sm text-silver mt-6">
          {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => { setModo(modo === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-rose-light hover:text-rose-mid font-semibold transition"
          >
            {modo === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
