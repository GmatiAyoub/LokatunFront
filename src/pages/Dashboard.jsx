// ============================================
// Lokatun — Page Dashboard
// ============================================
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import useNotifications from '../hooks/useNotifications';

const Badge = ({ count }) => {
  if (!count || count === 0) return null;
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
      {count > 9 ? '9+' : count}
    </span>
  );
};

const Dashboard = () => {
  const { utilisateur, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { notifications } = useNotifications();

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
          <div className="flex items-center gap-3">
            {notifications.total > 0 && (
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                {notifications.total} action(s) requise(s)
              </div>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Alertes importantes */}
        {notifications.aPayerLocataire > 0 && (
          <div className="bg-primary-500 text-white rounded-2xl p-4 mb-4 flex justify-between items-center">
            <div>
              <p className="font-bold text-sm">💳 Paiement requis !</p>
              <p className="text-xs text-orange-100 mt-1">
                {notifications.aPayerLocataire} réservation(s) acceptée(s) — payez les frais Lokatun
              </p>
            </div>
            <Link
              to="/mes-reservations"
              className="bg-white text-primary-500 text-xs font-bold px-3 py-2 rounded-xl"
            >
              Voir →
            </Link>
          </div>
        )}

        {notifications.enAttente > 0 && (
          <div className="bg-yellow-500 text-white rounded-2xl p-4 mb-4 flex justify-between items-center">
            <div>
              <p className="font-bold text-sm">⏳ Réservations en attente !</p>
              <p className="text-xs text-yellow-100 mt-1">
                {notifications.enAttente} demande(s) à accepter ou refuser
              </p>
            </div>
            <Link
              to="/reservations-recues"
              className="bg-white text-yellow-600 text-xs font-bold px-3 py-2 rounded-xl"
            >
              Voir →
            </Link>
          </div>
        )}

        {notifications.payees > 0 && (
  <div className="bg-green-500 text-white rounded-2xl p-4 mb-4 flex justify-between items-center">
    <div>
      <p className="font-bold text-sm">💰 Commission à payer !</p>
      <p className="text-xs text-green-100 mt-1">
        {notifications.payees} location(s) payée(s) — payez votre commission pour continuer
      </p>
    </div>
    <Link
      to="/reservations-recues"
      className="bg-white text-green-600 text-xs font-bold px-3 py-2 rounded-xl"
    >
      Voir →
    </Link>
  </div>
)}
        {notifications.commissionPayees > 0 && (
  <div className="bg-purple-500 text-white rounded-2xl p-4 mb-4 flex justify-between items-center">
    <div>
      <p className="font-bold text-sm">🏁 Location prête à terminer !</p>
      <p className="text-xs text-purple-100 mt-1">
        {notifications.commissionPayees} location(s) — commission confirmée, marquez comme terminée
      </p>
    </div>
    <Link
      to="/reservations-recues"
      className="bg-white text-purple-600 text-xs font-bold px-3 py-2 rounded-xl"
    >
      Voir →
    </Link>
  </div>
)}

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
              className="card p-4 text-center hover:border-primary-200 border border-transparent relative"
            >
              <p className="text-2xl mb-1">📅</p>
              <p className="font-semibold text-secondary-500 text-sm">{t('mesReservations')}</p>
              {notifications.aPayerLocataire > 0 && (
                <div className="absolute -top-2 -right-2">
                  <Badge count={notifications.aPayerLocataire} />
                </div>
              )}
            </Link>
            <Link
  to="/reservations-recues"
  className="card p-4 text-center hover:border-primary-200 border border-transparent relative"
>
  <p className="text-2xl mb-1">📬</p>
  <p className="font-semibold text-secondary-500 text-sm">{t('reservationsRecues')}</p>
  {(notifications.enAttente + notifications.payees + notifications.commissionPayees) > 0 && (
    <div className="absolute -top-2 -right-2">
      <Badge count={notifications.enAttente + notifications.payees + notifications.commissionPayees} />
    </div>
  )}
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