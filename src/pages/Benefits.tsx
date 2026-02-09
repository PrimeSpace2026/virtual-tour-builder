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
import { useLanguage } from "@/contexts/LanguageContext";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Benefits = () => {
  const { t } = useLanguage();

  const benefits = [
    { icon: Globe, title: t("Explorez à Tout Moment, Où Que Vous Soyez", "Explore Anytime, Anywhere"), description: t("Visitez l'espace à distance sans déplacement ni prise de rendez-vous. Que ce soit en pleine nuit ou en plein jour, le jumeau numérique est toujours accessible.", "Visit the space remotely without travel or appointments. Whether day or night, the digital twin is always accessible.") },
    { icon: Ruler, title: t("Compréhension Réelle de l'Espace", "True Understanding of the Space"), description: t("Obtenez des agencements précis, les dimensions des pièces et la circulation — pas seulement des photos sélectionnées qui cachent la réalité.", "Get accurate layouts, room dimensions and circulation — not just selected photos that hide reality.") },
    { icon: ShieldCheck, title: t("Plus de Confiance, Moins de Surprises", "More Confidence, Fewer Surprises"), description: t("Ce que vous voyez en ligne correspond fidèlement à l'espace réel. Parcourez chaque recoin avant de vous engager.", "What you see online faithfully matches the real space. Browse every corner before committing.") },
    { icon: Clock, title: t("Gagnez du Temps et de l'Énergie", "Save Time and Energy"), description: t("Présélectionnez plus vite et éliminez les visites physiques inutiles. Concentrez-vous uniquement sur les espaces qui correspondent à vos besoins.", "Shortlist faster and eliminate unnecessary physical visits. Focus only on spaces that match your needs.") },
    { icon: Eye, title: t("Confiance Grâce à la Transparence", "Confidence Through Transparency"), description: t("Rien n'est caché. Inspectez chaque détail librement et soyez certain de voir l'ensemble du tableau.", "Nothing is hidden. Inspect every detail freely and be sure you see the full picture.") },
    { icon: Heart, title: t("Connexion Émotionnelle Renforcée", "Stronger Emotional Connection"), description: t("L'expérience immersive vous aide à vous projeter dans l'espace — imaginez vos meubles, votre vie, votre activité sur place.", "The immersive experience helps you envision yourself in the space — imagine your furniture, your life, your business there.") },
    { icon: Brain, title: t("Meilleures Décisions, Moins de Risques", "Better Decisions, Less Risk"), description: t("Faites des choix éclairés avec moins d'incertitude. Réduisez les regrets en explorant minutieusement avant de décider.", "Make informed choices with less uncertainty. Reduce regrets by thoroughly exploring before deciding.") },
    { icon: Share2, title: t("Partage et Collaboration Faciles", "Easy Sharing and Collaboration"), description: t("Partagez le jumeau numérique instantanément avec votre famille, partenaires ou collaborateurs. Chacun peut explorer indépendamment.", "Share the digital twin instantly with your family, partners or collaborators. Everyone can explore independently.") },
    { icon: LayoutIcon, title: t("Planifiez et Visualisez à l'Avance", "Plan and Visualize Ahead"), description: t("Utilisez les mesures et vues détaillées pour planifier l'aménagement, les agencements ou les rénovations avant d'emménager.", "Use measurements and detailed views to plan layout, fittings or renovations before moving in.") },
    { icon: Accessibility, title: t("Accessible à Tous", "Accessible to Everyone"), description: t("Évaluez les espaces sans barrières physiques ni limitations de mobilité. Tout le monde a un accès égal pour explorer.", "Evaluate spaces without physical barriers or mobility limitations. Everyone has equal access to explore.") },
  ];

  const industries = [
    { icon: Building2, title: t("Immobilier", "Real Estate"), description: t("Les acheteurs et locataires peuvent visiter les biens à distance, présélectionner avec confiance et prendre des décisions plus rapides sans multiplier les visites.", "Buyers and tenants can visit properties remotely, shortlist with confidence and make faster decisions without multiple visits.") },
    { icon: Hotel, title: t("Hôtellerie", "Hospitality"), description: t("Les voyageurs peuvent explorer les chambres, halls et équipements avant de réserver, pour une satisfaction accrue et moins de déceptions.", "Travelers can explore rooms, lobbies and amenities before booking, for greater satisfaction and fewer disappointments.") },
    { icon: Store, title: t("Commerce", "Retail"), description: t("Les décideurs peuvent évaluer les agencements de magasins, les flux de circulation et le potentiel de l'espace sans se déplacer.", "Decision-makers can evaluate store layouts, traffic flow and space potential without traveling.") },
    { icon: Briefcase, title: t("Bureaux & Espaces Commerciaux", "Offices & Commercial Spaces"), description: t("Les équipes peuvent évaluer les espaces de travail ensemble, mesurer les surfaces pour l'aménagement et aligner les parties prenantes à distance.", "Teams can evaluate workspaces together, measure areas for layout and align stakeholders remotely.") },
  ];

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
              {t("Avantages Clients", "Client Benefits")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight"
            >
              {t("Voyez. Ressentez.", "See. Feel.")}{" "}
              <span className="text-gradient-accent">{t("Décidez en Toute Confiance.", "Decide with Confidence.")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              {t(
                "Les jumeaux numériques Matterport vous permettent d'explorer n'importe quel espace à distance avec une précision spatiale totale — pour prendre de meilleures décisions sans vous déplacer.",
                "Matterport digital twins let you explore any space remotely with total spatial accuracy — to make better decisions without traveling."
              )}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={t("Pourquoi Nos Clients l'Adorent", "Why Our Clients Love It")}
            title={t("Des Avantages Qui Font la Différence", "Benefits That Make a Difference")}
            description={t("Chaque avantage est conçu autour de ce qui compte le plus pour vous — clarté, confiance et commodité.", "Every benefit is designed around what matters most to you — clarity, confidence and convenience.")}
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
            badge={t("Exemples par Secteur", "Industry Examples")}
            title={t("Comment les Clients en Profitent dans Chaque Secteur", "How Clients Benefit in Every Industry")}
            description={t("De l'immobilier à l'hôtellerie, les jumeaux numériques renforcent l'expérience client dans tous les domaines.", "From real estate to hospitality, digital twins enhance the client experience across all sectors.")}
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
              {t("Informé. Confiant. Maître de Vos Décisions.", "Informed. Confident. In Control of Your Decisions.")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/70 mb-10"
            >
              {t(
                "Les jumeaux numériques Matterport vous offrent tout ce dont vous avez besoin pour évaluer, comparer et décider — avant même votre première visite physique.",
                "Matterport digital twins give you everything you need to evaluate, compare and decide — before even your first physical visit."
              )}
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
                  {t("Commencer Aujourd'hui", "Get Started Today")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/portfolio">{t("Découvrir Notre Portfolio", "Discover Our Portfolio")}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Benefits;
