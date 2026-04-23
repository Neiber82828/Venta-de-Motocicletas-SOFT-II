import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleMoto from './pages/DetalleMoto';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Admin from './pages/Admin';
import Vendedor from './pages/Vendedor';
import './styles/index.css';

function RutaProtegida({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.rol)) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleMoto />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={
          <RutaProtegida roles={['cliente']}>
            <Perfil />
          </RutaProtegida>
        } />
        <Route path="/vendedor" element={
          <RutaProtegida roles={['vendedor']}>
            <Vendedor />
          </RutaProtegida>
        } />
        <Route path="/admin" element={
          <RutaProtegida roles={['administrador']}>
            <Admin />
          </RutaProtegida>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
