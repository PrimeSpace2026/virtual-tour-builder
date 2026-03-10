import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2,
  TrendingUp,
  Eye,
  Clock,
  Ruler,
  Globe,
  BarChart3,
  Users,
  ArrowRight,
  Check,
  Play,
  ShieldCheck,
  Maximize,
  DollarSign,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
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
    icon: TrendingUp,
    title: "Accélérez la Commercialisation",
    description:
      "Réduisez les délais de vacance en offrant des visites virtuelles 3D immersives qui attirent des locataires qualifiés, même à distance.",
  },
  {
    icon: Eye,
    title: "Vitrines Numériques 24/7",
    description:
      "Vos propriétés sont accessibles en permanence. Les prospects visitent à tout moment, depuis n'importe où dans le monde, sans prise de rendez-vous.",
  },
  {
    icon: Ruler,
    title: "Plans & Mesures Précises",
    description:
      "Obtenez automatiquement des plans d'étage cotés et des mesures exactes pour la planification d'espaces et l'aménagement intérieur.",
  },
  {
    icon: Globe,
    title: "Portée Internationale",
    description:
      "Attirez des investisseurs et locataires internationaux grâce à un jumeau numérique partageable par simple lien.",
  },
  {
    icon: BarChart3,
    title: "Analyse & Données",
    description:
      "Suivez l'engagement des visiteurs, identifiez les espaces les plus consultés et optimisez votre stratégie de commercialisation.",
  },
  {
    icon: ShieldCheck,
    title: "Documentation & Conformité",
    description:
      "Documentez l'état de vos biens pour les audits, assurances et états des lieux avec une précision photographique.",
  },
];

const benefits = [
  "Réduction des délais de vacance locative",
  "Attraction de locataires qualifiés à distance",
  "Planification d'espaces et aménagement facilités",
  "Gestion de portefeuille centralisée",
  "Visites virtuelles pour due diligence",
  "Marketing digital différenciant",
  "Diminution des coûts de déplacement",
  "Reporting et suivi des actifs facilités",
];

const workflows = [
  {
    icon: Building2,
    title: "Commercialisation & Location",
    description:
      "Créez des annonces immersives qui convertissent. Les prospects visitent virtuellement vos bureaux, locaux et commerces avant tout déplacement.",
  },
  {
    icon: Maximize,
    title: "Space Planning & Aménagement",
    description:
      "Utilisez les plans et mesures 3D pour planifier l'agencement des espaces, proposer des configurations et visualiser les rénovations.",
  },
  {
    icon: DollarSign,
    title: "Gestion d'Actifs & Investissement",
    description:
      "Documentez votre portefeuille immobilier complet. Facilitez la due diligence, les évaluations et les décisions d'investissement.",
  },
  {
    icon: Users,
    title: "Expérience Locataire",
    description:
      "Offrez une expérience de visite premium à vos prospects. Renforcez la confiance et accélérez la prise de décision.",
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

      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Boost_Buyer_Engagement.gif"
            alt="Visite virtuelle immobilier commercial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/65 to-primary/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20 md:pt-24 pb-10 md:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20">
                <Building2 className="w-4 h-4 inline mr-2" />
                Immobilier Commercial
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-4 md:mb-6"
            >
              Générez des revenus grâce aux{" "}
              <span className="text-gradient-accent">visites virtuelles</span>{" "}
              de vos biens commerciaux
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto px-2 md:px-0"
            >
              Mettez l'ensemble de votre portefeuille immobilier en ligne avec
              la plateforme de jumeaux numériques 3D. Optimisez la gestion,
              réduisez la vacance et transformez chaque aspect de votre activité.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  Demander un Devis
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/portfolio" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Voir des Exemples
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
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
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Transformez votre immobilier commercial"
            description="Découvrez comment les visites virtuelles 3D révolutionnent la commercialisation, la gestion et la valorisation de vos actifs immobiliers."
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
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#2c0a71]/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#2c0a71]/20 transition-colors">
                  <useCase.icon className="w-6 h-6 md:w-7 md:h-7 text-[#2c0a71]" />
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

      {/* Interactive Showcase / Split Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 md:mb-6">
                Un jumeau numérique pour chaque{" "}
                <span className="text-[#2c0a71]">propriété commerciale</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                Bureaux, commerces, entrepôts, hôtels — chaque type d'espace
                bénéficie de la technologie de capture 3D pour créer un double
                numérique fidèle et interactif.
              </p>

              <div className="space-y-3 md:space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#2c0a71]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#2c0a71]" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 md:mt-10">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    Contactez-nous
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-border aspect-video md:aspect-[4/3]">
                <iframe
                  src="https://my.matterport.com/show/?m=t84zwhnXjvJ"
                  title="Visite virtuelle - Villa Irlande"
                  className="w-full h-full"
                  allow="fullscreen"
                  allowFullScreen
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 md:w-24 md:h-24 bg-[#2c0a71]/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-10 h-10 md:w-16 md:h-16 bg-[#2c0a71]/5 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflows Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Des flux de travail adaptés à chaque besoin"
            description="Que vous soyez propriétaire, gestionnaire ou investisseur, nos solutions s'intègrent dans vos processus métier."
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

      {/* Testimonial / Social Proof */}
      <section className="section-padding bg-muted/30">
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
      <section className="section-padding">
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
