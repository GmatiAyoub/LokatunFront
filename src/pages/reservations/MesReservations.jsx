// ============================================
// Lokatun — Page Mes Réservations (Locataire)
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
  REFUSEE: 'bg-red-100 text-red-700',
  ANNULEE: 'bg-gray-100 text-gray-700',
  TERMINEE: 'bg-purple-100 text-purple-700',
};

const statutIcons = {
  EN_ATTENTE: '⏳',
  ACCEPTEE: '✅',
  PAYEE: '💰',
  REFUSEE: '❌',
  ANNULEE: '🚫',
  TERMINEE: '🏁',
};

const MesReservations = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [reservations, setReservations] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [noteForm, setNoteForm] = useState({});
  const [commentaireForm, setCommentaireForm] = useState({});
  const [succesEval, setSuccesEval] = useState({});
  const [erreurEval, setErreurEval] = useState({});

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

  const handleEvaluer = async (reservationId, evalueId) => {
    const note = noteForm[reservationId];
    const commentaire = commentaireForm[reservationId];
    if (!note) {
      setErreurEval({ ...erreurEval, [reservationId]: 'Choisissez une note' });
      return;
    }
    try {
      await api.post('/evaluations', { reservationId, evalueId, note, commentaire });
      setSuccesEval({ ...succesEval, [reservationId]: 'Évaluation soumise !' });
      setErreurEval({ ...erreurEval, [reservationId]: '' });
    } catch (err) {
      setErreurEval({ ...erreurEval, [reservationId]: err.response?.data?.message || 'Erreur' });
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
        <h2 className="text-2xl font-bold text-secondary-500 mb-6">{t('mesReservations')}</h2>

        {reservations.length === 0 ? (
          <div className="card text-center py-20">
            <p className="text-4xl mb-4">📅</p>
            <p className="text-gray-500 font-medium">Vous n'avez pas encore de réservations</p>
            <Link to="/annonces" className="inline-block mt-4 btn-primary">
              {t('parcourirAnnonces')}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((r) => (
              <div key={r.id} className="card p-6">

                {/* Header réservation */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    {r.annonce.photos?.[0] ? (
                      <img src={r.annonce.photos[0].url} alt={r.annonce.titre} className="w-20 h-20 object-cover rounded-xl" />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">📷</div>
                    )}
                    <div>
                      <h3 className="font-bold text-secondary-500">{r.annonce.titre}</h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <span>📍</span>{r.annonce.localisation}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        📅 Du {new Date(r.dateDebut).toLocaleDateString('fr-TN')} au{' '}
                        {new Date(r.dateFin).toLocaleDateString('fr-TN')}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${statutColors[r.statut]}`}>
                    {statutIcons[r.statut]} {t(r.statut.toLowerCase()) || r.statut.replace('_', ' ')}
                  </span>
                </div>

                {/* Message EN_ATTENTE */}
                {r.statut === 'EN_ATTENTE' && (
                  <div className="bg-yellow-50 rounded-xl p-4 mb-4 border border-yellow-100">
                    <p className="text-yellow-700 text-sm font-semibold mb-1">⏳ {t('enAttente')}</p>
                    <p className="text-gray-500 text-xs">
                      Le propriétaire a 24h pour accepter ou refuser votre demande.
                      Le contact ne sera visible qu'après paiement des frais.
                    </p>
                  </div>
                )}

                {/* Message ACCEPTEE */}
                {r.statut === 'ACCEPTEE' && (
                  <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
                    <p className="text-blue-700 text-sm font-semibold mb-1">✅ {t('acceptee')}</p>
                    <p className="text-gray-500 text-xs">
                      Payez les frais de service Lokatun pour obtenir le contact du propriétaire.
                    </p>
                  </div>
                )}

                {/* Récapitulatif financier */}
                <div className="bg-orange-50 rounded-xl p-4 mb-4 text-sm border border-orange-100">
                  <div className="flex justify-between text-gray-600">
                    <span>{t('montantBase')}</span>
                    <span>{r.montantBase} DT</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mt-1">
                    <span>{t('fraisService')}</span>
                    <span>{r.fraisLocataire} DT</span>
                  </div>
                  <div className="flex justify-between font-bold text-primary-500 mt-2 border-t pt-2">
                    <span>{t('total')}</span>
                    <span>{r.montantTotal} DT</span>
                  </div>
                  <div className="flex justify-between text-gray-400 mt-1">
                    <span>{t('paiement')}</span>
                    <span>{r.methodePaiement === 'CASH' ? '💵 Cash' : '💳 Carte / D17'}</span>
                  </div>
                </div>

                {/* Bouton paiement */}
                {r.statut === 'ACCEPTEE' && (
                  <Link
                    to={`/paiement/${r.id}`}
                    className="w-full btn-primary text-center mt-2 mb-4 block"
                  >
                    {t('payerFrais')} ({r.fraisLocataire} DT)
                  </Link>
                )}

                {/* Contact propriétaire */}
                {(r.statut === 'PAYEE' || r.statut === 'TERMINEE') && (
                  <div className="bg-secondary-500 rounded-xl p-4 mb-4">
                    <p className="text-white text-sm font-semibold mb-2">
                      {t('contactDebloque')}
                    </p>
                    <div className="bg-white bg-opacity-10 rounded-lg p-3">
                      <p className="text-blue-200 text-xs mb-1">{t('contactProprietaire')}</p>
                      <p className="text-white font-semibold">
                        {r.annonce.proprietaire?.prenom} {r.annonce.proprietaire?.nom}
                      </p>
                      <p className="text-primary-300 font-bold text-xl mt-1">
                        📞 {r.annonce.proprietaire?.telephone}
                      </p>
                      <p className="text-blue-200 text-xs mt-2">{t('organiserRemise')}</p>
                    </div>
                  </div>
                )}

                {/* Instructions paiement CASH */}
                {r.statut === 'PAYEE' && r.methodePaiement === 'CASH' && (
                  <div className="bg-green-50 rounded-xl p-4 mb-4 border border-green-100">
                    <p className="font-semibold text-green-700 text-sm mb-1">💵 Paiement postal en cours de vérification</p>
                    <p className="text-gray-600 text-sm">
                      Préparez <strong className="text-primary-500">{r.montantBase} DT</strong> en espèces pour la remise.
                    </p>
                  </div>
                )}

                {/* Évaluation */}
                {r.statut === 'TERMINEE' && (
                  <div className="border-t pt-4 mt-2">
                    <p className="text-sm font-semibold text-secondary-500 mb-3">Évaluer le propriétaire</p>
                    {succesEval[r.id] ? (
                      <p className="text-green-600 text-sm bg-green-50 px-4 py-2 rounded-xl">✅ {succesEval[r.id]}</p>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              onClick={() => setNoteForm({ ...noteForm, [r.id]: n })}
                              className={`w-10 h-10 rounded-xl text-lg font-bold transition ${
                                noteForm[r.id] >= n
                                  ? 'bg-yellow-400 text-white shadow-sm'
                                  : 'bg-gray-100 text-gray-300 hover:bg-yellow-100'
                              }`}
                            >★</button>
                          ))}
                        </div>
                        <textarea
                          placeholder="Commentaire (optionnel)"
                          value={commentaireForm[r.id] || ''}
                          onChange={(e) => setCommentaireForm({ ...commentaireForm, [r.id]: e.target.value })}
                          rows={2}
                          className="input-field"
                        />
                        {erreurEval[r.id] && (
                          <p className="text-red-500 text-sm">{erreurEval[r.id]}</p>
                        )}
                        <button
                          onClick={() => handleEvaluer(r.id, r.annonce.proprietaireId)}
                          className="btn-primary text-sm py-2"
                        >
                          Soumettre l'évaluation
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Bouton annuler */}
                {r.statut === 'EN_ATTENTE' && (
                  <button
                    onClick={() => handleAnnuler(r.id)}
                    className="mt-4 text-sm text-red-500 hover:text-red-600 hover:underline transition"
                  >
                    {t('annulerReservation')}
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