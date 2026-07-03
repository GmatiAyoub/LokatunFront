// ============================================
// Lokatun — Page Connexion
// ============================================
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    motDePasse: '',
  });

  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');
    setChargement(true);

    try {
      const res = await api.post('/auth/login', formData);
      login(res.data.token, res.data.utilisateur);
      navigate('/annonces');
    } catch (err) {
      setErreur(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
            <span className="text-white text-2xl font-bold">L</span>
          </div>
          <h1 className="text-3xl font-bold text-secondary-500">Lokatun</h1>
          <p className="text-gray-500 mt-1">Connectez-vous à votre compte</p>
        </div>

        <div className="card p-8">

          {erreur && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4 border border-red-100">
              {erreur}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Mot de passe</label>
              <input
                type="password"
                name="motDePasse"
                placeholder="••••••••"
                value={formData.motDePasse}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={chargement}
              className="w-full btn-primary disabled:opacity-50"
            >
              {chargement ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-primary-500 font-semibold hover:underline">
                S'inscrire gratuitement
              </Link>
            </p>
          </div>

        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2025 Lokatun — Location entre particuliers en Tunisie
        </p>

      </div>
    </div>
  );
};

export default Login;