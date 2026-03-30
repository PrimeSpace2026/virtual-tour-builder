import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  ArrowRight,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const stats = [
  { value: "95%", label: "de taux de visite en ligne" },
  { value: "3×", label: "plus rapide pour louer" },
  { value: "40%", label: "de déplacements en moins" },
  { value: "50%", label: "d'engagement en plus" },
];

const useCases = [
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/39CGLqxKt54yrA0lOGM8uR/7e74be3195ddc78e9b4e3b4a585635bc/Sales_W.svg",
    title: "L'outil idéal pour optimiser vos espaces.",
    description:
      "Évaluez les conditions existantes. Consolidez la documentation de vos bâtiments. Obtenez des informations instantanées sur l'ensemble de votre portefeuille pour rationaliser la planification et la gestion de l'occupation.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/1wLnWGbLDOO8zeAz3vuDib/e51e5fd05d8523a6ebfeb7ac7c254ad5/Online_Learning_W_1__1_.svg",
    title: "Réduisez les risques grâce à la formation à distance.",
    description:
      "Développez des expériences d'apprentissage virtuelles immersives, des formations sur les installations et des consignes de sécurité, accessibles 24h/24 et 7j/7, pour les équipes internes et les partenaires externes.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/73q8DLUj6RRyqRDiQCNvDG/baf2f8e465d7a49acf1781459d282e9f/Increase_Decrease_B.png",
    title: "Réduisez la vacance et augmentez les revenus.",
    description:
      "Permettez aux prospects de visiter les biens à distance, réduisant le temps et les coûts liés aux visites sur site et accélérant le cycle de vente ou de location.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/6JSq6gN7wAyqrPPlzM7eFJ/b95e5f34040057a3157f2e8c5803717c/Management_Permissions_B.png",
    title: "Gérez les opérations quotidiennes depuis n'importe où.",
    description:
      "Simplifiez le travail des gestionnaires d'installations, chefs de projet et prestataires pour prendre des mesures, gérer les équipements, effectuer des inspections et préparer les installations à distance.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/1lCEq0Y5l7yOjuTVjRqvnG/eeb4f6896c20c1057047ffb56dc19a7e/Digital_Twin_Communication_W.svg",
    title: "Améliorez l'expérience des locataires.",
    description:
      "Augmentez la satisfaction des locataires et des employés. Créez des visites d'orientation virtuelles et du guidage pour les nouveaux locataires et employés dans les bureaux hybrides.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/1EApr1mcyjw6GdFNOmQhDw/afd7e87c22123975bb94e9b2f4128cdf/Building_Inspection_W.svg",
    title: "Accélérez la mise sur le marché.",
    description:
      "Générez des fichiers BIM et CAD directement à partir de l'environnement existant pour simplifier les cycles de planification, de conception et de gestion de projet.",
  },
];

const leadMarketItems = [
  {
    title: "Location et vente immobilière",
    description:
      "Accélérez les cycles de transaction grâce à des visites virtuelles immersives qui permettent aux prospects d'explorer les espaces à distance, réduisant les coûts marketing et les perturbations pour les entreprises sur site.",
  },
  {
    title: "Planification des espaces",
    description:
      "Exploitez des mesures 3D précises et des plans d'étage pour optimiser les agencements, planifier les rénovations et visualiser les configurations avant de vous engager dans des modifications coûteuses.",
  },
  {
    title: "Gestion de la qualité et suivi de l'avancement",
    description:
      "Documentez les conditions du site au fil du temps, suivez les étapes du projet et assurez le respect des normes de qualité grâce à des enregistrements visuels horodatés de chaque espace.",
  },
  {
    title: "Gestion des installations",
    description:
      "Permettez aux équipes de maintenance d'inspecter les bâtiments à distance, de coordonner l'entretien, de gérer les équipements et de rationaliser les flux de travail des prestataires depuis n'importe où.",
  },
];

