// ============================================
// Lokatun — Page Détail d'une Annonce
// ============================================
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const DetailAnnonce = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { utilisateur } = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'darija';

  const [annonce, setAnnonce] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [photoActive, setPhotoActive] = useState(0);
  const [erreur, setErreur] = useState('');
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
      setSuccesReservation('Demande envoyée ! Le propriétaire va vous répondre sous 24h.');
      setDateDebut('');
      setDateFin('');
    } catch (err) {
      setErreurReservation(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setChargementReservation(false);
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

  if (erreur) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">{erreur}</p>
    </div>
  );

  const estProprietaire = Number(utilisateur?.id) === Number(annonce.proprietaire.id);
  const nombreJours = dateDebut && dateFin
    ? Math.ceil((new Date(dateFin) - new Date(dateDebut)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="min-h-screen bg-sand-100" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Header */}
      <div className="bg-secondary-500 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/annonces" className="flex items-center gap-2 text-white hover:text-primary-300 transition">
            <span>{t('retour')}</span>
            <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold">Lokatun</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {utilisateur && (
              <Link to="/dashboard" className="text-white text-sm hover:text-primary-300 transition">
                {t('monCompte')}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Colonne gauche */}
          <div className="lg:col-span-2 space-y-4">

            {/* Photos */}
            <div className="card overflow-hidden">
              {annonce.photos.length > 0 ? (
                <>
                  <img
                    src={annonce.photos[photoActive].url}
                    alt={annonce.titre}
                    className="w-full h-80 object-cover"
                  />
                  {annonce.photos.length > 1 && (
                    <div className="flex gap-2 p-3">
                      {annonce.photos.map((photo, index) => (
                        <img
                          key={photo.id}
                          src={photo.url}
                          alt=""
                          onClick={() => setPhotoActive(index)}
                          className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition ${
                            photoActive === index ? 'border-primary-500' : 'border-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-6xl">📷</div>
              )}
            </div>

            {/* Infos annonce */}
            <div className="card p-6">
              <span className="badge">{t(annonce.categorie.toLowerCase()) || annonce.categorie}</span>
              <h1 className="text-2xl font-bold text-secondary-500 mt-3">{annonce.titre}</h1>
              <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                <span>📍</span> {annonce.localisation}
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">{annonce.description}</p>
            </div>

            {/* Propriétaire */}
            <div className="card p-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">{t('proposePar')}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {annonce.proprietaire.prenom[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {annonce.proprietaire.prenom} {annonce.proprietaire.nom}
                  </p>
                  <p className="text-yellow-500 text-sm">
                    ⭐ {annonce.proprietaire.noteMoyenne.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Colonne droite */}
          <div className="space-y-4">

            {/* Prix */}
            <div className="card p-6">
              <div className="flex items-end gap-2 mb-4">
                <span className="text-3xl font-bold text-primary-500">{annonce.prixParJour} DT</span>
                <span className="text-gray-400 text-sm mb-1">{t('parJour')}</span>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 text-sm space-y-2">
                <p className="font-semibold text-secondary-500 mb-3">{t('total')}</p>
                <div className="flex justify-between text-gray-600">
                  <span>{t('montantBase')}</span>
                  <span>{annonce.prixParJour} DT{t('parJour')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('fraisService')}</span>
                  <span>{(annonce.prixParJour * 0.05).toFixed(2)} DT</span>
                </div>
                {nombreJours > 0 && (
                  <>
                    <div className="flex justify-between text-gray-600">
                      <span>Durée</span>
                      <span>{nombreJours} jour(s)</span>
                    </div>
                    <div className="flex justify-between font-bold text-primary-500 border-t pt-2">
                      <span>{t('total')}</span>
                      <span>{(annonce.prixParJour * 1.05 * nombreJours).toFixed(2)} DT</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="card p-6">
              {estProprietaire ? (
                <button
                  onClick={handleSupprimer}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition"
                >
                  {t('supprimerAnnonce')}
                </button>
              ) : utilisateur ? (
                <div className="space-y-3">
                  <p className="font-semibold text-secondary-500">{t('reserverObjet')}</p>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">{t('dateDebut')}</label>
                    <input
                      type="date"
                      value={dateDebut}
                      onChange={(e) => setDateDebut(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">{t('dateFin')}</label>
                    <input
                      type="date"
                      value={dateFin}
                      onChange={(e) => setDateFin(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">{t('methodePaiement')}</label>
                    <select
                      value={methodePaiement}
                      onChange={(e) => setMethodePaiement(e.target.value)}
                      className="input-field"
                    >
                      <option value="CASH">{t('cashRemise')}</option>
                      <option value="CARTE">{t('carteBancaire')}</option>
                    </select>
                  </div>
                  {erreurReservation && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
                      {erreurReservation}
                    </div>
                  )}
                  {succesReservation && (
                    <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-xl border border-green-100">
                      {succesReservation}
                    </div>
                  )}
                  <button
                    onClick={handleReserver}
                    disabled={chargementReservation}
                    className="w-full btn-primary disabled:opacity-50"
                  >
                    {chargementReservation ? '...' : t('demanderReservation')}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-4">{t('seConnecterReserver')}</p>
                  <Link to="/login" className="w-full btn-primary block text-center">
                    {t('seConnecter')}
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAnnonce;