import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Target, Eye, MapPin, Check } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Nous nous engageons à livrer un travail de la plus haute qualité, en utilisant les technologies les plus avancées du marché.",
  },
  {
    icon: Target,
    title: "Précision",
    description: "Chaque scan est réalisé avec une attention méticuleuse aux détails pour garantir une reproduction fidèle de vos espaces.",
  },
  {
    icon: Eye,
    title: "Innovation",
    description: "Nous restons à la pointe de l'innovation pour vous offrir les meilleures solutions de virtualisation d'espaces.",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Fondation",
    description: "Création de Visite3D avec la vision de transformer la façon dont les espaces sont présentés en Tunisie.",
  },
  {
    year: "2019",
    title: "Premier Partenariat Matterport",
    description: "Devenu partenaire officiel Matterport, nous acquérons notre premier scanner professionnel.",
  },
  {
    year: "2021",
    title: "Expansion Nationale",
    description: "Extension de nos services à l'ensemble du territoire tunisien avec une équipe dédiée.",
  },
  {
    year: "2023",
    title: "Matterport Pro 3",
    description: "Acquisition du Matterport Pro 3, le scanner le plus avancé pour une qualité inégalée.",
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
              Notre Histoire
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6"
            >
              À Propos de Visite3D
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-primary-foreground/70"
            >
              Pionniers de la visite virtuelle 3D en Tunisie, nous transformons 
              vos espaces en expériences numériques immersives depuis 2018.
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
                Notre Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Démocratiser l'Accès aux Visites Virtuelles
              </h2>
              <p className="text-muted-foreground mb-6">
                Notre mission est de permettre à chaque entreprise tunisienne, 
                qu'elle soit une agence immobilière, un hôtel, un commerce ou un 
                musée, de bénéficier de la puissance des visites virtuelles 3D 
                pour présenter ses espaces de manière innovante et engageante.
              </p>
              <p className="text-muted-foreground mb-8">
                Nous croyons que chaque espace a une histoire à raconter, et notre 
                technologie permet de la partager avec le monde entier, 24h/24, 
                7j/7, sans barrières géographiques.
              </p>
              <Button variant="secondary" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Discutons de Votre Projet
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
              {[
                { value: "250+", label: "Projets Réalisés" },
                { value: "98%", label: "Clients Satisfaits" },
                { value: "15+", label: "Villes Couvertes" },
                { value: "24h", label: "Délai Moyen" },
              ].map((stat, index) => (
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
            badge="Nos Valeurs"
            title="Ce Qui Nous Anime"
            description="Les principes qui guident notre travail au quotidien"
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

      {/* Timeline */}
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
                Notre Technologie
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
                Pourquoi Matterport Pro 3?
              </h2>
              <p className="text-lg text-primary-foreground/70 mb-12">
                Le Matterport Pro 3 représente le summum de la technologie de capture 3D. 
                C'est le choix des professionnels les plus exigeants dans le monde entier.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Résolution 4K", description: "Images d'une clarté exceptionnelle" },
                { title: "LiDAR Intégré", description: "Mesures au millimètre près" },
                { title: "Capture Rapide", description: "300m²/heure de scan" },
                { title: "HDR Automatique", description: "Exposition parfaite" },
                { title: "Compatible VR", description: "Immersion totale" },
                { title: "Export CAO/BIM", description: "Formats professionnels" },
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
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Zone de Service"
            title="Nous Couvrons Toute la Tunisie"
            description="Notre équipe se déplace partout pour réaliser vos projets"
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
              📍 Basé à Tunis avec interventions sur tout le territoire. 
              Des frais de déplacement peuvent s'appliquer pour certaines régions.
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
              Prêt à Travailler Avec Nous?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-10"
            >
              Contactez notre équipe pour discuter de votre projet et découvrir 
              comment nous pouvons vous aider à valoriser vos espaces.
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
                  Nous Contacter
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/portfolio">Voir Nos Réalisations</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
