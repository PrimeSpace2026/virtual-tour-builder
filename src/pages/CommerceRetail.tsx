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
    question: "Quels livrables les scans 3D et jumeaux numériques PrimeSpace fournissent-ils pour les projets retail ?",
    answer: "PrimeSpace fournit une gamme de livrables précieux pour les équipes retail, alimentant directement les workflows de conception de magasins et de gestion d'espace :\n\n• Plans d'étage schématiques\n• Mesures dimensionnellement précises\n• Fichiers E57\n• Exports BIM (.RVT et IFC)\n• Formats CAO (DWG et XYZ)\n• Tags et Notes intégrés",
  },
  {
    question: "Comment le scan 3D facilite-t-il la gestion de portefeuille de points de vente ?",
    answer: "Le scan 3D offre aux retailers une vue photoréaliste et mesurable de chaque magasin. Les équipes peuvent examiner les agencements, vérifier le merchandising, planifier les mises à jour et coordonner avec les fournisseurs — le tout sans se déplacer. L'intégration de Tags, Notes et outils de reporting permet de standardiser les audits et de rationaliser les décisions sur l'ensemble du portefeuille.",
  },
  {
    question: "Quels facteurs influencent le coût du scan 3D d'un magasin ou d'un entrepôt ?",
    answer: "Les principaux facteurs à considérer sont :\n\n• Taille de l'espace : les surfaces plus grandes nécessitent plus de temps de capture.\n• Méthode de capture : les tarifs varient selon que vous utilisez votre propre caméra, une caméra Pro3 ou les PrimeSpace Capture Services.\n• Complexité de l'espace : les mobiliers denses, les zones extérieures ou les compléments comme les fichiers BIM ou nuages de points haute densité peuvent augmenter les coûts.",
  },
  {
    question: "Quelle est la précision de la caméra Pro3 pour les mesures as-built dans les grandes surfaces ?",
    answer: "La caméra Pro3 capture des données 3D hautement précises, conformes aux spécifications LOD 200, offrant une base fiable pour les mesures as-built qui peuvent être affinées. Elle est spécialement conçue pour le scan rapide de grands espaces retail intérieurs et extérieurs, avec des exports en E57 ou fichiers BIM selon l'application.",
  },
  {
    question: "Le scan 3D peut-il faciliter les audits de planogrammes et de conformité de marque à distance pour les franchises ?",
    answer: "Le scan 3D offre aux propriétaires de franchises des jumeaux numériques cohérents et de haute qualité permettant des audits à distance via des outils de mesure, Tags, visites virtuelles et Notes de terrain. Les permissions personnalisables offrent des vues adaptées, tandis que le reporting, les journaux d'audit et les API supportent des workflows de révision à grande échelle sur des centaines de sites.",
  },
  {
    question: "Quel est le délai de traitement d'un jumeau numérique et pour les installations multi-sites ?",
    answer: "PrimeSpace Capture Services livre généralement un jumeau numérique traité sous 24 à 48 heures après le rendez-vous de scan. Les compléments standard, tels que les plans d'étage schématiques, sont prêts sous deux jours ouvrables. Pour les installations multi-sites ou entreprise, les délais sont personnalisés via une planification dédiée et des SLA adaptés au volume et au calendrier du retailer.",
  },
  {
    question: "Comment PrimeSpace gère-t-il la planification, le contrôle qualité et le versioning pour les très grands portefeuilles de franchises ?",
    answer: "PrimeSpace rationalise les captures à grande échelle en proposant une planification entreprise avec des techniciens certifiés et un support dédié pour maintenir qualité et cohérence sur tous les sites. La plateforme inclut des journaux d'audit, du reporting et des fonctionnalités de gestion qui facilitent le suivi des versions et l'archivage des modèles. Pour les portefeuilles à haut volume, les API et intégrations permettent d'automatiser les workflows.",
  },
  {
    question: "Comment les scans 3D s'intègrent-ils aux logiciels GMAO, CAFM/EAM, CAO/BIM ou planogramme ?",
    answer: "Les scans 3D PrimeSpace s'intègrent via des connecteurs natifs, des livrables exportables et des API. Les clients peuvent exporter des fichiers E57 et BIM/Revit pour les applications CAO et BIM, et utiliser les SDK et API pour connecter les jumeaux numériques aux systèmes GMAO, CAFM/EAM, planogramme et autres systèmes d'exploitation d'entreprise.",
  },
  {
    question: "Comment s'assurer que le siège, les franchisés et les fournisseurs disposent des bonnes permissions d'accès ?",
    answer: "PrimeSpace offre une sécurité de niveau entreprise, incluant l'authentification SSO SAML 2.0, la conformité SOC 2 Type II, le respect du RGPD et du CCPA, ainsi que la gestion des utilisateurs et des permissions granulaires. Des fonctionnalités comme les Vues, le rognage et le floutage permettent de masquer les zones sensibles, et les options d'intégration privées permettent de diffuser les jumeaux uniquement sur des intranets sécurisés.",
  },
  {
    question: "Comment les retailers quantifient-ils le ROI du scan 3D pour les relevés de sites et les opérations en magasin ?",
    answer: "Les clients PrimeSpace rapportent régulièrement des réductions substantielles du temps passé sur site pour la planification et une résolution plus rapide des problèmes, avec des gains mesurables en efficacité opérationnelle. Ces économies se traduisent par des OPEX réduits, des déploiements plus rapides et moins de visites de reprise coûteuses.",
  },
  {
    question: "Après une rénovation ou un réagencement saisonnier, faut-il rescanner tout le magasin ?",
    answer: "PrimeSpace permet de rescanner un espace à tout moment, créant un jumeau numérique mis à jour tout en préservant les versions précédentes pour référence historique. Si les changements sont mineurs, vous pouvez mettre à jour uniquement les zones concernées ou ajuster les tags et vues. Les rénovations majeures sont mieux documentées par un scan complet pour générer un modèle frais et précis.",
  },
];

