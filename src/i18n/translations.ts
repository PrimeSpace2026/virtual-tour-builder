export type Lang = "fr" | "en";

export const translations = {
  // ─── Navbar ───
  nav: {
    home: { fr: "Accueil", en: "Home" },
    portfolio: { fr: "Portfolio", en: "Portfolio" },
    solutions: { fr: "Solutions", en: "Solutions" },
    about: { fr: "À Propos", en: "About" },
    contact: { fr: "Contact", en: "Contact" },
    cta: { fr: "Demander un Devis", en: "Request a Quote" },
    services: { fr: "Services", en: "Services" },
    industries: { fr: "Pour Votre Secteur", en: "For Your Industry" },
    industryItems: {
      commercialRealEstate: { fr: "Immobilier Commercial", en: "Commercial Real Estate" },
      architecture: { fr: "Architecture & Construction", en: "Architecture & Construction" },
      manufacturing: { fr: "Industrie", en: "Manufacturing" },
      insurance: { fr: "Assurance", en: "Insurance" },
      residentialConstruction: { fr: "Construction Résidentielle", en: "Residential Construction" },
      travelHospitality: { fr: "Tourisme & Hôtellerie", en: "Travel & Hospitality" },
      commerceRetail: { fr: "Commerce & Retail", en: "Commerce & Retail" },
      residentialRealEstate: { fr: "Immobilier Résidentiel", en: "Residential Real Estate" },
      government: { fr: "Gouvernement", en: "Government" },
      energy: { fr: "Énergie & Utilités", en: "Energy & Utilities" },
      oilGas: { fr: "Pétrole & Gaz", en: "Oil & Gas" },
    },
  },

  // ─── Footer ───
  footer: {
    brand: {
      fr: "Transformez vos espaces en expériences immersives. Visites virtuelles 3D professionnelles en Tunisie.",
      en: "Transform your spaces into immersive experiences. Professional 3D virtual tours in Tunisia.",
    },
    services: { fr: "Services", en: "Services" },
    virtualTours: { fr: "Visites Virtuelles 360°", en: "360° Virtual Tours" },
    plans2d3d: { fr: "Plans 2D/3D", en: "2D/3D Floor Plans" },
    hdrPhoto: { fr: "Photographie HDR", en: "HDR Photography" },
    immersiveVideos: { fr: "Vidéos Immersives", en: "Immersive Videos" },
    company: { fr: "Entreprise", en: "Company" },
    aboutLink: { fr: "À Propos", en: "About" },
    portfolioLink: { fr: "Portfolio", en: "Portfolio" },
    contactLink: { fr: "Contact", en: "Contact" },
    sectors: { fr: "Secteurs", en: "Industries" },
    realEstate: { fr: "Immobilier", en: "Real Estate" },
    hospitality: { fr: "Hôtellerie", en: "Hospitality" },
    commerce: { fr: "Commerce", en: "Commerce" },
    culture: { fr: "Culture", en: "Culture" },
    copyright: { fr: "© 2026 Visite3D. Tous droits réservés.", en: "© 2026 Visite3D. All rights reserved." },
  },

  // ─── Landing Page (Index) ───
  home: {
    heroBadge: { fr: "Visites Virtuelles 3D", en: "3D Virtual Tours" },
    heroTitle: {
      fr: "Offrez la visite **avant la réservation**",
      en: "Build Booking Confidence With **Digital Twin Experiences**",
    },
    heroSubtitle: {
      fr: "Augmentez vos réservations et facilitez les visites grâce à nos visites virtuelles 3D.",
      en: "Unlock the full potential of your space with our 3D Virtual tour solutions.",
    },
    heroCta: { fr: "Demander un Devis", en: "Request a Quote" },
    portfolioBadge: { fr: "Portfolio", en: "Portfolio" },
    portfolioTitle: { fr: "Nos Dernières Réalisations", en: "Our Latest Projects" },
    portfolioDesc: {
      fr: "Découvrez quelques-unes de nos visites virtuelles les plus récentes",
      en: "Discover some of our most recent virtual tours",
    },
    viewPortfolio: { fr: "Voir Tout le Portfolio", en: "View Full Portfolio" },
    featuresBadge: { fr: "Nos Avantages", en: "Our Advantages" },
    featuresTitle: { fr: "Pourquoi Choisir PrimeSpace ?", en: "Why Choose PrimeSpace?" },
    features: {
      capture: { fr: "Capture 3D Précise", en: "Precise 3D Capture" },
      captureDesc: {
        fr: "Technologie de pointe pour une numérisation fidèle de chaque détail de votre espace.",
        en: "Cutting-edge technology for faithful digitization of every detail of your space.",
      },
      immersion: { fr: "Immersion Totale", en: "Total Immersion" },
      immersionDesc: {
        fr: "Expérience immersive à 360° qui plonge vos visiteurs au cœur de votre espace.",
        en: "360° immersive experience that takes your visitors to the heart of your space.",
      },
      compatible: { fr: "Compatible Tous Appareils", en: "Compatible with All Devices" },
      compatibleDesc: {
        fr: "Accessible sur ordinateur, tablette et mobile, sans installation requise.",
        en: "Accessible on desktop, tablet, and mobile, with no installation required.",
      },
      sharing: { fr: "Partage Facile", en: "Easy Sharing" },
      sharingDesc: {
        fr: "Partagez votre visite virtuelle en un clic via un lien ou intégrez-la à votre site.",
        en: "Share your virtual tour with one click via a link or embed it on your website.",
      },
      delivery: { fr: "Livraison Rapide", en: "Fast Delivery" },
      deliveryDesc: {
        fr: "Recevez votre visite virtuelle en quelques jours seulement.",
        en: "Receive your virtual tour in just a few days.",
      },
      quality: { fr: "Qualité Garantie", en: "Guaranteed Quality" },
      qualityDesc: {
        fr: "Des rendus professionnels qui mettent en valeur chaque aspect de votre espace.",
        en: "Professional renderings that highlight every aspect of your space.",
      },
    },
    testimonialsBadge: { fr: "Témoignages", en: "Testimonials" },
    testimonialsTitle: { fr: "Ce Que Disent Nos Clients", en: "What Our Clients Say" },
    faqTitle: { fr: "Questions Fréquentes", en: "Frequently Asked Questions" },
    faq: [
      {
        q: { fr: "Qu'est-ce qu'une visite virtuelle 3D ?", en: "What is a 3D virtual tour?" },
        a: {
          fr: "C'est une reproduction numérique interactive d'un espace physique, permettant une exploration à 360° depuis n'importe quel appareil.",
          en: "It's an interactive digital reproduction of a physical space, allowing 360° exploration from any device.",
        },
      },
      {
        q: { fr: "Combien de temps prend la réalisation ?", en: "How long does it take?" },
        a: {
          fr: "La capture prend généralement 1 à 3 heures selon la taille de l'espace, et le traitement 2 à 5 jours ouvrables.",
          en: "Capture typically takes 1 to 3 hours depending on space size, and processing takes 2 to 5 business days.",
        },
      },
      {
        q: { fr: "Quels types d'espaces pouvez-vous numériser ?", en: "What types of spaces can you scan?" },
        a: {
          fr: "Nous numérisons tous types d'espaces : immobilier, hôtels, restaurants, commerces, musées, bureaux et plus.",
          en: "We scan all types of spaces: real estate, hotels, restaurants, shops, museums, offices and more.",
        },
      },
      {
        q: { fr: "Comment accède-t-on à la visite virtuelle ?", en: "How do you access the virtual tour?" },
        a: {
          fr: "Via un simple lien web, accessible depuis n'importe quel navigateur sans application à installer.",
          en: "Via a simple web link, accessible from any browser with no app to install.",
        },
      },
      {
        q: { fr: "Quels sont vos tarifs ?", en: "What are your rates?" },
        a: {
          fr: "Nos tarifs varient selon la taille et la complexité de l'espace. Contactez-nous pour un devis personnalisé gratuit.",
          en: "Our rates vary based on space size and complexity. Contact us for a free personalized quote.",
        },
      },
      {
        q: { fr: "Couvrez-vous tout le territoire tunisien ?", en: "Do you cover all of Tunisia?" },
        a: {
          fr: "Oui, nous intervenons sur l'ensemble du territoire tunisien avec un service clé en main.",
          en: "Yes, we operate across all of Tunisia with a turnkey service.",
        },
      },
    ],
    ctaTitle: { fr: "Prêt à Transformer Votre Espace?", en: "Ready to Transform Your Space?" },
    ctaSubtitle: {
      fr: "Contactez-nous dès aujourd'hui pour un devis gratuit et découvrez comment nos visites virtuelles 3D peuvent transformer votre activité.",
      en: "Contact us today for a free quote and discover how our 3D virtual tours can transform your business.",
    },
    ctaButton: { fr: "Demander un Devis Gratuit", en: "Request a Free Quote" },
    ctaButton2: { fr: "Découvrir Nos Services", en: "Discover Our Services" },
  },

  // ─── Portfolio ───
  portfolio: {
    title: { fr: "Notre Portfolio", en: "Our Portfolio" },
    subtitle: {
      fr: "Découvrez nos réalisations en visites virtuelles 3D",
      en: "Discover our 3D virtual tour projects",
    },
    viewTour: { fr: "Voir la visite", en: "View Tour" },
    allCategories: { fr: "Tous", en: "All" },
    noTours: { fr: "Aucune visite trouvée", en: "No tours found" },
  },

  // ─── Services ───
  services: {
    title: { fr: "Nos Services", en: "Our Services" },
    subtitle: {
      fr: "Des solutions complètes pour numériser et valoriser vos espaces",
      en: "Complete solutions to digitize and enhance your spaces",
    },
    virtualTours: { fr: "Visites Virtuelles 360°", en: "360° Virtual Tours" },
    virtualToursDesc: {
      fr: "Explorez chaque recoin de votre espace avec une visite immersive à 360°.",
      en: "Explore every corner of your space with an immersive 360° tour.",
    },
    floorPlans: { fr: "Plans 2D/3D", en: "2D/3D Floor Plans" },
    floorPlansDesc: {
      fr: "Des plans détaillés et précis pour une meilleure compréhension de l'espace.",
      en: "Detailed and accurate floor plans for a better understanding of the space.",
    },
    hdrPhotography: { fr: "Photographie HDR", en: "HDR Photography" },
    hdrDesc: {
      fr: "Des photos de qualité professionnelle qui capturent chaque détail.",
      en: "Professional quality photos that capture every detail.",
    },
    immersiveVideos: { fr: "Vidéos Immersives", en: "Immersive Videos" },
    immersiveVideosDesc: {
      fr: "Des vidéos captivantes pour une présentation dynamique de votre espace.",
      en: "Captivating videos for a dynamic presentation of your space.",
    },
    ctaTitle: { fr: "Prêt à Commencer?", en: "Ready to Get Started?" },
    ctaDesc: {
      fr: "Contactez-nous pour discuter de votre projet et recevoir un devis gratuit.",
      en: "Contact us to discuss your project and receive a free quote.",
    },
    ctaButton: { fr: "Demander un Devis", en: "Request a Quote" },
  },

  // ─── About ───
  about: {
    title: { fr: "À Propos de PrimeSpace", en: "About PrimeSpace" },
    subtitle: {
      fr: "Nous transformons les espaces physiques en expériences numériques immersives",
      en: "We transform physical spaces into immersive digital experiences",
    },
    values: { fr: "Nos Valeurs", en: "Our Values" },
    excellence: { fr: "Excellence", en: "Excellence" },
    excellenceDesc: {
      fr: "Nous visons l'excellence dans chaque projet, en utilisant les dernières technologies.",
      en: "We strive for excellence in every project, using the latest technologies.",
    },
    precision: { fr: "Précision", en: "Precision" },
    precisionDesc: {
      fr: "Chaque détail compte. Nos numérisations capturent fidèlement votre espace.",
      en: "Every detail matters. Our scans faithfully capture your space.",
    },
    innovation: { fr: "Innovation", en: "Innovation" },
    innovationDesc: {
      fr: "Nous adoptons les technologies les plus avancées pour des résultats exceptionnels.",
      en: "We adopt the most advanced technologies for exceptional results.",
    },
    timeline: { fr: "Notre Parcours", en: "Our Journey" },
  },

  // ─── Contact ───
  contact: {
    title: { fr: "Contactez-Nous", en: "Contact Us" },
    subtitle: {
      fr: "Nous sommes à votre écoute pour discuter de votre projet",
      en: "We're here to discuss your project",
    },
    name: { fr: "Nom complet", en: "Full name" },
    email: { fr: "Email", en: "Email" },
    phone: { fr: "Téléphone", en: "Phone" },
    message: { fr: "Message", en: "Message" },
    send: { fr: "Envoyer", en: "Send" },
    sending: { fr: "Envoi en cours...", en: "Sending..." },
    success: { fr: "Message envoyé avec succès!", en: "Message sent successfully!" },
    error: { fr: "Erreur lors de l'envoi. Veuillez réessayer.", en: "Error sending. Please try again." },
    address: { fr: "Adresse", en: "Address" },
    phoneLabel: { fr: "Téléphone", en: "Phone" },
    emailLabel: { fr: "Email", en: "Email" },
  },

  // ─── Benefits ───
  benefits: {
    title: { fr: "Solutions PrimeSpace", en: "PrimeSpace Solutions" },
    subtitle: {
      fr: "Découvrez comment nos visites virtuelles 3D peuvent transformer votre activité",
      en: "Discover how our 3D virtual tours can transform your business",
    },
    increaseSales: { fr: "Augmentez vos ventes", en: "Increase your sales" },
    increaseSalesDesc: {
      fr: "Les visites virtuelles augmentent le taux de conversion de 14 à 49%.",
      en: "Virtual tours increase conversion rates by 14 to 49%.",
    },
    saveTime: { fr: "Gagnez du temps", en: "Save time" },
    saveTimeDesc: {
      fr: "Réduisez les visites physiques inutiles grâce à une pré-visite en ligne.",
      en: "Reduce unnecessary physical visits with an online pre-tour.",
    },
    standOut: { fr: "Démarquez-vous", en: "Stand out" },
    standOutDesc: {
      fr: "Offrez une expérience unique qui vous distingue de la concurrence.",
      en: "Offer a unique experience that sets you apart from the competition.",
    },
  },

  // ─── Tour Viewer ───
  viewer: {
    loading: { fr: "Chargement de la visite...", en: "Loading the tour..." },
    products: { fr: "Produits", en: "Products" },
    rooms: { fr: "Chambres", en: "Rooms" },
    menu: { fr: "Menu", en: "Menu" },
    services: { fr: "Services", en: "Services" },
    share: { fr: "Partager", en: "Share" },
    fullscreen: { fr: "Plein écran", en: "Fullscreen" },
    addToCart: { fr: "Ajouter au panier", en: "Add to Cart" },
    cart: { fr: "Panier", en: "Cart" },
    total: { fr: "Total", en: "Total" },
    close: { fr: "Fermer", en: "Close" },
    viewDetails: { fr: "Voir détails", en: "View details" },
    back: { fr: "Retour", en: "Back" },
    copyLink: { fr: "Copier le lien", en: "Copy link" },
    linkCopied: { fr: "Lien copié!", en: "Link copied!" },
    floor: { fr: "Étage", en: "Floor" },
    whatsapp: { fr: "Réserver via WhatsApp", en: "Book via WhatsApp" },
  },

  // ─── Auth pages ───
  auth: {
    login: { fr: "Connexion", en: "Login" },
    register: { fr: "Inscription", en: "Register" },
    forgotPassword: { fr: "Mot de passe oublié", en: "Forgot Password" },
    email: { fr: "Email", en: "Email" },
    password: { fr: "Mot de passe", en: "Password" },
    confirmPassword: { fr: "Confirmer le mot de passe", en: "Confirm Password" },
    submit: { fr: "Valider", en: "Submit" },
    noAccount: { fr: "Pas de compte ?", en: "No account?" },
    hasAccount: { fr: "Déjà un compte ?", en: "Already have an account?" },
    createAccount: { fr: "Créer un compte", en: "Create an account" },
    signIn: { fr: "Se connecter", en: "Sign in" },
    signingIn: { fr: "Connexion...", en: "Signing in..." },
    resetPassword: { fr: "Réinitialiser le mot de passe", en: "Reset Password" },
    loginSubtitle: { fr: "Connectez-vous pour gérer les visites", en: "Sign in to manage tours" },
    forgotPasswordLink: { fr: "Mot de passe oublié ?", en: "Forgot password?" },
    registerSubtitle: { fr: "Inscrivez-vous pour accéder à l'administration", en: "Register to access administration" },
    fullName: { fr: "Nom complet", en: "Full Name" },
    createMyAccount: { fr: "Créer mon compte", en: "Create my account" },
    creating: { fr: "Création...", en: "Creating..." },
    forgotSubtitle: { fr: "Entrez votre email pour réinitialiser votre mot de passe", en: "Enter your email to reset your password" },
    sending: { fr: "Envoi...", en: "Sending..." },
    sendCode: { fr: "Envoyer le code", en: "Send code" },
    backToLogin: { fr: "Retour à la connexion", en: "Back to login" },
    resetSubtitle: { fr: "Entrez le code reçu et votre nouveau mot de passe", en: "Enter the code received and your new password" },
    resetCode: { fr: "Code de réinitialisation", en: "Reset code" },
    newPassword: { fr: "Nouveau mot de passe", en: "New password" },
    resetting: { fr: "Réinitialisation...", en: "Resetting..." },
    reset: { fr: "Réinitialiser", en: "Reset" },
    resendCode: { fr: "Renvoyer un code", en: "Resend code" },
    passwordResetSuccess: { fr: "Mot de passe réinitialisé !", en: "Password reset!" },
    canNowLogin: { fr: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.", en: "You can now sign in with your new password." },
  },

  // ─── 404 ───
  notFound: {
    title: { fr: "Page non trouvée", en: "Page not found" },
    message: {
      fr: "Oups ! La page que vous cherchez n'existe pas.",
      en: "Oops! The page you're looking for doesn't exist.",
    },
    backHome: { fr: "Retour à l'accueil", en: "Back to Home" },
  },

  // ─── Common / Industry pages ───
  common: {
    learnMore: { fr: "En savoir plus", en: "Learn More" },
    getStarted: { fr: "Commencer", en: "Get Started" },
    requestQuote: { fr: "Demander un Devis", en: "Request a Quote" },
    whatsapp: { fr: "Discuter sur WhatsApp", en: "Chat on WhatsApp" },
  },
} as const;
