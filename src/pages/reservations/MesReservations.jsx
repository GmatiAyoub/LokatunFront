// ============================================
// Lokatun — Page Mes Réservations (Locataire)
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

const MesReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [chargement, setChargement] = useState(true);

  const charger = async () => {
    try {
      const res = await api.get('/reservations/mes-reservations');
      setReservations(res.data.reservations);
    } catch (err) {
      console.error(err);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => { charger(); }, []);

  const handleAnnuler = async (id) => {
    if (!window.confirm('Annuler cette réservation ?')) return;
    try {
      await api.put(`/reservations/${id}/annuler`);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Mes Réservations</h2>

        {reservations.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p>Vous n'avez pas encore de réservations.</p>
            <Link to="/annonces" className="text-blue-600 hover:underline mt-2 inline-block">
              Parcourir les annonces
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-start">

                  {/* Infos annonce */}
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
                      <p className="text-gray-500 text-sm">{r.annonce.localisation}</p>
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
                    <span>Frais de service (5%)</span>
                    <span>{r.fraisLocataire} DT</span>
                  </div>
                  <div className="flex justify-between font-bold text-blue-700 mt-2 border-t pt-2">
                    <span>Total payé</span>
                    <span>{r.montantTotal} DT</span>
                  </div>
                  <div className="flex justify-between text-gray-500 mt-1">
                    <span>Méthode de paiement</span>
                    <span>{r.methodePaiement}</span>
                  </div>
                </div>

                {/* Instructions paiement */}
                {r.statut === 'ACCEPTEE' && r.methodePaiement === 'D17' && (
                  <div className="bg-blue-50 rounded-xl p-4 mt-3 text-sm text-blue-700">
                    <p className="font-semibold">Instructions D17</p>
                    <p>Envoyez <strong>{r.montantTotal} DT</strong> au numéro D17 : <strong>+216 22 000 000</strong></p>
                  </div>
                )}
                {r.statut === 'ACCEPTEE' && r.methodePaiement === 'CASH' && (
                  <div className="bg-green-50 rounded-xl p-4 mt-3 text-sm text-green-700">
                    <p className="font-semibold">Paiement Cash</p>
                    <p>Préparez <strong>{r.montantTotal} DT</strong> en espèces lors de la remise de l'objet.</p>
                  </div>
                )}

                {/* Bouton annuler */}
                {r.statut === 'EN_ATTENTE' && (
                  <button
                    onClick={() => handleAnnuler(r.id)}
                    className="mt-4 text-sm text-red-500 hover:underline"
                  >
                    Annuler la réservation
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MesReservations;