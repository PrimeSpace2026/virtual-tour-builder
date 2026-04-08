import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, 
  Check, 
  Camera, 
  Layout, 
  Move3d, 
  Image, 
  Video, 
  FileText,
  Building2,
  Hotel,
  Store,
  Landmark,
  Building,
  Utensils
} from "lucide-react";
import { Layout as PageLayout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductBannerPopup } from "@/components/ProductBannerPopup";
import { useI18n } from "@/i18n";

const services = [
  {
    icon: Camera,
    title: { fr: "Scan 3D Haute Précision", en: "High-Precision 3D Scanning" },
    description: { fr: "Scanner haute précision capturant chaque détail de votre espace avec une résolution 4K et des mesures exactes.", en: "High-precision scanner capturing every detail of your space with 4K resolution and exact measurements." },
  },
  {
    icon: Move3d,
    title: { fr: "Visite Virtuelle 3D", en: "3D Virtual Tour" },
    description: { fr: "Expérience immersive permettant aux visiteurs de se déplacer librement dans votre espace comme s'ils y étaient.", en: "Immersive experience allowing visitors to move freely through your space as if they were there." },
  },
  {
    icon: Layout,
    title: { fr: "Plans 2D & 3D", en: "2D & 3D Floor Plans" },
    description: { fr: "Plans d'étage détaillés et maquettes 3D générés automatiquement à partir de nos scans.", en: "Detailed floor plans and 3D models automatically generated from our scans." },
  },
  {
    icon: Image,
    title: { fr: "Photographie HDR", en: "HDR Photography" },
    description: { fr: "Photos haute résolution de qualité professionnelle extraites directement de la visite virtuelle.", en: "High-resolution professional quality photos extracted directly from the virtual tour." },
  },
  {
    icon: Video,
    title: { fr: "Vidéos Cinématiques", en: "Cinematic Videos" },
    description: { fr: "Vidéos de présentation animées pour vos réseaux sociaux et supports marketing.", en: "Animated presentation videos for your social media and marketing materials." },
  },
  {
    icon: FileText,
    title: { fr: "Documentation Technique", en: "Technical Documentation" },
    description: { fr: "Rapports détaillés avec mesures, annotations et analyses pour vos projets.", en: "Detailed reports with measurements, annotations, and analyses for your projects." },
  },
];

const packages = [
  {
    name: "Essentiel",
    description: "Idéal pour les petits espaces",
    price: "À partir de 350 TND",
    features: [
      "Visite virtuelle 3D complète",
      "Hébergement 1 an inclus",
      "Lien de partage unique",
      "Compatible mobile & VR",
      "Livraison sous 48h",
    ],
    recommended: false,
  },
  {
    name: "Professionnel",
    description: "Notre offre la plus populaire",
    price: "À partir de 600 TND",
    features: [
      "Tout le pack Essentiel",
      "Plans 2D et 3D inclus",
      "10 photos HDR haute résolution",
      "Vidéo cinématique 60 sec",
      "Mesures et annotations",
      "Support prioritaire",
    ],
    recommended: true,
  },
  {
    name: "Premium",
    description: "Solution complète pour les grands projets",
    price: "Sur devis",
    features: [
      "Tout le pack Professionnel",
      "Captures illimitées",
      "Vidéos sur mesure",
      "Intégration site web",
      "Formation équipe",
      "Account manager dédié",
    ],
    recommended: false,
  },
];

