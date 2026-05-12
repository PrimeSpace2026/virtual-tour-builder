import { useState } from "react";
import { Layout } from "@/components/Layout";
import {
  Star, MapPin, ChevronDown, ChevronLeft, ChevronRight, Eye,
  X, Check, Wifi, UtensilsCrossed, Snowflake, Home, Users, BedDouble, Bath,
  Clock, CalendarDays, ShieldCheck, Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─── Kabylis exact color palette ─── */
const C = {
  primary: "#FF5A5F",      // Kabylis coral/red
  primaryHover: "#E04850",
  accent: "#00A699",        // Kabylis teal
  dark: "#484848",
  text: "#767676",
  lightText: "#B0B0B0",
  lightGray: "#F7F7F7",
  border: "#EBEBEB",
  white: "#FFFFFF",
  gold: "#FFB400",
};

/* ─── L'Hacienda de Tamzrat property images (from kabylis.tn) ─── */
const PROPERTY_IMAGES = [
  "https://ucarecdn.com/cc32818a-9140-469a-ba82-12fbfd319f01/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/1a9e647b-e407-4f78-ba46-5f6b5ee1c346/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/baba97e6-ad8f-49ea-867a-47e5b0be5b9d/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/ef39b135-5314-4ad3-a318-43f3eef85fd9/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/29b4dd19-190e-431d-9c6e-24b5174d4fd7/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/9a04ae11-8d25-4861-8659-757a9a4860ba/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/5674fc9b-3a32-4665-9b8b-68efeb9ceb8a/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/0587b537-02e5-48ec-8302-5bb65896539e/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/c270f17e-bac5-44b9-9687-e930701eb972/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/b4eb7b66-e25f-4ae9-b4ed-ccccdc78e35c/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/10cf45fe-5cea-4ca4-991c-a9d343d1e91d/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/3896af77-58cb-4f12-94eb-5efb26f263dc/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/c95e9333-8317-45c1-b73c-5e0e4b90d48f/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/74f7b381-411c-4f8b-bdd3-b3f0dcfc00cc/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/9cc40086-5627-42a7-8ab5-6cfa62d099e4/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/3a59bd53-80f6-4773-a85b-76dcdd9a236d/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/55daa31a-aa5a-4ee4-a6d2-21eb8f0e9931/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/f21a4e14-3611-4735-a2f8-fe4f7bea318f/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/87aab6cb-75e7-4df0-8aa5-4ad01c111ef6/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/26912cc4-d903-448e-92f6-b139955b93a3/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/cc99de31-f572-42d8-9beb-9b7eadd3a23b/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/d332f3d9-a4d8-4580-ac05-4fe074d10980/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/7c212e54-37a7-4dcd-9855-f130c22eb01f/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/261f3a18-eb10-41d2-9b6c-69bf294cb0db/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/aa42bdd1-dd28-45a3-83f4-9bf54d377f10/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/3820db91-4ef2-4256-8e6b-d3313fa9861c/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/df0064c1-7a5e-4497-b289-bad6753a4350/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/c96ae125-4a50-4384-b258-0b822e14ab48/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/f624d19a-278c-4f07-90e7-514842048140/-/format/auto/-/scale_crop/1440x960/smart/",
];

const SIMILAR_LISTINGS = [
  {
    name: "Bungalow Capri : s+2 en bord de mer",
    image: "https://ucarecdn.com/9a04ae11-8d25-4861-8659-757a9a4860ba/-/format/auto/-/scale_crop/720x480/smart/",
    location: "Kélibia",
    price: "350 TND",
    type: "House",
    guests: 4,
  },
  {
    name: "Dar Tamzrat",
    image: "https://ucarecdn.com/c270f17e-bac5-44b9-9687-e930701eb972/-/format/auto/-/scale_crop/720x480/smart/",
    location: "Tamzrat",
    price: "900 TND",
    type: "House",
    guests: 10,
  },
  {
    name: "Villa de Luxe - 200m plage ezzahra",
    image: "https://ucarecdn.com/b4eb7b66-e25f-4ae9-b4ed-ccccdc78e35c/-/format/auto/-/scale_crop/720x480/smart/",
    location: "Kélibia",
    price: "1 200 TND",
    type: "House",
    guests: 8,
  },
];

const TOUR_PATH = "/view/westpoint-way-residence-donegal-ie";

const PROPERTY = {
  name: "L'Hacienda de Tamzrat",
  rating: 5,
  location: "Kelibia, TN",
  host: "Samar",
  type: "Villa",
  guests: 8,
  bedrooms: 4,
  beds: 5,
  bathrooms: 4,
  checkin: "3 PM",
  checkout: "11 AM",
  price: "900 TND",
  description: `Charmante villa de campagne à 4 km de Kelibia et 3 km de Hammam Larzez, elle se situe sur les collines de Tamzrat offrant une vue imprenable sur les plaines verdoyantes et la mer au loin.

Cette maison d'hôtes spacieuse et parfaitement équipée vous accueille dans un cadre authentique et paisible. Chaque détail a été pensé pour offrir un confort optimal : cuisine moderne entièrement équipée, salons lumineux, chambres confortables avec literie de qualité, et des espaces extérieurs généreux pour profiter du beau temps.

L'Hacienda de Tamzrat est l'endroit idéal pour des vacances en famille, entre amis, ou simplement pour se ressourcer loin de l'agitation de la ville.`,
  rules: "Nos invités sont priés de respecter les lieux, respecter le voisinage et respecter l'heure de Check out pour nous permettre de fournir les meilleurs services.",
  cancellation: "Strict — Annulez jusqu'à 7 jours avant l'arrivée et obtenez un remboursement de 50%.",
};

const EQUIPMENTS = [
  { name: "Produits essentiels", icon: Home },
  { name: "Climatiseur", icon: Snowflake },
  { name: "Cuisine équipée", icon: UtensilsCrossed },
  { name: "Wi-Fi", icon: Wifi },
];

const ROOMS = [
  { name: "Chambre 1", beds: "1 × Queen, 1 × Single" },
  { name: "Chambre 2", beds: "1 × Queen" },
  { name: "Chambre 3", beds: "1 × Queen" },
  { name: "Chambre 4", beds: "2 × Single" },
];

const REVIEW = {
  name: "Amine",
  rating: 5,
  date: "5 septembre 2025",
  comment: "Nous avons adoré notre séjour dans cette maison. Tout est pensé dans les moindres détails pour offrir un confort optimal : rien ne manque, tout est parfaitement fonctionnel. L'accueil a été d'une grande gentillesse, et la propreté des lieux irréprochable. Mais ce qui nous a le plus surpris, c'est que l'expérience était encore meilleure que ce que les photos laissaient imaginer — au-delà de toutes nos attentes ! Un sans-faute du début à la fin. Nous recommandons cette adresse les yeux fermés.",
};

const StarIcons = ({ count, size = "w-3.5 h-3.5" }: { count: number; size?: string }) => (
  <span className="inline-flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className={`${size} fill-current`} style={{ color: C.gold }} />
    ))}
  </span>
);

