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

/* ─── Data ────────────────────────────────────────────────────── */

const stats = [
  { value: "53%", label: "Réduction des déplacements et coûts" },
  { value: "70%", label: "Réduction du temps sur site" },
  { value: "30%", label: "Amélioration de l'efficacité de la formation" },
  { value: "75%", label: "Réduction des coûts de planification" },
];


const features = [
  {
    image: "https://images.ctfassets.net/icnj41gkyohw/7gjCfnPhgHkfaKlSnH8KU9/0127c7458eec99dd01b3b6c33bb04e5e/Enterprise_Security_W.svg",
    title: "Sécurité.",
    description: "Gardez vos données privées et sécurisées, avec différents niveaux de permissions utilisateur.",
    link: "https://matterport.com/trust",
  },
  {
    image: "https://images.ctfassets.net/icnj41gkyohw/3wDimHkJbmUkjuEb1u4KI6/17362a119c18d6047bf6fa6af7111422/Partners_W_1.png",
    title: "Partenariats.",
    description: "Améliorez et personnalisez vos flux de travail existants grâce aux intégrations partenaires.",
    link: "https://matterport.com/partners",
  },
  {
    image: "https://images.ctfassets.net/icnj41gkyohw/4qvYWm4EYPVWJEajTtYLpZ/4ebba13dc61eee9132af536f817daf62/MFG_Collab_W.svg",
    title: "Outils collaboratifs.",
    description: "Collaborez, planifiez et partagez avec votre équipe, vos prestataires et vos partenaires.",
    link: "https://matterport.com/digital-twin-features",
  },
  {
    image: "https://images.ctfassets.net/icnj41gkyohw/3whzXGGKUK4la4hZifhAUe/dd6ecaf4e31ff442587469d5b1f1ab01/ACC_Simple_W_1.png",
    title: "Intégrations.",
    description: "Obtenez des fichiers BIM et des nuages de points pour la planification, la vérification et l'ingénierie.",
    link: "https://matterport.com/digital-twin-features",
  },
];

