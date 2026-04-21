import { useState, useEffect } from "react";
import { useI18n } from "@/i18n";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Send, ArrowRight, Phone, Mail, Clock, Calendar, MessageSquare, Check, Star, Quote } from "lucide-react";
import { InlineWidget } from "react-calendly";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useToast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const officeIcon = L.divIcon({
  className: "custom-office-marker",
  html: `
    <div style="position:relative;width:44px;height:56px;">
      <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#6d28d9);display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 4px 12px rgba(124,58,237,0.5);">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
    </div>
  `,
  iconSize: [44, 56],
  iconAnchor: [22, 52],
  popupAnchor: [0, -48],
});

const hqIcon = L.divIcon({
  className: "custom-office-marker",
  html: `
    <div style="position:relative;width:52px;height:64px;">
      <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#fbbf24,#d97706);display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 6px 16px rgba(217,119,6,0.55);">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </div>
      <div style="position:absolute;top:-6px;right:-6px;background:#d97706;color:#fff;font-size:9px;font-weight:700;letter-spacing:0.5px;padding:2px 5px;border-radius:6px;border:2px solid #fff;">HQ</div>
    </div>
  `,
  iconSize: [52, 64],
  iconAnchor: [26, 60],
  popupAnchor: [0, -56],
});

const OFFICES = [
  { key: "tunis", lat: 36.8065, lng: 10.1815, cityFr: "Tunis, Tunisie", cityEn: "Tunis, Tunisia", tz: "Africa/Tunis", flag: "🇹🇳", hq: false },
  { key: "dublin", lat: 53.3498, lng: -6.2603, cityFr: "Dublin, Irlande", cityEn: "Dublin, Ireland", tz: "Europe/Dublin", flag: "🇮🇪", hq: true },
];

const CALENDLY_URL = "https://calendly.com/oussama-primespace/meeting";
// Swap the URL above when the real Calendly event is ready. Leave as an
// empty string to fall back to the "Coming soon" card with WhatsApp CTA.

const TESTIMONIALS = [
  { name: "Sarah M.", role: { fr: "Gérante, Hôtel Boutique", en: "Manager, Boutique Hotel" }, quote: { fr: "L'équipe PrimeSpace a transformé notre présentation en ligne. Résultat bluffant.", en: "The PrimeSpace team transformed our online presence. Stunning result." }, rating: 5 },
  { name: "Ahmed K.", role: { fr: "Agent immobilier", en: "Real Estate Agent" }, quote: { fr: "Mes clients peuvent visiter sans se déplacer. Ventes accélérées.", en: "My clients can visit without moving. Faster sales." }, rating: 5 },
  { name: "Claire D.", role: { fr: "Directrice Marketing, Retail", en: "Marketing Director, Retail" }, quote: { fr: "Professionnels, réactifs, et le rendu est incroyable.", en: "Professional, responsive, and the output is incredible." }, rating: 5 },
];

function useOfficeClock(tz: string) {
  const [now, setNow] = useState<string>(() => new Date().toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" }));
  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date().toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" }));
    }, 30000);
    return () => clearInterval(id);
  }, [tz]);
  return now;
}

function isOfficeOpen(tz: string): boolean {
  const hour = parseInt(new Date().toLocaleString("en-GB", { timeZone: tz, hour: "2-digit", hour12: false }), 10);
  const day = new Date().toLocaleString("en-GB", { timeZone: tz, weekday: "short" });
  const isSunday = day === "Sun";
  return !isSunday && hour >= 8 && hour < 18;
}

type Office = typeof OFFICES[number];

const CalendlyWidget = ({ url }: { url: string }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1400);
    return () => clearTimeout(t);
  }, [url]);
  return (
    <div className="relative" style={{ minWidth: "320px", height: "700px" }}>
      {!loaded && (
        <div className="absolute inset-0 z-10 overflow-hidden rounded-xl bg-muted/40">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/60 via-muted/30 to-muted/60" />
          <div
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ animation: "calendly-shimmer 1.6s ease-in-out infinite" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Calendar className="w-10 h-10 text-secondary animate-pulse" />
            <div className="text-sm text-muted-foreground">Loading calendar…</div>
          </div>
          <style>{`@keyframes calendly-shimmer{0%{transform:translateX(0)}100%{transform:translateX(400%)}}`}</style>
        </div>
      )}
      <InlineWidget
        url={url}
        styles={{ height: "700px", minWidth: "320px" }}
        pageSettings={{
          backgroundColor: "ffffff",
          primaryColor: "7c3aed",
          textColor: "1f1f1f",
          hideEventTypeDetails: false,
          hideGdprBanner: true,
          hideLandingPageDetails: false,
        }}
      />
    </div>
  );
};

