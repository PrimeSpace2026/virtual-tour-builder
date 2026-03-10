import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Ruler,
  ArrowRight,
  Hammer,
  BadgeCheck,
  Users,
  Camera,
  Lock,
  MessageSquare,
  Plug,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const faqs = [
  {
    question: "Quels fichiers de capture de réalité puis-je exporter depuis un jumeau numérique Matterport ?",
    answer: "Vous pouvez exporter les fichiers suivants : fichiers OBJ, nuages de points colorisés, plans de plafond réfléchi (JPG/PDF), plans d'étage 2D haute résolution (SVG/JPG/PDF), fichiers E57, exports BIM (.RVT et IFC) et formats CAD (DWG et XYZ). Ces exports s'intègrent directement dans des outils comme Autodesk ReCap, Revit, AutoCAD et d'autres applications BIM/CAD pour accélérer le développement de modèles.",
  },
  {
    question: "Matterport s'intègre-t-il à Autodesk Construction Cloud ou Procore pour les RFI et le suivi des problèmes ?",
    answer: "Oui, Matterport s'intègre à Autodesk Construction Cloud et Procore pour apporter un contexte visuel du site dans les workflows de RFI et de suivi des problèmes. Ces intégrations permettent aux équipes de placer des marqueurs RFI ou des indicateurs de problèmes à des emplacements précis dans le jumeau numérique afin que les parties prenantes puissent visualiser et résoudre les problèmes avec un contexte visuel clair.",
  },
  {
    question: "Comment le scan 3D Matterport gère-t-il les extérieurs, les longues lignes de vue ou la lumière vive ?",
    answer: "Matterport est une solution complète de lidar et de photogrammétrie qui prend en charge le scan 3D intérieur et extérieur pour la documentation architecturale et de construction, souvent utilisée pour les projets à grande échelle. La caméra Pro3 est conçue pour capturer des espaces avec une portée étendue et une grande précision, ce qui la rend adaptée aux grandes surfaces et aux longues lignes de vue.",
  },
  {
    question: "Quelle densité et couverture de nuage de points puis-je attendre d'une capture Matterport Pro3 ?",
    answer: "Le Pro3 produit des nuages de points haute densité, capturant plus de 5 millions de points de profondeur filtrés par scan. Trois options de densité sont disponibles :\n\n• Standard : 800 000 points réels par scan en 20 secondes ou moins.\n• Moyenne : 1,5 million de points réels par scan en 45 secondes ou moins.\n• Haute : 5 millions de points réels par scan en 2 minutes.",
  },
  {
    question: "Quelle est la précision des modèles scan-to-BIM de Matterport pour les projets AEC ?",
    answer: "Les scans Matterport activés par LiDAR répondent aux spécifications LOD 200 pour les éléments structurels et architecturaux, fournissant une base fiable pour la modélisation as-built. De nombreuses équipes AEC utilisent ces nuages de points et exports BIM pour réduire le travail de relevé manuel et accélérer la création de modèles.",
  },
  {
    question: "Matterport convient-il aux tolérances de fabrication, ou ai-je encore besoin d'un scanner laser terrestre ?",
    answer: "Matterport est bien adapté à la vérification de layout, aux as-builts, à la coordination et au QA/QC. Pour les tolérances de fabrication ou le contrôle de qualité survey-grade nécessitant une précision submillimétrique, un scanner laser terrestre peut encore être nécessaire. De nombreuses équipes utilisent Matterport comme méthode de capture principale et le complètent par un scan de plus haute précision si nécessaire.",
  },
  {
    question: "Quel est le délai typique entre le téléchargement de la capture et la réception d'un export E57 ou d'un livrable BIM ?",
    answer: "Les services de capture Matterport peuvent scanner les sites avec des techniciens professionnels, livrant souvent les scans initiaux sous 48 heures. Les délais pour les exports E57, MatterPak et BIM varient selon la taille du projet et les options sélectionnées. Contactez votre représentant commercial pour confirmer les délais pour vos livrables spécifiques.",
  },
  {
    question: "Comment Matterport aide-t-il à réduire les visites de site et les reprises pendant la conception et la construction ?",
    answer: "Les jumeaux numériques Matterport offrent un accès distant 24h/24 à des modèles 3D précis et photoréalistes, permettant aux équipes d'inspecter les conditions, de mesurer à distance et de résoudre les problèmes sans visites de site répétées. Les clients rapportent moins de déplacements, une résolution plus rapide des RFI avec contexte visuel et une réduction des reprises.",
  },
  {
    question: "Quels sont les pièges courants lors du scan de chantiers actifs ?",
    answer: "Les pièges courants incluent : ne pas coordonner les fenêtres de capture avec les corps de métier, scanner des zones avec des équipements ou des personnes en mouvement créant des artefacts, un mauvais éclairage dans des conditions temporaires, et ne pas taguer ou documenter les éléments clés pendant la capture. Planifier des temps de capture à faible activité et suivre une checklist de capture aide à prévenir les lacunes dans la documentation.",
  },
  {
    question: "Quel ROI et gain de temps les équipes AEC peuvent-elles attendre avec Matterport ?",
    answer: "Les équipes AEC utilisant le scan 3D Matterport rapportent des économies substantielles : jusqu'à 75% de diminution des visites de site en personne, environ 70% de réduction du temps de relevé et de création de référence BIM. Les avantages supplémentaires incluent une livraison de documentation plus rapide, des coûts de déplacement et de main-d'œuvre réduits, et des gains de temps mesurables lors des inspections et de la coordination.",
  },
];

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



const ArchitectureConstruction = () => {
  return (
    <Layout>
      <WhatsAppButton />

      {/* Hero Text */}
      <section className="bg-white pt-20 md:pt-28 pb-4 md:pb-10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71] mb-3 md:mb-4">
              Détectez les problèmes avant{" "}
              qu'ils ne surviennent.
            </h2>
            <p className="text-foreground/70 text-sm md:text-lg max-w-2xl mx-auto">
              Intégrez la plateforme de jumeaux numériques 3D dans vos flux de
              conception et de construction pour améliorer la communication,
              gagner du temps et réduire les risques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero 3D Viewer */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full aspect-[4/3] sm:aspect-[2/1] lg:aspect-[3/1]"
        >
          <iframe
            src="https://my.matterport.com/show/?m=DyGfVrBRybc&log=0&help=0&nt=0&play=0&qs=0&brand=0&dh=1&tour=1&gt=1&hr=1&mls=1&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=1&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
            title="Visite virtuelle - Architecture & Construction"
            className="w-full h-full"
            allow="fullscreen"
            allowFullScreen
          />
        </motion.div>
      </section>

      {/* Explore Two Stages Section */}
      <section className="py-10 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
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
      <section className="py-10 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden order-2 lg:order-1"
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
              className="order-1 lg:order-2"
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
      <section className="py-10 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
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
      <section className="py-10 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
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

      {/* FAQ Section */}
      <section className="py-10 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold">
              FAQ — Scan 3D pour l'Architecture,{" "}
              <span className="text-[#2c0a71]">l'Ingénierie et la Construction</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpStagger}
                >
                  <AccordionItem value={`faq-${i}`} className="border-border">
                    <AccordionTrigger className="text-left text-base md:text-lg font-display font-semibold hover:text-[#2c0a71] transition-colors py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5 whitespace-pre-line">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-10 md:py-24">
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

      {/* CTA Section */}
      <section className="py-10 md:py-24">
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
