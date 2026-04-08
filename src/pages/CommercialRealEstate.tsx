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
import { useI18n } from "@/i18n";

const getStats = (lang: string) => [
  { value: "95%", label: lang === "fr" ? "de taux de visite en ligne" : "online visit rate" },
  { value: "3×", label: lang === "fr" ? "plus rapide pour louer" : "faster to lease" },
  { value: "40%", label: lang === "fr" ? "de déplacements en moins" : "fewer site visits" },
  { value: "50%", label: lang === "fr" ? "d'engagement en plus" : "more engagement" },
];

const getUseCases = (lang: string) => [
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/39CGLqxKt54yrA0lOGM8uR/7e74be3195ddc78e9b4e3b4a585635bc/Sales_W.svg",
    title: lang === "fr" ? "L'outil idéal pour optimiser vos espaces." : "The ideal tool to optimize your spaces.",
    description: lang === "fr"
      ? "Évaluez les conditions existantes. Consolidez la documentation de vos bâtiments. Obtenez des informations instantanées sur l'ensemble de votre portefeuille pour rationaliser la planification et la gestion de l'occupation."
      : "Assess existing conditions. Consolidate your building documentation. Get instant insights across your entire portfolio to streamline occupancy planning and management.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/1wLnWGbLDOO8zeAz3vuDib/e51e5fd05d8523a6ebfeb7ac7c254ad5/Online_Learning_W_1__1_.svg",
    title: lang === "fr" ? "Réduisez les risques grâce à la formation à distance." : "Reduce risk with remote training.",
    description: lang === "fr"
      ? "Développez des expériences d'apprentissage virtuelles immersives, des formations sur les installations et des consignes de sécurité, accessibles 24h/24 et 7j/7, pour les équipes internes et les partenaires externes."
      : "Develop immersive virtual learning experiences, facility trainings, and safety briefings, accessible 24/7, for internal teams and external partners.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/73q8DLUj6RRyqRDiQCNvDG/baf2f8e465d7a49acf1781459d282e9f/Increase_Decrease_B.png",
    title: lang === "fr" ? "Réduisez la vacance et augmentez les revenus." : "Reduce vacancy and increase revenue.",
    description: lang === "fr"
      ? "Permettez aux prospects de visiter les biens à distance, réduisant le temps et les coûts liés aux visites sur site et accélérant le cycle de vente ou de location."
      : "Enable prospects to visit properties remotely, reducing the time and costs of on-site visits and accelerating the sales or leasing cycle.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/6JSq6gN7wAyqrPPlzM7eFJ/b95e5f34040057a3157f2e8c5803717c/Management_Permissions_B.png",
    title: lang === "fr" ? "Gérez les opérations quotidiennes depuis n'importe où." : "Manage daily operations from anywhere.",
    description: lang === "fr"
      ? "Simplifiez le travail des gestionnaires d'installations, chefs de projet et prestataires pour prendre des mesures, gérer les équipements, effectuer des inspections et préparer les installations à distance."
      : "Simplify work for facility managers, project managers, and contractors to take measurements, manage equipment, perform inspections, and prepare facilities remotely.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/1lCEq0Y5l7yOjuTVjRqvnG/eeb4f6896c20c1057047ffb56dc19a7e/Digital_Twin_Communication_W.svg",
    title: lang === "fr" ? "Améliorez l'expérience des locataires." : "Enhance the tenant experience.",
    description: lang === "fr"
      ? "Augmentez la satisfaction des locataires et des employés. Créez des visites d'orientation virtuelles et du guidage pour les nouveaux locataires et employés dans les bureaux hybrides."
      : "Increase tenant and employee satisfaction. Create virtual orientation tours and wayfinding for new tenants and employees in hybrid offices.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/1EApr1mcyjw6GdFNOmQhDw/afd7e87c22123975bb94e9b2f4128cdf/Building_Inspection_W.svg",
    title: lang === "fr" ? "Accélérez la mise sur le marché." : "Accelerate time to market.",
    description: lang === "fr"
      ? "Générez des fichiers BIM et CAD directement à partir de l'environnement existant pour simplifier les cycles de planification, de conception et de gestion de projet."
      : "Generate BIM and CAD files directly from the existing environment to simplify planning, design, and project management cycles.",
  },
];

const getLeadMarketItems = (lang: string) => [
  {
    title: lang === "fr" ? "Location et vente immobilière" : "Property leasing and sales",
    description: lang === "fr"
      ? "Accélérez les cycles de transaction grâce à des visites virtuelles immersives qui permettent aux prospects d'explorer les espaces à distance, réduisant les coûts marketing et les perturbations pour les entreprises sur site."
      : "Accelerate transaction cycles with immersive virtual tours that let prospects explore spaces remotely, reducing marketing costs and disruption to on-site businesses.",
  },
  {
    title: lang === "fr" ? "Planification des espaces" : "Space planning",
    description: lang === "fr"
      ? "Exploitez des mesures 3D précises et des plans d'étage pour optimiser les agencements, planifier les rénovations et visualiser les configurations avant de vous engager dans des modifications coûteuses."
      : "Leverage precise 3D measurements and floor plans to optimize layouts, plan renovations, and visualize configurations before committing to costly changes.",
  },
  {
    title: lang === "fr" ? "Gestion de la qualité et suivi de l'avancement" : "Quality management and progress tracking",
    description: lang === "fr"
      ? "Documentez les conditions du site au fil du temps, suivez les étapes du projet et assurez le respect des normes de qualité grâce à des enregistrements visuels horodatés de chaque espace."
      : "Document site conditions over time, track project milestones, and ensure quality standards are met with timestamped visual records of every space.",
  },
  {
    title: lang === "fr" ? "Gestion des installations" : "Facility management",
    description: lang === "fr"
      ? "Permettez aux équipes de maintenance d'inspecter les bâtiments à distance, de coordonner l'entretien, de gérer les équipements et de rationaliser les flux de travail des prestataires depuis n'importe où."
      : "Enable maintenance teams to inspect buildings remotely, coordinate upkeep, manage equipment, and streamline contractor workflows from anywhere.",
  },
];

const getFeatures = (lang: string) => [
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/7gjCfnPhgHkfaKlSnH8KU9/0127c7458eec99dd01b3b6c33bb04e5e/Enterprise_Security_W.svg",
    title: lang === "fr" ? "Conçu pour l'entreprise." : "Built for the enterprise.",
    description: lang === "fr"
      ? "Gardez vos données privées et sécurisées, avec différents niveaux de permissions utilisateur."
      : "Keep your data private and secure, with different levels of user permissions.",
    link: "https://matterport.com/trust",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/3whzXGGKUK4la4hZifhAUe/dd6ecaf4e31ff442587469d5b1f1ab01/ACC_Simple_W_1.png",
    title: lang === "fr" ? "Fichiers et données immobilières." : "Property files and data.",
    description: lang === "fr"
      ? "Obtenez des plans d'étage précis et des fichiers BIM pour la planification, la gestion et le marketing des espaces."
      : "Get accurate floor plans and BIM files for space planning, management, and marketing.",
    link: "https://matterport.com/digital-twin-features",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/4qvYWm4EYPVWJEajTtYLpZ/4ebba13dc61eee9132af536f817daf62/MFG_Collab_W.svg",
    title: lang === "fr" ? "Outils intuitifs." : "Intuitive tools.",
    description: lang === "fr"
      ? "Collaborez, planifiez et partagez avec votre équipe, vos prestataires et vos locataires potentiels."
      : "Collaborate, plan, and share with your team, contractors, and prospective tenants.",
    link: "https://support.matterport.com/s/articlelist?language=en_US&categfilter=Add_On_Services&parentcategory=Add_On_Services",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/3wDimHkJbmUkjuEb1u4KI6/17362a119c18d6047bf6fa6af7111422/Partners_W_1.png",
    title: lang === "fr" ? "Partenariats." : "Partnerships.",
    description: lang === "fr"
      ? "Améliorez et personnalisez vos flux de travail existants grâce aux intégrations partenaires."
      : "Enhance and customize your existing workflows with partner integrations.",
    link: "https://matterport.com/partners",
  },
];