const features = [
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/7gjCfnPhgHkfaKlSnH8KU9/0127c7458eec99dd01b3b6c33bb04e5e/Enterprise_Security_W.svg",
    title: "Conçu pour l'entreprise.",
    description:
      "Gardez vos données privées et sécurisées, avec différents niveaux de permissions utilisateur.",
    link: "https://matterport.com/trust",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/3whzXGGKUK4la4hZifhAUe/dd6ecaf4e31ff442587469d5b1f1ab01/ACC_Simple_W_1.png",
    title: "Fichiers et données immobilières.",
    description:
      "Obtenez des plans d'étage précis et des fichiers BIM pour la planification, la gestion et le marketing des espaces.",
    link: "https://matterport.com/digital-twin-features",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/4qvYWm4EYPVWJEajTtYLpZ/4ebba13dc61eee9132af536f817daf62/MFG_Collab_W.svg",
    title: "Outils intuitifs.",
    description:
      "Collaborez, planifiez et partagez avec votre équipe, vos prestataires et vos locataires potentiels.",
    link: "https://support.matterport.com/s/articlelist?language=en_US&categfilter=Add_On_Services&parentcategory=Add_On_Services",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/3wDimHkJbmUkjuEb1u4KI6/17362a119c18d6047bf6fa6af7111422/Partners_W_1.png",
    title: "Partenariats.",
    description:
      "Améliorez et personnalisez vos flux de travail existants grâce aux intégrations partenaires.",
    link: "https://matterport.com/partners",
  },
];

