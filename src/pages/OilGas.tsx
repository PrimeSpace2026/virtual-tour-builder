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
    question: "Comment les jumeaux numériques peuvent-ils améliorer la sécurité sur les installations pétrolières et gazières ?",
    answer: "Les jumeaux numériques PrimeSpace permettent de réaliser des inspections visuelles détaillées à distance, de former les employés dans des environnements virtuels fidèles et de documenter l'état des équipements critiques — réduisant l'exposition aux risques et améliorant la préparation aux situations d'urgence.",
  },
  {
    question: "PrimeSpace peut-il scanner des installations offshore ?",
    answer: "Oui. Nos techniciens PrimeSpace Capture Services sont formés pour intervenir sur des plateformes offshore et des installations en environnements extrêmes, en respectant les protocoles de sécurité HSE les plus stricts du secteur.",
  },
  {
    question: "Quelle est la précision dimensionnelle des scans 3D pour les installations pétrolières ?",
    answer: "Les scans PrimeSpace offrent une précision de ±1% sur les dimensions. Cette précision est adaptée à la documentation des actifs, la planification des arrêts techniques et la coordination des interventions de maintenance.",
  },
  {
    question: "Les jumeaux numériques peuvent-ils être intégrés à nos systèmes de gestion existants ?",
    answer: "Oui. PrimeSpace permet l'export en formats standard (E57, CAO, BIM) et offre des API pour l'intégration avec vos plateformes GMAO, SAP, Maximo et autres systèmes de gestion des actifs industriels.",
  },
  {
    question: "Comment les jumeaux numériques aident-ils à planifier les arrêts techniques (turnarounds) ?",
    answer: "Les jumeaux numériques permettent aux équipes de planification de visualiser l'ensemble de l'installation en 3D, d'identifier les points de conflit, de coordonner les interventions et de former les sous-traitants avant l'arrêt — réduisant significativement la durée et les coûts.",
  },
  {
    question: "Quelles mesures de sécurité des données PrimeSpace met-il en place pour les installations sensibles ?",
    answer: "PrimeSpace utilise le chiffrement de bout en bout, des contrôles d'accès granulaires et des options d'hébergement régional pour protéger les données sensibles des installations pétrolières et gazières conformément aux normes du secteur.",
  },
];

/* ─── Page ────────────────────────────────────────────────────── */

