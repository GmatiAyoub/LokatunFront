// ============================================
// Lokatun — Admin Litiges
// ============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminLitiges = () => {
  const [litiges, setLitiges] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [resolutions, setResolutions] = useState({});

  const charger = async () => {
    try {
      const res = await api.get('/litiges');
      setLitiges(res.data.litiges);
    } catch (err) {
      console.error(err);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => { charger(); }, []);

  const handleTraiter = async (id, statut) => {
    try {
      await api.put(`/litiges/${id}/traiter`, {
        statut,
        resolution: resolutions[id] || '',
      });
      charger();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  const statutColors = {
    NOUVEAU: 'bg-red-100 text-red-700',
    EN_COURS: 'bg-yellow-100 text-yellow-700',
    RESOLU: 'bg-green-100 text-green-700',
    FERME: 'bg-gray-100 text-gray-700',
  };

  if (chargement) return <div className="text-center mt-20 text-gray-500">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-700 px-6 py-4 flex justify-between items-center">
        <Link to="/admin" className="text-white font-bold text-xl">← Admin</Link>
        <h2 className="text-white font-semibold">Gestion des litiges</h2>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {litiges.length === 0 ? (
          <div className="text-center text-gray-500 py-20">Aucun litige trouvé</div>
        ) : (
          <div className="space-y-4">
            {litiges.map((l) => (
              <div key={l.id} className="bg-white rounded-2xl shadow-sm p-6">

                {/* Infos litige */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Litige #{l.id} — {l.reservation.annonce.titre}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Signalé par : {l.signaleur.prenom} {l.signaleur.nom} ({l.signaleur.email})
                    </p>
                    <p className="text-gray-500 text-sm">
                      Locataire : {l.reservation.locataire.prenom} {l.reservation.locataire.nom}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Date : {new Date(l.createdAt).toLocaleDateString('fr-TN')}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statutColors[l.statut]}`}>
                    {l.statut}
                  </span>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Description du problème</p>
                  <p className="text-gray-600 text-sm">{l.description}</p>
                </div>

                {/* Résolution existante */}
                {l.resolution && (
                  <div className="bg-green-50 rounded-xl p-4 mb-4">
                    <p className="text-sm font-medium text-green-700 mb-1">Résolution</p>
                    <p className="text-green-600 text-sm">{l.resolution}</p>
                  </div>
                )}

                {/* Actions si pas encore résolu */}
                {l.statut !== 'RESOLU' && l.statut !== 'FERME' && (
                  <div className="space-y-3">
                    <textarea
                      placeholder="Décision / résolution (optionnel)"
                      value={resolutions[l.id] || ''}
                      onChange={(e) => setResolutions({ ...resolutions, [l.id]: e.target.value })}
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleTraiter(l.id, 'EN_COURS')}
                        className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold py-2 rounded-xl transition text-sm"
                      >
                        En cours
                      </button>
                      <button
                        onClick={() => handleTraiter(l.id, 'RESOLU')}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition text-sm"
                      >
                        ✅ Résoudre
                      </button>
                      <button
                        onClick={() => handleTraiter(l.id, 'FERME')}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-xl transition text-sm"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLitiges;