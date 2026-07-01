// ============================================
// Lokatun — Routeur principal
// ============================================
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import ListeAnnonces from './pages/annonces/ListeAnnonces';
import DetailAnnonce from './pages/annonces/DetailAnnonce';
import CreerAnnonce from './pages/annonces/CreerAnnonce';

// Route protégée — redirige vers /login si non connecté
const RouteProtegee = ({ children }) => {
  const { utilisateur, chargement } = useAuth();
  if (chargement) return <div className="text-center mt-20">Chargement...</div>;
  return utilisateur ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Annonces publiques */}
          <Route path="/annonces" element={<ListeAnnonces />} />

          {/* ⚠️ /creer AVANT /:id */}
          <Route
            path="/annonces/creer"
            element={
              <RouteProtegee>
                <CreerAnnonce />
              </RouteProtegee>
            }
          />

          {/* Détail annonce */}
          <Route path="/annonces/:id" element={<DetailAnnonce />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <RouteProtegee>
                <Dashboard />
              </RouteProtegee>
            }
          />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/annonces" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;