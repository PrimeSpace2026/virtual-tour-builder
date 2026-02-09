import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  Ruler,
  ShieldCheck,
  Clock,
  Eye,
  Heart,
  Brain,
  Share2,
  Layout as LayoutIcon,
  Accessibility,
  Building2,
  Hotel,
  Store,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const benefits = [
  {
    icon: Globe,
    title: "Explorez à Tout Moment, Où Que Vous Soyez",
    description:
      "Visitez l'espace à distance sans déplacement ni prise de rendez-vous. Que ce soit en pleine nuit ou en plein jour, le jumeau numérique est toujours accessible.",
  },
  {
    icon: Ruler,
    title: "Compréhension Réelle de l'Espace",
    description:
      "Obtenez des agencements précis, les dimensions des pièces et la circulation — pas seulement des photos sélectionnées qui cachent la réalité.",
  },
  {
    icon: ShieldCheck,
    title: "Plus de Confiance, Moins de Surprises",
    description:
      "Ce que vous voyez en ligne correspond fidèlement à l'espace réel. Parcourez chaque recoin avant de vous engager.",
  },
  {
    icon: Clock,
    title: "Gagnez du Temps et de l'Énergie",
    description:
      "Présélectionnez plus vite et éliminez les visites physiques inutiles. Concentrez-vous uniquement sur les espaces qui correspondent à vos besoins.",
  },
  {
    icon: Eye,
    title: "Confiance Grâce à la Transparence",
    description:
      "Rien n'est caché. Inspectez chaque détail librement et soyez certain de voir l'ensemble du tableau.",
  },
  {
    icon: Heart,
    title: "Connexion Émotionnelle Renforcée",
    description:
      "L'expérience immersive vous aide à vous projeter dans l'espace — imaginez vos meubles, votre vie, votre activité sur place.",
  },
  {
    icon: Brain,
    title: "Meilleures Décisions, Moins de Risques",
    description:
      "Faites des choix éclairés avec moins d'incertitude. Réduisez les regrets en explorant minutieusement avant de décider.",
  },
  {
    icon: Share2,
    title: "Partage et Collaboration Faciles",
    description:
      "Partagez le jumeau numérique instantanément avec votre famille, partenaires ou collaborateurs. Chacun peut explorer indépendamment.",
  },
  {
    icon: LayoutIcon,
    title: "Planifiez et Visualisez à l'Avance",
    description:
      "Utilisez les mesures et vues détaillées pour planifier l'aménagement, les agencements ou les rénovations avant d'emménager.",
  },
  {
    icon: Accessibility,
    title: "Accessible à Tous",
    description:
      "Évaluez les espaces sans barrières physiques ni limitations de mobilité. Tout le monde a un accès égal pour explorer.",
  },
];

const industries = [
  {
    icon: Building2,
    title: "Immobilier",
    description:
      "Les acheteurs et locataires peuvent visiter les biens à distance, présélectionner avec confiance et prendre des décisions plus rapides sans multiplier les visites.",
  },
  {
    icon: Hotel,
    title: "Hôtellerie",
    description:
      "Les voyageurs peuvent explorer les chambres, halls et équipements avant de réserver, pour une satisfaction accrue et moins de déceptions.",
  },
  {
    icon: Store,
    title: "Commerce",
    description:
      "Les décideurs peuvent évaluer les agencements de magasins, les flux de circulation et le potentiel de l'espace sans se déplacer.",
  },
  {
    icon: Briefcase,
    title: "Bureaux & Espaces Commerciaux",
    description:
      "Les équipes peuvent évaluer les espaces de travail ensemble, mesurer les surfaces pour l'aménagement et aligner les parties prenantes à distance.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Benefits = () => {
  return (
    <Layout>
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20"
            >
              Avantages Clients
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight"
            >
              Voyez. Ressentez.{" "}
              <span className="text-gradient-accent">Décidez en Toute Confiance.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              Les jumeaux numériques vous permettent d'explorer n'importe quel espace à distance avec une précision spatiale totale — pour prendre de meilleures décisions sans vous déplacer.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Pourquoi Nos Clients l'Adorent"
            title="Des Avantages Qui Font la Différence"
            description="Chaque avantage est conçu autour de ce qui compte le plus pour vous — clarté, confiance et commodité."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="group p-6 rounded-2xl bg-card shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Exemples par Secteur"
            title="Comment les Clients en Profitent dans Chaque Secteur"
            description="De l'immobilier à l'hôtellerie, les jumeaux numériques renforcent l'expérience client dans tous les domaines."
          />

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300 flex gap-5"
              >
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center bg-accent/10 text-accent">
                  <industry.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                    {industry.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6"
            >
              Informé. Confiant. Maître de Vos Décisions.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/70 mb-10"
            >
              Les jumeaux numériques Matterport vous offrent tout ce dont vous avez besoin pour évaluer, comparer et décider — avant même votre première visite physique.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Commencer Aujourd'hui
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/portfolio">Découvrir Notre Portfolio</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Benefits;
