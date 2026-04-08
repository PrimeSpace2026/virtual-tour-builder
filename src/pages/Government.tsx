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
    question: "Quels problèmes de gestion des installations PrimeSpace résout-il pour les bâtiments gouvernementaux ?",
    answer: "PrimeSpace aide les équipes des installations gouvernementales à documenter, gérer et planifier les espaces physiques à l'aide de jumeaux numériques 3D photoréalistes et dimensionnellement précis. Ces jumeaux numériques soutiennent la planification des espaces et des investissements (CAPEX) en suivant clairement les actifs, en organisant les workflows de maintenance et en documentant les projets de rénovation avec une source unique de vérité visuelle.",
  },
  {
    question: "Quel niveau de précision dimensionnelle peut-on attendre lors du scan 3D d'une installation gouvernementale ?",
    answer: "Les scans 3D PrimeSpace produisent des jumeaux numériques dimensionnellement précis, avec la plus haute précision et portée offerte par les systèmes équipés de LiDAR comme la caméra Pro3. Ces captures répondent aux spécifications LOD 200 pour fournir une base fiable pour les mesures as-built.",
  },
  {
    question: "Quelles normes de sécurité et de conformité PrimeSpace respecte-t-il pour le scan 3D d'installations gouvernementales ?",
    answer: "PrimeSpace pour les installations gouvernementales est hébergé dans un cloud conforme à la réglementation et supporte les contrôles de sécurité standard de l'industrie, notamment SOC 2 Type II et SAML 2.0 SSO. Il est conçu pour se conformer aux exigences de certification des agences et aux cadres de confidentialité courants comme le RGPD et le CCPA sur demande.",
  },
  {
    question: "Les agences peuvent-elles exiger un hébergement des données exclusivement local ?",
    answer: "PrimeSpace pour le secteur public offre un hébergement cloud conforme à la réglementation. Les agences ayant des exigences spécifiques de résidence des données ou d'hébergement peuvent contacter PrimeSpace pour discuter de l'alignement du déploiement et des conditions contractuelles avec les politiques de l'agence.",
  },
  {
    question: "Peut-on exporter des nuages de points et des fichiers BIM à partir des scans 3D PrimeSpace ?",
    answer: "Oui, vous pouvez exporter les livrables suivants à partir des scans 3D PrimeSpace :\n\n• Fichiers OBJ\n• Nuages de points colorisés\n• Image de plan de plafond réfléchi (JPG/PDF)\n• Plans d'étage 2D haute résolution (SVG/JPG/PDF)\n• Fichiers E57\n• Exports BIM (.RVT et IFC)\n• Formats CAO (DWG et XYZ)\n\nCes exports s'intègrent directement dans des outils comme ReCap, Revit, AutoCAD et d'autres applications BIM/CAO, et sont adaptés aux workflows Scan-to-BIM.",
  },
  {
    question: "PrimeSpace peut-il réaliser des scans 3D de nos installations gouvernementales ?",
    answer: "Oui, PrimeSpace Capture Services est disponible et peut scanner les propriétés pour le compte des agences, afin que les équipes n'aient pas à acheter de matériel de capture. Les jumeaux numériques complétés sont généralement livrés sous 48 heures, avec le modèle hébergé dans un cloud conforme à la réglementation.",
  },
  {
    question: "Combien coûte généralement la création d'un scan 3D d'une installation gouvernementale ?",
    answer: "Le coût dépend de la méthode de capture, de la taille et de la complexité de l'installation, du niveau d'abonnement et des livrables sélectionnés tels que les exports BIM. Des devis personnalisés sont disponibles pour refléter la portée et les exigences de chaque projet.",
  },
  {
    question: "PrimeSpace pour le secteur public prend-il en charge l'authentification unique (SSO) ?",
    answer: "Oui, PrimeSpace prend en charge l'authentification unique SAML 2.0 standard pour s'intégrer au fournisseur d'identité de l'agence et permettre un accès centralisé et une authentification des utilisateurs.",
  },
  {
    question: "Quelle formation et quel support sont disponibles pour les équipes gouvernementales utilisant PrimeSpace ?",
    answer: "PrimeSpace offre un support de niveau entreprise, incluant un gestionnaire de succès client dédié, un support technique, de la documentation, ainsi que des SDK et API pour les intégrations. Ces ressources aident les agences à intégrer, exploiter et faire évoluer leurs programmes de jumeaux numériques.",
  },
];

