// ============================================
// Lokatun — Panel Admin Dashboard
// ============================================
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { utilisateur, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUtilisateurs: 0,
    totalAnnonces: 0,
    totalReservations: 0,
    totalLitiges: 0,
    litgesNouveaux: 0,
  });
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const charger = async () => {
      try {
        const [utilisateurs, annonces, litiges] = await Promise.all([
          api.get('/admin/utilisateurs'),
          api.get('/annonces'),
          api.get('/litiges'),
        ]);

        const litgesNouveaux = litiges.data.litiges.filter(
          (l) => l.statut === 'NOUVEAU'
        ).length;

        setStats({
          totalUtilisateurs: utilisateurs.data.total,
          totalAnnonces: annonces.data.total,
          totalLitiges: litiges.data.total,
          litgesNouveaux,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setChargement(false);
      }
    };
    charger();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (chargement) return <div className="text-center mt-20 text-gray-500">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header Admin */}
      <div className="bg-blue-700 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-white font-bold text-xl">Lokatun Admin</h1>
          <p className="text-blue-200 text-xs">Panel d'administration</p>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-blue-200 text-sm">{utilisateur?.prenom} {utilisateur?.nom}</span>
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded-lg transition"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">{stats.totalUtilisateurs}</p>
            <p className="text-gray-500 text-sm mt-1">Utilisateurs</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-green-600">{stats.totalAnnonces}</p>
            <p className="text-gray-500 text-sm mt-1">Annonces</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-orange-600">{stats.totalLitiges}</p>
            <p className="text-gray-500 text-sm mt-1">Litiges</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-red-600">{stats.litgesNouveaux}</p>
            <p className="text-gray-500 text-sm mt-1">Litiges nouveaux</p>
          </div>
        </div>

        {/* Navigation Admin */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/utilisateurs"
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition text-center"
          >
            <p className="text-4xl mb-3">👥</p>
            <p className="font-semibold text-gray-800">Utilisateurs</p>
            <p className="text-gray-500 text-sm mt-1">Gérer les comptes</p>
          </Link>
          <Link
            to="/admin/annonces"
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition text-center"
          >
            <p className="text-4xl mb-3">📋</p>
            <p className="font-semibold text-gray-800">Annonces</p>
            <p className="text-gray-500 text-sm mt-1">Modérer les annonces</p>
          </Link>
          <Link
            to="/admin/litiges"
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition text-center"
          >
            <p className="text-4xl mb-3">⚠️</p>
            <p className="font-semibold text-gray-800">Litiges</p>
            <p className="text-gray-500 text-sm mt-1">
              Traiter les signalements
              {stats.litgesNouveaux > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.litgesNouveaux}
                </span>
              )}
            </p>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;