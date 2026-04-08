import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
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

/* ─── Page ────────────────────────────────────────────────────── */

const ResidentialConstruction = () => {
  const { lang } = useI18n();

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
              {lang === "fr" ? "Construction Résidentielle" : "Residential Construction"}
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71] mb-3 md:mb-4 leading-tight">
              {lang === "fr" ? "La référence numérique pour la construction de maisons." : "The digital standard for home construction."}
            </h1>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              Du début de la construction à la vente finale, PrimeSpace aide à
              maintenir la qualité de construction tout en accélérant les ventes.
              Une seule plateforme pour suivre l'avancement et garantir la
              précision tout au long du processus de construction et de
              commercialisation.
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
              src="https://my.matterport.com/show/?m=9zKXDD6a7od&log=0&help=0&nt=0&play=0&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=1&search=1&wh=0&kb=1&lp=0&title=0&tourcta=2&vr=1"
              title="Visite virtuelle – Construction résidentielle"
              className="w-full h-full"
              allow="fullscreen"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* ── 3. Manage your build and market your brand ────────── */}
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
              {lang === "fr" ? "Gérez votre chantier et valorisez votre marque." : "Manage your build and market your brand."}
            </h2>
            <p className="text-foreground/60 text-sm md:text-lg max-w-3xl mx-auto">
              PrimeSpace connecte vos jalons de construction à vos objectifs
              commerciaux, en vous fournissant le bon livrable au moment exact où
              vous en avez besoin.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* New Homes */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-6">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/sRZUo62SsoccQ7mV08BZm/3b886d2e8e45b81b4c2f30ad9d99e4d1/Frame_2608909.png"
                  alt="Radiographie numérique avant fermeture des murs"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Maisons Neuves" : "New Homes"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                {lang === "fr" ? "Créez une radiographie numérique avant la fermeture des murs." : "Create a digital X-ray before walls close."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Vérifiez le travail des corps de métier à distance, documentez les
                installations mécaniques et protégez-vous contre les réclamations
                de garantie pour les années à venir.
              </p>
            </motion.div>

            {/* Market the Brand */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-6">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/2Gm4cPZGHgTrr2VEnkAyQu/20f475e518a67ae7aa7d3ab8ef8a6001/Frame_2608909.png"
                  alt="Visite virtuelle 24/7 pour chaque maison"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Valorisez la Marque" : "Market the Brand"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                {lang === "fr" ? "Transformez chaque maison terminée en visite virtuelle 24/7." : "Turn every finished home into a 24/7 virtual tour."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Maintenez la cohérence de votre marque avec la référence du
                secteur en matière de visites virtuelles sur chaque annonce.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. Pre-drywall permanent record ──────────────────── */}
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
                src="https://images.ctfassets.net/icnj41gkyohw/4Jci4ShPvyNOhFU5cfLB1d/f710364c697221bdfcd68dea8317e4d1/Frame_7708__17_.png"
                alt="Documentation pré-cloisons"
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
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
                {lang === "fr" ? "Obtenez un relevé permanent avant la pose des cloisons." : "Get a permanent record before drywall goes up."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Créez un relevé 3D permanent et pré-cloisons de chaque
                installation mécanique, câble et conduit. Réduisez les litiges de
                garantie et diminuez les risques d'assurance grâce à une preuve
                irréfutable de ce qui se trouve derrière les murs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Remote job inspections ────────────────────────── */}
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
                {lang === "fr" ? "Débloquez les inspections de chantier à distance." : "Unlock remote job site inspections."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Permettez à votre équipe d'inspecter virtuellement 15 chantiers
                avant le déjeuner. Vérifiez l'avancement et contrôlez la qualité
                des travaux à distance, pour approuver les tirages bancaires sans
                jamais quitter votre bureau.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/EMqdkNZSnyLDiOP08p6VE/02f0d6afe63c03a5d1c91d7d2b9b3ef0/Frame_7708__18_.png"
                alt="Inspections de chantier à distance"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Social content on autopilot ───────────────────── */}
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
                src="https://images.ctfassets.net/icnj41gkyohw/HA3AWKjz87iJmmlHp9eEB/594113f5e1261ccdc132ef9bb82fe1c1/Frame_7708__15_.png"
                alt="Contenu social automatisé"
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
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
                {lang === "fr" ? "Mettez votre contenu social en pilote automatique." : "Put your social content on autopilot."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Notre IA transforme automatiquement vos scans 3D en visites
                vidéo guidées prêtes pour les réseaux sociaux, gardant votre fil
                Instagram frais et votre budget marketing intact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. Elevate your standard ─────────────────────────── */}
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
                {lang === "fr" ? "Élevez votre standard, partout." : "Elevate your standard, everywhere."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Utilisez les visites 3D pour présenter chaque modèle unique,
                chaque package de finitions et chaque espace commun, capturant
                l'ensemble de votre communauté et garantissant une expérience
                premium constante pour vos acheteurs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/2CIyV7NqjmXkieM8fd0zq5/f55f6b4567808bd9bb8eceacbb12bcd4/Frame_7708__16_.png"
                alt="Élevez votre standard"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8. Drive traffic ─────────────────────────────────── */}
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
                src="https://images.ctfassets.net/icnj41gkyohw/3GRLDF7w1tcBpvxdDe1tPv/80b40d936bf36de195d353f1ecb54a1a/Frame_2608868.png"
                alt="Dirigez le trafic là où vous avez besoin de ventes"
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
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
                {lang === "fr" ? "Dirigez le trafic exactement là où vous avez besoin de ventes." : "Direct traffic exactly where you need sales."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                Arrêtez de gaspiller votre budget publicitaire sur des
                communautés déjà vendues. Concentrez votre puissance de feu sur
                les quartiers spécifiques qui ont besoin d'un coup de pouce —
                mettant vos meilleurs actifs numériques devant les acheteurs
                prêts à s'engager maintenant.
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

      {/* ── 9. Testimonial – You'll be in good company ───────── */}
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
              « Avant d'utiliser les jumeaux numériques pour documenter les
              projets, il était difficile de maintenir la cohérence sur chaque
              projet et de rationaliser la communication et la sensibilisation
              entre les membres de l'équipe. Maintenant, chaque détail est
              capturé avec précision, assurant une collaboration fluide, un
              engagement client renforcé et un processus de construction
              rationalisé. En plus, les propriétaires adorent les visites
              virtuelles. »
            </blockquote>
            <div className="flex items-center gap-3">
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/25a2SgOMqC2sWZsUPRF21Y/1db84dc540e66450003205f6e7117856/Testimonials__5_.png"
                alt="BJ Chandler"
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <div className="font-semibold text-foreground text-sm">
                  BJ Chandler
                </div>
                <div className="text-xs text-muted-foreground">
                  Directeur Général | Millhaven Homes
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
              30%
            </p>
            <p className="text-sm md:text-base text-foreground/60 max-w-md mx-auto mt-2">
              d'économies de temps et de coûts grâce aux jumeaux numériques
              intégrés aux workflows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 10. Your projects, mastered with 3D ──────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-10 md:mb-16"
          >
            {lang === "fr" ? "Vos projets, maîtrisés en 3D." : "Your projects, mastered in 3D."}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7vTKl80BLgHyc2reCEjGm0/3d4e22b4d4e02b23d341acf97ece23ef/Digital_Twins_RRE_W.svg",
                title: "Jumeaux numériques haute fidélité",
                description:
                  "Suffisamment précis pour vérifier la qualité de construction derrière les murs, et suffisamment beaux pour captiver les acheteurs sur votre site web.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/2hTnyk44H7YflV2aTiyHlO/f9646bcfe8ae48011146ff34b77debbe/Video_360_W.svg",
                title: "Automatisation par IA",
                description:
                  "Générez automatiquement des visites guidées, des vidéos prêtes pour les réseaux sociaux et des plans d'étage pour le marketing.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7DwMg4iwzkLNRgwh5nUrXd/cec55a431f3f9160a919996efb96bcea/Teamwork_W.svg",
                title: "Collaboration cloud",
                description:
                  "Connectez vos parties prenantes. Signalez les problèmes des corps de métier pendant la construction et partagez des visites virtuelles immersives avec les acheteurs au lancement — le tout sur une seule plateforme.",
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

      {/* ── 11. CTA – Protect margins & accelerate sales ─────── */}
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
                {lang === "fr" ? "Prêt à protéger vos marges et accélérer vos ventes ?" : "Ready to protect your margins and accelerate sales?"}
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Rejoignez les constructeurs qui utilisent déjà les jumeaux
                numériques 3D pour documenter leurs chantiers, accélérer les
                ventes et réduire les coûts.
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
                {lang === "fr" ? "Laissez-nous créer vos jumeaux numériques pour vous." : "Let us create your digital twins for you."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                Le réseau mondial de techniciens PrimeSpace Capture Services peut
                scanner et livrer professionnellement des jumeaux numériques de
                haute qualité de l'ensemble de votre portefeuille de propriétés —
                en aussi peu que 48 heures.
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
                src="https://images.ctfassets.net/icnj41gkyohw/65ukURZW0cKclixSPINDyY/a8da4c87322a28439e3ad63951cdd736/Frame_2608868.png"
                alt="Service de capture PrimeSpace"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResidentialConstruction;
