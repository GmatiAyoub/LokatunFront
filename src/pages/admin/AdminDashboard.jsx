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
    totalLitiges: 0,
    litgesNouveaux: 0,
    commissionsTotal: 0,
  });
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const charger = async () => {
      try {
        const [statsRes, litiges] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/litiges'),
        ]);

        const litgesNouveaux = litiges.data.litiges.filter(
          (l) => l.statut === 'NOUVEAU'
        ).length;

        setStats({
          ...statsRes.data.stats,
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

  if (chargement) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Chargement...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header Admin */}
      <div className="bg-secondary-500 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <span className="text-white font-bold text-xl">Lokatun</span>
              <span className="text-primary-300 text-xs ml-2">Admin</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-blue-200 text-sm">{utilisateur?.prenom} {utilisateur?.nom}</span>
            <button
              onClick={handleLogout}
              className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-2 rounded-xl transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        <h2 className="text-2xl font-bold text-secondary-500 mb-6">Tableau de bord</h2>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="card p-6 text-center">
            <p className="text-3xl font-bold text-secondary-500">{stats.totalUtilisateurs}</p>
            <p className="text-gray-500 text-xs mt-1">Utilisateurs</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-3xl font-bold text-primary-500">{stats.totalAnnonces}</p>
            <p className="text-gray-500 text-xs mt-1">Annonces</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-3xl font-bold text-secondary-500">{stats.totalReservations}</p>
            <p className="text-gray-500 text-xs mt-1">Réservations</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-3xl font-bold text-red-500">{stats.litgesNouveaux}</p>
            <p className="text-gray-500 text-xs mt-1">Litiges nouveaux</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-3xl font-bold text-green-600">{stats.commissionsTotal}</p>
            <p className="text-gray-500 text-xs mt-1">Commissions DT</p>
          </div>
        </div>

        {/* Navigation Admin */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/utilisateurs"
            className="card p-6 hover:border-2 hover:border-secondary-500 transition text-center group"
          >
            <div className="w-14 h-14 bg-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition">
              <span className="text-2xl">👥</span>
            </div>
            <p className="font-bold text-secondary-500">Utilisateurs</p>
            <p className="text-gray-400 text-sm mt-1">Gérer les comptes</p>
            <p className="text-primary-500 font-bold text-lg mt-2">{stats.totalUtilisateurs}</p>
          </Link>

          <Link
            to="/admin/annonces"
            className="card p-6 hover:border-2 hover:border-secondary-500 transition text-center group"
          >
            <div className="w-14 h-14 bg-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition">
              <span className="text-2xl">📋</span>
            </div>
            <p className="font-bold text-secondary-500">Annonces</p>
            <p className="text-gray-400 text-sm mt-1">Modérer les annonces</p>
            <p className="text-primary-500 font-bold text-lg mt-2">{stats.totalAnnonces}</p>
          </Link>

          <Link
            to="/admin/litiges"
            className="card p-6 hover:border-2 hover:border-secondary-500 transition text-center group"
          >
            <div className="w-14 h-14 bg-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="font-bold text-secondary-500">Litiges</p>
            <p className="text-gray-400 text-sm mt-1">Traiter les signalements</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <p className="text-primary-500 font-bold text-lg">{stats.totalLitiges}</p>
              {stats.litgesNouveaux > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.litgesNouveaux} nouveau(x)
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Lien retour */}
        <div className="mt-6 text-center">
          <Link to="/annonces" className="text-gray-400 text-sm hover:text-secondary-500 transition">
            ← Retour à la plateforme
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;