const industries = [
  { icon: Building2, name: { fr: "Immobilier", en: "Real Estate" }, description: { fr: "Villas, appartements, terrains", en: "Villas, apartments, land" } },
  { icon: Hotel, name: { fr: "Hôtellerie", en: "Hospitality" }, description: { fr: "Hôtels, riads, maisons d'hôtes", en: "Hotels, riads, guesthouses" } },
  { icon: Store, name: { fr: "Commerce", en: "Commerce" }, description: { fr: "Boutiques, showrooms, centres commerciaux", en: "Shops, showrooms, malls" } },
  { icon: Landmark, name: { fr: "Culture", en: "Culture" }, description: { fr: "Musées, galeries, sites historiques", en: "Museums, galleries, historic sites" } },
  { icon: Building, name: { fr: "Entreprise", en: "Business" }, description: { fr: "Bureaux, usines, entrepôts", en: "Offices, factories, warehouses" } },
  { icon: Utensils, name: { fr: "Restauration", en: "Dining" }, description: { fr: "Restaurants, cafés, espaces événementiels", en: "Restaurants, cafés, event spaces" } },
];

const processSteps = [
  {
    step: "01",
    title: { fr: "Consultation", en: "Consultation" },
    description: { fr: "Discussion de vos besoins et planification de l'intervention. Nous définissons ensemble les objectifs et le périmètre du projet.", en: "Discussion of your needs and planning the intervention. Together we define the objectives and scope of the project." },
  },
  {
    step: "02",
    title: { fr: "Capture", en: "Capture" },
    description: { fr: "Notre équipe se déplace avec le  Pro 3 pour scanner votre espace. Rapide et non-intrusif.", en: "Our team arrives with the Pro 3 to scan your space. Quick and non-intrusive." },
  },
  {
    step: "03",
    title: { fr: "Traitement", en: "Processing" },
    description: { fr: "Traitement professionnel des données capturées. Optimisation de la qualité et ajout des fonctionnalités.", en: "Professional processing of captured data. Quality optimization and feature additions." },
  },
  {
    step: "04",
    title: { fr: "Livraison", en: "Delivery" },
    description: { fr: "Vous recevez votre visite virtuelle avec tous les livrables convenus. Formation à l'utilisation incluse.", en: "You receive your virtual tour with all agreed deliverables. Usage training included." },
  },
];