/* ─── Page ────────────────────────────────────────────────────── */

const CommerceRetail = () => {
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
              {lang === "fr" ? "Commerce & Retail" : "Commerce & Retail"}
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71] mb-3 md:mb-4 leading-tight">
              {lang === "fr" ? "Réinventez le commerce avec la 3D immersive." : "Reinvent retail with immersive 3D."}
            </h1>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              Des pop-ups aux flagships, les jumeaux numériques PrimeSpace offrent aux équipes retail une visibilité totale sur chaque emplacement, chaque rayon et chaque mètre carré.
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
              src="https://my.matterport.com/show/?m=RjuoiyZi24C&log=0&help=0&nt=0&play=0&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=1&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
              title="Visite virtuelle – Commerce & Retail"
              className="w-full h-full"
              allow="fullscreen"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* ── 3. Solutions for every step — 3 cards ────────────── */}
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
              {lang === "fr" ? "Des solutions innovantes pour chaque étape du parcours retail." : "Innovative solutions for every step of the retail journey."}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Store Design & Construction */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/6VmRTC4Teh4YjvEK8k0Gri/53976d7813e238cc3b1ec0a626fe6c38/Zaya_Spin_Alpha_0098_3.png"
                  alt="Conception & Construction de magasins"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                Conception & Construction
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                Concevez et construisez avec une précision 3D.
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Planifiez les agencements, gérez la construction et documentez chaque phase de vos projets retail grâce aux jumeaux numériques précis dimensionnellement.
              </p>
            </motion.div>

            {/* Visual Merchandising */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/6mcFajxY3TiTZJuHt2gSiX/61033df57b77dd5d72f0cf4e5a8df765/Zaya_Spin_Alpha_0098_4.png"
                  alt="Merchandising visuel"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                Merchandising Visuel
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                Maintenez une exécution de marque cohérente.
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Vérifiez à distance la conformité du merchandising dans chaque point de vente. Optimisez l'agencement des produits et assurez une expérience client uniforme.
              </p>
            </motion.div>

            {/* Digital Twins at Scale */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/1XvhxP74lxkDvxM1U2b2kF/a650099817a113f5039ae2533dcd749e/Zaya_Spin_Alpha_0098_3.png"
                  alt="Jumeaux numériques à grande échelle"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                Jumeaux Numériques à Grande Échelle
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                Transformez l'immobilier commercial retail.
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Gérez l'ensemble de votre portefeuille de magasins avec des jumeaux numériques centralisés. Prenez des décisions éclairées sur l'expansion, la rénovation et l'optimisation des espaces.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. Break new ground — Store Design ───────────────── */}
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
                src="https://images.ctfassets.net/icnj41gkyohw/6VmRTC4Teh4YjvEK8k0Gri/53976d7813e238cc3b1ec0a626fe6c38/Zaya_Spin_Alpha_0098_3.png"
                alt="Conception innovante de magasin en 3D"
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
                Conception & Construction
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                Innovez avec des outils 3D de pointe.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Accélérez la construction et la rénovation de vos magasins en capturant l'état existant avec une précision dimensionnelle. Partagez les jumeaux numériques avec les architectes, entrepreneurs et équipes de conception pour collaborer efficacement à chaque étape du projet.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Maintain brand execution ──────────────────────── */}
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
                Assurez une exécution de marque impeccable.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Donnez aux équipes de merchandising visuel les outils pour vérifier la présentation des produits, la signalétique et l'agencement dans chaque magasin — sans se déplacer. Documentez les lancements de collections et maintenez des standards cohérents sur l'ensemble de votre réseau.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/6mcFajxY3TiTZJuHt2gSiX/61033df57b77dd5d72f0cf4e5a8df765/Zaya_Spin_Alpha_0098_4.png"
                alt="Merchandising visuel cohérent"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Transform commercial real estate ──────────────── */}
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
                src="https://images.ctfassets.net/icnj41gkyohw/1XvhxP74lxkDvxM1U2b2kF/a650099817a113f5039ae2533dcd749e/Zaya_Spin_Alpha_0098_3.png"
                alt="Jumeaux numériques pour immobilier commercial"
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
                Immobilier Commercial Retail
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                Transformez la gestion immobilière retail.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                Numérisez votre portefeuille de points de vente pour optimiser la gestion des baux, planifier les expansions et prendre des décisions immobilières éclairées. Les jumeaux numériques offrent une vue complète de chaque espace, accessible à tout moment depuis n'importe où.
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
              « Les jumeaux numériques ont transformé notre façon de gérer nos magasins. Nous pouvons désormais vérifier le merchandising, planifier les rénovations et former nos équipes à distance — le tout depuis une seule plateforme. L'efficacité et la cohérence de marque se sont considérablement améliorées. »
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2c0a71] flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">
                  Responsable Visual Merchandising
                </div>
                <div className="text-xs text-muted-foreground">
                  Grande Enseigne Retail
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
              40%
            </p>
            <p className="text-sm md:text-base text-foreground/60 max-w-md mx-auto mt-2">
              de réduction des déplacements pour les audits de merchandising grâce aux jumeaux numériques.
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
            Vos espaces commerciaux, maîtrisés en 3D.
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7vTKl80BLgHyc2reCEjGm0/3d4e22b4d4e02b23d341acf97ece23ef/Digital_Twins_RRE_W.svg",
                title: "Jumeaux numériques haute fidélité",
                description: "Capturez chaque détail de vos points de vente avec une précision dimensionnelle pour la planification, le merchandising et l'immobilier.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/2hTnyk44H7YflV2aTiyHlO/f9646bcfe8ae48011146ff34b77debbe/Video_360_W.svg",
                title: "Contenu marketing automatisé",
                description: "Générez automatiquement des visites guidées, des vidéos et des photos haute qualité pour vos campagnes marketing et réseaux sociaux.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7DwMg4iwzkLNRgwh5nUrXd/cec55a431f3f9160a919996efb96bcea/Teamwork_W.svg",
                title: "Collaboration multi-sites",
                description: "Connectez les équipes centrales et locales. Partagez les audits visuels, coordonnez les ouvertures de magasins et standardisez les processus sur l'ensemble de votre réseau.",
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
                Découvrez ce que les visites virtuelles peuvent faire pour votre commerce.
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Rejoignez les enseignes qui utilisent déjà les jumeaux numériques 3D pour optimiser leur merchandising, accélérer les ouvertures et améliorer l'expérience client.
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
                Capturez vos espaces vous-même ou laissez-nous faire.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                Que vous souhaitiez scanner vos magasins en interne ou confier la tâche à nos techniciens certifiés, PrimeSpace propose des solutions flexibles adaptées à votre réseau retail. Livraison rapide garantie.
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
                src="https://images.ctfassets.net/icnj41gkyohw/4Ape4NhFc3H9OxGpPKOvsu/a8973f6260c8446d6876489a40ca21f1/Zaya_Spin_Alpha_0098_1.png"
                alt="Service de capture PrimeSpace pour le retail"
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
            FAQ — Scan 3D pour les Installations Retail
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

export default CommerceRetail;