/* ─── Page ────────────────────────────────────────────────────── */

const Government = () => {
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
              {lang === "fr" ? "Gouvernement" : "Government"}
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71] mb-3 md:mb-4 leading-tight">
              {lang === "fr" ? "PrimeSpace pour les organismes publics." : "PrimeSpace for government agencies."}
            </h1>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              Avec PrimeSpace pour les organismes publics, vous pouvez utiliser n'importe quelle caméra compatible pour créer des modèles 3D interactifs, photoréalistes et aux dimensions précises et les héberger dans un cloud conforme à la réglementation.
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
              src="https://my.matterport.com/show/?m=feLEvenZxHW&log=0&help=0&nt=0&play=0&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=0&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
              title="Visite virtuelle – Installations Gouvernementales"
              className="w-full h-full"
              allow="fullscreen"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* ── 3. Government levels — 2 cards ───────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="rounded-3xl bg-card border border-border p-6 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Pouvoir central */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 md:p-10 rounded-2xl bg-muted/40"
              >
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                  {lang === "fr" ? "Pouvoir central" : "Central government"}
                </h3>
                <div className="w-12 h-1 bg-[#e53935] rounded-full mb-5" />
                <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                  PrimeSpace pour les organismes publics offre une solution clé en main qui permet aux administrations de l'État d'évaluer, de gérer et d'améliorer les conditions de fonctionnement de leurs locaux, le tout en ligne.
                </p>
                <p className="text-foreground/60 text-sm md:text-base leading-relaxed mt-4">
                  Les installations militaires et d'autres structures publiques peuvent être capturées et converties en jumeaux numériques hautement fonctionnels en seulement quelques heures pour permettre aux administrations et aux organismes publics d'obtenir des informations plus détaillées sur leurs bâtiments. Le résultat ? Une efficacité et une collaboration améliorées qui permettront, en fin de compte, d'optimiser leur mission.
                </p>
              </motion.div>

              {/* Pouvoirs locaux */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 md:p-10 rounded-2xl bg-muted/40"
              >
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                  {lang === "fr" ? "Pouvoirs locaux" : "Local government"}
                </h3>
                <div className="w-12 h-1 bg-[#e53935] rounded-full mb-5" />
                <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                  Qu'il s'agisse d'écoles, d'universités, de services publics, d'hôpitaux ou d'autres institutions dédiées à la sécurité, les pouvoirs locaux doivent compter sur des infrastructures physiques solides, fiables et efficaces.
                </p>
                <p className="text-foreground/60 text-sm md:text-base leading-relaxed mt-4">
                  Les modèles 3D de PrimeSpace peuvent être utilisés tout au long du cycle de vie d'un bâtiment, depuis la conception et la construction jusqu'à la gestion technique au quotidien. En outre, les jumeaux numériques peuvent permettre de créer des environnements de simulation à des fins de formation, de faciliter la planification et l'orientation dans les situations d'urgence et d'encourager ou gérer le développement de villes intelligentes.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Enhance public safety ─────────────────────────── */}
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
                src="https://images.ctfassets.net/icnj41gkyohw/1edeRyFfg56Wn8AJyecDUm/ea88b2a5141889659129ea64da2403e2/Group_632726.png"
                alt="Sécurité publique renforcée"
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
                {lang === "fr" ? "Sécurité Publique" : "Public Safety"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Renforcez la sécurité publique." : "Enhance public safety."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Les agences de sécurité publique peuvent créer des représentations 3D complètes des scènes d'incidents pour améliorer la collaboration, rationaliser les workflows et renforcer la sécurité physique. Réduisez les risques en passant moins de temps sur le terrain, minimisez les erreurs et effectuez des formations virtuelles.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Engage with citizens ──────────────────────────── */}
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
                {lang === "fr" ? "Engagez les citoyens et la communauté." : "Engage citizens and the community."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Élargissez la présence physique de vos programmes avec une dimension numérique. Offrez un accès virtuel aux monuments, lieux historiques et sites d'intérêt 24/7, maintenez la continuité des opérations et améliorez l'accessibilité pour tous les visiteurs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/5QjxGcgHap0yUx2UPZkEFq/2adb9e32220e1f12ffa292ace039f70e/Mask_group.png"
                alt="Engagement citoyen"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Improve facility management ───────────────────── */}
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
                src="https://images.ctfassets.net/icnj41gkyohw/g9NprdQhNEPpuzdUxeobF/020692ca7956feca8904541e02e8585f/Zaya_Spin_Alpha_0098_1.png"
                alt="Gestion des installations"
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
                {lang === "fr" ? "Gestion des Installations" : "Facility Management"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Améliorez la gestion des installations et des opérations." : "Improve facility and operations management."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                Les jumeaux numériques fournissent des informations critiques sur les bâtiments : mesures, dimensions, agencement et localisation des équipements. Réduisez les coûts de relevés sur site, automatisez la reconnaissance des actifs et optimisez la planification d'urgence pour augmenter la conscience situationnelle.
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

      {/* ── 7. Features — 4 cards ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-10 md:mb-16"
          >
            {lang === "fr" ? "Une suite de fonctionnalités puissante." : "A powerful suite of features."}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {[
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7vTKl80BLgHyc2reCEjGm0/3d4e22b4d4e02b23d341acf97ece23ef/Digital_Twins_RRE_W.svg",
                title: "Sécurité & Conformité",
                description: "Conçu pour les exigences de sécurité et de conformité du secteur public, avec hébergement sécurisé et contrôles d'accès granulaires.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7DwMg4iwzkLNRgwh5nUrXd/cec55a431f3f9160a919996efb96bcea/Teamwork_W.svg",
                title: "Partenariats & Intégrations",
                description: "Centralisez vos données avec les intégrations partenaires. Connectez directement vos fichiers aux plateformes de gestion existantes.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/2hTnyk44H7YflV2aTiyHlO/f9646bcfe8ae48011146ff34b77debbe/Video_360_W.svg",
                title: "Intégrations Autodesk",
                description: "Intégrez les fichiers de bâtiments directement dans un projet Autodesk Construction Cloud pour la conception et la rénovation.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7DwMg4iwzkLNRgwh5nUrXd/cec55a431f3f9160a919996efb96bcea/Teamwork_W.svg",
                title: "Outils de Collaboration",
                description: "Collaborez, planifiez et partagez plus facilement avec votre équipe, vos prestataires ou les citoyens grâce aux outils intégrés.",
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

      {/* ── 8. CTA ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
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
                {lang === "fr" ? "Modernisez la gestion de vos installations publiques." : "Modernize your public facility management."}
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Découvrez comment les jumeaux numériques 3D peuvent améliorer l'efficacité, la sécurité et la collaboration au sein de vos administrations.
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

      {/* ── 9. Capture Services ───────────────────────────────── */}
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
                {lang === "fr" ? "Service de Capture" : "Capture Service"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Laissez-nous numériser vos installations." : "Let us digitize your facilities."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                Les techniciens PrimeSpace Capture Services peuvent scanner professionnellement vos bâtiments gouvernementaux en respectant les protocoles de sécurité requis. Livraison rapide et qualité garantie.
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
                src="https://images.ctfassets.net/icnj41gkyohw/g9NprdQhNEPpuzdUxeobF/020692ca7956feca8904541e02e8585f/Zaya_Spin_Alpha_0098_1.png"
                alt="Service de capture PrimeSpace pour le gouvernement"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#2c0a71]">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white text-center mb-10 md:mb-16"
          >
            {lang === "fr" ? "FAQ — Scan 3D pour les Installations Gouvernementales" : "FAQ — 3D Scanning for Government Facilities"}
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

export default Government;
