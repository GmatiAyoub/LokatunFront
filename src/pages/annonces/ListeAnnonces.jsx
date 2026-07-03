// ============================================
// Lokatun — Page Liste des Annonces
// ============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = ['Tous', 'Sport', 'Électronique', 'Vêtements', 'Maison', 'Jardinage', 'Autre'];

const ListeAnnonces = () => {
  const { utilisateur } = useAuth();
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
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-secondary-500 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-white font-bold text-xl">Lokatun</span>
          </div>
          <div className="flex gap-3 items-center">
            <Link
              to="/annonces/creer"
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
            >
              + Publier
            </Link>
            {utilisateur ? (
              <Link
                to="/dashboard"
                className="text-white text-sm hover:text-primary-300 transition"
              >
                {utilisateur.prenom}
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-white text-sm hover:text-primary-300 transition"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-secondary-500 pb-8 px-6">
        <div className="max-w-3xl mx-auto text-center pt-6 pb-4">
          <h2 className="text-white text-3xl font-bold mb-2">
            Louez ce dont vous avez besoin
          </h2>
          <p className="text-blue-200 text-sm">
            La première plateforme de location entre particuliers en Tunisie
          </p>
        </div>

        {/* Barre de recherche principale */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleFiltrer} className="flex gap-2">
            <input
              type="text"
              placeholder="Rechercher un objet..."
              value={filtres.recherche}
              onChange={(e) => setFiltres({ ...filtres, recherche: e.target.value })}
              className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              🔍
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Filtres */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <form onSubmit={handleFiltrer} className="flex flex-wrap gap-3 items-end">
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFiltres({ ...filtres, categorie: cat === 'Tous' ? '' : cat })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    (filtres.categorie === '' && cat === 'Tous') || filtres.categorie === cat
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2 ml-auto">
              <input
                type="text"
                placeholder="Ville"
                value={filtres.localisation}
                onChange={(e) => setFiltres({ ...filtres, localisation: e.target.value })}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Min DT"
                value={filtres.prixMin}
                onChange={(e) => setFiltres({ ...filtres, prixMin: e.target.value })}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Max DT"
                value={filtres.prixMax}
                onChange={(e) => setFiltres({ ...filtres, prixMax: e.target.value })}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                Filtrer
              </button>
            </div>
          </form>
        </div>

        {/* Résultats */}
        {chargement ? (
          <div className="text-center text-gray-500 py-20">Chargement...</div>
        ) : annonces.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📦</p>
            <p className="text-gray-600 font-medium text-lg">Aucune annonce trouvée</p>
            <p className="text-gray-400 text-sm mt-2">Soyez le premier à publier !</p>
            <Link to="/annonces/creer" className="inline-block mt-4 btn-primary">
              Publier une annonce
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-4">{annonces.length} annonce(s) trouvée(s)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {annonces.map((annonce) => (
                <Link to={`/annonces/${annonce.id}`} key={annonce.id}>
                  <div className="card overflow-hidden group">
                    {/* Photo */}
                    <div className="h-48 bg-gray-100 overflow-hidden relative">
                      {annonce.photos.length > 0 ? (
                        <img
                          src={annonce.photos[0].url}
                          alt={annonce.titre}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                          📷
                        </div>
                      )}
                      <span className="absolute top-3 left-3 badge">
                        {annonce.categorie}
                      </span>
                    </div>
                    {/* Infos */}
                    <div className="p-4">
                      <h3 className="font-semibold text-secondary-500 truncate">{annonce.titre}</h3>
                      <p className="text-gray-400 text-xs mt-1 truncate">{annonce.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <span className="text-primary-500 font-bold text-lg">{annonce.prixParJour} DT</span>
                          <span className="text-gray-400 text-xs">/jour</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <span>📍</span>
                          <span>{annonce.localisation}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-400 text-xs">⭐</span>
                        <span className="text-gray-500 text-xs">
                          {annonce.proprietaire.noteMoyenne.toFixed(1)} — {annonce.proprietaire.prenom} {annonce.proprietaire.nom}
                        </span>
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