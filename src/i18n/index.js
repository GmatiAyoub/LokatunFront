// ============================================
// Lokatun — Traductions FR / Darija (عربي)
// ============================================
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      // Navigation
      publier: '+ Publier',
      connexion: 'Connexion',
      monCompte: 'Mon compte',
      retour: '←',

      // Hero
      heroBadge: '📍 La première plateforme tunisienne de location',
      heroTitre: 'Louez ce dont vous avez besoin',
      heroSousTitre: 'Entre particuliers, partout en Tunisie — simple, rapide et fiable',
      heroRecherche: 'Que cherchez-vous ? (vélo, tente, appareil...)',
      heroChercher: '🔍 Chercher',
      heroAnnonces: 'Annonces actives',
      heroGouvernorats: 'Gouvernorats',
      heroNote: 'Note moyenne',

      // Filtres
      tous: 'Tous',
      filtrer: 'Filtrer',
      ville: 'Ville',
      minDT: 'Min DT',
      maxDT: 'Max DT',

      // Annonces
      annoncesTrauvees: 'annonce(s) trouvée(s)',
      aucuneAnnonce: 'Aucune annonce trouvée',
      aucuneAnnonceSous: 'Soyez le premier à publier !',
      parJour: '/jour',
      publierAnnonce: '+ Publier une annonce',

      // Auth
      creerCompte: 'Créer votre compte gratuitement',
      connecterCompte: 'Connectez-vous à votre compte',
      nom: 'Nom',
      prenom: 'Prénom',
      email: 'Adresse email',
      telephone: 'Téléphone',
      motDePasse: 'Mot de passe',
      sInscrire: "S'inscrire gratuitement",
      seConnecter: 'Se connecter',
      dejaunCompte: 'Déjà un compte ?',
      pasEncoreCompte: 'Pas encore de compte ?',

      // Dashboard
      connecteEn: 'Connecté en tant que',
      mesReservations: 'Mes réservations',
      reservationsRecues: 'Réservations reçues',
      parcourirAnnonces: 'Parcourir les annonces',
      signalerProbleme: '⚠️ Signaler un problème',
      panelAdmin: '👑 Panel Admin',
      seDeconnecter: 'Se déconnecter',

      // Réservations
      enAttente: 'EN ATTENTE',
      acceptee: 'ACCEPTEE',
      payee: 'PAYEE',
      refusee: 'REFUSEE',
      annulee: 'ANNULEE',
      terminee: 'TERMINEE',
      montantBase: 'Montant de base',
      fraisService: 'Frais de service (5%)',
      total: 'Total',
      paiement: 'Paiement',
      annulerReservation: 'Annuler la réservation',
      payerFrais: '💳 Payer les frais Lokatun',
      contactProprietaire: 'Contact du propriétaire',
      contactDebloque: '💰 Paiement confirmé — Contact débloqué !',
      organiserRemise: "Contactez-le pour organiser la remise de l'objet",

      // Détail annonce
      proposePar: 'Proposé par',
      reserverObjet: 'Réserver cet objet',
      dateDebut: 'Date de début',
      dateFin: 'Date de fin',
      methodePaiement: 'Méthode de paiement',
      cashRemise: '💵 Cash à la remise',
      carteBancaire: '💳 Carte bancaire / D17 (via Konnect)',
      demanderReservation: 'Demander la réservation',
      supprimerAnnonce: "Supprimer l'annonce",
      seConnecterReserver: 'Connectez-vous pour réserver',

      // Catégories
      sport: 'Sport',
      electronique: 'Électronique',
      vetements: 'Vêtements',
      maison: 'Maison',
      jardinage: 'Jardinage',
      autre: 'Autre',
    },
  },

  darija: {
    translation: {
      // Navigation
      publier: '+ نشر',
      connexion: 'دخول',
      monCompte: 'حسابي',
      retour: '→',

      // Hero
      heroBadge: '📍 أول منصة تونسية للكراء بين الأفراد',
      heroTitre: 'كري اللي تحتاجو',
      heroSousTitre: 'بين الأفراد، في كل تونس — سهل، سريع وموثوق',
      heroRecherche: 'شنو تحب تلقى؟ (بيسكليت، خيمة، جهاز...)',
      heroChercher: '🔍 قلّي',
      heroAnnonces: 'إعلانات نشيطة',
      heroGouvernorats: 'ولاية',
      heroNote: 'معدّل التقييم',

      // Filtres
      tous: 'الكل',
      filtrer: 'فلتر',
      ville: 'المدينة',
      minDT: 'أقل DT',
      maxDT: 'أكثر DT',

      // Annonces
      annoncesTrauvees: 'إعلان/ات لقيناهم',
      aucuneAnnonce: 'ما لقيناش والو',
      aucuneAnnonceSous: 'كن أول واحد ينشر !',
      parJour: '/نهار',
      publierAnnonce: '+ زيد إعلان',

      // Auth
      creerCompte: 'سجّل حساب جديد',
      connecterCompte: 'دخل لحسابك',
      nom: 'اللقب',
      prenom: 'الاسم',
      email: 'البريد الإلكتروني',
      telephone: 'رقم الهاتف',
      motDePasse: 'كلمة السر',
      sInscrire: 'سجّل حساب',
      seConnecter: 'دخول',
      dejaunCompte: 'عندك حساب ؟',
      pasEncoreCompte: 'مازلت ما عندكش حساب ؟',

      // Dashboard
      connecteEn: 'داخل بـ',
      mesReservations: 'ريزرفاسيوني متاعي',
      reservationsRecues: 'ريزرفاسيوني جاتني',
      parcourirAnnonces: 'شوف الإعلانات',
      signalerProbleme: '⚠️ بلّغ على مشكلة',
      panelAdmin: '👑 لوحة الأدمين',
      seDeconnecter: 'اخرج',

      // Réservations
      enAttente: 'دايرني نستنّى',
      acceptee: 'مقبول',
      payee: 'مخلّص',
      refusee: 'مرفوض',
      annulee: 'ملغي',
      terminee: 'كمل',
      montantBase: 'المبلغ الأساسي',
      fraisService: 'رسوم لوكاتون (5%)',
      total: 'المجموع',
      paiement: 'الخلاص',
      annulerReservation: 'ألغي الريزرفاسيون',
      payerFrais: '💳 خلّص رسوم لوكاتون',
      contactProprietaire: 'كونتاكت صاحب الحاجة',
      contactDebloque: '💰 مخلّص — الكونتاكت مفتوح !',
      organiserRemise: 'كلّمو باش ترتّبوا التسليم',

      // Détail annonce
      proposePar: 'متاع',
      reserverObjet: 'ريزرفي هذه الحاجة',
      dateDebut: 'تاريخ البداية',
      dateFin: 'تاريخ النهاية',
      methodePaiement: 'طريقة الخلاص',
      cashRemise: '💵 كاش وقت التسليم',
      carteBancaire: '💳 كارط / D17 (عبر Konnect)',
      demanderReservation: 'طلب ريزرفاسيون',
      supprimerAnnonce: 'امسح الإعلان',
      seConnecterReserver: 'دخل باش تريزرفي',

      // Catégories
      sport: 'رياضة',
      electronique: 'إلكترونيك',
      vetements: 'حداية',
      maison: 'دار',
      jardinage: 'جردينة',
      autre: 'أخرى',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;