// ============================================
// Lokatun — Page Détail d'une Annonce
// ============================================
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const DetailAnnonce = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { utilisateur } = useAuth();
  const [annonce, setAnnonce] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [photoActive, setPhotoActive] = useState(0);
  const [erreur, setErreur] = useState('');

  // États réservation
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [methodePaiement, setMethodePaiement] = useState('CASH');
  const [erreurReservation, setErreurReservation] = useState('');
  const [succesReservation, setSuccesReservation] = useState('');
  const [chargementReservation, setChargementReservation] = useState(false);

  useEffect(() => {
    const charger = async () => {
      try {
        const res = await api.get(`/annonces/${id}`);
        setAnnonce(res.data.annonce);
      } catch {
        setErreur('Annonce introuvable');
      } finally {
        setChargement(false);
      }
    };
    charger();
  }, [id]);

  const handleSupprimer = async () => {
    if (!window.confirm('Supprimer cette annonce ?')) return;
    try {
      await api.delete(`/annonces/${id}`);
      navigate('/annonces');
    } catch {
      setErreur('Erreur lors de la suppression');
    }
  };

  const handleReserver = async () => {
    setErreurReservation('');
    setSuccesReservation('');
    setChargementReservation(true);
    try {
      await api.post('/reservations', {
        annonceId: id,
        dateDebut,
        dateFin,
        methodePaiement,
      });
      setSuccesReservation('Demande envoyée avec succès ! Le propriétaire va vous répondre sous 24h.');
      setDateDebut('');
      setDateFin('');
    } catch (err) {
      setErreurReservation(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setChargementReservation(false);
    }
  };

  if (chargement) return <div className="text-center mt-20 text-gray-500">Chargement...</div>;
  if (erreur) return <div className="text-center mt-20 text-red-500">{erreur}</div>;

  const estProprietaire = Number(utilisateur?.id) === Number(annonce.proprietaire.id);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <Link to="/annonces" className="text-blue-600 font-bold text-xl">← Lokatun</Link>
        {utilisateur && (
          <Link to="/dashboard" className="text-gray-600 text-sm hover:underline">
            Mon compte
          </Link>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Photos */}
          {annonce.photos.length > 0 && (
            <div>
              <img
                src={annonce.photos[photoActive].url}
                alt={annonce.titre}
                className="w-full h-80 object-cover"
              />
              {annonce.photos.length > 1 && (
                <div className="flex gap-2 p-4">
                  {annonce.photos.map((photo, index) => (
                    <img
                      key={photo.id}
                      src={photo.url}
                      alt=""
                      onClick={() => setPhotoActive(index)}
                      className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                        photoActive === index ? 'border-blue-500' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Infos */}
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                  {annonce.categorie}
                </span>
                <h1 className="text-2xl font-bold text-gray-800 mt-2">{annonce.titre}</h1>
                <p className="text-gray-500 text-sm mt-1">{annonce.localisation}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">{annonce.prixParJour} DT</p>
                <p className="text-gray-400 text-sm">par jour</p>
              </div>
            </div>

            <p className="text-gray-600 mt-4">{annonce.description}</p>

            {/* Propriétaire */}
            <div className="bg-gray-50 rounded-xl p-4 mt-6">
              <p className="text-sm text-gray-500">Proposé par</p>
              <p className="font-semibold text-gray-800">
                {annonce.proprietaire.prenom} {annonce.proprietaire.nom}
              </p>
              <p className="text-sm text-yellow-500">
                ⭐ {annonce.proprietaire.noteMoyenne.toFixed(1)}
              </p>
            </div>

            {/* Commission */}
            <div className="bg-blue-50 rounded-xl p-4 mt-4">
              <p className="text-sm font-semibold text-blue-700 mb-2">Récapitulatif des frais</p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Prix de base</span>
                <span>{annonce.prixParJour} DT/jour</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Frais de service (5%)</span>
                <span>{(annonce.prixParJour * 0.05).toFixed(2)} DT</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-blue-700 mt-2 border-t pt-2">
                <span>Total par jour</span>
                <span>{(annonce.prixParJour * 1.05).toFixed(2)} DT</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6">
              {estProprietaire ? (
                <button
                  onClick={handleSupprimer}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition"
                >
                  Supprimer l'annonce
                </button>
              ) : utilisateur ? (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Demander une réservation</h3>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Date de début</label>
                      <input
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Date de fin</label>
                      <input
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <select
                    value={methodePaiement}
                    onChange={(e) => setMethodePaiement(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CASH">Cash à la remise</option>
                    <option value="D17">D17</option>
                  </select>
                  {erreurReservation && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                      {erreurReservation}
                    </div>
                  )}
                  {succesReservation && (
                    <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-lg">
                      {succesReservation}
                    </div>
                  )}
                  <button
                    onClick={handleReserver}
                    disabled={chargementReservation}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
                  >
                    {chargementReservation ? 'Envoi en cours...' : 'Demander la réservation'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                >
                  Connectez-vous pour réserver
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAnnonce;