import React, { createContext, useContext, useState } from 'react';
import { login as loginSvc, logout as logoutSvc, register as registerSvc, getStoredUser } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const login = async (username, password) => {
    const data = await loginSvc(username, password);
    setUser(data.user);
    return data;
  };

  const register = async (formData) => {
    const data = await registerSvc(formData);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    logoutSvc();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
