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
  Globe,
} from "lucide-react";
import { connectBundleSdk, registerVideoScreenComponents, createVideoScreenObjects, createAvatarObject, type VideoScreenData, type AvatarSceneData } from "@/utils/matterportBundle";
import { iconToPngDataUri, findIconByName } from "@/components/TagIconPicker";

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
  bookNowUrl?: string;
  bookNowEnabled?: boolean;
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
  bookingEnabled?: boolean;
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
  items: { name: string; iconKey: string; sub?: string; tagSid?: string; imageUrl?: string; bookingUrl?: string; bookingEnabled?: boolean }[];
  amenities?: string[];
  onItemClick?: (tagSid: string) => void;
  onBookClick?: (tagSid: string, name: string, bookingUrl?: string) => void;
}

const HotelMenuSection = ({ title, iconKey, items, amenities, onItemClick, onBookClick }: MenuSectionProps) => {
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
                onClick={() => { if (hasTag && onBookClick && (item.bookingUrl || item.bookingEnabled)) onBookClick(item.tagSid!, item.name, item.bookingUrl); else if (hasTag) onItemClick?.(item.tagSid!); }}
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

/* ── Wedding Category Section — Category → flat list of items (click → popup) ── */
const WeddingCategorySection = ({ id, title, providers, onProviderClick }: {
  id?: string;
  title: string;
  providers: WeddingProviderData[];
  onProviderClick: (provider: WeddingProviderData) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div id={id} className="border-b border-white/[0.06] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 transition-all hover:bg-white/[0.05] group"
      >
        <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-white/[0.1] transition-colors">
          <Layers className="w-4 h-4 text-white/60" />
        </div>
        <span className="text-white/85 text-[13px] font-medium flex-1 text-left">{title}</span>
        <span className="text-white/30 text-[10px] mr-2">{providers.length}</span>
        <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-1">
          {providers.map((provider, pi) => (
            <div
              key={pi}
              onClick={() => onProviderClick(provider)}
              className="flex items-center gap-3 px-5 py-2.5 ml-4 mr-2 rounded-lg cursor-pointer transition-all hover:bg-white/[0.06]"
            >
              {provider.imageUrl ? (
                <img src={provider.imageUrl} alt={provider.name || provider.subsection} className="w-10 h-10 rounded-lg object-cover shrink-0 border border-white/10" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                  <Layers className="w-3.5 h-3.5 text-white/30" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-[12px] font-medium truncate">{provider.subsection || provider.name}</p>
                {provider.name && provider.subsection && <p className="text-white/35 text-[10px] truncate">{provider.name}</p>}
                {provider.price && <p className="text-white/30 text-[10px] truncate mt-0.5">{provider.price}</p>}
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0" />
            </div>
          ))}
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
  link: string;
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
  bookingEnabled?: boolean;
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

interface WeddingProviderData {
  category: string;
  subsection: string;
  name: string;
  description: string;
  imageUrl: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  website: string;
  price: string;
  tagSid: string;
}

interface WeddingPackageData {
  name: string;
  description: string;
  price: string;
  currency: string;
  features: string[];
}

interface WeddingVenueData {
  capacity: number | null;
  priceRange: string;
  parkingSpaces: number | null;
  bookingUrl: string;
  amenities: string[];
  providers: WeddingProviderData[];
  packages: WeddingPackageData[];
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  address: string;
  openingHours: string;
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
  mediaType?: string; // Matterport media type: "photo", "video", "rich", etc.
  attachments?: TagAttachment[];
  anchorPosition?: { x: number; y: number; z: number };
}

interface CustomTagData {
  id: number;
  label: string;
  description: string;
  mediaType: string;
  mediaUrl: string;
  iconUrl: string;
  iconName?: string;
  color: string;
  anchorX: number;
  anchorY: number;
  anchorZ: number;
  stemHeight: number;
  stemDirX?: number;
  stemDirY?: number;
  stemDirZ?: number;
  floorIndex: number;
  enabled: boolean;
  cameraYaw?: number;
  cameraPitch?: number;
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
  // pin and mt default to ON (show tags by default)
  const bOn = (v?: boolean) => (v === false ? "0" : "1");
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
    pin: bOn(features.pin),
    mt: "1",
    portal: bOn(features.portal),
    lang: "en",
  });
  for (const [k, v] of Object.entries(extraParams)) params.set(k, v);
  if (withSdkKey) params.set("applicationKey", SDK_KEY);
  return `/bundle/showcase.html?${params.toString()}`;
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
  "Location saisonnière": "Seasonal Rental",
  "Location saisonniÃ¨re": "Seasonal Rental",
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
const ROOM_TYPE_DISPLAY: Record<string, string> = {
  "Chambre": "Rooms",
  "Cuisine": "Kitchen",
  "Terrasse": "Terrace",
  "Salon": "Living",
  "Salle de bain": "Bathroom",
  "Bureau": "Office",
  "Jardin": "Garden",
  "Garage": "Parking",
  "Entrée": "Entrance",
  "Couloir": "Hallway",
  "Balcon": "Balcony",
  "Buanderie": "Laundry",
  "Cave": "Basement",
  "Grenier": "Attic",
  "Dressing": "Dressing",
};
const displayRoomType = (v?: string) => (v ? (ROOM_TYPE_DISPLAY[v] || v) : "");
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
    "Wedding venue": "Wedding venue",
    "Wedding Venue": "Wedding venue",
  };
  return map[v] || v;
};

const extractYoutubeId = (url: string): string | null => {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
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
  const tagDataCacheRef = useRef<Map<string, TagItem>>(new Map()); // pre-cached tag data for instant hover
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
  const [tagPopupPos, setTagPopupPos] = useState<{ x: number; y: number } | null>(null);

  // Floor selector state
  const [floors, setFloors] = useState<{index: number; name: string}[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(-1);

  // Tour Items (products) & Cart
  const [tourItems, setTourItems] = useState<TourItemData[]>([]);
  const tourItemsRef = useRef<TourItemData[]>([]);
  const customTagsRef = useRef<CustomTagData[]>([]);
  const customTagSidsRef = useRef<Set<string>>(new Set());
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
  const [weddingData, setWeddingData] = useState<WeddingVenueData | null>(null);
  const [weddingCatVisibility, setWeddingCatVisibility] = useState<Record<string, string>>({});
  const [activeWeddingCategory, setActiveWeddingCategory] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<WeddingProviderData | null>(null);
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
      fetch(`/api/tours/${id}/custom-tags`)
        .then((r) => r.ok ? r.json() : [])
        .catch(() => []),
    ])
      .then(([tourData, tours, itemsData, servicesData, chambersData, tagsData, customTagsData]) => {
        setTour(tourData);
        setAllTours(tours);
        // Parse gym coaches from metadataJson
        if (normalizeCategory(tourData.category) === "Gym & Fitness" && tourData.metadataJson) {
          try {
            const meta = JSON.parse(tourData.metadataJson);
            setGymCoaches(Array.isArray(meta.coaches) ? meta.coaches : []);
          } catch { setGymCoaches([]); }
        } else { setGymCoaches([]); }
        // Parse wedding data from metadataJson
        if (normalizeCategory(tourData.category) === "Wedding venue") {
          if (tourData.metadataJson) {
            try {
              const meta = JSON.parse(tourData.metadataJson);
              const w = meta.wedding || {};
              setWeddingData({
                capacity: w.capacity ?? meta.weddingCapacity ?? null,
                priceRange: w.priceRange || meta.weddingPriceRange || '',
                parkingSpaces: w.parkingSpaces ?? meta.weddingParkingSpaces ?? null,
                bookingUrl: w.bookingUrl || meta.weddingBookingUrl || '',
                amenities: Array.isArray(w.amenities) ? w.amenities : (Array.isArray(meta.weddingAmenities) ? meta.weddingAmenities : []),
                providers: Array.isArray(meta.weddingProviders) ? meta.weddingProviders : (Array.isArray(w.providers) ? w.providers : []),
                packages: Array.isArray(meta.weddingPackages) ? meta.weddingPackages : (Array.isArray(w.packages) ? w.packages : []),
                phone: w.phone || '',
                whatsapp: w.whatsapp || '',
                email: w.email || '',
                website: w.website || '',
                instagram: w.instagram || '',
                facebook: w.facebook || '',
                tiktok: w.tiktok || '',
                address: w.address || '',
                openingHours: w.openingHours || '',
              });
              setWeddingCatVisibility(meta.weddingCatVisibility || {});
            } catch { setWeddingData(null); setWeddingCatVisibility({}); }
          }
        } else { setWeddingData(null); }
        // Parse immobilier rooms from metadataJson, enrich with chambers data
        if (normalizeCategory(tourData.category) === "Immobilier") {
          let rooms: { name: string; type: string; tagSid: string; imageUrl: string; description: string }[] = [];
          if (tourData.metadataJson) {
            try {
              const meta = JSON.parse(tourData.metadataJson);
              rooms = Array.isArray(meta.immobilierRooms) ? meta.immobilierRooms : [];
            } catch {}
          }
          // Only fall back to chambers API if no immobilierRooms in metadata
          if (rooms.length === 0) {
            const chambers = Array.isArray(chambersData) ? chambersData : [];
            if (chambers.length > 0) {
              rooms = chambers.map((ch: any) => ({
                name: ch.name || "",
                type: "",
                tagSid: ch.tagSid || "",
                imageUrl: ch.imageUrl || "",
                description: ch.description || "",
              }));
            }
          }
          // Deduplicate by name+tagSid
          const seen = new Set<string>();
          rooms = rooms.filter(r => {
            const key = `${r.name}|${r.tagSid}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          setImmoRooms(rooms);
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
        // Store custom tags
        const ctags = Array.isArray(customTagsData) ? customTagsData.filter((t: any) => t.enabled !== false) : [];
        customTagsRef.current = ctags;
        const services = Array.isArray(servicesData) ? servicesData : [];
        const chambers = Array.isArray(chambersData) ? chambersData : [];
        setTourServices(services);
        setTourChambers(chambers);
        // Auto-select first available tab (respecting bottomStrip config)
        let bsc = { products: true, services: true, chambers: true };
        if (tourData.metadataJson) { try { const m = JSON.parse(tourData.metadataJson); if (m.bottomStrip) bsc = m.bottomStrip; } catch {} }
        let tabSet = false;
        if (normalizeCategory(tourData.category) === "Immobilier") {
          try { const m = JSON.parse(tourData.metadataJson || "{}"); if (Array.isArray(m.immobilierRooms) && m.immobilierRooms.length > 0) {
            const firstRoom = m.immobilierRooms[0];
            let firstType = displayRoomType(firstRoom.type) || "";
            if (!firstType) {
              const n = (firstRoom.name || "").toLowerCase();
              if (n.includes("pool") || n.includes("piscine")) firstType = "Pool";
              else if (n.includes("kitchen") || n.includes("cuisine")) firstType = "Kitchen";
              else if (n.includes("terrace") || n.includes("terrasse")) firstType = "Terrace";
              else if (n.includes("living") || n.includes("salon")) firstType = "Living";
              else if (n.includes("bathroom") || n.includes("toilette") || n.includes("wc")) firstType = "Bathroom";
              else if (n.includes("parking") || n.includes("garage")) firstType = "Parking";
              else if (n.includes("room") || n.includes("chambre") || n.includes("bedroom")) firstType = "Rooms";
              else firstType = firstRoom.name || "Other";
            }
            setBottomTab(`immo_${firstType}`); tabSet = true;
          } } catch {}
        }
        if (!tabSet && chambers.length > 0 && bsc.chambers) { setBottomTab("chambers"); tabSet = true; }
        if (!tabSet && items.length > 0 && bsc.products) { setBottomTab("products"); tabSet = true; }
        if (!tabSet && services.length > 0 && bsc.services) { setBottomTab("services"); tabSet = true; }
        if (!tabSet && normalizeCategory(tourData.category) === "Gym & Fitness") { setBottomTab("coaches"); tabSet = true; }
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

    // Aggressively close native Matterport popup (it renders async so single close isn't enough)
    const forceCloseNative = (sdk: any, tagSid: string) => {
      const doClose = () => {
        try { if (sdk.Mattertag?.close) sdk.Mattertag.close(tagSid); } catch {}
        try { if (sdk.Tag?.close) sdk.Tag.close(tagSid); } catch {}
      };
      doClose();
      setTimeout(doClose, 50);
      setTimeout(doClose, 150);
      setTimeout(doClose, 300);
    };

    const handleTagClick = async (sdk: any, tagSid: string) => {
      try {
        console.log("🏷️ Tag clicked — SID:", tagSid);

        // Close native popup immediately and repeatedly
        forceCloseNative(sdk, tagSid);

        // Check if this is a video tag
        const videoInfo = videoTagMapRef.current.get(tagSid);
        if (videoInfo) {
          console.log("🎬 Video tag clicked:", videoInfo);
          // videoInfo from Mattertag is no longer used for popup
          return;
        }

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
              mediaType: found.media?.type || found.mediaType || "",
              attachments: resolvedAttachments,
              anchorPosition: found.anchorPosition,
            };
          }
        }

        // Fallback / merge: if no Tag data or no media found, use legacy Mattertag data
        if (mt) {
          const mtMediaSrc = mt.media?.src || "";
          const mtMediaType = mt.media?.type || "";
          if (!tagData) {
            tagData = {
              sid: mt.sid,
              label: mt.label || "",
              description: mt.description || "",
              mediaUrl: mtMediaSrc,
              mediaSrc: mtMediaSrc,
              mediaType: mtMediaType,
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
          forceCloseNative(sdk, tagSid);
          // Show custom product popup instead
          setSelectedItem(matchedItem);
          setActiveTagFilter(matchedItem.tagSid);
          return;
        }
        // For non-product tags: merge with cached data (enriched from Graph API) and show custom popup
        // The SDK doesn't expose image media, but the Graph API cache has fileAttachment URLs
        const cachedTag = tagDataCacheRef.current.get(tagSid);
        if (cachedTag) {
          // Merge cached data into tagData
          if (tagData) {
            if (!tagData.mediaSrc && cachedTag.mediaSrc) { tagData.mediaSrc = cachedTag.mediaSrc; tagData.mediaUrl = cachedTag.mediaUrl; }
            if (!tagData.mediaType && cachedTag.mediaType) tagData.mediaType = cachedTag.mediaType;
            if ((!tagData.attachments || tagData.attachments.length === 0) && cachedTag.attachments && cachedTag.attachments.length > 0) tagData.attachments = cachedTag.attachments;
            if (!tagData.description && cachedTag.description) tagData.description = cachedTag.description;
            if (!tagData.anchorPosition && cachedTag.anchorPosition) tagData.anchorPosition = cachedTag.anchorPosition;
          } else {
            tagData = { ...cachedTag };
          }
        }

        if (tagData) {
          console.log("🖼️ NON-PRODUCT TAG DATA (enriched):", JSON.stringify(tagData));
          if (tour?.id) trackEvent(tour.id, "tag_click", tagData.label || tagSid, tagSid);

          // Always close native popup and show our custom popup
          forceCloseNative(sdk, tagSid);
          setSelectedTag(tagData);
        }
      } catch (err) {
        console.log("Tag data error:", err);
      }
    };

    const connectSdk = async () => {
      try {
        const modelId = extractModelId(tour.tourUrl);
        if (!modelId) throw new Error("No model ID");

        let sdk: any = null;

        // Try Bundle SDK first (gives Scene API for 3D objects)
        try {
          console.log("[SDK] Trying Bundle SDK (MP_SDK.connect)...");
          sdk = await Promise.race([
            connectBundleSdk(iframeRef.current!, SDK_KEY),
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Bundle SDK timeout")), 15000)),
          ]);
          console.log("✅ SDK connected (Bundle SDK)");
        } catch (bundleErr) {
          console.log("⚠️ Bundle SDK failed, falling back to setupSdk:", bundleErr);
          const { setupSdk } = await import("@matterport/sdk");
          sdk = await Promise.race([
            setupSdk(SDK_KEY, { iframe: iframeRef.current!, space: modelId }),
            new Promise<never>((_, reject) => setTimeout(() => reject(new Error("SDK timeout")), 30000)),
          ]);
          console.log("✅ SDK connected (Embed SDK fallback)");
        }

        if (cancelled) return;

        // Log available SDK namespaces for debugging
        const hasScene = !!(sdk.Scene?.register && sdk.Scene?.deserialize);
        console.log("🔧 SDK capabilities:", {
          Scene: hasScene,
          SceneRegister: !!sdk.Scene?.register,
          SceneDeserialize: !!sdk.Scene?.deserialize,
          SceneCreateObjects: !!sdk.Scene?.createObjects,
          Camera: !!sdk.Camera,
          Tag: !!sdk.Tag,
          Mattertag: !!sdk.Mattertag,
          Conversion: !!sdk.Conversion,
          Floor: !!sdk.Floor,
          Sweep: !!sdk.Sweep,
        });

        // Register Scene components for 3D video screens (only if Scene API available)
        if (hasScene) {
          try {
            await registerVideoScreenComponents(sdk);
            console.log("✅ Scene components registered");
          } catch (e) {
            console.log("⚠️ Scene component registration failed:", e);
          }
        }

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

        // Pre-cache all tag data (media, description) for instant hover popups
        try {
          tagDataCacheRef.current.clear();
          if (sdk.Tag?.getData) {
            const allTags = await sdk.Tag.getData();
            // Resolve all attachments once
            let allAttachments: any[] = [];
            try {
              if (sdk.Tag?.attachments?.getData) {
                allAttachments = await sdk.Tag.attachments.getData();
                console.log("🏷️ All attachments from API:", allAttachments);
              }
            } catch {}
            if (!allAttachments.length && sdk.Tag?.attachments?.data) {
              try {
                allAttachments = await new Promise<any[]>((resolve) => {
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
              } catch {}
            }

            for (const t of allTags) {
              console.log("🏷️ Tag raw:", t.sid, "label:", t.label, "media:", t.media, "mediaSrc:", t.mediaSrc, "mediaType:", t.mediaType, "attachments:", t.attachments);
              const attachmentIds: string[] = Array.isArray(t.attachments) ? t.attachments : [];
              const resolved = allAttachments
                .filter((a: any) => attachmentIds.includes(a.id))
                .map((a: any) => ({ id: a.id, type: String(a.type || ""), src: a.src || a.url || "" }))
                .filter((a: TagAttachment) => !!a.src);

              // Also check legacy mattertag for media
              const mt = mattertagsRef.current.find((m: any) => m.sid === t.sid);
              const mtMediaSrc = mt?.media?.src || "";
              const firstAttachmentSrc = resolved.length > 0 ? resolved[0].src : "";
              const mediaSrc = t.mediaSrc || t.media?.src || mtMediaSrc || firstAttachmentSrc || "";

              tagDataCacheRef.current.set(t.sid, {
                sid: t.sid,
                label: t.label || mt?.label || "",
                description: t.description || mt?.description || "",
                mediaUrl: mediaSrc,
                mediaSrc: mediaSrc,
                mediaType: t.media?.type || t.mediaType || mt?.media?.type || "",
                attachments: resolved,
                anchorPosition: t.anchorPosition,
              });
            }
            // Also add legacy-only mattertags not in Tag API
            for (const mt of mattertagsRef.current) {
              if (!tagDataCacheRef.current.has(mt.sid)) {
                tagDataCacheRef.current.set(mt.sid, {
                  sid: mt.sid,
                  label: mt.label || "",
                  description: mt.description || "",
                  mediaUrl: mt.media?.src || "",
                  mediaSrc: mt.media?.src || "",
                  mediaType: mt.media?.type || "",
                  attachments: [],
                  anchorPosition: mt.anchorPosition,
                });
              }
            }
            console.log("🏷️ Pre-cached", tagDataCacheRef.current.size, "tags for hover");

            // Enrich tag cache with fileAttachments from Matterport Graph API
            // (Bundle SDK doesn't expose image media — Graph API does)
            try {
              const modelId = extractModelId(tour.tourUrl);
              if (modelId) {
                const graphBody = JSON.stringify({
                  query: `query { model(id: "${modelId}") { mattertags { id label description media mediaType fileAttachments { id filename mimeType url } } } }`
                });
                const graphResp = await fetch("https://my.matterport.com/api/mp/models/graph", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: graphBody,
                });
                if (graphResp.ok) {
                  const graphData = await graphResp.json();
                  const apiTags: any[] = graphData?.data?.model?.mattertags || [];
                  console.log("🌐 Graph API returned", apiTags.length, "mattertags");
                  for (const apiTag of apiTags) {
                    const cached = tagDataCacheRef.current.get(apiTag.id);
                    // Merge fileAttachments as media source
                    const fileUrl = apiTag.fileAttachments?.[0]?.url || "";
                    const fileMime = apiTag.fileAttachments?.[0]?.mimeType || "";
                    const apiMediaSrc = apiTag.media || fileUrl;
                    const apiAttachments: TagAttachment[] = (apiTag.fileAttachments || []).map((fa: any) => ({
                      id: fa.id, type: fa.mimeType || "", src: fa.url || "",
                    }));
                    if (cached) {
                      // Enrich existing cache entry if it has no media
                      if (!cached.mediaSrc && apiMediaSrc) {
                        cached.mediaSrc = apiMediaSrc;
                        cached.mediaUrl = apiMediaSrc;
                      }
                      if (!cached.mediaType && fileMime) {
                        cached.mediaType = fileMime;
                      }
                      if ((!cached.attachments || cached.attachments.length === 0) && apiAttachments.length > 0) {
                        cached.attachments = apiAttachments;
                      }
                      if (!cached.description && apiTag.description) {
                        cached.description = apiTag.description;
                      }
                    } else {
                      // Tag exists in API but not in SDK — add it
                      tagDataCacheRef.current.set(apiTag.id, {
                        sid: apiTag.id,
                        label: apiTag.label || "",
                        description: apiTag.description || "",
                        mediaUrl: apiMediaSrc,
                        mediaSrc: apiMediaSrc,
                        mediaType: fileMime || apiTag.mediaType || "",
                        attachments: apiAttachments,
                      });
                    }
                  }
                  console.log("🏷️ Enriched tag cache to", tagDataCacheRef.current.size, "tags");
                }
              }
            } catch (e) { console.log("Graph API enrichment failed (non-critical):", e); }
          }
        } catch (e) { console.log("Tag cache error:", e); }

        // ===== ADD CUSTOM TAGS TO 3D SCENE =====
        try {
          const ctags = customTagsRef.current;
          if (ctags.length > 0) {
            console.log("🏷️ Adding", ctags.length, "custom tags to scene");
            // Pre-generate icon URLs for tags that have iconName
            // Upload PNGs to server to get real HTTPS URLs (Matterport iframe blocks data URIs)
            const iconUris: (string | null)[] = await Promise.all(
              ctags.map(async (ct) => {
                if (ct.iconName) {
                  const iconDef = findIconByName(ct.iconName);
                  if (iconDef) {
                    try {
                      const pngDataUri = await iconToPngDataUri(iconDef.paths, "#ffffff", ct.color || "#4A90D9");
                      // Convert data URI to blob and upload for a real URL
                      const resp = await fetch(pngDataUri);
                      const blob = await resp.blob();
                      const formData = new FormData();
                      formData.append("file", blob, `tag-icon-${ct.id || ct.iconName}.png`);
                      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
                      const uploadData = await uploadRes.json();
                      if (uploadData.url) {
                        // Make URL absolute for Matterport iframe (it runs on different origin)
                        const absoluteUrl = uploadData.url.startsWith("http")
                          ? uploadData.url
                          : window.location.origin + uploadData.url;
                        console.log("🏷️ Icon uploaded:", absoluteUrl);
                        return absoluteUrl;
                      }
                    } catch (e) { console.log("🏷️ Icon upload failed, using data URI:", e); }
                    // Fallback to data URI
                    return await iconToPngDataUri(iconDef.paths, "#ffffff", ct.color || "#4A90D9");
                  }
                }
                return ct.iconUrl || null;
              })
            );

            const descriptors = ctags.map((ct, idx) => {
              const hex = (ct.color || "#4A90D9").replace("#", "");
              const r = parseInt(hex.substring(0, 2), 16) / 255;
              const g = parseInt(hex.substring(2, 4), 16) / 255;
              const b = parseInt(hex.substring(4, 6), 16) / 255;
              const desc: any = {
                label: ct.label || "",
                description: ct.description || "",
                anchorPosition: { x: ct.anchorX, y: ct.anchorY, z: ct.anchorZ },
                stemVector: ct.stemDirX != null
                  ? { x: ct.stemDirX * (ct.stemHeight || 0.3), y: ct.stemDirY * (ct.stemHeight || 0.3), z: ct.stemDirZ * (ct.stemHeight || 0.3) }
                  : { x: 0, y: ct.stemHeight || 0.3, z: 0 },
                color: { r, g, b },
                floorIndex: ct.floorIndex || 0,
              };
              if (iconUris[idx]) desc.iconSrc = iconUris[idx];
              return desc;
            });
            try {
              const sids = await sdk.Mattertag.add(descriptors);
              console.log("🏷️ Custom tags added with SIDs:", sids);
              customTagSidsRef.current.clear();
              for (let idx = 0; idx < sids.length; idx++) {
                const sid = sids[idx];
                customTagSidsRef.current.add(sid);
                const ct = ctags[idx];
                // Add to tag data cache so click handler can find media
                tagDataCacheRef.current.set(sid, {
                  sid,
                  label: ct.label,
                  description: ct.description,
                  mediaSrc: ct.mediaUrl || "",
                  mediaType: ct.mediaType || "",
                  mediaUrl: ct.mediaUrl || "",
                  anchorPosition: { x: ct.anchorX, y: ct.anchorY, z: ct.anchorZ },
                });
                // Set custom icon if provided
                const iconUri = iconUris[idx];
                if (iconUri) {
                  try {
                    const iconId = `custom-icon-${ct.id || idx}`;
                    await sdk.Mattertag.registerIcon(iconId, iconUri);
                    await sdk.Mattertag.editIcon(sid, iconId); 
                    console.log("🏷️ Icon set for", ct.label);
                  } catch (e) { console.log("🏷️ Icon edit failed:", e); }
                }
                // Set custom color if provided
                if (ct.color) {
                  try {
                    const hex = ct.color.replace("#", "");
                    const r = parseInt(hex.substring(0, 2), 16) / 255;
                    const g = parseInt(hex.substring(2, 4), 16) / 255;
                    const b = parseInt(hex.substring(4, 6), 16) / 255;
                    await sdk.Mattertag.editColor(sid, { r, g, b });
                  } catch (e) { console.log("🏷️ Color edit failed:", e); }
                }
              }
            } catch (e) { console.log("Mattertag.add failed, trying Tag.add:", e); }
          }
        } catch (e) { console.log("Custom tag injection error:", e); }

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
                // Check if custom tags are still present, re-add if missing
                const existingSids = new Set(tags.map((t: any) => t.sid));
                const missingCustomTags = customTagsRef.current.filter((_ct, idx) => {
                  const sids = Array.from(customTagSidsRef.current);
                  return sids[idx] && !existingSids.has(sids[idx]);
                });
                if (missingCustomTags.length > 0) {
                  console.log("🔄 Re-adding", missingCustomTags.length, "missing custom tags after mode change");
                  const descriptors = missingCustomTags.map((ct) => {
                    const hex = (ct.color || "#4A90D9").replace("#", "");
                    const r = parseInt(hex.substring(0, 2), 16) / 255;
                    const g = parseInt(hex.substring(2, 4), 16) / 255;
                    const b = parseInt(hex.substring(4, 6), 16) / 255;
                    return {
                      label: ct.label || "",
                      description: ct.description || "",
                      anchorPosition: { x: ct.anchorX, y: ct.anchorY, z: ct.anchorZ },
                      stemVector: ct.stemDirX != null
                        ? { x: ct.stemDirX * (ct.stemHeight || 0.3), y: ct.stemDirY * (ct.stemHeight || 0.3), z: ct.stemDirZ * (ct.stemHeight || 0.3) }
                        : { x: 0, y: ct.stemHeight || 0.3, z: 0 },
                      color: { r, g, b },
                      floorIndex: ct.floorIndex || 0,
                    };
                  });
                  try {
                    const newSids = await sdk.Mattertag.add(descriptors);
                    console.log("🏷️ Re-added custom tags with SIDs:", newSids);
                    customTagSidsRef.current.clear();
                    // Re-register all custom tag SIDs
                    const allCtags = customTagsRef.current;
                    const allTags = await sdk.Tag.getData();
                    allTags.forEach((t: any) => {
                      if (t.label) tagsMapRef.current.set(t.label.trim().toLowerCase(), t.sid);
                      if (t.sid) tagsMapRef.current.set(t.sid, t.sid);
                    });
                    for (let i = 0; i < newSids.length; i++) {
                      customTagSidsRef.current.add(newSids[i]);
                      const ct = missingCustomTags[i];
                      tagDataCacheRef.current.set(newSids[i], {
                        sid: newSids[i],
                        label: ct.label,
                        description: ct.description,
                        mediaSrc: ct.mediaUrl || "",
                        mediaType: ct.mediaType || "",
                        mediaUrl: ct.mediaUrl || "",
                        anchorPosition: { x: ct.anchorX, y: ct.anchorY, z: ct.anchorZ },
                      });
                    }
                  } catch (e) { console.log("🏷️ Re-add custom tags failed:", e); }
                }
              }
            } catch (e) { console.log("Tag restore error:", e); }
          };

          // Listen for mode changes (Dollhouse ↔ Inside ↔ Floorplan, and Defurnished toggle)
          if (sdk.Mode?.Event?.CHANGE_START) {
            sdk.on(sdk.Mode.Event.CHANGE_START, () => {
              console.log("🔄 Mode change detected — tags may be temporarily hidden");
            });
          }
          if (sdk.Mode?.Event?.CHANGE_END) {
            sdk.on(sdk.Mode.Event.CHANGE_END, () => {
              console.log("✅ Mode change ended — restoring tags (including outside/exterior tags)");
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
        // Let Matterport handle hover natively (don't override open/close on hover)
        // Our previous explicit close on hover-off was preventing the full media popup from showing

        // Desktop hover: show our custom popup on hover, suppress native popup
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (!isTouchDevice) {
          const handleTagHover = (tagSid: string) => {
            // Close native popup aggressively so only our popup shows
            forceCloseNative(sdk, tagSid);
            handleTagClick(sdk, tagSid);
          };
          if (sdk.Tag?.Event?.HOVER) {
            sdk.on(sdk.Tag.Event.HOVER, handleTagHover);
          }
          if (sdk.Mattertag?.Event?.HOVER) {
            sdk.on(sdk.Mattertag.Event.HOVER, handleTagHover);
          }
        }

        // Prevent native Matterport popup from appearing — inject CSS to hide billboard
        try {
          const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
          if (iframeDoc) {
            const style = iframeDoc.createElement('style');
            style.textContent = '.tag-billboard, .billboard, .mattertag-billboard, [class*="billboard"], [class*="Billboard"] { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }';
            iframeDoc.head.appendChild(style);
          }
        } catch {} // cross-origin will throw, that's fine

        // Also try preventAction on the SDK level
        try {
          if (sdk.Mattertag?.preventAction) {
            sdk.Mattertag.preventAction(undefined, { opening: true });
          }
        } catch {}
        try {
          if (sdk.Tag?.preventAction) {
            sdk.Tag.preventAction(undefined, { opening: true });
          }
        } catch {}
      } catch (err) {
        if (cancelled) return;
        console.log("⚠️ SDK failed on localhost:", err);
        setSdkFailed(true);
      }
    };

    connectSdk();
    return () => { cancelled = true; };
  }, [iframeLoaded, tour?.tourUrl]);

  // Video Screens: wall-embedded 3D-perspective overlays with 4-corner projection
  const [activeVideoScreenId, setActiveVideoScreenId] = useState<number | null>(null);
  const activeVideoScreenIdRef = useRef<number | null>(null);
  useEffect(() => { activeVideoScreenIdRef.current = activeVideoScreenId; }, [activeVideoScreenId]);
  const videoTagMapRef = useRef<Map<string, { embedUrl: string }>>(new Map());
  const tagPopupHoveredRef = useRef(false);

  // Track selected tag position on screen for popup placement
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!selectedTag?.anchorPosition || !sdk?.Camera?.pose || !sdk?.Conversion?.worldToScreen) {
      setTagPopupPos(null);
      return;
    }
    const anchor = selectedTag.anchorPosition;
    let rafId: number;
    let poseSub: any;
    let latestPose: any = null;

    poseSub = sdk.Camera.pose.subscribe((pose: any) => { latestPose = pose; });

    const update = () => {
      rafId = requestAnimationFrame(update);
      if (!latestPose) return;
      const iframe = iframeRef.current;
      if (!iframe) return;
      const rect = iframe.getBoundingClientRect();
      const size = { w: rect.width, h: rect.height };
      const sp = sdk.Conversion.worldToScreen(anchor, latestPose, size);
      if (sp && typeof sp.x === "number" && sp.z > 0) {
        setTagPopupPos({ x: rect.left + sp.x, y: rect.top + sp.y });
      } else {
        setTagPopupPos(null);
      }
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      if (poseSub?.cancel) poseSub.cancel();
    };
  }, [selectedTag]);

  // Auto-dismiss tag popup if not hovered within 4s
  useEffect(() => {
    if (!selectedTag) return;
    tagPopupHoveredRef.current = false;
    const timer = setTimeout(() => {
      if (!tagPopupHoveredRef.current) setSelectedTag(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [selectedTag]);

  const [videoScreensData, setVideoScreensData] = useState<{ id: number; name: string; youtubeUrl: string; embedUrl: string; youtubeId: string; posX: number; posY: number; posZ: number; rotX: number; rotY: number; rotZ: number; width: number; height: number; iconType: string; visibilityRange: number }[]>([]);
  const videoOverlayContainerRef = useRef<HTMLDivElement>(null);
  const [fullscreenVideo, setFullscreenVideo] = useState<{ youtubeId: string; name: string } | null>(null);
  const [videoScreensVisible, setVideoScreensVisible] = useState(true);

  // Tour Guide (virtual avatar with TTS)
  const [tourGuideData, setTourGuideData] = useState<{ id: number; name: string; message: string; language: string; enabled: boolean } | null>(null);
  const [guideVisible, setGuideVisible] = useState(false);
  const [guideSpeaking, setGuideSpeaking] = useState(false);
  const guideSpeechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const guideOverlayRef = useRef<HTMLDivElement>(null);

  // Track avatar screen position from 3D world coords
  useEffect(() => {
    const sdk = sdkRef.current;
    const overlay = guideOverlayRef.current;
    const container = videoOverlayContainerRef.current;
    if (!sdk || !sdkConnected || !tourGuideData || !overlay || !container) return;
    const gd = tourGuideData as any;
    if (!gd.avatarUrl || /\.gl(b|tf)(\?|$)/i.test(gd.avatarUrl)) return;
    // Only do 3D tracking if position was set (posX/posY/posZ not all zero)
    if (gd.posX === 0 && gd.posY === 0 && gd.posZ === 0) return;

    let rafId: number;
    let currentPose: any = null;
    let poseChanged = true;

    const poseSub = sdk.Camera?.pose?.subscribe?.((pose: any) => {
      currentPose = pose;
      poseChanged = true;
    });

    const renderLoop = () => {
      rafId = requestAnimationFrame(renderLoop);
      if (!poseChanged || !currentPose || !sdk.Conversion?.worldToScreen) return;
      poseChanged = false;

      const worldPos = { x: gd.posX, y: gd.posY, z: gd.posZ };
      const size = { w: container.clientWidth, h: container.clientHeight };
      const sp = sdk.Conversion.worldToScreen(worldPos, currentPose, size);

      if (sp && typeof sp.x === "number" && sp.z > 0) {
        const dist = sp.z || 5;
        const scale = Math.min(1, 3 / dist);
        const pxH = 180 * scale;
        const pxW = 90 * scale;
        if (scale < 0.02) { overlay.style.display = "none"; return; }

        overlay.style.left = `${sp.x - pxW / 2}px`;
        overlay.style.top = `${sp.y - pxH}px`;
        overlay.style.width = `${pxW}px`;
        overlay.style.height = `${pxH}px`;
        overlay.style.display = "flex";
      } else {
        overlay.style.display = "none";
      }
    };
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId);
      if (poseSub?.cancel) poseSub.cancel();
    };
  }, [sdkConnected, tourGuideData]);

  const guideAudioRef = useRef<HTMLAudioElement | null>(null);

  const pickFemaleVoice = (lang: string): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    const langLower = lang.toLowerCase();
    const matching = voices.filter(v => v.lang.toLowerCase().startsWith(langLower));
    // Prefer female voice names
    const female = matching.find(v => /female|woman|zira|hazel|susan|jenny|aria|samantha|karen|fiona|moira|tessa/i.test(v.name));
    return female || matching[0] || null;
  };

  const speakGuide = () => {
    if (!tourGuideData?.message) return;
    // Stop any previous audio
    if (guideAudioRef.current) { guideAudioRef.current.pause(); guideAudioRef.current = null; }
    window.speechSynthesis.cancel();
    setGuideSpeaking(true);

    const lang = tourGuideData.language || 'en';
    const text = tourGuideData.message;

    // Use Google Translate TTS (supports Arabic, French, etc.) via audio element
    // Split text into chunks of max 200 chars for the API
    const chunks: string[] = [];
    let remaining = text;
    while (remaining.length > 0) {
      if (remaining.length <= 200) { chunks.push(remaining); break; }
      let splitAt = remaining.lastIndexOf(' ', 200);
      if (splitAt === -1) splitAt = 200;
      chunks.push(remaining.substring(0, splitAt));
      remaining = remaining.substring(splitAt).trim();
    }

    // Helper: speak full text with Web Speech API using a female voice
    const speakWithWebSpeech = () => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      const voice = pickFemaleVoice(lang);
      if (voice) utter.voice = voice;
      utter.pitch = 1.1;
      utter.onend = () => setGuideSpeaking(false);
      utter.onerror = () => setTimeout(() => setGuideSpeaking(false), 8000);
      window.speechSynthesis.speak(utter);
    };

    let currentChunk = 0;
    const playChunk = () => {
      if (currentChunk >= chunks.length) { setGuideSpeaking(false); return; }
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(chunks[currentChunk])}`;
      const audio = new Audio(url);
      guideAudioRef.current = audio;
      audio.onended = () => { currentChunk++; playChunk(); };
      audio.onerror = () => speakWithWebSpeech();
      audio.play().catch(() => speakWithWebSpeech());
    };
    playChunk();
  };

  const stopGuide = () => {
    if (guideAudioRef.current) { guideAudioRef.current.pause(); guideAudioRef.current = null; }
    window.speechSynthesis.cancel();
    setGuideSpeaking(false);
  };

  // Fetch video screens
  useEffect(() => {
    if (!sdkConnected || !tour?.id) return;
    let cancelled = false;
    fetch(`/api/tours/${tour.id}/video-screens`)
      .then(r => r.ok ? r.json() : [])
      .then((screens: any[]) => {
        if (cancelled) return;
        const data = screens
          .filter((s: any) => s.youtubeUrl)
          .map((s: any) => {
            const ytId = extractYoutubeId(s.youtubeUrl);
            return ytId ? {
              id: s.id,
              name: s.name || "Video",
              youtubeUrl: s.youtubeUrl,
              embedUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`,
              youtubeId: ytId,
              posX: s.posX || 0,
              posY: s.posY || 1.5,
              posZ: s.posZ || 0,
              rotX: s.rotX || 0,
              rotY: s.rotY || 0,
              rotZ: s.rotZ || 0,
              width: s.width || 2,
              height: s.height || 1.2,
              iconType: s.iconType || "youtube",
              visibilityRange: s.visibilityRange || 8,
            } : null;
          })
          .filter(Boolean) as any[];
        setVideoScreensData(data);
        // Also populate videoTagMapRef for handleTagClick compatibility
        videoTagMapRef.current.clear();
        console.log("🎬 [VideoScreen] Loaded", data.length, "screens for wall overlay");
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [sdkConnected, tour?.id]);

  // Fetch tour guide data
  useEffect(() => {
    if (!tour?.id) return;
    fetch(`/api/tours/${tour.id}/guides`)
      .then(r => r.ok ? r.json() : [])
      .then((guides: any[]) => {
        if (guides.length > 0 && guides[0].enabled && (guides[0].message || guides[0].avatarUrl)) {
          setTourGuideData(guides[0]);
          setGuideVisible(true);
        }
      })
      .catch(() => {});
  }, [tour?.id]);

  const videoSceneRef = useRef<any>(null);
  const avatarSceneRef = useRef<any>(null);
  const avatarProximityTriggered = useRef(false);

  // Create 3D avatar in Matterport scene when guide data is available
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk || !sdkConnected || !tourGuideData) return;
    if (!(tourGuideData as any).avatarUrl) return;
    if (!sdk.Scene?.deserialize) {
      console.log("⚠️ SDK Scene.deserialize not available for 3D avatar");
      return;
    }

    let cancelled = false;

    const setup = async () => {
      try {
        let glbUrl = (tourGuideData as any).avatarUrl;

        // Only load GLB files in scene (not PNG/GIF images)
        if (!/\.gl(b|tf)(\?|$)/i.test(glbUrl)) {
          console.log("⚠️ Avatar URL is not a GLB file, skipping 3D scene injection");
          return;
        }

        // Make relative URLs absolute (SDK iframe needs full URL)
        if (glbUrl.startsWith('/')) {
          glbUrl = `${window.location.origin}${glbUrl}`;
        }

        const avatarData: AvatarSceneData = {
          glbUrl,
          posX: (tourGuideData as any).posX ?? 0,
          posY: (tourGuideData as any).posY ?? 0,
          posZ: (tourGuideData as any).posZ ?? 0,
          rotY: (tourGuideData as any).rotY ?? 0,
          scale: 1.0,
        };

        if (cancelled) return;

        console.log("🧑 Loading 3D avatar:", avatarData);
        const result = await createAvatarObject(sdk, avatarData);

        if (cancelled) {
          result.dispose();
          return;
        }

        avatarSceneRef.current = result;
        avatarProximityTriggered.current = false;
        console.log("✅ 3D Avatar placed in tour scene");
      } catch (err) {
        console.log("⚠️ 3D avatar setup failed:", err);
      }
    };

    setup();

    return () => {
      cancelled = true;
      if (avatarSceneRef.current) {
        avatarSceneRef.current.dispose();
        avatarSceneRef.current = null;
      }
    };
  }, [sdkConnected, tourGuideData]);

  // Avatar face-camera rotation + proximity auto-speak
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk || !sdkConnected || !tourGuideData) return;
    const gd = tourGuideData as any;
    if (!gd.avatarUrl || !/\.gl(b|tf)(\?|$)/i.test(gd.avatarUrl)) return;

    const avatarPos = { x: gd.posX ?? 0, y: gd.posY ?? 0, z: gd.posZ ?? 0 };
    const SPEAK_DISTANCE = 5; // meters - trigger speech when within this range

    const poseSub = sdk.Camera?.pose?.subscribe?.((pose: any) => {
      if (!pose?.position) return;
      const cam = pose.position;

      // 1. Rotate avatar to face camera (Y-axis rotation)
      const scene = avatarSceneRef.current;
      if (scene?.avatarNode) {
        const dx = cam.x - avatarPos.x;
        const dz = cam.z - avatarPos.z;
        const angleY = Math.atan2(dx, dz) * (180 / Math.PI);
        try {
          scene.avatarNode.obj3D.rotation.y = angleY * (Math.PI / 180);
        } catch {
          // Fallback: try position property
          try {
            scene.avatarNode.rotation = { x: 0, y: angleY, z: 0 };
          } catch {}
        }
      }

      // 2. Proximity auto-speak
      const dist = Math.sqrt(
        (cam.x - avatarPos.x) ** 2 +
        (cam.y - avatarPos.y) ** 2 +
        (cam.z - avatarPos.z) ** 2
      );

      if (dist < SPEAK_DISTANCE && !avatarProximityTriggered.current && !guideSpeaking) {
        avatarProximityTriggered.current = true;
        setGuideVisible(true);
        console.log(`🗣️ Avatar proximity triggered (dist=${dist.toFixed(1)}m)`);
        speakGuide();
      } else if (dist > SPEAK_DISTANCE * 1.5) {
        // Stop voice and hide text when user moves away
        if (avatarProximityTriggered.current) {
          stopGuide();
          setGuideVisible(false);
        }
        avatarProximityTriggered.current = false;
      }
    });

    return () => {
      if (poseSub?.cancel) poseSub.cancel();
    };
  }, [sdkConnected, tourGuideData, guideSpeaking]);

  // Toggle 3D video screen visibility
  useEffect(() => {
    const scene = videoSceneRef.current;
    if (!scene?.sceneObject) return;
    try {
      for (const node of scene.sceneObject.nodeIterator()) {
        for (const comp of node.componentIterator()) {
          if (comp.inputs && 'visible' in comp.inputs) {
            comp.inputs.visible = videoScreensVisible;
          }
        }
      }
    } catch (e) {
      console.log("Toggle visibility error:", e);
    }
  }, [videoScreensVisible]);

  // Create 3D video screen objects using SDK Scene API
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk || !sdkConnected || videoScreensData.length === 0) return;
    if (!sdk.Scene?.deserialize) {
      console.log("⚠️ SDK Scene.deserialize not available for 3D video screens");
      return;
    }

    let cancelled = false;

    const setup = async () => {
      try {
        const screenData: VideoScreenData[] = videoScreensData.map(s => ({
          id: s.id,
          name: s.name,
          youtubeId: s.youtubeId,
          posX: s.posX,
          posY: s.posY,
          posZ: s.posZ,
          rotX: s.rotX,
          rotY: s.rotY,
          rotZ: s.rotZ,
          width: s.width,
          height: s.height,
          visibilityRange: s.visibilityRange,
        }));

        if (cancelled) return;

        const result = await createVideoScreenObjects(sdk, screenData, () => {});

        if (cancelled) {
          result.dispose();
          return;
        }

        videoSceneRef.current = result;
      } catch (err) {
        console.log("⚠️ 3D video screen setup failed:", err);
      }
    };

    setup();

    return () => {
      cancelled = true;
      if (videoSceneRef.current) {
        videoSceneRef.current.dispose();
        videoSceneRef.current = null;
      }
    };
  }, [sdkConnected, videoScreensData]);

  // Wall-embedded auto-play YouTube overlays with 4-corner perspective projection
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk || !sdkConnected || videoScreensData.length === 0) return;
    if (!sdk.Camera?.pose?.subscribe || !sdk.Conversion?.worldToScreen) {
      console.log("\u26a0\ufe0f worldToScreen not available");
      return;
    }

    const container = videoOverlayContainerRef.current;
    const showcaseIframe = document.getElementById('showcase-iframe') as HTMLIFrameElement;
    if (!container || !showcaseIframe) return;

    // --- Helper: compute 4 corners of a screen in world space ---
    const compute4Corners = (s: typeof videoScreensData[0]) => {
      const hw = s.width / 2, hh = s.height / 2;
      // Local corners: TL, TR, BR, BL (plane faces along local +Z)
      const local = [
        { x: -hw, y: hh, z: 0 },
        { x: hw, y: hh, z: 0 },
        { x: hw, y: -hh, z: 0 },
        { x: -hw, y: -hh, z: 0 },
      ];
      const ry = s.rotY * Math.PI / 180;
      const rx = s.rotX * Math.PI / 180;
      const rz = s.rotZ * Math.PI / 180;
      const cX = Math.cos(rx), sX = Math.sin(rx);
      const cY = Math.cos(ry), sY = Math.sin(ry);
      const cZ = Math.cos(rz), sZ = Math.sin(rz);
      return local.map(p => {
        // YXZ Euler rotation (Three.js default)
        let x = cY * p.x + sY * p.z;
        let y = p.y;
        let z = -sY * p.x + cY * p.z;
        const y2 = cX * y - sX * z;
        z = sX * y + cX * z; y = y2;
        const x2 = cZ * x - sZ * y;
        y = sZ * x + cZ * y; x = x2;
        return { x: x + s.posX, y: y + s.posY, z: z + s.posZ };
      });
    };

    // --- Helper: solve 8x8 homography → CSS matrix3d ---
    const computeMatrix3d = (sw: number, sh: number, dst: { x: number; y: number }[]): string | null => {
      const sx = [0, sw, sw, 0], sy = [0, 0, sh, sh];
      const dx = dst.map(p => p.x), dy = dst.map(p => p.y);
      const A: number[][] = [], b: number[] = [];
      for (let i = 0; i < 4; i++) {
        A.push([sx[i], sy[i], 1, 0, 0, 0, -dx[i] * sx[i], -dx[i] * sy[i]]);
        A.push([0, 0, 0, sx[i], sy[i], 1, -dy[i] * sx[i], -dy[i] * sy[i]]);
        b.push(dx[i]); b.push(dy[i]);
      }
      const n = 8;
      const aug = A.map((row, i) => [...row, b[i]]);
      for (let col = 0; col < n; col++) {
        let mr = col;
        for (let row = col + 1; row < n; row++)
          if (Math.abs(aug[row][col]) > Math.abs(aug[mr][col])) mr = row;
        [aug[col], aug[mr]] = [aug[mr], aug[col]];
        if (Math.abs(aug[col][col]) < 1e-10) return null;
        for (let row = col + 1; row < n; row++) {
          const f = aug[row][col] / aug[col][col];
          for (let j = col; j <= n; j++) aug[row][j] -= f * aug[col][j];
        }
      }
      const h = new Array(n);
      for (let row = n - 1; row >= 0; row--) {
        h[row] = aug[row][n];
        for (let col = row + 1; col < n; col++) h[row] -= aug[row][col] * h[col];
        h[row] /= aug[row][row];
      }
      // Homography H = [[h0,h1,h2],[h3,h4,h5],[h6,h7,1]] → CSS matrix3d (column-major)
      return `matrix3d(${h[0]},${h[3]},0,${h[6]}, ${h[1]},${h[4]},0,${h[7]}, 0,0,1,0, ${h[2]},${h[5]},0,1)`;
    };

    // --- Helper: compute screen normal in world space ---
    const computeNormal = (s: typeof videoScreensData[0]) => {
      // Screen faces local +Z; rotate by Euler YXZ
      const ry = s.rotY * Math.PI / 180;
      const rx = s.rotX * Math.PI / 180;
      const rz = s.rotZ * Math.PI / 180;
      const cX = Math.cos(rx), sX = Math.sin(rx);
      const cY = Math.cos(ry), sY = Math.sin(ry);
      const cZ = Math.cos(rz), sZ = Math.sin(rz);
      let x = sY; // local Z=(0,0,1) rotated by Y
      let y = 0;
      let z = cY;
      const y2 = cX * y - sX * z;
      z = sX * y + cX * z; y = y2;
      const x2 = cZ * x - sZ * y;
      y = sZ * x + cZ * y; x = x2;
      return { x, y, z };
    };

    const IW = 640, IH = 360; // internal iframe render size
    type Overlay = { el: HTMLDivElement; screen: typeof videoScreensData[0]; corners3D: ReturnType<typeof compute4Corners>; normal: { x: number; y: number; z: number } };
    const overlays: Overlay[] = [];

    for (const screen of videoScreensData) {
      const el = document.createElement('div');
      Object.assign(el.style, {
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: `${IW}px`,
        height: `${IH}px`,
        transformOrigin: '0 0',
        overflow: 'hidden',
        opacity: '0',
        pointerEvents: 'none',
        background: '#000',
        zIndex: '10',
      });
      const yt = document.createElement('iframe');
      let isMuted = true;
      const buildYtSrc = (muted: boolean) => `https://www.youtube.com/embed/${screen.youtubeId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${screen.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
      yt.src = buildYtSrc(true);
      Object.assign(yt.style, { width: '100%', height: '100%', border: 'none', display: 'block' });
      yt.allow = 'autoplay; encrypted-media';
      el.appendChild(yt);
      // Sound toggle button overlay
      const soundBtn = document.createElement('button');
      Object.assign(soundBtn.style, {
        position: 'absolute',
        top: '8px',
        right: '48px',
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: 'rgba(0,0,0,0.7)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '20',
        backdropFilter: 'blur(8px)',
      });
      const muteIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
      const volumeIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
      soundBtn.innerHTML = muteIcon;
      soundBtn.title = 'Unmute';
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isMuted = !isMuted;
        yt.src = buildYtSrc(isMuted);
        soundBtn.innerHTML = isMuted ? muteIcon : volumeIcon;
        soundBtn.title = isMuted ? 'Unmute' : 'Mute';
      });
      el.appendChild(soundBtn);
      // Expand button overlay
      const expandBtn = document.createElement('button');
      Object.assign(expandBtn.style, {
        position: 'absolute',
        top: '8px',
        right: '8px',
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: 'rgba(0,0,0,0.7)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '20',
        backdropFilter: 'blur(8px)',
      });
      expandBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
      expandBtn.title = 'Watch fullscreen';
      expandBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setFullscreenVideo({ youtubeId: screen.youtubeId, name: screen.name });
      });
      el.appendChild(expandBtn);
      container.appendChild(el);
      overlays.push({ el, screen, corners3D: compute4Corners(screen), normal: computeNormal(screen) });
    }

    console.log(`\ud83d\udcfa Wall video: ${overlays.length} screens (matrix3d perspective)`);

    const sub = sdk.Camera.pose.subscribe((pose: any) => {
      const vW = showcaseIframe.clientWidth;
      const vH = showcaseIframe.clientHeight;
      if (!vW || !vH) return;

      for (const { el, screen, corners3D, normal } of overlays) {
        if (!videoScreensVisible) {
          el.style.opacity = '0'; el.style.pointerEvents = 'none'; continue;
        }
        // Vector from screen center to camera
        const ddx = pose.position.x - screen.posX;
        const ddy = pose.position.y - screen.posY;
        const ddz = pose.position.z - screen.posZ;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);
        if (dist > screen.visibilityRange || dist < 0.3) {
          el.style.opacity = '0'; el.style.pointerEvents = 'none'; continue;
        }

        // Facing check: dot product of screen normal and camera-to-screen direction
        // If camera is behind the screen (dot < 0), hide it
        const dot = (ddx * normal.x + ddy * normal.y + ddz * normal.z) / dist;
        if (dot < 0.15) {
          // Camera is behind or at extreme side angle (>~80°)
          el.style.opacity = '0'; el.style.pointerEvents = 'none'; continue;
        }

        try {
          // Project all 4 corners to screen space
          const c2d = corners3D.map(c =>
            sdk.Conversion.worldToScreen(c, pose, { w: vW, h: vH })
          );
          // Skip if any corner behind camera
          if (c2d.some((c: any) => !c || c.z < 0)) {
            el.style.opacity = '0'; el.style.pointerEvents = 'none'; continue;
          }
          // Check projected size is reasonable
          const xs = c2d.map((c: any) => c.x), ys = c2d.map((c: any) => c.y);
          const pw = Math.max(...xs) - Math.min(...xs);
          const ph = Math.max(...ys) - Math.min(...ys);
          if (pw < 30 || ph < 20 || pw > vW * 0.95) {
            el.style.opacity = '0'; el.style.pointerEvents = 'none'; continue;
          }

          const matrix = computeMatrix3d(IW, IH, c2d);
          if (!matrix) { el.style.opacity = '0'; el.style.pointerEvents = 'none'; continue; }

          el.style.transform = matrix;
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
        } catch {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
        }
      }
    });

    return () => {
      sub?.cancel?.();
      overlays.forEach(({ el }) => el.remove());
    };
  }, [sdkConnected, videoScreensData, videoScreensVisible]);

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
              const rot = getRotationToNearestTag(resolvedSid);
              await sdk.Sweep.moveTo(resolvedSid, { transition: sdk.Sweep.Transition?.FLY || 2, ...(rot && { rotation: rot }) });
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
                const rot = getRotationToNearestTag(resolvedSid);
                await sdk.Sweep.moveTo(resolvedSid, { transition: sdk.Sweep.Transition?.FLY || 2, ...(rot && { rotation: rot }) });
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
              const rot = getRotationToNearestTag(resolvedSid);
              await sdk.Sweep.moveTo(resolvedSid, { transition: sdk.Sweep.Transition?.FLY || 2, ...(rot && { rotation: rot }) });
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
                const rot = getRotationToNearestTag(resolvedSid);
                await sdk.Sweep.moveTo(resolvedSid, { transition: sdk.Sweep.Transition?.FLY || 2, ...(rot && { rotation: rot }) });
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

  // Helper: calculate camera rotation to face nearest custom tag from a sweep position
  const getRotationToNearestTag = useCallback((sweepId: string): { x: number; y: number } | undefined => {
    const sweeps = sweepsRef.current;
    const sweep = sweeps.find((s: any) => s.sid === sweepId || s.id === sweepId || s.uuid === sweepId);
    if (!sweep?.position) return undefined;
    const tags = customTagsRef.current;
    if (!tags.length) return undefined;

    // Find nearest custom tag
    let closest: typeof tags[0] | null = null;
    let minDist = Infinity;
    for (const ct of tags) {
      const dx = ct.anchorX - sweep.position.x;
      const dz = ct.anchorZ - sweep.position.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < minDist) { minDist = dist; closest = ct; }
    }
    if (!closest) return undefined;

    // Use saved camera view if admin set it
    if (closest.cameraYaw != null) {
      console.log(`🎯 Using saved camera view: yaw=${closest.cameraYaw}° pitch=${closest.cameraPitch ?? 0}°`);
      return { x: closest.cameraPitch ?? 0, y: closest.cameraYaw };
    }

    // Otherwise calculate from geometry
    const dx = closest.anchorX - sweep.position.x;
    const dy = closest.anchorY - sweep.position.y;
    const dz = closest.anchorZ - sweep.position.z;
    const horizDist = Math.sqrt(dx * dx + dz * dz);

    // Matterport: +X right, +Y up, -Z forward
    const yaw = Math.atan2(dx, -dz) * (180 / Math.PI);
    const pitch = -Math.atan2(dy, horizDist) * (180 / Math.PI);

    console.log(`🎯 Calculated camera rotation: yaw=${yaw.toFixed(1)}° pitch=${pitch.toFixed(1)}° dist=${horizDist.toFixed(2)}m`);
    return { x: pitch, y: yaw };
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
        const rot = getRotationToNearestTag(sweepId);
        sdk.Sweep.moveTo(sweepId, { transition: sdk.Sweep.Transition?.FLY || 2, ...(rot && { rotation: rot }) })
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
        const rot = getRotationToNearestTag(sweepId);
        sdk.Sweep.moveTo(sweepId, { transition: sdk.Sweep.Transition?.FLY || 2, ...(rot && { rotation: rot }) })
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
          const rot = getRotationToNearestTag(resolvedSid);
          await sdk.Sweep.moveTo(resolvedSid, { transition: sdk.Sweep.Transition?.FLY || 2, ...(rot && { rotation: rot }) });
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
    const el = document.documentElement as any;
    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      const req = el.requestFullscreen?.() || el.webkitRequestFullscreen?.() || el.msRequestFullscreen?.();
      if (req && req.then) req.then(() => setIsFullscreen(true)).catch(() => {});
      else setIsFullscreen(true);
    } else {
      const exit = document.exitFullscreen?.() || (document as any).webkitExitFullscreen?.() || (document as any).msExitFullscreen?.();
      if (exit && exit.then) exit.then(() => setIsFullscreen(false)).catch(() => {});
      else setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!(document.fullscreenElement || (document as any).webkitFullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler);
    };
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
        if (fullscreenVideo) setFullscreenVideo(null);
        else if (selectedImmoRoom) setSelectedImmoRoom(null);
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
    fullscreenVideo,
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
            Loading...
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
      <div className="absolute inset-0 overflow-hidden tour-viewer-container">
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

        {/* ===== WALL-EMBEDDED VIDEO: YouTube iframes auto-play on wall ===== */}
        <div ref={videoOverlayContainerRef} className="absolute inset-0 pointer-events-none z-[15]" style={{ overflow: "hidden" }} />

        {/* ===== VIRTUAL GUIDE AVATAR ===== */}
        {guideVisible && tourGuideData && !/\.gl(b|tf)(\?|$)/i.test((tourGuideData as any).avatarUrl || '') && (
          <div
            ref={guideOverlayRef}
            className="absolute z-[60] flex flex-col items-end pointer-events-auto"
            style={
              ((tourGuideData as any).posX !== 0 || (tourGuideData as any).posY !== 0 || (tourGuideData as any).posZ !== 0)
                ? { position: "absolute", display: "none" }
                : { position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", display: "flex" }
            }
          >
            {/* Avatar animations */}
            <style>{`
              @keyframes avatarTalk {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                15% { transform: translateY(-3px) rotate(0.5deg); }
                30% { transform: translateY(-1px) rotate(-0.3deg); }
                50% { transform: translateY(-4px) rotate(0.3deg); }
                70% { transform: translateY(-2px) rotate(-0.5deg); }
                85% { transform: translateY(-3px) rotate(0.2deg); }
              }
              @keyframes avatarBreath {
                0%, 100% { transform: scaleY(1) translateY(0); }
                50% { transform: scaleY(1.003) translateY(-1px); }
              }
              @keyframes mouthOpen {
                0%, 100% { transform: scaleY(0.3); }
                20% { transform: scaleY(1); }
                40% { transform: scaleY(0.5); }
                60% { transform: scaleY(0.9); }
                80% { transform: scaleY(0.4); }
              }
              @keyframes gestureHands {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-2deg) translateX(-3px); }
                75% { transform: rotate(2deg) translateX(3px); }
              }
              .avatar-speaking { animation: avatarTalk 1.8s ease-in-out infinite, gestureHands 2.5s ease-in-out infinite; }
              .avatar-idle { animation: avatarBreath 4s ease-in-out infinite; }
              .avatar-mouth-anim { animation: mouthOpen 0.35s ease-in-out infinite; }
            `}</style>

            {/* Avatar body - fixed on ground, talks and gestures */}
            <div className={`relative cursor-pointer group ${guideSpeaking ? 'avatar-speaking' : 'avatar-idle'}`} onClick={() => guideSpeaking ? stopGuide() : speakGuide()}>
              {(tourGuideData as any).avatarUrl ? (
                /\.(mp4|webm|mov)(\?|$)/i.test((tourGuideData as any).avatarUrl) ? (
                  <video
                    src={(tourGuideData as any).avatarUrl}
                    className="w-full h-full object-contain select-none"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={(tourGuideData as any).avatarUrl}
                    alt={tourGuideData.name || "Guide"}
                    className="w-full h-full object-contain select-none"
                    draggable={false}
                  />
                )
              ) : (
                <svg className="w-full h-full" viewBox="0 0 200 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="100" cy="60" rx="35" ry="40" fill="#F5CBA7"/>
                  <path d="M65 55c0-25 15-45 35-45s35 20 35 45c0 5-1 10-3 14-2-8-10-12-18-14-4 6-10 10-14 10s-10-4-14-10c-8 2-16 6-18 14-2-4-3-9-3-14z" fill="#5D4037"/>
                  <path d="M70 100c-5 10-15 20-15 50 0 30 5 70 10 100h70c5-30 10-70 10-100 0-30-10-40-15-50-5-10-15-15-30-15s-25 5-30 15z" fill="#F5E6D3"/>
                  <path d="M65 250h70l5 120c0 10-2 20-5 30H95l-5-10H80l-5 10H65c-3-10-5-20-5-30l5-120z" fill="#2C3E50"/>
                  <ellipse cx="80" cy="405" rx="12" ry="6" fill="#1A1A1A"/>
                  <ellipse cx="120" cy="405" rx="12" ry="6" fill="#1A1A1A"/>
                  <path d="M55 105c-5 5-10 15-10 25l-5 80c0 5 3 8 8 8s8-3 9-8l8-75" fill="#F5CBA7"/>
                  <path d="M145 105c5 5 10 15 10 25l5 80c0 5-3 8-8 8s-8-3-9-8l-8-75" fill="#F5CBA7"/>
                </svg>
              )}
              {/* Mouth animation overlay when speaking */}
              {guideSpeaking && (
                <div className="absolute top-[11%] left-1/2 -translate-x-1/2 w-[12%] h-[3%] pointer-events-none">
                  <div className="avatar-mouth-anim w-full h-full bg-red-800 rounded-full opacity-80" />
                </div>
              )}
              {/* Speaking indicator */}
              {guideSpeaking && (
                <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 flex items-center gap-[2px]">
                  <div className="w-[3px] h-[8px] bg-green-400 rounded-full animate-pulse" />
                  <div className="w-[3px] h-[12px] bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <div className="w-[3px] h-[10px] bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-[3px] h-[8px] bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== GLB AVATAR: Speech bubble + Voice control ===== */}
        {guideVisible && tourGuideData && /\.gl(b|tf)(\?|$)/i.test((tourGuideData as any).avatarUrl || '') && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center pointer-events-auto">

            {/* Voice control button */}
            <button
              onClick={() => guideSpeaking ? stopGuide() : speakGuide()}
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
                guideSpeaking
                  ? 'bg-red-500/90 text-white hover:bg-red-600'
                  : 'bg-white/90 text-gray-800 hover:bg-white'
              }`}
            >
              {guideSpeaking ? (
                <>
                  <div className="flex items-center gap-[2px]">
                    <div className="w-[3px] h-[10px] bg-white rounded-full animate-pulse" />
                    <div className="w-[3px] h-[14px] bg-white rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                    <div className="w-[3px] h-[12px] bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-[3px] h-[10px] bg-white rounded-full animate-pulse" style={{ animationDelay: '0.15s' }} />
                  </div>
                  <span className="text-xs font-medium">Stop</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                  <span className="text-xs font-medium">Listen to Guide</span>
                </>
              )}
            </button>
          </div>
        )}

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
        className="absolute top-4 right-2 sm:right-4 z-[70] flex items-center gap-1.5 sm:gap-2 pointer-events-auto"
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

        {/* Toggle Video Screens visibility */}
        {videoScreensData.length > 0 && (
          <button
            onClick={() => setVideoScreensVisible(!videoScreensVisible)}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl backdrop-blur-xl border text-xs font-medium transition-all ${
              videoScreensVisible
                ? "bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-600/30"
                : "bg-black/60 border-white/10 text-white/40 hover:text-white/70 hover:bg-black/80"
            }`}
            title={videoScreensVisible ? "Hide videos" : "Show videos"}
          >
            {videoScreensVisible ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><polygon points="5,3 19,12 5,21" /><rect x="1" y="1" width="22" height="22" rx="3" stroke="currentColor" strokeWidth={1.5} fill="none" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><polygon points="5,3 19,12 5,21" /><rect x="1" y="1" width="22" height="22" rx="3" stroke="currentColor" strokeWidth={1.5} fill="none" /><line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth={2} /></svg>
            )}
          </button>
        )}

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
          {selectedChamber && selectedChamber.bookingEnabled !== false && (
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
                window.open(`https://wa.me/21652664495?text=${msg}`, "_blank", "noopener,noreferrer");
              }}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600 border border-purple-400/30 text-white text-xs font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="hidden sm:inline">Book Now</span>
              <span className="sm:hidden">Book</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Book Now — always visible for Immobilier tours (hidden when a chamber book-now is showing) */}
        {normalizeCategory(tour.category) === "Immobilier" && tour.bookNowEnabled !== false && !selectedChamber && (
          <button
            onClick={() => {
              if (tour.bookNowUrl && tour.bookNowUrl.trim()) {
                const url = tour.bookNowUrl.trim();
                const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
                window.open(normalized, "_blank", "noopener,noreferrer");
                return;
              }
              const msg = encodeURIComponent(`Hello, I am interested in the property "${tour.name}". Thank you.`);
              window.open(`https://wa.me/21652664495?text=${msg}`, "_blank", "noopener,noreferrer");
            }}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600 border border-purple-400/30 text-white text-xs font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="hidden sm:inline">Book Now</span>
            <span className="sm:hidden">Book</span>
          </button>
        )}
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
                    const customSections: { title: string; icon: string; items: { name: string; icon: string; tagSid?: string; imageUrl?: string; bookingUrl?: string }[] }[] = (meta.sections || []);
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
                        bookingEnabled: r.bookingEnabled,
                        bookingUrl: r.bookingUrl || undefined,
                      })),
                    }] : [];

                    // Hébergements first, then custom sections
                    const allSections = [
                      ...autoRoomSection,
                      ...customSections.map(s => ({
                        title: s.title,
                        iconKey: s.icon,
                        amenities: [] as string[],
                        items: s.items.map(it => ({ name: it.name, iconKey: it.icon, sub: "", tagSid: it.tagSid || undefined, imageUrl: it.imageUrl || undefined, bookingUrl: it.bookingUrl || undefined, bookingEnabled: it.bookingEnabled })),
                      })),
                    ];

                    if (allSections.length === 0) return null;
                    return (
                      <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                        {allSections.map((sec, i) => (
                          <HotelMenuSection key={i} title={sec.title} iconKey={sec.iconKey} items={sec.items} amenities={sec.amenities} onItemClick={flyToTag} onBookClick={(tagSid: string, name: string, bookingUrl?: string) => {
                            const ch = tourChambers.find(c => c.tagSid === tagSid);
                            if (ch) navigateToChamber(ch);
                            else {
                              const room = rooms.find(r => r.tagSid === tagSid);
                              if (tagSid) flyToTag(tagSid);
                              setSelectedChamber({ id: 0, tourId: tour?.id || 0, name, description: "", imageUrl: room?.imageUrl || "", price: room?.price ?? null, currency: room?.currency || "TND", tagSid, bookingUrl: bookingUrl || "", bookingEnabled: true });
                            }
                          }} />
                        ))}
                      </div>
                    );
                  } catch { return null; }
                })()}

                {/* Immobilier Menu */}
                {tour.category === "Immobilier" && bottomStripConfig.chambers && immoRooms.length > 0 && (() => {
                  const meta = tour.metadataJson ? JSON.parse(tour.metadataJson) : {};
                  const immobilierAmenities: string[] = meta.immobilierAmenities || [];

                  // Group rooms by type field (fallback to keyword matching)
                  const typeGroups: Record<string, typeof immoRooms> = {};
                  immoRooms.forEach(c => {
                    let group = displayRoomType(c.type) || "";
                    if (!group) {
                      const n = (c.name || "").toLowerCase();
                      if (n.includes("pool") || n.includes("piscine")) group = "Pool";
                      else if (n.includes("kitchen") || n.includes("cuisine")) group = "Kitchen";
                      else if (n.includes("terrace") || n.includes("terrasse")) group = "Terrace";
                      else if (n.includes("living") || n.includes("salon")) group = "Living";
                      else if (n.includes("bathroom") || n.includes("toilette") || n.includes("wc") || n.includes("salle de bain")) group = "Bathroom";
                      else if (n.includes("parking") || n.includes("garage")) group = "Parking";
                      else if (n.includes("room") || n.includes("chambre") || n.includes("bedroom")) group = "Rooms";
                      else group = c.name || "Other";
                    }
                    if (!typeGroups[group]) typeGroups[group] = [];
                    typeGroups[group].push(c);
                  });

                  const groupSections = Object.entries(typeGroups).map(([groupName, items]) => {
                    const iconKey = groupName === "Pool" ? "palmtree" : groupName === "Kitchen" ? "utensils" : groupName === "Terrace" ? "palmtree" : groupName === "Parking" ? "briefcase" : groupName === "Bathroom" ? "bath" : "bed";
                    return {
                      title: groupName,
                      iconKey,
                      amenities: [] as string[],
                      items: items.map(c => ({ name: c.name || "Room", iconKey: "bed", sub: "", tagSid: c.tagSid || undefined, imageUrl: c.imageUrl || undefined })),
                    };
                  });

                  // Pool from amenities if not already in chambers
                  const hasPoolGroup = !!typeGroups["Pool"];
                  const poolSection = !hasPoolGroup && immobilierAmenities.includes("Pool") ? [{
                    title: "Pool",
                    iconKey: "palmtree",
                    amenities: [] as string[],
                    items: [] as { name: string; iconKey: string; sub?: string; tagSid?: string }[],
                  }] : [];

                  // Other amenities
                  const otherAmenities = immobilierAmenities.filter(a => a !== "Pool");
                  const amenitiesSection = otherAmenities.length > 0 ? [{
                    title: "Amenities",
                    iconKey: "sparkles",
                    amenities: otherAmenities,
                    items: [] as { name: string; iconKey: string; sub?: string; tagSid?: string }[],
                  }] : [];

                  const allSections = [...groupSections, ...poolSection, ...amenitiesSection];
                  if (allSections.length === 0) return null;
                  return (
                    <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                      {allSections.map((sec, i) => (
                        <HotelMenuSection key={i} title={sec.title} iconKey={sec.iconKey} items={sec.items} amenities={sec.amenities} onItemClick={flyToTag} />
                      ))}
                    </div>
                  );
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
                    if (details.length === 0 && amenities.length === 0 && (!bottomStripConfig.chambers || immoRooms.length === 0)) return null;
                    return (
                      <>
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

                {/* Wedding Venue Info */}
                {normalizeCategory(tour.category) === "Wedding venue" && weddingData && (() => {
                  const WEDDING_CATEGORIES = [
                    { key: "Salles des Fêtes", icon: "🏛️" },
                    { key: "Photographes", icon: "📸" },
                    { key: "Vidéaste", icon: "🎬" },
                    { key: "DJ", icon: "🎧" },
                    { key: "Bands", icon: "🎵" },
                    { key: "Troupes", icon: "🎭" },
                    { key: "Show", icon: "✨" },
                    { key: "Onemanshow", icon: "🎤" },
                    { key: "Artistes", icon: "🎨" },
                    { key: "Fleuriste", icon: "💐" },
                    { key: "Décoration", icon: "🎀" },
                    { key: "Traiteur", icon: "🍽️" },
                    { key: "Pâtisserie", icon: "🎂" },
                    { key: "Robes de Mariage", icon: "👗" },
                    { key: "Costumes de Mariage", icon: "🤵" },
                    { key: "Coiffeurs Femme", icon: "💇‍♀️" },
                    { key: "Coiffeurs Homme", icon: "💇‍♂️" },
                    { key: "Maquillage", icon: "💄" },
                    { key: "Voitures de Mariage", icon: "🚗" },
                    { key: "Transports", icon: "🚐" },
                    { key: "Notaires", icon: "📋" },
                    { key: "Animation enfants", icon: "🎈" },
                    { key: "Faire-part", icon: "💌" },
                    { key: "Bijoux", icon: "💍" },
                  ];
                  const availableCategories = WEDDING_CATEGORIES.filter(c => weddingData.providers.some(p => p.category === c.key) && ['menu', 'both'].includes(weddingCatVisibility[c.key] || 'both'));
                  const filteredProviders = activeWeddingCategory
                    ? weddingData.providers.filter(p => p.category === activeWeddingCategory)
                    : weddingData.providers;
                  return (
                    <>
                      {/* Venue Details */}
                      {(weddingData.capacity || weddingData.priceRange || weddingData.parkingSpaces) && (
                        <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5">
                          <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-2">Venue Details</p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                            {weddingData.capacity && (
                              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                                <span className="text-white/40 text-xs">Capacity</span>
                                <span className="text-white/80 text-xs font-medium">{weddingData.capacity} guests</span>
                              </div>
                            )}
                            {weddingData.priceRange && (
                              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                                <span className="text-white/40 text-xs">Price</span>
                                <span className="text-white/80 text-xs font-medium">{weddingData.priceRange}</span>
                              </div>
                            )}
                            {weddingData.parkingSpaces && (
                              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                                <span className="text-white/40 text-xs">Parking</span>
                                <span className="text-white/80 text-xs font-medium">{weddingData.parkingSpaces} places</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Contact & Social */}
                      {(weddingData.phone || weddingData.whatsapp || weddingData.email || weddingData.website || weddingData.instagram || weddingData.facebook || weddingData.tiktok || weddingData.address || weddingData.openingHours) && (
                        <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                          <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-2">Contact & Info</p>
                          {weddingData.address && (
                            <div className="flex items-start gap-2">
                              <MapPin className="w-3.5 h-3.5 text-white/40 mt-0.5 shrink-0" />
                              <span className="text-white/70 text-xs">{weddingData.address}</span>
                            </div>
                          )}
                          {weddingData.openingHours && (
                            <div className="flex items-start gap-2">
                              <Clock className="w-3.5 h-3.5 text-white/40 mt-0.5 shrink-0" />
                              <span className="text-white/70 text-xs">{weddingData.openingHours}</span>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {weddingData.phone && (
                              <a href={`tel:${weddingData.phone}`} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] transition-all text-white/60 hover:text-white text-[10px]">
                                <Phone className="w-3 h-3" /> Appeler
                              </a>
                            )}
                            {weddingData.whatsapp && (
                              <a href={`https://wa.me/${weddingData.whatsapp.replace(/[^0-9+]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-500/10 border border-green-400/20 hover:bg-green-500/20 transition-all text-green-300 text-[10px]">
                                <MessageCircle className="w-3 h-3" /> WhatsApp
                              </a>
                            )}
                            {weddingData.email && (
                              <a href={`mailto:${weddingData.email}`} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] transition-all text-white/60 hover:text-white text-[10px]">
                                <Mail className="w-3 h-3" /> Email
                              </a>
                            )}
                            {weddingData.website && (
                              <a href={weddingData.website.startsWith("http") ? weddingData.website : `https://${weddingData.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] transition-all text-white/60 hover:text-white text-[10px]">
                                <Globe className="w-3 h-3" /> Site web
                              </a>
                            )}
                            {weddingData.instagram && (
                              <a href={weddingData.instagram.startsWith("http") ? weddingData.instagram : `https://instagram.com/${weddingData.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-pink-500/10 border border-pink-400/20 hover:bg-pink-500/20 transition-all text-pink-300 text-[10px]">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> Instagram
                              </a>
                            )}
                            {weddingData.facebook && (
                              <a href={weddingData.facebook.startsWith("http") ? weddingData.facebook : `https://facebook.com/${weddingData.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 transition-all text-blue-300 text-[10px]">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook
                              </a>
                            )}
                            {weddingData.tiktok && (
                              <a href={weddingData.tiktok.startsWith("http") ? weddingData.tiktok : `https://tiktok.com/@${weddingData.tiktok}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] transition-all text-white/60 hover:text-white text-[10px]">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> TikTok
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Amenities */}
                      {weddingData.amenities.length > 0 && (
                        <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] p-3">
                          <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-2">Amenities</p>
                          <div className="flex flex-wrap gap-1.5">
                            {weddingData.amenities.map((a, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-200 text-[10px]">{a}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Provider Sections — collapsible by category */}
                      {availableCategories.length > 0 && (
                        <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                          {availableCategories.map(cat => {
                            const catProviders = weddingData.providers.filter(p => p.category === cat.key);
                            if (catProviders.length === 0) return null;
                            return (
                              <WeddingCategorySection
                                key={cat.key}
                                id={`wedding-cat-${cat.key.replace(/\s+/g, '-')}`}
                                title={`${cat.icon} ${cat.key}`}
                                providers={catProviders}
                                onProviderClick={(prov) => {
                                  setSelectedProvider(prov);
                                  if (prov.tagSid) flyToTag(prov.tagSid);
                                }}
                              />
                            );
                          })}
                        </div>
                      )}

                      {/* Packages */}
                      {weddingData.packages.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold">Packages</p>
                          {weddingData.packages.map((pkg, pi) => (
                            <div key={pi} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-white/80 text-sm font-semibold">{pkg.name}</p>
                                {pkg.price && (
                                  <span className="px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-300 text-xs font-bold">
                                    {pkg.price} {pkg.currency || "TND"}
                                  </span>
                                )}
                              </div>
                              {pkg.description && <p className="text-white/40 text-xs">{pkg.description}</p>}
                              {pkg.features.length > 0 && (
                                <ul className="space-y-1">
                                  {pkg.features.map((f, fi) => (
                                    <li key={fi} className="flex items-center gap-2 text-white/50 text-xs">
                                      <Check className="w-3 h-3 text-green-400 shrink-0" />
                                      {f}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Booking CTA */}
                      {weddingData.bookingUrl && (
                        <a
                          href={weddingData.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold text-center hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                        >
                          Book This Venue
                        </a>
                      )}
                    </>
                  );
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
                  const customSections: { title: string; icon: string; items: { name: string; icon: string; tagSid?: string; imageUrl?: string; bookingUrl?: string }[] }[] = (meta.sections || []);
                  const rooms: HotelRoom[] = meta.rooms || [];
                  const allAmenities = Array.from(new Set(rooms.flatMap(r => r.amenities || [])));

                  const autoRoomSection = rooms.length > 0 ? [{
                    title: "Accommodations",
                    iconKey: "bed",
                    amenities: allAmenities,
                    items: rooms.map(r => ({ name: r.name || "Room", iconKey: "bed", sub: [r.bedType, r.capacity ? `${r.capacity}p` : "", r.price ? `${r.price} ${r.currency || "TND"}` : ""].filter(Boolean).join(" · "), tagSid: r.tagSid || undefined, imageUrl: r.imageUrl || undefined, bookingEnabled: r.bookingEnabled, bookingUrl: r.bookingUrl || undefined })),
                  }] : [];

                  const allSections = [
                    ...autoRoomSection,
                    ...customSections.map(s => ({
                      title: s.title,
                      iconKey: s.icon,
                      amenities: [] as string[],
                      items: s.items.map(it => ({ name: it.name, iconKey: it.icon, tagSid: it.tagSid || undefined, imageUrl: it.imageUrl || undefined, bookingUrl: it.bookingUrl || undefined, bookingEnabled: it.bookingEnabled })),
                    })),
                  ];

                  if (allSections.length === 0) return null;
                  return (
                    <div className="border-t border-white/[0.06] overflow-hidden">
                      {allSections.map((sec, i) => (
                        <HotelMenuSection key={i} title={sec.title} iconKey={sec.iconKey} items={sec.items} amenities={sec.amenities} onItemClick={flyToTag} onBookClick={(tagSid: string, name: string, bookingUrl?: string) => {
                          const ch = tourChambers.find(c => c.tagSid === tagSid);
                          if (ch) navigateToChamber(ch);
                          else {
                            const room = rooms.find(r => r.tagSid === tagSid);
                            if (tagSid) flyToTag(tagSid);
                            setSelectedChamber({ id: 0, tourId: tour?.id || 0, name, description: "", imageUrl: room?.imageUrl || "", price: room?.price ?? null, currency: room?.currency || "TND", tagSid, bookingUrl: bookingUrl || "", bookingEnabled: true });
                          }
                        }} />
                      ))}
                    </div>
                  );
                } catch { return null; }
              })()}

              {/* Mobile: Immobilier Menu */}
              {tour.category === "Immobilier" && bottomStripConfig.chambers && immoRooms.length > 0 && (() => {
                  const meta = tour.metadataJson ? JSON.parse(tour.metadataJson) : {};
                  const immobilierAmenities: string[] = meta.immobilierAmenities || [];

                  // Group rooms by type field (fallback to keyword matching)
                  const typeGroups: Record<string, typeof immoRooms> = {};
                  immoRooms.forEach(c => {
                    let group = displayRoomType(c.type) || "";
                    if (!group) {
                      const n = (c.name || "").toLowerCase();
                      if (n.includes("pool") || n.includes("piscine")) group = "Pool";
                      else if (n.includes("kitchen") || n.includes("cuisine")) group = "Kitchen";
                      else if (n.includes("terrace") || n.includes("terrasse")) group = "Terrace";
                      else if (n.includes("living") || n.includes("salon")) group = "Living";
                      else if (n.includes("bathroom") || n.includes("toilette") || n.includes("wc") || n.includes("salle de bain")) group = "Bathroom";
                      else if (n.includes("parking") || n.includes("garage")) group = "Parking";
                      else if (n.includes("room") || n.includes("chambre") || n.includes("bedroom")) group = "Rooms";
                      else group = c.name || "Other";
                    }
                    if (!typeGroups[group]) typeGroups[group] = [];
                    typeGroups[group].push(c);
                  });

                  const groupSections = Object.entries(typeGroups).map(([groupName, items]) => {
                    const iconKey = groupName === "Pool" ? "palmtree" : groupName === "Kitchen" ? "utensils" : groupName === "Terrace" ? "palmtree" : groupName === "Parking" ? "briefcase" : groupName === "Bathroom" ? "bath" : "bed";
                    return {
                      title: groupName,
                      iconKey,
                      amenities: [] as string[],
                      items: items.map(c => ({ name: c.name || "Room", iconKey: "bed", sub: "", tagSid: c.tagSid || undefined, imageUrl: c.imageUrl || undefined })),
                    };
                  });

                  const hasPoolGroup = !!typeGroups["Pool"];
                  const poolSection = !hasPoolGroup && immobilierAmenities.includes("Pool") ? [{
                    title: "Pool",
                    iconKey: "palmtree",
                    amenities: [] as string[],
                    items: [] as { name: string; iconKey: string; sub?: string; tagSid?: string }[],
                  }] : [];

                  const otherAmenities = immobilierAmenities.filter(a => a !== "Pool");
                  const amenitiesSection = otherAmenities.length > 0 ? [{
                    title: "Amenities",
                    iconKey: "sparkles",
                    amenities: otherAmenities,
                    items: [] as { name: string; iconKey: string; sub?: string; tagSid?: string }[],
                  }] : [];

                  const allSections = [...groupSections, ...poolSection, ...amenitiesSection];
                  if (allSections.length === 0) return null;
                  return (
                    <div className="border-t border-white/[0.06] overflow-hidden">
                      {allSections.map((sec, i) => (
                        <HotelMenuSection key={i} title={sec.title} iconKey={sec.iconKey} items={sec.items} amenities={sec.amenities} onItemClick={flyToTag} />
                      ))}
                    </div>
                  );
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
                  if (details.length === 0 && amenities.length === 0 && (!bottomStripConfig.chambers || immoRooms.length === 0)) return null;
                  return (
                    <>
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
              {/* Mobile: Wedding Venue Info */}
              {normalizeCategory(tour.category) === "Wedding venue" && weddingData && (() => {
                const WEDDING_CATEGORIES = [
                  { key: "Salles des Fêtes", icon: "🏛️" }, { key: "Photographes", icon: "📸" }, { key: "Vidéaste", icon: "🎬" },
                  { key: "DJ", icon: "🎧" }, { key: "Bands", icon: "🎵" }, { key: "Troupes", icon: "🎭" }, { key: "Show", icon: "✨" },
                  { key: "Onemanshow", icon: "🎤" }, { key: "Artistes", icon: "🎨" }, { key: "Fleuriste", icon: "💐" },
                  { key: "Décoration", icon: "🎀" }, { key: "Traiteur", icon: "🍽️" }, { key: "Pâtisserie", icon: "🎂" },
                  { key: "Robes de Mariage", icon: "👗" }, { key: "Costumes de Mariage", icon: "🤵" },
                  { key: "Coiffeurs Femme", icon: "💇‍♀️" }, { key: "Coiffeurs Homme", icon: "💇‍♂️" }, { key: "Maquillage", icon: "💄" },
                  { key: "Voitures de Mariage", icon: "🚗" }, { key: "Transports", icon: "🚐" }, { key: "Notaires", icon: "📋" },
                  { key: "Animation enfants", icon: "🎈" }, { key: "Faire-part", icon: "💌" }, { key: "Bijoux", icon: "💍" },
                ];
                const availableCategories = WEDDING_CATEGORIES.filter(c => weddingData.providers.some(p => p.category === c.key) && ['menu', 'both'].includes(weddingCatVisibility[c.key] || 'both'));
                const filteredProviders = activeWeddingCategory
                  ? weddingData.providers.filter(p => p.category === activeWeddingCategory)
                  : weddingData.providers;
                return (
                  <div className="border-t border-white/[0.06]">
                    {/* Venue Details */}
                    {(weddingData.capacity || weddingData.priceRange || weddingData.parkingSpaces) && (
                      <div className="p-3 space-y-1.5">
                        <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-1">Venue Details</p>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          {weddingData.capacity && (
                            <div className="flex justify-between py-1 border-b border-white/[0.04]">
                              <span className="text-white/40 text-[10px]">Capacity</span>
                              <span className="text-white/80 text-[10px] font-medium">{weddingData.capacity} guests</span>
                            </div>
                          )}
                          {weddingData.priceRange && (
                            <div className="flex justify-between py-1 border-b border-white/[0.04]">
                              <span className="text-white/40 text-[10px]">Price</span>
                              <span className="text-white/80 text-[10px] font-medium">{weddingData.priceRange}</span>
                            </div>
                          )}
                          {weddingData.parkingSpaces && (
                            <div className="flex justify-between py-1 border-b border-white/[0.04]">
                              <span className="text-white/40 text-[10px]">Parking</span>
                              <span className="text-white/80 text-[10px] font-medium">{weddingData.parkingSpaces} places</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Contact & Social */}
                    {(weddingData.phone || weddingData.whatsapp || weddingData.email || weddingData.website || weddingData.instagram || weddingData.facebook || weddingData.tiktok || weddingData.address || weddingData.openingHours) && (
                      <div className="p-3 border-t border-white/[0.06] space-y-2">
                        <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-1">Contact & Info</p>
                        {weddingData.address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3 h-3 text-white/40 mt-0.5 shrink-0" />
                            <span className="text-white/70 text-[10px]">{weddingData.address}</span>
                          </div>
                        )}
                        {weddingData.openingHours && (
                          <div className="flex items-start gap-2">
                            <Clock className="w-3 h-3 text-white/40 mt-0.5 shrink-0" />
                            <span className="text-white/70 text-[10px]">{weddingData.openingHours}</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {weddingData.phone && (
                            <a href={`tel:${weddingData.phone}`} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/60 text-[9px]">
                              <Phone className="w-2.5 h-2.5" /> Appeler
                            </a>
                          )}
                          {weddingData.whatsapp && (
                            <a href={`https://wa.me/${weddingData.whatsapp.replace(/[^0-9+]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 border border-green-400/20 text-green-300 text-[9px]">
                              <MessageCircle className="w-2.5 h-2.5" /> WhatsApp
                            </a>
                          )}
                          {weddingData.email && (
                            <a href={`mailto:${weddingData.email}`} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/60 text-[9px]">
                              <Mail className="w-2.5 h-2.5" /> Email
                            </a>
                          )}
                          {weddingData.website && (
                            <a href={weddingData.website.startsWith("http") ? weddingData.website : `https://${weddingData.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/60 text-[9px]">
                              <Globe className="w-2.5 h-2.5" /> Site
                            </a>
                          )}
                          {weddingData.instagram && (
                            <a href={weddingData.instagram.startsWith("http") ? weddingData.instagram : `https://instagram.com/${weddingData.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-1 rounded-lg bg-pink-500/10 border border-pink-400/20 text-pink-300 text-[9px]">
                              Instagram
                            </a>
                          )}
                          {weddingData.facebook && (
                            <a href={weddingData.facebook.startsWith("http") ? weddingData.facebook : `https://facebook.com/${weddingData.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[9px]">
                              Facebook
                            </a>
                          )}
                          {weddingData.tiktok && (
                            <a href={weddingData.tiktok.startsWith("http") ? weddingData.tiktok : `https://tiktok.com/@${weddingData.tiktok}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/60 text-[9px]">
                              TikTok
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Amenities */}
                    {weddingData.amenities.length > 0 && (
                      <div className="p-3 border-t border-white/[0.06]">
                        <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-1">Amenities</p>
                        <div className="flex flex-wrap gap-1">
                          {weddingData.amenities.map((a, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-200 text-[9px]">{a}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Provider Sections — collapsible by category */}
                    {availableCategories.length > 0 && (
                      <div className="border-t border-white/[0.06]">
                        {availableCategories.map(cat => {
                          const catProviders = weddingData.providers.filter(p => p.category === cat.key);
                          if (catProviders.length === 0) return null;
                          return (
                            <WeddingCategorySection
                              key={cat.key}
                              id={`wedding-cat-m-${cat.key.replace(/\s+/g, '-')}`}
                              title={`${cat.icon} ${cat.key}`}
                              providers={catProviders}
                              onProviderClick={(prov) => {
                                setSelectedProvider(prov);
                                if (prov.tagSid) flyToTag(prov.tagSid);
                              }}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Packages */}
                    {weddingData.packages.length > 0 && (
                      <div className="p-3 border-t border-white/[0.06] space-y-1.5">
                        <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold">Packages</p>
                        {weddingData.packages.map((pkg, pi) => (
                          <div key={pi} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <p className="text-white/80 text-[11px] font-semibold">{pkg.name}</p>
                              {pkg.price && <span className="px-1.5 py-0.5 rounded-full bg-purple-600/20 text-purple-300 text-[9px] font-bold">{pkg.price} {pkg.currency || "TND"}</span>}
                            </div>
                            {pkg.description && <p className="text-white/40 text-[10px]">{pkg.description}</p>}
                            {pkg.features.length > 0 && (
                              <ul className="space-y-0.5">
                                {pkg.features.map((f, fi) => (
                                  <li key={fi} className="flex items-center gap-1.5 text-white/50 text-[10px]">
                                    <Check className="w-2.5 h-2.5 text-green-400 shrink-0" /> {f}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Booking CTA */}
                    {weddingData.bookingUrl && (
                      <div className="p-3 border-t border-white/[0.06]">
                        <a href={weddingData.bookingUrl} target="_blank" rel="noopener noreferrer"
                          className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-[11px] font-semibold text-center">
                          Book This Venue
                        </a>
                      </div>
                    )}
                  </div>
                );
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
          <>
            {/* Backdrop on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTag(null)}
              className="fixed inset-0 bg-black/50 z-[99] sm:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-auto sm:hidden"
              onMouseEnter={() => { tagPopupHoveredRef.current = true; }}
              onMouseLeave={() => { tagPopupHoveredRef.current = false; }}
            >
              <div className="rounded-t-2xl overflow-hidden bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.3)] max-h-[75vh] overflow-y-auto">
                {/* Handle bar */}
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-10 h-1 rounded-full bg-gray-300" />
                </div>
                {/* Close button */}
                <div className="flex justify-end px-3">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Media */}
                {(() => {
                  let mediaSrc = selectedTag.mediaSrc || selectedTag.mediaUrl || "";
                  if (!mediaSrc && selectedTag.attachments && selectedTag.attachments.length > 0) {
                    mediaSrc = selectedTag.attachments[0].src || "";
                  }
                  if (!mediaSrc && selectedTag.description && /^https?:\/\//i.test(selectedTag.description.trim())) {
                    mediaSrc = selectedTag.description.trim();
                  }
                  const ytMatch = mediaSrc.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
                  const vimeoMatch = mediaSrc.match(/vimeo\.com\/(?:video\/)?(\d+)/);
                  const instaMatch = mediaSrc.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
                  const isDirectVideo = /\.(mp4|webm|ogg|mov)(\?|$)/i.test(mediaSrc);
                  const mType = (selectedTag.mediaType || "").toLowerCase();
                  const isPdf = /\.pdf(\?|$)/i.test(mediaSrc) || mType === "pdf";
                  const isImage = /\.(png|jpe?g|gif|webp|avif|svg|bmp|tiff?)(\?|$)/i.test(mediaSrc)
                    || mType.includes("photo") || mType === "image";

                  if (ytMatch) return <div className="aspect-video mx-3 mb-3 rounded-xl overflow-hidden bg-black"><iframe src={`https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`} className="w-full h-full border-0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /></div>;
                  if (vimeoMatch) return <div className="aspect-video mx-3 mb-3 rounded-xl overflow-hidden bg-black"><iframe src={`https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`} className="w-full h-full border-0" allow="autoplay; encrypted-media; fullscreen" allowFullScreen /></div>;
                  if (isDirectVideo) return <div className="aspect-video mx-3 mb-3 rounded-xl overflow-hidden bg-black"><video src={mediaSrc} className="w-full h-full object-contain" controls autoPlay playsInline /></div>;
                  if (instaMatch) return <div className="mx-3 mb-3 rounded-xl overflow-hidden bg-gray-50" style={{ minHeight: 350 }}><iframe src={`https://www.instagram.com/p/${instaMatch[1]}/embed/`} className="w-full border-0" style={{ height: 420 }} allow="encrypted-media" allowFullScreen /></div>;
                  if (isPdf && mediaSrc) return <div className="mx-3 mb-3 rounded-xl overflow-hidden bg-white" style={{ height: 350 }}><iframe src={mediaSrc} className="w-full h-full border-0" title="PDF" /></div>;
                  if (isImage && mediaSrc) return <div className="mx-3 mb-3 rounded-xl overflow-hidden"><img src={mediaSrc} alt={selectedTag.label} className="w-full object-cover" /></div>;
                  if (mediaSrc && /^https?:\/\//i.test(mediaSrc)) return <div className="mx-3 mb-3 rounded-xl overflow-hidden"><img src={mediaSrc} alt={selectedTag.label} className="w-full object-cover" onError={(e) => { const parent = (e.target as HTMLElement).parentElement; if (parent) { parent.classList.add("aspect-video", "bg-black"); parent.innerHTML = `<iframe src="${mediaSrc}" class="w-full h-full border-0" allow="autoplay; fullscreen" allowFullscreen></iframe>`; } }} /></div>;
                  return null;
                })()}

                {/* Title & description */}
                <div className="px-4 pb-6">
                  <h4 className="text-gray-900 text-base font-semibold leading-snug">{selectedTag.label}</h4>
                  {selectedTag.description && (() => {
                    const desc = selectedTag.description;
                    if (/^https?:\/\//i.test(desc.trim())) {
                      return <a href={desc.trim()} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 text-sm mt-1 underline block truncate">{desc.trim()}</a>;
                    }
                    return <p className="text-gray-500 text-sm mt-1 leading-relaxed">{desc}</p>;
                  })()}
                </div>
              </div>
            </motion.div>

            {/* Desktop: popup near the tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="hidden sm:block fixed z-[100] pointer-events-auto max-w-[340px] w-[calc(100vw-32px)]"
              style={tagPopupPos ? (() => {
                const popupW = 340;
                const popupH = 300;
                const spaceRight = window.innerWidth - tagPopupPos.x;
                // Place to the right if enough space, otherwise to the left
                const left = spaceRight > popupW + 40
                  ? tagPopupPos.x + 40
                  : tagPopupPos.x - popupW - 20;
                const top = Math.min(Math.max(tagPopupPos.y - popupH / 2, 16), window.innerHeight - popupH - 16);
                return {
                  left: `${Math.max(left, 16)}px`,
                  top: `${top}px`,
                };
              })() : {
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => { tagPopupHoveredRef.current = true; }}
              onMouseLeave={() => {
                tagPopupHoveredRef.current = false;
                setTimeout(() => { if (!tagPopupHoveredRef.current) setSelectedTag(null); }, 200);
              }}
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

              {/* Media: video / image / attachments */}
              {(() => {
                // Try mediaSrc first, then fall back to first attachment src, then description if URL
                let mediaSrc = selectedTag.mediaSrc || selectedTag.mediaUrl || "";
                if (!mediaSrc && selectedTag.attachments && selectedTag.attachments.length > 0) {
                  mediaSrc = selectedTag.attachments[0].src || "";
                }
                // If still no media but description is a URL, use that as media
                if (!mediaSrc && selectedTag.description && /^https?:\/\//i.test(selectedTag.description.trim())) {
                  mediaSrc = selectedTag.description.trim();
                }
                const ytMatch = mediaSrc.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
                const vimeoMatch = mediaSrc.match(/vimeo\.com\/(?:video\/)?(\d+)/);
                const instaMatch = mediaSrc.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
                const isDirectVideo = /\.(mp4|webm|ogg|mov)(\?|$)/i.test(mediaSrc);
                const mType = (selectedTag.mediaType || "").toLowerCase();
                const isPdf = /\.pdf(\?|$)/i.test(mediaSrc) || mType === "pdf";
                const isImage = /\.(png|jpe?g|gif|webp|avif|svg|bmp|tiff?)(\?|$)/i.test(mediaSrc)
                  || mType.includes("photo") || mType === "image";

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
                if (instaMatch) {
                  return (
                    <div className="mx-2 mb-2 rounded overflow-hidden bg-black" style={{ minHeight: 400 }}>
                      <iframe
                        src={`https://www.instagram.com/p/${instaMatch[1]}/embed/`}
                        className="w-full border-0"
                        style={{ height: 480 }}
                        allow="encrypted-media"
                        allowFullScreen
                      />
                    </div>
                  );
                }
                if (isPdf && mediaSrc) {
                  return (
                    <div className="mx-2 mb-2 rounded overflow-hidden bg-white" style={{ height: 400 }}>
                      <iframe src={mediaSrc} className="w-full h-full border-0" title="PDF" />
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
                // Unknown URL: try as image first (Matterport CDN URLs often lack extensions), fallback to iframe
                if (mediaSrc && /^https?:\/\//i.test(mediaSrc)) {
                  return (
                    <div className="mx-2 mb-2 rounded overflow-hidden">
                      <img
                        src={mediaSrc}
                        alt={selectedTag.label}
                        className="w-full object-cover"
                        onError={(e) => {
                          // Image failed to load — replace with iframe
                          const parent = (e.target as HTMLElement).parentElement;
                          if (parent) {
                            parent.classList.add("aspect-video", "bg-black");
                            parent.innerHTML = `<iframe src="${mediaSrc}" class="w-full h-full border-0" allow="autoplay; fullscreen" allowFullscreen></iframe>`;
                          }
                        }}
                      />
                    </div>
                  );
                }
                return null;
              })()}

              {/* Title */}
              <div className="px-3 pb-3">
                <h4 className="text-white text-sm font-semibold leading-snug">{selectedTag.label}</h4>
                {selectedTag.description && (() => {
                  // If description is a URL, render it as a clickable link
                  const desc = selectedTag.description;
                  if (/^https?:\/\//i.test(desc.trim())) {
                    return (
                      <a href={desc.trim()} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs mt-1 underline block truncate">
                        {desc.trim()}
                      </a>
                    );
                  }
                  return <p className="text-white/50 text-xs mt-1 leading-relaxed">{desc}</p>;
                })()}
              </div>
            </div>
          </motion.div>
          </>
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
                    {selectedService.link && (
                      <a
                        href={selectedService.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium text-sm transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Site web
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

      {/* ===== WEDDING PROVIDER POPUP ===== */}
      <AnimatePresence>
        {selectedProvider && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProvider(null)}
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
                  onClick={() => setSelectedProvider(null)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Provider header */}
                <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-6 flex flex-col items-center text-center">
                  {selectedProvider.imageUrl ? (
                    <img src={selectedProvider.imageUrl} alt={selectedProvider.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-white/30 shadow-lg" />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center border-4 border-white/30">
                      <span className="text-4xl">💒</span>
                    </div>
                  )}
                  <h3 className="text-white font-bold text-xl mt-3">{selectedProvider.name}</h3>
                  <p className="text-white/70 text-sm mt-0.5">{selectedProvider.category}{selectedProvider.subsection ? ` · ${selectedProvider.subsection}` : ''}</p>
                  {selectedProvider.price && (
                    <span className="mt-2 inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-white text-sm font-semibold">
                      <Banknote className="w-4 h-4" /> {selectedProvider.price}
                    </span>
                  )}
                </div>

                <div className="p-5 overflow-y-auto flex-1 min-h-0 space-y-4">
                  {selectedProvider.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedProvider.description}</p>
                  )}

                  {/* Contact buttons */}
                  <div className="space-y-2">
                    {selectedProvider.phone && (
                      <a
                        href={`tel:${selectedProvider.phone}`}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-sm transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        {selectedProvider.phone}
                      </a>
                    )}
                    {selectedProvider.whatsapp && (
                      <a
                        href={`https://wa.me/${selectedProvider.whatsapp.replace(/[^0-9+]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 font-medium text-sm transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp
                      </a>
                    )}
                    {selectedProvider.instagram && (
                      <a
                        href={selectedProvider.instagram.startsWith("http") ? selectedProvider.instagram : `https://instagram.com/${selectedProvider.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-medium text-sm transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        Instagram
                      </a>
                    )}
                    {selectedProvider.facebook && (
                      <a
                        href={selectedProvider.facebook.startsWith("http") ? selectedProvider.facebook : `https://facebook.com/${selectedProvider.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-sm transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Facebook
                      </a>
                    )}
                    {selectedProvider.website && (
                      <a
                        href={selectedProvider.website.startsWith("http") ? selectedProvider.website : `https://${selectedProvider.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium text-sm transition-colors"
                      >
                        <Globe className="w-5 h-5" />
                        Website
                      </a>
                    )}
                  </div>
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
        let stripCustoms: { key: string; title: string; iconKey: string; items: { name: string; icon: string; tagSid?: string; imageUrl?: string; bookingUrl?: string }[] }[] = [];
        if (tour?.metadataJson) {
          try {
            const meta = JSON.parse(tour.metadataJson);
            const fromHotel = (meta.sections || []) as { title: string; icon: string; items: { name: string; icon: string; tagSid?: string; imageUrl?: string; bookingUrl?: string }[] }[];
            const fromGym = (meta.gymSections || []) as { title: string; icon: string; items: { name: string; icon: string; tagSid?: string; imageUrl?: string }[] }[];
            stripCustoms = [...fromHotel, ...fromGym]
              .filter(s => (s.title || "").trim() && (s.items || []).length > 0)
              .filter(s => bottomStripConfig.customSections?.[s.title] !== false)
              .map(s => ({ key: `cs:${s.title}`, title: s.title, iconKey: s.icon || "layers", items: s.items }));
          } catch { /* ignore */ }
        }
        // Wedding categories for strip
        const STRIP_WEDDING_CATS = [
          { key: "Salles des Fêtes", icon: "🏛" }, { key: "Voitures de Mariage", icon: "🚗" }, { key: "Notaires", icon: "📜" },
          { key: "Photographes", icon: "📸" }, { key: "Transports", icon: "🚌" }, { key: "Coiffeurs Femme", icon: "💇‍♀" },
          { key: "Robes de Mariage", icon: "👰" }, { key: "Costumes de Mariage", icon: "🤵" }, { key: "Coiffeurs Homme", icon: "💈" },
          { key: "Onemanshow", icon: "🎭" }, { key: "Bands", icon: "🎵" }, { key: "Troupes", icon: "🎪" },
          { key: "Show", icon: "✨" }, { key: "Artistes", icon: "🎨" }, { key: "DJ", icon: "🎧" },
          { key: "Fleuriste", icon: "💐" }, { key: "Pâtisserie", icon: "🎂" }, { key: "Décoration", icon: "🎨" },
          { key: "Vidéaste", icon: "🎬" }, { key: "Maquillage", icon: "💄" }, { key: "Traiteur", icon: "🍽" },
          { key: "Animation enfants", icon: "🧒" }, { key: "Faire-part", icon: "💌" }, { key: "Bijoux", icon: "💍" },
        ];
        const weddingStripCats = weddingData ? STRIP_WEDDING_CATS.filter(c => weddingData.providers.some(p => p.category === c.key) && ['bar', 'both'].includes(weddingCatVisibility[c.key] || 'both')) : [];
        const hasWeddingProviders = weddingStripCats.length > 0;
        const hasAnyStandard = (tourItems.length > 0 && bottomStripConfig.products) || (tourServices.length > 0 && bottomStripConfig.services) || (tourChambers.length > 0 && bottomStripConfig.chambers) || gymCoaches.length > 0 || (immoRooms.length > 0 && bottomStripConfig.chambers);
        if (!hasAnyStandard && stripCustoms.length === 0 && !hasWeddingProviders) return null;
        const tabCount = ((tourItems.length > 0 && bottomStripConfig.products) ? 1 : 0) + ((tourServices.length > 0 && bottomStripConfig.services) ? 1 : 0) + ((tourChambers.length > 0 && bottomStripConfig.chambers) ? 1 : 0) + (gymCoaches.length > 0 ? 1 : 0) + ((immoRooms.length > 0 && bottomStripConfig.chambers) ? 1 : 0) + stripCustoms.length + weddingStripCats.length;
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
            {/* Tab switcher */}
            {tabCount >= 1 && (
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
                {immoRooms.length > 0 && bottomStripConfig.chambers && (() => {
                  const typeGroups: Record<string, number> = {};
                  immoRooms.forEach(r => {
                    let group = displayRoomType(r.type) || "";
                    if (!group) {
                      const n = (r.name || "").toLowerCase();
                      if (n.includes("pool") || n.includes("piscine")) group = "Pool";
                      else if (n.includes("kitchen") || n.includes("cuisine")) group = "Kitchen";
                      else if (n.includes("terrace") || n.includes("terrasse")) group = "Terrace";
                      else if (n.includes("living") || n.includes("salon")) group = "Living";
                      else if (n.includes("bathroom") || n.includes("toilette") || n.includes("wc")) group = "Bathroom";
                      else if (n.includes("parking") || n.includes("garage")) group = "Parking";
                      else if (n.includes("room") || n.includes("chambre") || n.includes("bedroom")) group = "Rooms";
                      else group = r.name || "Other";
                    }
                    typeGroups[group] = (typeGroups[group] || 0) + 1;
                  });
                  return Object.entries(typeGroups).map(([type, count]) => (
                    <button
                      key={`immo_${type}`}
                      onClick={() => setBottomTab(`immo_${type}`)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${bottomTab === `immo_${type}` ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                    >
                      <DoorOpen className="w-3 h-3" /> {type} ({count})
                    </button>
                  ));
                })()}
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
                {weddingStripCats.map((wc) => {
                  const catProviders = weddingData!.providers.filter(p => p.category === wc.key);
                  return (
                    <button
                      key={`wc:${wc.key}`}
                      onClick={() => setBottomTab(`wc:${wc.key}`)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${bottomTab === `wc:${wc.key}` ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70"}`}
                    >
                      <span className="text-xs">{wc.icon}</span> {wc.key} ({catProviders.length})
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
              <div className="flex items-center md:justify-center gap-3 overflow-x-auto scrollbar-hide pb-1 [&>*:first-child]:ml-4 [&>*:last-child]:mr-4">
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
              <div className="flex items-center md:justify-center gap-3 overflow-x-auto scrollbar-hide pb-1 [&>*:first-child]:ml-4 [&>*:last-child]:mr-4">
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
                      {svc.link && (
                        <a
                          href={svc.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-6 h-6 rounded-md bg-purple-600/80 hover:bg-purple-500 flex items-center justify-center text-white transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
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
              <div className="flex items-center md:justify-center gap-3 overflow-x-auto scrollbar-hide pb-1 [&>*:first-child]:ml-4 [&>*:last-child]:mr-4">
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
            {bottomTab.startsWith("immo_") && immoRooms.length > 0 && (() => {
              const selectedType = bottomTab.replace("immo_", "");
              const filtered = immoRooms.filter(r => {
                let group = displayRoomType(r.type) || "";
                if (!group) {
                  const n = (r.name || "").toLowerCase();
                  if (n.includes("pool") || n.includes("piscine")) group = "Pool";
                  else if (n.includes("kitchen") || n.includes("cuisine")) group = "Kitchen";
                  else if (n.includes("terrace") || n.includes("terrasse")) group = "Terrace";
                  else if (n.includes("living") || n.includes("salon")) group = "Living";
                  else if (n.includes("bathroom") || n.includes("toilette") || n.includes("wc")) group = "Bathroom";
                  else if (n.includes("parking") || n.includes("garage")) group = "Parking";
                  else if (n.includes("room") || n.includes("chambre") || n.includes("bedroom")) group = "Rooms";
                  else group = r.name || "Other";
                }
                return group === selectedType;
              });
              return (
                <div className="flex items-center md:justify-center gap-3 overflow-x-auto scrollbar-hide pb-1 [&>*:first-child]:ml-4 [&>*:last-child]:mr-4">
                  {filtered.map((room, ri) => (
                    <button
                      key={ri}
                      onClick={() => {
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
                        <p className="text-white/80 text-xs font-semibold truncate max-w-[110px] group-hover:text-white transition-colors">{room.name || displayRoomType(room.type) || room.type}</p>
                        {room.type && room.name !== room.type && displayRoomType(room.type) !== selectedType && (
                          <p className="text-white/30 text-[10px] truncate mt-0.5">{displayRoomType(room.type)}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              );
            })()}

            {/* Coaches strip */}
            {bottomTab === "coaches" && gymCoaches.length > 0 && (
              <div className="flex items-center md:justify-center gap-3 overflow-x-auto scrollbar-hide pb-1 [&>*:first-child]:ml-4 [&>*:last-child]:mr-4">
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
              <div className="flex items-center md:justify-center gap-3 overflow-x-auto scrollbar-hide pb-1 [&>*:first-child]:ml-4 [&>*:last-child]:mr-4">
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
                          setSelectedChamber({ id: 0, tourId: tour?.id || 0, name: item.name, description: "", imageUrl: item.imageUrl || "", price: null, currency: "TND", tagSid: item.tagSid, bookingUrl: item.bookingUrl || "", bookingEnabled: item.bookingEnabled });
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

            {/* Wedding category strips */}
            {weddingStripCats.map(wc => {
              if (bottomTab !== `wc:${wc.key}`) return null;
              const catProviders = weddingData!.providers.filter(p => p.category === wc.key);
              return (
                <div key={wc.key} className="flex items-center md:justify-center gap-3 overflow-x-auto scrollbar-hide pb-1 [&>*:first-child]:ml-4 [&>*:last-child]:mr-4">
                  {catProviders.map((prov, pi) => (
                    <button
                      key={pi}
                      onClick={() => {
                        setSelectedProvider(prov);
                        if (prov.tagSid) flyToTag(prov.tagSid);
                      }}
                      className="flex-shrink-0 flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl p-2 pr-4 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-400/30 overflow-hidden">
                        {prov.imageUrl ? (
                          <img src={prov.imageUrl} alt={prov.subsection || prov.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg">{wc.icon}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white/80 text-xs font-semibold truncate max-w-[140px] group-hover:text-white transition-colors">{prov.subsection || prov.name}</p>
                        {prov.price && <p className="text-purple-300 text-[10px] font-bold mt-0.5">{prov.price}</p>}
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
          </motion.div>
        </div>
        );
      })()}

      {/* ===== FULLSCREEN VIDEO POPUP ===== */}
      <AnimatePresence>
        {fullscreenVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setFullscreenVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[95vw] max-w-6xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${fullscreenVideo.youtubeId}?autoplay=1&rel=0`}
                className="w-full h-full rounded-2xl border border-white/10"
                style={{ border: "none" }}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setFullscreenVideo(null)}
                className="absolute -top-12 right-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-all backdrop-blur-xl"
              >
                <X className="w-4 h-4" />
                Close
              </button>
              {fullscreenVideo.name && (
                <p className="absolute -bottom-10 left-0 text-white/40 text-sm font-medium">{fullscreenVideo.name}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TourViewer;