const faqs = [
  {
    question:
      "PrimeSpace peut-il offrir une visibilité sur des portefeuilles multi-bâtiments et de grandes propriétés commerciales dans un seul compte ?",
    answer:
      "Oui, PrimeSpace s'adapte facilement aux portefeuilles multi-bâtiments, permettant aux équipes immobilières d'organiser et de naviguer parmi des centaines de visites virtuelles depuis un tableau de bord unique. Même pour les actifs très importants, l'infrastructure cloud assure un chargement rapide et une visualisation fluide sans latence.",
  },
  {
    question:
      "Quels sont les livrables de capture 3D les plus impactants pour les équipes de gestion immobilière ?",
    answer:
      "Les livrables les plus précieux sont ceux qui fournissent une documentation claire améliorant la communication entre le marketing immobilier, la location et les opérations de maintenance. Les principaux livrables incluent :\n\n• Visites virtuelles 3D immersives\n• Plans d'étage schématiques\n• Informations de Property Intelligence comme des mesures dimensionnellement précises\n\nCeux-ci soutiennent le marketing, la due diligence locative et la planification et gestion des installations.",
  },
  {
    question:
      "PrimeSpace peut-il gérer la capture extérieure et longue portée pour les entrepôts commerciaux, usines ou campus ?",
    answer:
      "Oui, PrimeSpace prend en charge la capture intérieure et extérieure et est optimisé pour une grande variété d'appareils. La caméra Pro3 est couramment utilisée pour les scans à grande échelle de bâtiments commerciaux, d'entrepôts et de campus.",
  },
  {
    question:
      "PrimeSpace peut-il capturer la propriété pour nous, et quels sont les délais de livraison ?",
    answer:
      "PrimeSpace Capture Services met à disposition des techniciens certifiés dans des centaines de villes pour scanner vos propriétés, avec une livraison possible en 48 heures dans de nombreuses localisations populaires.",
  },
  {
    question:
      "Comment les modèles 3D / visites virtuelles sont-ils hébergés et sécurisés, et peut-on contrôler l'accès avec SSO et des permissions ?",
    answer:
      "Les modèles sont hébergés sur la plateforme cloud sécurisée de PrimeSpace avec des contrôles entreprise comme le SSO SAML 2.0, les permissions basées sur les rôles, la conformité SOC 2 Type II et l'alignement RGPD/CCPA. Les administrateurs peuvent gérer les utilisateurs, auditer l'activité, contrôler le partage et intégrer des visites privées dans des portails sécurisés.",
  },
  {
    question:
      "Peut-on intégrer les visites virtuelles PrimeSpace sur notre site web et nos portails d'annonces, ou partager des liens privés pour la due diligence ?",
    answer:
      "Les visites virtuelles PrimeSpace peuvent être intégrées sur les sites web immobiliers commerciaux, ajoutées aux portails d'annonces, partagées sur les réseaux sociaux, importées sur Google Street View ou distribuées via des liens privés pour une due diligence confidentielle. Les vues et les permissions permettent d'adapter l'accès pour différents publics.",
  },
  {
    question:
      "Quelles options d'abonnement et tarifs entreprise sont disponibles pour les portefeuilles commerciaux ?",
    answer:
      "Chaque portefeuille commercial étant unique, PrimeSpace propose des plans Entreprise personnalisés qui s'adaptent selon les Espaces Actifs, les utilisateurs, les fonctionnalités et les intégrations. Les clients entreprise peuvent travailler avec l'équipe commerciale pour adapter les tarifs et les capacités.\n\nContactez-nous pour discuter de vos besoins.",
  },
  {
    question:
      "Quel accompagnement, formation et support proposez-vous pour les déploiements immobiliers commerciaux ?",
    answer:
      "PrimeSpace propose un accompagnement pour les utilisateurs commerciaux et entreprise avec un Customer Success Manager dédié et un support technique mondial. Les services de capture, les ressources de formation et la documentation aident les équipes à standardiser leurs flux de travail et à monter en compétence rapidement.",
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

const CommercialRealEstate = () => {
  return (
    <Layout>
      <WhatsAppButton />

      {/* Hero Text */}
      <section className="bg-white pt-20 md:pt-28 pb-6 md:pb-10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71] mb-3 md:mb-4">
              Générez des revenus grâce aux{" "}
              <span className="text-[#2c0a71]/80">visites virtuelles</span>{" "}
              de vos biens commerciaux
            </h2>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              Mettez l'ensemble de votre portefeuille immobilier en ligne avec
              la plateforme de jumeaux numériques 3D. Optimisez la gestion,
              réduisez la vacance et transformez chaque aspect de votre activité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero GIF */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full aspect-[4/3] sm:aspect-[2/1] lg:aspect-[3/1]"
        >
          <img
            src="/Boost_Buyer_Engagement.gif"
            alt="Visite virtuelle immobilier commercial"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-10 md:py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
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

      {/* Use Cases Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Des avantages tout au long du cycle de vie du bâtiment."
            description="Découvrez comment les jumeaux numériques 3D révolutionnent le marketing, la gestion et la valorisation de vos actifs immobiliers."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mt-10 md:mt-16">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead the Market Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71]">
              Prenez l'avantage sur le marché avec PrimeSpace.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-elevated border border-border aspect-video"
            >
              <iframe
                src="https://my.matterport.com/show/?m=uvutazzurJ3&log=0&help=0&nt=0&play=1&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=0&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
                title="Visite virtuelle - Immobilier Commercial"
                className="w-full h-full"
                allow="fullscreen"
                allowFullScreen
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Accordion
                type="single"
                collapsible
                defaultValue="item-0"
                className="w-full"
              >
                {leadMarketItems.map((item, i) => (
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
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
                Vers une plus grande durabilité.
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                Réduisez les émissions grâce à l'accès à distance aux sites. Économisez du temps, de l'argent et
                réduisez les risques avec un impact direct et mesurable sur vos efforts ESG (environnement,
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

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.ctfassets.net/icnj41gkyohw/6FKVuPnpRSqyFssivYT0Ba/c3565651fd2a33582073f37535e7e94f/Group_7608.png?fm=webp"
                alt="On average, each digital twin avoids around 0.15 tonnes of CO2e from being emitted"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
              Une suite de fonctionnalités puissantes.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 md:p-8 rounded-2xl bg-muted/40"
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

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71]">
              FAQ – Visites Virtuelles Immobilier Commercial
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-display font-semibold hover:text-[#2c0a71] transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5 whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="text-xl md:text-3xl font-display font-medium text-foreground leading-relaxed mb-6 md:mb-8">
                "La visite virtuelle 3D a réduit nos délais de location de 60%.
                Les prospects arrivent déjà convaincus après avoir exploré
                l'espace en ligne."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2c0a71]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#2c0a71]" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">
                    Ahmed Bouslama
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Directeur Immobilier, Groupe Commercial
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
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
                Prêt à transformer votre immobilier commercial?
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Rejoignez les professionnels qui utilisent déjà les visites
                virtuelles 3D pour commercialiser plus vite, gérer mieux et
                valoriser leur portefeuille.
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

export default CommercialRealEstate;
