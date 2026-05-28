import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* ─── TravelTodo exact colors ─── */
const C = {
  topBar: "#1a2a4a",
  navBg: "#FFFFFF",
  brand: "#f37a1f",
  brandDark: "#d96a10",
  blue: "#1a3c6e",
  dark: "#333333",
  text: "#555555",
  gray: "#888888",
  lightGray: "#cccccc",
  border: "#e0e0e0",
  bg: "#f8f8f8",
  white: "#FFFFFF",
  gold: "#f5a623",
  green: "#6bab3e",
  greenDark: "#5a9934",
  searchBg: "#6bab3e",
};
const FONT = `'Open Sans', 'Segoe UI', Arial, sans-serif`;

const TOUR_PATH = "/view/the-samuel-hotel-dublin";
const TRAVELTODO_LOGO = "https://www.traveltodo.com/dist/img/logo.png";
const TRAVELTODO_URL = "https://www.thesamuelhotel.com/";

const IMAGES = [
  "https://cf.bstatic.com/xdata/images/hotel/max500/354744738.jpg?k=e4a0e720e7686611104dbf758246f783d4a11a25add309656fab696b1323ffdf&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/356520670.jpg?k=c3d2d22f1ea615b92da1008a163ff19fed5082896264ca2862b2f0eaab89fafa&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/421643646.jpg?k=1aaaa6e8d59bf85b0635b55de57f2d1abfc240e988aa30fe7b1588e10de677e7&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/484261733.jpg?k=8c35a0540c60e0e1d18f7e4f40ccc0ec315829d2913289fdd13cc87c7896d6ec&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/356520285.jpg?k=838201017a7a758010b2cac73cd0bbf769344932738f7c6bee3037d3069f0bf5&o=",
];

const SERVICES = [
  "Air Conditioning", "Iron & Ironing Board", "Tea & Coffee Facilities",
  "Restaurant & Bar", "Gym & Fitness Centre", "Free WiFi",
  "24h Reception", "Accessible Rooms", "Meeting Rooms",
  "Rituals Toiletries", "Coffee Pod Machine",
];

const CHAMBRES = [
  "Deluxe Double Rooms",
  "Deluxe Twin Rooms",
  "Deluxe King Rooms",
  "Deluxe Double & Single Rooms",
  "Deluxe Double Double Rooms",
  "Executive King Rooms",
  "Accessible Rooms",
];

const PENSIONS = [
  "Room Only",
  "Bed & Breakfast",
  "Dinner, Bed & Breakfast",
];

