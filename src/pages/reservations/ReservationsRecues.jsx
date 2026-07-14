// ============================================
// Lokatun — Page Réservations Reçues (Propriétaire)
// ============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../api/axios';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const statutColors = {
  EN_ATTENTE: 'bg-yellow-100 text-yellow-700',
  ACCEPTEE: 'bg-blue-100 text-blue-700',
  PAYEE: 'bg-green-100 text-green-700',
  COMMISSION_PAYEE: 'bg-purple-100 text-purple-700',
  REFUSEE: 'bg-red-100 text-red-700',
  ANNULEE: 'bg-gray-100 text-gray-700',
  TERMINEE: 'bg-secondary-100 text-secondary-700',
};

const statutIcons = {
  EN_ATTENTE: '⏳',
  ACCEPTEE: '✅',
  PAYEE: '💰',
  COMMISSION_PAYEE: '📮',
  REFUSEE: '❌',
  ANNULEE: '🚫',
  TERMINEE: '🏁',
};

const ReservationsRecues = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'darija';
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

  if (chargement) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Chargement...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sand-100" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Header */}
      <div className="bg-secondary-500 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/annonces" className="flex items-center gap-2 text-white hover:text-primary-300 transition">
            <span>←</span>
            <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold">Lokatun</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/dashboard" className="text-white text-sm hover:text-primary-300 transition">
              {t('monCompte')}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-secondary-500 mb-6">{t('reservationsRecues')}</h2>

        {reservations.length === 0 ? (
          <div className="card text-center py-20">
            <p className="text-4xl mb-4">📬</p>
            <p className="text-gray-500 font-medium">Vous n'avez pas encore reçu de réservations</p>
            <Link to="/annonces/creer" className="inline-block mt-4 btn-primary">
              {t('publierAnnonce')}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((r) => (
              <div key={r.id} className="card p-6">

                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    {r.annonce.photos?.[0] ? (
                      <img src={r.annonce.photos[0].url} alt={r.annonce.titre} className="w-20 h-20 object-cover rounded-xl" />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">📷</div>
                    )}
                    <div>
                      <h3 className="font-bold text-secondary-500">{r.annonce.titre}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{r.locataire.prenom[0]}</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {r.locataire.prenom} {r.locataire.nom}
                        </p>
                      </div>
                      {(r.statut === 'PAYEE' || r.statut === 'COMMISSION_PAYEE' || r.statut === 'TERMINEE') && (
                        <p className="text-gray-400 text-sm">📞 {r.locataire.telephone}</p>
                      )}
                      <p className="text-gray-400 text-sm mt-1">
                        📅 Du {new Date(r.dateDebut).toLocaleDateString('fr-TN')} au{' '}
                        {new Date(r.dateFin).toLocaleDateString('fr-TN')}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${statutColors[r.statut]}`}>
                    {statutIcons[r.statut]} {r.statut.replace('_', ' ')}
                  </span>
                </div>

                {/* Récapitulatif financier */}
                <div className="bg-orange-50 rounded-xl p-4 mb-4 text-sm border border-orange-100">
                  <div className="flex justify-between text-gray-600">
                    <span>{t('montantBase')}</span>
                    <span>{r.montantBase} DT</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mt-1">
                    <span>Commission Lokatun (7%)</span>
                    <span className="text-red-500">- {r.commissionProprietaire} DT</span>
                  </div>
                  <div className="flex justify-between font-bold text-green-600 mt-2 border-t pt-2">
                    <span>Vous recevrez</span>
                    <span>{r.montantProprietaire} DT</span>
                  </div>
                  <div className="flex justify-between text-gray-400 mt-1">
                    <span>{t('paiement')}</span>
                    <span>{r.methodePaiement === 'CASH' ? '💵 Cash' : '💳 Carte / D17'}</span>
                  </div>
                </div>

                {/* Boutons accepter/refuser */}
                {r.statut === 'EN_ATTENTE' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAction(r.id, 'accepter')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition text-sm"
                    >
                      ✅ Accepter
                    </button>
                    <button
                      onClick={() => handleAction(r.id, 'refuser')}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition text-sm"
                    >
                      ❌ Refuser
                    </button>
                  </div>
                )}

                {/* Bouton payer commission */}
                {r.statut === 'PAYEE' && (
                  <div className="mt-3 space-y-2">
                    <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-100">
                      <p className="text-yellow-700 text-xs font-semibold">
                        💰 Le locataire a payé ses frais !
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Payez votre commission de <strong>{r.commissionProprietaire.toFixed(2)} DT</strong> pour terminer la location.
                      </p>
                    </div>
                    <Link
                      to={`/paiement-commission/${r.id}`}
                      className="w-full btn-primary text-center block text-sm"
                    >
                      📮 Payer ma commission ({r.commissionProprietaire.toFixed(2)} DT)
                    </Link>
                  </div>
                )}

                {/* Bouton terminer — commission payée */}
                {r.statut === 'COMMISSION_PAYEE' && (
                  <div className="mt-3 space-y-2">
                    <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                      <p className="text-green-700 text-xs font-semibold">
                        ✅ Commission confirmée !
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Vous pouvez maintenant terminer la location.
                      </p>
                    </div>
                    <button
                      onClick={() => handleAction(r.id, 'terminer')}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition text-sm"
                    >
                      🏁 Marquer comme terminée
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