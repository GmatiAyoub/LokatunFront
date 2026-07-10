// ============================================
// Lokatun — Page Dashboard
// ============================================
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Dashboard = () => {
  const { utilisateur, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'darija';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-sand-100" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Header */}
      <div className="bg-secondary-500 px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link to="/annonces" className="flex items-center gap-2 text-white hover:text-primary-300 transition">
            <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold">Lokatun</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Profil */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-secondary-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {utilisateur?.prenom?.[0]}
              </span>
            </div>
            <div>
              <p className="font-bold text-secondary-500 text-xl">
                {utilisateur?.prenom} {utilisateur?.nom}
              </p>
              <p className="text-gray-500 text-sm">{utilisateur?.email}</p>
              <p className="text-gray-500 text-sm">{utilisateur?.telephone}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-secondary-500 text-white px-3 py-1 rounded-full font-medium">
                  {utilisateur?.role}
                </span>
                <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full font-medium">
                  ⭐ {utilisateur?.noteMoyenne?.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 gap-3">

          <Link to="/annonces/creer" className="btn-primary text-center">
            {t('publierAnnonce')}
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/mes-reservations"
              className="card p-4 text-center hover:border-primary-200 border border-transparent"
            >
              <p className="text-2xl mb-1">📅</p>
              <p className="font-semibold text-secondary-500 text-sm">{t('mesReservations')}</p>
            </Link>
            <Link
              to="/reservations-recues"
              className="card p-4 text-center hover:border-primary-200 border border-transparent"
            >
              <p className="text-2xl mb-1">📬</p>
              <p className="font-semibold text-secondary-500 text-sm">{t('reservationsRecues')}</p>
            </Link>
          </div>

          <Link
            to="/annonces"
            className="card p-4 text-center hover:border-primary-200 border border-transparent"
          >
            <p className="text-2xl mb-1">🔍</p>
            <p className="font-semibold text-secondary-500 text-sm">{t('parcourirAnnonces')}</p>
          </Link>

          <Link
            to="/signaler-litige"
            className="card p-4 text-center border border-orange-200 hover:bg-orange-50 transition"
          >
            <p className="text-2xl mb-1">⚠️</p>
            <p className="font-semibold text-primary-500 text-sm">{t('signalerProbleme')}</p>
          </Link>

          {utilisateur?.role === 'ADMIN' && (
            <Link
              to="/admin"
              className="card p-4 text-center border border-purple-200 hover:bg-purple-50 transition"
            >
              <p className="text-2xl mb-1">👑</p>
              <p className="font-semibold text-purple-600 text-sm">{t('panelAdmin')}</p>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
          >
            {t('seDeconnecter')}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;