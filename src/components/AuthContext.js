import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getCurrentUser,
  login as authLogin,
  logout as authLogout,
  register as authRegister,
  updateUser as authUpdateUser,
  subscribeAuth
} from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    // Subscribe to auth changes and update user
    const unsub = subscribeAuth(setUser);
    return () => { unsub(); };
  }, []);

  const login = (email, password) => authLogin(email, password);
  const logout = () => authLogout();
  const register = (name, email, password) => authRegister(name, email, password);
  const updateUser = (id, name, email) => authUpdateUser(id, name, email);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
