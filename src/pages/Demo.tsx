import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import {
  Star, MapPin, ChevronDown, ChevronLeft, ChevronRight, Eye,
  Phone, Share2, Heart, X, Check, ShieldCheck, Utensils, Droplets, SprayCan
} from "lucide-react";
import { getTours, getTourById, getTourItems, getTourServices, getTourChambers } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { tourPath } from "@/lib/slug";

/* ─── Tunisie Booking exact color palette ─── */
const C = {
  pink: "#f40091",
  pinkHover: "#FF0097",
  green: "#85b919",
  dark: "#262626",
  text: "#4e4f53",
  gray: "#6B6B6B",
  lightGray: "#F3F5F7",
  border: "#DDDDDD",
  white: "#FFFFFF",
};

/* ─── El Mouradi Gammarth hotel images ─── */
const HOTEL_IMAGES = [
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_4.jpg",
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_5.jpg",
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_6.jpg",
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_8.jpg",
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_9.jpg",
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_11.jpg",
  "https://image.resabooking.com/images/image_panoramique/el_mouradi_gammarth_3.jpg",
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_13.jpg",
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_14.jpg",
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_15.jpg",
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_16.jpg",
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_17.jpg",
  "https://image.resabooking.com/images/hotel/el_mouradi_gammarth_18.jpg",
];

const SIMILAR_HOTELS = [
  {
    name: "Carthage Thalasso",
    image: "https://image.resabooking.com/images/image_panoramique/Carthage_Thalasso_2.jpg",
    location: "Gammarth",
    rating: 3.5,
    stars: 5,
    desc: "Hôtel de prestige en bord de mer, alliant confort, gastronomie raffinée et loisirs pour tous.",
  },
  {
    name: "Regency Tunis Hotel",
    image: "https://image.resabooking.com/images/image_panoramique/regency_tunis_hotel_2.jpg",
    location: "Gammarth",
    rating: 4.0,
    stars: 5,
    desc: "Hôtel luxueux avec vue imprenable sur la Méditerranée et service d'exception.",
  },
];

interface Tour { id: number; name: string; description: string; category: string; imageUrl: string; surface: number; tourUrl: string; latitude?: number; longitude?: number; location?: string; metadataJson?: string; }
interface Chamber { id: number; tourId: number; name: string; description: string; imageUrl: string; price: number | null; currency: string; }
interface TourItem { id: number; name: string; description: string; imageUrl: string; price: number | null; currency: string; }

const HOTEL = {
  name: "El Mouradi Gammarth",
  stars: 5,
  address: "BP 597 Les cités de Carthage Gammarth, La Marsa, Gammarth",
  rating: 3.5,
  ratingText: "Bien",
  tags: ["Pieds dans l'eau", "Front de mer"],
  description: `La chaîne El Mouradi est renommée pour ses établissements hôteliers de luxe à travers toute la Tunisie.\n\nEL Mouradi Gammarth bénéficie d'un cadre magique, profitez d'un calme loin du stress du quotidien. Niché entre mer et colline, cet hôtel 5 étoiles offre une vue imprenable sur le golfe de Tunis.\n\nL'établissement dispose de chambres spacieuses et élégantes, de restaurants gastronomiques, d'une piscine extérieure face à la mer, d'un spa et centre de thalassothérapie, ainsi que de nombreuses activités de loisirs.`,
};

const EQUIPMENTS: Record<string, string[]> = {
  "Emplacement": ["Pieds dans l'eau", "Front de mer"],
  "Chambres": ["Chauffage", "Climatisation", "Coffre fort dans la chambre", "Salle de bains avec baignoire", "Salle de bains avec douche", "Mini bar", "Salle de bains Privative"],
  "Internet": ["WIFI Gratuit dans les locaux communs"],
  "Restauration": ["Restaurant", "Bar", "Petit-déjeuner buffet"],
  "Piscines": ["Piscine extérieure", "Piscine intérieure"],
  "Parking": ["Parking gratuit"],
  "Activités et Animations": ["Salle de sport", "Spa & Thalasso", "Animation en soirée", "Tennis", "Plage privée"],
};