const faqs = [
  {
    question: "Quels problèmes PrimeSpace aide-t-il les fabricants à résoudre dans leurs installations ?",
    answer: "PrimeSpace aide les fabricants à réduire les temps d'arrêt et les reprises en créant des jumeaux numériques 3D précis qui documentent visuellement les conditions existantes dans les usines, ateliers et entrepôts. Ces jumeaux numériques améliorent la planification des espaces, la visibilité des actifs et la coordination de la maintenance.\n\nPrimeSpace réduit également la perte de connaissances et améliore l'intégration des nouveaux employés grâce à des formations immersives et une documentation contextuelle complète.",
  },
  {
    question: "Quel niveau de précision de scan 3D est généralement requis pour l'agencement d'usine et la détection de conflits ?",
    answer: "Pour l'agencement d'usine et la détection de conflits, les équipes visent généralement une précision de 1 à 2 %, selon l'échelle de l'équipement. Cela suffit pour vérifier les dégagements, planifier les tracés et repérer les conflits avant l'installation. Une précision plus stricte peut être nécessaire dans les zones à tuyauterie dense ou avec des tolérances mécaniques strictes.",
  },
  {
    question: "Quelle précision de mesure et quelles tolérances les scans 3D PrimeSpace peuvent-ils atteindre sur un sol d'usine ?",
    answer: "Les scans haute précision de PrimeSpace prennent en charge les fichiers BIM LOD 200 et les nuages de points prêts pour l'ingénierie, adaptés à la plupart des tâches d'agencement, de vérification et de planification. Si votre projet nécessite des tolérances plus strictes ou une certification métrologique formelle, confirmez ces exigences avant la capture.",
  },
  {
    question: "PrimeSpace peut-il capturer de très grandes installations industrielles, y compris les mezzanines et longues lignes de production ?",
    answer: "Oui. PrimeSpace peut capturer des installations étendues, y compris les mezzanines et les longues lignes de production, grâce à la caméra Pro3 ou le service PrimeSpace Capture Services. Les clients ont documenté des dizaines de milliers de mètres carrés pour la révision à distance, la planification et la formation, avec des outils de confidentialité disponibles pour les zones sensibles.",
  },
  {
    question: "Comment PrimeSpace s'intègre-t-il avec Autodesk Revit, Navisworks ou Procore pour les cas d'usage manufacturiers ?",
    answer: "PrimeSpace s'intègre directement avec Autodesk Revit et Navisworks, permettant d'importer des nuages de points et des fichiers BIM dans vos flux de travail existants. L'intégration Procore facilite la gestion de projet et la documentation du site. Ces intégrations permettent aux équipes de planification et d'ingénierie de travailler avec des données spatiales précises sans changer leurs outils habituels.",
  },
  {
    question: "Comment les modèles 3D sont-ils hébergés et sécurisés ?",
    answer: "Les modèles sont hébergés sur la plateforme cloud sécurisée de PrimeSpace avec des contrôles entreprise comme le SSO SAML 2.0, les permissions basées sur les rôles, la conformité SOC 2 Type II et l'alignement RGPD/CCPA. Les administrateurs peuvent gérer les utilisateurs, auditer l'activité et contrôler le partage.",
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

const Manufacturing = () => {
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
              Révolutionnez les opérations manufacturières.
            </h1>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              Assurez des opérations fluides sur site, rationalisez la formation
              et accélérez la planification d'usine avec la plateforme de jumeaux
              numériques 3D de PrimeSpace.
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
              src="https://my.matterport.com/show/?m=Kt272WCDx1Q&log=0&help=0&nt=0&play=0&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=1&search=1&wh=0&kb=1&lp=0&title=0&tourcta=2&vr=1"
              title="Visite virtuelle – Installation manufacturière"
              className="w-full h-full"
              allow="fullscreen"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* ── 2b. Better for your people, process, planet ──────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 md:mb-5 leading-tight">
              Mieux pour vos équipes, vos processus et la planète.
            </h2>
            <p className="text-foreground/60 text-sm md:text-lg max-w-3xl mx-auto">
              Découvrez toutes les façons dont les jumeaux numériques PrimeSpace
              améliorent les opérations manufacturières.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {/* Smarter Training */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-8 rounded-2xl border border-border bg-muted/30"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/5ukVVzvfYGM0IiYHsHSgJo/527e1abd5ef8279dcc26a6d414f65cda/Compliance_Training.png?fm=webp"
                alt="Formation intelligente"
                className="w-20 h-20 md:w-24 md:h-24 object-contain mb-5"
                loading="lazy"
              />
              <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-4">
                Formation Intelligente
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-sm md:text-base text-foreground/70">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                  Orientation des nouveaux employés
                </li>
                <li className="flex items-start gap-2 text-sm md:text-base text-foreground/70">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                  Procédures de sécurité
                </li>
                <li className="flex items-start gap-2 text-sm md:text-base text-foreground/70">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                  Montée en compétences
                </li>
                <li className="flex items-start gap-2 text-sm md:text-base text-foreground/70">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                  Transfert de connaissances
                </li>
              </ul>
            </motion.div>

            {/* Real Estate */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-2xl border border-border bg-muted/30"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/2qFApV4RksqsRkVGzESnkH/8347da7bbdf0f22a7c55c66a8a8e4b4b/Audit-Reporting.png?fm=webp"
                alt="Immobilier industriel"
                className="w-20 h-20 md:w-24 md:h-24 object-contain mb-5"
                loading="lazy"
              />
              <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-4">
                Immobilier Industriel
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-sm md:text-base text-foreground/70">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                  Planification et développement
                </li>
                <li className="flex items-start gap-2 text-sm md:text-base text-foreground/70">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                  Maintenance et réparation des équipements
                </li>
                <li className="flex items-start gap-2 text-sm md:text-base text-foreground/70">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                  Expérimentation d'agencement et design sans risque de production
                </li>
              </ul>
            </motion.div>

            {/* Far-Reaching Sustainability */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 md:p-8 rounded-2xl border border-border bg-muted/30"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/0kuh24ZXHOo6bWHPJKV9x/1941f9d06b2b23623bae460966b3a939/House_Sold_W__2_.svg"
                alt="Durabilité à grande échelle"
                className="w-20 h-20 md:w-24 md:h-24 object-contain mb-5"
                loading="lazy"
              />
              <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-4">
                Durabilité à Grande Échelle
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-sm md:text-base text-foreground/70">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                  Réduction des risques en planification
                </li>
                <li className="flex items-start gap-2 text-sm md:text-base text-foreground/70">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                  Collaboration immersive
                </li>
                <li className="flex items-start gap-2 text-sm md:text-base text-foreground/70">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                  Accès évolutif et transparence
                </li>
                <li className="flex items-start gap-2 text-sm md:text-base text-foreground/70">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2c0a71] flex-shrink-0" />
                  Développement de la gouvernance
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Increase Operating Efficiency ─────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-elevated border border-border aspect-video"
            >
              <iframe
                src="https://fast.wistia.net/embed/iframe/6fifcla9m7?seo=true&videoFoam=false"
                title="Manufacturing – Increase Operating Efficiency"
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
                Augmentez l'efficacité opérationnelle.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Mettez vos installations manufacturières en ligne pour visualiser
                vos opérations de n'importe où. Les jumeaux numériques fournissent
                des informations précieuses pour rationaliser la maintenance et les
                réparations, améliorer la production et transférer les
                connaissances à grande échelle.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3b. Uplevel Process Optimization ─────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-elevated border border-border aspect-video mb-8 md:mb-12"
          >
            <iframe
              src="https://fast.wistia.net/embed/iframe/6287ew7yrf?seo=true&videoFoam=false"
              title="Uplevel Process Optimization – Manufacturing"
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
              Optimisez vos processus.
            </h2>
            <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-3xl mb-6 md:mb-8">
              Accélérez la planification d'espace et la modernisation de vos usines
              en convertissant facilement vos données spatiales en fichiers BIM
              (Building Information Model) et nuages de points. Rationalisez les
              réparations, la maintenance et la préparation des installations à
              distance — tout en intégrant de manière transparente d'autres
              systèmes IoT.
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
      </section>

      {/* ── 4. Stats – By the Numbers ────────────────────────── */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm uppercase tracking-widest text-foreground/40 font-semibold mb-2"
          >
            En chiffres
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-3xl font-display font-bold text-foreground mb-8 md:mb-12"
          >
            Les clients PrimeSpace ont constaté :
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-left"
              >
                <div className="text-3xl md:text-5xl font-display font-bold text-[#2c0a71] mb-1 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 6. Achieve Greater Sustainability ─────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/26a8iyehOrzVi6YQ3f3h8w/08b0b4064d6ff9e03acdd19b6ac4f551/Group_7608.png?fm=webp"
                alt="En moyenne, chaque jumeau numérique évite environ 0,15 tonne de CO2e"
                className="w-full h-auto max-w-sm mx-auto lg:max-w-none"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
                Vers une plus grande durabilité.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                Réduisez les émissions grâce à l'accès à distance aux sites.
                Économisez du temps, de l'argent et réduisez les risques avec un
                impact direct et mesurable sur vos efforts ESG (environnement,
                social et gouvernance).
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

      {/* ── 7. Testimonials – "You'll be in good company" ────── */}
      <section className="py-16 md:py-24 bg-muted/30">
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

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Metsä */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/SeOEcP3HVOCoRskfMpMcm/8e7a14db74bace93aca1e0795808ddba/download_2.png"
                alt="Metsä Board"
                className="h-8 mb-6 object-contain"
                loading="lazy"
              />
              <blockquote className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                « Nous pouvons ouvrir un jumeau numérique précis et de haute
                qualité lors d'une réunion en ligne et parcourir virtuellement
                l'espace, tout le monde voyant tout. C'est bien mieux que de
                regarder un diagramme de notre usine sur papier, et il n'y a pas
                besoin de visites en personne. C'est un excellent moyen de
                démarrer rapidement sans dépenser le temps ni les coûts de
                déplacement. »
              </blockquote>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/4ASfJwEuCobXyZnl75Zk4k/31d9abf6798164e21f83c7bd2e6c171d/Testimonials.png"
                  alt="Robert Gidlund"
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-foreground text-sm">Robert Gidlund</div>
                  <div className="text-xs text-muted-foreground">Chef de Projet, Metsä Board Husuma</div>
                </div>
              </div>
            </motion.div>

            {/* SEACOMP */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft"
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/gkPEMyROt93FcbFba5ZeQ/f8ee769f5c5dc9ca156e834192e1e850/logo_5.png"
                alt="SEACOMP"
                className="h-8 mb-6 object-contain"
                loading="lazy"
              />
              <blockquote className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                « Bien que les jumeaux numériques aient été capturés à l'origine
                à des fins commerciales et marketing, ils sont devenus un outil
                précieux pour intégrer les nouveaux employés, les aidant à
                comprendre les installations et équipements. Et les données
                spatiales sont particulièrement utiles pour mesurer et analyser
                de nouvelles lignes de production et reconfigurer le sol de
                l'usine. »
              </blockquote>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/47FXlgfDFB9WL8f482jaQL/78dd5f286e5b88786c015f5abf8571e2/Testimonials__1_.png"
                  alt="Terry Arbaugh"
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-foreground text-sm">Terry Arbaugh</div>
                  <div className="text-xs text-muted-foreground">VP Ventes & Marketing, SEACOMP</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8. Enable Predictive Maintenance ──────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
                Activez la maintenance prédictive.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                Augmentez le temps de fonctionnement des équipements en intégrant
                toutes vos données applicatives essentielles. Le partenariat
                Amazon Web Services (AWS) et PrimeSpace simplifie la création
                d'un jumeau numérique de votre système réel, produisant des
                efficacités de niveau entreprise.
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
              className="rounded-2xl overflow-hidden shadow-elevated border border-border aspect-video"
            >
              <iframe
                src="https://fast.wistia.net/embed/iframe/8wsvuwd0om?seo=true&videoFoam=false"
                title="Manufacturing – Enable Predictive Maintenance"
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 9. Production Space. Performance Engine. ──────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/5U6lfL6Qr9ZX0w1NZarXqH/9d1a7b616d3c52bf96e579b345c8fcb6/Frame_7709__6_.png"
                alt="Opérateur utilisant un modèle PrimeSpace sur écran"
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
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
                Espace de production. Moteur de performance.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                Les fabricants utilisent les jumeaux numériques PrimeSpace pour
                optimiser les agencements, former les équipes et prévenir les
                temps d'arrêt — réduisant les visites sur site et accélérant les
                décisions. Découvrez comment des marques leaders comme Siemens et
                Bayer transforment leurs opérations grâce à l'intelligence
                spatiale.
              </p>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                asChild
              >
                <Link to="/contact">Télécharger le Guide</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. Feature Grid ──────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
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
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 md:p-8 rounded-2xl bg-muted/40 border border-border"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-display font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <a
                  href={feature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-[#2c0a71] transition-colors"
                >
                  En Savoir Plus
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Large-Scale Capture ───────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
                Capture à grande échelle, perturbation minimale.
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                Que vous travailliez avec nos professionnels ou scanniez vos
                propres installations, notre caméra Pro3 capture une portée
                incroyable avec des scans en temps record. Grâce à notre
                fonction de floutage, les informations sensibles, visages et
                détails peuvent être masqués pour capturer avec un minimum de
                préparation ou de planification.
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
                src="https://images.ctfassets.net/icnj41gkyohw/7Mjl69BfR3TKn7gQf04YQw/b77e566b8f000c2194a0c65e160f7f74/Zaya_Spin_Alpha_0098_1.png"
                alt="Technicien scannant une pièce avec la caméra PrimeSpace Pro3"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
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
            FAQ – Scan 3D pour l'Industrie Manufacturière
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

      {/* ── 13. CTA ───────────────────────────────────────────── */}
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
                Prêt à transformer vos installations industrielles ?
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Rejoignez les industriels qui utilisent déjà les jumeaux
                numériques 3D pour optimiser la production, réduire les coûts et
                accélérer la planification.
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

export default Manufacturing;
