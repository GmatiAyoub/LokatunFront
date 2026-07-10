// ============================================
// Lokatun — Bouton changement de langue
// ============================================
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'darija' : 'fr');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white border border-white border-opacity-20 px-3 py-2 rounded-xl text-sm font-medium transition"
      dir="auto"
    >
      {i18n.language === 'fr' ? (
        <>
          <span>🇹🇳</span>
          <span>عربي</span>
        </>
      ) : (
        <>
          <span>🇫🇷</span>
          <span>FR</span>
        </>
      )}
    </button>
  );
};

export default LanguageSwitcher;