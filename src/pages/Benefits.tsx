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
  Landmark,
  PenTool,
  Settings,
  Megaphone,
  Users,
  Factory,
  ShieldCheck as Insurance,
  HardHat,
  Plane,
  ShoppingCart,
  Home,
  Building,
  Zap,
  Fuel,
  User,
  Handshake,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useI18n } from "@/i18n";

const benefits = [
  {
    icon: Globe,
    title: { fr: "Explorez à Tout Moment, Où Que Vous Soyez", en: "Explore Anytime, Anywhere" },
    description: {
      fr: "Visitez l'espace à distance sans déplacement ni prise de rendez-vous. Que ce soit en pleine nuit ou en plein jour, le jumeau numérique est toujours accessible.",
      en: "Visit the space remotely without travel or appointments. Whether at night or during the day, the digital twin is always accessible.",
    },
  },
  {
    icon: Ruler,
    title: { fr: "Compréhension Réelle de l'Espace", en: "True Understanding of the Space" },
    description: {
      fr: "Obtenez des agencements précis, les dimensions des pièces et la circulation — pas seulement des photos sélectionnées qui cachent la réalité.",
      en: "Get accurate layouts, room dimensions, and circulation — not just curated photos that hide reality.",
    },
  },
  {
    icon: ShieldCheck,
    title: { fr: "Plus de Confiance, Moins de Surprises", en: "More Confidence, Fewer Surprises" },
    description: {
      fr: "Ce que vous voyez en ligne correspond fidèlement à l'espace réel. Parcourez chaque recoin avant de vous engager.",
      en: "What you see online faithfully matches the real space. Explore every corner before committing.",
    },
  },
  {
    icon: Clock,
    title: { fr: "Gagnez du Temps et de l'Énergie", en: "Save Time and Energy" },
    description: {
      fr: "Présélectionnez plus vite et éliminez les visites physiques inutiles. Concentrez-vous uniquement sur les espaces qui correspondent à vos besoins.",
      en: "Shortlist faster and eliminate unnecessary physical visits. Focus only on spaces that match your needs.",
    },
  },
  {
    icon: Eye,
    title: { fr: "Confiance Grâce à la Transparence", en: "Confidence Through Transparency" },
    description: {
      fr: "Rien n'est caché. Inspectez chaque détail librement et soyez certain de voir l'ensemble du tableau.",
      en: "Nothing is hidden. Inspect every detail freely and be sure you see the full picture.",
    },
  },
  {
    icon: Heart,
    title: { fr: "Connexion Émotionnelle Renforcée", en: "Stronger Emotional Connection" },
    description: {
      fr: "L'expérience immersive vous aide à vous projeter dans l'espace — imaginez vos meubles, votre vie, votre activité sur place.",
      en: "The immersive experience helps you envision the space — imagine your furniture, your life, your business on site.",
    },
  },
  {
    icon: Brain,
    title: { fr: "Meilleures Décisions, Moins de Risques", en: "Better Decisions, Less Risk" },
    description: {
      fr: "Faites des choix éclairés avec moins d'incertitude. Réduisez les regrets en explorant minutieusement avant de décider.",
      en: "Make informed choices with less uncertainty. Reduce regrets by exploring thoroughly before deciding.",
    },
  },
  {
    icon: Share2,
    title: { fr: "Partage et Collaboration Faciles", en: "Easy Sharing and Collaboration" },
    description: {
      fr: "Partagez le jumeau numérique instantanément avec votre famille, partenaires ou collaborateurs. Chacun peut explorer indépendamment.",
      en: "Share the digital twin instantly with family, partners, or collaborators. Everyone can explore independently.",
    },
  },
  {
    icon: LayoutIcon,
    title: { fr: "Planifiez et Visualisez à l'Avance", en: "Plan and Visualize Ahead" },
    description: {
      fr: "Utilisez les mesures et vues détaillées pour planifier l'aménagement, les agencements ou les rénovations avant d'emménager.",
      en: "Use detailed measurements and views to plan layouts, fixtures, or renovations before moving in.",
    },
  },
  {
    icon: Accessibility,
    title: { fr: "Accessible à Tous", en: "Accessible to Everyone" },
    description: {
      fr: "Évaluez les espaces sans barrières physiques ni limitations de mobilité. Tout le monde a un accès égal pour explorer.",
      en: "Evaluate spaces without physical barriers or mobility limitations. Everyone has equal access to explore.",
    },
  },
];

