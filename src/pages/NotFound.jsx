// ============================================
// Lokatun — Page 404
// ============================================
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-secondary-500 px-6 py-4 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/annonces" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-white font-bold text-xl">Lokatun</span>
          </Link>
        </div>
      </div>

      <div className="text-center mt-16">

        {/* Illustration */}
        <div className="relative inline-block mb-8">
          <div className="w-40 h-40 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-7xl">📦</span>
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">?</span>
          </div>
        </div>

        {/* Texte */}
        <h1 className="text-8xl font-extrabold text-secondary-500 mb-4">
          4<span className="text-primary-500">0</span>4
        </h1>
        <h2 className="text-2xl font-bold text-secondary-500 mb-3">
          {isRTL ? 'الصفحة غير موجودة' : 'Page introuvable'}
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
          {isRTL
            ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
            : 'La page que vous cherchez n\'existe pas ou a été déplacée.'
          }
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/annonces" className="btn-primary">
            {isRTL ? '🏠 العودة للرئيسية' : '🏠 Retour à l\'accueil'}
          </Link>
          <Link
            to="/dashboard"
            className="bg-white hover:bg-gray-50 text-secondary-500 font-semibold py-3 px-6 rounded-xl transition border border-gray-200"
          >
            {isRTL ? 'حسابي' : 'Mon compte'}
          </Link>
        </div>

        {/* Pages utiles */}
        <div className="mt-10">
          <p className="text-gray-400 text-sm mb-4">
            {isRTL ? 'صفحات مفيدة :' : 'Pages utiles :'}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/annonces" className="text-primary-500 hover:underline text-sm">
              {isRTL ? 'الإعلانات' : 'Annonces'}
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/annonces/creer" className="text-primary-500 hover:underline text-sm">
              {isRTL ? 'نشر إعلان' : 'Publier'}
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/login" className="text-primary-500 hover:underline text-sm">
              {isRTL ? 'تسجيل الدخول' : 'Connexion'}
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/register" className="text-primary-500 hover:underline text-sm">
              {isRTL ? 'إنشاء حساب' : 'Inscription'}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;