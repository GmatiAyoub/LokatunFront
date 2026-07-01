// ============================================
// Lokatun — Page Liste des Annonces
// ============================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const CATEGORIES = ['Tous', 'Sport', 'Électronique', 'Vêtements', 'Maison', 'Jardinage', 'Autre'];

const ListeAnnonces = () => {
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

  useEffect(() => {
    chargerAnnonces();
  }, []);

  const handleFiltrer = (e) => {
    e.preventDefault();
    chargerAnnonces();
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Lokatun</h1>
        <div className="flex gap-3">
          <Link to="/annonces/creer" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            + Publier une annonce
          </Link>
          <Link to="/dashboard" className="text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
            Mon compte
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Filtres */}
        <form onSubmit={handleFiltrer} className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Rechercher un objet..."
              value={filtres.recherche}
              onChange={(e) => setFiltres({ ...filtres, recherche: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filtres.categorie}
              onChange={(e) => setFiltres({ ...filtres, categorie: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat === 'Tous' ? '' : cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Ville (ex: Tunis)"
              value={filtres.localisation}
              onChange={(e) => setFiltres({ ...filtres, localisation: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Prix min (DT)"
              value={filtres.prixMin}
              onChange={(e) => setFiltres({ ...filtres, prixMin: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Prix max (DT)"
              value={filtres.prixMax}
              onChange={(e) => setFiltres({ ...filtres, prixMax: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700"
            >
              Rechercher
            </button>
          </div>
        </form>

        {/* Résultats */}
        {chargement ? (
          <div className="text-center text-gray-500 py-20">Chargement...</div>
        ) : annonces.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg">Aucune annonce trouvée</p>
            <p className="text-sm mt-2">Soyez le premier à publier une annonce !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {annonces.map((annonce) => (
              <Link to={`/annonces/${annonce.id}`} key={annonce.id}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
                  {/* Photo */}
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    {annonce.photos.length > 0 ? (
                      <img
                        src={annonce.photos[0].url}
                        alt={annonce.titre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Pas de photo
                      </div>
                    )}
                  </div>
                  {/* Infos */}
                  <div className="p-4">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                      {annonce.categorie}
                    </span>
                    <h3 className="font-semibold text-gray-800 mt-2">{annonce.titre}</h3>
                    <p className="text-gray-500 text-sm mt-1 truncate">{annonce.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-blue-600 font-bold">{annonce.prixParJour} DT/jour</span>
                      <span className="text-gray-400 text-xs">{annonce.localisation}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListeAnnonces;