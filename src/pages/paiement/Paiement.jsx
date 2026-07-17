// ============================================
// Lokatun — Page Paiement
// ============================================
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

const Paiement = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [methode, setMethode] = useState('CASH');
  const [etape, setEtape] = useState(1); // 1=choix, 2=instructions, 3=confirmation
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    const charger = async () => {
      try {
        const res = await api.get('/reservations/mes-reservations');
        const r = res.data.reservations.find(r => r.id === parseInt(reservationId));
        if (!r) navigate('/mes-reservations');
        setReservation(r);
        setMethode(r.methodePaiement);
      } catch {
        navigate('/mes-reservations');
      } finally {
        setChargement(false);
      }
    };
    charger();
  }, [reservationId]);

  const handlePaiementKonnect = async () => {
  try {
    const res = await api.post('/paiement/initier-locataire', {
      reservationId: parseInt(reservationId),
    });

    if (res.data.statique) {
      // Mode statique — KYC en attente
      setEtape(2);
      setMethode('CASH');
    } else {
      // Rediriger vers Konnect
      window.location.href = res.data.paymentUrl;
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Erreur');
  }
};

const handleConfirmerPaiement = async () => {
  try {
    await api.put(`/reservations/${reservationId}/payer`);
    setEtape(3);
  } catch (err) {
    alert(err.response?.data?.message || 'Erreur lors de la confirmation');
  }
};

  if (chargement) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );

  if (!reservation) return null;

  const fraisLokatun = reservation.fraisLocataire;
  const montantTotal = reservation.montantTotal;
  const montantBase = reservation.montantBase;

  return (
    <div className="min-h-screen bg-sand-100">

      {/* Header */}
      <div className="bg-secondary-500 px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link to="/mes-reservations" className="flex items-center gap-2 text-white hover:text-primary-300 transition">
            <span>←</span>
            <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold">Lokatun</span>
          </Link>
          <span className="text-white text-sm font-semibold">Paiement sécurisé</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Étapes */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                etape >= s ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {etape > s ? '✓' : s}
              </div>
              {s < 3 && <div className={`w-12 h-1 rounded ${etape > s ? 'bg-primary-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* ── Étape 1 — Récapitulatif + choix méthode ── */}
        {etape === 1 && (
          <div className="space-y-4">
            <div className="card p-6">
              <h2 className="text-xl font-bold text-secondary-500 mb-4">Récapitulatif de votre réservation</h2>

              <div className="flex gap-4 mb-4">
                {reservation.annonce.photos?.[0] && (
                  <img src={reservation.annonce.photos[0].url} alt="" className="w-20 h-20 object-cover rounded-xl" />
                )}
                <div>
                  <h3 className="font-bold text-secondary-500">{reservation.annonce.titre}</h3>
                  <p className="text-gray-400 text-sm">📍 {reservation.annonce.localisation}</p>
                  <p className="text-gray-400 text-sm">
                    📅 Du {new Date(reservation.dateDebut).toLocaleDateString('fr-TN')} au{' '}
                    {new Date(reservation.dateFin).toLocaleDateString('fr-TN')}
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 text-sm border border-orange-100">
                <div className="flex justify-between text-gray-600">
                  <span>Prix de location</span>
                  <span>{montantBase} DT</span>
                </div>
                <div className="flex justify-between text-gray-600 mt-1">
                  <span>Frais de service Lokatun (5%)</span>
                  <span className="text-primary-500">+ {fraisLokatun} DT</span>
                </div>
                <div className="flex justify-between font-bold text-secondary-500 mt-2 border-t pt-2 text-base">
                  <span>Total à payer</span>
                  <span>{montantTotal} DT</span>
                </div>
              </div>
            </div>

            {/* Choix méthode */}
            <div className="card p-6">
              <h3 className="font-bold text-secondary-500 mb-4">Choisir votre méthode de paiement</h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMethode('CASH')}
                  className={`p-4 rounded-xl border-2 transition text-left ${
                    methode === 'CASH'
                      ? 'border-primary-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">💵</div>
                  <p className="font-semibold text-secondary-500 text-sm">Cash via Poste</p>
                  <p className="text-gray-400 text-xs mt-1">Virement postal au numéro Lokatun</p>
                </button>

                <button
  onClick={() => setMethode('CARTE')}
  className={`p-4 rounded-xl border-2 transition text-left ${
    methode === 'CARTE'
      ? 'border-primary-500 bg-orange-50'
      : 'border-gray-200 hover:border-gray-300'
  }`}
>
  <div className="text-2xl mb-2">💳</div>
  <p className="font-semibold text-secondary-500 text-sm">Carte / D17</p>
  <p className="text-gray-400 text-xs mt-1">Via Konnect — sécurisé</p>
  <span className="inline-block mt-1 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
    Disponible
  </span>
</button>
                </div>

                <button
  onClick={() => {
    if (methode === 'CARTE') {
      handlePaiementKonnect();
    } else {
      setEtape(2);
    }
  }}
  className="w-full btn-primary mt-4"
>
  {methode === 'CARTE' ? '💳 Payer via Konnect' : 'Continuer →'}
</button>
            </div>
          </div>
        )}

        {/* ── Étape 2 — Instructions paiement ── */}
        {etape === 2 && methode === 'CASH' && (
          <div className="space-y-4">
            <div className="card p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">📮</span>
                </div>
                <h2 className="text-xl font-bold text-secondary-500">Instructions de paiement</h2>
                <p className="text-gray-500 text-sm mt-1">Virement postal Lokatun</p>
              </div>

              {/* Instructions */}
              <div className="bg-secondary-500 rounded-xl p-5 text-white mb-4">
                <p className="text-blue-200 text-xs font-semibold mb-3 uppercase tracking-wide">Étapes à suivre</p>

                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <p className="text-sm">Rendez-vous dans n'importe quel bureau de <strong>La Poste Tunisienne</strong></p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <p className="text-sm">Demandez un <strong>virement postal</strong> vers le numéro :</p>
                  </div>
                </div>

                {/* Numéro de compte */}
                <div className="bg-white bg-opacity-10 rounded-xl p-4 mt-3 text-center">
                  <p className="text-blue-200 text-xs mb-1">Numéro de compte Lokatun</p>
                  <p className="text-primary-300 font-bold text-3xl tracking-widest">28507819</p>
                  <p className="text-blue-200 text-xs mt-1">Au nom de : Gmati Ayoub — Lokatun</p>
                </div>

                <div className="space-y-3 mt-3">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <p className="text-sm">Montant à envoyer :</p>
                      <p className="text-primary-300 font-bold text-xl mt-0.5">{fraisLokatun.toFixed(2)} DT</p>
                      <p className="text-blue-300 text-xs">(frais de service 5% uniquement)</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <p className="text-sm">Dans la référence, notez : <strong>LOK-{reservation.id}</strong></p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                    <p className="text-sm">Gardez le <strong>reçu postal</strong> comme preuve</p>
                  </div>
                </div>
              </div>

              {/* Résumé paiement direct */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-100 mb-4">
                <p className="text-green-700 text-sm font-semibold mb-2">💵 Le reste (montant location) :</p>
                <p className="text-gray-600 text-sm">
                  Payez <strong className="text-secondary-500">{montantBase} DT</strong> directement au propriétaire
                  lors de la remise de l'objet.
                </p>
              </div>

              {/* Confirmation */}
              <label className="flex items-start gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={confirmation}
                  onChange={(e) => setConfirmation(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-orange-500"
                />
                <p className="text-gray-600 text-sm">
                  Je confirme avoir effectué le virement de <strong>{fraisLokatun.toFixed(2)} DT</strong> vers
                  le numéro postal <strong>28507819</strong> avec la référence <strong>LOK-{reservation.id}</strong>
                </p>
              </label>

              <div className="flex gap-3">
                <button
                  onClick={() => setEtape(1)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleConfirmerPaiement}
                  disabled={!confirmation}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  Confirmer le paiement
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Étape 3 — Confirmation finale ── */}
        {etape === 3 && (
          <div className="card p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-secondary-500 mb-2">Paiement confirmé !</h2>
            <p className="text-gray-500 text-sm mb-6">
              Votre paiement de <strong>{fraisLokatun.toFixed(2)} DT</strong> est en cours de vérification.
              Vous recevrez une confirmation sous 24h.
            </p>

            <div className="bg-orange-50 rounded-xl p-4 text-left mb-6 border border-orange-100">
              <p className="text-sm font-semibold text-secondary-500 mb-2">Récapitulatif :</p>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Réservation</span>
                  <span className="font-semibold">LOK-{reservation.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais Lokatun payés</span>
                  <span className="font-semibold text-primary-500">{fraisLokatun.toFixed(2)} DT</span>
                </div>
                <div className="flex justify-between">
                  <span>À payer au propriétaire</span>
                  <span className="font-semibold">{montantBase} DT cash</span>
                </div>
                <div className="flex justify-between">
                  <span>Objet</span>
                  <span className="font-semibold">{reservation.annonce.titre}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link to="/mes-reservations" className="btn-primary">
                Voir mes réservations
              </Link>
              <Link to="/annonces" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition">
                Retour aux annonces
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Paiement;