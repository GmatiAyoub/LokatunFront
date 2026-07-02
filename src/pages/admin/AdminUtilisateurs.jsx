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

  if (chargement) return <div className="text-center mt-20 text-gray-500">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-700 px-6 py-4 flex justify-between items-center">
        <Link to="/admin" className="text-white font-bold text-xl">← Admin</Link>
        <h2 className="text-white font-semibold">Gestion des utilisateurs</h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">ID</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Nom</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Email</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Téléphone</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Rôle</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Statut</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Note</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {utilisateurs.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-400">#{u.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {u.prenom} {u.nom}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{u.email}</td>
                  <td className="px-6 py-4 text-gray-500">{u.telephone}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
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