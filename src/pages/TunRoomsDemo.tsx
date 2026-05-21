import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* ─── TunRooms exact colors & font (Open Sans like their site) ─── */
const C = {
  brand: "#29B6F6",
  dark: "#333333",
  text: "#484848",
  gray: "#717171",
  lightGray: "#b0b0b0",
  border: "#DDDDDD",
  bg: "#F7F7F7",
  white: "#FFFFFF",
  gold: "#FFB400",
};
const FONT = `'Open Sans', 'Segoe UI', Arial, sans-serif`;

const TOUR_PATH = "/view/la-perla-pieds-dans-l-eau";
const TUNROOMS_LOGO = "https://www.tunrooms.com/images/logos/logo.png?v=jcw9pU";
const TUNROOMS_URL = "https://www.tunrooms.com/rooms/11131";

const IMAGES = [
  "https://kabylis.tn/images/upload/fe39128b2da1746d42fc62fecce5a457.jpeg",
  "https://ucarecdn.com/c5c6dcfc-29e3-4f63-ba70-da58a5a861fc/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/87f9967b-2a7e-481e-ad65-e525c3c9f71b/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://ucarecdn.com/994a698f-010a-419a-bb52-09fa9d61f3b3/-/format/auto/-/scale_crop/1440x960/smart/",
  "https://www.tunrooms.com/images/rooms/11131/01777286923.jpg",
];

const DESC = `Les principales caractéristiques comprennent:
• Villa face à la Méditerranée avec accès direct à la plage
• Piscine privée et coin détente
• 4 Chambres doubles avec literie haut de gamme
• 5 Salles de bain privées
• Cuisine entièrement équipée
• Terrasse avec vue panoramique sur la mer
• Espaces extérieurs spacieux et jardins`;

const EQUIP = [
  { icon: "https://www.tunrooms.com/images/amenities/essentials.png", label: "Essentials" },
  { icon: "https://www.tunrooms.com/images/amenities/tv.png", label: "TV" },
  { icon: "https://www.tunrooms.com/images/amenities/1698838666.png", label: "Hot Water" },
  { icon: "https://www.tunrooms.com/images/amenities/1698838640.png", label: "Climatisation / AC" },
  { icon: "https://www.tunrooms.com/images/amenities/1698838609.png", label: "Heating" },
  { icon: "https://www.tunrooms.com/images/amenities/1698838586.png", label: "Kitchen" },
];

const DETAILS = [
  { icon: "https://www.tunrooms.com/images/detail-icon/fastfood.webp", label: "Type de propriété", value: "Maison" },
  { icon: "https://www.tunrooms.com/images/detail-icon/people-outline.webp", label: "Capacité d'accueil", value: "8 Membres" },
  { icon: "https://www.tunrooms.com/images/detail-icon/room.webp", label: "Chambres", value: "4 chambre" },
  { icon: "https://www.tunrooms.com/images/detail-icon/bed.webp", label: "Lits", value: "4 Lits" },
  { icon: "https://www.tunrooms.com/images/detail-icon/bathroom.webp", label: "Salle de bain", value: "5 / Privé" },
];

const PRIX = [
  { icon: "https://www.tunrooms.com/images/detail-icon/people-outline.webp", label: "Personnes supplémentaires", value: "Non" },
  { icon: "https://www.tunrooms.com/images/detail-icon/bathroom.webp", label: "Frais de nettoyage", value: "TND 150 /Frais de nettoyage" },
  { icon: "https://www.tunrooms.com/images/detail-icon/fastfood.webp", label: "Prix du Week-end", value: "TND 1,200 /fin de semaine" },
  { icon: "https://www.tunrooms.com/images/detail-icon/room.webp", label: "Annulation", value: "Strictes" },
];

const ROOMS = [
  { name: "chambre 1", beds: "1 Lit double" },
  { name: "chambre 2", beds: "1 Lit double" },
  { name: "chambre 3", beds: "1 Lit double" },
  { name: "chambre 4", beds: "1 Lit double" },
];

