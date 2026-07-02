// ============================================
// Lokatun — Page Signaler un Litige
// ============================================
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const SignalerLitige = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    reservationId: '',
    description: '',
  });
  const [erreur, setErreur] = useState('');
  const [succes, setSucces] = useState('');
  const [chargement, setChargement] = useState(false);

  // Charger les réservations de l'utilisateur
  useEffect(() => {
    const charger = async () => {
      try {
        const res = await api.get('/reservations/mes-reservations');
        // Garder seulement les réservations ACCEPTEE ou TERMINEE
        const filtrees = res.data.reservations.filter(
          (r) => r.statut === 'ACCEPTEE' || r.statut === 'TERMINEE'
        );
        setReservations(filtrees);
      } catch (err) {
        console.error(err);
      }
    };
    charger();
  }, []);

  const handleSubmit = async () => {
    setErreur('');
    setSucces('');

    if (!formData.reservationId || !formData.description) {
      setErreur('Veuillez sélectionner une réservation et décrire le problème');
      return;
    }

    if (formData.description.length < 20) {
      setErreur('La description doit contenir au moins 20 caractères');
      return;
    }

    setChargement(true);
    try {
      await api.post('/litiges', formData);
      setSucces('Votre signalement a été envoyé. L\'administrateur va traiter votre demande sous 24h.');
      setFormData({ reservationId: '', description: '' });
    } catch (err) {
      setErreur(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <Link to="/annonces" className="text-blue-600 font-bold text-xl">← Lokatun</Link>
        <Link to="/dashboard" className="text-gray-600 text-sm hover:underline">Mon compte</Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Signaler un problème</h2>
          <p className="text-gray-500 text-sm mb-6">
            Décrivez le problème rencontré lors de votre location. L'administrateur traitera votre demande sous 24h.
          </p>

          {erreur && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {erreur}
            </div>
          )}

          {succes && (
            <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-lg mb-4">
              {succes}
            </div>
          )}

          <div className="space-y-4">

            {/* Sélectionner la réservation */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Réservation concernée
              </label>
              <select
                value={formData.reservationId}
                onChange={(e) => setFormData({ ...formData, reservationId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner une réservation</option>
                {reservations.map((r) => (
                  <option key={r.id} value={r.id}>
                    #{r.id} — {r.annonce.titre} (
                    {new Date(r.dateDebut).toLocaleDateString('fr-TN')} →{' '}
                    {new Date(r.dateFin).toLocaleDateString('fr-TN')})
                  </option>
                ))}
              </select>
              {reservations.length === 0 && (
                <p className="text-gray-400 text-xs mt-1">
                  Aucune réservation éligible trouvée
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Description du problème
              </label>
              <textarea
                placeholder="Décrivez le problème en détail (dégradation, non-restitution, paiement non honoré...)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-400 text-xs mt-1">
                {formData.description.length}/20 caractères minimum
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={chargement}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              {chargement ? 'Envoi en cours...' : 'Envoyer le signalement'}
            </button>

            <button
              onClick={() => navigate('/mes-reservations')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
            >
              Retour à mes réservations
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalerLitige;