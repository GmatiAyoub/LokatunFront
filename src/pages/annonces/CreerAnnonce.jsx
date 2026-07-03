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
      <div className="bg-secondary-500 px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link to="/annonces" className="flex items-center gap-2 text-white hover:text-primary-300 transition">
            <span>←</span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-bold">Lokatun</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="card p-8">

          <h2 className="text-2xl font-bold text-secondary-500 mb-2">Publier une annonce</h2>
          <p className="text-gray-500 text-sm mb-6">Remplissez les informations de votre objet</p>

          {erreur && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4 border border-red-100">
              {erreur}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Titre de l'annonce</label>
              <input
                type="text"
                name="titre"
                placeholder="Ex: Vélo de montagne Trek"
                value={formData.titre}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
              <textarea
                name="description"
                placeholder="Décrivez votre objet en détail..."
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Catégorie</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, categorie: cat })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                      formData.categorie === cat
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Prix / jour (DT)</label>
                <input
                  type="number"
                  name="prixParJour"
                  placeholder="Ex: 25"
                  value={formData.prixParJour}
                  onChange={handleChange}
                  required
                  min="1"
                  className="input-field"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Ville</label>
                <input
                  type="text"
                  name="localisation"
                  placeholder="Ex: Tunis"
                  value={formData.localisation}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            {/* Upload photos */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Photos</label>
              <label
                htmlFor="photos"
                className="flex flex-col items-center justify-center border-2 border-dashed border-primary-300 rounded-xl p-8 cursor-pointer hover:border-primary-500 hover:bg-orange-50 transition"
              >
                <span className="text-3xl mb-2">📷</span>
                <p className="text-gray-500 text-sm font-medium">Cliquez pour ajouter des photos</p>
                <p className="text-gray-400 text-xs mt-1">Max 5 photos • JPG, PNG, WEBP • 5MB max</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotos}
                  className="hidden"
                  id="photos"
                />
              </label>

              {previews.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-3">
                  {previews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-20 h-20 object-cover rounded-xl border-2 border-primary-200"
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={chargement}
              className="w-full btn-primary disabled:opacity-50"
            >
              {chargement ? 'Publication en cours...' : '🚀 Publier l\'annonce'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreerAnnonce;