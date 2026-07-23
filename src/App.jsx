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
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUtilisateurs from './pages/admin/AdminUtilisateurs';
import AdminAnnonces from './pages/admin/AdminAnnonces';
import AdminLitiges from './pages/admin/AdminLitiges';
import Paiement from './pages/paiement/Paiement';
import PaiementCommission from './pages/paiement/PaiementCommission';
import PaiementSucces from './pages/paiement/PaiementSucces';
import PaiementEchec from './pages/paiement/PaiementEchec'; 
import NotFound from './pages/NotFound';

const RouteProtegee = ({ children }) => {
  const { utilisateur, chargement } = useAuth();
  if (chargement) return <div className="text-center mt-20">Chargement...</div>;
  return utilisateur ? children : <Navigate to="/login" />;
};

const RouteAdmin = ({ children }) => {
  const { utilisateur, chargement } = useAuth();
  if (chargement) return <div className="text-center mt-20">Chargement...</div>;
  if (!utilisateur) return <Navigate to="/login" />;
  if (utilisateur.role !== 'ADMIN') return <Navigate to="/annonces" />;
  return children;
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
          <Route
            path="/annonces/creer"
            element={<RouteProtegee><CreerAnnonce /></RouteProtegee>}
          />
          <Route path="/annonces/:id" element={<DetailAnnonce />} />

          {/* Réservations */}
          <Route
            path="/mes-reservations"
            element={<RouteProtegee><MesReservations /></RouteProtegee>}
          />
          <Route
            path="/paiement/:reservationId"
            element={<RouteProtegee><Paiement /></RouteProtegee>}
          />
          <Route
            path="/paiement-commission/:reservationId"
            element={<RouteProtegee><PaiementCommission /></RouteProtegee>}
          />
          <Route
            path="/paiement-succes/:reservationId"
            element={<RouteProtegee><PaiementSucces /></RouteProtegee>}
          />
          <Route
            path="/paiement-echec/:reservationId"
            element={<RouteProtegee><PaiementEchec /></RouteProtegee>}
          />
          <Route
            path="/reservations-recues"
            element={<RouteProtegee><ReservationsRecues /></RouteProtegee>}
          />

          {/* Litiges */}
          <Route
            path="/signaler-litige"
            element={<RouteProtegee><SignalerLitige /></RouteProtegee>}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<RouteProtegee><Dashboard /></RouteProtegee>}
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={<RouteAdmin><AdminDashboard /></RouteAdmin>}
          />
          <Route
            path="/admin/utilisateurs"
            element={<RouteAdmin><AdminUtilisateurs /></RouteAdmin>}
          />
          <Route
            path="/admin/annonces"
            element={<RouteAdmin><AdminAnnonces /></RouteAdmin>}
          />
          <Route
            path="/admin/litiges"
            element={<RouteAdmin><AdminLitiges /></RouteAdmin>}
          />

          {/* Redirection par défaut * a la page not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;