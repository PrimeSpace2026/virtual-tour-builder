import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useI18n } from "@/i18n";

/* ─── Data ────────────────────────────────────────────────────── */

const getStats = (lang: string) => [
  { value: "50%", label: lang === "fr" ? "Réduction du temps de traitement des sinistres" : "Reduction in claims processing time" },
  { value: "40%", label: lang === "fr" ? "Moins de déplacements sur site" : "Fewer on-site visits" },
  { value: "3x", label: lang === "fr" ? "Plus rapide pour la documentation des biens" : "Faster property documentation" },
  { value: "60%", label: lang === "fr" ? "Amélioration de la précision des évaluations" : "Improvement in assessment accuracy" },
];

const getUseCases = (lang: string) => [
  {
    title: lang === "fr" ? "Documentation des sinistres" : "Claims documentation",
    description: lang === "fr"
      ? "Capturez l'état complet d'une propriété après un sinistre avec des jumeaux numériques 3D précis. Documentation visuelle irréfutable pour accélérer les règlements."
      : "Capture the complete condition of a property after a loss with precise 3D digital twins. Irrefutable visual documentation to accelerate settlements.",
  },
  {
    title: lang === "fr" ? "Évaluation à distance" : "Remote assessment",
    description: lang === "fr"
      ? "Permettez aux experts et ajusteurs d'inspecter les propriétés sans se déplacer. Réduisez les délais et les coûts tout en maintenant une évaluation détaillée."
      : "Enable experts and adjusters to inspect properties without traveling. Reduce timelines and costs while maintaining detailed assessment.",
  },
  {
    title: lang === "fr" ? "Prévention des fraudes" : "Fraud prevention",
    description: lang === "fr"
      ? "Les jumeaux numériques fournissent une preuve visuelle horodatée et dimensionnellement précise, réduisant les risques de réclamations frauduleuses."
      : "Digital twins provide timestamped, dimensionally accurate visual evidence, reducing the risk of fraudulent claims.",
  },
  {
    title: lang === "fr" ? "Inventaire pré-sinistre" : "Pre-loss inventory",
    description: lang === "fr"
      ? "Documentez l'état des propriétés avant tout incident pour faciliter les comparaisons et accélérer les processus de réclamation."
      : "Document property conditions before any incident to facilitate comparisons and accelerate claims processes.",
  },
  {
    title: lang === "fr" ? "Restauration & reconstruction" : "Restoration & reconstruction",
    description: lang === "fr"
      ? "Suivez l'avancement des travaux de restauration avec des captures régulières. Comparez l'état avant/après avec précision dimensionnelle."
      : "Track restoration progress with regular captures. Compare before/after conditions with dimensional accuracy.",
  },
  {
    title: lang === "fr" ? "Souscription immobilière" : "Property underwriting",
    description: lang === "fr"
      ? "Évaluez les risques avec une visite virtuelle complète du bien avant la souscription, sans nécessiter de visite physique."
      : "Assess risk with a complete virtual tour of the property before underwriting, without requiring a physical visit.",
  },
];

