// ============================================
// Lokatun — Page Dashboard
// ============================================
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const { utilisateur, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <Link to="/annonces" className="text-blue-600 font-bold text-xl">Lokatun</Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Profil */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <p className="text-sm text-gray-500">Connecté en tant que</p>
          <p className="font-semibold text-gray-800 text-lg">
            {utilisateur?.prenom} {utilisateur?.nom}
          </p>
          <p className="text-sm text-gray-500">{utilisateur?.email}</p>
          <p className="text-sm text-gray-500">{utilisateur?.telephone}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
              {utilisateur?.role}
            </span>
            <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full font-medium">
              ⭐ {utilisateur?.noteMoyenne?.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 gap-3">
          <Link
            to="/annonces/creer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition text-center"
          >
            + Publier une annonce
          </Link>
          <Link
            to="/mes-reservations"
            className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl transition text-center border border-gray-200 shadow-sm"
          >
            Mes réservations
          </Link>
          <Link
            to="/reservations-recues"
            className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl transition text-center border border-gray-200 shadow-sm"
          >
            Réservations reçues
          </Link>
          <Link
            to="/signaler-litige"
            className="bg-white hover:bg-gray-50 text-orange-600 font-semibold py-3 px-6 rounded-xl transition text-center border border-orange-200 shadow-sm"
          >
            ⚠️ Signaler un problème
          </Link>
          <Link
            to="/annonces"
            className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl transition text-center border border-gray-200 shadow-sm"
          >
            Parcourir les annonces
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Se déconnecter
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;