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

  ar: {
    translation: {
      // Navigation
      publier: '+ نشر إعلان',
      connexion: 'تسجيل الدخول',
      monCompte: 'حسابي',
      retour: '→',

      // Hero
      heroBadge: '📍 أول منصة تونسية لتأجير الأغراض بين الأفراد',
      heroTitre: 'استأجر ما تحتاجه',
      heroSousTitre: 'بين الأفراد، في جميع أنحاء تونس — بسيط، سريع وموثوق',
      heroRecherche: 'ماذا تبحث عنه؟ (دراجة، خيمة، جهاز...)',
      heroChercher: '🔍 بحث',
      heroAnnonces: 'إعلان نشط',
      heroGouvernorats: 'ولاية',
      heroNote: 'متوسط التقييم',

      // Filtres
      tous: 'الكل',
      filtrer: 'تصفية',
      ville: 'المدينة',
      minDT: 'أدنى DT',
      maxDT: 'أقصى DT',

      // Annonces
      annoncesTrauvees: 'إعلان(ات) موجودة',
      aucuneAnnonce: 'لا توجد إعلانات',
      aucuneAnnonceSous: 'كن أول من ينشر إعلاناً !',
      parJour: '/يوم',
      publierAnnonce: '+ نشر إعلان',

      // Auth
      creerCompte: 'إنشاء حساب مجاني',
      connecterCompte: 'تسجيل الدخول إلى حسابك',
      nom: 'اللقب',
      prenom: 'الاسم',
      email: 'البريد الإلكتروني',
      telephone: 'رقم الهاتف',
      motDePasse: 'كلمة المرور',
      sInscrire: 'إنشاء حساب',
      seConnecter: 'تسجيل الدخول',
      dejaunCompte: 'لديك حساب بالفعل ؟',
      pasEncoreCompte: 'ليس لديك حساب بعد ؟',

      // Dashboard
      connecteEn: 'متصل بوصفك',
      mesReservations: 'حجوزاتي',
      reservationsRecues: 'الحجوزات المستلمة',
      parcourirAnnonces: 'تصفح الإعلانات',
      signalerProbleme: '⚠️ الإبلاغ عن مشكلة',
      panelAdmin: '👑 لوحة الإدارة',
      seDeconnecter: 'تسجيل الخروج',

      // Réservations
      enAttente: 'قيد الانتظار',
      acceptee: 'مقبول',
      payee: 'مدفوع',
      refusee: 'مرفوض',
      annulee: 'ملغى',
      terminee: 'مكتمل',
      montantBase: 'المبلغ الأساسي',
      fraisService: 'رسوم الخدمة (5%)',
      total: 'المجموع',
      paiement: 'طريقة الدفع',
      annulerReservation: 'إلغاء الحجز',
      payerFrais: '💳 دفع رسوم Lokatun',
      contactProprietaire: 'معلومات صاحب الغرض',
      contactDebloque: '💰 تم تأكيد الدفع — تم فتح معلومات الاتصال !',
      organiserRemise: 'تواصل معه لترتيب تسليم الغرض',

      // Détail annonce
      proposePar: 'مقدم من',
      reserverObjet: 'استئجار هذا الغرض',
      dateDebut: 'تاريخ البداية',
      dateFin: 'تاريخ النهاية',
      methodePaiement: 'طريقة الدفع',
      cashRemise: '💵 نقداً عند التسليم',
      carteBancaire: '💳 بطاقة بنكية / D17 (عبر Konnect)',
      demanderReservation: 'طلب الحجز',
      supprimerAnnonce: 'حذف الإعلان',
      seConnecterReserver: 'سجّل دخولك للاستئجار',

      // Catégories
      sport: 'رياضة',
      electronique: 'إلكترونيات',
      vetements: 'ملابس',
      maison: 'منزل',
      jardinage: 'بستنة',
      autre: 'أخرى',
    },
  },

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