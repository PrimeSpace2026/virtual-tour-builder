import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    services: [
      { label: t("Visites Virtuelles 360°", "360° Virtual Tours"), href: "/services" },
      { label: t("Plans 2D/3D", "2D/3D Floor Plans"), href: "/services" },
      { label: t("Photographie HDR", "HDR Photography"), href: "/services" },
      { label: t("Vidéos Immersives", "Immersive Videos"), href: "/services" },
    ],
    company: [
      { label: t("À Propos", "About"), href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact", href: "/contact" },
    ],
    industries: [
      { label: t("Immobilier", "Real Estate"), href: "/portfolio" },
      { label: t("Hôtellerie", "Hospitality"), href: "/portfolio" },
      { label: t("Commerce", "Retail"), href: "/portfolio" },
      { label: "Culture", href: "/portfolio" },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center">
                <span className="text-secondary-foreground font-display font-bold text-lg">PS</span>
              </div>
              <span className="font-display font-bold text-xl">PrimeSpace</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              {t(
                "Transformez vos espaces en expériences immersives. Visites virtuelles 3D professionnelles en Tunisie.",
                "Transform your spaces into immersive experiences. Professional 3D virtual tours in Tunisia."
              )}
            </p>
            <div className="space-y-3">
              <a href="tel:+353894985067" className="flex items-center gap-3 text-primary-foreground/70 hover:text-secondary transition-colors">
                <Phone className="w-5 h-5" />
                +353 89 49 85 067
              </a>
              <a href="mailto:info@primespace.studio" className="flex items-center gap-3 text-primary-foreground/70 hover:text-secondary transition-colors">
                <Mail className="w-5 h-5" />
                info@primespace.studio
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="w-5 h-5" />
                Tunis, Tunisie
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{t("Entreprise", "Company")}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{t("Secteurs", "Industries")}</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Visite3D. {t("Tous droits réservés.", "All rights reserved.")}
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
