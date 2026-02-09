import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Target, Eye, MapPin, Check } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Award,
      title: t("Excellence", "Excellence"),
      description: t("Nous nous engageons à livrer un travail de la plus haute qualité, en utilisant les technologies les plus avancées du marché.", "We are committed to delivering the highest quality work, using the most advanced technologies on the market."),
    },
    {
      icon: Target,
      title: t("Précision", "Precision"),
      description: t("Chaque scan est réalisé avec une attention méticuleuse aux détails pour garantir une reproduction fidèle de vos espaces.", "Every scan is performed with meticulous attention to detail to ensure a faithful reproduction of your spaces."),
    },
    {
      icon: Eye,
      title: t("Innovation", "Innovation"),
      description: t("Nous restons à la pointe de l'innovation pour vous offrir les meilleures solutions de virtualisation d'espaces.", "We stay at the forefront of innovation to offer you the best space virtualization solutions."),
    },
  ];

  const coverage = [
    "Tunis & Grand Tunis",
    "Sousse & Monastir",
    "Sfax",
    "Hammamet & Nabeul",
    "Djerba",
    "Bizerte",
    "Kairouan",
    "Gabès & Médenine",
  ];

  const stats = [
    { value: "250+", label: t("Projets Réalisés", "Completed Projects") },
    { value: "98%", label: t("Clients Satisfaits", "Satisfied Clients") },
    { value: "15+", label: t("Villes Couvertes", "Cities Covered") },
    { value: "24h", label: t("Délai Moyen", "Average Turnaround") },
  ];

  const matterportFeatures = [
    { title: t("Résolution 4K", "4K Resolution"), description: t("Images d'une clarté exceptionnelle", "Images of exceptional clarity") },
    { title: t("LiDAR Intégré", "Integrated LiDAR"), description: t("Mesures au millimètre près", "Millimeter-precise measurements") },
    { title: t("Capture Rapide", "Fast Capture"), description: t("300m²/heure de scan", "300m²/hour scanning") },
    { title: t("HDR Automatique", "Auto HDR"), description: t("Exposition parfaite", "Perfect exposure") },
    { title: t("Compatible VR", "VR Compatible"), description: t("Immersion totale", "Total immersion") },
    { title: t("Export CAO/BIM", "CAD/BIM Export"), description: t("Formats professionnels", "Professional formats") },
  ];

  return (
    <Layout>
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
              {t("Notre Histoire", "Our Story")}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6"
            >
              {t("À Propos de Visite3D", "About Visite3D")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-primary-foreground/70"
            >
              {t(
                "Pionniers de la visite virtuelle 3D en Tunisie, nous transformons vos espaces en expériences numériques immersives depuis 2018.",
                "Pioneers of 3D virtual tours in Tunisia, we've been transforming your spaces into immersive digital experiences since 2018."
              )}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                {t("Notre Mission", "Our Mission")}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                {t("Démocratiser l'Accès aux Visites Virtuelles", "Democratizing Access to Virtual Tours")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t(
                  "Notre mission est de permettre à chaque entreprise tunisienne, qu'elle soit une agence immobilière, un hôtel, un commerce ou un musée, de bénéficier de la puissance des visites virtuelles 3D pour présenter ses espaces de manière innovante et engageante.",
                  "Our mission is to enable every Tunisian business, whether a real estate agency, hotel, shop or museum, to benefit from the power of 3D virtual tours to present their spaces in an innovative and engaging way."
                )}
              </p>
              <p className="text-muted-foreground mb-8">
                {t(
                  "Nous croyons que chaque espace a une histoire à raconter, et notre technologie permet de la partager avec le monde entier, 24h/24, 7j/7, sans barrières géographiques.",
                  "We believe every space has a story to tell, and our technology allows sharing it with the entire world, 24/7, without geographical barriers."
                )}
              </p>
              <Button variant="secondary" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  {t("Discutons de Votre Projet", "Let's Discuss Your Project")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-2xl p-6 text-center shadow-soft"
                >
                  <div className="text-3xl font-display font-bold text-secondary mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={t("Nos Valeurs", "Our Values")}
            title={t("Ce Qui Nous Anime", "What Drives Us")}
            description={t("Les principes qui guident notre travail au quotidien", "The principles that guide our daily work")}
          />

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <FeatureCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Matterport */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
                {t("Notre Technologie", "Our Technology")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
                {t("Pourquoi Matterport Pro 3?", "Why Matterport Pro 3?")}
              </h2>
              <p className="text-lg text-primary-foreground/70 mb-12">
                {t(
                  "Le Matterport Pro 3 représente le summum de la technologie de capture 3D. C'est le choix des professionnels les plus exigeants dans le monde entier.",
                  "The Matterport Pro 3 represents the pinnacle of 3D capture technology. It's the choice of the most demanding professionals worldwide."
                )}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matterportFeatures.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={Check}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.05}
                  variant="glass"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={t("Zone de Service", "Service Area")}
            title={t("Nous Couvrons Toute la Tunisie", "We Cover All of Tunisia")}
            description={t("Notre équipe se déplace partout pour réaliser vos projets", "Our team travels everywhere to complete your projects")}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {coverage.map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-3"
                >
                  <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="text-foreground text-sm">{city}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8">
              {t(
                "📍 Basé à Tunis avec interventions sur tout le territoire. Des frais de déplacement peuvent s'appliquer pour certaines régions.",
                "📍 Based in Tunis with interventions across the entire territory. Travel fees may apply for certain regions."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6"
            >
              {t("Prêt à Travailler Avec Nous?", "Ready to Work With Us?")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-10"
            >
              {t(
                "Contactez notre équipe pour discuter de votre projet et découvrir comment nous pouvons vous aider à valoriser vos espaces.",
                "Contact our team to discuss your project and discover how we can help you showcase your spaces."
              )}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  {t("Nous Contacter", "Contact Us")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/portfolio">{t("Voir Nos Réalisations", "See Our Projects")}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