const Services = () => {
  const { lang, t } = useI18n();
  const T = (obj: { fr: string; en: string }) => obj[lang];

  return (
    <PageLayout>
      <WhatsAppButton />
      <ProductBannerPopup />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20"
            >
              {T(t.services.title)}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-4 md:mb-6"
            >
              {lang === "fr" ? "Solutions de Visites Virtuelles 3D" : "3D Virtual Tour Solutions"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-primary-foreground/70"
            >
              {lang === "fr"
                ? "Des solutions adaptées à tous vos besoins, de la simple visite virtuelle aux projets de documentation technique les plus complexes."
                : "Solutions tailored to all your needs, from simple virtual tours to the most complex technical documentation projects."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={lang === "fr" ? "Ce que nous offrons" : "What We Offer"}
            title={lang === "fr" ? "Services Complets" : "Complete Services"}
            description={lang === "fr" ? "Une gamme complète de services pour digitaliser vos espaces" : "A full range of services to digitize your spaces"}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <FeatureCard
                key={T(service.title)}
                icon={service.icon}
                title={T(service.title)}
                description={T(service.description)}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Matterport Technology */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                {lang === "fr" ? "Technologie de Pointe" : "Cutting-Edge Technology"}
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-4 md:mb-6">
                
              </h2>
              <p className="text-muted-foreground mb-6">
                {lang === "fr"
                  ? "Notre scanner 3D le plus avancé du marché. Grâce à ses capteurs LiDAR et ses caméras haute résolution, il capture chaque espace avec une précision millimétrique et une qualité d'image exceptionnelle."
                  : "Our most advanced 3D scanner on the market. With its LiDAR sensors and high-resolution cameras, it captures every space with millimetric precision and exceptional image quality."}
              </p>
              <ul className="space-y-3">
                {[
                  { fr: "Résolution 4K pour des images d'une netteté parfaite", en: "4K resolution for perfectly sharp images" },
                  { fr: "Capteur LiDAR pour des mesures ultra-précises", en: "LiDAR sensor for ultra-precise measurements" },
                  { fr: "Capture rapide: jusqu'à 300m²/heure", en: "Fast capture: up to 300m²/hour" },
                  { fr: "Compatible réalité virtuelle et augmentée", en: "Compatible with virtual and augmented reality" },
                  { fr: "Format universel exportable vers CAO/BIM", en: "Universal format exportable to CAD/BIM" },
                ].map((item) => (
                  <li key={T(item)} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{T(item)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-hero p-8 flex items-center justify-center">
                <div className="text-center">
                  <Move3d className="w-24 h-24 text-secondary mx-auto mb-6" />
                  <h3 className="text-2xl font-display font-bold text-primary-foreground mb-2">
                    {lang === "fr" ? "Précision Exceptionnelle" : "Exceptional Precision"}
                  </h3>
                  <p className="text-primary-foreground/70">
                    {lang === "fr" ? "±1% de marge d'erreur sur les mesures" : "±1% margin of error on measurements"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing 
      {/* <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Tarifs"
            title="Nos Forfaits"
            description="Des offres transparentes adaptées à chaque besoin et budget"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  pkg.recommended
                    ? "bg-gradient-hero text-primary-foreground ring-2 ring-secondary"
                    : "bg-card shadow-soft"
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
                    Recommandé
                  </span>
                )}
                
                <h3 className={`font-display font-bold text-2xl mb-2 ${
                  pkg.recommended ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm mb-4 ${
                  pkg.recommended ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {pkg.description}
                </p>
                <div className={`text-3xl font-display font-bold mb-6 ${
                  pkg.recommended ? "text-secondary" : "text-foreground"
                }`}>
                  {pkg.price}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        pkg.recommended ? "text-secondary" : "text-secondary"
                      }`} />
                      <span className={pkg.recommended ? "text-primary-foreground/90" : "text-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.recommended ? "hero" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/contact">Choisir ce forfait</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Industries */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={lang === "fr" ? "Secteurs d'Activité" : "Industries"}
            title={lang === "fr" ? "Solutions Pour Tous Les Secteurs" : "Solutions for All Industries"}
            description={lang === "fr" ? "Nos visites virtuelles s'adaptent à tous les types d'espaces et d'industries" : "Our virtual tours adapt to all types of spaces and industries"}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={T(industry.name)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl p-4 md:p-6 text-center shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <industry.icon className="w-8 h-8 md:w-10 md:h-10 text-secondary mx-auto mb-2 md:mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{T(industry.name)}</h3>
                <p className="text-xs text-muted-foreground">{T(industry.description)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={lang === "fr" ? "Notre Processus" : "Our Process"}
            title={lang === "fr" ? "Comment Ça Marche?" : "How It Works?"}
            description={lang === "fr" ? "Un processus simple et efficace de la prise de contact à la livraison" : "A simple and efficient process from initial contact to delivery"}
          />

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-5xl md:text-7xl font-display font-bold text-secondary/10 mb-2 md:mb-4">
                  {step.step}
                </div>
                <h3 className="font-display font-semibold text-lg md:text-xl text-foreground mb-2">
                  {T(step.title)}
                </h3>
                <p className="text-muted-foreground">{T(step.description)}</p>
                
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-12 -right-3 w-6 h-6 text-secondary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-display font-bold text-primary-foreground mb-4 md:mb-6"
            >
              {lang === "fr" ? "Prêt à Digitaliser Votre Espace?" : "Ready to Digitize Your Space?"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-primary-foreground/70 mb-8 md:mb-10"
            >
              {lang === "fr"
                ? "Contactez-nous pour un devis personnalisé gratuit. Notre équipe vous accompagne de A à Z dans votre projet."
                : "Contact us for a free personalized quote. Our team supports you from A to Z in your project."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  {lang === "fr" ? "Obtenir un Devis Gratuit" : "Get a Free Quote"}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