const REVIEWS = [
  { name: "saidi f", title: "Pas mal", rating: 3, comment: "", date: "février 2026" },
  { name: "Marouane A", title: "Un séjour", rating: 2.5, comment: "Accueil aimable, la piscine et la mer sont très agréables, la réception est innovée par contre les chambres sont à l'ancienne, vue de la chambre est belle par contre pas de thé ni café dans la chambre, le mini bar est vide et pas de bouteilles d'eau", date: "août 2025" },
  { name: "boumediene t", title: "Séjour à l'hôtel", rating: 4.5, comment: "Un très bon séjour", date: "décembre 2024" },
  { name: "MECHRI I", title: "Satisfait", rating: 3.5, comment: "Le séjour à El Mouradi Gammarth s'est très bien passé.", date: "septembre 2024" },
  { name: "mhibik i", title: "Personnel", rating: 1.5, comment: "Personnel accueillant", date: "octobre 2023" },
  { name: "Zribi B", title: "Je suis choqué de l'hotel", rating: 1.5, comment: "Niveau de personnel acceptable. Niveau de nourriture mauvais. Niveau de service trop faible.", date: "août 2023" },
];

const FAQ_ITEMS = [
  { q: "Quels sont les équipements de cet établissement ?", a: "L'hôtel El Mouradi Gammarth propose : climatisation, Wi-Fi gratuit, piscine extérieure et intérieure, salle de sport, spa et thalassothérapie, restaurant, bar, parking gratuit, coffre-fort en chambre, et accès direct à la plage." },
  { q: "Quelles sont les activités proposées par l'hôtel ?", a: "L'hôtel propose des activités telles que : tennis, sports nautiques, salle de fitness, animations en soirée, spa et centre de thalassothérapie, ainsi qu'un accès à la plage privée." },
  { q: "Quel est le tarif moyen d'une nuitée à cet établissement ?", a: "Le tarif moyen varie selon la saison et le type de chambre. Consultez notre moteur de recherche pour obtenir les meilleurs prix disponibles." },
  { q: "Quel type de chambre propose cet établissement ?", a: "L'hôtel propose des chambres standard, supérieures, des suites junior et des suites avec vue sur mer, toutes équipées de climatisation et salle de bains privative." },
  { q: "Quelles sont les lieux d'attractions appréciés proche de l'hôtel ?", a: "À proximité : les ruines de Carthage, le musée du Bardo, le village de Sidi Bou Saïd, la Marsa et le centre-ville de Tunis." },
  { q: "Y-a-t-il un centre de thalasso et spa à l'hôtel ?", a: "Oui, l'hôtel dispose d'un centre de thalassothérapie et spa complet avec piscine d'eau de mer, hammam, sauna et soins du corps." },
  { q: "Quels sont les restaurants proches de l'hôtel El Mouradi ?", a: "Plusieurs restaurants se trouvent à proximité dans la zone de Gammarth et La Marsa, offrant une variété de cuisines tunisienne, méditerranéenne et internationale." },
  { q: "Y a-t-il des sites historiques à visiter proche de l'hôtel Gammarth ?", a: "Oui, les sites de Carthage classés au patrimoine mondial de l'UNESCO sont à quelques minutes, ainsi que le village pittoresque de Sidi Bou Saïd." },
  { q: "L'hôtel propose-t-il une navette d'aéroport ?", a: "Oui, un service de navette peut être organisé sur demande depuis l'aéroport Tunis-Carthage, situé à environ 20 minutes de route." },
  { q: "Quels sont les horaires d'arrivée et de départ à l'établissement ?", a: "L'arrivée (check-in) se fait à partir de 14h00 et le départ (check-out) avant 12h00." },
];

const StarIcons = ({ count }: { count: number }) => (
  <span className="inline-flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
    ))}
  </span>
);

const RatingBadge = ({ rating, text }: { rating: number; text: string }) => (
  <span className="inline-flex items-center gap-1.5 text-sm">
    <span className="font-bold" style={{ color: C.dark }}>{rating}/5</span>
    <span style={{ color: C.green }} className="font-semibold">{text}</span>
  </span>
);

const RatingBar = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.25;
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className="w-5 h-5 rounded-sm flex items-center justify-center text-white text-[10px] font-bold"
          style={{ backgroundColor: i <= full ? C.green : (i === full + 1 && half) ? "#b8d96f" : "#ddd" }}
        >
          ★
        </span>
      ))}
    </span>
  );
};

