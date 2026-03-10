import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HardHat,
  Ruler,
  ArrowRight,
  Play,
  Hammer,
  BadgeCheck,
  ScanLine,
  Layers,
  Eye,
  ClipboardCheck,
  Shield,
  RefreshCw,
  Users,
  Camera,
  Lock,
  MessageSquare,
  Plug,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const stats = [
  { value: "75%", label: "de visites sur site en moins pour les parties prenantes" },
  { value: "70%", label: "de réduction des coûts de relevés et création BIM" },
  { value: "30%", label: "d'économies grâce à une meilleure collaboration" },
  { value: "75%", label: "des problèmes résolus sans escalade" },
];

const phases = [
  {
    id: "design",
    icon: Ruler,
    title: "Conception",
    features: [
      "Documentation as-built",
      "Évaluation des conditions",
      "Évaluation conception / risques",
      "Conception détaillée",
      "Planification de chantier",
      "Scan-to-CAD / fichier BIM",
      "Estimation",
    ],
  },
  {
    id: "construction",
    icon: Hammer,
    title: "Construction",
    features: [
      "Suivi d'avancement",
      "QA / QC",
      "Coordination des problèmes & RFI",
      "Validation des lots de travaux",
      "Documentation des jalons",
      "Formation sécurité",
    ],
  },
  {
    id: "handover",
    icon: BadgeCheck,
    title: "Réception / Livraison",
    features: [
      "Réception & livraison",
      "Documentation de clôture",
      "Base de données FM",
      "Documentation specs & garanties",
      "Support de formation / onboarding",
      "Promotion du bâtiment",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const fadeUpStagger = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const keyBenefits = [
  {
    icon: ScanLine,
    title: "Capture 3D Haute Précision",
    description:
      "Numérisez n'importe quel espace avec une précision dimensionnelle de 99%. Obtenez des relevés fiables pour vos projets de conception et de rénovation.",
  },
  {
    icon: Layers,
    title: "Intégration BIM & CAD",
    description:
      "Exportez vos captures en formats compatibles Revit, AutoCAD et autres outils BIM. Accélérez la modélisation et réduisez les erreurs de saisie.",
  },
  {
    icon: Eye,
    title: "Suivi Visuel de Chantier",
    description:
      "Comparez l'avancement réel avec les plans. Détectez les écarts, documentez les problèmes et partagez l'état du chantier avec toutes les parties prenantes.",
  },
  {
    icon: ClipboardCheck,
    title: "Contrôle Qualité Simplifié",
    description:
      "Effectuez des inspections QA/QC à distance. Annotez directement sur le jumeau numérique et suivez la résolution des non-conformités.",
  },
  {
    icon: Shield,
    title: "Réduction des Risques",
    description:
      "Identifiez les conflits et problèmes potentiels avant qu'ils ne surviennent sur le chantier. Évitez les retouches coûteuses et les retards.",
  },
  {
    icon: RefreshCw,
    title: "Collaboration en Temps Réel",
    description:
      "Partagez un jumeau numérique accessible par tous les intervenants. Architectes, ingénieurs et constructeurs travaillent sur une source de vérité unique.",
  },
];



const ArchitectureConstruction = () => {
  return (
    <Layout>
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <iframe
            src="https://my.matterport.com/show/?m=DyGfVrBRybc&log=0&help=0&nt=0&play=1&qs=0&brand=0&dh=0&tour=1&gt=1&hr=0&mls=2&mt=0&tagNav=0&pin=0&portal=1&f=0&fp=0&nozoom=1&search=0&wh=0&kb=0&lp=0&title=0&tourcta=0&vr=0"
            title="Visite virtuelle architecture et construction"
            className="w-full h-full object-cover border-0"
            style={{ pointerEvents: "none" }}
            allow="fullscreen; autoplay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/65 to-primary/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20 md:pt-24 pb-10 md:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20">
                <HardHat className="w-4 h-4 inline mr-2" />
                Architecture & Construction
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-4 md:mb-6"
            >
              Détectez les problèmes{" "}
              <span className="text-gradient-accent">
                avant qu'ils ne surviennent
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto px-2 md:px-0"
            >
              Intégrez la plateforme de jumeaux numériques 3D dans vos flux de
              conception et de construction pour améliorer la communication,
              gagner du temps et réduire les risques.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Demander un Devis
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/portfolio" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Voir des Exemples
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Embedded 3D Model Viewer */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-elevated border border-border aspect-video max-w-5xl mx-auto"
          >
            <iframe
              src="https://my.matterport.com/show/?m=DyGfVrBRybc&log=0&help=0&nt=0&play=0&qs=0&brand=0&dh=1&tour=1&gt=1&hr=1&mls=1&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=1&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
              title="Visite virtuelle - Architecture & Construction"
              className="w-full h-full"
              allow="fullscreen"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* Explore Two Stages Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
              Explorez deux étapes d'un{" "}
              <span className="text-[#2c0a71]">même chantier</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Comparez la progression du projet en naviguant entre la phase de
              structure et la phase d'aménagement intérieur.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
            {/* Framing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-border aspect-video mb-4">
                <iframe
                  src="https://my.matterport.com/show/?m=rN4D2wNA53g&log=0&help=0&nt=0&play=0&qs=1&brand=0&dh=1&tour=1&gt=1&hr=1&mls=1&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=1&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
                  title="Visite virtuelle - Phase Gros Œuvre"
                  className="w-full h-full"
                  allow="fullscreen"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2c0a71]/10 flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-[#2c0a71]" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-display font-bold">
                    Gros Œuvre (Framing)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Structure, charpente et ossature du bâtiment
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Fit-Out */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-border aspect-video mb-4">
                <iframe
                  src="https://my.matterport.com/show/?m=BUa7cJJDnrt&log=0&help=0&nt=0&play=0&qs=0&brand=0&dh=1&tour=1&gt=1&hr=1&mls=1&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=1&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
                  title="Visite virtuelle - Phase Aménagement"
                  className="w-full h-full"
                  allow="fullscreen"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2c0a71]/10 flex items-center justify-center">
                  <BadgeCheck className="w-5 h-5 text-[#2c0a71]" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-display font-bold">
                    Aménagement (Fit-Out)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Finitions, agencement et aménagement intérieur
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Streamline As-Built Model Creation */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
                Simplifiez la création de modèles as-built.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                Éliminez les mesures manuelles et accélérez la création de
                modèles as-built en générant des nuages de points haute densité
                et des fichiers BIM LOD 200. Exportez en formats .E57, .XYZ,
                .OBJ, .RVT, .IFC, .DWG comme base de départ pour votre
                processus de modélisation.
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  En savoir plus sur les fichiers BIM
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden bg-muted"
            >
              <video
                src="https://videos.ctfassets.net/icnj41gkyohw/5lqOYzCJtLXlvv8dHdYOTg/e51745a5c66f7d871682cbf46f8e3648/streamline-model-creation.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Feature — Tags Import / Export */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#2c0a71]/10 text-[#2c0a71] text-sm font-semibold mb-4 uppercase tracking-wide">
                Nouvelle fonctionnalité
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 md:mb-6">
                Ajoutez et gérez les détails tagués{" "}
                <span className="text-[#2c0a71]">plus facilement que jamais</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                Importez et exportez vos tags en masse, organisez les annotations
                directement dans le jumeau numérique 3D, et partagez les détails
                critiques avec toutes les parties prenantes du projet.
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  En savoir plus
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-border">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/7dCposg2EnVAnqkLOVA63f/c1e31e1d169ce06d77e7e95463cd8336/Tags_Import_Export.png"
                  alt="Import et export de tags dans le jumeau numérique"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-border">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/4HivzCatQ4YJRDIP7PR8l2/c446e4a567e322d2a444202780b21ef2/Frame_7709.png"
                  alt="Gestion des tags et annotations 3D"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3-Column Phases Section — Matterport style */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold">
              Capturez, documentez et collaborez avec une{" "}
              <span className="text-[#2c0a71]">clarté 3D inégalée</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-8">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpStagger}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#2c0a71]/10 flex items-center justify-center mb-5 md:mb-6">
                  <phase.icon className="w-8 h-8 md:w-10 md:h-10 text-[#2c0a71]" />
                </div>

                <h3 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-5">
                  {phase.title}
                </h3>

                <ul className="space-y-3">
                  {phase.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-14 md:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-8 md:mb-12"
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-[#2c0a71]">
              En chiffres
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold mt-2">
              Les clients PrimeSpace ont constaté :
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpStagger}
                className="text-center"
              >
                <div className="text-2xl md:text-4xl font-display font-bold text-[#2c0a71] mb-1 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimize Site Visits */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/2Q5d6m7qcMQSKIlivIlE3c/bcd76bd3b10efa8c35c5702a4c4b99ae/minimize-site-visits.png"
                alt="Réduisez les visites sur site grâce aux jumeaux numériques"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
                Réduisez les visites sur site.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                Qu'il s'agisse de formations à la sécurité ou d'inspections
                qualité, les jumeaux numériques PrimeSpace offrent aux parties
                prenantes un accès sécurisé 24h/24 au chantier, à chaque étape
                du projet.
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Parler à un Expert
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaborate in Context */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
                Collaborez en contexte.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                Digitalisez votre processus QA/QC et éliminez les erreurs de
                communication grâce aux jumeaux numériques PrimeSpace. Identifiez
                les problèmes avant qu'ils n'impactent les budgets et les
                plannings du projet.
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  En savoir plus sur les jumeaux numériques
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/6sB8RCGyT39T2OEP97XpHL/2fae40816944e676c4d0a32f34bc9faa/collaborate-in-context.png"
                alt="Collaborez en contexte sur le chantier numérique"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrate with Tools You Already Use */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
                Intégrez vos outils existants.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                Connectez la plateforme de jumeaux numériques PrimeSpace à vos
                logiciels de gestion de projet pour une collaboration fluide
                entre toutes les parties prenantes tout au long du cycle de vie
                du projet. Rationalisez vos workflows, éliminez la perte
                d'informations et communiquez les problèmes avec une clarté
                visuelle 3D.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    Intégration Autodesk
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    Intégration Procore
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/4SKTr1DL1UNzr1oGonSojR/5acb67fa47ed0e5a133d5951605ca7c4/collaboration-illustration.png"
                alt="Intégration avec vos outils de gestion de projet existants"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Right Tools for the Job */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold">
              Les bons outils pour le chantier.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                icon: Camera,
                title: "Polyvalent",
                description:
                  "La plateforme PrimeSpace fonctionne avec une variété de caméras. Choisissez celle qui convient le mieux à votre chantier.",
              },
              {
                icon: Lock,
                title: "Données sécurisées",
                description:
                  "Ajoutez différents niveaux de permissions utilisateurs pour garder vos données privées et sécurisées.",
              },
              {
                icon: MessageSquare,
                title: "Collaboration efficace",
                description:
                  "Accédez à des outils intuitifs pour collaborer, planifier et partager avec votre équipe, vos fournisseurs et vos clients.",
              },
              {
                icon: Plug,
                title: "Connexion aux systèmes existants",
                description:
                  "Apportez une clarté visuelle à vos workflows dans Autodesk, Procore et d'autres logiciels AEC.",
              },
            ].map((tool, i) => (
              <motion.div
                key={tool.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpStagger}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#2c0a71]/10 flex items-center justify-center mb-5 md:mb-6">
                  <tool.icon className="w-8 h-8 md:w-10 md:h-10 text-[#2c0a71]" />
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold mb-3">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-[#2c0a71] transition-colors"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinar Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/1KC6gTyCPxNDsl3xGTO2Lt/0f6b90bad4778c57e77dbe3a7d5ad313/1__1_.png"
                alt="Webinaire PrimeSpace – Efficacité en architecture et construction"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block text-sm font-bold uppercase tracking-widest text-red-600 mb-4">
                Webinaire
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
                Comment améliorer l'efficacité de vos projets.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                Les informations critiques sur un bâtiment sont indispensables
                pour tout architecte, ingénieur ou professionnel de la
                construction afin de lancer efficacement un projet. La
                documentation des conditions existantes est essentielle, mais
                souvent obsolète.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                Découvrez comment les jumeaux numériques transforment la
                documentation de projet. En réduisant les visites sur site et les
                coûts tout au long du cycle de vie du projet, PrimeSpace établit
                une nouvelle norme d'efficacité.
              </p>
              <Button size="lg" className="bg-black hover:bg-black/90 text-white" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Regarder maintenant
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="text-xl md:text-3xl font-display font-medium text-foreground leading-relaxed mb-6 md:mb-8">
                "Grâce aux jumeaux numériques, nous avons réduit les retouches
                de 45% et économisé des semaines de travail sur chaque projet.
                La coordination entre nos équipes n'a jamais été aussi fluide."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2c0a71]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#2c0a71]" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">
                    Karim Benali
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Directeur de Projets, Cabinet d'Architecture
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Pourquoi adopter les jumeaux numériques 3D"
            description="Améliorez chaque aspect de vos projets AEC avec la technologie de capture et de modélisation 3D."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mt-10 md:mt-16">
            {keyBenefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpStagger}
                className="group p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#2c0a71]/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#2c0a71]/20 transition-colors">
                  <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-[#2c0a71]" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-accent" />
            <div className="relative z-10 py-12 md:py-20 px-5 md:px-8 text-center">
              <h2 className="text-2xl md:text-4xl font-display font-bold text-primary-foreground mb-4 md:mb-6">
                Prêt à transformer vos projets de construction?
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Rejoignez les architectes et constructeurs qui utilisent déjà
                les jumeaux numériques 3D pour concevoir, construire et livrer
                avec plus de précision et d'efficacité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    Demander un Devis Gratuit
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link to="/portfolio">Voir le Portfolio</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ArchitectureConstruction;
