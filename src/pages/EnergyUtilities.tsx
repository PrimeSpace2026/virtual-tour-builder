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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const getFaqs = (lang: string) => [
  {
    question: "Comment les jumeaux numériques améliorent-ils la gestion des installations énergétiques ?",
    answer: "Les jumeaux numériques PrimeSpace permettent de documenter avec précision chaque infrastructure, d'effectuer des inspections visuelles à distance, de planifier la maintenance préventive et de former les équipes dans des environnements virtuels fidèles — réduisant les temps d'arrêt et les coûts opérationnels.",
  },
  {
    question: "Quel niveau de précision dimensionnelle les scans 3D offrent-ils pour les installations énergétiques ?",
    answer: "Les scans PrimeSpace offrent une précision de ±1% sur les dimensions. Cette précision est suffisante pour la documentation des actifs, la planification de maintenance et la coordination des interventions dans les installations énergétiques.",
  },
  {
    question: "Les jumeaux numériques peuvent-ils être utilisés pour la formation à la sécurité ?",
    answer: "Oui. Les jumeaux numériques permettent de créer des parcours de formation virtuels immersifs pour familiariser les employés avec les procédures de sécurité, les issues de secours et l'emplacement des équipements critiques — sans interrompre les opérations.",
  },
  {
    question: "Comment PrimeSpace aide-t-il à la conformité réglementaire ?",
    answer: "Les jumeaux numériques fournissent une documentation visuelle horodatée de l'état des installations, facilitant les audits de conformité, les inspections réglementaires et la traçabilité des modifications apportées aux infrastructures.",
  },
  {
    question: "Peut-on intégrer les données 3D avec nos systèmes de gestion d'actifs existants ?",
    answer: "Oui. PrimeSpace permet l'export en formats standard (E57, CAO, BIM) et offre des API pour l'intégration avec vos plateformes de gestion d'actifs, GMAO et systèmes de supervision.",
  },
  {
    question: "PrimeSpace peut-il scanner des installations en zones à accès restreint ?",
    answer: "Oui. Nos techniciens PrimeSpace Capture Services sont formés pour intervenir dans des environnements à accès contrôlé et respectent les protocoles de sécurité spécifiques à chaque site industriel.",
  },
];

/* ─── Page ────────────────────────────────────────────────────── */

