import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { slugify, tourPath } from "@/lib/slug";
import {
  ArrowLeft,
  Share2,
  Maximize,
  Minimize,
  X,
  MapPin,
  Ruler,
  Tag,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Building2,
  ExternalLink,
  Eye,
  ShoppingBag,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Layers,
  Phone,
  MessageCircle,
  Briefcase,
  BedDouble,
  Users,
  Wifi,
  Snowflake,
  Tv,
  Wine,
  Bath,
  DoorOpen,
  Lock,
  ChevronDown,
  Sparkles,
  UtensilsCrossed,
  Dumbbell,
  CalendarDays,
  Heart,
  Home,
  Star,
  Coffee,
  Music,
  Palmtree,
  ShieldCheck,
  PlayCircle,
  Clock,
  Banknote,
  Trophy,
  Droplets,
  Award,
  Mail,
  User,
  Menu,
} from "lucide-react";

const SDK_KEY = "b7uar4u57xdec0zw7dwygt7md";

interface TourData {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  surface: number | null;
  tourUrl: string;
  latitude: number | null;
  longitude: number | null;
  location: string;
  metadataJson?: string;
}

interface HotelRoom {
  name: string;
  tagSid: string;
  bedType: string;
  capacity: number | null;
  amenities: string[];
  imageUrl?: string;
  price?: number | null;
  currency?: string;
}

const AMENITY_ICONS: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  wifi: { icon: Wifi, label: "WiFi" },
  ac: { icon: Snowflake, label: "Air Conditioning" },
  tv: { icon: Tv, label: "TV" },
  minibar: { icon: Wine, label: "Mini-bar" },
  bathroom: { icon: Bath, label: "Bathroom" },
  balcony: { icon: DoorOpen, label: "Balcony" },
  safe: { icon: Lock, label: "Safe" },
};

/* ── Icon map for section/item keys → React icon components ── */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  bed: BedDouble, home: Building2, heart: Heart, sparkles: Sparkles,
  dumbbell: Dumbbell, utensils: UtensilsCrossed, coffee: Coffee,
  music: Music, users: Users, palmtree: Palmtree, star: Star,
  wifi: Wifi, tv: Tv, bath: Bath, briefcase: Briefcase,
  calendar: CalendarDays, shield: ShieldCheck, play: PlayCircle,
  layers: Layers, lock: Lock, snowflake: Snowflake, wine: Wine,
  balcony: DoorOpen, door: DoorOpen, clock: Clock, banknote: Banknote, trophy: Trophy, droplets: Droplets,
  award: Award, user: User,
};

const COACH_SPECIALTY_LABELS: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  musculation: { icon: Dumbbell, label: "Weight Training" },
  cardio: { icon: Heart, label: "Cardio" },
  yoga: { icon: Sparkles, label: "Yoga" },
  crossfit: { icon: Trophy, label: "CrossFit" },
  nutrition: { icon: Coffee, label: "Nutrition" },
  boxing: { icon: ShieldCheck, label: "Boxing" },
  stretching: { icon: Heart, label: "Stretching" },
  pilates: { icon: Sparkles, label: "Pilates" },
  cycling: { icon: PlayCircle, label: "Cycling" },
  swimming: { icon: Droplets, label: "Swimming" },
  rehab: { icon: ShieldCheck, label: "Rehabilitation" },
  weight_loss: { icon: Star, label: "Weight Loss" },
};

const GYM_EQUIPMENT_ICONS: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  cardio: { icon: Heart, label: "Cardio" },
  weights: { icon: Dumbbell, label: "Free Weights" },
  machines: { icon: Star, label: "Guided Machines" },
  crossfit: { icon: Trophy, label: "CrossFit" },
  pool: { icon: Droplets, label: "Pool" },
  sauna: { icon: Sparkles, label: "Sauna" },
  hammam: { icon: Bath, label: "Hammam" },
  boxing: { icon: ShieldCheck, label: "Ring / Boxing" },
  yoga: { icon: Heart, label: "Yoga Studio" },
  cycling: { icon: PlayCircle, label: "Cycling" },
  locker: { icon: Lock, label: "Locker Rooms" },
  parking: { icon: ShieldCheck, label: "Parking" },
  wifi: { icon: Wifi, label: "WiFi" },
  ac: { icon: Snowflake, label: "Air Conditioning" },
};

/* Section colors removed — modern monochrome design */

/* ── Canyon Ranch style collapsible section ── */
interface MenuSectionProps {
  title: string;
  iconKey: string;
  items: { name: string; iconKey: string; sub?: string; tagSid?: string; imageUrl?: string }[];
  amenities?: string[];
  onItemClick?: (tagSid: string) => void;
}