export default function TravelTodoDemo() {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("resume");

  const prev = () => setImgIdx(i => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setImgIdx(i => (i + 1) % IMAGES.length);

  const TABS = [
    { id: "resume", label: "Résumé" },
    { id: "tarifs", label: "Dates & Tarifs" },
    { id: "hebergement", label: "Hébergement" },
    { id: "activites", label: "Activités" },
    { id: "avis", label: "Avis" },
  ];

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

      {/* ═══ Top bar — dark navy ═══ */}
      <div style={{ backgroundColor: C.topBar }} className="text-white text-xs">
        <div className="max-w-[1200px] mx-auto px-4 h-[32px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold">Traveltodo 1ère agence de voyage en ligne</span>
            <span className="hidden md:inline">✉ client@traveltodo.com</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="cursor-pointer hover:underline">Nos agences</span>
            <span className="cursor-pointer hover:underline">Contact</span>
            <span className="cursor-pointer hover:underline">Coffret cadeau</span>
            <span className="cursor-pointer hover:underline">Blog</span>
            <span className="border border-white/50 rounded-full px-3 py-0.5 cursor-pointer hover:bg-white/10">Se connecter</span>
          </div>
        </div>
      </div>

      {/* ═══ Main Navbar ═══ */}
      <nav className="sticky top-0 z-50 shadow-sm border-b" style={{ backgroundColor: C.navBg, borderColor: C.border }}>
        <div className="max-w-[1200px] mx-auto px-4 h-[60px] flex items-center justify-between">
          <a href="https://www.traveltodo.com" target="_blank" rel="noopener noreferrer">
            <img src={TRAVELTODO_LOGO} alt="Traveltodo" style={{ height: 40 }} />
          </a>
          <div className="hidden lg:flex items-center gap-5 text-sm font-semibold" style={{ color: C.blue }}>
            <span className="cursor-pointer hover:text-orange-500">Séjour en Tunisie ▾</span>
            <span className="cursor-pointer hover:text-orange-500">Hôtels dans le monde</span>
            <span className="cursor-pointer hover:text-orange-500">Voyages à l'étranger ▾</span>
            <span className="cursor-pointer hover:text-orange-500">Vols ▾</span>
            <span className="cursor-pointer hover:text-orange-500">CTN</span>
            <span className="cursor-pointer hover:text-orange-500">Promos ▾</span>
            <span className="cursor-pointer hover:text-orange-500">TRE</span>
            <span className="cursor-pointer hover:text-orange-500">Visa</span>
            <span className="cursor-pointer hover:text-orange-500">Omra</span>
            <span className="cursor-pointer hover:text-orange-500">Plus ▾</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke={C.blue} strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span className="text-lg font-bold" style={{ color: C.blue }}>70.103.103</span>
          </div>
        </div>
      </nav>

      {/* ═══ Breadcrumb ═══ */}
      <div className="max-w-[1200px] mx-auto px-4 py-3 text-sm flex items-center gap-2" style={{ color: C.gray }}>
        <a href="https://www.traveltodo.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: C.blue }}>Accueil</a>
        <span style={{ color: C.lightGray }}>|</span>
        <a href="https://www.traveltodo.com/sejours-en-tunisie/hotels-tunisie/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: C.blue }}>Hôtels</a>
        <span style={{ color: C.lightGray }}>|</span>
        <span style={{ color: C.dark }}>The Samuel Hotel</span>
      </div>

      {/* ═══ Tabs ═══ */}
      <div className="max-w-[1200px] mx-auto px-4 border-b" style={{ borderColor: C.border }}>
        <div className="flex items-center gap-6">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="py-3 text-sm font-semibold relative"
              style={{ color: activeTab === tab.id ? C.brand : C.gray }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t" style={{ backgroundColor: C.brand }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ Main Content — Two column layout like TravelTodo ═══ */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ═══ Left Sidebar — Green search box + map ═══ */}
          <div className="hidden lg:block w-full lg:w-[280px] flex-shrink-0">
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: C.searchBg }}>
              <div className="px-4 pt-4 pb-2">
                <h3 className="text-white font-bold text-lg">Rechercher</h3>
                <div className="w-10 h-[3px] mt-1 rounded" style={{ backgroundColor: C.brand }} />
              </div>
              <div className="px-4 pb-4 space-y-2">
                <div className="bg-white rounded px-3 py-2.5 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke={C.gray} strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span className="text-sm" style={{ color: C.dark }}>Dublin, Ireland</span>
                  <span className="ml-auto text-orange-400 cursor-pointer">×</span>
                </div>
                <div className="bg-white rounded px-3 py-2.5 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke={C.gray} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  <span className="text-sm" style={{ color: C.dark }}>29/05/2026</span>
                </div>
                <div className="bg-white rounded px-3 py-2.5 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke={C.gray} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  <span className="text-sm" style={{ color: C.dark }}>30/05/2026</span>
                </div>
                <div className="bg-white rounded px-3 py-2.5 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke={C.gray} strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                  <span className="text-sm" style={{ color: C.dark }}>1 chambre 2 adultes</span>
                </div>
                <a href={TRAVELTODO_URL} target="_blank" rel="noopener noreferrer" className="block text-xs text-center underline text-white/90 pt-1">Recherche avancée</a>
                <a href={TRAVELTODO_URL} target="_blank" rel="noopener noreferrer" className="block w-full py-3 rounded text-white font-bold text-center text-sm transition hover:opacity-90" style={{ backgroundColor: C.blue }}>
                  RECHERCHER
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-4 rounded-lg overflow-hidden border" style={{ borderColor: C.border, height: 180 }}>
              <div className="w-full h-full bg-gray-200 flex items-center justify-center relative">
                <img src="https://maps.googleapis.com/maps/api/staticmap?center=53.3478,-6.2397&zoom=14&size=280x180&key=placeholder" alt="" className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <svg className="w-8 h-8 mb-1" fill={C.brand} viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
                  <span className="bg-green-700 text-white text-xs font-bold px-3 py-1 rounded cursor-pointer">VOIR SUR CARTE</span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ Right Content ═══ */}
          <div className="flex-1 min-w-0">

            {/* Hotel title + stars + button */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: C.blue }}>
                  The Samuel Hotel
                  <span className="flex gap-0.5">
                    {[1,2,3,4].map(i => (
                      <svg key={i} className="w-4 h-4" fill={C.gold} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                    ))}
                  </span>
                </h1>
                <p className="text-sm mt-1" style={{ color: C.gray }}>Dublin, Ireland — City Centre</p>
                <div className="flex items-center gap-4 mt-2 text-sm" style={{ color: C.gray }}>
                  <span className="cursor-pointer hover:underline">↗ Partager ▾</span>
                  <span className="cursor-pointer hover:underline">♡ Enregistrer</span>
                  <span className="cursor-pointer hover:underline">🖨 Imprimer</span>
                </div>
              </div>
              <a href={TRAVELTODO_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:block px-4 py-2 rounded text-white text-xs font-bold" style={{ backgroundColor: C.brand }}>
                CHAMBRES & TARIFS
              </a>
            </div>

            {/* Main Image */}
            <div className="mt-4 relative rounded-lg overflow-hidden" style={{ height: 380 }}>
              <img src={IMAGES[imgIdx]} alt="The Samuel Hotel" className="w-full h-full object-cover cursor-pointer" onClick={() => setLightbox(imgIdx)} />
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center">
                <ChevronLeft className="w-5 h-5" style={{ color: C.dark }} />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center">
                <ChevronRight className="w-5 h-5" style={{ color: C.dark }} />
              </button>
              {/* Rating badge */}
              <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-1.5 shadow flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: C.dark }}>Excellent</span>
                <span className="text-sm font-bold px-2 py-0.5 rounded" style={{ color: C.brand, border: `2px solid ${C.brand}` }}>18/20</span>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-1.5 mt-2 overflow-x-auto">
              {IMAGES.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-[100px] h-[65px] object-cover rounded cursor-pointer flex-shrink-0 transition"
                  style={{ border: i === imgIdx ? `3px solid ${C.brand}` : "3px solid transparent", opacity: i === imgIdx ? 1 : 0.7 }}
                  onClick={() => setImgIdx(i)}
                />
              ))}
            </div>

            {/* ═══ Virtual Tour — PrimeSpace ═══ */}
            <div className="mt-8 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold" style={{ color: C.blue }}>
                  🏠 Visite Virtuelle 3D — <span style={{ color: C.brand }}>PrimeSpace</span>
                </h3>
              </div>
              <div className="rounded-lg overflow-hidden border shadow-sm" style={{ borderColor: C.border }}>
                <div className="relative pb-[80vh] sm:pb-[56.25%]">
                  <iframe
                    src={TOUR_PATH}
                    title="Visite 3D PrimeSpace — The Samuel Hotel"
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    allow="xr-spatial-tracking"
                  />
                </div>
                <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: C.bg }}>
                  <p className="text-xs" style={{ color: C.gray }}>Naviguez librement dans l'espace 3D</p>
                  <a href={TOUR_PATH} target="_blank" rel="noopener noreferrer" className="text-xs font-bold px-4 py-1.5 rounded text-white hover:opacity-90 transition" style={{ backgroundColor: C.brand }}>
                    Plein écran
                  </a>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="py-6 border-t" style={{ borderColor: C.border }}>
              <h3 className="text-base font-bold mb-4" style={{ color: C.blue }}>Services & équipements</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill={C.green} viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span className="text-sm" style={{ color: C.dark }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hébergement */}
            <div className="py-6 border-t" style={{ borderColor: C.border }}>
              <h3 className="text-base font-bold mb-3" style={{ color: C.blue }}>Hébergement</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: C.text }}>
                Overlooking the River Liffey and a short walk from O'Connell Street, The Samuel Hotel is one of the newest hotels in Dublin city centre with shops, restaurants and historic landmarks nearby.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: C.text }}>
                Whether you are looking for an activity-packed city break, a romantic getaway or visiting the city on business, The Samuel Hotel is the perfect hotel for every occasion. Named after Samuel Beckett, the hotel blends modern design with Dublin's rich literary heritage.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.text }}>
                Enjoy the Samuel Bar & Grill — a vibrant, modern restaurant with all-day dining, boasting a chargrill and seasonally inspired favourites as well as plenty of comfort food and healthy choices from around the world. The hotel also features a fully-equipped gym and meeting facilities.
              </p>
            </div>

            {/* Chambres */}
            <div className="py-6 border-t" style={{ borderColor: C.border }}>
              <h3 className="text-base font-bold mb-3" style={{ color: C.blue }}>Chambres disponibles</h3>
              <div className="space-y-2">
                {CHAMBRES.map((ch, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 rounded border" style={{ borderColor: C.border, backgroundColor: i % 2 === 0 ? C.bg : C.white }}>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.brand} strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    <span className="text-sm" style={{ color: C.dark }}>{ch}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pensions */}
            <div className="py-6 border-t" style={{ borderColor: C.border }}>
              <h3 className="text-base font-bold mb-3" style={{ color: C.blue }}>Pensions</h3>
              <div className="flex flex-wrap gap-2">
                {PENSIONS.map((p, i) => (
                  <span key={i} className="px-4 py-2 rounded text-sm font-medium text-white" style={{ backgroundColor: C.green }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Avis */}
            <div className="py-6 border-t" style={{ borderColor: C.border }}>
              <h3 className="text-base font-bold mb-4" style={{ color: C.blue }}>Avis des voyageurs</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center px-4 py-2 rounded border-2" style={{ borderColor: C.brand }}>
                  <span className="text-2xl font-bold" style={{ color: C.brand }}>18</span><span className="text-sm" style={{ color: C.brand }}>/20</span>
                </div>
                <div>
                  <p className="font-bold" style={{ color: C.dark }}>Excellent</p>
                  <p className="text-xs" style={{ color: C.gray }}>Based on 1,247 reviews</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {[
                  { label: "Business travellers", count: 412 },
                  { label: "Couples", count: 389 },
                  { label: "Friends", count: 298 },
                  { label: "Families", count: 148 },
                ].map((r, i) => (
                  <div key={i} className="border rounded p-3" style={{ borderColor: C.border }}>
                    <p className="text-lg font-bold" style={{ color: C.blue }}>{r.count}</p>
                    <p className="text-xs mt-1" style={{ color: C.gray }}>{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Floating social icons (right side) ═══ */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-0.5">
        <a href="https://api.whatsapp.com/send?phone=21670103103" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: "#25D366" }}>
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.252-.149-2.838.744.744-2.838-.149-.252A8 8 0 1112 20z"/></svg>
        </a>
        <a href="https://www.facebook.com/traveltodo.tn/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: "#3b5998" }}>
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
        </a>
        <a href="https://www.tiktok.com/@traveltodo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-black">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.88 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .55.04.81.1v-3.5a6.37 6.37 0 00-.81-.05A6.34 6.34 0 003.15 15.65a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.41a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.84z"/></svg>
        </a>
        <a href="https://www.instagram.com/traveltodo/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center" style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
      </div>

      {/* ═══ Footer ═══ */}
      <footer className="py-6 border-t" style={{ borderColor: C.border, backgroundColor: C.bg }}>
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between flex-wrap gap-4">
          <img src={TRAVELTODO_LOGO} alt="Traveltodo" style={{ height: 30 }} />
          <p className="text-xs" style={{ color: C.gray }}>©2024 Traveltodo - Tous droits réservés. Tél: +(216) 70 103 103</p>
        </div>
      </footer>
    </div>
  );
}