const OilGas = () => {
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
              {lang === "fr" ? "Pétrole & Gaz" : "Oil & Gas"}
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71] mb-3 md:mb-4 leading-tight">
              {lang === "fr" ? "Jumeaux numériques pour l'industrie pétrolière et gazière." : "Digital twins for the oil and gas industry."}
            </h1>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              Des plateformes offshore aux raffineries, les jumeaux numériques PrimeSpace révolutionnent la documentation, la maintenance et la sécurité des installations pétrolières et gazières.
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
              src="https://my.matterport.com/show/?m=ne7zgMw47bh&log=0&help=0&nt=0&play=1&qs=0&brand=0&dh=1&tour=1&gt=1&hr=1&mls=1&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=1&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
              title="Visite virtuelle – Installations Pétrolières & Gazières"
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
              {lang === "fr" ? "Solutions 3D pour toute la chaîne de valeur." : "3D solutions for the entire value chain."}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Offshore & Onshore */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/1Yj3oBsj4eGkbmDovc5jak/207a3187a0a9438d06e37f0e93c03ab7/Frame_2608871.png"
                  alt="Installations offshore & onshore"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Installations Offshore & Onshore" : "Offshore & Onshore Facilities"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                {lang === "fr" ? "Documentez vos installations critiques." : "Document your critical facilities."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Créez des relevés 3D détaillés de plateformes, raffineries et stations de compression pour une gestion d'actifs complète et une planification efficace des interventions.
              </p>
            </motion.div>

            {/* Safety Inspections */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/2lsYuiDnL6JSd8dwRGKwiS/17e3b5f08eb57c9bfa0b6e22b9ea20dc/Frame_2608869.png"
                  alt="Inspections de sécurité"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Inspections de Sécurité" : "Safety Inspections"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                {lang === "fr" ? "Renforcez la sécurité HSE." : "Strengthen HSE safety."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Effectuez des inspections visuelles à distance, documentez les conditions de sécurité et préparez les audits réglementaires sans multiplier les déplacements en zone à risque.
              </p>
            </motion.div>

            {/* Turnaround Planning */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/4zrABnaIK6xoVjmNDVS5wj/041498f7f178b5a267ff3e9c82e26c40/Frame_2608870.png"
                  alt="Planification des arrêts techniques"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Arrêts Techniques" : "Turnarounds"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                {lang === "fr" ? "Optimisez vos turnarounds." : "Optimize your turnarounds."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Planifiez et coordonnez les arrêts techniques avec une visualisation 3D complète. Réduisez la durée des interventions et minimisez les temps d'arrêt coûteux.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3b. Do more with digital twins — 4 cards ─────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-10 md:mb-16"
          >
            {lang === "fr" ? "Faites plus avec les jumeaux numériques." : "Do more with digital twins."}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Plan with precision */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/6x92auWQutFzRB6peBMGvy/b42bee8a84e71a00045b5f68fd9b304e/Frame_7708__9_.png"
                  alt="Planifiez avec précision"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
                {lang === "fr" ? "Planifiez avec précision." : "Plan with precision."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Utilisez des modèles 3D précis pour mesurer les dégagements d'équipements en quelques clics, planifier les structures d'échafaudage et coordonner plus de 500 sous-traitants avant le début d'un arrêt technique.
              </p>
            </motion.div>

            {/* Access sites 24/7 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/6wCxfbwH8Xq2KRno5aREEB/2d20de56f25aa3a2e8128bc29157c973/Frame_7709__11_.png"
                  alt="Accédez aux sites 24/7"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
                {lang === "fr" ? "Accédez aux sites 24/7." : "Access sites 24/7."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Offrez aux parties prenantes un accès 3D immersif à tout moment pour inspecter les plateformes offshore, les raffineries et les installations de pipeline sans coûts de déplacement ni exposition aux risques.
              </p>
            </motion.div>

            {/* Eliminate the guesswork */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/3607iPzr0O9jQeAt7tmiCj/f47367438879de3d1c65dc91bf573a63/Eliminate_Gesswork.png"
                  alt="Éliminez les incertitudes"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
                {lang === "fr" ? "Éliminez les incertitudes." : "Eliminate the guesswork."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Rationalisez les workflows en communiquant et en collaborant au sein d'une source unique de vérité dimensionnellement précise pour livrer les projets d'investissement dans les délais et le budget.
              </p>
            </motion.div>

            {/* Make safety training even safer */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/58GtXG05xFWRpYWgsPWJuK/3044eac9e973a9b0f4cf7708bf7b4692/Frame_7710.png"
                  alt="Formation sécurité renforcée"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
                {lang === "fr" ? "Rendez la formation sécurité encore plus sûre." : "Make safety training even safer."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Plongez les intervenants dans des répliques fidèles d'installations où ils peuvent s'entraîner sur des scénarios, apprendre les agencements et se préparer aux urgences à distance, sans les risques de la formation sur site.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. Remote collaboration ──────────────────────────── */}
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
                alt="Collaboration à distance"
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
                {lang === "fr" ? "Collaboration à Distance" : "Remote Collaboration"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Connectez les experts du monde entier." : "Connect experts from around the world."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Permettez aux ingénieurs, inspecteurs et équipes de maintenance de collaborer virtuellement au sein du jumeau numérique. Annotez les problèmes, partagez les observations et prenez des décisions éclairées — où que vous soyez.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Asset management ──────────────────────────────── */}
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
                {lang === "fr" ? "Maîtrisez la gestion de vos actifs." : "Master your asset management."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Créez un inventaire numérique complet de vos installations. Localisez chaque équipement, suivez les modifications et maintenez une documentation à jour pour l'ensemble de votre parc industriel.
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
                alt="Gestion des actifs industriels"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Training & emergency ──────────────────────────── */}
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
                alt="Formation et plans d'urgence"
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
                {lang === "fr" ? "Formation & Plans d'Urgence" : "Training & Emergency Plans"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Préparez vos équipes à toute éventualité." : "Prepare your teams for any eventuality."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                Utilisez les jumeaux numériques pour former vos équipes aux procédures d'urgence, simuler des scénarios de crise et préparer les plans d'évacuation — dans un environnement virtuel sûr et contrôlé.
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
            {lang === "fr" ? "Vous serez en bonne compagnie." : "You'll be in good company."}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto p-6 md:p-10 rounded-2xl bg-card border border-border shadow-soft"
          >
            <blockquote className="text-base md:text-lg text-foreground leading-relaxed mb-6">
              « La documentation 3D de nos installations a transformé notre approche de la maintenance et de la sécurité. Les inspections à distance nous permettent de réduire les risques tout en améliorant notre réactivité. La planification des arrêts techniques est devenue beaucoup plus efficace. »
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2c0a71] flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">
                  Ingénieur en Chef
                </div>
                <div className="text-xs text-muted-foreground">
                  Société Pétrolière Internationale
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
              {lang === "fr" ? "Les clients PrimeSpace ont constaté :" : "PrimeSpace clients have seen:"}
            </p>
            <p className="text-3xl md:text-5xl font-display font-bold text-[#2c0a71]">
              60%
            </p>
            <p className="text-sm md:text-base text-foreground/60 max-w-md mx-auto mt-2">
              de réduction du temps de planification des arrêts techniques grâce aux jumeaux numériques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 8. Features — 3 columns ──────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-10 md:mb-16"
          >
            {lang === "fr" ? "Vos installations, maîtrisées en 3D." : "Your facilities, mastered in 3D."}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7vTKl80BLgHyc2reCEjGm0/3d4e22b4d4e02b23d341acf97ece23ef/Digital_Twins_RRE_W.svg",
                title: "Jumeaux numériques industriels",
                description: "Capturez avec précision raffineries, plateformes offshore, stations de compression et installations de traitement pour la documentation et la planification.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/2hTnyk44H7YflV2aTiyHlO/f9646bcfe8ae48011146ff34b77debbe/Video_360_W.svg",
                title: "Intégrations industrielles",
                description: "Exportez vers SAP, Maximo, Archibus et autres systèmes de gestion. Formats E57, CAO et BIM supportés nativement.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7DwMg4iwzkLNRgwh5nUrXd/cec55a431f3f9160a919996efb96bcea/Teamwork_W.svg",
                title: "Sécurité de niveau entreprise",
                description: "Hébergement sécurisé, chiffrement de bout en bout et contrôles d'accès granulaires pour protéger les données sensibles de vos installations.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border text-center"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
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
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
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
                Prêt à numériser vos installations pétrolières et gazières ?
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Découvrez comment les jumeaux numériques 3D peuvent améliorer la sécurité, réduire les coûts et optimiser la gestion de vos actifs industriels.
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

      {/* ── 10. Capture Services ──────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                Service de Capture
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                Des experts certifiés pour vos installations.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                Les techniciens PrimeSpace Capture Services sont formés pour intervenir dans les environnements industriels les plus exigeants, onshore et offshore. Protocoles HSE respectés, livraison rapide garantie.
              </p>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                asChild
              >
                <Link to="/contact">En Savoir Plus</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/2oIiE1XQk7hcP2N4hEI5yW/2516d5eb5f5532c24956033da2f01fd8/Zaya_Spin_Alpha_0098_1.png"
                alt="Service de capture PrimeSpace pour l'industrie pétrolière"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#2c0a71]">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center mb-10 md:mb-16"
          >
            FAQ — Scan 3D pour le Pétrole & Gaz
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

export default OilGas;