const OfficeCard = ({ office, lang }: { office: Office; lang: "fr" | "en" }) => {
  const time = useOfficeClock(office.tz);
  const open = isOfficeOpen(office.tz);
  return (
    <div className={`flex flex-col gap-2 p-3 rounded-xl border ${office.hq ? "bg-amber-500/5 border-amber-500/40" : "bg-muted/50 border-border"}`}>
      <div className="flex items-center gap-2">
        <span className="text-xl leading-none">{office.flag}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-medium text-foreground text-sm truncate">
              {lang === "fr" ? office.cityFr : office.cityEn}
            </h3>
            {office.hq && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500 text-white tracking-wider">HQ</span>
            )}
          </div>
          <p className="text-muted-foreground text-xs font-mono">{time}</p>
        </div>
      </div>
      <div className={`inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-full text-[10px] font-semibold ${
        open
          ? "bg-green-500/10 text-green-600 dark:text-green-400"
          : "bg-orange-500/10 text-orange-600 dark:text-orange-400"
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-green-500 animate-pulse" : "bg-orange-500"}`} />
        {open ? (lang === "fr" ? "Ouvert" : "Open") : (lang === "fr" ? "Fermé" : "Closed")}
      </div>
    </div>
  );
};

const Contact = () => {
  const { lang, t } = useI18n();
  const T = (obj: { fr: string; en: string }) => obj[lang];
  const { toast } = useToast();
  const [tab, setTab] = useState<"message" | "book">("message");

  const projectTypes = lang === "fr"
    ? ["Immobilier résidentiel", "Immobilier commercial", "Hôtellerie & Tourisme", "Commerce & Retail", "Culture & Musées", "Entreprise & Bureaux", "Restaurant & Événementiel", "Autre"]
    : ["Residential Real Estate", "Commercial Real Estate", "Hospitality & Tourism", "Commerce & Retail", "Culture & Museums", "Business & Offices", "Restaurant & Events", "Other"];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        toast({
          title: T(t.contact.success),
          description: lang === "fr" ? "Nous vous répondrons dans les plus brefs délais." : "We will get back to you as soon as possible.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
        });
      } else {
        toast({
          title: lang === "fr" ? "Erreur" : "Error",
          description: data.error || T(t.contact.error),
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: lang === "fr" ? "Erreur" : "Error",
        description: T(t.contact.error),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <WhatsAppButton />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20"
            >
              {T(t.contact.title)}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-4 md:mb-6"
            >
              {lang === "fr" ? "Parlons de Votre Projet" : "Let's Talk About Your Project"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-primary-foreground/70"
            >
              {lang === "fr"
                ? "Demandez un devis gratuit ou posez-nous vos questions. Notre équipe vous répond sous 24 heures."
                : "Request a free quote or ask us your questions. Our team responds within 24 hours."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            {/* Offices Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                {lang === "fr" ? "Nos Bureaux" : "Our Offices"}
              </h2>
              <div className="relative rounded-2xl overflow-hidden shadow-soft h-[400px] md:h-[520px] border border-border">
                <MapContainer
                  center={[45, 2]}
                  zoom={3}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  />
                  {OFFICES.map((o) => (
                    <Marker key={o.key} position={[o.lat, o.lng]} icon={o.hq ? hqIcon : officeIcon}>
                      <Popup>
                        <div className="text-center">
                          <strong className="text-base">PrimeSpace</strong>
                          {o.hq && (
                            <div style={{ display: "inline-block", marginLeft: 6, padding: "1px 6px", background: "#d97706", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 4, letterSpacing: 0.5 }}>HQ</div>
                          )}
                          <br />
                          <span className="text-sm">{lang === "fr" ? o.cityFr : o.cityEn}</span>
                          {o.hq && (
                            <div className="text-xs mt-1 opacity-70">{lang === "fr" ? "Siège social" : "Headquarters"}</div>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {OFFICES.map((o) => (
                  <OfficeCard key={o.key} office={o} lang={lang} />
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-2xl p-5 md:p-8 shadow-soft">
                <h2 className="font-display font-bold text-2xl text-foreground mb-3">
                  {lang === "fr" ? "Demande de Consultation Gratuite" : "Free Consultation Request"}
                </h2>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { fr: "30 min", en: "30 min" },
                    { fr: "100% Gratuit", en: "100% Free" },
                    { fr: "Sans engagement", en: "No commitment" },
                    { fr: "Réponse sous 24h", en: "Reply within 24h" },
                  ].map((b) => (
                    <span key={b.en} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                      <Check className="w-3 h-3" />
                      {lang === "fr" ? b.fr : b.en}
                    </span>
                  ))}
                </div>

                {/* Tab switcher */}
                <div className="inline-flex p-1 rounded-xl bg-muted mb-6">
                  <button
                    type="button"
                    onClick={() => setTab("message")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      tab === "message"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    {lang === "fr" ? "Envoyer un message" : "Send a Message"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("book")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      tab === "book"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    {lang === "fr" ? "Réserver un appel" : "Book a Call"}
                  </button>
                </div>

                {tab === "message" ? (
                <>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{T(t.contact.name)} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={lang === "fr" ? "Votre nom" : "Your name"}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{T(t.contact.email)} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={lang === "fr" ? "votre@email.com" : "your@email.com"}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{T(t.contact.phone)}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+216 XX XXX XXX"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectType">{lang === "fr" ? "Type de Projet" : "Project Type"} *</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, projectType: value })
                        }
                        required
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={lang === "fr" ? "Sélectionnez un type" : "Select a type"} />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{lang === "fr" ? "Décrivez votre projet" : "Describe your project"} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={lang === "fr" ? "Décrivez votre espace, sa superficie approximative, et vos besoins spécifiques..." : "Describe your space, its approximate area, and your specific needs..."}
                      required
                      className="min-h-[150px] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        {T(t.contact.sending)}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {lang === "fr" ? "Envoyer Ma Demande" : "Send My Request"}
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-sm text-muted-foreground mt-6 text-center">
                  {lang === "fr" ? "En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe." : "By submitting this form, you agree to be contacted by our team."}
                </p>
                </>
                ) : CALENDLY_URL ? (
                <div className="rounded-xl overflow-hidden border border-border bg-background">
                  <CalendlyWidget url={CALENDLY_URL} />
                  <p className="text-xs text-muted-foreground text-center px-4 py-3 border-t border-border">
                    {lang === "fr"
                      ? "Choisissez un créneau qui vous convient. Nous vous enverrons un lien de visioconférence."
                      : "Pick a slot that works for you. We'll send you a video call link."}
                  </p>
                </div>
                ) : (
                <div className="rounded-xl border border-border bg-muted/40 p-8 md:p-12 text-center">
                  <Calendar className="w-12 h-12 mx-auto text-secondary mb-4" />
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {lang === "fr" ? "Réservation d'appel bientôt disponible" : "Call booking coming soon"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                    {lang === "fr"
                      ? "En attendant, envoyez-nous un message ou contactez-nous directement sur WhatsApp."
                      : "In the meantime, send us a message or reach us directly on WhatsApp."}
                  </p>
                  <Button variant="secondary" asChild>
                    <a
                      href="https://wa.me/00353894985067"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      {lang === "fr" ? "Ouvrir WhatsApp" : "Open WhatsApp"}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Strip */}
      <section className="py-10 md:py-14 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Phone, title: lang === "fr" ? "Téléphone" : "Phone", value: "+216 52 664 495", link: "tel:+21652664495" },
              { icon: Mail, title: "Email", value: "info@primespace.studio", link: "mailto:info@primespace.studio" },
              { icon: MapPin, title: lang === "fr" ? "Adresses" : "Addresses", value: lang === "fr" ? "Tunis, Tunisie · Dublin, Irlande" : "Tunis, Tunisia · Dublin, Ireland", link: null as string | null },
              { icon: Clock, title: lang === "fr" ? "Horaires" : "Hours", value: lang === "fr" ? "Lun-Sam: 8h-18h" : "Mon-Sat: 8am-6pm", link: null as string | null },
            ].map((info) => (
              <div key={info.title} className="flex items-start gap-3 md:gap-4 p-4 rounded-2xl bg-background border border-border shadow-sm">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-foreground text-sm md:text-base">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-muted-foreground hover:text-secondary transition-colors text-xs md:text-sm break-words">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-xs md:text-sm break-words">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
              {lang === "fr" ? "Ce que disent nos clients" : "What our clients say"}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              {lang === "fr" ? "Après leur consultation gratuite avec notre équipe" : "After their free consultation with our team"}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((tst, i) => (
              <motion.div
                key={tst.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl bg-card border border-border shadow-soft"
              >
                <Quote className="absolute top-4 right-4 w-7 h-7 text-secondary/20" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: tst.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/90 text-sm leading-relaxed mb-4">
                  "{lang === "fr" ? tst.quote.fr : tst.quote.en}"
                </p>
                <div className="pt-3 border-t border-border">
                  <p className="font-medium text-foreground text-sm">{tst.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {lang === "fr" ? tst.role.fr : tst.role.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-hero rounded-2xl md:rounded-3xl p-6 md:p-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-3xl font-display font-bold text-primary-foreground mb-3 md:mb-4"
            >
              {lang === "fr" ? "Des Questions Fréquentes?" : "Frequently Asked Questions?"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-primary-foreground/70 mb-6"
            >
              {lang === "fr" ? "Consultez notre FAQ pour trouver rapidement des réponses à vos questions" : "Check our FAQ to quickly find answers to your questions"}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="hero" asChild>
                <Link to="/#faq" className="flex items-center gap-2">
                  {lang === "fr" ? "Voir la FAQ" : "View FAQ"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
