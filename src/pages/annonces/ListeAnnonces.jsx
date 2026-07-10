// ============================================
// Lokatun — Page Liste des Annonces
// ============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const CATEGORIES = ['Tous', 'Sport', 'Électronique', 'Vêtements', 'Maison', 'Jardinage', 'Autre'];

const CATEGORY_KEYS = {
  'Tous': 'tous',
  'Sport': 'sport',
  'Électronique': 'electronique',
  'Vêtements': 'vetements',
  'Maison': 'maison',
  'Jardinage': 'jardinage',
  'Autre': 'autre',
};

const CATEGORY_COLORS = {
  'Sport': 'bg-orange-50',
  'Électronique': 'bg-blue-50',
  'Vêtements': 'bg-pink-50',
  'Maison': 'bg-green-50',
  'Jardinage': 'bg-emerald-50',
  'Autre': 'bg-gray-50',
};

const ListeAnnonces = () => {
  const { utilisateur } = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'darija';

  const [annonces, setAnnonces] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [filtres, setFiltres] = useState({
    recherche: '',
    categorie: '',
    prixMin: '',
    prixMax: '',
    localisation: '',
  });

  const chargerAnnonces = async () => {
    setChargement(true);
    try {
      const params = {};
      if (filtres.recherche) params.recherche = filtres.recherche;
      if (filtres.categorie && filtres.categorie !== 'Tous') params.categorie = filtres.categorie;
      if (filtres.prixMin) params.prixMin = filtres.prixMin;
      if (filtres.prixMax) params.prixMax = filtres.prixMax;
      if (filtres.localisation) params.localisation = filtres.localisation;
      const res = await api.get('/annonces', { params });
      setAnnonces(res.data.annonces);
    } catch (err) {
      console.error(err);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => { chargerAnnonces(); }, []);

  const handleFiltrer = (e) => {
    e.preventDefault();
    chargerAnnonces();
  };

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ── */}
      <div className="bg-secondary-500 relative overflow-hidden">

        {/* Motif zellige */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #FF6D00 0, #FF6D00 1px, transparent 0, transparent 50%),
                              repeating-linear-gradient(-45deg, #FF6D00 0, #FF6D00 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Navigation */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-white font-bold text-xl">Lokatun</span>
          </div>
          <div className="flex gap-3 items-center">
            <LanguageSwitcher />
            <Link to="/annonces/creer" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
              {t('publier')}
            </Link>
            {utilisateur ? (
              <Link to="/dashboard" className="btn-ghost">
                {utilisateur.prenom}
              </Link>
            ) : (
              <Link to="/login" className="btn-ghost">
                {t('connexion')}
              </Link>
            )}
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500 bg-opacity-20 border border-primary-500 border-opacity-30 text-primary-300 px-4 py-2 rounded-full text-xs font-semibold mb-5">
            {t('heroBadge')}
          </div>
          <h1 className="text-white text-4xl font-extrabold leading-tight mb-3">
            {t('heroTitre').split(' ').slice(0, -1).join(' ')}<br />
            <span className="text-primary-500">{t('heroTitre').split(' ').slice(-1)}</span>
          </h1>
          <p className="text-blue-200 text-sm mb-7">{t('heroSousTitre')}</p>

          {/* Barre de recherche */}
          <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-2xl max-w-xl mx-auto mb-6">
            <input
              type="text"
              placeholder={t('heroRecherche')}
              value={filtres.recherche}
              onChange={(e) => setFiltres({ ...filtres, recherche: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && chargerAnnonces()}
              className="flex-1 px-3 py-2 text-sm focus:outline-none text-secondary-500 bg-transparent placeholder-gray-400"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <button
              onClick={chargerAnnonces}
              className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
            >
              {t('heroChercher')}
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10 pb-6">
            <div className="text-center">
              <p className="text-white font-bold text-xl">1,200+</p>
              <p className="text-blue-300 text-xs">{t('heroAnnonces')}</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-xl">24</p>
              <p className="text-blue-300 text-xs">{t('heroGouvernorats')}</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-xl">4.8★</p>
              <p className="text-blue-300 text-xs">{t('heroNote')}</p>
            </div>
          </div>
        </div>

        {/* Vague SVG */}
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full block" style={{ marginBottom: '-2px' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,50 L0,50 Z" fill="#FFF8F0" />
        </svg>
      </div>

      {/* ── Filtres catégories ── */}
      <div className="bg-sand-100 border-b border-orange-100 px-6 py-3 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleFiltrer} className="flex flex-wrap gap-2 items-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFiltres({ ...filtres, categorie: cat === 'Tous' ? '' : cat })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${
                  (filtres.categorie === '' && cat === 'Tous') || filtres.categorie === cat
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                }`}
              >
                {t(CATEGORY_KEYS[cat])}
              </button>
            ))}
            <div className="flex gap-2 ml-auto">
              <input
                type="text"
                placeholder={t('ville')}
                value={filtres.localisation}
                onChange={(e) => setFiltres({ ...filtres, localisation: e.target.value })}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              />
              <input
                type="number"
                placeholder={t('minDT')}
                value={filtres.prixMin}
                onChange={(e) => setFiltres({ ...filtres, prixMin: e.target.value })}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              />
              <input
                type="number"
                placeholder={t('maxDT')}
                value={filtres.prixMax}
                onChange={(e) => setFiltres({ ...filtres, prixMax: e.target.value })}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              />
              <button
                type="submit"
                className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                {t('filtrer')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Annonces ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {chargement ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Chargement...</p>
          </div>
        ) : annonces.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-secondary-500 font-bold text-xl">{t('aucuneAnnonce')}</p>
            <p className="text-gray-400 text-sm mt-2">{t('aucuneAnnonceSous')}</p>
            <Link to="/annonces/creer" className="inline-block mt-5 btn-primary">
              {t('publierAnnonce')}
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-400 text-sm mb-5">
              {annonces.length} {t('annoncesTrauvees')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {annonces.map((annonce) => (
                <Link to={`/annonces/${annonce.id}`} key={annonce.id}>
                  <div className="bg-white rounded-2xl border border-orange-50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden group">
                    <div className={`h-48 relative overflow-hidden ${CATEGORY_COLORS[annonce.categorie] || 'bg-gray-50'}`}>
                      {annonce.photos.length > 0 ? (
                        <img
                          src={annonce.photos[0].url}
                          alt={annonce.titre}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">📷</div>
                      )}
                      <span className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {t(CATEGORY_KEYS[annonce.categorie]) || annonce.categorie}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-secondary-500 truncate text-base">{annonce.titre}</h3>
                      <p className="text-gray-400 text-xs mt-1 truncate">{annonce.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <span className="text-primary-500 font-bold text-xl">{annonce.prixParJour}</span>
                          <span className="text-gray-400 text-xs"> DT{t('parJour')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <span>📍</span>
                          <span>{annonce.localisation}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-50">
                        <div className="w-5 h-5 bg-secondary-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {annonce.proprietaire.prenom[0]}
                          </span>
                        </div>
                        <span className="text-gray-500 text-xs">
                          {annonce.proprietaire.prenom} {annonce.proprietaire.nom}
                        </span>
                        <span className="text-yellow-400 text-xs ml-auto">⭐</span>
                        <span className="text-gray-400 text-xs">{annonce.proprietaire.noteMoyenne.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListeAnnonces;