import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { useI18n } from "@/i18n";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61587746914175", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/_primespacestudio_", label: "Instagram" },
  { icon: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17V11.7a4.83 4.83 0 01-3.77-1.24V6.69z"/></svg>, href: "https://www.tiktok.com/@primespacestudio3d", label: "TikTok" },
];

export const Footer = () => {
  const { lang, t } = useI18n();
  const T = (obj: { fr: string; en: string }) => obj[lang];

  const footerLinks = {
    services: [
      { label: T(t.footer.virtualTours), href: "/services" },
      { label: T(t.footer.plans2d3d), href: "/services" },
      { label: T(t.footer.hdrPhoto), href: "/services" },
      { label: T(t.footer.immersiveVideos), href: "/services" },
    ],
    company: [
      { label: T(t.footer.aboutLink), href: "/about" },
      { label: T(t.footer.portfolioLink), href: "/portfolio" },
      { label: T(t.footer.contactLink), href: "/contact" },
    ],
    industries: [
      { label: T(t.footer.realEstate), href: "/portfolio" },
      { label: T(t.footer.hospitality), href: "/portfolio" },
      { label: T(t.footer.commerce), href: "/portfolio" },
      { label: T(t.footer.culture), href: "/portfolio" },
    ],
  };
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src="/logo.jpg" alt="PrimeSpace" className="w-10 h-10 rounded-xl object-contain" />
              <span className="font-display font-bold text-xl">PrimeSpace</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              {T(t.footer.brand)}
            </p>
            <div className="space-y-3">
              <a href="tel:+21652664495" className="flex items-center gap-3 text-primary-foreground/70 hover:text-secondary transition-colors">
                <Phone className="w-5 h-5" />
                +216 52 664 495
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

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{T(t.footer.services)}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{T(t.footer.company)}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{T(t.footer.sectors)}</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Visite3D. {lang === "fr" ? "Tous droits réservés." : "All rights reserved."}
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