const industries = [
  {
    icon: Building2,
    title: { fr: "Immobilier", en: "Real Estate" },
    description: {
      fr: "Les acheteurs et locataires peuvent visiter les biens à distance, présélectionner avec confiance et prendre des décisions plus rapides sans multiplier les visites.",
      en: "Buyers and tenants can tour properties remotely, shortlist with confidence, and make faster decisions without multiple visits.",
    },
  },
  {
    icon: Hotel,
    title: { fr: "Hôtellerie", en: "Hospitality" },
    description: {
      fr: "Les voyageurs peuvent explorer les chambres, halls et équipements avant de réserver, pour une satisfaction accrue et moins de déceptions.",
      en: "Travelers can explore rooms, lobbies, and amenities before booking, for greater satisfaction and fewer disappointments.",
    },
  },
  {
    icon: Store,
    title: { fr: "Commerce", en: "Commerce" },
    description: {
      fr: "Les décideurs peuvent évaluer les agencements de magasins, les flux de circulation et le potentiel de l'espace sans se déplacer.",
      en: "Decision-makers can evaluate store layouts, traffic flow, and space potential without traveling.",
    },
  },
  {
    icon: Briefcase,
    title: { fr: "Bureaux & Espaces Commerciaux", en: "Offices & Commercial Spaces" },
    description: {
      fr: "Les équipes peuvent évaluer les espaces de travail ensemble, mesurer les surfaces pour l'aménagement et aligner les parties prenantes à distance.",
      en: "Teams can evaluate workspaces together, measure areas for layout, and align stakeholders remotely.",
    },
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

const solutionsList = [
  { icon: Landmark, title: { fr: "Immobilier Commercial", en: "Commercial Real Estate" }, subtitle: { fr: "Gérez des portefeuilles entiers", en: "Manage entire portfolios" } },
  { icon: PenTool, title: { fr: "Design & Construction", en: "Design & Construction" }, subtitle: { fr: "Accélérez vos projets AEC", en: "Accelerate your AEC projects" } },
  { icon: Settings, title: { fr: "Gestion des Installations", en: "Facility Management" }, subtitle: { fr: "Gérez et visitez à distance", en: "Manage and visit remotely" } },
  { icon: Megaphone, title: { fr: "Marketing Immobilier", en: "Real Estate Marketing" }, subtitle: { fr: "Commercialisez vos espaces", en: "Market your spaces" } },
  { icon: Users, title: { fr: "Entreprise", en: "Enterprise" }, subtitle: { fr: "Collaborez à grande échelle", en: "Collaborate at scale" } },
];

const industriesList = [
  { icon: Building2, title: { fr: "Immobilier Commercial", en: "Commercial Real Estate" }, href: "/industries/commercial-real-estate" },
  { icon: HardHat, title: { fr: "Architecture & Construction", en: "Architecture & Construction" }, href: "/industries/architecture-construction" },
  { icon: Factory, title: { fr: "Industrie", en: "Manufacturing" }, href: "/industries/manufacturing" },
  { icon: Insurance, title: { fr: "Assurance", en: "Insurance" }, href: "/industries/insurance" },
  { icon: Home, title: { fr: "Construction Résidentielle", en: "Residential Construction" }, href: "/industries/residential-construction" },
  { icon: Plane, title: { fr: "Tourisme & Hôtellerie", en: "Travel & Hospitality" }, href: "/industries/travel-hospitality" },
  { icon: ShoppingCart, title: { fr: "Commerce & Retail", en: "Commerce & Retail" }, href: "/industries/commerce-retail" },
  { icon: Home, title: { fr: "Immobilier Résidentiel", en: "Residential Real Estate" }, href: "/industries/residential-real-estate" },
  { icon: Building, title: { fr: "Gouvernement", en: "Government" }, href: "/industries/government" },
  { icon: Zap, title: { fr: "Énergie & Utilités", en: "Energy & Utilities" }, href: "/industries/energy-utilities" },
  { icon: Fuel, title: { fr: "Pétrole & Gaz", en: "Oil & Gas" }, href: "/industries/oil-gas" },
];

const rolesList = [
  { fr: "Propriétaire", en: "Owner" },
  { fr: "Occupant Commercial", en: "Commercial Tenant" },
  { fr: "Gestionnaire Immobilier", en: "Property Manager" },
  { fr: "Architecte", en: "Architect" },
  { fr: "Designer", en: "Designer" },
  { fr: "Professionnel Construction", en: "Construction Professional" },
  { fr: "Facility Manager", en: "Facility Manager" },
  { fr: "Agent Immobilier", en: "Real Estate Agent" },
];

const Benefits = () => {
  const { lang, t } = useI18n();
  const T = (obj: { fr: string; en: string }) => obj[lang];

  return (
    <Layout>
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-hero overflow-hidden">
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
              {lang === "fr" ? "Avantages Clients" : "Client Benefits"}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-4 md:mb-6 leading-tight"
            >
              {lang === "fr" ? "Voyez. Ressentez." : "See. Feel."}{" "}
              <span className="text-gradient-accent">{lang === "fr" ? "Décidez en Toute Confiance." : "Decide with Full Confidence."}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-xl text-white/90 max-w-2xl mx-auto"
            >
              {lang === "fr"
                ? "Les jumeaux numériques PrimeSpace vous permettent d'explorer n'importe quel espace à distance avec une précision spatiale totale — pour prendre de meilleures décisions sans vous déplacer."
                : "PrimeSpace digital twins let you explore any space remotely with total spatial accuracy — to make better decisions without traveling."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={lang === "fr" ? "Pourquoi Nos Clients l'Adorent" : "Why Our Clients Love It"}
            title={lang === "fr" ? "Des Avantages Qui Font la Différence" : "Benefits That Make a Difference"}
            description={lang === "fr" ? "Chaque avantage est conçu autour de ce qui compte le plus pour vous — clarté, confiance et commodité." : "Every benefit is designed around what matters most to you — clarity, confidence, and convenience."}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={T(benefit.title)}
                variants={itemVariants}
                className="group p-5 md:p-6 rounded-2xl bg-card shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 md:mb-5 bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                  <benefit.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="font-display font-semibold text-lg md:text-xl mb-2 text-foreground">
                  {T(benefit.title)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {T(benefit.description)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions Section - Matterport Style */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={lang === "fr" ? "Nos Solutions" : "Our Solutions"}
            title={lang === "fr" ? "Tout Ce Dont Vous Avez Besoin" : "Everything You Need"}
            description={lang === "fr" ? "Solutions, secteurs d'activité et rôles professionnels couverts par nos visites virtuelles 3D." : "Solutions, industries, and professional roles covered by our 3D virtual tours."}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16"
          >
            {/* Column 1: Solutions */}
            <div>
              <h3 className="font-display font-semibold text-lg text-muted-foreground mb-6 uppercase tracking-wider text-sm">
                Solutions
              </h3>
              <div className="space-y-5">
                {solutionsList.map((item) => (
                  <div key={T(item.title)} className="flex items-start gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-secondary transition-colors">{T(item.title)}</p>
                      <p className="text-sm text-muted-foreground">{T(item.subtitle)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: For Your Industry */}
            <div>
              <h3 className="font-display font-semibold text-lg text-muted-foreground mb-6 uppercase tracking-wider text-sm">
                {lang === "fr" ? "Pour Votre Secteur" : "For Your Industry"}
              </h3>
              <div className="space-y-4">
                {industriesList.map((item) => {
                  const content = (
                    <>
                      <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors flex-shrink-0" />
                      <p className="font-medium text-foreground group-hover:text-secondary transition-colors">{T(item.title)}</p>
                      {"href" in item && item.href && <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground/0 group-hover:text-secondary group-hover:translate-x-1 transition-all flex-shrink-0" />}
                    </>
                  );
                  return "href" in item && item.href ? (
                    <Link key={T(item.title)} to={item.href} className="flex items-center gap-3 group">
                      {content}
                    </Link>
                  ) : (
                    <div key={T(item.title)} className="flex items-center gap-3 group cursor-default">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 3: For Your Role */}
            <div>
              <h3 className="font-display font-semibold text-lg text-muted-foreground mb-6 uppercase tracking-wider text-sm">
                {lang === "fr" ? "Pour Votre Rôle" : "For Your Role"}
              </h3>
              <div className="space-y-4">
                {rolesList.map((role) => (
                  <div key={T(role)} className="flex items-center gap-3 group cursor-default">
                    <User className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors flex-shrink-0" />
                    <p className="font-medium text-foreground group-hover:text-secondary transition-colors">{T(role)}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={lang === "fr" ? "Exemples par Secteur" : "Industry Examples"}
            title={lang === "fr" ? "Comment les Clients en Profitent dans Chaque Secteur" : "How Clients Benefit in Every Industry"}
            description={lang === "fr" ? "De l'immobilier à l'hôtellerie, les jumeaux numériques renforcent l'expérience client dans tous les domaines." : "From real estate to hospitality, digital twins enhance the client experience across all sectors."}
          />

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={T(industry.title)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-5 md:p-8 rounded-2xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300 flex gap-4 md:gap-5"
              >
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center bg-accent/10 text-accent">
                  <industry.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                    {T(industry.title)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {T(industry.description)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-12 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4 md:mb-6"
            >
              {lang === "fr" ? "Informé. Confiant. Maître de Vos Décisions." : "Informed. Confident. In Control of Your Decisions."}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-primary-foreground/70 mb-8 md:mb-10"
            >
              {lang === "fr"
                ? "Les jumeaux numériques PrimeSpace vous offrent tout ce dont vous avez besoin pour évaluer, comparer et décider — avant même votre première visite physique."
                : "PrimeSpace digital twins give you everything you need to evaluate, compare, and decide — even before your first physical visit."}
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
                  {lang === "fr" ? "Commencer Aujourd'hui" : "Get Started Today"}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/portfolio">{lang === "fr" ? "Découvrir Notre Portfolio" : "Discover Our Portfolio"}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Benefits;