const HotelMenuSection = ({ title, iconKey, items, amenities, onItemClick }: MenuSectionProps) => {
  const [open, setOpen] = useState(false);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const Icon = ICON_MAP[iconKey] || Layers;

  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      {/* Section header — clean minimal */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 transition-all hover:bg-white/[0.05] group"
      >
        <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-white/[0.1] transition-colors">
          <Icon className="w-4 h-4 text-white/60" />
        </div>
        <span className="text-white/85 text-[13px] font-medium flex-1 text-left">{title}</span>
        <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Sub-items + amenity chips */}
      {open && (
        <div className="pb-1">
          {items.map((item, i) => {
            const ItemIcon = ICON_MAP[item.iconKey] || Layers;
            const hasTag = !!item.tagSid;
            return (
              <div
                key={i}
                onClick={() => hasTag && onItemClick?.(item.tagSid!)}
                className={`flex items-center gap-3 px-5 py-2.5 ml-4 mr-2 rounded-lg transition-all ${hasTag ? "cursor-pointer hover:bg-white/[0.06]" : "cursor-default"}`}
              >
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0 border border-white/10" />
                ) : (
                  <ItemIcon className="w-3.5 h-3.5 text-white/30 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-[12px] font-normal truncate">{item.name}</p>
                  {item.sub && <p className="text-white/30 text-[10px] truncate mt-0.5">{item.sub}</p>}
                </div>
                {hasTag && <ChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0" />}
              </div>
            );
          })}
          {amenities && amenities.length > 0 && (
            <div className="mx-4 mt-1">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setAmenitiesOpen(!amenitiesOpen); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-white/30 shrink-0" />
                <span className="text-white/40 text-[11px] font-medium flex-1 text-left uppercase tracking-wider">Equipment</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/25 transition-transform duration-300 ${amenitiesOpen ? "rotate-180" : ""}`} />
              </button>
              {amenitiesOpen && (
                <div className="px-2 pb-3 pt-1.5">
                  <div className="flex flex-wrap gap-1.5">
                    {amenities.map(key => {
                      const a = AMENITY_ICONS[key] || GYM_EQUIPMENT_ICONS[key];
                      const AIcon = a ? a.icon : Sparkles;
                      const label = a ? a.label : key;
                      return (
                        <span key={key} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/50 text-[10px] font-medium">
                          <AIcon className="w-3 h-3" />
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface TourItemData {
  id: number;
  tourId: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number | null;
  currency: string;
  externalUrl: string;
  brand: string;
  tagSid: string;
  showAddToCart?: boolean | null;
}

interface CartEntry {
  item: TourItemData;
  qty: number;
}

interface TourServiceData {
  id: number;
  tourId: number;
  name: string;
  description: string;
  imageUrl: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
}

interface ChamberData {
  id: number;
  tourId: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number | null;
  currency: string;
  tagSid?: string;
  bookingUrl?: string;
}

interface GymCoachData {
  name: string;
  title: string;
  imageUrl: string;
  description: string;
  specialties: string[];
  certifications: string;
  experience: string;
  schedule: string;
  price: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  tagSid: string;
}

interface TagAttachment {
  id: string;
  type: string; // MIME type or Matterport type (e.g. 'video/mp4', 'image/jpeg', 'application/pdf', 'text/html')
  src: string;
}

interface TagItem {
  sid: string;
  label: string;
  description: string;
  mediaUrl?: string;
  mediaSrc?: string;
  attachments?: TagAttachment[];
  anchorPosition?: { x: number; y: number; z: number };
}

function extractModelId(tourUrl: string): string | null {
  try {
    const url = new URL(tourUrl);
    return url.searchParams.get("m");
  } catch {
    return null;
  }
}

const CURRENCY_SYMBOLS: Record<string, string> = { EUR: "€", USD: "$", TND: "TND", GBP: "£" };

type MatterportFeatures = {
  // View modes
  dollhouse?: boolean;
  floorplan?: boolean;
  // UI controls
  title?: boolean;
  vr?: boolean;
  floorSelector?: boolean;
  search?: boolean;
  guidedTour?: boolean;
  highlights?: boolean;
  highlightReel?: boolean;
  nameplate?: boolean;
  brand?: boolean;
  help?: boolean;
  mls?: boolean;
  measurements?: boolean;
  autoTour?: boolean;
  views?: boolean;
  pin?: boolean;
  portal?: boolean;
};

function buildMatterportUrl(
  modelId: string,
  features: MatterportFeatures = {},
  extraParams: Record<string, string> = {},
  withSdkKey = false
): string {
  const b = (v?: boolean) => (v ? "1" : "0");
  const params = new URLSearchParams({
    m: modelId,
    play: "1",
    qs: "1",
    title: b(features.title),
    vr: b(features.vr),
    dh: b(features.dollhouse),
    f: b(features.floorSelector),
    search: b(features.search),
    hr: b(features.highlightReel),
    gt: b(features.guidedTour),
    hl: b(features.highlights),
    nt: b(features.nameplate),
    brand: b(features.brand),
    help: b(features.help),
    mls: features.mls ? "1" : "2",
    fp: b(features.floorplan),
    measurements: b(features.measurements),
    tour: b(features.autoTour),
    views: b(features.views),
    pin: b(features.pin),
    portal: b(features.portal),
    lang: "en",
  });
  for (const [k, v] of Object.entries(extraParams)) params.set(k, v);
  if (withSdkKey) params.set("applicationKey", SDK_KEY);
  return `https://my.matterport.com/show/?${params.toString()}`;
}

function buildEmbedUrl(tourUrl: string, _withSdkKey = false, features: MatterportFeatures = {}): string {
  const modelId = extractModelId(tourUrl);
  if (!modelId) return tourUrl;
  return buildMatterportUrl(modelId, features, {}, true);
}

// Display translation maps (data stored in DB stays in original language)
const CATEGORY_DISPLAY: Record<string, string> = {
  "Immobilier": "Real Estate",
  "Hôtellerie": "Hospitality",
  "Hotellerie": "Hospitality",
  "HÃ´tellerie": "Hospitality",
  "Commerce": "Retail",
  "Restaurant": "Restaurant",
  "Entreprise": "Business",
  "Wedding venue": "Wedding Venue",
  "Gym & Fitness": "Gym & Fitness",
};
const PROPERTY_TYPE_DISPLAY: Record<string, string> = {
  "Maison": "House",
  "Appartement": "Apartment",
  "Villa": "Villa",
  "Studio": "Studio",
  "Bureau": "Office",
  "Commerce": "Commercial",
  "Terrain": "Land",
  "Duplex": "Duplex",
};
const TRANSACTION_TYPE_DISPLAY: Record<string, string> = {
  "Location": "Rental",
  "Vente": "Sale",
  "Achat": "Purchase",
};
const CONDITION_DISPLAY: Record<string, string> = {
  "Neuf": "New",
  "Bon état": "Good condition",
  "Bon Ã©tat": "Good condition",
  "À rénover": "Needs renovation",
  "Ã rÃ©nover": "Needs renovation",
  "Rénové": "Renovated",
  "RÃ©novÃ©": "Renovated",
  "Ancien": "Old",
};
const HEATING_DISPLAY: Record<string, string> = {
  "Électrique": "Electric",
  "Ãlectrique": "Electric",
  "Gaz": "Gas",
  "Solaire": "Solar",
  "Fioul": "Oil",
  "Bois": "Wood",
  "Pompe à chaleur": "Heat pump",
  "Aucun": "None",
};
const displayCategory = (v?: string) => (v ? (CATEGORY_DISPLAY[v] || v) : "");
const displayPropertyType = (v?: string) => (v ? (PROPERTY_TYPE_DISPLAY[v] || v) : "");
const displayTransactionType = (v?: string) => (v ? (TRANSACTION_TYPE_DISPLAY[v] || v) : "");
const displayCondition = (v?: string) => (v ? (CONDITION_DISPLAY[v] || v) : "");
const displayHeating = (v?: string) => (v ? (HEATING_DISPLAY[v] || v) : "");
// Normalize category for conditional checks (handles French + mojibake + English)
const normalizeCategory = (v?: string): string => {
  if (!v) return "";
  const map: Record<string, string> = {
    "Hôtellerie": "Hôtellerie",
    "Hotellerie": "Hôtellerie",
    "HÃ´tellerie": "Hôtellerie",
    "Hospitality": "Hôtellerie",
    "Immobilier": "Immobilier",
    "Real Estate": "Immobilier",
    "Gym & Fitness": "Gym & Fitness",
  };
  return map[v] || v;
};

const TourViewer = () => {
  const { projectName: rawId } = useParams<{ projectName: string }>();
  const [resolvedId, setResolvedId] = useState<string | undefined>(
    rawId && /^\d+$/.test(rawId) ? rawId : undefined
  );
  const id = resolvedId;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isClean = searchParams.get("clean") === "true";
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sdkRef = useRef<any>(null);
  const sdkAttemptsRef = useRef(0);
  const tagsMapRef = useRef<Map<string, string>>(new Map()); // tagName (lowercase) → SID
  const savedTagsMapRef = useRef<Map<string, string>>(new Map()); // saved tags from DB: name (lowercase) → SID
  const sweepsRef = useRef<any[]>([]); // cached sweep objects from SDK
  const mattertagsRef = useRef<any[]>([]); // cached legacy Mattertag data (incl. media)
  const chamberSweepRef = useRef<string>(""); // tracks active chamber for auto-dismiss
  const visitIdRef = useRef<number | null>(null);
  const visitStartRef = useRef<number>(Date.now());

  // Unique visitor ID (persistent in localStorage)
  const visitorId = useRef<string>(
    localStorage.getItem("primespace_vid") || (() => { const vid = crypto.randomUUID(); localStorage.setItem("primespace_vid", vid); return vid; })()
  );

  // Analytics helper
  const trackEvent = useCallback((tourId: number, eventType: string, targetName: string, targetId: string) => {
    const vid = visitorId.current;
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tourId, visitorId: vid, eventType, targetName, targetId }),
    }).catch(() => {});
  }, []);

  const [tour, setTour] = useState<TourData | null>(null);
  const [allTours, setAllTours] = useState<TourData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [sdkConnected, setSdkConnected] = useState(false);
  const [sdkFailed, setSdkFailed] = useState(false);

  // Iframe deep-link state: changing iframeKey forces React to unmount/remount the iframe
  const [iframeSrc, setIframeSrc] = useState("");
  const [iframeKey, setIframeKey] = useState(0);

  // Tag/Item popup state
  const [selectedTag, setSelectedTag] = useState<TagItem | null>(null);

  // Floor selector state
  const [floors, setFloors] = useState<{index: number; name: string}[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(-1);

  // Tour Items (products) & Cart
  const [tourItems, setTourItems] = useState<TourItemData[]>([]);
  const tourItemsRef = useRef<TourItemData[]>([]);
  const [selectedItem, setSelectedItem] = useState<TourItemData | null>(null);
  const [hoveredItem, setHoveredItem] = useState<TourItemData | null>(null);
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null); // tag SID or name that was clicked in 3D
  const [cart, setCart] = useState<CartEntry[]>(() => {
    try {
      const saved = localStorage.getItem("primespace_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showCart, setShowCart] = useState(false);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("primespace_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);
  const [showProducts, setShowProducts] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showChambers, setShowChambers] = useState(false);
  const [tourServices, setTourServices] = useState<TourServiceData[]>([]);
  const [tourChambers, setTourChambers] = useState<ChamberData[]>([]);
  const [selectedService, setSelectedService] = useState<TourServiceData | null>(null);
  const [selectedChamber, setSelectedChamber] = useState<ChamberData | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<GymCoachData | null>(null);
  const [selectedImmoRoom, setSelectedImmoRoom] = useState<{ name: string; type: string; tagSid: string; imageUrl: string; description: string } | null>(null);
  const [gymCoaches, setGymCoaches] = useState<GymCoachData[]>([]);
  const [immoRooms, setImmoRooms] = useState<{ name: string; type: string; tagSid: string; imageUrl: string; description: string }[]>([]);
  const [bottomTab, setBottomTab] = useState<string>("products");
  const [bottomStripOpen, setBottomStripOpen] = useState(true);
  const [bottomStripConfig, setBottomStripConfig] = useState<{ products: boolean; services: boolean; chambers: boolean; customSections?: Record<string, boolean> }>({ products: true, services: true, chambers: true, customSections: {} });
  const [matterportFeatures, setMatterportFeatures] = useState<MatterportFeatures>({});
  const matterportFeaturesRef = useRef<MatterportFeatures>({});
  const userOpenedStripRef = useRef(false);

  // Auto-close bottom strip after 1 second on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userOpenedStripRef.current) setBottomStripOpen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Match a product by name/id/tagSid from a URL param
  const matchProduct = useCallback((param: string) => {
    const items = tourItemsRef.current.length > 0 ? tourItemsRef.current : tourItems;
    if (!param || items.length === 0) return null;
    const paramLower = param.trim().toLowerCase();
    return items.find((i) => {
      const nameSlug = i.name.trim().toLowerCase().replace(/\s+/g, "-");
      return nameSlug === paramLower || i.name.trim().toLowerCase() === paramLower || String(i.id) === param || (i.tagSid && i.tagSid.trim().toLowerCase() === paramLower);
    }) || null;
  }, [tourItems]);

  // Deep link: detect #product=xxx hash (from Matterport tag link — no page reload!)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/[#&]product=([^&]+)/);
      if (!match) return;
      const productParam = decodeURIComponent(match[1]);
      const matched = matchProduct(productParam);
      if (matched) {
        if (tour?.id) trackEvent(tour.id, "tag_click", matched.name, matched.tagSid || productParam);
        setActiveTagFilter(matched.tagSid || matched.name);
        setSelectedItem(matched);
      }
      // Clean hash
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };

    // Check on mount (page opened with hash)
    handleHash();

    // Listen for hash changes (user clicks tag link inside Matterport → navigates same page with new hash)
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [matchProduct]);

  // Also support ?product= query param (fallback for new tab opens)
  useEffect(() => {
    const productParam = searchParams.get("product");
    if (!productParam || tourItems.length === 0) return;
    const matched = matchProduct(productParam);
    if (matched) {
      if (tour?.id) trackEvent(tour.id, "tag_click", matched.name, matched.tagSid || productParam);
      setActiveTagFilter(matched.tagSid || matched.name);
      setSelectedItem(matched);
      searchParams.delete("product");
      setSearchParams(searchParams, { replace: true });
    }
  }, [tourItems, searchParams, matchProduct, tour?.id, trackEvent]);

  // Resolve slug → numeric id (allows /view/the-samuel as well as /view/31)
  useEffect(() => {
    if (!rawId) return;
    if (/^\d+$/.test(rawId)) {
      setResolvedId(rawId);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch("/api/tours")
      .then((r) => r.json())
      .then((tours) => {
        if (cancelled) return;
        const target = rawId.toLowerCase();
        const list = Array.isArray(tours) ? tours : [];
        const match = list.find(
          (t: { id?: number; name?: string }) =>
            slugify(t?.name || "") === target
        );
        if (match?.id != null) setResolvedId(String(match.id));
        else { setError(true); setLoading(false); }
      })
      .catch(() => {
        if (!cancelled) { setError(true); setLoading(false); }
      });
    return () => {
      cancelled = true;
    };
  }, [rawId]);

  // Fetch tour data
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setIframeLoaded(false);
    setSelectedTag(null);
    setSelectedItem(null);
    setSdkConnected(false);
    setSdkFailed(false);
    sdkAttemptsRef.current = 0;
    Promise.all([
      fetch(`/api/tours/${id}`).then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      }),
      fetch("/api/tours")
        .then((r) => r.json())
        .catch(() => []),
      fetch(`/api/tours/${id}/items`)
        .then((r) => r.json())
        .catch(() => []),
      fetch(`/api/tours/${id}/services`)
        .then((r) => r.json())
        .catch(() => []),
      fetch(`/api/tours/${id}/chambers`)
        .then((r) => r.json())
        .catch(() => []),
      fetch(`/api/tours/${id}/tags`)
        .then((r) => r.ok ? r.json() : [])
        .catch(() => []),
    ])
      .then(([tourData, tours, itemsData, servicesData, chambersData, tagsData]) => {
        setTour(tourData);
        setAllTours(tours);
        // Parse gym coaches from metadataJson
        if (normalizeCategory(tourData.category) === "Gym & Fitness" && tourData.metadataJson) {
          try {
            const meta = JSON.parse(tourData.metadataJson);
            setGymCoaches(Array.isArray(meta.coaches) ? meta.coaches : []);
          } catch { setGymCoaches([]); }
        } else { setGymCoaches([]); }
        // Parse immobilier rooms from metadataJson
        if (normalizeCategory(tourData.category) === "Immobilier" && tourData.metadataJson) {
          try {
            const meta = JSON.parse(tourData.metadataJson);
            setImmoRooms(Array.isArray(meta.immobilierRooms) ? meta.immobilierRooms : []);
          } catch { setImmoRooms([]); }
        } else { setImmoRooms([]); }
        // Parse bottom strip config from metadataJson
        if (tourData.metadataJson) {
          try {
            const meta = JSON.parse(tourData.metadataJson);
            if (meta.bottomStrip) setBottomStripConfig(meta.bottomStrip);
            if (meta.matterportFeatures && typeof meta.matterportFeatures === "object") {
              const mf: MatterportFeatures = { ...meta.matterportFeatures };
              setMatterportFeatures(mf);
              matterportFeaturesRef.current = mf;
            }
          } catch {}
        }
        const items = Array.isArray(itemsData) ? itemsData : [];
        setTourItems(items);
        tourItemsRef.current = items;
        const services = Array.isArray(servicesData) ? servicesData : [];
        const chambers = Array.isArray(chambersData) ? chambersData : [];
        setTourServices(services);
        setTourChambers(chambers);
        // Auto-select first available tab (respecting bottomStrip config)
        let bsc = { products: true, services: true, chambers: true };
        if (tourData.metadataJson) { try { const m = JSON.parse(tourData.metadataJson); if (m.bottomStrip) bsc = m.bottomStrip; } catch {} }
        if (chambers.length > 0 && bsc.chambers) setBottomTab("chambers");
        else if (normalizeCategory(tourData.category) === "Immobilier") {
          try { const m = JSON.parse(tourData.metadataJson || "{}"); if (Array.isArray(m.immobilierRooms) && m.immobilierRooms.length > 0) setBottomTab("rooms"); } catch {}
        }
        else if (items.length > 0 && bsc.products) setBottomTab("products");
        else if (services.length > 0 && bsc.services) setBottomTab("services");
        else if (normalizeCategory(tourData.category) === "Gym & Fitness") setBottomTab("coaches");
        // Build saved tags map (name → SID) for production tag resolution
        const savedMap = new Map<string, string>();
        if (Array.isArray(tagsData)) {
          for (const t of tagsData) {
            if (t.name && t.sid) {
              savedMap.set(t.name.trim().toLowerCase(), t.sid);
              savedMap.set(t.sid.trim().toLowerCase(), t.sid);
            }
          }
        }
        savedTagsMapRef.current = savedMap;
        // Set initial iframe URL
        const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        setIframeSrc(buildEmbedUrl(tourData.tourUrl, isLocal, matterportFeaturesRef.current));
        setLoading(false);
        setShowCard(true);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  // Track visit start + duration on unmount
  useEffect(() => {
    if (!tour?.id) return;
    visitStartRef.current = Date.now();
    const vid = visitorId.current;

    // Detect browser name
    const ua = navigator.userAgent;
    let browser = "Autre";
    if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Edg")) browser = "Edge";
    else if (ua.includes("OPR") || ua.includes("Opera")) browser = "Opera";
    else if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";

    // Get geo from free API + send visit
    const sendVisit = (country = "", city = "", latitude: number | null = null, longitude: number | null = null) => {
      fetch("/api/analytics/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourId: tour.id, visitorId: vid, browser, country, city, latitude, longitude }),
      }).then(r => r.json()).then(v => { visitIdRef.current = v.id; }).catch(() => {});
    };

    sendVisit();

    const sendDuration = () => {
      if (!visitIdRef.current) return;
      const dur = Math.round((Date.now() - visitStartRef.current) / 1000);
      navigator.sendBeacon?.("/api/analytics/visit/" + visitIdRef.current,
        new Blob([JSON.stringify({ durationSeconds: dur })], { type: "application/json" })
      );
    };
    window.addEventListener("beforeunload", sendDuration);
    return () => { sendDuration(); window.removeEventListener("beforeunload", sendDuration); };
  }, [tour?.id]);

  // SDK: only connect on localhost (key not authorized on production domains yet)
  const isLocalDev = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  useEffect(() => {
    if (!iframeLoaded || !iframeRef.current || !tour?.tourUrl) return;
    if (sdkAttemptsRef.current >= 1) return;
    sdkAttemptsRef.current = 1;

    let cancelled = false;

    const handleTagClick = async (sdk: any, tagSid: string) => {
      try {
        console.log("🏷️ Tag clicked — SID:", tagSid);
        let tagLabel = "";
        let tagData: TagItem | null = null;

        // Merge: try Tag data first, then legacy Mattertag data (has media for old tours)
        const mt = mattertagsRef.current.find((m: any) => m.sid === tagSid);
        if (mt) {
          console.log("📌 Matched Mattertag:", mt);
          tagLabel = mt.label || "";
        }

        if (sdk.Tag?.getData) {
          const tags = await sdk.Tag.getData();
          const found = tags.find((t: any) => t.sid === tagSid);
          if (found) {
            console.log("🏷️ Tag raw data:", found);
            console.log("🏷️ Tag media:", found.media, "mediaSrc:", found.mediaSrc);
            tagLabel = found.label || "";
            // Resolve attachments (videos, images, PDFs, iframes). Matterport bundle SDK
            // returns attachment IDs on the tag; full data is on sdk.Tag.attachments.
            let resolvedAttachments: TagAttachment[] = [];
            try {
              const attachmentIds: string[] = Array.isArray(found.attachments) ? found.attachments : [];
              console.log("🏷️ Attachment IDs:", attachmentIds);
              if (attachmentIds.length) {
                // Try new API: sdk.Tag.attachments.getData()
                let all: any[] = [];
                try {
                  if (sdk.Tag?.attachments?.getData) {
                    all = await sdk.Tag.attachments.getData();
                  }
                } catch (e1) { console.log("Tag.attachments.getData failed", e1); }
                // Fallback: some SDK versions expose data via subscribe (state object)
                if (!all.length && sdk.Tag?.attachments?.data) {
                  try {
                    all = await new Promise<any[]>((resolve) => {
                      const sub = sdk.Tag.attachments.data.subscribe({
                        onCollectionUpdated(collection: any) {
                          const arr: any[] = [];
                          for (const k of Object.keys(collection || {})) arr.push({ ...collection[k], id: k });
                          sub?.cancel?.();
                          resolve(arr);
                        },
                      });
                      setTimeout(() => { sub?.cancel?.(); resolve([]); }, 3000);
                    });
                  } catch (e2) { console.log("attachments subscribe failed", e2); }
                }
                console.log("🏷️ All attachments:", all);
                resolvedAttachments = all
                  .filter((a: any) => attachmentIds.includes(a.id))
                  .map((a: any) => ({ id: a.id, type: String(a.type || ""), src: a.src || "" }))
                  .filter((a: TagAttachment) => !!a.src);
              }
            } catch (e) { console.log("attachments fetch failed", e); }
            console.log("🏷️ Resolved attachments:", resolvedAttachments);
            tagData = {
              sid: found.sid, label: found.label || "", description: found.description || "",
              mediaUrl: found.media?.src || "", mediaSrc: found.mediaSrc || found.media?.src || "",
              attachments: resolvedAttachments,
              anchorPosition: found.anchorPosition,
            };
          }
        }

        // Fallback / merge: if no Tag data or no media found, use legacy Mattertag data
        if (mt) {
          const mtMediaSrc = mt.media?.src || "";
          if (!tagData) {
            tagData = {
              sid: mt.sid,
              label: mt.label || "",
              description: mt.description || "",
              mediaUrl: mtMediaSrc,
              mediaSrc: mtMediaSrc,
              attachments: [],
              anchorPosition: mt.anchorPosition,
            };
          } else if (!tagData.mediaSrc && mtMediaSrc) {
            tagData.mediaSrc = mtMediaSrc;
            tagData.mediaUrl = mtMediaSrc;
          }
          if (mt.description && !tagData.description) tagData.description = mt.description;
        }

        const matchedItem = tourItemsRef.current.find((i) => {
          if (!i.tagSid) return false;
          if (i.tagSid === tagSid) return true;
          if (tagLabel && i.tagSid.trim().toLowerCase() === tagLabel.trim().toLowerCase()) return true;
          return false;
        });

        if (matchedItem) {
          // Track tag click
          if (tour?.id) trackEvent(tour.id, "tag_click", matchedItem.name, tagSid);
          // Close native Matterport popup immediately
          try { if (sdk.Mattertag?.close) sdk.Mattertag.close(tagSid); } catch {}
          try { if (sdk.Tag?.close) sdk.Tag.close(tagSid); } catch {}
          // Show custom product popup instead
          setSelectedItem(matchedItem);
          setActiveTagFilter(matchedItem.tagSid);
          return;
        }
        if (tagData) {
          if (tour?.id) trackEvent(tour.id, "tag_click", tagData.label || tagSid, tagSid);
          // Let native popup handle media
        }
      } catch (err) {
        console.log("Tag data error:", err);
      }
    };

    const connectSdk = async () => {
      try {
        const modelId = extractModelId(tour.tourUrl);
        if (!modelId) throw new Error("No model ID");

        // Use @matterport/sdk setupSdk which handles cross-origin iframe communication
        const { setupSdk } = await import("@matterport/sdk");
        console.log("[SDK] Connecting via setupSdk...");
        const sdk = await Promise.race([
          setupSdk(SDK_KEY, { iframe: iframeRef.current!, space: modelId }),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error("SDK timeout")), 30000)),
        ]) as any;

        if (cancelled) return;
        console.log("✅ SDK connected (setupSdk)");

        // Wait for model to be fully loaded (PLAYING phase) before querying data
        await new Promise<void>((resolve) => {
          const sub = sdk.App.state.subscribe((appState: any) => {
            if (appState.phase === sdk.App.Phase.PLAYING) {
              sub?.cancel?.();
              resolve();
            }
          });
        });
        console.log("✅ Model fully loaded (PLAYING)");

        // Get floor data for custom floor selector
        try {
          const floorsData = await sdk.Floor.getData();
          if (floorsData && floorsData.totalFloors > 1) {
            const floorList = floorsData.floorNames.map((name: string, i: number) => ({ index: i, name: name || `Floor ${i}` }));
            setFloors(floorList);
            setCurrentFloor(floorsData.currentFloor);
          }
          // Subscribe to current floor changes
          sdk.Floor.current.subscribe((f: any) => {
            if (f && typeof f.sequence === "number") setCurrentFloor(f.sequence);
          });
        } catch (err) { console.log("Floor data error:", err); }

        try {
          if (sdk.Tag?.getData) {
            const allTags = await sdk.Tag.getData();
            console.log("🏷️ Tags:", allTags.map((t: any) => ({ sid: t.sid, label: t.label })));
            // Cache tag name → SID mapping
            allTags.forEach((t: any) => {
              if (t.label) tagsMapRef.current.set(t.label.trim().toLowerCase(), t.sid);
              if (t.sid) tagsMapRef.current.set(t.sid, t.sid);
            });
          }
        } catch {}

        // Also read legacy Mattertag data
        try {
          if (sdk.Mattertag?.getData) {
            const mts = await sdk.Mattertag.getData();
            mattertagsRef.current = mts;
          }
        } catch (e) { console.log("Mattertag.getData failed", e); }

        // Cache sweep data via subscription
        try {
          sdk.Sweep.data.subscribe({
            onCollectionUpdated(collection: any) {
              try {
                const arr: any[] = [];
                if (collection && typeof collection === "object") {
                  for (const key of Object.keys(collection)) {
                    const item = collection[key];
                    if (item && typeof item === "object") {
                      arr.push({ ...item, sid: key });
                    }
                  }
                }
                sweepsRef.current = arr;
                console.log(`📍 Cached ${arr.length} sweeps`, arr.length > 0 ? Object.keys(arr[0]) : "empty");
              } catch (innerErr) {
                console.log("Sweep parse error:", innerErr, "collection type:", typeof collection, collection);
              }
            }
          });
        } catch (e) { console.log("Sweep cache error:", e); }

        // Log sweep name when navigating to a new panorama
        try {
          let lastSweep = "";
          let sweepsSinceChamber = 0;
          sdk.Camera.pose.subscribe((pose: any) => {
            if (pose?.sweep && pose.sweep !== lastSweep) {
              lastSweep = pose.sweep;
              const sweeps = sweepsRef.current;
              const idx = sweeps.findIndex((s: any) => s.sid === pose.sweep);
              const sweep = idx >= 0 ? sweeps[idx] : null;
              const floor = sweep?.floorInfo?.sequence ?? sweep?.floor ?? "?";
              console.log(`🔵 Sweep: "${pose.sweep}" — View ${idx >= 0 ? idx + 1 : "?"} / ${sweeps.length} — Floor ${floor}`);

              // Auto-dismiss Book Now when user navigates away from chamber
              if (chamberSweepRef.current) {
                sweepsSinceChamber++;
                if (sweepsSinceChamber > 1) {
                  setSelectedChamber(null);
                  chamberSweepRef.current = "";
                  sweepsSinceChamber = 0;
                }
              } else {
                sweepsSinceChamber = 0;
              }
            }
          });
        } catch {}

        // NOW set SDK as ready — model is loaded & tags are cached
        if (cancelled) return;
        // Hide remaining UI elements via SDK Settings
        try {
          const settingsUpdates: Promise<any>[] = [
            // Explicitly enable tag labels/billboards so native popup content (video, images) shows
            sdk.Settings.update('labels', true),
          ];
          if (!matterportFeaturesRef.current.help) {
            settingsUpdates.push(sdk.Settings.update('help', false));
          }
          if (!matterportFeaturesRef.current.highlightReel) {
            settingsUpdates.push(sdk.Settings.update('highlightReel', false));
          }
          await Promise.allSettled(settingsUpdates);
          console.log("✅ SDK UI elements hidden");
        } catch (e) { console.log("Settings update error:", e); }

        sdkRef.current = sdk;
        setSdkConnected(true);
        console.log("✅ SDK ready for navigation");

        // Staged objects are managed via admin-only VirtualStaging page

        // Listen for model state changes (e.g. defurnished toggle) and restore tags
        try {
          const restoreTags = async () => {
            try {
              // Small delay to let Matterport finish state transition
              await new Promise(r => setTimeout(r, 1500));
              // Re-read tags to refresh visibility
              if (sdk.Tag?.getData) {
                const tags = await sdk.Tag.getData();
                console.log("🔄 Tags restored after state change:", tags.length);
                tags.forEach((t: any) => {
                  if (t.label) tagsMapRef.current.set(t.label.trim().toLowerCase(), t.sid);
                  if (t.sid) tagsMapRef.current.set(t.sid, t.sid);
                });
              }
            } catch (e) { console.log("Tag restore error:", e); }
          };

          // Listen for mode changes (Dollhouse ↔ Inside ↔ Floorplan, and Defurnished toggle)
          if (sdk.Mode?.Event?.CHANGE_START) {
            sdk.on(sdk.Mode.Event.CHANGE_START, () => {
              console.log("🔄 Mode change detected");
            });
          }
          if (sdk.Mode?.Event?.CHANGE_END) {
            sdk.on(sdk.Mode.Event.CHANGE_END, () => {
              console.log("✅ Mode change ended — restoring tags");
              restoreTags();
            });
          }

          // Listen for model state/sweep changes that may affect tag visibility
          if (sdk.Sweep?.Event?.EXIT) {
            sdk.on(sdk.Sweep.Event.EXIT, () => restoreTags());
          }
        } catch (e) { console.log("Mode listener error:", e); }

        if (sdk.Tag?.Event?.CLICK) {
          console.log("📌 Subscribing to Tag.Event.CLICK");
          sdk.on(sdk.Tag.Event.CLICK, (tagSid: string) => {
            console.log("🖱️ Tag.Event.CLICK fired:", tagSid);
            handleTagClick(sdk, tagSid);
          });
        } else {
          console.log("⚠️ sdk.Tag.Event.CLICK not available");
        }
        if (sdk.Mattertag?.Event?.CLICK) {
          console.log("📌 Subscribing to Mattertag.Event.CLICK");
          sdk.on(sdk.Mattertag.Event.CLICK, (tagSid: string) => {
            console.log("🖱️ Mattertag.Event.CLICK fired:", tagSid);
            handleTagClick(sdk, tagSid);
          });
        }
        if (sdk.Mattertag?.Event?.HOVER) {
          sdk.on(sdk.Mattertag.Event.HOVER, (hovering: boolean, tagSid: string) => {
            if (hovering) console.log("👆 Mattertag hover:", tagSid);
          });
        }

        // Prevent native Matterport popup from appearing on product tags
        // Note: we handle popup close manually in handleTagClick
        // Do NOT use allowAction(false) as it blocks navigateToTag fly transitions
      } catch (err) {
        if (cancelled) return;
        console.log("⚠️ SDK failed on localhost:", err);
        setSdkFailed(true);
      }
    };

    connectSdk();
    return () => { cancelled = true; };
  }, [iframeLoaded, tour?.tourUrl]);

  // Navigation
  const currentIndex = allTours.findIndex((t) => t.id === tour?.id);
  const prevTour = currentIndex > 0 ? allTours[currentIndex - 1] : null;
  const nextTour =
    currentIndex < allTours.length - 1 ? allTours[currentIndex + 1] : null;

  // Cart functions
  const addToCart = useCallback((item: TourItemData) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) return prev.map((c) => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { item, qty: 1 }];
    });
    if (tour?.id) trackEvent(tour.id, "add_to_cart", item.name, String(item.id));
  }, [tour?.id, trackEvent]);

  const updateQty = useCallback((itemId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === itemId ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((itemId: number) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  }, []);

  const cartTotal = cart.reduce((sum, c) => sum + (c.item.price || 0) * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  // Navigate to a product's tag in the 3D tour
  const navigateToProduct = useCallback((item: TourItemData) => {
    setShowProducts(false);
    if (tour?.id) trackEvent(tour.id, "product_click", item.name, String(item.id));

    if (item.tagSid && tour?.tourUrl) {
      const tagKey = item.tagSid.trim().toLowerCase();
      const resolvedSid = tagsMapRef.current.get(tagKey) || savedTagsMapRef.current.get(tagKey) || item.tagSid;
      const sdk = sdkRef.current;

      // Helper: iframe deep-link fallback
      const iframeFallback = () => {
        const modelId = extractModelId(tour.tourUrl);
        if (!modelId) return;
        const tagUrl = buildMatterportUrl(modelId, matterportFeaturesRef.current, { tag: resolvedSid, mt: "1", pin: "1" });
        console.log(`🎯 Iframe deep link to tag: ${resolvedSid}`);
        setIframeSrc(tagUrl);
        setIframeKey((k) => k + 1);
        setIframeLoaded(false);
      };

      // Primary: use SDK Mattertag.navigateToTag for direct fly-to
      if (sdk) {
        const tryNavigate = async () => {
          try {
            // Check if this is a sweep ID first
            const sweeps = sweepsRef.current;
            const isSweepId = sweeps.length > 0 && sweeps.some((s: any) => s.sid === resolvedSid || s.id === resolvedSid || s.uuid === resolvedSid);
            if (isSweepId && sdk.Sweep?.moveTo) {
              console.log(`📍 Product → Sweep.moveTo("${resolvedSid}")`);
              await sdk.Sweep.moveTo(resolvedSid, { transition: sdk.Sweep.Transition?.FLY || 2 });
              setSelectedItem(item);
              return;
            }

            // Try direct Mattertag.navigateToTag (fly transition)
            if (sdk.Mattertag?.navigateToTag) {
              const flyTransition = sdk.Mattertag.Transition?.FLY_IN || sdk.Mattertag.Transition?.FLYOVER || "transition.fly";
              console.log(`🎯 Mattertag.navigateToTag("${resolvedSid}", ${flyTransition})`);
              await sdk.Mattertag.navigateToTag(resolvedSid, flyTransition);
              console.log(`✅ Flew to tag: ${resolvedSid}`);
              // Close native Matterport popup and show custom product popup
              try { sdk.Mattertag.close(resolvedSid); } catch {}
              setSelectedItem(item);
              return;
            }

            // Fallback: try Tag.open if Mattertag API not available
            if (sdk.Tag?.open) {
              console.log(`🎯 Tag.open("${resolvedSid}")`);
              await sdk.Tag.open(resolvedSid);
              console.log(`✅ Opened tag: ${resolvedSid}`);
              // Close native popup and show custom product popup
              try { sdk.Tag.close(resolvedSid); } catch {}
              setSelectedItem(item);
              return;
            }

            // Last resort: iframe
            console.log("⚠️ No SDK fly method available, using iframe");
            iframeFallback();
            setSelectedItem(item);
          } catch (err) {
            console.log("SDK fly failed, trying Sweep.moveTo as last SDK resort:", err);
            try {
              if (sdk.Sweep?.moveTo) {
                await sdk.Sweep.moveTo(resolvedSid, { transition: sdk.Sweep.Transition?.FLY || 2 });
                setSelectedItem(item);
                return;
              }
            } catch (sweepErr) {
              console.log("Sweep.moveTo also failed:", sweepErr);
            }
            iframeFallback();
            setSelectedItem(item);
          }
        };
        tryNavigate();
      } else {
        // No SDK — use iframe deep link + show custom popup
        iframeFallback();
        setSelectedItem(item);
      }
    } else {
      // No tag — just open the popup so the user can see product details
      setSelectedItem(item);
    }
  }, [tour?.id, tour?.tourUrl, trackEvent]);

  // Navigate to a chamber's tag in the 3D tour (same logic as navigateToProduct)
  const navigateToChamber = useCallback((ch: ChamberData) => {
    if (tour?.id) trackEvent(tour.id, "chamber_click", ch.name, String(ch.id));

    // Mark chamber as entered immediately so the Back button flies to Reception
    // even before the Book Now popup appears.
    chamberSweepRef.current = ch.tagSid || "active";

    // Show Book Now popup immediately
    const showPopupLater = () => { chamberSweepRef.current = ch.tagSid || "active"; setSelectedChamber(ch); };

    if (ch.tagSid && tour?.tourUrl) {
      const tagKey = ch.tagSid.trim().toLowerCase();
      const resolvedSid = tagsMapRef.current.get(tagKey) || savedTagsMapRef.current.get(tagKey) || ch.tagSid;
      const sdk = sdkRef.current;

      const iframeFallback = () => {
        const modelId = extractModelId(tour.tourUrl);
        if (!modelId) return;
        const tagUrl = buildMatterportUrl(modelId, matterportFeaturesRef.current, { tag: resolvedSid, mt: "1", pin: "1" });
        console.log(`🏨 Chamber iframe deep link to tag: ${resolvedSid}`);
        setIframeSrc(tagUrl);
        setIframeKey((k) => k + 1);
        setIframeLoaded(false);
      };

      if (sdk) {
        const tryNavigate = async () => {
          try {
            const sweeps = sweepsRef.current;
            const isSweepId = sweeps.length > 0 && sweeps.some((s: any) => s.sid === resolvedSid || s.id === resolvedSid || s.uuid === resolvedSid);
            if (isSweepId && sdk.Sweep?.moveTo) {
              console.log(`📍 Chamber → Sweep.moveTo("${resolvedSid}")`);
              await sdk.Sweep.moveTo(resolvedSid, { transition: sdk.Sweep.Transition?.FLY || 2 });
              showPopupLater();
              return;
            }

            if (sdk.Mattertag?.navigateToTag) {
              const flyTransition = sdk.Mattertag.Transition?.FLY_IN || sdk.Mattertag.Transition?.FLYOVER || "transition.fly";
              console.log(`🏨 Mattertag.navigateToTag("${resolvedSid}", ${flyTransition})`);
              await sdk.Mattertag.navigateToTag(resolvedSid, flyTransition);
              console.log(`✅ Flew to chamber tag: ${resolvedSid}`);
              try { sdk.Mattertag.close(resolvedSid); } catch {}
              showPopupLater();
              return;
            }

            if (sdk.Tag?.open) {
              console.log(`🏨 Tag.open("${resolvedSid}")`);
              await sdk.Tag.open(resolvedSid);
              try { sdk.Tag.close(resolvedSid); } catch {}
              showPopupLater();
              return;
            }

            iframeFallback();
            showPopupLater();
          } catch (err) {
            console.log("Chamber SDK fly failed, trying Sweep.moveTo:", err);
            try {
              if (sdk.Sweep?.moveTo) {
                await sdk.Sweep.moveTo(resolvedSid, { transition: sdk.Sweep.Transition?.FLY || 2 });
                showPopupLater();
                return;
              }
            } catch (sweepErr) {
              console.log("Sweep.moveTo also failed:", sweepErr);
            }
            iframeFallback();
            showPopupLater();
          }
        };
        tryNavigate();
      } else {
        iframeFallback();
        showPopupLater();
      }
    } else {
      setSelectedChamber(ch);
    }
  }, [tour?.id, tour?.tourUrl, trackEvent]);

  // Resolve sweep:floor:index SID or raw sweep UUID to actual sweep ID for SDK navigation
  const resolveSweepSid = useCallback((sid: string): { isSweep: boolean; sweepId?: string } => {
    // Match sweep:floor:index format
    const match = sid.match(/^sweep:(\d+):(\d+)$/);
    if (match) {
      const floor = parseInt(match[1], 10);
      const index = parseInt(match[2], 10) - 1; // convert 1-based to 0-based
      const sweeps = sweepsRef.current;
      if (!sweeps.length) return { isSweep: true }; // is a sweep but no data cached
      const floorSweeps = sweeps.filter((s: any) => s.floor === floor || s.floorInfo?.sequence === floor);
      const target = floorSweeps[index] || sweeps[index];
      return { isSweep: true, sweepId: target?.sid || target?.id || target?.uuid };
    }
    // Check if it's a raw sweep UUID by matching against cached sweeps
    const sweeps = sweepsRef.current;
    if (sweeps.length > 0) {
      const found = sweeps.find((s: any) =>
        s.sid === sid || s.id === sid || s.uuid === sid
      );
      if (found) return { isSweep: true, sweepId: found.sid || found.id || found.uuid };
    }
    return { isSweep: false };
  }, []);

  // Navigate to a Matterport tag by SID (used by hotel menu sections)
  // Uses iframe deep-link method (same as product navigation fallback)
  const navigateToMenuTag = useCallback((tagSid: string) => {
    // Handle direct Matterport sweep URL
    if (tagSid.startsWith("http")) {
      setIframeSrc(tagSid);
      setIframeKey((k) => k + 1);
      setIframeLoaded(false);
      return;
    }
    // Handle sweep: SID — navigate via SDK or iframe with sweep index
    const { isSweep, sweepId } = resolveSweepSid(tagSid);
    if (isSweep) {
      const sdk = sdkRef.current;
      if (sdk?.Sweep?.moveTo && sweepId) {
        console.log(`📍 Sweep.moveTo("${sweepId}") from ${tagSid}`);
        sdk.Sweep.moveTo(sweepId, { transition: sdk.Sweep.Transition?.FLY || 2 })
          .catch(() => console.log("Sweep.moveTo failed, using iframe fallback"));
        return;
      }
      // Iframe fallback: use ss= param with sweep index
      if (tour?.tourUrl) {
        const modelId = extractModelId(tour.tourUrl);
        const match = tagSid.match(/^sweep:(\d+):(\d+)$/);
        if (modelId && match) {
          const sweepIdx = parseInt(match[2], 10) - 1;
          const sweepUrl = buildMatterportUrl(modelId, matterportFeaturesRef.current, { ss: String(sweepIdx) });
          console.log(`📍 Sweep iframe fallback: ss=${sweepIdx}`);
          setIframeSrc(sweepUrl);
          setIframeKey((k) => k + 1);
          setIframeLoaded(false);
          return;
        }
      }
      return;
    }
    if (!tour?.tourUrl) return;
    const tagKey = tagSid.trim().toLowerCase();
    const resolvedSid = tagsMapRef.current.get(tagKey) || savedTagsMapRef.current.get(tagKey) || tagSid;
    const modelId = extractModelId(tour.tourUrl);
    if (!modelId) return;
    const tagUrl = buildMatterportUrl(modelId, matterportFeaturesRef.current, { tag: resolvedSid, mt: "1", pin: "1" });
    console.log(`🏷️ Menu tag → iframe deep link: ${resolvedSid}`);
    setIframeSrc(tagUrl);
    setIframeKey((k) => k + 1);
    setIframeLoaded(false);
  }, [tour?.tourUrl, resolveSweepSid]);

  // FLY directly to a tag using SDK Mattertag.navigateToTag
  const flyToTag = useCallback((tagSid: string) => {
    // Handle direct Matterport sweep URL (e.g. https://my.matterport.com/show/?m=xxx&ss=48&sr=-.12,-.53)
    if (tagSid.startsWith("http")) {
      console.log(`🔗 Direct sweep link: ${tagSid}`);
      setIframeSrc(tagSid);
      setIframeKey((k) => k + 1);
      setIframeLoaded(false);
      setShowCard(false);
      return;
    }
    // Handle sweep: SID — fly to sweep position
    const { isSweep, sweepId } = resolveSweepSid(tagSid);
    if (isSweep) {
      const sdk = sdkRef.current;
      if (sdk?.Sweep?.moveTo && sweepId) {
        console.log(`📍 FLY to sweep: ${sweepId} (from ${tagSid})`);
        sdk.Sweep.moveTo(sweepId, { transition: sdk.Sweep.Transition?.FLY || 2 })
          .catch(() => navigateToMenuTag(tagSid));
      } else {
        navigateToMenuTag(tagSid);
      }
      setShowCard(false);
      return;
    }
    const sdk = sdkRef.current;
    if (!sdk?.Mattertag?.navigateToTag) {
      navigateToMenuTag(tagSid);
      return;
    }
    const tagKey = tagSid.trim().toLowerCase();
    const resolvedSid = tagsMapRef.current.get(tagKey) || savedTagsMapRef.current.get(tagKey) || tagSid;
    const fly = sdk.Mattertag.Transition?.FLY_IN || "transition.fly";
    console.log(`🎯 FLY to tag: ${resolvedSid}`);
    sdk.Mattertag.navigateToTag(resolvedSid, fly).then(() => {
      console.log(`✅ Flew to tag: ${resolvedSid}`);
      const closeNative = () => {
        try { sdk.Mattertag?.close?.(resolvedSid); } catch {}
        try { sdk.Tag?.close?.(resolvedSid); } catch {}
      };
      closeNative();
      setTimeout(closeNative, 200);
      setTimeout(closeNative, 500);
    }).catch(async (err: any) => {
      console.log("Mattertag.navigateToTag failed, trying Sweep.moveTo:", err);
      // Fallback: maybe it's a sweep UUID, not a tag SID
      try {
        if (sdk.Sweep?.moveTo) {
          await sdk.Sweep.moveTo(resolvedSid, { transition: sdk.Sweep.Transition?.FLY || 2 });
          console.log(`✅ Sweep.moveTo succeeded: ${resolvedSid}`);
          return;
        }
      } catch (sweepErr: any) {
        console.log("Sweep.moveTo also failed:", sweepErr);
      }
      navigateToMenuTag(tagSid);
    });
    setShowCard(false);
  }, [navigateToMenuTag, resolveSweepSid]);

  // Navigate to a specific floor
  const navigateToFloor = useCallback((floorIndex: number) => {
    const sdk = sdkRef.current;
    if (!sdk?.Floor?.moveTo) return;
    sdk.Floor.moveTo(floorIndex).catch(() => {});
  }, []);

  // Fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // Copy link
  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedImmoRoom) setSelectedImmoRoom(null);
        else if (selectedChamber) { setSelectedChamber(null); chamberSweepRef.current = ""; }
        else if (selectedCoach) setSelectedCoach(null);
        else if (selectedService) setSelectedService(null);
        else if (selectedTag) setSelectedTag(null);
        else if (selectedItem) setSelectedItem(null);
        else if (activeTagFilter) setActiveTagFilter(null);
        else if (showCart) setShowCart(false);
        else if (showChambers) setShowChambers(false);
        else if (showServices) setShowServices(false);
        else if (showProducts) setShowProducts(false);
        else if (showShare) setShowShare(false);
        else setShowCard(false);
      }
      if ((e.key === "f" || e.key === "F") && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) toggleFullscreen();
      if (!isClean && e.key === "ArrowLeft" && prevTour) navigate(tourPath(prevTour));
      if (!isClean && e.key === "ArrowRight" && nextTour)
        navigate(tourPath(nextTour));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    selectedTag,
    selectedItem,
    selectedCoach,
    selectedImmoRoom,
    showShare,
    showCard,
    showCart,
    showProducts,
    toggleFullscreen,
    prevTour,
    nextTour,
    navigate,
    isClean,
  ]);

  // Auto-hide card only on initial load, not on manual toggle
  const cardManuallyToggled = useRef(false);
  useEffect(() => {
    if (showCard && iframeLoaded && !cardManuallyToggled.current) {
      const t = setTimeout(() => setShowCard(false), 2000);
      return () => clearTimeout(t);
    }
  }, [showCard, iframeLoaded]);

  // Loading
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a14] flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 animate-spin" />
          </div>
          <p className="text-white/50 text-sm tracking-wider uppercase">
            Chargement...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error || !tour) {
    return (
      <div className="fixed inset-0 bg-[#0a0a14] flex items-center justify-center z-50">
        <div className="text-center max-w-md px-6">
          <Building2 className="w-16 h-16 text-purple-400/40 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Tour Not Found
          </h2>
          <p className="text-white/40 mb-8">
            This tour does not exist or has been deleted.
          </p>
          <button
            onClick={() => navigate("/portfolio")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a14] z-50 overflow-hidden select-none flex flex-col">
      {/* ===== TOP: MATTERPORT 3D VIEWER ===== */}
      <div className="relative flex-1 min-h-0">
      {/* ===== MATTERPORT 3D IFRAME ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {!iframeLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[#0a0a14] flex items-center justify-center z-10"
            >
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 animate-spin" />
                  <div
                    className="absolute inset-3 rounded-full border-2 border-transparent border-t-teal-400 animate-spin"
                    style={{
                      animationDirection: "reverse",
                      animationDuration: "1.5s",
                    }}
                  />
                </div>
                <p className="text-white/50 text-sm tracking-wider uppercase mb-2">
                  Loading 3D Experience
                </p>
                <p className="text-white/25 text-xs">{tour.name}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* iframe fills container exactly — no height offset so Matterport native buttons stay in view and clickable */}
        <iframe
          ref={iframeRef}
          key={iframeKey}
          id="showcase-iframe"
          src={iframeSrc}
          className="absolute inset-0 w-full h-full border-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: iframeLoaded ? 1 : 0 }}
          allow="xr-spatial-tracking; xr; fullscreen; autoplay; encrypted-media; picture-in-picture; clipboard-write; accelerometer; gyroscope; camera; microphone"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIframeLoaded(true)}
        />
      </div>

      {/* ===== TOP-LEFT: Back Button + Logo ===== */}
      {!isClean && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 left-4 z-30 pointer-events-auto flex items-center gap-2"
        >
          <button
            onClick={() => {
              if (selectedChamber || chamberSweepRef.current) {
                flyToTag("Reception");
                setSelectedChamber(null);
                chamberSweepRef.current = "";
              } else {
                navigate("/portfolio");
              }
            }}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-white/80 hover:text-white hover:bg-black/80 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-medium hidden sm:inline">Back</span>
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-black/50 backdrop-blur-2xl border border-white/[0.12] hover:bg-black/70 hover:border-white/20 shadow-lg shadow-black/30 transition-all group"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden">
              <img src="/logo.jpg" alt="PrimeSpace" className="w-full h-full object-cover" />
            </div>
            <span className="text-white/90 text-xs font-semibold tracking-tight group-hover:text-white transition-colors hidden sm:inline">PrimeSpace</span>
          </Link>
        </motion.div>
      )}

      {/* ===== FLOOR SELECTOR (left side, vertically centered) — hidden ===== */}
      <AnimatePresence>
        {false && floors.length > 1 && sdkConnected && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.5 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-auto"
          >
            <div className="flex flex-col gap-1.5 p-1.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10">
              <div className="flex items-center justify-center py-1">
                <Layers className="w-3.5 h-3.5 text-white/40" />
              </div>
              {[...floors].reverse().map((floor) => (
                <button
                  key={floor.index}
                  onClick={() => navigateToFloor(floor.index)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    currentFloor === floor.index
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  }`}
                  title={floor.name}
                >
                  {floor.index}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== TOP-RIGHT: Action Buttons ===== */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 right-2 sm:right-4 z-30 flex items-center gap-1.5 sm:gap-2 pointer-events-auto"
      >
        {/* Toggle Info Card */}
        <button
          onClick={() => { cardManuallyToggled.current = true; setShowCard(!showCard); }}
          className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl backdrop-blur-xl border text-xs font-medium transition-all ${
            showCard
              ? "bg-white/15 border-white/20 text-white"
              : "bg-black/60 border-white/10 text-white/70 hover:text-white hover:bg-black/80"
          }`}
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Cart */}
        {cart.length > 0 && (
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative flex items-center gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-purple-600/80 backdrop-blur-xl border border-purple-400/30 text-white text-xs font-medium transition-all hover:bg-purple-500/80"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        )}

        {/* Share */}
        <div className="relative">
          <button
            onClick={() => setShowShare(!showShare)}
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl backdrop-blur-xl border transition-all ${
              showShare
                ? "bg-white/15 border-white/20 text-white"
                : "bg-black/60 border-white/10 text-white/70 hover:text-white hover:bg-black/80"
            }`}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <AnimatePresence>
            {showShare && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="absolute right-0 top-12 w-[calc(100vw-2rem)] sm:w-72 rounded-xl bg-black/80 backdrop-blur-2xl border border-white/10 p-4 shadow-2xl"
              >
                <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-3">
                  Share this tour
                </p>
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2 border border-white/5">
                  <input
                    type="text"
                    readOnly
                    value={window.location.href}
                    className="flex-1 bg-transparent text-white/70 text-xs outline-none min-w-0"
                  />
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-all shrink-0"
                  >
                    {copied ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-black/80 transition-all"
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4" />
          ) : (
            <Maximize className="w-4 h-4" />
          )}
        </button>

        {/* Book Now — appears when a chamber is selected */}
        <AnimatePresence>
          {selectedChamber && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ type: "spring", damping: 22, stiffness: 300 }}
              onClick={() => {
                if (selectedChamber.bookingUrl && selectedChamber.bookingUrl.trim()) {
                  const url = selectedChamber.bookingUrl.trim();
                  const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
                  window.open(normalized, "_blank", "noopener,noreferrer");
                  return;
                }
                const msg = encodeURIComponent(`Hello, I would like to book the room "${selectedChamber.name}"${selectedChamber.price != null ? ` (${selectedChamber.price} ${selectedChamber.currency || "TND"}/night)` : ""}. Thank you.`);
                window.open(`https://wa.me/21654757573?text=${msg}`, "_blank", "noopener,noreferrer");
              }}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600 border border-purple-400/30 text-white text-xs font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="hidden sm:inline">Book Now</span>
              <span className="sm:hidden">Book</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ===== RIGHT SIDE: INFO CARD ===== */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0, x: 340 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 340 }}
            transition={{ type: "spring", damping: 28, stiffness: 250 }}
            className="absolute top-16 right-4 bottom-4 w-[320px] z-20 pointer-events-auto hidden md:flex flex-col"
          >
            <div className="flex-1 rounded-2xl bg-black/70 backdrop-blur-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
              {/* Close */}
              <button
                onClick={() => setShowCard(false)}
                className="absolute top-3 right-3 z-10 w-7 h-7 rounded-lg bg-black/50 hover:bg-black/80 flex items-center justify-center text-white/50 hover:text-white transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Tour Image */}
              {tour.imageUrl && (
                <div className="relative h-44 shrink-0 overflow-hidden">
                  <img
                    src={tour.imageUrl}
                    alt={tour.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/[0.12] text-white/80 text-[10px] font-medium uppercase tracking-wider">
                    {displayCategory(tour.category)}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h2 className="text-white font-bold text-lg leading-tight">
                      {tour.name}
                    </h2>
                    {tour.location && (
                      <p className="text-white/60 text-xs flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {tour.location}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {!tour.imageUrl && (
                  <div>
                    <h2 className="text-white font-bold text-lg">
                      {tour.name}
                    </h2>
                    {tour.location && (
                      <p className="text-white/50 text-xs flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {tour.location}
                      </p>
                    )}
                  </div>
                )}

                {tour.description && (
                  <p className="text-white/45 text-[13px] leading-relaxed">
                    {tour.description}
                  </p>
                )}

                {/* Info Items */}
                <div className="space-y-1.5">
                  {tour.surface && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                        <Ruler className="w-4 h-4 text-white/50" />
                      </div>
                      <div>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider font-medium">
                          Surface
                        </p>
                        <p className="text-white/75 text-sm font-medium">
                          {tour.surface} m²
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                      <Tag className="w-4 h-4 text-white/50" />
                    </div>
                    <div>
                      <p className="text-white/30 text-[10px] uppercase tracking-wider font-medium">
                        Category
                      </p>
                      <p className="text-white/75 text-sm font-medium">
                        {displayCategory(tour.category)}
                      </p>
                    </div>
                  </div>
                  {tour.location && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-white/50" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white/30 text-[10px] uppercase tracking-wider font-medium">
                          Location
                        </p>
                        <p className="text-white/75 text-sm font-medium truncate">
                          {tour.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Products & Services quick access */}
                {(tourItems.length > 0 || tourServices.length > 0) && (
                  <div className="flex gap-2">
                    {tourItems.length > 0 && (
                      <button
                        onClick={() => { setShowCard(false); setShowProducts(true); }}
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all group"
                      >
                        <ShoppingBag className="w-4 h-4 text-purple-400" />
                        <div className="text-left">
                          <p className="text-white/80 text-xs font-semibold group-hover:text-white transition-colors">Products</p>
                          <p className="text-white/30 text-[10px]">{tourItems.length} article{tourItems.length > 1 ? "s" : ""}</p>
                        </div>
                      </button>
                    )}
                    {tourServices.length > 0 && (
                      <button
                        onClick={() => { setShowCard(false); setShowServices(true); }}
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all group"
                      >
                        <Briefcase className="w-4 h-4 text-teal-400" />
                        <div className="text-left">
                          <p className="text-white/80 text-xs font-semibold group-hover:text-white transition-colors">Services</p>
                          <p className="text-white/30 text-[10px]">{tourServices.length} service{tourServices.length > 1 ? "s" : ""}</p>
                        </div>
                      </button>
                    )}
                  </div>
                )}

                {/* Hotel Menu — Canyon Ranch style for Hôtellerie */}
                {normalizeCategory(tour.category) === "Hôtellerie" && tour.metadataJson && (() => {
                  try {
                    const meta = JSON.parse(tour.metadataJson);
                    const customSections: { title: string; icon: string; items: { name: string; icon: string; tagSid?: string; imageUrl?: string }[] }[] = (meta.sections || []);
                    const rooms: HotelRoom[] = meta.rooms || [];
                    const allAmenities = Array.from(new Set(rooms.flatMap(r => r.amenities || [])));

                    const autoRoomSection = rooms.length > 0 ? [{
                      title: "Accommodations",
                      iconKey: "bed",
                      amenities: allAmenities,
                      items: rooms.map(r => ({
                        name: r.name || "Room",
                        iconKey: "bed",
                        sub: [r.bedType, r.capacity ? `${r.capacity} pers.` : "", r.price ? `${r.price} ${r.currency || "TND"}` : ""].filter(Boolean).join(" · "),
                        tagSid: r.tagSid || undefined,
                        imageUrl: r.imageUrl || undefined,
                      })),
                    }] : [];

                    // Hébergements first, then custom sections
                    const allSections = [
                      ...autoRoomSection,
                      ...customSections.map(s => ({
                        title: s.title,
                        iconKey: s.icon,
                        amenities: [] as string[],
                        items: s.items.map(it => ({ name: it.name, iconKey: it.icon, sub: "", tagSid: it.tagSid || undefined, imageUrl: it.imageUrl || undefined })),
                      })),
                    ];

                    if (allSections.length === 0) return null;
                    return (
                      <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                        {allSections.map((sec, i) => (
                          <HotelMenuSection key={i} title={sec.title} iconKey={sec.iconKey} items={sec.items} amenities={sec.amenities} onItemClick={flyToTag} />
                        ))}
                      </div>
                    );
                  } catch { return null; }
                })()}

                {/* Gym & Fitness Menu */}
                {normalizeCategory(tour.category) === "Gym & Fitness" && tour.metadataJson && (() => {
                  try {
                    const meta = JSON.parse(tour.metadataJson);
                    const gymSpaces: { name: string; tagSid: string; icon: string; schedule: string }[] = meta.spaces || [];
                    const gymEquipment: string[] = meta.equipment || [];
                    const gymPlans: { name: string; price: string; duration: string }[] = meta.plans || [];
                    const gymClasses: { name: string; icon: string; schedule: string }[] = meta.classes || [];
                    const gymCustomSections: { title: string; icon: string; items: { name: string; icon: string; tagSid?: string }[] }[] = (meta.gymSections || []);

                    const spacesSection = gymSpaces.length > 0 ? [{
                      title: "Spaces",
                      iconKey: "dumbbell",
                      amenities: gymEquipment,
                      items: gymSpaces.map(s => ({
                        name: s.name || "Space",
                        iconKey: s.icon || "dumbbell",
                        sub: s.schedule ? `🕐 ${s.schedule}` : "",
                        tagSid: s.tagSid || undefined,
                      })),
                    }] : [];

                    const plansSection = gymPlans.length > 0 ? [{
                      title: "Memberships",
                      iconKey: "star",
                      amenities: [] as string[],
                      items: gymPlans.map(p => ({
                        name: p.name || "Plan",
                        iconKey: "star",
                        sub: [p.price, p.duration].filter(Boolean).join(" · "),
                      })),
                    }] : [];

                    const classesSection = gymClasses.length > 0 ? [{
                      title: "Group Classes",
                      iconKey: "users",
                      amenities: [] as string[],
                      items: gymClasses.map(c => ({
                        name: c.name || "Class",
                        iconKey: c.icon || "heart",
                        sub: c.schedule || "",
                      })),
                    }] : [];

                    const allSections = [
                      ...spacesSection,
                      ...plansSection,
                      ...classesSection,
                      ...gymCustomSections.map(s => ({
                        title: s.title, iconKey: s.icon, amenities: [] as string[],
                        items: s.items.map(it => ({ name: it.name, iconKey: it.icon, sub: "", tagSid: it.tagSid || undefined })),
                      })),
                    ];

                    if (allSections.length === 0 && (!meta.coaches || meta.coaches.length === 0)) return null;
                    const coaches: GymCoachData[] = meta.coaches || [];
                    return (
                      <>
                        {allSections.length > 0 && (
                          <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                            {allSections.map((sec, i) => (
                              <HotelMenuSection key={i} title={sec.title} iconKey={sec.iconKey} items={sec.items} amenities={sec.amenities} onItemClick={flyToTag} />
                            ))}
                          </div>
                        )}
                        {coaches.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold">
                              Our Coaches
                            </p>
                            {coaches.map((coach, ci) => (
                              <button
                                key={ci}
                                onClick={() => setSelectedCoach(coach)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] transition-all group"
                              >
                                {coach.imageUrl ? (
                                  <img src={coach.imageUrl} alt={coach.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/30" />
                                ) : (
                                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border-2 border-purple-400/30">
                                    <User className="w-5 h-5 text-purple-300" />
                                  </div>
                                )}
                                <div className="min-w-0 flex-1 text-left">
                                  <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">{coach.name}</p>
                                  {coach.title && <p className="text-white/30 text-[10px]">{coach.title}</p>}
                                  {coach.price && <p className="text-purple-300 text-xs font-semibold mt-0.5">{coach.price}</p>}
                                </div>
                                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  } catch { return null; }
                })()}

                {/* Immobilier Property Info */}
                {normalizeCategory(tour.category) === "Immobilier" && tour.metadataJson && (() => {
                  try {
                    const meta = JSON.parse(tour.metadataJson);
                    const immo = meta.immobilier;
                    const immoRooms: { name: string; type: string; tagSid: string; imageUrl: string; description: string }[] = meta.immobilierRooms || [];
                    if (!immo) return null;
                    const details: { label: string; value: string }[] = [];
                    if (immo.propertyType) details.push({ label: "Type", value: displayPropertyType(immo.propertyType) });
                    if (immo.transactionType) details.push({ label: "Transaction", value: displayTransactionType(immo.transactionType) });
                    if (immo.price) details.push({ label: "Price", value: `${immo.price.toLocaleString()} ${immo.currency || "TND"}` });
                    if (immo.rooms) details.push({ label: "Rooms", value: `${immo.rooms}` });
                    if (immo.bedrooms) details.push({ label: "Bedrooms", value: `${immo.bedrooms}` });
                    if (immo.bathrooms) details.push({ label: "Bathrooms", value: `${immo.bathrooms}` });
                    if (immo.floor != null) details.push({ label: "Floor", value: immo.totalFloors ? `${immo.floor} / ${immo.totalFloors}` : `${immo.floor}` });
                    if (immo.yearBuilt) details.push({ label: "Year", value: `${immo.yearBuilt}` });
                    if (immo.condition) details.push({ label: "Condition", value: displayCondition(immo.condition) });
                    if (immo.heatingType) details.push({ label: "Heating", value: displayHeating(immo.heatingType) });
                    if (immo.energyClass) details.push({ label: "Energy", value: `Class ${immo.energyClass}` });
                    const amenities: string[] = [];
                    if (immo.furnished) amenities.push("Furnished");
                    if (immo.parking) amenities.push(immo.parkingSpaces ? `Parking (${immo.parkingSpaces})` : "Parking");
                    if (immo.elevator) amenities.push("Elevator");
                    if (immo.balcony) amenities.push("Balcony");
                    if (immo.terrace) amenities.push(immo.terraceArea ? `Terrace ${immo.terraceArea}m²` : "Terrace");
                    if (immo.garden) amenities.push(immo.gardenArea ? `Garden ${immo.gardenArea}m²` : "Garden");
                    if (immo.pool) amenities.push("Pool");
                    if (immo.airConditioning) amenities.push("Air Conditioning");
                    if (immo.basement) amenities.push("Basement");
                    if (details.length === 0 && amenities.length === 0 && immoRooms.length === 0) return null;
                    return (
                      <>
                      {immoRooms.length > 0 && (
                        <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                          <HotelMenuSection
                            title="Rooms"
                            iconKey="door"
                            items={immoRooms.map(r => ({
                              name: r.name || r.type || "Room",
                              iconKey: "door",
                              sub: r.description ? r.description.slice(0, 60) + (r.description.length > 60 ? "…" : "") : r.type || "",
                              tagSid: r.tagSid || undefined,
                              imageUrl: r.imageUrl || undefined,
                            }))}
                            amenities={[]}
                            onItemClick={(tagSid) => {
                              const room = immoRooms.find(r => r.tagSid === tagSid);
                              if (room && (room.imageUrl || room.description)) setSelectedImmoRoom(room);
                              flyToTag(tagSid);
                            }}
                          />
                        </div>
                      )}
                      <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                        {details.length > 0 && (
                          <div className="p-3 space-y-1.5">
                            <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-2">Features</p>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                              {details.map((d, i) => (
                                <div key={i} className="flex justify-between py-1 border-b border-white/[0.04]">
                                  <span className="text-white/40 text-xs">{d.label}</span>
                                  <span className="text-white/80 text-xs font-medium">{d.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {amenities.length > 0 && (
                          <div className="p-3 border-t border-white/[0.06]">
                            <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-2">Amenities</p>
                            <div className="flex flex-wrap gap-1.5">
                              {amenities.map((a, i) => (
                                <span key={i} className="px-2 py-0.5 rounded-full bg-white/[0.06] text-white/60 text-[10px]">{a}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      </>
                    );
                  } catch { return null; }
                })()}

                {/* Navigation - Other tours */}
                {!isClean && (prevTour || nextTour) && (
                  <div className="pt-2 border-t border-white/[0.06]">
                    <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-2">
                      Other tours
                    </p>
                    <div className="space-y-2">
                      {prevTour && (
                        <Link
                          to={tourPath(prevTour)}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.07] transition-all group"
                        >
                          {prevTour.imageUrl && (
                            <img
                              src={prevTour.imageUrl}
                              alt={prevTour.name}
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-white/70 text-xs font-medium truncate group-hover:text-white transition-colors">
                              {prevTour.name}
                            </p>
                            <p className="text-white/30 text-[10px]">
                              {displayCategory(prevTour.category)}
                            </p>
                          </div>
                          <ChevronLeft className="w-3.5 h-3.5 text-white/20 shrink-0" />
                        </Link>
                      )}
                      {nextTour && (
                        <Link
                          to={tourPath(nextTour)}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.07] transition-all group"
                        >
                          {nextTour.imageUrl && (
                            <img
                              src={nextTour.imageUrl}
                              alt={nextTour.name}
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-white/70 text-xs font-medium truncate group-hover:text-white transition-colors">
                              {nextTour.name}
                            </p>
                            <p className="text-white/30 text-[10px]">
                              {displayCategory(nextTour.category)}
                            </p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Branding */}
              <div className="p-3 border-t border-white/[0.06] shrink-0">
                <Link
                  to="/"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition-all group"
                >
                  <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0">
                    <img src="/logo.jpg" alt="PrimeSpace" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/60 text-[11px] font-semibold group-hover:text-white/80 transition-colors">
                      PrimeSpace Studio
                    </p>
                    <p className="text-white/20 text-[9px]">
                      Immersive 3D Experiences
                    </p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-white/15 ml-auto shrink-0" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MOBILE: Right-side Info Card ===== */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 28, stiffness: 250 }}
            className="md:hidden absolute top-14 right-2 bottom-2 w-[85vw] max-w-[320px] z-20 pointer-events-auto"
          >
            <div className="h-full rounded-2xl bg-black/75 backdrop-blur-2xl border border-white/10 overflow-y-auto overflow-x-hidden shadow-2xl">
              <div className="flex items-start gap-3 p-3">
                {tour.imageUrl && (
                  <img
                    src={tour.imageUrl}
                    alt={tour.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="text-white font-bold text-sm leading-tight truncate">
                        {tour.name}
                      </h2>
                      {tour.location && (
                        <p className="text-white/50 text-[11px] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{tour.location}</span>
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setShowCard(false)}
                      className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-white/40 shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.1] text-white/60 text-[10px] font-medium">
                      {displayCategory(tour.category)}
                    </span>
                    {tour.surface && (
                      <span className="text-white/30 text-[10px]">
                        {tour.surface} m²
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile: Products & Services quick access */}
              {(tourItems.length > 0 || tourServices.length > 0) && (
                <div className="flex gap-2 px-3 pb-2">
                  {tourItems.length > 0 && (
                    <button
                      onClick={() => { setShowCard(false); setShowProducts(true); }}
                      className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all group"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />
                      <div className="text-left">
                        <p className="text-white/80 text-[11px] font-semibold group-hover:text-white transition-colors">Products</p>
                        <p className="text-white/30 text-[9px]">{tourItems.length}</p>
                      </div>
                    </button>
                  )}
                  {tourServices.length > 0 && (
                    <button
                      onClick={() => { setShowCard(false); setShowServices(true); }}
                      className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all group"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-teal-400" />
                      <div className="text-left">
                        <p className="text-white/80 text-[11px] font-semibold group-hover:text-white transition-colors">Services</p>
                        <p className="text-white/30 text-[9px]">{tourServices.length}</p>
                      </div>
                    </button>
                  )}
                </div>
              )}

              {/* Mobile: Hotel Menu */}
              {normalizeCategory(tour.category) === "Hôtellerie" && tour.metadataJson && (() => {
                try {
                  const meta = JSON.parse(tour.metadataJson);
                  const customSections: { title: string; icon: string; items: { name: string; icon: string; tagSid?: string; imageUrl?: string }[] }[] = (meta.sections || []);
                  const rooms: HotelRoom[] = meta.rooms || [];
                  const allAmenities = Array.from(new Set(rooms.flatMap(r => r.amenities || [])));

                  const autoRoomSection = rooms.length > 0 ? [{
                    title: "Accommodations",
                    iconKey: "bed",
                    amenities: allAmenities,
                    items: rooms.map(r => ({ name: r.name || "Room", iconKey: "bed", sub: [r.bedType, r.capacity ? `${r.capacity}p` : "", r.price ? `${r.price} ${r.currency || "TND"}` : ""].filter(Boolean).join(" · "), tagSid: r.tagSid || undefined, imageUrl: r.imageUrl || undefined })),
                  }] : [];

                  const allSections = [
                    ...autoRoomSection,
                    ...customSections.map(s => ({
                      title: s.title,
                      iconKey: s.icon,
                      amenities: [] as string[],
                      items: s.items.map(it => ({ name: it.name, iconKey: it.icon, tagSid: it.tagSid || undefined, imageUrl: it.imageUrl || undefined })),
                    })),
                  ];

                  if (allSections.length === 0) return null;
                  return (
                    <div className="border-t border-white/[0.06] overflow-hidden">
                      {allSections.map((sec, i) => (
                        <HotelMenuSection key={i} title={sec.title} iconKey={sec.iconKey} items={sec.items} amenities={sec.amenities} onItemClick={flyToTag} />
                      ))}
                    </div>
                  );
                } catch { return null; }
              })()}

              {/* Mobile: Gym Menu */}
              {normalizeCategory(tour.category) === "Gym & Fitness" && tour.metadataJson && (() => {
                try {
                  const meta = JSON.parse(tour.metadataJson);
                  const gymSpaces: { name: string; tagSid: string; icon: string; schedule: string }[] = meta.spaces || [];
                  const gymEquipment: string[] = meta.equipment || [];
                  const gymPlans: { name: string; price: string; duration: string }[] = meta.plans || [];
                  const gymClasses: { name: string; icon: string; schedule: string }[] = meta.classes || [];
                  const gymCustomSections: { title: string; icon: string; items: { name: string; icon: string; tagSid?: string }[] }[] = (meta.gymSections || []);

                  const spacesSection = gymSpaces.length > 0 ? [{
                    title: "Spaces", iconKey: "dumbbell", amenities: gymEquipment,
                    items: gymSpaces.map(s => ({ name: s.name || "Space", iconKey: s.icon || "dumbbell", sub: s.schedule ? `🕐 ${s.schedule}` : "", tagSid: s.tagSid || undefined })),
                  }] : [];
                  const plansSection = gymPlans.length > 0 ? [{
                    title: "Memberships", iconKey: "star", amenities: [] as string[],
                    items: gymPlans.map(p => ({ name: p.name || "Plan", iconKey: "star", sub: [p.price, p.duration].filter(Boolean).join(" · ") })),
                  }] : [];
                  const classesSection = gymClasses.length > 0 ? [{
                    title: "Group Classes", iconKey: "users", amenities: [] as string[],
                    items: gymClasses.map(c => ({ name: c.name || "Class", iconKey: c.icon || "heart", sub: c.schedule || "" })),
                  }] : [];
                  const allSections = [...spacesSection, ...plansSection, ...classesSection, ...gymCustomSections.map(s => ({
                    title: s.title, iconKey: s.icon, amenities: [] as string[],
                    items: s.items.map(it => ({ name: it.name, iconKey: it.icon, tagSid: it.tagSid || undefined })),
                  }))];
                  if (allSections.length === 0 && (!meta.coaches || meta.coaches.length === 0)) return null;
                  const coaches: GymCoachData[] = meta.coaches || [];
                  return (
                    <>
                      {allSections.length > 0 && (
                        <div className="border-t border-white/[0.06] overflow-hidden">
                          {allSections.map((sec, i) => (
                            <HotelMenuSection key={i} title={sec.title} iconKey={sec.iconKey} items={sec.items} amenities={sec.amenities} onItemClick={flyToTag} />
                          ))}
                        </div>
                      )}
                      {coaches.length > 0 && (
                        <div className="border-t border-white/[0.06] p-3 space-y-2">
                          <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold">Our Coaches</p>
                          {coaches.map((coach, ci) => (
                            <button key={ci} onClick={() => setSelectedCoach(coach)}
                              className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] transition-all group"
                            >
                              {coach.imageUrl ? (
                                <img src={coach.imageUrl} alt={coach.name} className="w-10 h-10 rounded-full object-cover border-2 border-purple-400/30" />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border-2 border-purple-400/30">
                                  <User className="w-4 h-4 text-purple-300" />
                                </div>
                              )}
                              <div className="min-w-0 flex-1 text-left">
                                <p className="text-white/80 text-xs font-medium truncate">{coach.name}</p>
                                {coach.title && <p className="text-white/30 text-[10px]">{coach.title}</p>}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  );
                } catch { return null; }
              })()}
              {/* Mobile: Immobilier Info */}
              {normalizeCategory(tour.category) === "Immobilier" && tour.metadataJson && (() => {
                try {
                  const meta = JSON.parse(tour.metadataJson);
                  const immo = meta.immobilier;
                  const immoRooms: { name: string; type: string; tagSid: string; imageUrl: string; description: string }[] = meta.immobilierRooms || [];
                  if (!immo) return null;
                  const details: { label: string; value: string }[] = [];
                  if (immo.propertyType) details.push({ label: "Type", value: displayPropertyType(immo.propertyType) });
                  if (immo.transactionType) details.push({ label: "Transaction", value: displayTransactionType(immo.transactionType) });
                  if (immo.price) details.push({ label: "Price", value: `${immo.price.toLocaleString()} ${immo.currency || "TND"}` });
                  if (immo.rooms) details.push({ label: "Rooms", value: `${immo.rooms}` });
                  if (immo.bedrooms) details.push({ label: "Bedrooms", value: `${immo.bedrooms}` });
                  if (immo.bathrooms) details.push({ label: "Bath", value: `${immo.bathrooms}` });
                  if (immo.floor != null) details.push({ label: "Floor", value: immo.totalFloors ? `${immo.floor}/${immo.totalFloors}` : `${immo.floor}` });
                  if (immo.yearBuilt) details.push({ label: "Year", value: `${immo.yearBuilt}` });
                  if (immo.condition) details.push({ label: "Condition", value: displayCondition(immo.condition) });
                  if (immo.heatingType) details.push({ label: "Heating", value: displayHeating(immo.heatingType) });
                  if (immo.energyClass) details.push({ label: "Energy", value: `Class ${immo.energyClass}` });
                  const amenities: string[] = [];
                  if (immo.furnished) amenities.push("Furnished");
                  if (immo.parking) amenities.push(immo.parkingSpaces ? `Parking (${immo.parkingSpaces})` : "Parking");
                  if (immo.elevator) amenities.push("Elevator");
                  if (immo.balcony) amenities.push("Balcony");
                  if (immo.terrace) amenities.push(immo.terraceArea ? `Terrace ${immo.terraceArea}m²` : "Terrace");
                  if (immo.garden) amenities.push(immo.gardenArea ? `Garden ${immo.gardenArea}m²` : "Garden");
                  if (immo.pool) amenities.push("Pool");
                  if (immo.airConditioning) amenities.push("Air Conditioning");
                  if (immo.basement) amenities.push("Basement");
                  if (details.length === 0 && amenities.length === 0 && immoRooms.length === 0) return null;
                  return (
                    <>
                    {immoRooms.length > 0 && (
                      <div className="border-t border-white/[0.06] overflow-hidden">
                        <HotelMenuSection
                          title="Rooms"
                          iconKey="door"
                          items={immoRooms.map(r => ({
                            name: r.name || r.type || "Room",
                            iconKey: "door",
                            sub: r.description ? r.description.slice(0, 60) + (r.description.length > 60 ? "…" : "") : r.type || "",
                            tagSid: r.tagSid || undefined,
                            imageUrl: r.imageUrl || undefined,
                          }))}
                          amenities={[]}
                          onItemClick={(tagSid) => {
                            const room = immoRooms.find(r => r.tagSid === tagSid);
                            if (room && (room.imageUrl || room.description)) setSelectedImmoRoom(room);
                            flyToTag(tagSid);
                          }}
                        />
                      </div>
                    )}
                    <div className="border-t border-white/[0.06] bg-white/[0.02]">
                      {details.length > 0 && (
                        <div className="p-3 space-y-1.5">
                          <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-2">Features</p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                            {details.map((d, i) => (
                              <div key={i} className="flex justify-between py-1 border-b border-white/[0.04]">
                                <span className="text-white/40 text-xs">{d.label}</span>
                                <span className="text-white/80 text-xs font-medium">{d.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {amenities.length > 0 && (
                        <div className="p-3 border-t border-white/[0.06]">
                          <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-2">Amenities</p>
                          <div className="flex flex-wrap gap-1.5">
                            {amenities.map((a, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full bg-white/[0.06] text-white/60 text-[10px]">{a}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    </>
                  );
                } catch { return null; }
              })()}
              {!isClean && (prevTour || nextTour) && (
                <div className="flex border-t border-white/[0.06]">
                  {prevTour ? (
                    <Link
                      to={tourPath(prevTour)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-white/40 hover:text-white/70 text-xs transition-colors border-r border-white/[0.06]"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Previous
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {nextTour ? (
                    <Link
                      to={tourPath(nextTour)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-white/40 hover:text-white/70 text-xs transition-colors"
                    >
                      Next <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== NATIVE-STYLE TAG POPUP (Matterport look) ===== */}
      <AnimatePresence>
        {selectedTag && !selectedItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto"
            style={{ width: 340 }}
          >
            <div className="rounded-lg overflow-hidden bg-[#2d2d2d] shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
              {/* Top bar: share + copy */}
              <div className="flex justify-end gap-1 px-2 pt-2">
                <button
                  onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
                  className="w-7 h-7 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  title="Share"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { setSelectedTag(null); }}
                  className="w-7 h-7 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Media: video / image */}
              {(() => {
                const mediaSrc = selectedTag.mediaSrc || selectedTag.mediaUrl || "";
                const ytMatch = mediaSrc.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
                const vimeoMatch = mediaSrc.match(/vimeo\.com\/(?:video\/)?(\d+)/);
                const isDirectVideo = /\.(mp4|webm|ogg|mov)(\?|$)/i.test(mediaSrc);
                const isImage = /\.(png|jpe?g|gif|webp|avif)(\?|$)/i.test(mediaSrc);

                if (ytMatch) {
                  return (
                    <div className="aspect-video mx-2 mb-2 rounded overflow-hidden bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`}
                        className="w-full h-full border-0"
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                      />
                    </div>
                  );
                }
                if (vimeoMatch) {
                  return (
                    <div className="aspect-video mx-2 mb-2 rounded overflow-hidden bg-black">
                      <iframe
                        src={`https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`}
                        className="w-full h-full border-0"
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                      />
                    </div>
                  );
                }
                if (isDirectVideo) {
                  return (
                    <div className="aspect-video mx-2 mb-2 rounded overflow-hidden bg-black">
                      <video src={mediaSrc} className="w-full h-full object-contain" controls autoPlay playsInline />
                    </div>
                  );
                }
                if (isImage && mediaSrc) {
                  return (
                    <div className="mx-2 mb-2 rounded overflow-hidden">
                      <img src={mediaSrc} alt={selectedTag.label} className="w-full object-cover" />
                    </div>
                  );
                }
                if (mediaSrc && /^https?:\/\//i.test(mediaSrc)) {
                  return (
                    <div className="aspect-video mx-2 mb-2 rounded overflow-hidden bg-black">
                      <iframe src={mediaSrc} className="w-full h-full border-0" allow="autoplay; fullscreen" allowFullScreen />
                    </div>
                  );
                }
                return null;
              })()}

              {/* Title */}
              <div className="px-3 pb-3">
                <h4 className="text-white text-sm font-semibold leading-snug">{selectedTag.label}</h4>
                {selectedTag.description && (
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">{selectedTag.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== PRODUCT ITEM POPUP — Modern Glass Card ===== */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedItem(null); }}
              className="absolute inset-0 bg-black/70 backdrop-blur-xl z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.95 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute inset-0 flex items-end sm:items-center justify-center z-50 pointer-events-none"
            >
              <div className="w-full sm:max-w-[400px] pointer-events-auto mx-auto">
                <div className="relative overflow-hidden rounded-t-[28px] sm:rounded-[28px] bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border border-white/[0.08] shadow-[0_0_80px_rgba(124,58,237,0.12)]">
                  {/* Close */}
                  <button
                    onClick={() => { setSelectedItem(null); }}
                    className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {/* Image Hero */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-black">
                    {selectedItem.imageUrl ? (
                      <img src={selectedItem.imageUrl} alt={selectedItem.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent flex items-center justify-center">
                        <ShoppingBag className="w-14 h-14 text-white/8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent pointer-events-none" />
                    {/* Brand pill */}
                    {selectedItem.brand && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 text-[9px] font-black uppercase tracking-[0.15em] text-gray-600 shadow-lg">
                          {selectedItem.brand}
                        </span>
                      </div>
                    )}
                    {/* Price overlay */}
                    {selectedItem.price != null && (
                      <div className="absolute bottom-3 right-4 z-10 flex items-baseline gap-1.5">
                        <span className="text-[32px] font-black text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-none">{selectedItem.price}</span>
                        <span className="text-sm font-bold text-white/50">{CURRENCY_SYMBOLS[selectedItem.currency] || selectedItem.currency}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="px-5 pt-4 pb-5">
                    {/* Name */}
                    <h3 className="text-white font-bold text-[22px] leading-[1.2] tracking-tight">
                      {selectedItem.name}
                    </h3>
                    {selectedItem.description && (
                      <p className="text-white/35 text-[13px] leading-relaxed mt-2.5 line-clamp-2">
                        {selectedItem.description}
                      </p>
                    )}
                    {/* Actions */}
                    <div className="flex gap-2.5 mt-5">
                      {selectedItem.showAddToCart !== false && (
                        <button
                          onClick={() => { addToCart(selectedItem); setSelectedItem(null); }}
                          className="flex-1 h-[52px] bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold rounded-2xl transition-all hover:shadow-[0_4px_24px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2.5 text-[13px]"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to cart
                        </button>
                      )}
                      {selectedItem.externalUrl && (
                        <a
                          href={selectedItem.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-[52px] px-5 bg-white/[0.07] hover:bg-white/[0.12] text-white/70 hover:text-white font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-[13px] border border-white/[0.08]"
                        >
                          Buy
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== PRODUCTS LIST PANEL (right side) ===== */}
      <AnimatePresence>
        {showProducts && tourItems.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProducts(false)}
              className="absolute inset-0 bg-black/20 z-30"
            />
            <motion.div
              initial={{ opacity: 0, x: 360 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 360 }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              className="absolute bottom-0 left-0 right-0 md:bottom-4 md:left-auto md:top-16 md:right-4 w-full md:w-[320px] z-[35] pointer-events-auto flex flex-col max-h-[60vh] md:max-h-none"
            >
              <div className="flex-1 rounded-t-2xl md:rounded-2xl bg-black/80 md:bg-black/70 backdrop-blur-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between shrink-0">
                  <h2 className="text-white font-semibold text-sm flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Products ({tourItems.length})
                  </h2>
                  <button onClick={() => setShowProducts(false)} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {tourItems.map((item) => (
                    <div
                      key={item.id}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all text-left group relative"
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <button
                        onClick={() => navigateToProduct(item)}
                        className="flex items-center gap-3 flex-1 min-w-0"
                      >
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0 bg-white" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                            <ShoppingBag className="w-5 h-5 text-white/30" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">{item.name}</p>
                          {item.brand && <p className="text-white/30 text-[10px] uppercase tracking-wider">{item.brand}</p>}
                          {item.price != null && (
                            <p className="text-purple-300 text-xs font-semibold mt-0.5">{item.price} {CURRENCY_SYMBOLS[item.currency] || item.currency}</p>
                          )}
                        </div>
                      </button>
                      {/* Quick add to cart */}
                      {item.showAddToCart !== false && (
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                          className="w-8 h-8 rounded-lg bg-purple-600/80 hover:bg-purple-500 flex items-center justify-center text-white shrink-0 opacity-0 group-hover:opacity-100 transition-all"
                          title="Add to cart"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                      <ChevronRight className="w-4 h-4 text-white/15 group-hover:text-white/40 transition-colors shrink-0" />

                      {/* Hover preview card */}
                      {hoveredItem?.id === item.id && (
                        <div className="hidden md:block absolute right-full top-0 mr-3 w-[280px] z-50 pointer-events-none">
                          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                            {item.imageUrl && (
                              <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-4" />
                              </div>
                            )}
                            <div className="p-4">
                              {item.brand && (
                                <p className="text-purple-600 text-[10px] font-bold uppercase tracking-widest mb-1">{item.brand}</p>
                              )}
                              <h4 className="text-gray-900 font-bold text-base leading-tight">{item.name}</h4>
                              {item.price != null && (
                                <p className="text-xl font-extrabold text-gray-900 mt-1">
                                  {item.price} <span className="text-sm font-semibold text-gray-400">{CURRENCY_SYMBOLS[item.currency] || item.currency}</span>
                                </p>
                              )}
                              {item.description && (
                                <p className="text-gray-500 text-xs leading-relaxed mt-2 line-clamp-3">{item.description}</p>
                              )}
                              <p className="text-purple-500 text-[10px] font-semibold mt-3 uppercase tracking-wider">Click to view in the tour →</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== SERVICES LIST PANEL (right side) ===== */}
      <AnimatePresence>
        {showServices && tourServices.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowServices(false)}
              className="absolute inset-0 bg-black/20 z-30"
            />
            <motion.div
              initial={{ opacity: 0, x: 360 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 360 }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              className="absolute bottom-0 left-0 right-0 md:bottom-4 md:left-auto md:top-16 md:right-4 w-full md:w-[320px] z-[35] pointer-events-auto flex flex-col max-h-[60vh] md:max-h-none"
            >
              <div className="flex-1 rounded-t-2xl md:rounded-2xl bg-black/80 md:bg-black/70 backdrop-blur-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between shrink-0">
                  <h2 className="text-white font-semibold text-sm flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Services ({tourServices.length})
                  </h2>
                  <button onClick={() => setShowServices(false)} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {tourServices.map((svc) => (
                    <div
                      key={svc.id}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all group"
                    >
                      <button
                        onClick={() => setSelectedService(svc)}
                        className="flex items-center gap-3 flex-1 min-w-0"
                      >
                        {svc.imageUrl ? (
                          <img src={svc.imageUrl} alt={svc.name} className="w-12 h-12 rounded-lg object-cover shrink-0 bg-white" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                            <Briefcase className="w-5 h-5 text-white/30" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">{svc.name}</p>
                          {svc.description && <p className="text-white/30 text-[10px] line-clamp-1">{svc.description}</p>}
                        </div>
                      </button>
                      {/* Quick action icons */}
                      <div className="flex items-center gap-1 shrink-0">
                        {svc.whatsapp && (
                          <a
                            href={`https://wa.me/${svc.whatsapp.replace(/[^0-9+]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-7 h-7 rounded-lg bg-green-600/80 hover:bg-green-500 flex items-center justify-center text-white transition-all"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {svc.phone && (
                          <a
                            href={`tel:${svc.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-7 h-7 rounded-lg bg-blue-600/80 hover:bg-blue-500 flex items-center justify-center text-white transition-all"
                            title="Call"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/15 group-hover:text-white/40 transition-colors shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== CHAMBERS LIST PANEL (right side) ===== */}
      <AnimatePresence>
        {showChambers && tourChambers.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChambers(false)}
              className="absolute inset-0 bg-black/20 z-30"
            />
            <motion.div
              initial={{ opacity: 0, x: 360 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 360 }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              className="absolute bottom-0 left-0 right-0 md:bottom-4 md:left-auto md:top-16 md:right-4 w-full md:w-[320px] z-[35] pointer-events-auto flex flex-col max-h-[60vh] md:max-h-none"
            >
              <div className="flex-1 rounded-t-2xl md:rounded-2xl bg-black/80 md:bg-black/70 backdrop-blur-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between shrink-0">
                  <h2 className="text-white font-semibold text-sm flex items-center gap-2">
                    <DoorOpen className="w-4 h-4" />
                    Rooms ({tourChambers.length})
                  </h2>
                  <button onClick={() => setShowChambers(false)} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {tourChambers.map((ch) => (
                    <div
                      key={ch.id}
                      onClick={() => { setShowChambers(false); navigateToChamber(ch); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all group cursor-pointer"
                    >
                      {ch.imageUrl ? (
                        <img src={ch.imageUrl} alt={ch.name} className="w-14 h-14 rounded-lg object-cover shrink-0 bg-white" />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <DoorOpen className="w-5 h-5 text-white/30" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{ch.name}</p>
                        {ch.description && <p className="text-white/30 text-[10px] line-clamp-2">{ch.description}</p>}
                        {ch.price != null && (
                          <p className="text-purple-300 text-xs font-bold mt-1">{ch.price} <span className="text-white/40">{ch.currency || "TND"}</span></p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== SERVICE DETAIL POPUP ===== */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full max-w-[420px] max-h-[90vh] pointer-events-auto">
                {/* Close */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image */}
                {selectedService.imageUrl ? (
                  <img src={selectedService.imageUrl} alt={selectedService.name} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <Briefcase className="w-16 h-16 text-purple-300" />
                  </div>
                )}

                <div className="p-5 overflow-y-auto flex-1 min-h-0">
                  <h3 className="text-lg font-bold text-gray-900">{selectedService.name}</h3>
                  {selectedService.description && (
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{selectedService.description}</p>
                  )}

                  {/* Contact buttons */}
                  <div className="mt-4 space-y-2">
                    {selectedService.phone && (
                      <a
                        href={`tel:${selectedService.phone}`}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-sm transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        {selectedService.phone}
                      </a>
                    )}
                    {selectedService.whatsapp && (
                      <a
                        href={`https://wa.me/${selectedService.whatsapp.replace(/[^0-9+]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 font-medium text-sm transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp
                      </a>
                    )}
                    {selectedService.instagram && (
                      <a
                        href={selectedService.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-medium text-sm transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        Instagram
                      </a>
                    )}
                    {selectedService.facebook && (
                      <a
                        href={selectedService.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-medium text-sm transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Facebook
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== COACH PROFILE POPUP ===== */}
      <AnimatePresence>
        {selectedCoach && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCoach(null)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full max-w-[440px] max-h-[90vh] pointer-events-auto">
                <button
                  onClick={() => setSelectedCoach(null)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Coach header */}
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 flex flex-col items-center text-center">
                  {selectedCoach.imageUrl ? (
                    <img src={selectedCoach.imageUrl} alt={selectedCoach.name} className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
                      <User className="w-10 h-10 text-white/70" />
                    </div>
                  )}
                  <h3 className="text-white font-bold text-xl mt-3">{selectedCoach.name}</h3>
                  {selectedCoach.title && <p className="text-white/70 text-sm mt-0.5">{selectedCoach.title}</p>}
                  {selectedCoach.price && (
                    <span className="mt-2 inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-white text-sm font-semibold">
                      <Banknote className="w-4 h-4" /> {selectedCoach.price}
                    </span>
                  )}
                </div>

                <div className="p-5 overflow-y-auto flex-1 min-h-0 space-y-4">
                  {/* Bio */}
                  {selectedCoach.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedCoach.description}</p>
                  )}

                  {/* Specialties chips */}
                  {selectedCoach.specialties && selectedCoach.specialties.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Specialties</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCoach.specialties.map((s, si) => {
                          const spec = COACH_SPECIALTY_LABELS[s];
                          const SpecIcon = spec?.icon || Star;
                          return (
                            <span key={si} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                              <SpecIcon className="w-3 h-3" />
                              {spec?.label || s}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Info grid */}
                  {(selectedCoach.certifications || selectedCoach.experience || selectedCoach.schedule) && (
                    <div className="grid grid-cols-1 gap-2">
                      {selectedCoach.certifications && (
                        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50">
                          <Award className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] text-gray-400 font-semibold uppercase">Certifications</p>
                            <p className="text-sm text-gray-700">{selectedCoach.certifications}</p>
                          </div>
                        </div>
                      )}
                      {selectedCoach.experience && (
                        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50">
                          <Trophy className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] text-gray-400 font-semibold uppercase">Experience</p>
                            <p className="text-sm text-gray-700">{selectedCoach.experience}</p>
                          </div>
                        </div>
                      )}
                      {selectedCoach.schedule && (
                        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50">
                          <Clock className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] text-gray-400 font-semibold uppercase">Availability</p>
                            <p className="text-sm text-gray-700">{selectedCoach.schedule}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Contact buttons */}
                  <div className="space-y-2">
                    {selectedCoach.phone && (
                      <a
                        href={`tel:${selectedCoach.phone}`}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-sm transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        {selectedCoach.phone}
                      </a>
                    )}
                    {selectedCoach.whatsapp && (
                      <a
                        href={`https://wa.me/${selectedCoach.whatsapp.replace(/[^0-9+]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 font-medium text-sm transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp
                      </a>
                    )}
                    {selectedCoach.instagram && (
                      <a
                        href={selectedCoach.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-medium text-sm transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== IMMOBILIER ROOM POPUP ===== */}
      <AnimatePresence>
        {selectedImmoRoom && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImmoRoom(null)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full max-w-[440px] max-h-[90vh] pointer-events-auto relative">
                <button
                  onClick={() => setSelectedImmoRoom(null)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                {selectedImmoRoom.imageUrl && (
                  <img src={selectedImmoRoom.imageUrl} alt={selectedImmoRoom.name} className="w-full h-56 object-cover" />
                )}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-gray-900 font-bold text-lg">{selectedImmoRoom.name || selectedImmoRoom.type}</h3>
                    {selectedImmoRoom.type && selectedImmoRoom.name !== selectedImmoRoom.type && (
                      <p className="text-gray-400 text-sm">{selectedImmoRoom.type}</p>
                    )}
                  </div>
                  {selectedImmoRoom.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedImmoRoom.description}</p>
                  )}
                  {selectedImmoRoom.tagSid && (
                    <button
                      onClick={() => { flyToTag(selectedImmoRoom.tagSid); setSelectedImmoRoom(null); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-sm transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      View in 3D
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== CART PANEL ===== */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="absolute inset-0 bg-black/30 z-40"
            />
            <motion.div
              initial={{ opacity: 0, x: 380 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 380 }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-[100vw] sm:max-w-sm z-50 pointer-events-auto flex flex-col"
            >
              <div className="flex-1 bg-white flex flex-col shadow-2xl">
                {/* Cart Header */}
                <div className="p-4 border-b flex items-center justify-between shrink-0 bg-[#1a5c4f] text-white">
                  <h2 className="font-bold text-base flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    My Cart ({cartCount})
                  </h2>
                  <button onClick={() => setShowCart(false)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {cart.map((entry) => (
                    <div key={entry.item.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
                      {entry.item.imageUrl ? (
                        <img src={entry.item.imageUrl} alt={entry.item.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                          <ShoppingBag className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm text-gray-900 truncate">{entry.item.name}</p>
                        {entry.item.brand && <p className="text-xs text-gray-500">{entry.item.brand}</p>}
                        {entry.item.price != null && (
                          <p className="text-sm font-bold text-[#1a5c4f] mt-0.5">
                            {(entry.item.price * entry.qty).toFixed(2)} {CURRENCY_SYMBOLS[entry.item.currency] || entry.item.currency}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1.5">
                          <button onClick={() => updateQty(entry.item.id, -1)} className="w-6 h-6 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">{entry.qty}</span>
                          <button onClick={() => updateQty(entry.item.id, 1)} className="w-6 h-6 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                          <button onClick={() => removeFromCart(entry.item.id)} className="ml-auto w-6 h-6 rounded-md hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Footer */}
                <div className="p-4 border-t bg-gray-50 shrink-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="text-xl font-bold text-gray-900">{cartTotal.toFixed(2)} {cart[0]?.item.currency ? CURRENCY_SYMBOLS[cart[0].item.currency] || cart[0].item.currency : "€"}</span>
                  </div>
                  <button className="w-full py-3.5 bg-[#1a5c4f] hover:bg-[#144a40] text-white font-semibold rounded-xl transition-colors text-sm">
                    VIEW SUMMARY
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Click outside share to close */}
      {showShare && (
        <div
          className="absolute inset-0 z-10"
          onClick={() => setShowShare(false)}
        />
      )}
      </div>{/* END TOP: MATTERPORT 3D VIEWER */}

      {/* ===== BOTTOM: PRODUCT & SERVICE STRIP ===== */}
      {(() => {
        // Compute custom strip sections (hotel + gym) once for all use
        let stripCustoms: { key: string; title: string; iconKey: string; items: { name: string; icon: string; tagSid?: string; imageUrl?: string }[] }[] = [];
        if (tour?.metadataJson) {
          try {
            const meta = JSON.parse(tour.metadataJson);
            const fromHotel = (meta.sections || []) as { title: string; icon: string; items: { name: string; icon: string; tagSid?: string; imageUrl?: string }[] }[];
            const fromGym = (meta.gymSections || []) as { title: string; icon: string; items: { name: string; icon: string; tagSid?: string; imageUrl?: string }[] }[];
            stripCustoms = [...fromHotel, ...fromGym]
              .filter(s => (s.title || "").trim() && (s.items || []).length > 0)
              .filter(s => bottomStripConfig.customSections?.[s.title] !== false)
              .map(s => ({ key: `cs:${s.title}`, title: s.title, iconKey: s.icon || "layers", items: s.items }));
          } catch { /* ignore */ }
        }
        const hasAnyStandard = (tourItems.length > 0 && bottomStripConfig.products) || (tourServices.length > 0 && bottomStripConfig.services) || (tourChambers.length > 0 && bottomStripConfig.chambers) || gymCoaches.length > 0 || (immoRooms.length > 0 && bottomStripConfig.chambers);
        if (!hasAnyStandard && stripCustoms.length === 0) return null;
        const tabCount = ((tourItems.length > 0 && bottomStripConfig.products) ? 1 : 0) + ((tourServices.length > 0 && bottomStripConfig.services) ? 1 : 0) + ((tourChambers.length > 0 && bottomStripConfig.chambers) ? 1 : 0) + (gymCoaches.length > 0 ? 1 : 0) + ((immoRooms.length > 0 && bottomStripConfig.chambers) ? 1 : 0) + stripCustoms.length;
        const activeCustom = stripCustoms.find(c => c.key === bottomTab);
        return (
        <div className="shrink-0 bg-gradient-to-r from-black via-[#0a0520] to-[#110835] border-t border-white/10">
          {/* Toggle handle */}
          <button
            onClick={() => { if (!bottomStripOpen) userOpenedStripRef.current = true; setBottomStripOpen(!bottomStripOpen); }}
            className="w-full flex items-center justify-center py-1.5 hover:bg-white/[0.03] transition-colors group"
          >
            <ChevronDown className={`w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-all duration-300 ${bottomStripOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
          <motion.div
            initial={false}
            animate={{ height: bottomStripOpen ? "auto" : 0, opacity: bottomStripOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
          <div className="px-3 pb-3">
            {/* Tab switcher when both exist */}
            {tabCount > 1 && (
              <div className="flex items-center justify-center gap-1 mb-2.5 flex-wrap">
                {tourItems.length > 0 && bottomStripConfig.products && (
                  <button
                    onClick={() => setBottomTab("products")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${bottomTab === "products" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                  >
                    <ShoppingBag className="w-3 h-3" /> Products ({tourItems.length})
                  </button>
                )}
                {tourServices.length > 0 && bottomStripConfig.services && (
                  <button
                    onClick={() => setBottomTab("services")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${bottomTab === "services" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                  >
                    <Briefcase className="w-3 h-3" /> Services ({tourServices.length})
                  </button>
                )}
                {tourChambers.length > 0 && bottomStripConfig.chambers && normalizeCategory(tour?.category) !== "Immobilier" && (
                  <button
                    onClick={() => setBottomTab("chambers")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${bottomTab === "chambers" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                  >
                    <DoorOpen className="w-3 h-3" /> Rooms ({tourChambers.length})
                  </button>
                )}
                {immoRooms.length > 0 && bottomStripConfig.chambers && (
                  <button
                    onClick={() => setBottomTab("rooms")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${bottomTab === "rooms" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                  >
                    <DoorOpen className="w-3 h-3" /> Rooms ({immoRooms.length})
                  </button>
                )}
                {gymCoaches.length > 0 && (
                  <button
                    onClick={() => setBottomTab("coaches")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${bottomTab === "coaches" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                  >
                    <User className="w-3 h-3" /> Coaches ({gymCoaches.length})
                  </button>
                )}
                {stripCustoms.map((cs) => {
                  const Icn = ICON_MAP[cs.iconKey] || Layers;
                  return (
                    <button
                      key={cs.key}
                      onClick={() => setBottomTab(cs.key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${bottomTab === cs.key ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                    >
                      <Icn className="w-3 h-3" /> {cs.title} ({cs.items.length})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Active filter label (products only) */}
            {bottomTab === "products" && activeTagFilter && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-white/60 text-[10px] font-medium uppercase tracking-wider">Product linked to tag</span>
                <button
                  onClick={() => setActiveTagFilter(null)}
                  className="text-white/40 hover:text-white text-[10px] underline transition-colors"
                >
                  View all
                </button>
              </div>
            )}

            {/* Products strip */}
            {bottomTab === "products" && tourItems.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide justify-center">
                {tourItems
                  .filter(i => !activeTagFilter || i.tagSid?.trim().toLowerCase() === activeTagFilter.trim().toLowerCase())
                  .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateToProduct(item)}
                    className="flex-shrink-0 flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl p-2 pr-4 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex items-center justify-center shrink-0">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-1" />
                      ) : (
                        <ShoppingBag className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/80 text-xs font-semibold truncate max-w-[120px] group-hover:text-white transition-colors">{item.name}</p>
                      {item.price != null && (
                        <p className="text-purple-300 text-xs font-bold mt-0.5">
                          {item.price} <span className="text-white/30 text-[10px]">{CURRENCY_SYMBOLS[item.currency] || item.currency}</span>
                        </p>
                      )}
                    </div>
                  </button>
                ))}
                {!activeTagFilter && tourItems.length > 3 && (
                  <button
                    onClick={() => setShowProducts(true)}
                    className="flex-shrink-0 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.1] transition-all text-xs font-medium"
                  >
                    View all
                  </button>
                )}
              </div>
            )}

            {/* Services strip */}
            {bottomTab === "services" && tourServices.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide justify-center">
                {tourServices.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => setSelectedService(svc)}
                    className="flex-shrink-0 flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl p-2 pr-3 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex items-center justify-center shrink-0">
                      {svc.imageUrl ? (
                        <img src={svc.imageUrl} alt={svc.name} className="w-full h-full object-cover" />
                      ) : (
                        <Briefcase className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white/80 text-xs font-semibold truncate max-w-[110px] group-hover:text-white transition-colors">{svc.name}</p>
                    </div>
                    {/* Quick action icons */}
                    <div className="flex items-center gap-1 shrink-0">
                      {svc.whatsapp && (
                        <a
                          href={`https://wa.me/${svc.whatsapp.replace(/[^0-9+]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-6 h-6 rounded-md bg-green-600/80 hover:bg-green-500 flex items-center justify-center text-white transition-all"
                        >
                          <MessageCircle className="w-3 h-3" />
                        </a>
                      )}
                      {svc.phone && (
                        <a
                          href={`tel:${svc.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-6 h-6 rounded-md bg-blue-600/80 hover:bg-blue-500 flex items-center justify-center text-white transition-all"
                        >
                          <Phone className="w-3 h-3" />
                        </a>
                      )}
                      {svc.instagram && (
                        <a
                          href={svc.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-6 h-6 rounded-md bg-pink-600/80 hover:bg-pink-500 flex items-center justify-center text-white transition-all"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </a>
                      )}
                    </div>
                  </button>
                ))}
                {tourServices.length > 3 && (
                  <button
                    onClick={() => setShowServices(true)}
                    className="flex-shrink-0 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.1] transition-all text-xs font-medium"
                  >
                    View all
                  </button>
                )}
              </div>
            )}

            {/* Chambers strip */}
            {bottomTab === "chambers" && tourChambers.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide justify-center">
                {tourChambers.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => navigateToChamber(ch)}
                    className="flex-shrink-0 flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl p-2 pr-4 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex items-center justify-center shrink-0">
                      {ch.imageUrl ? (
                        <img src={ch.imageUrl} alt={ch.name} className="w-full h-full object-cover" />
                      ) : (
                        <DoorOpen className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/80 text-xs font-semibold truncate max-w-[110px] group-hover:text-white transition-colors">{ch.name}</p>
                      {ch.price != null && (
                        <p className="text-purple-300 text-xs font-bold mt-0.5">{ch.price} <span className="text-white/30 text-[10px]">{ch.currency || "TND"}</span></p>
                      )}
                    </div>
                  </button>
                ))}
                {tourChambers.length > 3 && (
                  <button
                    onClick={() => setShowChambers(true)}
                    className="flex-shrink-0 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.1] transition-all text-xs font-medium"
                  >
                    View all
                  </button>
                )}
              </div>
            )}

            {/* Immobilier rooms strip */}
            {bottomTab === "rooms" && immoRooms.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide justify-center">
                {immoRooms.map((room, ri) => (
                  <button
                    key={ri}
                    onClick={() => {
                      if (room.imageUrl || room.description) setSelectedImmoRoom(room);
                      if (room.tagSid) flyToTag(room.tagSid);
                    }}
                    className="flex-shrink-0 flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl p-2 pr-4 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white overflow-hidden flex items-center justify-center shrink-0">
                      {room.imageUrl ? (
                        <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover" />
                      ) : (
                        <DoorOpen className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/80 text-xs font-semibold truncate max-w-[110px] group-hover:text-white transition-colors">{room.name || room.type}</p>
                      {room.type && room.name !== room.type && (
                        <p className="text-white/30 text-[10px] truncate mt-0.5">{room.type}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Coaches strip */}
            {bottomTab === "coaches" && gymCoaches.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide justify-center">
                {gymCoaches.map((coach, ci) => (
                  <button
                    key={ci}
                    onClick={() => setSelectedCoach(coach)}
                    className="flex-shrink-0 flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl p-2 pr-4 transition-all group"
                  >
                    {coach.imageUrl ? (
                      <img src={coach.imageUrl} alt={coach.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-400/30" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border-2 border-purple-400/30">
                        <User className="w-5 h-5 text-purple-300" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-white/80 text-xs font-semibold truncate max-w-[120px] group-hover:text-white transition-colors">{coach.name}</p>
                      {coach.title && <p className="text-white/40 text-[10px] truncate max-w-[120px]">{coach.title}</p>}
                      {coach.price && <p className="text-purple-300 text-xs font-bold mt-0.5">{coach.price}</p>}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Custom section strip */}
            {activeCustom && (
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide justify-center">
                {activeCustom.items.map((item, idx) => {
                  const Icn = ICON_MAP[item.icon] || Layers;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!item.tagSid) return;
                        if (item.tagSid.startsWith("http")) {
                          window.open(item.tagSid, "_blank");
                        } else {
                          flyToTag(item.tagSid);
                        }
                      }}
                      className="flex-shrink-0 flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl p-2 pr-4 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-400/30 overflow-hidden">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <Icn className="w-5 h-5 text-purple-300" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white/80 text-xs font-semibold truncate max-w-[120px] group-hover:text-white transition-colors">{item.name}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          </motion.div>
        </div>
        );
      })()}
    </div>
  );
};

export default TourViewer;
