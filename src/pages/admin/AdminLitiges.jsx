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

  const statutIcons = {
    NOUVEAU: '🔴',
    EN_COURS: '🟡',
    RESOLU: '🟢',
    FERME: '⚫',
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
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/admin" className="flex items-center gap-2 text-white hover:text-primary-300 transition">
            <span>←</span>
            <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold">Admin</span>
          </Link>
          <h2 className="text-white font-semibold">Gestion des litiges</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-secondary-500">Litiges</h2>
          <span className="badge">{litiges.length} total</span>
        </div>

        {litiges.length === 0 ? (
          <div className="card text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">✅</p>
            <p>Aucun litige en cours</p>
          </div>
        ) : (
          <div className="space-y-4">
            {litiges.map((l) => (
              <div key={l.id} className="card p-6">

                {/* Header litige */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span>{statutIcons[l.statut]}</span>
                      <p className="font-bold text-secondary-500">
                        Litige #{l.id} — {l.reservation.annonce.titre}
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Signalé par : <span className="font-medium">{l.signaleur.prenom} {l.signaleur.nom}</span> ({l.signaleur.email})
                    </p>
                    <p className="text-gray-500 text-sm">
                      Locataire : {l.reservation.locataire.prenom} {l.reservation.locataire.nom}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(l.createdAt).toLocaleDateString('fr-TN')}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statutColors[l.statut]}`}>
                    {l.statut}
                  </span>
                </div>

                {/* Description */}
                <div className="bg-orange-50 rounded-xl p-4 mb-4 border border-orange-100">
                  <p className="text-sm font-semibold text-secondary-500 mb-1">Description du problème</p>
                  <p className="text-gray-600 text-sm">{l.description}</p>
                </div>

                {/* Résolution existante */}
                {l.resolution && (
                  <div className="bg-green-50 rounded-xl p-4 mb-4 border border-green-100">
                    <p className="text-sm font-semibold text-green-700 mb-1">Résolution</p>
                    <p className="text-green-600 text-sm">{l.resolution}</p>
                  </div>
                )}

                {/* Actions */}
                {l.statut !== 'RESOLU' && l.statut !== 'FERME' && (
                  <div className="space-y-3">
                    <textarea
                      placeholder="Décision / résolution (optionnel)"
                      value={resolutions[l.id] || ''}
                      onChange={(e) => setResolutions({ ...resolutions, [l.id]: e.target.value })}
                      rows={2}
                      className="input-field"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleTraiter(l.id, 'EN_COURS')}
                        className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold py-2 rounded-xl transition text-sm"
                      >
                        🟡 En cours
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
                        ⚫ Fermer
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