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
    question: lang === "fr"
      ? "Comment les visites virtuelles influencent-elles la conversion des réservations pour les hôtels et attractions ?"
      : "How do virtual tours influence booking conversion for hotels and attractions?",
    answer:
      "Les visites virtuelles 3D permettent aux voyageurs de découvrir l'espace avant de réserver, ce qui renforce la confiance et réduit les hésitations. Les établissements constatent en moyenne 25% d'engagement en ligne supplémentaire et une hausse significative des réservations directes.",
  },
  {
    question: lang === "fr"
      ? "Puis-je intégrer une visite virtuelle sur mon site web ou mes pages de réservation sans développement personnalisé ?"
      : "Can I embed a virtual tour on my website or booking pages without custom development?",
    answer:
      "Oui. Les visites virtuelles PrimeSpace s'intègrent facilement via un simple code d'intégration iframe. Aucune compétence technique avancée n'est requise — copiez-collez le code sur votre site, Booking.com, Airbnb ou toute autre plateforme.",
  },
  {
    question: lang === "fr"
      ? "Proposez-vous des services de capture professionnelle si nous n'avons pas d'équipement ?"
      : "Do you offer professional capture services if we don't have equipment?",
    answer:
      "Absolument. PrimeSpace Capture Services met à votre disposition des techniciens certifiés qui se déplacent dans votre établissement pour créer des jumeaux numériques de haute qualité, généralement livrés en 48 heures.",
  },
  {
    question: lang === "fr"
      ? "Combien de temps faut-il pour créer une visite virtuelle du scan à la publication ?"
      : "How long does it take to create a virtual tour from scan to publication?",
    answer:
      "Le temps varie selon la taille de l'établissement :\n\n• Chambre standard : 15-20 minutes de scan\n• Suite / espace commun : 30-60 minutes\n• Hôtel complet (100 chambres) : 2-3 jours\n\nLe traitement et la publication sont généralement réalisés sous 24-48 heures après le scan.",
  },
  {
    question: lang === "fr"
      ? "Les visites virtuelles peuvent-elles soutenir l'entretien et la maintenance ?"
      : "Can virtual tours support upkeep and maintenance?",
    answer:
      "Oui. Les jumeaux numériques permettent aux équipes de maintenance d'inspecter les espaces à distance, de planifier les interventions, de documenter l'état des installations et de coordonner les rénovations sans multiplier les déplacements sur site.",
  },
  {
    question: lang === "fr"
      ? "Quelles options d'abonnement et d'hébergement proposez-vous pour les portefeuilles multi-établissements ?"
      : "What subscription and hosting options do you offer for multi-property portfolios?",
    answer:
      "PrimeSpace propose des plans adaptés à toutes les tailles de portefeuille, du plan gratuit pour commencer jusqu'aux plans entreprise personnalisés. Gérez facilement plusieurs propriétés, utilisateurs et équipes depuis un seul tableau de bord.",
  },
  {
    question: lang === "fr"
      ? "Quelles bonnes pratiques d'accessibilité suivre pour les visites virtuelles ?"
      : "What accessibility best practices should be followed for virtual tours?",
    answer:
      "Les visites virtuelles PrimeSpace sont accessibles sur tous les appareils (desktop, mobile, tablette) et peuvent être partagées via un simple lien. Pour l'accessibilité avancée, des descriptions textuelles et des parcours guidés peuvent être ajoutés pour accompagner tous les utilisateurs.",
  },
];

/* ─── Page ────────────────────────────────────────────────────── */

