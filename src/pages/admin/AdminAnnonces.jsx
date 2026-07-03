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
          <h2 className="text-white font-semibold">Gestion des annonces</h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-secondary-500">Annonces</h2>
          <span className="badge">{annonces.length} total</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {annonces.length === 0 ? (
            <div className="card text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">📭</p>
              <p>Aucune annonce trouvée</p>
            </div>
          ) : (
            annonces.map((a) => (
              <div key={a.id} className="card p-6 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  {a.photos?.[0] ? (
                    <img
                      src={a.photos[0].url}
                      alt={a.titre}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                      📷
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-secondary-500">{a.titre}</h3>
                    <p className="text-gray-400 text-sm">{a.categorie} — {a.localisation}</p>
                    <p className="text-gray-400 text-sm">
                      Par : {a.proprietaire.prenom} {a.proprietaire.nom}
                    </p>
                    <p className="text-primary-500 font-semibold text-sm">{a.prixParJour} DT/jour</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statutColors[a.statut]}`}>
                    {a.statut}
                  </span>
                  {a.statut !== 'SUPPRIMEE' && (
                    <button
                      onClick={() => handleSupprimer(a.id)}
                      className="text-xs bg-red-100 text-red-700 px-3 py-2 rounded-xl hover:bg-red-200 transition font-medium"
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