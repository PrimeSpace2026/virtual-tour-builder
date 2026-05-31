import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

/* ─── Exact colors from eauxdecarpis.com ─── */
const C = {
  gold: "#C3AA82",
  goldDark: "#a8905e",
  navy: "#1e2d4d",
  navyDark: "#162240",
  white: "#ffffff",
  offWhite: "#f9f7f4",
  dark: "#222222",
  text: "#666666",
  lightText: "#999999",
  border: "#e5e5e5",
};

const FONT_HEADING = `'Cormorant Garamond', 'Georgia', serif`;
const FONT_BODY = `'Inter', 'Segoe UI', Arial, sans-serif`;

const TOUR_URL = "https://my.matterport.com/show?play=1&lang=en-US&m=paAemusufeL";

const LOGO = "https://eauxdecarpis.com/wp-content/uploads/2026/01/Logo-Carpis-Fn-white.png";
const POOL_IMG = "https://eauxdecarpis.com/wp-content/uploads/2026/01/Photo-Piscine-Korbus-2026.jpg";
const HOTEL_AERIAL = "https://eauxdecarpis.com/wp-content/uploads/2026/01/Vue-hotel.png";

const UNIVERS = [
  { name: "Espace Thermal & Marin", img: "https://eauxdecarpis.com/wp-content/uploads/2026/02/ZSK06810-610x610.jpg" },
  { name: "Espace Évasion", img: "https://eauxdecarpis.com/wp-content/uploads/2026/02/Evasion-610x610.jpg" },
  { name: "Espace Beauté & Séduction", img: "https://eauxdecarpis.com/wp-content/uploads/2026/01/Soin-Esthetique-1-610x610.jpg" },
  { name: "Espace Rééducation", img: "https://eauxdecarpis.com/wp-content/uploads/2026/02/reudication-carpis-610x610.jpg" },
  { name: "Espace Sérénité", img: "https://eauxdecarpis.com/wp-content/uploads/2026/01/Slide-1Carpis-1-610x610.jpg" },
  { name: "Espace Tradition", img: "https://eauxdecarpis.com/wp-content/uploads/2026/01/Hamam-1-610x610.jpg" },
  { name: "Espace Forme & Détente", img: "https://eauxdecarpis.com/wp-content/uploads/2026/02/Piscine-Eau-de-Mer-5-610x610.jpg" },
];

const SLIDES = [
  { num: "01", title: "Quand la Méditerranée sublime les saveurs", img: "https://eauxdecarpis.com/wp-content/uploads/2026/02/ZSK06496-HDR.jpg" },
  { num: "02", title: "Là où vos projets prennent vie", img: "https://eauxdecarpis.com/wp-content/uploads/2026/02/ZSK06778.jpg" },
  { num: "03", title: "Dépassez-vous, respirez la nature", img: "https://eauxdecarpis.com/wp-content/uploads/2026/02/R17.jpg" },
];

const NAV_LINKS = ["Le Centre", "Histoire", "L'Hôtel", "Destination", "Tarifs", "Contact"];

