import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Target, Eye, MapPin, Check } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const timeline = [
  {
    year: "2018",
    title: "Fondation",
    description: "Création de Visite3D avec la vision de transformer la façon dont les espaces sont présentés en Tunisie.",
  },
  {
    year: "2019",
    title: "Premier Partenariat PrimeSpace",
    description: "Devenu partenaire officiel PrimeSpace, nous acquérons notre premier scanner professionnel.",
  },
  {
    year: "2021",
    title: "Expansion Nationale",
    description: "Extension de nos services à l'ensemble du territoire tunisien avec une équipe dédiée.",
  },
  {
    year: "2023",
    title: "PrimeSpace Pro 3",
    description: "Acquisition du PrimeSpace Pro 3, le scanner le plus avancé pour une qualité inégalée.",
  },
  {
    year: "2024",
    title: "250+ Projets",
    description: "Célébration de notre 250ème projet avec des clients dans tous les secteurs d'activité.",
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

const About = () => {
  const { lang, t } = useI18n();
  const T = (obj: { fr: string; en: string }) => obj[lang];

  const values = [
    {
      icon: Award,
      title: T(t.about.excellence),
      description: lang === "fr" ? "Nous nous engageons à livrer un travail de la plus haute qualité, en utilisant les technologies les plus avancées du marché." : "We are committed to delivering the highest quality work, using the most advanced technologies on the market.",
    },
    {
      icon: Target,
      title: T(t.about.precision),
      description: lang === "fr" ? "Chaque scan est réalisé avec une attention méticuleuse aux détails pour garantir une reproduction fidèle de vos espaces." : "Each scan is performed with meticulous attention to detail to ensure a faithful reproduction of your spaces.",
    },
    {
      icon: Eye,
      title: T(t.about.innovation),
      description: lang === "fr" ? "Nous restons à la pointe de l'innovation pour vous offrir les meilleures solutions de virtualisation d'espaces." : "We stay at the forefront of innovation to offer you the best space virtualization solutions.",
    },
  ];

  return (
    <Layout>
      <WhatsAppButton />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20"
            >
              {lang === "fr" ? "Notre Histoire" : "Our Story"}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-4 md:mb-6"
            >
              {lang === "fr" ? "À Propos de Visite3D" : "About Visite3D"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-primary-foreground/70"
            >
              {lang === "fr"
                ? "Pionniers de la visite virtuelle 3D en Tunisie, nous transformons vos espaces en expériences numériques immersives depuis 2018."
                : "Pioneers of 3D virtual tours in Tunisia, we have been transforming your spaces into immersive digital experiences since 2018."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                {lang === "fr" ? "Notre Mission" : "Our Mission"}
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-4 md:mb-6">
                {lang === "fr" ? "Démocratiser l'Accès aux Visites Virtuelles" : "Democratizing Access to Virtual Tours"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {lang === "fr"
                  ? "Notre mission est de permettre à chaque entreprise tunisienne, qu'elle soit une agence immobilière, un hôtel, un commerce ou un musée, de bénéficier de la puissance des visites virtuelles 3D pour présenter ses espaces de manière innovante et engageante."
                  : "Our mission is to enable every Tunisian business, whether a real estate agency, hotel, shop, or museum, to benefit from the power of 3D virtual tours to present their spaces in an innovative and engaging way."}
              </p>
              <p className="text-muted-foreground mb-8">
                {lang === "fr"
                  ? "Nous croyons que chaque espace a une histoire à raconter, et notre technologie permet de la partager avec le monde entier, 24h/24, 7j/7, sans barrières géographiques."
                  : "We believe every space has a story to tell, and our technology allows sharing it with the entire world, 24/7, without geographical barriers."}
              </p>
              <Button variant="secondary" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  {lang === "fr" ? "Discutons de Votre Projet" : "Let's Discuss Your Project"}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 md:gap-4"
            >
              {[
                { value: "250+", label: lang === "fr" ? "Projets Réalisés" : "Completed Projects" },
                { value: "98%", label: lang === "fr" ? "Clients Satisfaits" : "Satisfied Clients" },
                { value: "15+", label: lang === "fr" ? "Villes Couvertes" : "Cities Covered" },
                { value: "24h", label: lang === "fr" ? "Délai Moyen" : "Average Turnaround" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-2xl p-4 md:p-6 text-center shadow-soft"
                >
                  <div className="text-2xl md:text-3xl font-display font-bold text-secondary mb-1">
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
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={T(t.about.values)}
            title={lang === "fr" ? "Ce Qui Nous Anime" : "What Drives Us"}
            description={lang === "fr" ? "Les principes qui guident notre travail au quotidien" : "The principles that guide our daily work"}
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

      {/* Timeline 
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Notre Parcours"
            title="Une Croissance Continue"
            description="Les étapes clés de notre développement"
          />

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0 border-l-2 border-secondary/30"
              >
                <div className="absolute left-0 top-0 w-4 h-4 bg-secondary rounded-full -translate-x-[9px]" />
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full mb-2">
                  {item.year}
                </span>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Matterport */}
      <section className="py-12 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
                {lang === "fr" ? "Notre Technologie" : "Our Technology"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4 md:mb-6">
                {lang === "fr" ? "Pourquoi PrimeSpace Pro 3?" : "Why PrimeSpace Pro 3?"}
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/70 mb-8 md:mb-12">
                {lang === "fr"
                  ? "Le PrimeSpace Pro 3 représente le summum de la technologie de capture 3D. C'est le choix des professionnels les plus exigeants dans le monde entier."
                  : "The PrimeSpace Pro 3 represents the pinnacle of 3D capture technology. It is the choice of the most demanding professionals worldwide."}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: lang === "fr" ? "Résolution 4K" : "4K Resolution", description: lang === "fr" ? "Images d'une clarté exceptionnelle" : "Exceptionally clear images" },
                { title: lang === "fr" ? "LiDAR Intégré" : "Integrated LiDAR", description: lang === "fr" ? "Mesures au millimètre près" : "Millimeter-precise measurements" },
                { title: lang === "fr" ? "Capture Rapide" : "Fast Capture", description: lang === "fr" ? "300m²/heure de scan" : "300m²/hour scanning" },
                { title: lang === "fr" ? "HDR Automatique" : "Automatic HDR", description: lang === "fr" ? "Exposition parfaite" : "Perfect exposure" },
                { title: lang === "fr" ? "Compatible VR" : "VR Compatible", description: lang === "fr" ? "Immersion totale" : "Total immersion" },
                { title: lang === "fr" ? "Export CAO/BIM" : "CAD/BIM Export", description: lang === "fr" ? "Formats professionnels" : "Professional formats" },
              ].map((feature, index) => (
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
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={lang === "fr" ? "Zone de Service" : "Service Area"}
            title={lang === "fr" ? "Nous Couvrons Toute la Tunisie" : "We Cover All of Tunisia"}
            description={lang === "fr" ? "Notre équipe se déplace partout pour réaliser vos projets" : "Our team travels everywhere to complete your projects"}
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
              {lang === "fr"
                ? "📍 Basé à Tunis avec interventions sur tout le territoire. Des frais de déplacement peuvent s'appliquer pour certaines régions."
                : "📍 Based in Tunis with operations across the entire territory. Travel fees may apply for certain regions."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-display font-bold text-foreground mb-4 md:mb-6"
            >
              {lang === "fr" ? "Prêt à Travailler Avec Nous?" : "Ready to Work With Us?"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10"
            >
              {lang === "fr"
                ? "Contactez notre équipe pour discuter de votre projet et découvrir comment nous pouvons vous aider à valoriser vos espaces."
                : "Contact our team to discuss your project and discover how we can help you enhance your spaces."}
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
                  {lang === "fr" ? "Nous Contacter" : "Contact Us"}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/portfolio">{lang === "fr" ? "Voir Nos Réalisations" : "View Our Projects"}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