const EnergyUtilities = () => {
  const { lang } = useI18n();

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
            <p className="text-xs md:text-sm uppercase tracking-widest text-foreground/40 font-semibold mb-3">
              {lang === "fr" ? "Énergie & Utilités" : "Energy & Utilities"}
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71] mb-3 md:mb-4 leading-tight">
              {lang === "fr" ? "Numérisez vos infrastructures énergétiques avec la 3D." : "Digitize your energy infrastructure with 3D."}
            </h1>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              Des centrales aux réseaux de distribution, les jumeaux numériques PrimeSpace transforment la gestion, la maintenance et la formation dans le secteur de l'énergie et des utilités.
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
              src="https://my.matterport.com/show/?m=EnNcG7iXQQx&log=0&help=0&nt=0&play=1&qs=0&brand=0&dh=1&tour=1&gt=1&hr=1&mls=1&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=1&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
              title="Visite virtuelle – Installations Énergétiques"
              className="w-full h-full"
              allow="fullscreen"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* ── 3. Solutions — 3 cards ───────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 md:mb-5 leading-tight">
              {lang === "fr" ? "Solutions complètes pour le secteur énergétique." : "Complete solutions for the energy sector."}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Asset Documentation */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/vKbrxAWjLpOuoVFrhkrlj/05513f96b5534f374ca87b0641e2d501/Frame_2608871__1_.png"
                  alt="Documentation des actifs"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Documentation des Actifs" : "Asset Documentation"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                {lang === "fr" ? "Documentez chaque installation avec précision." : "Document every facility with precision."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Créez des relevés 3D détaillés de vos centrales, sous-stations et infrastructures de distribution pour une gestion d'actifs complète et à jour.
              </p>
            </motion.div>

            {/* Remote Inspections */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/7cOVo6jCbCsZ1Bg7DbqgGF/354484a4d04e33fc736ade8691621cdf/Frame_2608872.png"
                  alt="Inspections à distance"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                Inspections à Distance
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                Inspectez vos sites sans vous déplacer.
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Effectuez des inspections visuelles détaillées à distance, vérifiez l'état des équipements et coordonnez les interventions de maintenance depuis votre bureau.
              </p>
            </motion.div>

            {/* Safety & Training */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/1KVVNkpGdqT7bBrBlicBze/deff7d8ef5685f9c2215e459b4c35dab/Frame_2608870__1_.png"
                  alt="Sécurité & Formation"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                Sécurité & Formation
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                Formez vos équipes en toute sécurité.
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Utilisez les jumeaux numériques pour former les employés aux procédures de sécurité, simuler des scénarios d'urgence et familiariser les nouvelles recrues avec les installations — sans risque.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3b. Do more with digital twins — 2 cards ─────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-10 md:mb-16"
          >
            Faites plus avec les jumeaux numériques.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Maximize plant uptime */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/59RSWl9M39PziKqny6NL1J/24a20d85637a28168adc749c8e938d92/Frame_7708__11_.png"
                  alt="Maximisez le temps de fonctionnement"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
                Maximisez le temps de fonctionnement.
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Éliminez les incertitudes avant les arrêts techniques. Utilisez des jumeaux numériques dimensionnellement précis pour vérifier les dégagements de turbines, planifier l'accès aux chaudières et valider les séquences de travail afin de réduire les reprises et raccourcir les arrêts.
              </p>
            </motion.div>

            {/* Plan with precision */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/2DOqAy9dkj5sAFjlktHbP4/6b8dbdaa2957551fbc32f81304bb96b8/Frame_7709__12_.png"
                  alt="Planifiez avec précision"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
                Planifiez avec précision.
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Offrez aux développeurs et aux ingénieurs une source unique de vérité spatiale. Les jumeaux numériques précis accélèrent les études d'interconnexion pour les centres de données, le solaire et le stockage, réduisant les retards et les reconceptions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3c. Training & Visualization — 2 cards ───────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Provide true-to-life training */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/69dboYCD81HX3Hk3VZHv9L/40cfaea46b5088b7ad89ddc73a5b4f10/Training.png"
                  alt="Formation réaliste"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
                Offrez une formation réaliste.
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Préparez les équipes avant leur arrivée sur site. Formez les opérateurs dans des répliques virtuelles réalistes des sous-stations et des installations de production pour améliorer la sécurité et réduire les erreurs.
              </p>
            </motion.div>

            {/* Visualize before you invest */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/alHinORmuQ0dFXFH3hNyF/e27d50d946542dc03d2c163693db985a/Visualize.png"
                  alt="Visualisez avant d'investir"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
                Visualisez avant d'investir.
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Capturez un relevé visuel complet des sous-stations et des actifs du réseau. Prenez des décisions éclairées concernant les mises à niveau, les extensions et les nouvelles technologies avec un contexte complet du site.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. Reduce downtime ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/24L0M7n6ZVrxDoxNVdbM3/554ed44bf32ed4f1cde5d91acf06f8c2/Frame_7708__5_.png"
                alt="Réduction des temps d'arrêt"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                Maintenance Préventive
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                Réduisez les temps d'arrêt et les coûts de maintenance.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Planifiez les interventions de maintenance avec une documentation visuelle complète. Identifiez les problèmes potentiels avant qu'ils ne deviennent critiques et coordonnez les équipes de maintenance avec des informations précises et actualisées sur l'état des installations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Ensure compliance ─────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
                Assurez la conformité réglementaire.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Maintenez une documentation horodatée de l'état de vos installations pour faciliter les audits réglementaires. Les jumeaux numériques fournissent des preuves visuelles irréfutables de la conformité aux normes de sécurité et environnementales.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/2PNWLenvyYtFr9t6oSsfza/5155ea190351b9043022924d2dff0a6e/Frame_7712__1_.png"
                alt="Conformité réglementaire"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Scale across portfolio ────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/FYApruI5l8wcLY5RoKyWv/2ffda28b1219eb5b98ff3c07eaf3376a/Frame_7715__2_.png"
                alt="Gestion du portefeuille à grande échelle"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                Gestion à Grande Échelle
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                Gérez l'ensemble de votre portefeuille d'infrastructures.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                Centralisez la gestion de toutes vos installations énergétiques sur une seule plateforme. Comparez les sites, suivez les modifications et optimisez la allocation des ressources à travers votre réseau.
              </p>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                asChild
              >
                <Link to="/contact">En Savoir Plus</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. Testimonial ───────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-10 md:mb-16"
          >
            Vous serez en bonne compagnie.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto p-6 md:p-10 rounded-2xl bg-card border border-border shadow-soft"
          >
            <blockquote className="text-base md:text-lg text-foreground leading-relaxed mb-6">
              « Les jumeaux numériques ont révolutionné notre approche de la maintenance des installations. Nous pouvons maintenant planifier les interventions à distance, former nos techniciens de manière sécurisée et documenter l'état de chaque équipement avec une précision inégalée. »
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2c0a71] flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">
                  Directeur Maintenance
                </div>
                <div className="text-xs text-muted-foreground">
                  Entreprise Énergétique Nationale
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center mt-10 md:mt-14"
          >
            <p className="text-xs md:text-sm uppercase tracking-widest text-foreground/40 font-semibold mb-2">
              Les clients PrimeSpace ont constaté :
            </p>
            <p className="text-3xl md:text-5xl font-display font-bold text-[#2c0a71]">
              50%
            </p>
            <p className="text-sm md:text-base text-foreground/60 max-w-md mx-auto mt-2">
              de réduction des déplacements sur site grâce aux inspections virtuelles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 8. Features — 4 columns ──────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-10 md:mb-16"
          >
            Une suite de fonctionnalités puissantes.
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7gjCfnPhgHkfaKlSnH8KU9/0127c7458eec99dd01b3b6c33bb04e5e/Enterprise_Security_W.svg",
                title: "Protégez vos données.",
                description: "Ajoutez différents niveaux d'autorisations utilisateur pour préserver la confidentialité et la sécurité de vos données.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/3whzXGGKUK4la4hZifhAUe/dd6ecaf4e31ff442587469d5b1f1ab01/ACC_Simple_W_1.png",
                title: "Commander des plans de niveau et des fichiers BIM.",
                description: "Obtenez des fichiers et des données précis sur les biens pour la planification, la gestion et le marketing de l'espace.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/4qvYWm4EYPVWJEajTtYLpZ/4ebba13dc61eee9132af536f817daf62/MFG_Collab_W.svg",
                title: "Collaborez en toute efficacité.",
                description: "Accédez à des outils conviviaux pour collaborer, planifier et partager avec votre équipe, vos fournisseurs et vos locataires potentiels.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/3wDimHkJbmUkjuEb1u4KI6/17362a119c18d6047bf6fa6af7111422/Partners_W_1.png",
                title: "Connectez-vous aux systèmes existants.",
                description: "Améliorez et personnalisez vos flux de travail existants grâce aux intégrations de partenaires.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border flex flex-col"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 mb-5">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                  {feature.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-[#2c0a71] transition-colors"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA ───────────────────────────────────────────── */}
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
                Prêt à numériser vos infrastructures énergétiques ?
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Rejoignez les entreprises du secteur énergétique qui utilisent déjà les jumeaux numériques 3D pour optimiser leur maintenance, renforcer la sécurité et réduire les coûts opérationnels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    Demander une Démo
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

      {/* ── 10. Getting started — 3 steps ─────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-10 md:mb-16"
          >
            Commencez avec PrimeSpace.
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7vTKl80BLgHyc2reCEjGm0/3d4e22b4d4e02b23d341acf97ece23ef/Digital_Twins_RRE_W.svg",
                title: "Créez votre jumeau numérique.",
                description: "Utilisez n'importe quelle caméra compatible, de votre téléphone à notre caméra emblématique Pro3, pour numériser votre espace en 3D. Vous pouvez également faire appel à l'un de nos techniciens Capture Services.",
                link: "/services",
                linkText: "Explorer les méthodes de capture",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/2hTnyk44H7YflV2aTiyHlO/f9646bcfe8ae48011146ff34b77debbe/Video_360_W.svg",
                title: "Choisissez votre forfait.",
                description: "Trouvez un forfait adapté à vos besoins, votre budget et vos objectifs. Du forfait gratuit au forfait Enterprise sur mesure, nous vous offrons une grande flexibilité en termes d'espaces, d'utilisateurs et d'outils.",
                link: "/contact",
                linkText: "Parcourez les forfaits",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7DwMg4iwzkLNRgwh5nUrXd/cec55a431f3f9160a919996efb96bcea/Teamwork_W.svg",
                title: "Personnalisez votre expérience.",
                description: "Accédez à des outils intégrés, à des modules complémentaires précieux et à des intégrations puissantes comme Procore, Autodesk et AWS IoT TwinMaker pour adapter votre expérience aux besoins de votre entreprise.",
                link: "/services",
                linkText: "Découvrir les intégrations",
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 mb-5">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed mb-5">
                  {step.description}
                </p>
                <Link
                  to={step.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-[#2c0a71] transition-colors"
                >
                  {step.linkText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FAQ ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#2c0a71]">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center mb-10 md:mb-16"
          >
            FAQ — Scan 3D pour l'Énergie & les Utilités
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
    </Layout>
  );
};

export default EnergyUtilities;
