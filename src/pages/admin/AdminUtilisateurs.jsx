// ============================================
// Lokatun — Admin Utilisateurs
// ============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [chargement, setChargement] = useState(true);

  const charger = async () => {
    try {
      const res = await api.get('/admin/utilisateurs');
      setUtilisateurs(res.data.utilisateurs);
    } catch (err) {
      console.error(err);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => { charger(); }, []);

  const handleStatut = async (id, statut) => {
    try {
      await api.put(`/admin/utilisateurs/${id}/statut`, { statut });
      charger();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  const statutColors = {
    ACTIF: 'bg-green-100 text-green-700',
    SUSPENDU: 'bg-yellow-100 text-yellow-700',
    BANNI: 'bg-red-100 text-red-700',
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

      {/* Header */}
      <div className="bg-secondary-500 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/admin" className="flex items-center gap-2 text-white hover:text-primary-300 transition">
            <span>←</span>
            <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold">Admin</span>
          </Link>
          <h2 className="text-white font-semibold">Gestion des utilisateurs</h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-secondary-500">Utilisateurs</h2>
          <span className="badge">{utilisateurs.length} total</span>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary-500 text-white">
              <tr>
                <th className="text-left px-6 py-3 font-medium">ID</th>
                <th className="text-left px-6 py-3 font-medium">Nom</th>
                <th className="text-left px-6 py-3 font-medium">Email</th>
                <th className="text-left px-6 py-3 font-medium">Téléphone</th>
                <th className="text-left px-6 py-3 font-medium">Rôle</th>
                <th className="text-left px-6 py-3 font-medium">Statut</th>
                <th className="text-left px-6 py-3 font-medium">Note</th>
                <th className="text-left px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {utilisateurs.map((u) => (
                <tr key={u.id} className="hover:bg-orange-50 transition">
                  <td className="px-6 py-4 text-gray-400">#{u.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{u.prenom[0]}</span>
                      </div>
                      <span className="font-medium text-secondary-500">
                        {u.prenom} {u.nom}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{u.email}</td>
                  <td className="px-6 py-4 text-gray-500">{u.telephone}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      u.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-secondary-50 text-secondary-500'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statutColors[u.statut]}`}>
                      {u.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-yellow-500">
                    ⭐ {u.noteMoyenne.toFixed(1)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {u.statut === 'ACTIF' && (
                        <button
                          onClick={() => handleStatut(u.id, 'SUSPENDU')}
                          className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg hover:bg-yellow-200 transition"
                        >
                          Suspendre
                        </button>
                      )}
                      {u.statut === 'SUSPENDU' && (
                        <button
                          onClick={() => handleStatut(u.id, 'ACTIF')}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 transition"
                        >
                          Réactiver
                        </button>
                      )}
                      {u.statut !== 'BANNI' && (
                        <button
                          onClick={() => handleStatut(u.id, 'BANNI')}
                          className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg hover:bg-red-200 transition"
                        >
                          Bannir
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUtilisateurs;