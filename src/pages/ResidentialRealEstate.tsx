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
    question: "Les visites virtuelles aident-elles les annonces à obtenir plus d'engagement et des visites mieux qualifiées ?",
    answer: "Oui. Les annonces avec visites virtuelles 3D génèrent en moyenne 49% de leads qualifiés supplémentaires. Les acheteurs peuvent explorer chaque pièce en détail avant de se déplacer, ce qui réduit les visites non pertinentes et accélère le processus de vente.",
  },
  {
    question: "Quels supports marketing puis-je générer à partir d'une seule capture PrimeSpace ?",
    answer: "À partir d'un seul scan, vous obtenez : visites virtuelles 3D interactives, photos HDR haute qualité, plans d'étage cotés, vidéos guidées pour les réseaux sociaux, mesures précises des pièces et vues en mode poupée.",
  },
  {
    question: "Combien de temps faut-il pour scanner une propriété et publier la visite virtuelle ?",
    answer: "Le temps varie selon la taille du bien :\n\n• Studio / T2 : 15-30 minutes de scan\n• Maison (3-4 chambres) : 45-90 minutes\n• Grande propriété / villa : 2-4 heures\n\nLe traitement cloud et la publication sont généralement complétés sous 24 heures.",
  },
  {
    question: "Les mesures et plans d'étage PrimeSpace sont-ils suffisamment précis pour les dimensions et superficies ?",
    answer: "Oui. Les mesures PrimeSpace offrent une précision de ±1% sur les dimensions des pièces. Les plans d'étage schématiques sont automatiquement générés et peuvent être exportés pour une utilisation professionnelle.",
  },
  {
    question: "Les acheteurs peuvent-ils prendre des mesures à l'intérieur d'une visite PrimeSpace sur n'importe quel appareil ?",
    answer: "Oui. L'outil de mesure intégré est accessible depuis n'importe quel navigateur web, sur desktop, tablette ou mobile. Les acheteurs peuvent mesurer les pièces, vérifier les dimensions des espaces et planifier leur ameublement directement dans la visite.",
  },
  {
    question: "Puis-je ajouter mon branding à une visite PrimeSpace tout en restant conforme aux plateformes immobilières ?",
    answer: "Absolument. PrimeSpace permet d'ajouter votre logo, vos couleurs de marque et vos coordonnées directement dans la visite. Les liens de partage sont compatibles avec les principales plateformes immobilières.",
  },
  {
    question: "Dois-je acheter une caméra ou PrimeSpace peut-il capturer ma propriété ?",
    answer: "Les deux options sont disponibles. Vous pouvez utiliser votre propre caméra compatible ou smartphone, ou faire appel à nos techniciens PrimeSpace Capture Services qui se déplacent pour réaliser le scan professionnel de votre bien.",
  },
];

/* ─── Page ────────────────────────────────────────────────────── */

