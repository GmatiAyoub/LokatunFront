// ============================================
// Lokatun — Page Réservations Reçues (Propriétaire)
// ============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const statutColors = {
  EN_ATTENTE: 'bg-yellow-100 text-yellow-700',
  ACCEPTEE: 'bg-green-100 text-green-700',
  REFUSEE: 'bg-red-100 text-red-700',
  ANNULEE: 'bg-gray-100 text-gray-700',
  TERMINEE: 'bg-blue-100 text-blue-700',
};

const ReservationsRecues = () => {
  const [reservations, setReservations] = useState([]);
  const [chargement, setChargement] = useState(true);

  const charger = async () => {
    try {
      const res = await api.get('/reservations/recues');
      setReservations(res.data.reservations);
    } catch (err) {
      console.error(err);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => { charger(); }, []);

  const handleAction = async (id, action) => {
    try {
      await api.put(`/reservations/${id}/${action}`);
      charger();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur');
    }
  };

  if (chargement) return <div className="text-center mt-20 text-gray-500">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <Link to="/annonces" className="text-blue-600 font-bold text-xl">← Lokatun</Link>
        <Link to="/dashboard" className="text-gray-600 text-sm hover:underline">Mon compte</Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Réservations Reçues</h2>

        {reservations.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p>Vous n'avez pas encore reçu de réservations.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-start">

                  {/* Infos */}
                  <div className="flex gap-4">
                    {r.annonce.photos?.[0] && (
                      <img
                        src={r.annonce.photos[0].url}
                        alt={r.annonce.titre}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-800">{r.annonce.titre}</h3>
                      <p className="text-gray-500 text-sm">
                        Locataire : {r.locataire.prenom} {r.locataire.nom}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Tél : {r.locataire.telephone}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Du {new Date(r.dateDebut).toLocaleDateString('fr-TN')} au{' '}
                        {new Date(r.dateFin).toLocaleDateString('fr-TN')}
                      </p>
                    </div>
                  </div>

                  {/* Statut */}
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statutColors[r.statut]}`}>
                    {r.statut.replace('_', ' ')}
                  </span>
                </div>

                {/* Récapitulatif financier */}
                <div className="bg-gray-50 rounded-xl p-4 mt-4 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Montant de base</span>
                    <span>{r.montantBase} DT</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mt-1">
                    <span>Commission Lokatun (7%)</span>
                    <span>- {r.commissionProprietaire} DT</span>
                  </div>
                  <div className="flex justify-between font-bold text-green-700 mt-2 border-t pt-2">
                    <span>Vous recevrez</span>
                    <span>{r.montantProprietaire} DT</span>
                  </div>
                  <div className="flex justify-between text-gray-500 mt-1">
                    <span>Méthode de paiement</span>
                    <span>{r.methodePaiement}</span>
                  </div>
                </div>

                {/* Boutons accepter/refuser */}
                {r.statut === 'EN_ATTENTE' && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleAction(r.id, 'accepter')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition text-sm"
                    >
                      ✅ Accepter
                    </button>
                    <button
                      onClick={() => handleAction(r.id, 'refuser')}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl transition text-sm"
                    >
                      ❌ Refuser
                    </button>
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

export default ReservationsRecues;