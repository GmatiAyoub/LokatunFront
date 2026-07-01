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
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        {/* Logo / Titre */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Lokatun</h1>
          <p className="text-gray-500 mt-1">Connectez-vous à votre compte</p>
        </div>

        {/* Message d'erreur */}
        {erreur && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Mot de passe */}
          <input
            type="password"
            name="motDePasse"
            placeholder="Mot de passe"
            value={formData.motDePasse}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Bouton */}
          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {chargement ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Lien inscription */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            S'inscrire
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;