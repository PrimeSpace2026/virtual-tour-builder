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

const services = [
  {
    icon: Camera,
    title: "Capture Matterport Pro 3",
    description: "Scanner haute précision capturant chaque détail de votre espace avec une résolution 4K et des mesures exactes.",
  },
  {
    icon: Move3d,
    title: "Visite Virtuelle 3D",
    description: "Expérience immersive permettant aux visiteurs de se déplacer librement dans votre espace comme s'ils y étaient.",
  },
  {
    icon: Layout,
    title: "Plans 2D & 3D",
    description: "Plans d'étage détaillés et maquettes 3D générés automatiquement à partir de nos scans.",
  },
  {
    icon: Image,
    title: "Photographie HDR",
    description: "Photos haute résolution de qualité professionnelle extraites directement de la visite virtuelle.",
  },
  {
    icon: Video,
    title: "Vidéos Cinématiques",
    description: "Vidéos de présentation animées pour vos réseaux sociaux et supports marketing.",
  },
  {
    icon: FileText,
    title: "Documentation Technique",
    description: "Rapports détaillés avec mesures, annotations et analyses pour vos projets.",
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
  { icon: Building2, name: "Immobilier", description: "Villas, appartements, terrains" },
  { icon: Hotel, name: "Hôtellerie", description: "Hôtels, riads, maisons d'hôtes" },
  { icon: Store, name: "Commerce", description: "Boutiques, showrooms, centres commerciaux" },
  { icon: Landmark, name: "Culture", description: "Musées, galeries, sites historiques" },
  { icon: Building, name: "Entreprise", description: "Bureaux, usines, entrepôts" },
  { icon: Utensils, name: "Restauration", description: "Restaurants, cafés, espaces événementiels" },
];

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "Discussion de vos besoins et planification de l'intervention. Nous définissons ensemble les objectifs et le périmètre du projet.",
  },
  {
    step: "02",
    title: "Capture",
    description: "Notre équipe se déplace avec le Matterport Pro 3 pour scanner votre espace. Rapide et non-intrusif.",
  },
  {
    step: "03",
    title: "Traitement",
    description: "Traitement professionnel des données capturées. Optimisation de la qualité et ajout des fonctionnalités.",
  },
  {
    step: "04",
    title: "Livraison",
    description: "Vous recevez votre visite virtuelle avec tous les livrables convenus. Formation à l'utilisation incluse.",
  },
];

const Services = () => {
  return (
    <PageLayout>
      <WhatsAppButton />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20"
            >
              Nos Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6"
            >
              Solutions de Visites Virtuelles 3D
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-primary-foreground/70"
            >
              Des solutions adaptées à tous vos besoins, de la simple visite virtuelle 
              aux projets de documentation technique les plus complexes.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Ce que nous offrons"
            title="Services Complets"
            description="Une gamme complète de services pour digitaliser vos espaces"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <FeatureCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Matterport Technology */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                Technologie de Pointe
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Matterport Pro 3: La Référence Mondiale
              </h2>
              <p className="text-muted-foreground mb-6">
                Le Matterport Pro 3 est le scanner 3D le plus avancé du marché. Grâce à ses capteurs 
                LiDAR et ses caméras haute résolution, il capture chaque espace avec une précision 
                millimétrique et une qualité d'image exceptionnelle.
              </p>
              <ul className="space-y-3">
                {[
                  "Résolution 4K pour des images d'une netteté parfaite",
                  "Capteur LiDAR pour des mesures ultra-précises",
                  "Capture rapide: jusqu'à 300m²/heure",
                  "Compatible réalité virtuelle et augmentée",
                  "Format universel exportable vers CAO/BIM",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
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
                    Précision Exceptionnelle
                  </h3>
                  <p className="text-primary-foreground/70">
                    ±1% de marge d'erreur sur les mesures
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-background">
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
      </section>

      {/* Industries */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Secteurs d'Activité"
            title="Solutions Pour Tous Les Secteurs"
            description="Nos visites virtuelles s'adaptent à tous les types d'espaces et d'industries"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl p-6 text-center shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <industry.icon className="w-10 h-10 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{industry.name}</h3>
                <p className="text-xs text-muted-foreground">{industry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Notre Processus"
            title="Comment Ça Marche?"
            description="Un processus simple et efficace de la prise de contact à la livraison"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-7xl font-display font-bold text-secondary/10 mb-4">
                  {step.step}
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-12 -right-3 w-6 h-6 text-secondary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6"
            >
              Prêt à Digitaliser Votre Espace?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/70 mb-10"
            >
              Contactez-nous pour un devis personnalisé gratuit. Notre équipe vous 
              accompagne de A à Z dans votre projet.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Obtenir un Devis Gratuit
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
