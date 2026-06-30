// ============================================
// Lokatun — Contexte Auth global
// ============================================
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [utilisateur, setUtilisateur] = useState(null);
  const [chargement, setChargement] = useState(true);

  // Vérifier si un token existe au démarrage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then((res) => setUtilisateur(res.data.utilisateur))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setChargement(false));
    } else {
      setChargement(false);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    setUtilisateur(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUtilisateur(null);
  };

  return (
    <AuthContext.Provider value={{ utilisateur, chargement, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);