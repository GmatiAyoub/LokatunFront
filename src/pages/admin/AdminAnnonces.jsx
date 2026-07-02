// ============================================
// Lokatun — Admin Annonces
// ============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [chargement, setChargement] = useState(true);

  const charger = async () => {
    try {
      const res = await api.get('/admin/annonces');
      setAnnonces(res.data.annonces);
    } catch (err) {
      console.error(err);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => { charger(); }, []);

  const handleSupprimer = async (id) => {
    if (!window.confirm('Supprimer cette annonce ?')) return;
    try {
      await api.delete(`/annonces/${id}`);
      charger();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  const statutColors = {
    ACTIVE: 'bg-green-100 text-green-700',
    INACTIVE: 'bg-yellow-100 text-yellow-700',
    SUPPRIMEE: 'bg-red-100 text-red-700',
  };

  if (chargement) return <div className="text-center mt-20 text-gray-500">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-700 px-6 py-4 flex justify-between items-center">
        <Link to="/admin" className="text-white font-bold text-xl">← Admin</Link>
        <h2 className="text-white font-semibold">Gestion des annonces</h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-4">
          {annonces.length === 0 ? (
            <div className="text-center text-gray-500 py-20">Aucune annonce trouvée</div>
          ) : (
            annonces.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  {a.photos?.[0] && (
                    <img
                      src={a.photos[0].url}
                      alt={a.titre}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-800">{a.titre}</h3>
                    <p className="text-gray-500 text-sm">{a.categorie} — {a.localisation}</p>
                    <p className="text-gray-500 text-sm">
                      Propriétaire : {a.proprietaire.prenom} {a.proprietaire.nom}
                    </p>
                    <p className="text-blue-600 text-sm font-medium">{a.prixParJour} DT/jour</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statutColors[a.statut]}`}>
                    {a.statut}
                  </span>
                  {a.statut !== 'SUPPRIMEE' && (
                    <button
                      onClick={() => handleSupprimer(a.id)}
                      className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnnonces;