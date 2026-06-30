// ============================================
// Lokatun — Page Dashboard (temporaire)
// ============================================
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { utilisateur, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8 text-center">

        <h1 className="text-3xl font-bold text-blue-600 mb-2">Lokatun</h1>
        <p className="text-gray-500 mb-6">Tableau de bord</p>

        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-gray-500">Connecté en tant que</p>
          <p className="font-semibold text-gray-800">
            {utilisateur?.prenom} {utilisateur?.nom}
          </p>
          <p className="text-sm text-gray-500">{utilisateur?.email}</p>
          <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
            {utilisateur?.role}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Se déconnecter
        </button>

      </div>
    </div>
  );
};

export default Dashboard;