const TravelHospitality = () => {
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
              {lang === "fr" ? "Tourisme & Hôtellerie" : "Travel & Hospitality"}
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71] mb-3 md:mb-4 leading-tight">
              {lang === "fr" ? "Boostez vos réservations avec les visites virtuelles 3D pour le tourisme & l'hôtellerie." : "Boost your bookings with 3D virtual tours for travel & hospitality."}
            </h1>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              {lang === "fr"
                ? "Découvrez comment les visites virtuelles 3D et les jumeaux numériques PrimeSpace révolutionnent le marketing et les opérations dans l'ensemble du secteur du tourisme et de l'hôtellerie."
                : "Discover how PrimeSpace 3D virtual tours and digital twins are revolutionizing marketing and operations across the travel and hospitality industry."}
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
              src="https://my.matterport.com/show/?m=Hx7t1MsKi3W&log=0&help=0&nt=0&play=0&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=0&search=1&wh=1&kb=1&lp=0&title=1&tourcta=1&vr=1"
              title="Visite virtuelle – Tourisme & Hôtellerie"
              className="w-full h-full"
              allow="fullscreen"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* ── 3. Enhance guest experiences — 3 cards ───────────── */}
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
              {lang === "fr" ? "Améliorez l'expérience client." : "Enhance the guest experience."}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Immersive Property Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/1nSRMvT38oeGnZMwZUXQaP/40f5db39e8727a7f74c36d4452d44577/Group_1.png"
                  alt="Marketing immersif des propriétés"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Marketing Immersif" : "Immersive Marketing"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                {lang === "fr" ? "L'expérience la plus proche de la réalité." : "The closest experience to reality."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Donnez vie aux hôtels, resorts et lieux événementiels avec des
                visites virtuelles 3D immersives et des contenus médias riches
                pour atteindre 300% d'engagement supplémentaire en permettant aux
                clients d'explorer, de s'inspirer et de réserver en toute
                confiance — depuis n'importe où.
              </p>
            </motion.div>

            {/* Guest Experience Touchpoints */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/4ruz5aQtJjOukHwdI2NGtu/24bbc4d11fe847b0e8d28c96f38b2b17/Group_632589.png"
                  alt="Points de contact de l'expérience client"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Points de Contact Client" : "Guest Experience Touchpoints"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                {lang === "fr" ? "Le confort à chaque étape." : "Comfort at every step."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Utilisez les jumeaux numériques pour guider les clients,
                prévisualiser les espaces et mettre en valeur les équipements,
                garantissant des expériences cohérentes et de haute qualité dans
                l'ensemble de votre portefeuille hôtelier.
              </p>
            </motion.div>

            {/* Remote Training */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/3entXHvQBnBYvUVGdqhCAu/a4e2f985cece685dfaa07a5a672dcd96/Frame_7708.png"
                  alt="Formation et intégration à distance"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Formation & Intégration à Distance" : "Remote Training & Onboarding"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                {lang === "fr" ? "Formez votre personnel plus vite." : "Train your staff faster."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Standardisez la formation à travers vos propriétés en plongeant
                les nouveaux employés dans des parcours 3D fidèles des espaces
                clients, des zones de service et des environnements
                opérationnels. Réduisez le temps de formation et aidez le
                personnel à contextualiser rapidement le matériel
                d'apprentissage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. Optimize venue & facility operations ──────────── */}
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
                alt="Gestion des installations et maintenance"
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
                {lang === "fr" ? "Gestion des Installations & Maintenance" : "Facility Management & Maintenance"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Optimisez les opérations de vos lieux et installations." : "Optimize venue and facility operations."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Documentez chaque étage, chambre et espace technique avec un
                jumeau numérique complet. Facilitez la maintenance, les
                rénovations et la coordination des équipes sans multiplier les
                déplacements sur site.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Manage repairs in real time ───────────────────── */}
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
                {lang === "fr" ? "Gérez les réparations et améliorations en temps réel." : "Manage repairs and improvements in real time."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Évaluez les conditions en temps réel à travers votre portefeuille
                hôtelier et planifiez des projets d'amélioration sans
                déplacements coûteux et chronophages. Surveillez l'état de vos
                hôtels à distance via vos visites virtuelles 3D et exploitez des
                analyses automatisées pour optimiser la maintenance.
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
                alt="Gérez les réparations en temps réel"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Stay on schedule and on budget ────────────────── */}
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
                alt="Suivi des rénovations et construction"
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
                {lang === "fr" ? "Suivi des Rénovations & Construction" : "Renovation & Construction Tracking"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Respectez les délais et le budget." : "Stay on schedule and on budget."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Capturez, documentez et collaborez sur les rénovations d'hôtels
                et de resorts avec une clarté 3D. Alignez les équipes, suivez les
                jalons et évitez les reprises en partageant des informations
                visuelles précises avec les entrepreneurs et les parties
                prenantes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. Consistent standards across portfolio ─────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Conformité & Standards" : "Compliance & Standards"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Assurez des standards cohérents dans tout votre portefeuille." : "Ensure consistent standards across your portfolio."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Maintenez la conformité et les standards de marque dans vos
                établissements hôteliers grâce aux jumeaux numériques. Suivez les
                plans d'amélioration, partagez les priorités, documentez les
                progrès et réduisez les rapports manuels pour maintenir votre
                portefeuille au meilleur niveau.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/110i9yvRmDcH1Qs04fvfW3/a6fcfe2c90152dc878c79dc657391a47/Group_632590__1_.png"
                alt="Standards cohérents à travers le portefeuille"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8. Testimonial – You'll be in good company ───────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-10 md:mb-16"
          >
            {lang === "fr" ? "Accélérez les décisions à travers votre équipe." : "Accelerate decisions across your team."}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto p-6 md:p-10 rounded-2xl bg-card border border-border shadow-soft"
          >
            <blockquote className="text-base md:text-lg text-foreground leading-relaxed mb-6">
              « Nous voulons offrir aux clients potentiels des détails encore
              plus riches sur notre propriété que nos clients trouvent
              passionnants. Nous voulons qu'ils vivent l'expérience de nos
              hôtels bien avant d'y mettre les pieds. »
            </blockquote>
            <div className="flex items-center gap-3">
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/2HGc8wnLvHgdCQWH9Dq0NQ/2fc6c3c88225990401573c8994c71fa0/oliver-stotz.png"
                alt="Oliver Stotz"
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <div className="font-semibold text-foreground text-sm">
                  Oliver Stotz
                </div>
                <div className="text-xs text-muted-foreground">
                  Directeur Marketing & Distribution | Lindner Hotels
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
              25%
            </p>
            <p className="text-sm md:text-base text-foreground/60 max-w-md mx-auto mt-2">
              {lang === "fr" ? "d'engagement en ligne supplémentaire grâce aux visites virtuelles." : "additional online engagement thanks to virtual tours."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 9. Everything you need — Accordion ───────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-10 md:mb-16"
          >
            {lang === "fr" ? "Tout ce dont vous avez besoin pour améliorer vos opérations." : "Everything you need to improve your operations."}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="w-full"
            >
              {[
                {
                  title: "Fichiers CAO",
                  description:
                    "Améliorez l'efficacité et la qualité lors de la planification de rénovations, de rafraîchissements de marque ou de mises à niveau de maintenance dans vos propriétés hôtelières avec notre module complémentaire CAO en un clic.",
                },
                {
                  title: "Intégration AWS",
                  description:
                    "Connectez vos jumeaux numériques à AWS IoT TwinMaker pour surveiller les conditions en temps réel, automatiser les analyses et optimiser la gestion de vos installations hôtelières à grande échelle.",
                },
                {
                  title: "Intégration Autodesk",
                  description:
                    "Exportez directement vers Autodesk Revit et AutoCAD pour intégrer les données de vos jumeaux numériques dans vos workflows BIM existants de conception et de rénovation hôtelière.",
                },
                {
                  title: "Intégration Procore",
                  description:
                    "Synchronisez vos jumeaux numériques avec Procore pour gérer la documentation de construction, suivre l'avancement des projets et collaborer avec les entrepreneurs directement depuis votre plateforme de gestion de projet.",
                },
                {
                  title: "Fichiers CAO, BIM & E57",
                  description:
                    "Exportez vos jumeaux numériques en fichiers CAO, BIM et nuages de points E57 pour la planification, la conception et la coordination de vos projets d'amélioration hôtelière.",
                },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-display font-semibold hover:text-[#2c0a71] transition-colors py-5">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                    {item.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── 11. CTA ──────────────────────────────────────────── */}
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
                {lang === "fr" ? "Découvrez ce que les visites virtuelles peuvent faire pour votre établissement." : "Discover what virtual tours can do for your property."}
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Rejoignez les hôtels, resorts et lieux touristiques qui utilisent
                déjà les jumeaux numériques 3D pour augmenter leurs réservations
                et optimiser leurs opérations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    {lang === "fr" ? "Demander une Démo" : "Request a Demo"}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link to="/portfolio">{lang === "fr" ? "Voir le Portfolio" : "View Portfolio"}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 12. Capture Services ──────────────────────────────── */}
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
                {lang === "fr" ? "Service de Capture" : "Capture Service"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Laissez-nous créer votre jumeau numérique pour vous." : "Let us create your digital twin for you."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                Pour tout type d'établissement hôtelier, quelle que soit sa
                taille, les professionnels PrimeSpace Capture Services sont prêts
                à créer vos jumeaux numériques, pour que vous puissiez vous
                concentrer sur votre activité. C'est rapide et simple.
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
                alt="Service de capture PrimeSpace"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 13. FAQ ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#2c0a71]">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center mb-10 md:mb-16"
          >
            {lang === "fr" ? "FAQ — Visites Virtuelles Tourisme & Hôtellerie" : "FAQ — Travel & Hospitality Virtual Tours"}
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

export default TravelHospitality;