const getFaqs = (lang: string) => [
  {
    question: lang === "fr" ? "Comment fonctionne la numérisation 3D pour documenter une propriété endommagée ?" : "How does 3D scanning work to document a damaged property?",
    answer: "Un technicien ou votre équipe capture l'espace avec un appareil compatible, et l'IA Cortex de PrimeSpace convertit ces images en un jumeau numérique dimensionnellement précis. Une fois traité dans le cloud PrimeSpace, vous pouvez ajouter des tags, notes et mesures, puis partager le scan 3D avec les experts et entrepreneurs pour un examen à distance. Des livrables supplémentaires, comme les plans d'étage schématiques, les fichiers PrimeSpace Sketch ou PrimeSpace TruePlan, peuvent être commandés pour les réclamations et estimations.",
  },
  {
    question: lang === "fr" ? "La numérisation 3D est-elle préférable aux photos et mesures manuelles pour une réclamation d'assurance ?" : "Is 3D scanning better than photos and manual measurements for an insurance claim?",
    answer: "Oui, la numérisation 3D fournit des données dimensionnellement précises pour un examen à distance qui aide à minimiser les litiges. Elle est particulièrement utile dans les situations dangereuses ou urgentes, les événements catastrophiques, ou lorsque la documentation pré-sinistre et la précision forensique sont importantes.",
  },
  {
    question: lang === "fr" ? "Quels livrables puis-je exporter d'un scan 3D PrimeSpace pour les réclamations ?" : "What deliverables can I export from a PrimeSpace 3D scan for claims?",
    answer: "Les livrables exportables incluent :\n\n• Plans d'étage schématiques 2D (PNG, PDF, SVG)\n• Bundles MatterPak (exports OBJ, nuages de points et imagerie haute résolution)\n• Fichiers Sketch (PrimeSpace Sketch pour Cotality et TruePlan pour Xactimate)\n• Fichiers de nuages de points E57\n• Fichiers BIM/Revit\n\nCes exports s'intègrent aux workflows de conception, d'estimation et de reconstruction pour la planification des réclamations et de la restauration.",
  },
  {
    question: lang === "fr" ? "PrimeSpace peut-il générer des fichiers sketch pour l'estimation des réclamations ?" : "Can PrimeSpace generate sketch files for claims estimation?",
    answer: "PrimeSpace génère automatiquement des fichiers sketch pour éliminer le dessin manuel et accélérer l'estimation. La numérisation 3D haute résolution produit des diagrammes SKX précis et annotés en dimensions en quelques minutes, avec PrimeSpace Sketch compatible Cotality et TruePlan compatible Xactimate.",
  },
  {
    question: lang === "fr" ? "Les modèles PrimeSpace sont-ils acceptés par les assureurs pour les inspections à distance ?" : "Are PrimeSpace models accepted by insurers for remote inspections?",
    answer: "Les jumeaux numériques et scans 3D PrimeSpace sont largement utilisés par les assureurs, experts et entreprises de restauration pour les inspections à distance, des examens de réclamations plus rapides et moins de litiges. Le partage des modèles augmente la transparence et améliore la prise de décision tout au long du cycle de vie des sinistres.",
  },
  {
    question: lang === "fr" ? "Comment PrimeSpace protège-t-il les données de sinistres et contrôle-t-il l'accès aux modèles ?" : "How does PrimeSpace protect claims data and control access to models?",
    answer: "Les modèles sont hébergés de manière sécurisée dans le cloud PrimeSpace avec une sécurité de niveau entreprise et des contrôles de permissions au niveau du compte et de l'espace. Les fonctionnalités de confidentialité comme le floutage automatique des visages, l'horodatage et la gestion des utilisateurs par API répondent aux exigences des organisations avec des politiques d'accès strictes.",
  },
  {
    question: lang === "fr" ? "Proposez-vous des services de capture à la demande si mon équipe ne possède pas de caméra ?" : "Do you offer on-demand capture services if my team doesn't own a camera?",
    answer: "Oui. PrimeSpace Capture Services met à disposition des techniciens certifiés dans plus de 700 villes pour effectuer la numérisation 3D en votre nom, généralement avec un délai de 24 à 48 heures. C'est une option rapide et abordable pour les équipes qui ont besoin d'une capture fiable sans investir dans du matériel ou de la formation.",
  },
  {
    question: lang === "fr" ? "Quelles options d'abonnement sont disponibles pour les assureurs et entrepreneurs en restauration ?" : "What subscription options are available for insurers and restoration contractors?",
    answer: "PrimeSpace propose plusieurs plans tarifaires qui évoluent selon les espaces actifs, les utilisateurs et les fonctionnalités. Les plans Entreprise ajoutent la collaboration avancée, la sécurité, les intégrations et des modules optionnels comme PrimeSpace Sketch, MatterPak, les plans d'étage schématiques et les exports BIM pour soutenir les workflows d'assurance et de restauration.\n\nPour plus d'informations sur les plans individuels, visitez notre page tarifs.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

/* ─── Page ────────────────────────────────────────────────────── */

const Insurance = () => {
  const { lang } = useI18n();

  const stats = getStats(lang);
  const useCases = getUseCases(lang);
  const faqs = getFaqs(lang);

  return (
    <Layout>
      <WhatsAppButton />

      {/* ── 1. Hero Section ─────────────────────────────────── */}
      <section className="bg-white pt-20 md:pt-28 pb-8 md:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71] mb-3 md:mb-4 leading-tight">
              {lang === "fr" ? "Numérisation 3D pour l'Assurance et la Restauration." : "3D Scanning for Insurance and Restoration."}
            </h1>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              PrimeSpace fournit une documentation et des évaluations précises,
              transparentes et équitables. Gagnez du temps, réduisez les coûts
              et clôturez les sinistres beaucoup plus rapidement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. 3D Embed ─────────────────────────────────────── */}
      <section className="bg-white pb-10 md:pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl overflow-hidden shadow-elevated border border-border aspect-video"
          >
            <iframe
              src="https://my.matterport.com/show/?m=5ZuTXTaBkbU&log=0&help=0&nt=0&play=0&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=0&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
              title="Visite virtuelle – Assurance & Restauration"
              className="w-full h-full"
              allow="fullscreen"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* ── 2b. Share 3D Models ──────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Partagez des modèles 3D avec les ingénieurs, experts, constructeurs et assurés.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                Maximisez vos revenus et accélérez le processus grâce à une documentation précise et complète.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                  asChild
                >
                  <Link to="/contact">Essayez PrimeSpace</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  asChild
                >
                  <Link to="/benefits">Découvrir les Solutions</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden bg-black"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/1rtdBt7uChQWoPKScz55Vi/aa3cf869629517cfba01002a2d01d903/Zaya_Spin_Alpha_0098_1.png?fm=webp"
                alt="Modèle 3D dollhouse – documentation sinistre"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2c. Webinar – Property Intelligence ──────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-elevated border border-border"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/1EGwUASVy5gyDyoKyeAYTL/233801b06855a77d23b7ba7dd0ef05d3/2024Q1_Accelerate_Restoration_Pre-Email1_600x240px.png?fm=webp"
                alt="Expert évaluant un sinistre sur écran avec PrimeSpace"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-xs md:text-sm uppercase tracking-widest text-red-600 font-bold mb-3 block">
                Webinaire
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Accélérez l'estimation de restauration et rénovation avec PrimeSpace Property Intelligence.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-4 max-w-lg">
                Le temps est crucial pour les prestataires de restauration et rénovation. Ils opèrent dans des environnements dangereux, passant des heures en mesures manuelles et en visites répétées sur site — tout en priorisant la restauration des habitations et commerces sans compromettre la documentation ni engendrer des frais de reprise inutiles.
              </p>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-4 max-w-lg">
                Avec la fonctionnalité Property Intelligence de PrimeSpace, les entrepreneurs en restauration peuvent facilement et en toute sécurité obtenir des mesures, plans d'étage et rapports de propriété générés automatiquement, en quelques clics.
              </p>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                Découvrez ce webinaire pour en savoir plus sur cette nouvelle fonctionnalité.
              </p>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                asChild
              >
                <Link to="/contact">Regarder Maintenant</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2d. Try PrimeSpace Free ─────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border p-6 md:p-12 flex flex-col lg:flex-row gap-8 md:gap-12 items-center"
          >
            <div className="flex-1">
              <span className="text-xs md:text-sm uppercase tracking-widest text-foreground/40 font-semibold mb-3 block">
                Vous ne savez pas par où commencer ?
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Essayez PrimeSpace gratuitement avec le téléphone dans votre poche.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                Découvrez comment la plateforme de jumeaux numériques propulsée par l'IA de PrimeSpace peut transformer votre activité. Téléchargez simplement l'application PrimeSpace pour commencer à capturer en 3D.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                  asChild
                >
                  <Link to="/contact">Télécharger sur l'App Store</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  asChild
                >
                  <Link to="/contact">Télécharger sur Google Play</Link>
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-auto lg:flex-shrink-0">
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/6aRUakSFHfRozY5kLKfP3Q/01f0915dc7a787003afa4a77e1d813f2/Rectangle_2781.png?fm=webp"
                alt="Capture 3D avec un smartphone"
                className="w-full lg:w-64 h-auto rounded-xl"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2e. TruePlan for Xactimate ──────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden bg-black"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/2ohFtz5Y5qahZmSXDrzz4O/24e9551a1b2449b61b3fdc44371e3851/Zaya_Spin_Alpha_0098_1.png?fm=webp"
                alt="PrimeSpace TruePlan – plan d'étage 3D et SKX"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6 leading-tight">
                PrimeSpace TruePlan™ pour Xactimate®
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-4 max-w-lg">
                Un outil inestimable pour gagner du temps et de l'argent dans les secteurs de l'assurance et de la restauration. Service unique en son genre, PrimeSpace TruePlan™ génère des fichiers SKX en plans d'étage et vues 3D à partir de modèles PrimeSpace, facilement importables dans le logiciel Xactimate®.
              </p>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-4 max-w-lg">
                Les entrepreneurs en restauration et experts en sinistres n'ont plus besoin de mesurer et dessiner manuellement les propriétés pour déterminer la valeur des pertes et estimer les coûts de réparation et reconstruction. Notre service clé en main TruePlan livre un fichier compatible Xactimate (.SKX) précis dans les 48 heures suivant la commande sur la plateforme PrimeSpace.
              </p>
              <a
                href="https://matterport.com/blog/ati-disaster-recovery-services"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2c0a71] hover:underline text-sm md:text-base font-medium"
              >
                Découvrez comment ATI Disaster Recovery Services a amélioré la précision des mesures et obtenu un gain de productivité de 5x avec PrimeSpace TruePlan™.
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2f. L'Avantage PrimeSpace ────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 md:mb-4">
              {lang === "fr" ? "L'Avantage PrimeSpace." : "The PrimeSpace Advantage."}
            </h2>
            <p className="text-foreground/60 text-sm md:text-lg">
              Notre plateforme vous aide à réduire le temps passé sur le terrain, à corriger les écarts dans les réclamations de dommages et à gagner du temps.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden bg-black"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/6nUQjNbtbxJ7PDeL1teA8w/ebf1ce5d55d7f2ee4e16373c1340c051/Zaya_Spin_Alpha_0098_1.png?fm=webp"
                alt="Modèle 3D – maison endommagée par un incendie"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Documentation précise et actualisable tout au long du cycle d'assurance.
              </h3>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-6 max-w-lg">
                Assurez avec la documentation pré-sinistre et la gestion des risques les plus complètes grâce au jumeau numérique qui permet des pratiques de souscription plus éclairées et précises.
              </p>
              <ul className="space-y-3 text-foreground/60 text-sm md:text-base leading-relaxed max-w-lg">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Réduisez le risque initial d'assurer un bâtiment en éliminant le besoin de réinspection physique.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Précision de documentation inégalée pour des évaluations de meilleure qualité par rapport à une inspection externalisée.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Ajoutez des notes de police et de sinistre directement dans le modèle 3D.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2g. Insurance Carriers ───────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6 leading-tight">
                La plus haute précision pour la documentation des assureurs.
              </h3>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-6 max-w-lg">
                Améliorer la rigueur des dossiers lors du traitement des sinistres réduit les écarts et le temps perdu à résoudre les problèmes.
              </p>
              <ul className="space-y-3 text-foreground/60 text-sm md:text-base leading-relaxed max-w-lg mb-6 md:mb-8">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Une meilleure précision réduit le cycle de réclamation pour créer une meilleure expérience client pour les assurés.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Augmentez la transparence opérationnelle avec la possibilité de partager des liens d'espaces 3D à différentes parties prenantes.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Accélérez la vitesse et la précision des experts pour examiner et naviguer le sinistre à distance avec les dimensions exactes de la propriété.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Améliorez la réponse aux événements catastrophiques (CAT) lorsque les équipes d'experts internes sont débordées. Utilisez le réseau PrimeSpace Capture Services™ pour aider les sinistrés à retrouver leur foyer plus rapidement.
                </li>
              </ul>
              <Link
                to="/benefits"
                className="text-[#2c0a71] hover:underline text-sm md:text-base font-medium"
              >
                En savoir plus sur les solutions pour les assureurs →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/E7gOEyXp15AaLB8WzoxfN/1c1b7f8fbafccb636ca8f9affab9cbf7/Zaya_Spin_Alpha_0098_1.png?fm=webp"
                alt="Intérieur endommagé par le feu – documentation assurance"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2h. Forensics Professionals ─────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/6g3c4acdHQLzJfLSfPp1rk/537f5983238542dbd4413dafa003918f/Zaya_Spin_Alpha_0098_1.png?fm=webp"
                alt="Dommages par le feu – documentation investigation"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Documentation détaillée et immersive pour les professionnels de l'investigation.
              </h3>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-6 max-w-lg">
                Capturez un bâtiment ou un espace tel quel et obtenez la documentation et les mesures les plus précises possibles. PrimeSpace vous aide à fournir des preuves irréfutables tout en réduisant les interruptions des travaux de restauration.
              </p>
              <ul className="space-y-3 text-foreground/60 text-sm md:text-base leading-relaxed max-w-lg mb-6 md:mb-8">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Créez une documentation recevable en justice avec des scans qui ne peuvent pas être manipulés.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Mémorisez la scène et évitez la détérioration des preuves.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Emmenez le jury sur la scène grâce aux visites virtuelles 3D.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Garantissez la confidentialité et l'authenticité avec le floutage des visages et l'horodatage.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Gagnez du temps et améliorez la précision avec les plans schématiques et les outils de mesure.
                </li>
              </ul>
              <Link
                to="/benefits"
                className="text-[#2c0a71] hover:underline text-sm md:text-base font-medium"
              >
                En savoir plus sur les solutions pour l'investigation en assurance →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2i. Home & Business Owners ─────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Documentation précise des sinistres pour les propriétaires résidentiels et commerciaux.
              </h3>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-6 max-w-lg">
                Les propriétaires peuvent documenter maisons, commerces ou tout actif avec la plateforme fidèle et complète de PrimeSpace, et accélérer toute réclamation potentielle.
              </p>
              <ul className="space-y-3 text-foreground/60 text-sm md:text-base leading-relaxed max-w-lg">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Obtenez un dossier complet de l'état de votre propriété.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Inventaire précis des biens personnels et autres actifs dans votre maison ou immeuble.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Réduisez les écarts et les litiges avec les assureurs.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                  Accélérez l'ensemble du processus de réclamation, réduisant le besoin de fournir des documents ou reçus dans certains cas.
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-elevated border border-border"
            >
              <video
                src="/issurance.mp4"
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

      {/* ── 5b. Powerful Features ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-10 md:mb-16"
          >
            {lang === "fr" ? "Une suite de fonctionnalités puissantes." : "A powerful suite of features."}
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7gjCfnPhgHkfaKlSnH8KU9/0127c7458eec99dd01b3b6c33bb04e5e/Enterprise_Security_W.svg?w=150",
                title: "Sécurité",
                description: "Conçu pour les exigences de sécurité et de conformité des entreprises d'assurance.",
                link: "/about",
                linkText: "Centre de Confiance",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/3wDimHkJbmUkjuEb1u4KI6/17362a119c18d6047bf6fa6af7111422/Partners_W_1.png?w=150",
                title: "Partenariats",
                description: "Centralisez toutes vos données grâce aux intégrations partenaires.",
                link: "/benefits",
                linkText: "En Savoir Plus",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/3whzXGGKUK4la4hZifhAUe/dd6ecaf4e31ff442587469d5b1f1ab01/ACC_Simple_W_1.png?w=150",
                title: "Intégrations",
                description: "Intégrez les fichiers de bâtiment directement dans un projet Autodesk Construction Cloud.",
                link: "/benefits",
                linkText: "En Savoir Plus",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/4qvYWm4EYPVWJEajTtYLpZ/4ebba13dc61eee9132af536f817daf62/MFG_Collab_W.svg?w=150",
                title: "Outils",
                description: "Collaborez, planifiez et partagez plus facilement avec votre équipe, fournisseurs ou clients.",
                link: "/services",
                linkText: "En Savoir Plus",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 md:p-8 rounded-2xl bg-muted/40"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="h-16 w-auto mb-5"
                  loading="lazy"
                />
                <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="text-foreground font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  {feature.linkText} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. The PrimeSpace Difference — Blog / Case Studies ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-center mb-12 md:mb-16"
          >
            {lang === "fr" ? "La différence PrimeSpace pour l'Assurance et la Restauration" : "The PrimeSpace Difference for Insurance and Restoration"}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 — Blog */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="overflow-hidden rounded-xl mb-4">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/3pIo0iiQbJ7nWu1hl21eNd/0c7a8262619ddf3083a2d3dd040da7e6/Rectangle_2768.png"
                  alt="Superior Restoration"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-red-600 font-semibold text-xs tracking-widest uppercase">
                Blog
              </span>
              <h3 className="text-lg font-bold mt-2 mb-3 leading-snug">
                Comment PrimeSpace a aidé les clients de Superior Restoration à
                récupérer plus rapidement…
              </h3>
              <Link
                to="/contact"
                className="text-foreground font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Lire la suite <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 2 — Case Study */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="overflow-hidden rounded-xl mb-4">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/7hkN23ryD7f6nR8TDZIIoV/7a944e0b1fefd861a70433fc549c7f1c/Rectangle_2769.png"
                  alt="Chicago Water & Fire Restoration"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-red-600 font-semibold text-xs tracking-widest uppercase">
                Étude de cas
              </span>
              <h3 className="text-lg font-bold mt-2 mb-3 leading-snug">
                Chicago Water & Fire Restoration rationalise la documentation
                des sinistres avec…
              </h3>
              <Link
                to="/contact"
                className="text-foreground font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Lire la suite <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="overflow-hidden rounded-xl mb-4">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/7JhK4ke5xOfOMh5qxmtOCJ/7e05359269c1461cf043260c742d83f5/Rectangle_2770.png"
                  alt="Master Restoration Digital Twins"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-bold mt-2 mb-3 leading-snug">
                Master Restoration utilise les jumeaux numériques pour accélérer
                les estimations de 20&nbsp;%…
              </h3>
              <Link
                to="/contact"
                className="text-foreground font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Lire la suite <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#2c0a71]">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center mb-10 md:mb-16"
          >
            FAQ – Numérisation 3D pour l'Assurance et la Restauration
          </motion.h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-white/20"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-display font-semibold text-white hover:text-white/80 transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 text-sm md:text-base leading-relaxed pb-5 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── 8. CTA ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-accent" />
            <div className="relative z-10 py-12 md:py-20 px-5 md:px-8 text-center">
              <h2 className="text-2xl md:text-4xl font-display font-bold text-primary-foreground mb-4 md:mb-6">
                Prêt à moderniser vos processus d'assurance ?
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Rejoignez les assureurs qui utilisent les jumeaux numériques 3D
                pour accélérer les sinistres, réduire les coûts et améliorer la
                satisfaction client.
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

export default Insurance;
