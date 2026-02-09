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
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Camera,
      title: t("Scan 3D Haute Précision", "High Precision 3D Scan"),
      description: t("Scanner haute précision capturant chaque détail de votre espace avec une résolution 4K et des mesures exactes.", "High precision scanner capturing every detail of your space with 4K resolution and exact measurements."),
    },
    {
      icon: Move3d,
      title: t("Visite Virtuelle 3D", "3D Virtual Tour"),
      description: t("Expérience immersive permettant aux visiteurs de se déplacer librement dans votre espace comme s'ils y étaient.", "Immersive experience allowing visitors to move freely through your space as if they were there."),
    },
    {
      icon: Layout,
      title: t("Plans 2D & 3D", "2D & 3D Floor Plans"),
      description: t("Plans d'étage détaillés et maquettes 3D générés automatiquement à partir de nos scans.", "Detailed floor plans and 3D models automatically generated from our scans."),
    },
    {
      icon: Image,
      title: t("Photographie HDR", "HDR Photography"),
      description: t("Photos haute résolution de qualité professionnelle extraites directement de la visite virtuelle.", "High resolution professional quality photos extracted directly from the virtual tour."),
    },
    {
      icon: Video,
      title: t("Vidéos Cinématiques", "Cinematic Videos"),
      description: t("Vidéos de présentation animées pour vos réseaux sociaux et supports marketing.", "Animated presentation videos for your social media and marketing materials."),
    },
    {
      icon: FileText,
      title: t("Documentation Technique", "Technical Documentation"),
      description: t("Rapports détaillés avec mesures, annotations et analyses pour vos projets.", "Detailed reports with measurements, annotations and analyses for your projects."),
    },
  ];

  const industries = [
    { icon: Building2, name: t("Immobilier", "Real Estate"), description: t("Villas, appartements, terrains", "Villas, apartments, land") },
    { icon: Hotel, name: t("Hôtellerie", "Hospitality"), description: t("Hôtels, riads, maisons d'hôtes", "Hotels, riads, guest houses") },
    { icon: Store, name: t("Commerce", "Retail"), description: t("Boutiques, showrooms, centres commerciaux", "Shops, showrooms, malls") },
    { icon: Landmark, name: t("Culture", "Culture"), description: t("Musées, galeries, sites historiques", "Museums, galleries, historic sites") },
    { icon: Building, name: t("Entreprise", "Business"), description: t("Bureaux, usines, entrepôts", "Offices, factories, warehouses") },
    { icon: Utensils, name: t("Restauration", "Dining"), description: t("Restaurants, cafés, espaces événementiels", "Restaurants, cafes, event spaces") },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation",
      description: t("Discussion de vos besoins et planification de l'intervention. Nous définissons ensemble les objectifs et le périmètre du projet.", "Discussion of your needs and planning the intervention. We define together the objectives and scope of the project."),
    },
    {
      step: "02",
      title: t("Capture", "Capture"),
      description: t("Notre équipe se déplace avec le Pro 3 pour scanner votre espace. Rapide et non-intrusif.", "Our team comes with the Pro 3 to scan your space. Fast and non-intrusive."),
    },
    {
      step: "03",
      title: t("Traitement", "Processing"),
      description: t("Traitement professionnel des données capturées. Optimisation de la qualité et ajout des fonctionnalités.", "Professional processing of captured data. Quality optimization and feature additions."),
    },
    {
      step: "04",
      title: t("Livraison", "Delivery"),
      description: t("Vous recevez votre visite virtuelle avec tous les livrables convenus. Formation à l'utilisation incluse.", "You receive your virtual tour with all agreed deliverables. Usage training included."),
    },
  ];

  const techFeatures = [
    t("Résolution 4K pour des images d'une netteté parfaite", "4K resolution for perfectly sharp images"),
    t("Capteur LiDAR pour des mesures ultra-précises", "LiDAR sensor for ultra-precise measurements"),
    t("Capture rapide: jusqu'à 300m²/heure", "Fast capture: up to 300m²/hour"),
    t("Compatible réalité virtuelle et augmentée", "VR and AR compatible"),
    t("Format universel exportable vers CAO/BIM", "Universal format exportable to CAD/BIM"),
  ];

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
              {t("Nos Services", "Our Services")}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6"
            >
              {t("Solutions de Visites Virtuelles 3D", "3D Virtual Tour Solutions")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-primary-foreground/70"
            >
              {t(
                "Des solutions adaptées à tous vos besoins, de la simple visite virtuelle aux projets de documentation technique les plus complexes.",
                "Solutions tailored to all your needs, from simple virtual tours to the most complex technical documentation projects."
              )}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={t("Ce que nous offrons", "What We Offer")}
            title={t("Services Complets", "Complete Services")}
            description={t("Une gamme complète de services pour digitaliser vos espaces", "A complete range of services to digitize your spaces")}
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
                {t("Technologie de Pointe", "Cutting-Edge Technology")}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                
              </h2>
              <p className="text-muted-foreground mb-6">
                {t(
                  "Notre scanner 3D le plus avancé du marché. Grâce à ses capteurs LiDAR et ses caméras haute résolution, il capture chaque espace avec une précision millimétrique et une qualité d'image exceptionnelle.",
                  "Our most advanced 3D scanner on the market. With its LiDAR sensors and high-resolution cameras, it captures every space with millimeter precision and exceptional image quality."
                )}
              </p>
              <ul className="space-y-3">
                {techFeatures.map((item) => (
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
                    {t("Précision Exceptionnelle", "Exceptional Precision")}
                  </h3>
                  <p className="text-primary-foreground/70">
                    {t("±1% de marge d'erreur sur les mesures", "±1% margin of error on measurements")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={t("Secteurs d'Activité", "Industries")}
            title={t("Solutions Pour Tous Les Secteurs", "Solutions For All Industries")}
            description={t("Nos visites virtuelles s'adaptent à tous les types d'espaces et d'industries", "Our virtual tours adapt to all types of spaces and industries")}
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
            badge={t("Notre Processus", "Our Process")}
            title={t("Comment Ça Marche?", "How Does It Work?")}
            description={t("Un processus simple et efficace de la prise de contact à la livraison", "A simple and efficient process from first contact to delivery")}
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
              {t("Prêt à Digitaliser Votre Espace?", "Ready to Digitize Your Space?")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/70 mb-10"
            >
              {t(
                "Contactez-nous pour un devis personnalisé gratuit. Notre équipe vous accompagne de A à Z dans votre projet.",
                "Contact us for a free personalized quote. Our team supports you from A to Z in your project."
              )}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  {t("Obtenir un Devis Gratuit", "Get a Free Quote")}
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
