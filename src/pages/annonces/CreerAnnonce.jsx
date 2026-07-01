// ============================================
// Lokatun — Page Créer une Annonce
// ============================================
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

const CATEGORIES = ['Sport', 'Électronique', 'Vêtements', 'Maison', 'Jardinage', 'Autre'];

const CreerAnnonce = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    categorie: 'Sport',
    prixParJour: '',
    localisation: '',
  });
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotos = (e) => {
    const fichiers = Array.from(e.target.files);
    setPhotos(fichiers);
    setPreviews(fichiers.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');

    if (photos.length === 0) {
      setErreur('Au moins une photo est obligatoire');
      return;
    }

    if (parseFloat(formData.prixParJour) < 1) {
      setErreur('Le prix minimum est de 1 DT par jour');
      return;
    }

    setChargement(true);

    try {
      const data = new FormData();
      data.append('titre', formData.titre);
      data.append('description', formData.description);
      data.append('categorie', formData.categorie);
      data.append('prixParJour', formData.prixParJour);
      data.append('localisation', formData.localisation);
      photos.forEach((photo) => data.append('photos', photo));

      await api.post('/annonces', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/annonces');
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
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Publier une annonce</h2>

          {erreur && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {erreur}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="titre"
              placeholder="Titre de l'annonce"
              value={formData.titre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="description"
              placeholder="Description de l'objet"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="flex gap-3">
              <input
                type="number"
                name="prixParJour"
                placeholder="Prix par jour (DT)"
                value={formData.prixParJour}
                onChange={handleChange}
                required
                min="1"
                className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="localisation"
                placeholder="Ville (ex: Tunis)"
                value={formData.localisation}
                onChange={handleChange}
                required
                className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload photos */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotos}
                className="hidden"
                id="photos"
              />
              <label htmlFor="photos" className="cursor-pointer">
                <p className="text-gray-500 text-sm">Cliquez pour ajouter des photos</p>
                <p className="text-gray-400 text-xs mt-1">Max 5 photos • JPG, PNG, WEBP</p>
              </label>
            </div>

            {/* Previews */}
            {previews.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {previews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={chargement}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              {chargement ? 'Publication en cours...' : 'Publier l\'annonce'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreerAnnonce;