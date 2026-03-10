import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Hotel,
  Users,
  ArrowRight,
  Star,
  Globe,
  CalendarCheck,
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
  { value: "14%", label: "d'augmentation des réservations" },
  { value: "3×", label: "plus d'engagement en ligne" },
  { value: "45%", label: "de demandes de visite en moins" },
  { value: "300%", label: "de temps passé sur l'annonce" },
];

const useCases = [
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/39CGLqxKt54yrA0lOGM8uR/7e74be3195ddc78e9b4e3b4a585635bc/Sales_W.svg",
    title: "Augmentez vos réservations directes",
    description:
      "Permettez aux voyageurs d'explorer chaque chambre, suite et espace commun en 3D avant de réserver. La transparence totale renforce la confiance et réduit les annulations.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/1lCEq0Y5l7yOjuTVjRqvnG/eeb4f6896c20c1057047ffb56dc19a7e/Digital_Twin_Communication_W.svg",
    title: "Valorisez vos espaces événementiels",
    description:
      "Présentez vos salles de conférence, salles de réception et espaces de banquet avec des visites virtuelles immersives qui accélèrent les décisions des organisateurs.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/1EApr1mcyjw6GdFNOmQhDw/afd7e87c22123975bb94e9b2f4128cdf/Building_Inspection_W.svg",
    title: "Optimisez la gestion des installations",
    description:
      "Documentez chaque étage, chambre et espace technique avec un jumeau numérique complet. Facilitez la maintenance, les rénovations et la coordination des équipes.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/1wLnWGbLDOO8zeAz3vuDib/e51e5fd05d8523a6ebfeb7ac7c254ad5/Online_Learning_W_1__1_.svg",
    title: "Formez vos équipes à distance",
    description:
      "Créez des parcours de formation virtuels pour le personnel : procédures de nettoyage, sécurité incendie, accueil client. Accessibles 24h/24 depuis n'importe quel appareil.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/73q8DLUj6RRyqRDiQCNvDG/baf2f8e465d7a49acf1781459d282e9f/Increase_Decrease_B.png",
    title: "Démarquez-vous de la concurrence",
    description:
      "Offrez une expérience de découverte unique que vos concurrents ne proposent pas. Les visites 3D sont un avantage concurrentiel majeur sur les plateformes de réservation.",
  },
  {
    image:
      "https://images.ctfassets.net/icnj41gkyohw/6JSq6gN7wAyqrPPlzM7eFJ/b95e5f34040057a3157f2e8c5803717c/Management_Permissions_B.png",
    title: "Gérez plusieurs établissements",
    description:
      "Centralisez la documentation de tous vos hôtels, resorts et résidences dans un seul tableau de bord. Suivez l'état de chaque propriété à distance.",
  },
];

const leadMarketItems = [
  {
    title: "Marketing & Réservations",
    description:
      "Intégrez des visites virtuelles 3D sur votre site web, Booking.com, Airbnb et les plateformes de voyage. Augmentez les taux de conversion grâce à une expérience immersive qui élimine l'incertitude des voyageurs.",
  },
  {
    title: "Événementiel & MICE",
    description:
      "Permettez aux organisateurs d'événements d'explorer vos espaces de conférence, salles de banquet et terrasses en 3D. Accélérez les demandes de devis et réduisez les visites de repérage coûteuses.",
  },
  {
    title: "Gestion des Opérations",
    description:
      "Utilisez les jumeaux numériques pour documenter l'état de vos installations, planifier les rénovations, coordonner les équipes de maintenance et gérer les inventaires de mobilier.",
  },
  {
    title: "Expérience Client",
    description:
      "Offrez aux clients un aperçu réaliste de leur séjour avant l'arrivée. Réduisez les réclamations, améliorez les avis en ligne et fidélisez votre clientèle grâce à la transparence totale.",
  },
];

const workflows = [
  {
    icon: Hotel,
    title: "Hôtels & Resorts",
    description:
      "Présentez chaque catégorie de chambre, les espaces communs, le spa, la piscine et les restaurants avec des visites virtuelles haute définition.",
  },
  {
    icon: Star,
    title: "Locations de Vacances",
    description:
      "Démarquez vos annonces Airbnb et Booking avec des visites 3D immersives qui génèrent plus de clics et de réservations.",
  },
  {
    icon: Globe,
    title: "Tourisme & Attractions",
    description:
      "Créez des aperçus virtuels de musées, sites historiques, parcs à thème et attractions touristiques pour attirer les visiteurs.",
  },
  {
    icon: CalendarCheck,
    title: "Centres de Conférence",
    description:
      "Montrez la capacité et la flexibilité de vos espaces événementiels. Facilitez la planification à distance pour les organisateurs internationaux.",
  },
];

const faqs = [
  {
    question:
      "Comment les visites virtuelles 3D augmentent-elles les réservations d'hôtel ?",
    answer:
      "Les études montrent que les établissements proposant des visites virtuelles 3D voient une augmentation moyenne de 14% des réservations directes. Les voyageurs passent 3 fois plus de temps sur les annonces avec visite virtuelle, ce qui renforce la confiance et réduit les annulations de dernière minute.",
  },
  {
    question:
      "Peut-on intégrer les visites virtuelles sur Booking.com, Airbnb et d'autres OTA ?",
    answer:
      "Oui, les visites virtuelles peuvent être partagées via des liens directs, intégrées sur votre site web et diffusées sur Google Street View. Pour les OTA comme Booking.com et Airbnb, vous pouvez ajouter le lien de la visite dans la description de l'annonce ou utiliser les intégrations disponibles.",
  },
  {
    question:
      "Combien de temps faut-il pour numériser un hôtel ou un resort complet ?",
    answer:
      "Le temps de capture dépend de la taille de l'établissement. En règle générale :\n\n• Chambre d'hôtel standard : 15-20 minutes\n• Suite : 20-30 minutes\n• Espaces communs (lobby, restaurant, spa) : 30-60 minutes par zone\n• Hôtel complet de 100 chambres : 2-3 jours\n\nNos techniciens certifiés peuvent capturer votre établissement sans perturber vos opérations.",
  },
  {
    question:
      "Les visites virtuelles sont-elles utiles pour les espaces événementiels et MICE ?",
    answer:
      "Absolument. Les organisateurs d'événements peuvent explorer vos salles de conférence, de banquet et vos terrasses à distance, visualiser les configurations possibles et prendre des décisions plus rapidement. Cela réduit considérablement les visites de repérage et accélère le cycle de vente.",
  },
  {
    question:
      "Peut-on ajouter des informations interactives dans la visite virtuelle ?",
    answer:
      "Oui, vous pouvez intégrer des tags Mattertag™ pour ajouter des informations contextuelles : descriptions des équipements, menus du restaurant, tarifs des soins spa, liens de réservation directe, vidéos et documents PDF.",
  },
  {
    question:
      "Comment les jumeaux numériques facilitent-ils la gestion des installations hôtelières ?",
    answer:
      "Les jumeaux numériques permettent aux équipes de maintenance d'accéder à une documentation visuelle complète de chaque espace, de mesurer les dimensions pour les rénovations, de coordonner les interventions à distance et de maintenir un historique visuel de l'état des installations.",
  },
  {
    question:
      "Quels sont les formats de livrables disponibles ?",
    answer:
      "Les livrables incluent :\n\n• Visite virtuelle 3D immersive (lien partageable et intégrable)\n• Plans d'étage schématiques 2D\n• Photos HDR haute résolution\n• Maison de poupée (vue 3D complète)\n• Mesures dimensionnelles précises\n• Exports pour Google Street View",
  },
  {
    question:
      "Quel est le retour sur investissement pour un hôtel ou un resort ?",
    answer:
      "Le ROI se manifeste à plusieurs niveaux : augmentation des réservations directes (14% en moyenne), réduction des annulations grâce à des attentes réalistes, gain de temps pour les équipes commerciales événementielles, et économies sur la maintenance grâce à la documentation numérique. La plupart des établissements constatent un retour sur investissement en moins de 3 mois.",
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

const TravelHospitality = () => {
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
              Boostez vos réservations avec les{" "}
              <span className="text-[#2c0a71]/80">visites virtuelles 3D</span>{" "}
              pour le tourisme & l'hôtellerie
            </h2>
            <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
              Offrez à vos futurs clients une expérience immersive de votre
              établissement avant même leur arrivée. Augmentez les réservations,
              réduisez les annulations et démarquez-vous de la concurrence.
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
          <iframe
            src="https://my.matterport.com/show/?m=BnbBxqkRFVk&log=0&help=0&nt=0&play=1&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=0&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
            title="Visite virtuelle - Hôtel exemple"
            className="w-full h-full"
            allow="fullscreen"
            allowFullScreen
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4 text-[#2c0a71]">
              Transformez l'expérience voyageur à chaque étape
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              De la découverte à la réservation, les visites virtuelles 3D
              révolutionnent le marketing et les opérations de votre
              établissement.
            </p>
          </motion.div>

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
              Démarquez votre établissement avec PrimeSpace.
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
                src="https://my.matterport.com/show/?m=BnbBxqkRFVk&log=0&help=0&nt=0&play=1&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=0&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1"
                title="Visite virtuelle - Tourisme & Hôtellerie"
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
                Un tourisme plus responsable.
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg">
                Réduisez l'empreinte carbone de votre établissement en limitant
                les visites de repérage inutiles. Les visites virtuelles
                permettent aux voyageurs et organisateurs de découvrir vos
                espaces sans se déplacer, contribuant à un tourisme plus durable.
              </p>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
                asChild
              >
                <Link to="/contact">En savoir plus</Link>
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
                alt="Chaque jumeau numérique évite en moyenne 0,15 tonne de CO2e"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflows Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Des solutions pour chaque type d'établissement"
            description="Hôtels, resorts, locations de vacances, attractions touristiques — nos visites virtuelles s'adaptent à tous les formats."
          />

          <div className="grid md:grid-cols-2 gap-5 md:gap-8 mt-10 md:mt-16">
            {workflows.map((workflow, i) => (
              <motion.div
                key={workflow.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 md:gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#2c0a71]/10 flex items-center justify-center flex-shrink-0">
                  <workflow.icon className="w-6 h-6 md:w-7 md:h-7 text-[#2c0a71]" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {workflow.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {workflow.description}
                  </p>
                </div>
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
              FAQ — Visites Virtuelles Tourisme & Hôtellerie
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

      {/* Testimonial */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="text-xl md:text-3xl font-display font-medium text-foreground leading-relaxed mb-6 md:mb-8">
                "Depuis que nous proposons des visites virtuelles 3D, nos
                réservations directes ont augmenté de 20% et les réclamations
                liées aux attentes non satisfaites ont quasiment disparu."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2c0a71]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#2c0a71]" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">
                    Nadia El Fassi
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Directrice Marketing, Hôtel & Resort
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
                Prêt à transformer l'expérience de vos clients ?
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 md:mb-10">
                Rejoignez les établissements qui utilisent déjà les visites
                virtuelles 3D pour augmenter leurs réservations et offrir une
                expérience client exceptionnelle.
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

export default TravelHospitality;