const getFaqs = (lang: string) => [
  {
    question: lang === "fr"
      ? "PrimeSpace peut-il offrir une visibilité sur des portefeuilles multi-bâtiments et de grandes propriétés commerciales dans un seul compte ?"
      : "Can PrimeSpace provide visibility across multi-building portfolios and large commercial properties in a single account?",
    answer: lang === "fr"
      ? "Oui, PrimeSpace s'adapte facilement aux portefeuilles multi-bâtiments, permettant aux équipes immobilières d'organiser et de naviguer parmi des centaines de visites virtuelles depuis un tableau de bord unique. Même pour les actifs très importants, l'infrastructure cloud assure un chargement rapide et une visualisation fluide sans latence."
      : "Yes, PrimeSpace easily scales to multi-building portfolios, enabling real estate teams to organize and navigate hundreds of virtual tours from a single dashboard. Even for very large assets, the cloud infrastructure ensures fast loading and smooth visualization without latency.",
  },
  {
    question: lang === "fr"
      ? "Quels sont les livrables de capture 3D les plus impactants pour les équipes de gestion immobilière ?"
      : "What are the most impactful 3D capture deliverables for property management teams?",
    answer: lang === "fr"
      ? "Les livrables les plus précieux sont ceux qui fournissent une documentation claire améliorant la communication entre le marketing immobilier, la location et les opérations de maintenance. Les principaux livrables incluent :\n\n\u2022 Visites virtuelles 3D immersives\n\u2022 Plans d'étage schématiques\n\u2022 Informations de Property Intelligence comme des mesures dimensionnellement précises\n\nCeux-ci soutiennent le marketing, la due diligence locative et la planification et gestion des installations."
      : "The most valuable deliverables are those providing clear documentation that improves communication between property marketing, leasing, and maintenance operations. Key deliverables include:\n\n\u2022 Immersive 3D virtual tours\n\u2022 Schematic floor plans\n\u2022 Property Intelligence insights such as dimensionally accurate measurements\n\nThese support marketing, leasing due diligence, and facility planning and management.",
  },
  {
    question: lang === "fr"
      ? "PrimeSpace peut-il gérer la capture extérieure et longue portée pour les entrepôts commerciaux, usines ou campus ?"
      : "Can PrimeSpace handle outdoor and long-range capture for commercial warehouses, factories, or campuses?",
    answer: lang === "fr"
      ? "Oui, PrimeSpace prend en charge la capture intérieure et extérieure et est optimisé pour une grande variété d'appareils. La caméra Pro3 est couramment utilisée pour les scans à grande échelle de bâtiments commerciaux, d'entrepôts et de campus."
      : "Yes, PrimeSpace supports both indoor and outdoor capture and is optimized for a wide variety of devices. The Pro3 camera is commonly used for large-scale scans of commercial buildings, warehouses, and campuses.",
  },
  {
    question: lang === "fr"
      ? "PrimeSpace peut-il capturer la propriété pour nous, et quels sont les délais de livraison ?"
      : "Can PrimeSpace capture the property for us, and what are the delivery timelines?",
    answer: lang === "fr"
      ? "PrimeSpace Capture Services met à disposition des techniciens certifiés dans des centaines de villes pour scanner vos propriétés, avec une livraison possible en 48 heures dans de nombreuses localisations populaires."
      : "PrimeSpace Capture Services provides certified technicians in hundreds of cities to scan your properties, with delivery possible within 48 hours in many popular locations.",
  },
  {
    question: lang === "fr"
      ? "Comment les modèles 3D / visites virtuelles sont-ils hébergés et sécurisés, et peut-on contrôler l'accès avec SSO et des permissions ?"
      : "How are 3D models / virtual tours hosted and secured, and can access be controlled with SSO and permissions?",
    answer: lang === "fr"
      ? "Les modèles sont hébergés sur la plateforme cloud sécurisée de PrimeSpace avec des contrôles entreprise comme le SSO SAML 2.0, les permissions basées sur les rôles, la conformité SOC 2 Type II et l'alignement RGPD/CCPA. Les administrateurs peuvent gérer les utilisateurs, auditer l'activité, contrôler le partage et intégrer des visites privées dans des portails sécurisés."
      : "Models are hosted on PrimeSpace's secure cloud platform with enterprise controls including SAML 2.0 SSO, role-based permissions, SOC 2 Type II compliance, and GDPR/CCPA alignment. Administrators can manage users, audit activity, control sharing, and embed private tours in secure portals.",
  },
  {
    question: lang === "fr"
      ? "Peut-on intégrer les visites virtuelles PrimeSpace sur notre site web et nos portails d'annonces, ou partager des liens privés pour la due diligence ?"
      : "Can PrimeSpace virtual tours be embedded on our website and listing portals, or shared via private links for due diligence?",
    answer: lang === "fr"
      ? "Les visites virtuelles PrimeSpace peuvent être intégrées sur les sites web immobiliers commerciaux, ajoutées aux portails d'annonces, partagées sur les réseaux sociaux, importées sur Google Street View ou distribuées via des liens privés pour une due diligence confidentielle. Les vues et les permissions permettent d'adapter l'accès pour différents publics."
      : "PrimeSpace virtual tours can be embedded on commercial real estate websites, added to listing portals, shared on social media, imported to Google Street View, or distributed via private links for confidential due diligence. Views and permissions allow tailored access for different audiences.",
  },
  {
    question: lang === "fr"
      ? "Quelles options d'abonnement et tarifs entreprise sont disponibles pour les portefeuilles commerciaux ?"
      : "What subscription options and enterprise pricing are available for commercial portfolios?",
    answer: lang === "fr"
      ? "Chaque portefeuille commercial étant unique, PrimeSpace propose des plans Entreprise personnalisés qui s'adaptent selon les Espaces Actifs, les utilisateurs, les fonctionnalités et les intégrations. Les clients entreprise peuvent travailler avec l'équipe commerciale pour adapter les tarifs et les capacités.\n\nContactez-nous pour discuter de vos besoins."
      : "Since every commercial portfolio is unique, PrimeSpace offers customized Enterprise plans that scale based on Active Spaces, users, features, and integrations. Enterprise clients can work with the sales team to tailor pricing and capabilities.\n\nContact us to discuss your needs.",
  },
  {
    question: lang === "fr"
      ? "Quel accompagnement, formation et support proposez-vous pour les déploiements immobiliers commerciaux ?"
      : "What onboarding, training, and support do you offer for commercial real estate deployments?",
    answer: lang === "fr"
      ? "PrimeSpace propose un accompagnement pour les utilisateurs commerciaux et entreprise avec un Customer Success Manager dédié et un support technique mondial. Les services de capture, les ressources de formation et la documentation aident les équipes à standardiser leurs flux de travail et à monter en compétence rapidement."
      : "PrimeSpace provides onboarding for commercial and enterprise users with a dedicated Customer Success Manager and worldwide technical support. Capture services, training resources, and documentation help teams standardize their workflows and ramp up quickly.",
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
  const { lang } = useI18n();
  const stats = getStats(lang);
  const useCases = getUseCases(lang);
  const leadMarketItems = getLeadMarketItems(lang);
  const features = getFeatures(lang);
  const faqs = getFaqs(lang);

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
              {lang === "fr" ? (
                <>Générez des revenus grâce aux{" "}<span className="text-[#2c0a71]/80">visites virtuelles</span>{" "}de vos biens commerciaux</>
              ) : (
                <>Generate revenue with{" "}<span className="text-[#2c0a71]/80">virtual tours</span>{" "}of your commercial properties</>
              )}
            </h2>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              {lang === "fr"
                ? "Mettez l'ensemble de votre portefeuille immobilier en ligne avec la plateforme de jumeaux numériques 3D. Optimisez la gestion, réduisez la vacance et transformez chaque aspect de votre activité."
                : "Put your entire real estate portfolio online with the 3D digital twin platform. Optimize management, reduce vacancy, and transform every aspect of your business."}
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
            title={lang === "fr" ? "Des avantages tout au long du cycle de vie du bâtiment." : "Benefits throughout the building lifecycle."}
            description={lang === "fr" ? "Découvrez comment les jumeaux numériques 3D révolutionnent le marketing, la gestion et la valorisation de vos actifs immobiliers." : "Discover how 3D digital twins are revolutionizing the marketing, management, and enhancement of your real estate assets."}
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
              {lang === "fr" ? "Prenez l'avantage sur le marché avec PrimeSpace." : "Take the lead in the market with PrimeSpace."}
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
                {lang === "fr" ? "Vers une plus grande durabilité." : "Toward greater sustainability."}
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                {lang === "fr"
                  ? "Réduisez les émissions grâce à l'accès à distance aux sites. Économisez du temps, de l'argent et réduisez les risques avec un impact direct et mesurable sur vos efforts ESG (environnement, social et gouvernance)."
                  : "Reduce emissions through remote site access. Save time, money, and reduce risk with a direct and measurable impact on your ESG (Environmental, Social, and Governance) efforts."}
              </p>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                asChild
              >
                <Link to="/contact">{lang === "fr" ? "En Savoir Plus" : "Learn More"}</Link>
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
              {lang === "fr" ? "Une suite de fonctionnalités puissantes." : "A powerful suite of features."}
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
                  {lang === "fr" ? "En Savoir Plus" : "Learn More"}
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
              {lang === "fr" ? "FAQ – Visites Virtuelles Immobilier Commercial" : "FAQ – Commercial Real Estate Virtual Tours"}
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
                {lang === "fr"
                  ? "\"La visite virtuelle 3D a réduit nos délais de location de 60%. Les prospects arrivent déjà convaincus après avoir exploré l'espace en ligne.\""
                  : "\"The 3D virtual tour reduced our leasing timelines by 60%. Prospects arrive already convinced after exploring the space online.\""}
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
                    {lang === "fr" ? "Directeur Immobilier, Groupe Commercial" : "Real Estate Director, Commercial Group"}
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
                {lang === "fr" ? "Prêt à transformer votre immobilier commercial?" : "Ready to transform your commercial real estate?"}
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                {lang === "fr"
                  ? "Rejoignez les professionnels qui utilisent déjà les visites virtuelles 3D pour commercialiser plus vite, gérer mieux et valoriser leur portefeuille."
                  : "Join the professionals already using 3D virtual tours to market faster, manage better, and enhance their portfolio."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    {lang === "fr" ? "Demander un Devis Gratuit" : "Request a Free Quote"}
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
    </Layout>
  );
};

export default CommercialRealEstate;