const ResidentialRealEstate = () => {
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
              {lang === "fr" ? "Immobilier Résidentiel" : "Residential Real Estate"}
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71] mb-3 md:mb-4 leading-tight">
              {lang === "fr" ? "Des solutions complètes de la capture à la conclusion." : "Complete solutions from capture to closing."}
            </h1>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              Sublimez vos annonces avec des journées portes ouvertes virtuelles 24/7, immersives, informatives et conçues pour l'exploration — depuis n'importe quel appareil.
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
              src="https://my.matterport.com/show/?m=fcAthpc9Czw&log=0&help=0&nt=0&play=0&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=1&search=1&wh=0&kb=1&lp=0&title=0&tourcta=2&vr=1"
              title="Visite virtuelle – Immobilier Résidentiel"
              className="w-full h-full"
              allow="fullscreen"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* ── 3. Perfect your presentation — 2 cards ───────────── */}
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
              {lang === "fr" ? "Parfaites vos présentations. Concluez plus vite." : "Perfect your presentations. Close faster."}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Win More Listings */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-6">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/3c28NKb83OiBH6Nnl4S30D/e155ae1e20b35fc1563a27cef271c3bd/Frame_7709__4_.png"
                  alt="Gagnez plus de mandats"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Gagnez Plus de Mandats" : "Win More Listings"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                {lang === "fr" ? "Impressionnez les vendeurs avec vos visites interactives 3D." : "Impress sellers with your interactive 3D tours."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Démarquez-vous de la concurrence avec une approche innovante du marketing immobilier. Offrez des visites virtuelles immersives qui mettent en valeur chaque espace du bien.
              </p>
            </motion.div>

            {/* Boost Engagement */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-6">
                <img
                  src="https://images.ctfassets.net/icnj41gkyohw/23AtMvSIKFUJNQHrN0VpfG/6a58fd24274e9b0f2f1004700f73ac03/Frame_7710__2_.png"
                  alt="Boostez l'engagement"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2c0a71]">
                {lang === "fr" ? "Boostez l'Engagement" : "Boost Engagement"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-2 mb-3">
                {lang === "fr" ? "Transformez l'exploration en action." : "Turn exploration into action."}
              </h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                Permettez aux acheteurs de comparer les biens en détail. Partagez les plans d'étage et les dimensions des pièces en un clic.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. Make your properties stand out ────────────────── */}
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
                src="https://images.ctfassets.net/icnj41gkyohw/68LUp3gaZKhe9H0jkQMtwL/b4e072ae7b9cba3e0b135cdd2d78c2f9/Frame_7719.png"
                alt="Démarquez vos propriétés"
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
                {lang === "fr" ? "Contenu Premium" : "Premium Content"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Démarquez vos propriétés." : "Make your properties stand out."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Ajoutez du contenu interactif accrocheur à vos visites 3D que vous pouvez publier sur les réseaux sociaux ou intégrer sur n'importe quel site web. Générez des photos, plans d'étage et vidéos à partir d'un seul scan.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Attract qualified buyers ──────────────────────── */}
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
                {lang === "fr" ? "Attirez des acheteurs qualifiés." : "Attract qualified buyers."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg">
                Permettez aux clients de se projeter dans l'espace, leur donnant une confiance accrue dans leurs décisions d'achat. Les visites virtuelles filtrent naturellement les prospects et attirent des acheteurs véritablement intéressés.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/5azUpvQliIBoOVBk3tH8YP/95237b46804fa89bfce6a38c6eb828a8/Frame_7710__3_.png"
                alt="Attirez des acheteurs qualifiés"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Create, store, and share ──────────────────────── */}
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
                src="https://images.ctfassets.net/icnj41gkyohw/2UGewq8Kxg4aCrzS8TvdOf/194a74e5c1bfa25fdab06c68778c2456/MMC.jpg"
                alt="Plateforme marketing tout-en-un"
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
                {lang === "fr" ? "Plateforme Marketing" : "Marketing Platform"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Créez, stockez et partagez vos médias en un seul endroit." : "Create, store, and share your media in one place."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                Obtenez des photos haute qualité, des visites 3D, des plans d'étage et des vidéos via une plateforme unique — puis améliorez-les avec des automatisations intégrées. Accédez aux analytics, partagez les insights avec vos clients et gérez chaque aspect de vos annonces en quelques clics.
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
              « Nous avons augmenté notre taux de conversion de réservations de près de 12% avec les annonces incluant des jumeaux numériques. Les acheteurs sont plus confiants et mieux informés avant même la première visite physique. »
            </blockquote>
            <div className="flex items-center gap-3">
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/2YWENR2ObU7yUWPYbV3Xzf/425e841020881afbe736d06c2e9e7550/Ellipse_180.png"
                alt="Agent Immobilier"
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <div className="font-semibold text-foreground text-sm">
                  Caleb Donegan
                </div>
                <div className="text-xs text-muted-foreground">
                  VP Digital | Vacasa
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
              {lang === "fr" ? "SELON LES ACHETEURS" : "ACCORDING TO BUYERS"}
            </p>
            <p className="text-3xl md:text-5xl font-display font-bold text-[#2c0a71]">
              63%
            </p>
            <p className="text-sm md:text-base text-foreground/60 max-w-md mx-auto mt-2">
              sont plus susceptibles d'acheter un bien avec une visite virtuelle.
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
            {lang === "fr" ? "Une vue complète de chaque propriété." : "A complete view of every property."}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7vTKl80BLgHyc2reCEjGm0/3d4e22b4d4e02b23d341acf97ece23ef/Digital_Twins_RRE_W.svg",
                title: "Visites 3D interactives",
                description: "Offrez des journées portes ouvertes virtuelles 24/7 accessibles depuis n'importe quel appareil. Augmentez l'engagement et aidez les acheteurs à gagner du temps.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/2hTnyk44H7YflV2aTiyHlO/f9646bcfe8ae48011146ff34b77debbe/Video_360_W.svg",
                title: "Plans d'étage & mesures",
                description: "Générez automatiquement des plans d'étage cotés et permettez aux acheteurs de prendre des mesures directement dans la visite virtuelle.",
              },
              {
                icon: "https://images.ctfassets.net/icnj41gkyohw/7DwMg4iwzkLNRgwh5nUrXd/cec55a431f3f9160a919996efb96bcea/Teamwork_W.svg",
                title: "Publication multi-plateforme",
                description: "Publiez vos visites virtuelles sur les portails immobiliers, Google Street View et les réseaux sociaux en quelques clics.",
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
                {lang === "fr" ? "Prêt à transformer votre marketing immobilier ?" : "Ready to transform your real estate marketing?"}
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Rejoignez les agents et agences qui utilisent déjà les visites virtuelles 3D pour gagner plus de mandats, vendre plus vite et impressionner leurs clients.
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
                {lang === "fr" ? "Service de Capture" : "Capture Service"}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4 md:mb-6">
                {lang === "fr" ? "Laissez-nous créer vos visites virtuelles pour vous." : "Let us create your virtual tours for you."}
              </h2>
              <p className="text-foreground/60 text-sm md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
                PrimeSpace Capture Services met à votre disposition des techniciens professionnels pour scanner vos propriétés et livrer des visites virtuelles de haute qualité — généralement en 48 heures.
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
            FAQ — Visites Virtuelles Immobilier Résidentiel
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

export default ResidentialRealEstate;