export default function TulipKorbousDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const universRef = useRef<HTMLDivElement>(null);

  const scrollUnivers = (dir: number) => {
    if (universRef.current) {
      universRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    }
  };

  return (
    <div style={{ fontFamily: FONT_BODY, color: C.dark, backgroundColor: C.white, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* ═══ Mobile Menu Overlay ═══ */}
      {menuOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center" style={{ backgroundColor: C.navyDark }}>
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white"><X className="w-7 h-7" /></button>
          <img src={LOGO} alt="Les eaux de Carpis" className="h-12 mb-10 opacity-80" />
          {NAV_LINKS.map(link => (
            <span key={link} className="text-xl tracking-wide cursor-pointer hover:opacity-80 transition py-2" style={{ fontFamily: FONT_HEADING, color: C.white }}>{link}</span>
          ))}
          <div className="flex gap-4 mt-10">
            {["Facebook", "TripAdvisor", "YouTube", "Instagram"].map(s => (
              <span key={s} className="w-10 h-10 rounded-full flex items-center justify-center text-xs text-white/60" style={{ border: `1px solid ${C.gold}44` }}>{s[0]}</span>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Header — fixed, dark, transparent ═══ */}
      <header className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-6 sm:px-10 py-5" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
        {/* Left — Menu */}
        <button onClick={() => setMenuOpen(true)} className="flex items-center gap-2 text-white text-sm tracking-wider hover:opacity-80 transition">
          <Menu className="w-5 h-5" />
          <span className="hidden sm:inline" style={{ fontFamily: FONT_HEADING, fontSize: 18 }}>Menu</span>
        </button>

        {/* Center — Logo */}
        <a href="https://eauxdecarpis.com" target="_blank" rel="noopener noreferrer" className="absolute left-1/2 -translate-x-1/2">
          <img src={LOGO} alt="Les eaux de Carpis" className="h-9 sm:h-11" />
        </a>

        {/* Right — LA BROCHURE */}
        <a
          href="https://heyzine.com/flip-book/7ec149933d.html#page/1"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 text-[11px] tracking-[0.15em] font-medium text-white uppercase transition hover:opacity-90"
          style={{ backgroundColor: C.gold }}
        >
          LA BROCHURE
        </a>
      </header>

      {/* ═══ HERO — Full-screen Virtual Tour (replaces video) ═══ */}
      <section className="relative w-full" style={{ height: "100vh" }}>
        <iframe
          src={TOUR_URL}
          title="Visite Virtuelle 3D — Les Eaux de Carpis"
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="xr-spatial-tracking"
        />
        {/* Dark overlay at bottom for text */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)", height: "40%" }} />
        <div className="absolute bottom-16 left-8 sm:left-16 z-10 pointer-events-none">
          <h1 className="text-4xl sm:text-5xl lg:text-[50px] text-white mb-2" style={{ fontFamily: FONT_HEADING }}>
            Les eaux de Carpis
          </h1>
          <p className="text-base sm:text-xl italic text-white/80" style={{ fontFamily: FONT_HEADING }}>
            l'alliance du thermalisme et de la thalassothérapie
          </p>
        </div>
      </section>

      {/* ═══ Gold subtitle line ═══ */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-xl sm:text-[26px] leading-relaxed" style={{ fontFamily: FONT_HEADING, color: C.gold }}>
          Korbous... Quand tes eaux thermales et marines<br />nous racontent 2000 ans d'histoire !
        </h2>
      </section>

      {/* ═══ La Tunisie, perle méditerranéenne — Two columns ═══ */}
      <section className="max-w-[1100px] mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Image left */}
          <div className="w-full md:w-1/2">
            <img src={POOL_IMG} alt="Piscine Korbous" className="w-full h-auto" />
          </div>
          {/* Text right */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl sm:text-[38px] leading-tight mb-6" style={{ fontFamily: FONT_HEADING, color: C.gold }}>
              La Tunisie, perle<br />méditerranéenne !
            </h2>
            <p className="text-sm leading-[1.8] mb-4" style={{ color: C.text }}>
              Le village de Korbous se love au pied d'un massif montagneux qui domine le somptueux golfe de Tunis, dans un paysage naturel rare, digne des plus belles baies de la Méditerranée.
            </p>
            <p className="text-sm leading-[1.8] mb-8" style={{ color: C.text }}>
              C'est dans ce décor majestueux que jaillissent des profondeurs de la terre des eaux chaudes réputées pour leurs vertus depuis l'ère carthaginoise et romaine : les sources de Carpis, nom antique de Korbous.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px]" style={{ backgroundColor: C.dark }} />
              <span className="text-xs tracking-[0.2em] uppercase font-medium cursor-pointer hover:opacity-70 transition" style={{ color: C.dark }}>LA DESTINATION</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Les eaux de Carpis & ses univers ═══ */}
      <section className="py-16 px-6">
        <div className="max-w-[1100px] mx-auto text-center mb-6">
          <h2 className="text-3xl sm:text-[40px] leading-tight mb-4" style={{ fontFamily: FONT_HEADING, color: C.gold }}>
            Les eaux de Carpis<br />& ses univers
          </h2>
          <p className="text-sm max-w-[620px] mx-auto leading-[1.8]" style={{ color: C.text }}>
            Les eaux de Carpis couvre une superficie de 3675 m² répartis sur quatre étages. Il dispose de son propre ascenseur et est accessible directement depuis les chambres de l'hôtel.
          </p>
        </div>
        <div className="max-w-[1100px] mx-auto mb-8">
          <p className="text-sm text-center max-w-[650px] mx-auto leading-[1.8]" style={{ color: C.text }}>
            Carpis déploie plusieurs univers dédiés au bien-être et à l'expérience : spa et détente, activités sportives et nature, espaces de réunions et incentives. Des lieux complémentaires, pensés pour se ressourcer, se dépasser, se retrouver et vivre des moments uniques, dans un cadre harmonieux et inspirant.
          </p>
        </div>
        {/* Horizontal carousel */}
        <div className="relative max-w-[1100px] mx-auto">
          <button onClick={() => scrollUnivers(-1)} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition hidden md:flex">
            <ChevronLeft className="w-5 h-5" style={{ color: C.dark }} />
          </button>
          <button onClick={() => scrollUnivers(1)} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition hidden md:flex">
            <ChevronRight className="w-5 h-5" style={{ color: C.dark }} />
          </button>
          <div ref={universRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-4" style={{ scrollbarWidth: "none" }}>
            {UNIVERS.map((u, i) => (
              <div key={i} className="flex-shrink-0 w-[260px] sm:w-[300px] relative overflow-hidden cursor-pointer group">
                <img src={u.img} alt={u.name} className="w-full h-[340px] object-cover transition group-hover:scale-105 duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
                  <span className="text-white text-sm bg-black/30 px-3 py-1.5 backdrop-blur-sm">{u.name}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2, 3].map(i => (
              <span key={i} className="w-2.5 h-2.5 rounded-full cursor-pointer transition" style={{ backgroundColor: i === 1 ? C.gold : C.border }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Divider ═══ */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-[1px]" style={{ backgroundColor: C.border }} />
      </div>

      {/* ═══ ROYAL TULIP KORBOUS BAY — Two columns ═══ */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Text left */}
          <div className="w-full md:w-2/5">
            <h2 className="text-[40px] sm:text-[50px] leading-[1.1] mb-1" style={{ fontFamily: FONT_HEADING, color: C.gold }}>
              ROYAL TULIP<br />KORBOUS BAY
            </h2>
            <h3 className="text-[26px] sm:text-[32px] font-semibold mb-6 leading-tight" style={{ fontFamily: FONT_HEADING, color: C.dark }}>
              THERMES &<br />THALASSO
            </h3>
            <p className="text-sm leading-[1.8] mb-4" style={{ color: C.text }}>
              Ouvert en 2022, le Royal Tulip Korbous Bay Thalasso & Springs a été bâti dans un site spectaculaire, encore préservé. Son design contemporain et raffiné abrite 160 chambres et suites ainsi que trois villas privées. Vue mer ou montagne : le décor change au fil du jour, pour des levers et couchers de soleil inoubliables.
            </p>
            <p className="text-sm leading-[1.8] mb-8" style={{ color: C.text }}>
              L'attention portée aux détails et la Conciergerie «Clefs d'Or» confirment le positionnement haut de gamme de l'établissement et garantissent une expérience personnalisée, du séjour bien-être à l'escapade découverte.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px]" style={{ backgroundColor: C.dark }} />
              <span className="text-xs tracking-[0.2em] uppercase font-medium cursor-pointer hover:opacity-70 transition" style={{ color: C.dark }}>L'HÔTEL</span>
            </div>
          </div>
          {/* Image right */}
          <div className="w-full md:w-3/5">
            <img src={HOTEL_AERIAL} alt="Royal Tulip Korbous Bay" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ═══ Dark navy section — "L'élégance d'un refuge cinq étoiles" ═══ */}
      <section className="py-20 px-6" style={{ backgroundColor: C.navy }}>
        <div className="max-w-[900px] mx-auto text-center mb-12">
          <p className="text-sm tracking-[0.15em] mb-4" style={{ color: C.gold }}>Royal Tulip Korbous Bay</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] leading-tight text-white" style={{ fontFamily: FONT_HEADING }}>
            L'élégance d'un refuge cinq étoiles entre mer, sources thermales et montagne
          </h2>
        </div>
        <div className="max-w-[700px] mx-auto text-center mb-14">
          <p className="text-sm leading-[1.8] text-white/80">
            Niché entre la montagne et la Méditerranée, le <strong className="text-white">Royal Tulip Korbous Bay</strong> incarne l'élégance d'un refuge cinq étoiles dédié au bien-être et à l'art de vivre. Idéalement situé au cœur d'un paysage naturel d'exception, l'hôtel propose <strong className="text-white">127 chambres, 33 suites et 3 villas avec piscine privative</strong>, pour la plupart ouvertes sur la mer. Chaque hébergement a été pensé comme un cocon de confort et de sérénité, alliant raffinement, intimité et services haut de gamme, afin d'offrir une expérience de séjour unique, entre détente absolue et horizon infini.
          </p>
        </div>

        {/* Numbered slider */}
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-end gap-4 mb-6">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                className="transition-all duration-300"
                style={{
                  opacity: slideIdx === i ? 1 : 0.25,
                  fontFamily: FONT_HEADING,
                  fontSize: slideIdx === i ? 70 : 45,
                  color: slideIdx === i ? C.gold : "rgba(255,255,255,0.5)",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </button>
            ))}
          </div>
          <div className="relative overflow-hidden">
            <img src={SLIDES[slideIdx].img} alt={SLIDES[slideIdx].title} className="w-full h-[280px] sm:h-[400px] object-cover transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
              <h3 className="text-2xl sm:text-3xl text-white" style={{ fontFamily: FONT_HEADING }}>
                {SLIDES[slideIdx].title}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ "Powered by PrimeSpace" ═══ */}
      <section className="py-10 px-6 text-center" style={{ backgroundColor: C.offWhite }}>
        <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: C.lightText }}>Visite virtuelle propulsée par</p>
        <p className="text-2xl italic" style={{ fontFamily: FONT_HEADING, color: C.gold }}>PrimeSpace</p>
      </section>

      {/* ═══ Contact Section ═══ */}
      <section className="py-16 px-6" style={{ backgroundColor: C.white }}>
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl sm:text-[38px] mb-12" style={{ fontFamily: FONT_HEADING, color: C.dark }}>Contactez-nous</h2>
          <div className="flex flex-col md:flex-row gap-16">
            {/* Form left */}
            <div className="w-full md:w-1/2 space-y-6">
              <div>
                <label className="block text-[13px] font-medium mb-2" style={{ color: C.dark }}>Your name</label>
                <input type="text" className="w-full border-b bg-transparent py-2 text-sm outline-none" style={{ borderColor: C.border, color: C.dark }} />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-2" style={{ color: C.dark }}>Your email</label>
                <input type="email" className="w-full border-b bg-transparent py-2 text-sm outline-none" style={{ borderColor: C.border, color: C.dark }} />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-2" style={{ color: C.dark }}>Subject</label>
                <input type="text" className="w-full border-b bg-transparent py-2 text-sm outline-none" style={{ borderColor: C.border, color: C.dark }} />
              </div>
              <div>
                <label className="block text-[13px] font-medium mb-2" style={{ color: C.dark }}>Your message (optional)</label>
                <textarea rows={3} className="w-full border-b bg-transparent py-2 text-sm outline-none resize-none" style={{ borderColor: C.border, color: C.dark }} />
              </div>
              <button className="px-8 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium text-white transition hover:opacity-90 mt-2" style={{ backgroundColor: C.gold }}>
                Submit
              </button>
            </div>
            {/* Info right */}
            <div className="w-full md:w-1/2 space-y-8">
              <div>
                <p className="text-sm mb-1" style={{ color: C.gold }}>Notre adresse</p>
                <p className="text-sm" style={{ color: C.dark }}>Aïn Oktor</p>
                <p className="text-sm" style={{ color: C.dark }}>8041 Soliman, Tunisie</p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: C.gold }}>Contact</p>
                <p className="text-sm" style={{ color: C.dark }}>directrice.thalasso@shpp.com.tn</p>
                <p className="text-sm" style={{ color: C.dark }}>Tel. +216 98 184 160</p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: C.gold }}>Réservation</p>
                <p className="text-sm" style={{ color: C.dark }}>Tel. +216 98 184 166</p>
                <p className="text-sm" style={{ color: C.dark }}>reservation @royaltulipkorbous .com</p>
              </div>
              <div>
                <p className="text-sm mb-3" style={{ color: C.gold }}>Suivez-nous</p>
                <div className="flex gap-3">
                  {["f", "✈", "▶", "📷"].map((icon, i) => (
                    <span key={i} className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm cursor-pointer transition hover:opacity-80" style={{ backgroundColor: C.gold }}>
                      {icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t py-8 px-6" style={{ borderColor: C.border }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <p className="text-xs" style={{ color: C.dark }}>© LES EAUX DE CARPIS 2026</p>
            <div className="flex items-center gap-2 text-xs flex-wrap justify-center" style={{ color: C.text }}>
              <span style={{ fontFamily: FONT_HEADING, color: C.gold }}>Les eaux de Carpis</span>
              <span>|</span>
              <span>directrice.thalasso@shpp.com.tn</span>
              <span>|</span>
              <span>Mob. +216 98 184 160</span>
            </div>
          </div>
          <div className="border-t pt-6 flex items-center justify-center gap-10 flex-wrap" style={{ borderColor: C.border }}>
            <div className="text-center">
              <p className="text-[11px] tracking-[0.12em] uppercase font-medium" style={{ color: C.dark }}>ROYAL TULIP</p>
              <p className="text-[9px] tracking-wider" style={{ color: C.text }}>KORBOUS BAY HOTEL</p>
              <p className="text-[8px]" style={{ color: C.text }}>THERMES & THALASSO</p>
            </div>
            <div className="text-center">
              <p className="text-[12px] tracking-[0.1em]" style={{ color: C.dark }}>CINQ MONDES</p>
              <p className="text-[9px]" style={{ color: C.text }}>PARIS</p>
            </div>
            <div className="text-center">
              <p className="text-[13px] tracking-wider uppercase" style={{ fontFamily: FONT_HEADING, color: C.dark }}>AMARANTE</p>
            </div>
          </div>
          <p className="text-center text-[11px] mt-6" style={{ color: C.lightText }}>
            Powered by <a href="https://antagency.net/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Ant Agency</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