export default function Demo() {
  const navigate = useNavigate();
  const [tour, setTour] = useState<Tour | null>(null);
  const [chambers, setChambers] = useState<Chamber[]>([]);
  const [items, setItems] = useState<TourItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("photos");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [showAllDesc, setShowAllDesc] = useState(false);
  const [showAllEquip, setShowAllEquip] = useState(false);
  const [galleryStart, setGalleryStart] = useState(0);

  const today = new Date();
  const checkout = new Date(today); checkout.setDate(today.getDate() + 2);
  const formatDate = (d: Date) => `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

  useEffect(() => {
    async function load() {
      try {
        const tours = await getTours();
        // Pick "The Samuel Hotel" (id 31), fallback to first hotel tour, fallback to first tour
        const target = tours.find((t: Tour) => t.id === 31)
          || tours.find((t: Tour) => t.category?.toLowerCase().includes("hotel") || t.category?.toLowerCase().includes("hôtellerie"))
          || tours[0];
        if (target) {
          const [full, ch, it] = await Promise.all([
            getTourById(target.id),
            getTourChambers(target.id),
            getTourItems(target.id),
          ]);
          setTour(full);
          setChambers(ch);
          setItems(it);
        }
      } catch (e) {
        console.error("Failed to load", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const openLightbox = (idx: number) => { setLightboxIdx(idx); setLightboxImg(HOTEL_IMAGES[idx]); };
  const prevImg = () => { const i = (lightboxIdx - 1 + HOTEL_IMAGES.length) % HOTEL_IMAGES.length; setLightboxIdx(i); setLightboxImg(HOTEL_IMAGES[i]); };
  const nextImg = () => { const i = (lightboxIdx + 1) % HOTEL_IMAGES.length; setLightboxIdx(i); setLightboxImg(HOTEL_IMAGES[i]); };

  const tabs = [
    { id: "photos", label: "Photos" },
    { id: "presentation", label: "Présentation" },
    { id: "equipements", label: "Équipements" },
    { id: "avis", label: "Avis" },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: C.lightGray }}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: C.pink }} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center" onClick={() => setLightboxImg(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLightboxImg(null); }} className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 z-10"><X className="w-7 h-7" /></button>
          <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/20"><ChevronLeft className="w-8 h-8" /></button>
          <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/20"><ChevronRight className="w-8 h-8" /></button>
          <img src={lightboxImg} alt="" className="max-w-[90vw] max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
          <div className="absolute bottom-4 text-white/70 text-sm">{lightboxIdx + 1} / {HOTEL_IMAGES.length}</div>
        </div>
      )}

      {/* Breadcrumb */}
      <div style={{ backgroundColor: C.lightGray }} className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-2 text-xs flex items-center gap-1" style={{ color: C.gray }}>
          <a href="/" className="hover:underline" style={{ color: C.pink }}>Accueil</a>
          <span>›</span>
          <a href="/portfolio" className="hover:underline" style={{ color: C.pink }}>Hotels Gammarth</a>
          <span>›</span>
          <span style={{ color: C.dark }}>Hôtel El Mouradi Gammarth</span>
        </div>
      </div>

      {/* Hotel Header */}
      <div style={{ backgroundColor: C.white }} className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold" style={{ color: C.dark }}>{HOTEL.name}</h1>
                <StarIcons count={HOTEL.stars} />
              </div>
              <div className="flex items-center gap-3 text-sm flex-wrap">
                <RatingBadge rating={HOTEL.rating} text={HOTEL.ratingText} />
                <span className="flex items-center gap-1" style={{ color: C.gray }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: C.pink }} />
                  {HOTEL.address}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                {HOTEL.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: C.border, color: C.text }}>
                    <Check className="w-3 h-3" style={{ color: C.green }} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-30 border-b shadow-sm" style={{ backgroundColor: C.white }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                document.getElementById(`tb-${tab.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="px-5 py-3 text-sm font-medium transition-colors"
              style={{
                color: activeTab === tab.id ? C.pink : C.text,
                borderBottom: activeTab === tab.id ? `3px solid ${C.pink}` : "3px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ backgroundColor: C.lightGray }} className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Photo Gallery */}
            <section id="tb-photos" className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: C.white }}>
              <div className="p-4 border-b" style={{ borderColor: C.border }}>
                <h2 className="text-base font-bold" style={{ color: C.dark }}>Photos hotel Gammarth El Mouradi</h2>
              </div>
              <div className="relative">
                <div className="aspect-[16/9] cursor-pointer overflow-hidden" onClick={() => openLightbox(galleryStart)}>
                  <img
                    src={HOTEL_IMAGES[galleryStart]}
                    alt="El Mouradi Gammarth"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <button
                  onClick={() => setGalleryStart((galleryStart - 1 + HOTEL_IMAGES.length) % HOTEL_IMAGES.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: "rgba(38,38,38,0.34)" }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setGalleryStart((galleryStart + 1) % HOTEL_IMAGES.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: "rgba(38,38,38,0.34)" }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-1 p-2 overflow-x-auto">
                {HOTEL_IMAGES.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setGalleryStart(i)}
                    className="shrink-0 w-20 h-14 rounded cursor-pointer overflow-hidden border-2 transition"
                    style={{ borderColor: galleryStart === i ? C.pink : "transparent" }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </section>

            {/* 3D Virtual Tour — PrimeSpace */}
            {tour && (
              <section className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: C.white }}>
                <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
                  <h2 className="text-base font-bold" style={{ color: C.dark }}>
                    🏠 Visite Virtuelle 3D — <span style={{ color: C.pink }}>PrimeSpace</span>
                  </h2>
                  <span className="text-xs px-2 py-1 rounded-full font-semibold text-white" style={{ backgroundColor: C.green }}>NOUVEAU</span>
                </div>
                <div className="relative aspect-video">
                  <iframe
                    src={tourPath(tour)}
                    title="Visite 3D PrimeSpace"
                    className="w-full h-full"
                    allowFullScreen
                    allow="xr-spatial-tracking"
                  />
                </div>
                <div className="p-3 flex items-center justify-between" style={{ backgroundColor: C.lightGray }}>
                  <p className="text-xs" style={{ color: C.gray }}>Naviguez librement dans l'espace 3D • Cliquez et déplacez-vous</p>
                  <a
                    href={tourPath(tour)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold px-4 py-1.5 rounded text-white transition hover:opacity-90 inline-block"
                    style={{ backgroundColor: C.pink }}
                  >
                    Plein écran
                  </a>
                </div>
              </section>
            )}

            {/* Présentation */}
            <section id="tb-presentation" className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: C.white }}>
              <div className="p-4 border-b" style={{ borderColor: C.border }}>
                <h2 className="text-base font-bold" style={{ color: C.dark }}>Présentation</h2>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold mb-2" style={{ color: C.dark }}>Infos pratiques :</h3>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: C.text }}>
                  {showAllDesc ? HOTEL.description : HOTEL.description.slice(0, 200) + "..."}
                </p>
                <button
                  onClick={() => setShowAllDesc(!showAllDesc)}
                  className="mt-2 text-sm font-semibold flex items-center gap-1"
                  style={{ color: C.pink }}
                >
                  {showAllDesc ? "Réduire" : "Afficher plus"}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAllDesc ? "rotate-180" : ""}`} />
                </button>
              </div>
            </section>

            {/* Équipements */}
            <section id="tb-equipements" className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: C.white }}>
              <div className="p-4 border-b" style={{ borderColor: C.border }}>
                <h2 className="text-base font-bold" style={{ color: C.dark }}>Équipements</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {Object.entries(EQUIPMENTS).slice(0, showAllEquip ? undefined : 3).map(([category, eqList]) => (
                    <div key={category}>
                      <h4 className="font-bold text-sm mb-2" style={{ color: C.dark }}>{category}</h4>
                      <ul className="space-y-1.5">
                        {eqList.map((eq) => (
                          <li key={eq} className="flex items-center gap-2 text-sm" style={{ color: C.text }}>
                            <Check className="w-3.5 h-3.5 shrink-0" style={{ color: C.green }} />
                            {eq}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowAllEquip(!showAllEquip)}
                  className="mt-4 text-sm font-semibold flex items-center gap-1"
                  style={{ color: C.pink }}
                >
                  {showAllEquip ? "Réduire" : "Voir tous les services"}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAllEquip ? "rotate-180" : ""}`} />
                </button>
              </div>
            </section>

            {/* Mesures de sécurité */}
            <section className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: C.white }}>
              <div className="p-4 border-b" style={{ borderColor: C.border }}>
                <h2 className="text-base font-bold" style={{ color: C.dark }}>Mesures de sécurité et de santé</h2>
              </div>
              <div className="p-4">
                <p className="text-sm mb-4" style={{ color: C.text }}>
                  Cet établissement a renforcé les mesures de santé et d'hygiène pour garantir votre sécurité tout au long de votre séjour.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: ShieldCheck, title: "Mesures de sécurité en vigueur", items: ["Le personnel respecte les protocoles de sécurité", "Du gel hydroalcoolique est disponible", "Des professionnels de santé sont disponibles", "Des masques sont mis à disposition des clients"] },
                    { icon: Utensils, title: "Mesures de sécurité alimentaire", items: ["Distanciation physique dans les espaces de restauration", "Désinfection des verres, assiettes et couverts"] },
                    { icon: Droplets, title: "Mesures de distance physique", items: ["Barrières physiques entre personnel et clients", "Paiement sans espèces offert", "Respect des mesures de distanciation physique"] },
                    { icon: SprayCan, title: "Désinfection et nettoyage", items: ["Lavage du linge conforme aux recommandations", "Utilisation de produits d'entretien efficaces", "Désinfection après chaque séjour", "Option de refus du service de nettoyage"] },
                  ].map((sec, i) => (
                    <div key={i} className="flex gap-3">
                      <sec.icon className="w-8 h-8 shrink-0 mt-0.5" style={{ color: C.green }} />
                      <div>
                        <h4 className="font-bold text-sm mb-1" style={{ color: C.dark }}>{sec.title}</h4>
                        <ul className="space-y-1">
                          {sec.items.map((item, j) => (
                            <li key={j} className="text-xs" style={{ color: C.text }}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Avis */}
            <section id="tb-avis" className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: C.white }}>
              <div className="p-4 border-b" style={{ borderColor: C.border }}>
                <h2 className="text-base font-bold" style={{ color: C.dark }}>El Mouradi Gammarth Avis</h2>
              </div>
              <div className="p-4 space-y-4">
                {REVIEWS.map((review, i) => (
                  <div key={i} className="border-b pb-4 last:border-0 last:pb-0" style={{ borderColor: C.border }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: "#eee", color: C.gray }}>
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-sm" style={{ color: C.dark }}>{review.title}</div>
                          <div className="text-xs" style={{ color: C.gray }}>{review.name} • Client Tunisie Booking</div>
                        </div>
                      </div>
                      <RatingBar rating={review.rating} />
                    </div>
                    {review.comment && (
                      <p className="text-sm" style={{ color: C.text }}>{review.comment}</p>
                    )}
                    <p className="text-xs mt-1" style={{ color: C.gray }}>{review.date}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: C.white }}>
              <div className="p-4 border-b" style={{ borderColor: C.border }}>
                <h2 className="text-base font-bold" style={{ color: C.dark }}>Les Questions les plus Fréquentes sur El Mouradi Gammarth</h2>
              </div>
              <div className="divide-y" style={{ borderColor: C.border }}>
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                    >
                      <span className="text-sm font-medium pr-4" style={{ color: C.dark }}>{item.q}</span>
                      <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} style={{ color: C.pink }} />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-sm leading-relaxed" style={{ color: C.text }}>{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Avantages */}
            <section className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: C.white }}>
              <div className="p-4 border-b" style={{ borderColor: C.border }}>
                <h2 className="text-base font-bold" style={{ color: C.dark }}>Avantages Prix hotel Gammarth El Mouradi</h2>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { title: "Réservez au meilleur prix", desc: "Tunisiebooking négocie pour vous les meilleurs tarifs" },
                  { title: "Facilité de paiement", desc: "Réservez vos chambres maintenant et ne payez qu'une avance. Vous payerez le reste à votre arrivée à l'hôtel" },
                  { title: "Modes de paiement", desc: "Paiement sécurisé par carte bancaire : Mastercard, Visa, Carte Bleue" },
                ].map((adv, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: C.green }} />
                    <div>
                      <span className="font-bold text-sm" style={{ color: C.dark }}>{adv.title} : </span>
                      <span className="text-sm" style={{ color: C.text }}>{adv.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden shadow-sm sticky top-36" style={{ backgroundColor: C.white }}>
              {/* Pink header */}
              <div className="p-3 text-center text-white font-bold text-sm" style={{ backgroundColor: C.pink }}>
                Tarifs & Disponibilités
              </div>

              {/* Avis summary */}
              <div className="p-3 border-b flex items-center gap-3" style={{ borderColor: C.border }}>
                <div className="flex items-center gap-1.5">
                  <img src="https://www.tunisiebooking.com/images/icons-menu-moteur/avis.svg" alt="" className="w-4 h-4" />
                  <span className="text-xs" style={{ color: C.gray }}>Avis Voyageurs</span>
                </div>
                <RatingBadge rating={HOTEL.rating} text={HOTEL.ratingText} />
              </div>

              {/* Services */}
              <div className="p-3 border-b" style={{ borderColor: C.border }}>
                <div className="text-xs font-bold mb-2" style={{ color: C.dark }}>Principales Services</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Emplacement", "Chambres", "Internet", "Restauration", "Piscines", "Parking", "Activités et Animations"].map((s) => (
                    <span key={s} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: C.lightGray, color: C.text }}>{s}</span>
                  ))}
                </div>
                <button className="mt-2 text-xs font-semibold flex items-center gap-1" style={{ color: C.pink }}>
                  Voir tous les services <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Date pickers */}
              <div className="p-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg border text-center" style={{ borderColor: C.border }}>
                    <div className="text-xs" style={{ color: C.gray }}>Arrivée</div>
                    <div className="text-sm font-bold" style={{ color: C.dark }}>{formatDate(today)}</div>
                  </div>
                  <div className="p-2.5 rounded-lg border text-center" style={{ borderColor: C.border }}>
                    <div className="text-xs" style={{ color: C.gray }}>Départ</div>
                    <div className="text-sm font-bold" style={{ color: C.dark }}>{formatDate(checkout)}</div>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg border text-center" style={{ borderColor: C.border }}>
                  <span className="text-sm" style={{ color: C.text }}>1 Chambre , 2 Adulte , 0 Enfant</span>
                </div>
                <button className="w-full py-3 rounded-lg text-white font-bold text-sm transition hover:opacity-90" style={{ backgroundColor: C.pink }}>
                  Tarifs & Dispos
                </button>
              </div>

              {/* 3D CTA */}
              {tour && (
                <div className="p-3 border-t" style={{ borderColor: C.border }}>
                  <button
                    onClick={() => navigate(tourPath(tour))}
                    className="w-full py-3 rounded-lg text-white font-bold text-sm transition hover:opacity-90 flex items-center justify-center gap-2"
                    style={{ backgroundColor: C.green }}
                  >
                    <Eye className="w-4 h-4" />
                    Visite Virtuelle 3D
                  </button>
                  <p className="text-center text-xs mt-2" style={{ color: C.gray }}>
                    Propulsé par <span className="font-bold" style={{ color: C.pink }}>PrimeSpace</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Hotels */}
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: C.white }}>
            <div className="p-4 border-b" style={{ borderColor: C.border }}>
              <h2 className="text-base font-bold" style={{ color: C.dark }}>Les hôtels similaires à Gammarth</h2>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SIMILAR_HOTELS.map((hotel, i) => (
                <div key={i} className="border rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer" style={{ borderColor: C.border }}>
                  <div className="h-40 overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm" style={{ color: C.dark }}>{hotel.name}</h3>
                      <StarIcons count={hotel.stars} />
                    </div>
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <MapPin className="w-3 h-3" style={{ color: C.pink }} />
                      <span style={{ color: C.gray }}>{hotel.location}</span>
                      <span className="font-semibold" style={{ color: C.green }}>{hotel.rating}/5 Bien</span>
                    </div>
                    <p className="text-xs line-clamp-2" style={{ color: C.text }}>{hotel.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