const RATINGS = [
  { label: "Précision de l'annonce", score: 4.89 },
  { label: "Propreté", score: 5.0 },
  { label: "Arrivée", score: 4.89 },
  { label: "Commodités", score: 4.78 },
  { label: "Communication", score: 4.89 },
  { label: "Emplacement", score: 4.89 },
  { label: "Valeur", score: 4.89 },
];

export default function TunRoomsDemo() {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const prev = () => setImgIdx(i => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setImgIdx(i => (i + 1) % IMAGES.length);

  return (
    <div style={{ fontFamily: FONT, color: C.dark, backgroundColor: C.white, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet" />

      {/* ═══ Lightbox ═══ */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={e => { e.stopPropagation(); setLightbox(null); }} className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 z-10"><X className="w-7 h-7" /></button>
          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + IMAGES.length) % IMAGES.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hover:bg-white/20"><ChevronLeft className="w-8 h-8" /></button>
          <button onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % IMAGES.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hover:bg-white/20"><ChevronRight className="w-8 h-8" /></button>
          <img src={IMAGES[lightbox]} alt="" className="max-w-[90vw] max-h-[85vh] object-contain" onClick={e => e.stopPropagation()} />
          <div className="absolute bottom-4 text-white/70 text-sm">{lightbox + 1} / {IMAGES.length}</div>
        </div>
      )}

      {/* ═══ Navbar — exact TunRooms ═══ */}
      <nav className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-[720px] mx-auto px-4 h-[70px] flex items-center justify-between">
          <a href="https://www.tunrooms.com" target="_blank" rel="noopener noreferrer">
            <img src={TUNROOMS_LOGO} alt="TunRooms" style={{ height: 36 }} />
          </a>
          {/* Search pill — like TunRooms */}
          <div className="hidden sm:flex items-center border rounded-full px-1 py-1 gap-0 shadow-sm" style={{ borderColor: C.border }}>
            <span className="px-4 py-1.5 text-xs font-semibold" style={{ color: C.dark }}>Voir tout</span>
            <span className="border-l px-4 py-1.5 text-xs" style={{ color: C.gray, borderColor: C.border }}>Choisir le lieu</span>
            <span className="border-l px-4 py-1.5 text-xs" style={{ color: C.gray, borderColor: C.border }}>1 invité</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center ml-1" style={{ backgroundColor: C.brand }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
          {/* Hamburger */}
          <button className="w-9 h-9 border rounded-md flex items-center justify-center" style={{ borderColor: C.border }}>
            <svg className="w-5 h-5" fill="none" stroke={C.dark} strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </nav>

      {/* ═══ Content — single column, centered (like TunRooms) ═══ */}
      <div className="max-w-[720px] mx-auto px-4">

        {/* Title */}
        <div className="pt-6 pb-2">
          <h1 className="text-xl font-bold" style={{ color: C.dark }}>La Perla - Pieds dans l'eau</h1>
          <div className="flex items-center gap-2 mt-1.5 text-sm flex-wrap">
            <svg className="w-3.5 h-3.5" fill={C.gold} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <span className="font-bold text-sm" style={{ color: C.dark }}>5</span>
            <span className="text-sm underline cursor-pointer" style={{ color: C.dark }}>9 Avis</span>
            <span style={{ color: C.lightGray }}>•</span>
            <span className="text-sm underline cursor-pointer" style={{ color: C.dark }}>Haouaria, TN</span>
            <div className="ml-auto flex items-center gap-4">
              <button className="text-sm flex items-center gap-1" style={{ color: C.dark }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                Partager
              </button>
              <button onClick={() => setSaved(!saved)} className="text-sm flex items-center gap-1" style={{ color: C.dark }}>
                <svg className="w-3.5 h-3.5" fill={saved ? "#FF385C" : "none"} stroke={saved ? "#FF385C" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                Coup De Coeur
              </button>
            </div>
          </div>
        </div>

        {/* Image Slider */}
        <div className="pb-4">
          <div className="relative rounded-xl overflow-hidden" style={{ height: 380 }}>
            <img src={IMAGES[imgIdx]} alt="" className="w-full h-full object-cover cursor-pointer" onClick={() => setLightbox(imgIdx)} />
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 border flex items-center justify-center" style={{ borderColor: C.border }}>
              <ChevronLeft className="w-5 h-5" style={{ color: C.dark }} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 border flex items-center justify-center" style={{ borderColor: C.border }}>
              <ChevronRight className="w-5 h-5" style={{ color: C.dark }} />
            </button>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">{imgIdx + 1} / {IMAGES.length}</div>
          </div>
        </div>

        {/* ═══ Booking Card — inline like TunRooms ═══ */}
        <div className="border rounded-xl p-5 mb-6" style={{ borderColor: C.border }}>
          <p className="text-xs mb-1" style={{ color: C.gray }}>À partir de</p>
          <h2 className="text-2xl font-bold mb-4" style={{ color: C.dark }}>
            TND 1200 <span className="text-base font-normal" style={{ color: C.gray }}>Par nuit</span>
          </h2>
          <div className="border rounded-lg overflow-hidden mb-4" style={{ borderColor: C.border }}>
            <div className="grid grid-cols-2">
              <div className="p-3 border-r" style={{ borderColor: C.border }}>
                <p className="text-xs font-semibold" style={{ color: C.dark }}>Arrivée</p>
                <p className="text-sm mt-0.5" style={{ color: C.gray }}>Arrivée</p>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold" style={{ color: C.dark }}>Départ</p>
                <p className="text-sm mt-0.5" style={{ color: C.gray }}>Départ</p>
              </div>
            </div>
            <div className="border-t p-3 flex items-center justify-between" style={{ borderColor: C.border }}>
              <div>
                <p className="text-xs font-semibold" style={{ color: C.dark }}>INVITÉS</p>
                <p className="text-sm mt-0.5" style={{ color: C.dark }}>1 invité</p>
              </div>
              <svg className="w-4 h-4" fill="none" stroke={C.gray} strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          <p className="text-[11px] text-center mb-4" style={{ color: C.gray }}>
            N.B: La reservation ne vous engage en rien, la confirmation n'a lieu qu'après le paiement
          </p>
          <a href={TUNROOMS_URL} target="_blank" rel="noopener noreferrer" className="block w-full py-3 rounded-lg text-white font-bold text-center text-sm transition hover:opacity-90" style={{ backgroundColor: C.brand }}>
            Demande De Réservation
          </a>
        </div>

        {/* Property name + quick info */}
        <div className="pb-2">
          <h2 className="text-lg font-bold" style={{ color: C.dark }}>La Perla - Pieds dans l'eau</h2>
          <div className="flex items-center gap-5 mt-2 pb-4 border-b" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-2">
              <img src="https://www.tunrooms.com/images/detail-icon/home_outlin.webp" alt="" className="w-5 h-5 opacity-70" />
              <span className="text-sm" style={{ color: C.dark }}>Logement entier</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="https://www.tunrooms.com/images/detail-icon/people-outline.webp" alt="" className="w-5 h-5 opacity-70" />
              <span className="text-sm" style={{ color: C.dark }}>8 Invités</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="https://www.tunrooms.com/images/detail-icon/bed.webp" alt="" className="w-5 h-5 opacity-70" />
              <span className="text-sm" style={{ color: C.dark }}>4 Chambres</span>
            </div>
          </div>
        </div>

        {/* A propos */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: C.dark }}>A propos de cette annonce</h3>
          <p className="text-sm leading-relaxed" style={{ color: C.text }}>
            Magnifique villa S+4 climatisée située à Haouaria, parfaite pour des vacances inoubliables. Cette propriété luxueuse offre un confort exceptionnel avec un accès direct à la plage — les pieds dans l'eau. Profitez d'une grande piscine privée, d'espaces de vie spacieux et lumineux, et d'une vue imprenable sur la mer. Idéale pour des séjours en famille ou entre amis dans un cadre paisible et exclusif.
          </p>
        </div>

        {/* ═══ Virtual Tour — PrimeSpace ═══ */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold" style={{ color: C.dark }}>
              🏠 Visite Virtuelle 3D — <span style={{ color: C.brand }}>PrimeSpace</span>
            </h3>
          </div>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: C.border }}>
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={TOUR_PATH}
                title="Visite 3D PrimeSpace — La Perla"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="xr-spatial-tracking"
              />
            </div>
            <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: C.bg }}>
              <p className="text-xs" style={{ color: C.gray }}>Naviguez librement dans l'espace 3D</p>
              <a href={TOUR_PATH} target="_blank" rel="noopener noreferrer" className="text-xs font-bold px-4 py-1.5 rounded-md text-white hover:opacity-90 transition" style={{ backgroundColor: C.brand }}>
                Plein écran
              </a>
            </div>
          </div>
        </div>

        {/* Détails du logement — 2 col grid like TunRooms */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: C.dark }}>Détails du logement</h3>
          <div className="grid grid-cols-2 gap-3">
            {DETAILS.map((d, i) => (
              <div key={i} className="border rounded-xl p-4" style={{ borderColor: C.border }}>
                <img src={d.icon} alt="" className="w-7 h-7 mb-2 opacity-80" />
                <p className="text-sm" style={{ color: C.text }}>{d.label}</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: C.dark }}>{d.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Equipements — 2 col simple list like TunRooms */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: C.dark }}>Equipements</h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            {EQUIP.map((eq, i) => (
              <div key={i} className="flex items-center gap-3">
                <img src={eq.icon} alt="" className="w-6 h-6 opacity-70" />
                <span className="text-sm" style={{ color: C.dark }}>{eq.label}</span>
              </div>
            ))}
          </div>
          <button className="mt-5 px-5 py-2 border rounded-full text-sm font-semibold" style={{ borderColor: C.dark, color: C.dark }}>
            Afficher tout {EQUIP.length} Commodités
          </button>
        </div>

        {/* Prix — 2 col cards like TunRooms */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: C.dark }}>prix</h3>
          <div className="grid grid-cols-2 gap-3">
            {PRIX.map((p, i) => (
              <div key={i} className="border rounded-xl p-4" style={{ borderColor: C.border }}>
                <img src={p.icon} alt="" className="w-7 h-7 mb-2 opacity-80" />
                <p className="text-sm" style={{ color: C.text }}>{p.label}</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: C.dark }}>{p.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: C.dark }}>Description</h3>
          <p className="text-sm font-semibold mb-2" style={{ color: C.dark }}>Le logement</p>
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: C.text }}>{DESC}</p>
          <button className="mt-2 text-sm font-semibold underline" style={{ color: C.dark }}>Voir plus</button>
        </div>

        {/* Règles */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: C.dark }}>Règles de la maison</h3>
          <div className="text-sm leading-relaxed" style={{ color: C.text }}>
            <p>- Les événements ne sont pas acceptés</p>
            <p>- Les animaux ne sont pas acceptés</p>
            <p>- Les enfants doivent rester sous surveillance des parents</p>
            <p className="mt-3">- Check-In: 15:00</p>
            <p>Check-Out: 11:00</p>
          </div>
        </div>

        {/* Couchages */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: C.dark }}>Couchages</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {ROOMS.map((r, i) => (
              <div key={i} className="flex-shrink-0 w-40 border rounded-xl p-4" style={{ borderColor: C.border }}>
                <h4 className="text-sm font-bold mb-2" style={{ color: C.dark }}>{r.name}</h4>
                <div className="flex items-center gap-2">
                  <img src="https://www.tunrooms.com/images/icons/bed_type/bed_type_1698838910.png" alt="" className="w-6 h-6" />
                  <span className="text-xs" style={{ color: C.text }}>{r.beds}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disponibilité */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold" style={{ color: C.dark }}>Disponibilité</h3>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm" style={{ borderColor: C.border, color: C.dark }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Afficher le calendrier
            </button>
          </div>
          <p className="text-sm mt-3" style={{ color: C.text }}>Séjour minimum: <strong>2</strong></p>
        </div>

        {/* Avis */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: C.dark }}>Avis</h3>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4" fill={C.gold} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            <span className="font-bold" style={{ color: C.dark }}>5</span>
            <span className="text-sm underline" style={{ color: C.dark }}>9 Avis</span>
          </div>

          <p className="text-sm font-semibold mb-3" style={{ color: C.dark }}>Description du logement</p>

          {/* Rating bars */}
          <div className="space-y-2.5 mb-6">
            {RATINGS.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm w-44 flex-shrink-0" style={{ color: C.dark }}>{r.label}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E0E0E0" }}>
                  <div className="h-full rounded-full" style={{ width: `${(r.score / 5) * 100}%`, backgroundColor: C.dark }} />
                </div>
                <span className="text-sm font-semibold w-9 text-right" style={{ color: C.dark }}>{r.score.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="https://www.tunrooms.com/images/users/29229/p7cpqi3zh3buf3hbpesi_225x225.jpeg" alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = ''; (e.target as HTMLImageElement).style.backgroundColor = '#ddd'; }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: C.dark }}>Hejer</p>
                  <p className="text-xs" style={{ color: C.gray }}>Feb 2023</p>
                </div>
              </div>
              <p className="text-sm" style={{ color: C.text }}>Hôte très accueillant, vu incroyable, maison splendide lumineuse et très moderne ! Nous avons adoré y séjourner</p>
              <button className="text-sm underline mt-1" style={{ color: C.dark }}>Voir plus</button>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold" style={{ color: C.gray }}>G</div>
                <div>
                  <p className="text-sm font-bold" style={{ color: C.dark }}>Ghassen</p>
                  <p className="text-xs" style={{ color: C.gray }}>May 2026</p>
                </div>
              </div>
              <p className="text-sm" style={{ color: C.text }}>Séjour exceptionnel dans une villa avec la plus belle vue en Tunisie. La propreté, l'accueil, tout était parfait.</p>
              <button className="text-sm underline mt-1" style={{ color: C.dark }}>Voir plus</button>
            </div>
          </div>
          <button className="mt-4 px-5 py-2 border rounded-full text-sm font-semibold" style={{ borderColor: C.dark, color: C.dark }}>
            Afficher tout 9 Avis
          </button>
        </div>

        {/* Hébergé par */}
        <div className="py-6 border-b" style={{ borderColor: C.border }}>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img src="https://www.tunrooms.com/images/users/10005/p7cpqi3zh3buf3hbpesi_225x225.jpeg" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-base font-bold" style={{ color: C.dark }}>Hébergé par TunRooms Properties</p>
              <p className="text-xs mt-0.5" style={{ color: C.gray }}>Rejoint Jan 2019</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: C.dark }}>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill={C.gold} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <span className="underline">53 Avis</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke={C.dark} strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Vérifié</span>
            </div>
          </div>
          <a href="https://www.tunrooms.com/users/show/10005" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 border rounded-lg text-sm font-semibold transition hover:bg-gray-50" style={{ borderColor: C.border, color: C.dark }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            Voir le profil
          </a>
        </div>

        {/* Annonces similaires link */}
        <div className="py-4">
          <a href="https://www.tunrooms.com/s?location=Nabeul" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline" style={{ color: C.dark }}>
            Annonces similaires
          </a>
        </div>
      </div>

      {/* ═══ Footer — TunRooms style ═══ */}
      <footer style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[720px] mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 text-sm mb-4">
            <a href="https://www.tunrooms.com/terms_of_service" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: C.gray }}>Conditions Générales d'utilisation</a>
            <a href="https://www.tunrooms.com/about_us" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: C.gray }}>À propos de Tunrooms</a>
            <a href="https://www.tunrooms.com/privacy_policy" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: C.gray }}>Privacy Policy</a>
          </div>
          <div className="flex gap-3 mb-4">
            <a href="https://www.facebook.com/Tunrooms/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
              <svg className="w-5 h-5" fill={C.gray} viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://twitter.com/TunRooms" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
              <svg className="w-5 h-5" fill={C.gray} viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="https://www.instagram.com/tunrooms/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
              <svg className="w-5 h-5" fill={C.gray} viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
          <p className="text-xs" style={{ color: C.gray }}>© Tunrooms, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
