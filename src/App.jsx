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
import MesReservations from './pages/reservations/MesReservations';
import ReservationsRecues from './pages/reservations/ReservationsRecues';
import SignalerLitige from './pages/litiges/SignalerLitige';

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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/annonces" element={<ListeAnnonces />} />
          <Route
            path="/annonces/creer"
            element={<RouteProtegee><CreerAnnonce /></RouteProtegee>}
          />
          <Route path="/annonces/:id" element={<DetailAnnonce />} />

          <Route
            path="/mes-reservations"
            element={<RouteProtegee><MesReservations /></RouteProtegee>}
          />
          <Route
            path="/reservations-recues"
            element={<RouteProtegee><ReservationsRecues /></RouteProtegee>}
          />
          <Route
            path="/signaler-litige"
            element={<RouteProtegee><SignalerLitige /></RouteProtegee>}
          />
          <Route
            path="/dashboard"
            element={<RouteProtegee><Dashboard /></RouteProtegee>}
          />

          <Route path="*" element={<Navigate to="/annonces" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;