export default function KabylisDemo() {
  const navigate = useNavigate();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [showAllDesc, setShowAllDesc] = useState(false);
  const [galleryStart, setGalleryStart] = useState(0);
  const [saved, setSaved] = useState(false);

  const openLightbox = (idx: number) => { setLightboxIdx(idx); setLightboxImg(PROPERTY_IMAGES[idx]); };
  const prevImg = () => { const i = (lightboxIdx - 1 + PROPERTY_IMAGES.length) % PROPERTY_IMAGES.length; setLightboxIdx(i); setLightboxImg(PROPERTY_IMAGES[i]); };
  const nextImg = () => { const i = (lightboxIdx + 1) % PROPERTY_IMAGES.length; setLightboxIdx(i); setLightboxImg(PROPERTY_IMAGES[i]); };

  return (
    <Layout>
      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center" onClick={() => setLightboxImg(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLightboxImg(null); }} className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 z-10"><X className="w-7 h-7" /></button>
          <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white p-2 sm:p-3 rounded-full hover:bg-white/20"><ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" /></button>
          <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white p-2 sm:p-3 rounded-full hover:bg-white/20"><ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" /></button>
          <img src={lightboxImg} alt="" className="max-w-[90vw] max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
          <div className="absolute bottom-4 text-white/70 text-xs sm:text-sm">{lightboxIdx + 1} / {PROPERTY_IMAGES.length}</div>
        </div>
      )}

      {/* Header bar */}
      <div style={{ backgroundColor: C.white }} className="border-b sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-bold" style={{ color: C.dark }}>{PROPERTY.name}</h1>
            <div className="flex items-center gap-2 text-sm mt-0.5">
              <StarIcons count={1} />
              <span className="font-semibold" style={{ color: C.dark }}>{PROPERTY.rating}</span>
              <span style={{ color: C.text }}>·</span>
              <span className="underline text-sm" style={{ color: C.dark }}>1 avis</span>
              <span style={{ color: C.text }}>·</span>
              <span className="flex items-center gap-1" style={{ color: C.dark }}>
                <MapPin className="w-3.5 h-3.5" />
                {PROPERTY.location}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-sm underline" style={{ color: C.dark }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              Partager
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className="flex items-center gap-1 text-sm underline"
              style={{ color: C.dark }}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
              {saved ? "Sauvegardé" : "Sauvegarder"}
            </button>
          </div>
        </div>
      </div>

      {/* Photo Gallery — Kabylis-style grid */}
      <div className="max-w-5xl mx-auto px-4 pt-4">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden" style={{ height: "360px" }}>
          <div
            className="col-span-2 row-span-2 cursor-pointer overflow-hidden relative group"
            onClick={() => openLightbox(0)}
          >
            <img src={PROPERTY_IMAGES[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          {PROPERTY_IMAGES.slice(1, 5).map((img, i) => (
            <div key={i} className="cursor-pointer overflow-hidden relative group" onClick={() => openLightbox(i + 1)}>
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {i === 3 && PROPERTY_IMAGES.length > 5 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">Afficher toutes les photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Host & Property Info */}
          <div className="flex items-start justify-between pb-6 border-b" style={{ borderColor: C.border }}>
            <div>
              <h2 className="text-xl font-bold" style={{ color: C.dark }}>
                {PROPERTY.type} hébergé par {PROPERTY.host}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-sm" style={{ color: C.text }}>
                <span>{PROPERTY.guests} voyageurs</span>
                <span>·</span>
                <span>{PROPERTY.bedrooms} chambres</span>
                <span>·</span>
                <span>{PROPERTY.beds} lits</span>
                <span>·</span>
                <span>{PROPERTY.bathrooms} salles de bains</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ backgroundColor: C.primary }}>
              {PROPERTY.host.charAt(0)}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-5 pb-6 border-b" style={{ borderColor: C.border }}>
            {[
              { icon: Home, title: "Logement entier", desc: "Vous aurez la maison pour vous tout seul." },
              { icon: ShieldCheck, title: "Propreté irréprochable", desc: "Les voyageurs récents ont attribué une note de 5/5 à la propreté." },
              { icon: CalendarDays, title: "Annulation gratuite pendant 48h", desc: "Obtenez un remboursement si vous changez d'avis." },
            ].map((feat, i) => (
              <div key={i} className="flex items-start gap-4">
                <feat.icon className="w-6 h-6 shrink-0 mt-0.5" style={{ color: C.dark }} />
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: C.dark }}>{feat.title}</h3>
                  <p className="text-sm mt-0.5" style={{ color: C.text }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="pb-6 border-b" style={{ borderColor: C.border }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: C.dark }}>À propos de cette annonce</h2>
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: C.dark }}>
              {showAllDesc ? PROPERTY.description : PROPERTY.description.slice(0, 250) + "..."}
            </p>
            <button
              onClick={() => setShowAllDesc(!showAllDesc)}
              className="mt-3 text-sm font-semibold underline flex items-center gap-1"
              style={{ color: C.dark }}
            >
              {showAllDesc ? "Afficher moins" : "Afficher plus"}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAllDesc ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* 3D Virtual Tour — PrimeSpace */}
          <div className="pb-6 border-b" style={{ borderColor: C.border }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: C.dark }}>
                🏠 Visite Virtuelle 3D — <span style={{ color: C.primary }}>PrimeSpace</span>
              </h2>
              <span className="text-xs px-3 py-1 rounded-full font-semibold text-white" style={{ backgroundColor: C.accent }}>NOUVEAU</span>
            </div>
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: C.border }}>
              <div className="relative aspect-video">
                <iframe
                  src={TOUR_PATH}
                  title="Visite 3D PrimeSpace — L'Hacienda de Tamzrat"
                  className="w-full h-full"
                  allowFullScreen
                  allow="xr-spatial-tracking"
                />
              </div>
              <div className="p-3 flex items-center justify-between" style={{ backgroundColor: C.lightGray }}>
                <p className="text-xs" style={{ color: C.text }}>Naviguez librement dans l'espace 3D • Cliquez et déplacez-vous</p>
                <a
                  href={TOUR_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-4 py-1.5 rounded-lg text-white transition hover:opacity-90 inline-block"
                  style={{ backgroundColor: C.primary }}
                >
                  Plein écran
                </a>
              </div>
            </div>
          </div>

          {/* L'espace */}
          <div className="pb-6 border-b" style={{ borderColor: C.border }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: C.dark }}>L'espace</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: Home, label: "Type", value: "House" },
                { icon: Users, label: "Invités", value: `${PROPERTY.guests} Invités` },
                { icon: BedDouble, label: "Chambres", value: `${PROPERTY.bedrooms} Chambres` },
                { icon: BedDouble, label: "Lits", value: `${PROPERTY.beds} lits` },
                { icon: Bath, label: "Salles de bains", value: `${PROPERTY.bathrooms} Salles de bains` },
                { icon: Clock, label: "Arrivée", value: `${PROPERTY.checkin} - ${PROPERTY.checkout}` },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: C.lightGray }}>
                  <item.icon className="w-5 h-5 shrink-0" style={{ color: C.text }} />
                  <div>
                    <p className="text-xs" style={{ color: C.text }}>{item.label}</p>
                    <p className="text-sm font-semibold" style={{ color: C.dark }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rooms / Beds */}
          <div className="pb-6 border-b" style={{ borderColor: C.border }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: C.dark }}>Lits</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ROOMS.map((room, i) => (
                <div key={i} className="border rounded-xl p-4 text-center" style={{ borderColor: C.border }}>
                  <BedDouble className="w-6 h-6 mx-auto mb-2" style={{ color: C.dark }} />
                  <h4 className="font-semibold text-sm" style={{ color: C.dark }}>{room.name}</h4>
                  <p className="text-xs mt-1" style={{ color: C.text }}>{room.beds}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Équipements */}
          <div className="pb-6 border-b" style={{ borderColor: C.border }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: C.dark }}>Équipements</h2>
            <div className="grid grid-cols-2 gap-3">
              {EQUIPMENTS.map((eq, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <eq.icon className="w-5 h-5" style={{ color: C.dark }} />
                  <span className="text-sm" style={{ color: C.dark }}>{eq.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Règles */}
          <div className="pb-6 border-b" style={{ borderColor: C.border }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: C.dark }}>Règles de l'hébergement</h2>
            <p className="text-sm leading-relaxed" style={{ color: C.text }}>{PROPERTY.rules}</p>
          </div>

          {/* Cancellation */}
          <div className="pb-6 border-b" style={{ borderColor: C.border }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: C.dark }}>Politique d'annulation</h2>
            <p className="text-sm leading-relaxed" style={{ color: C.text }}>{PROPERTY.cancellation}</p>
          </div>

          {/* Review */}
          <div className="pb-6 border-b" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-current" style={{ color: C.dark }} />
              <h2 className="text-lg font-bold" style={{ color: C.dark }}>{REVIEW.rating} · 1 Avis</h2>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0" style={{ backgroundColor: C.primary }}>
                {REVIEW.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: C.dark }}>{REVIEW.name}</div>
                <div className="text-xs mb-2" style={{ color: C.text }}>{REVIEW.date}</div>
                <p className="text-sm leading-relaxed" style={{ color: C.dark }}>{REVIEW.comment}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar — Booking Card */}
        <div className="space-y-6">
          <div className="rounded-xl border shadow-lg p-6 sticky top-36" style={{ borderColor: C.border, backgroundColor: C.white }}>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-xl font-bold" style={{ color: C.dark }}>{PROPERTY.price}</span>
              <span className="text-sm" style={{ color: C.text }}>/ Nuit</span>
            </div>

            {/* Dates */}
            <div className="border rounded-xl overflow-hidden mb-4" style={{ borderColor: C.dark }}>
              <div className="grid grid-cols-2">
                <div className="p-3 border-r" style={{ borderColor: C.dark }}>
                  <div className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Arrivée</div>
                  <div className="text-sm" style={{ color: C.dark }}>Ajouter une date</div>
                </div>
                <div className="p-3">
                  <div className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Départ</div>
                  <div className="text-sm" style={{ color: C.dark }}>Ajouter une date</div>
                </div>
              </div>
              <div className="border-t p-3" style={{ borderColor: C.dark }}>
                <div className="text-[10px] font-bold uppercase" style={{ color: C.dark }}>Voyageurs</div>
                <div className="text-sm" style={{ color: C.text }}>1 voyageur</div>
              </div>
            </div>

            <a
              href="https://kabylis.tn/rooms/l'hacienda-de-tamzrat-487?&guests=0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-lg text-white font-bold text-sm transition hover:opacity-90 flex items-center justify-center"
              style={{ backgroundColor: C.primary }}
            >
              Réservez maintenant
            </a>

            {/* 3D CTA */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: C.border }}>
              <button
                onClick={() => navigate(TOUR_PATH)}
                className="w-full py-3 rounded-lg text-white font-bold text-sm transition hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: C.accent }}
              >
                <Eye className="w-4 h-4" />
                Visite Virtuelle 3D
              </button>
              <p className="text-center text-xs mt-2" style={{ color: C.text }}>
                Propulsé par <span className="font-bold" style={{ color: C.primary }}>PrimeSpace</span>
              </p>
            </div>

            <p className="text-center text-xs mt-3" style={{ color: C.text }}>
              Durée min: 1 nuit · Durée max: 60 nuits
            </p>
          </div>
        </div>
      </div>

      {/* Host Section */}
      <div style={{ backgroundColor: C.lightGray }}>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="rounded-xl p-6 border" style={{ borderColor: C.border, backgroundColor: C.white }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: C.primary }}>S</div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: C.dark }}>Hébergé par {PROPERTY.host}</h3>
                <p className="text-sm" style={{ color: C.text }}>Rejoint octobre 2021</p>
              </div>
            </div>
            <a
              href="https://kabylis.tn/rooms/l'hacienda-de-tamzrat-487?&guests=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border font-semibold text-sm transition hover:bg-gray-50"
              style={{ borderColor: C.dark, color: C.dark }}
            >
              Contacter l'hôte
            </a>
          </div>
        </div>
      </div>

      {/* Similar Listings */}
      <div style={{ backgroundColor: C.lightGray }}>
        <div className="max-w-5xl mx-auto px-4 pb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: C.dark }}>Annonces similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SIMILAR_LISTINGS.map((listing, i) => (
              <div key={i} className="rounded-xl overflow-hidden border hover:shadow-md transition cursor-pointer" style={{ borderColor: C.border, backgroundColor: C.white }}>
                <div className="h-48 overflow-hidden relative">
                  <img src={listing.image} alt={listing.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-3 right-3">
                    <Heart className="w-5 h-5 text-white drop-shadow-md" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="font-bold text-sm" style={{ color: C.dark }}>{listing.price} / Nuit</p>
                  <h3 className="text-sm mt-0.5" style={{ color: C.dark }}>{listing.name}</h3>
                  <p className="text-xs mt-1" style={{ color: C.text }}>{listing.type} / {listing.guests} Invités</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t py-6 text-center text-xs" style={{ backgroundColor: C.white, color: C.text }}>
        © Kabylis · <a href="https://kabylis.tn" target="_blank" rel="noopener noreferrer" className="underline">kabylis.tn</a>
      </div>
    </Layout>
  );
}
