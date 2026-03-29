import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
}

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
}

interface CartEntry {
  item: TourItemData;
  qty: number;
}

interface TagItem {
  sid: string;
  label: string;
  description: string;
  mediaUrl?: string;
  mediaSrc?: string;
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

function buildEmbedUrl(tourUrl: string, withSdkKey = false): string {
  const modelId = extractModelId(tourUrl);
  if (!modelId) return tourUrl;
  const base = `https://my.matterport.com/show/?m=${modelId}&play=1&qs=1&brand=0&title=0&mls=2&vr=0&dh=1&gt=0&hr=0&help=0&lp=0&log=0&f=1&search=0&wh=0&lang=fr&mt=1&pin=1&nt=1&ts=0&guides=0&hl=1`;
  return withSdkKey ? `${base}&applicationKey=${SDK_KEY}` : base;
}

const TourViewer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sdkRef = useRef<any>(null);
  const sdkAttemptsRef = useRef(0);
  const tagsMapRef = useRef<Map<string, string>>(new Map()); // tagName (lowercase) → SID
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

  // Tag/Item popup state
  const [selectedTag, setSelectedTag] = useState<TagItem | null>(null);

  // Floor selector state
  const [floors, setFloors] = useState<{index: number; name: string}[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(-1);

  // Tour Items (products) & Cart
  const [tourItems, setTourItems] = useState<TourItemData[]>([]);
  const tourItemsRef = useRef<TourItemData[]>([]);
  const [selectedItem, setSelectedItem] = useState<TourItemData | null>(null);
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
    ])
      .then(([tourData, tours, itemsData]) => {
        setTour(tourData);
        setAllTours(tours);
        const items = Array.isArray(itemsData) ? itemsData : [];
        setTourItems(items);
        tourItemsRef.current = items;
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

    fetch("https://ipapi.co/json/")
      .then(r => r.ok ? r.json() : null)
      .then(geo => {
        if (geo?.country_name) sendVisit(geo.country_name, geo.city || "", geo.latitude ?? null, geo.longitude ?? null);
        else sendVisit();
      })
      .catch(() => sendVisit());

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

  // SDK: only works on localhost (Matterport free plan restricts to local domains)
  const isLocalDev = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  // Attempt SDK connection on all environments (needed for floor selector + tags)
  useEffect(() => {
    if (!iframeLoaded || !iframeRef.current || !tour?.tourUrl) return;
    if (sdkAttemptsRef.current >= 1) return;
    sdkAttemptsRef.current = 1;

    let cancelled = false;

    const handleTagClick = async (sdk: any, tagSid: string) => {
      try {
        console.log("🏷️ Tag cliqué — SID:", tagSid);
        let tagLabel = "";
        let tagData: TagItem | null = null;

        if (sdk.Mattertag?.getData) {
          const tags = await sdk.Mattertag.getData();
          const found = tags.find((t: any) => t.sid === tagSid);
          if (found) {
            tagLabel = found.label || "";
            tagData = {
              sid: found.sid, label: found.label || "", description: found.description || "",
              mediaUrl: found.media?.src || "", mediaSrc: found.mediaSrc || found.media?.src || "",
              anchorPosition: found.anchorPosition,
            };
          }
        }

        if (!tagData && (sdk as any).Tag?.getData) {
          const tags = await (sdk as any).Tag.getData();
          const found = tags.find((t: any) => t.sid === tagSid);
          if (found) {
            tagLabel = found.label || "";
            tagData = {
              sid: found.sid, label: found.label || "", description: found.description || "",
              mediaUrl: found.media?.src || "", mediaSrc: found.mediaSrc || "",
              anchorPosition: found.anchorPosition,
            };
          }
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
          // Filter the bottom strip to show only this product
          setActiveTagFilter(matchedItem.tagSid);
          return;
        }
        if (tagData) {
          if (tour?.id) trackEvent(tour.id, "tag_click", tagData.label || tagSid, tagSid);
          setSelectedTag(tagData);
        }
      } catch (err) {
        console.log("Tag data error:", err);
      }
    };

    const connectSdk = async () => {
      try {
        const { setupSdk } = await import("@matterport/sdk");
        const sdk = await Promise.race([
          setupSdk(SDK_KEY, {
            iframe: iframeRef.current!,
            space: extractModelId(tour.tourUrl) || "",
          }),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error("SDK timeout")), 10000)),
        ]);
        if (cancelled) return;
        sdkRef.current = sdk;
        setSdkConnected(true);
        console.log("✅ SDK connecté (localhost)");

        // Get floor data for custom floor selector
        try {
          const floorsData = await sdk.Floor.getData();
          if (floorsData && floorsData.totalFloors > 1) {
            const floorList = floorsData.floorNames.map((name: string, i: number) => ({ index: i, name: name || `Étage ${i}` }));
            setFloors(floorList);
            setCurrentFloor(floorsData.currentFloor);
          }
          // Subscribe to current floor changes
          sdk.Floor.current.subscribe((f: any) => {
            if (f && typeof f.sequence === "number") setCurrentFloor(f.sequence);
          });
        } catch (err) { console.log("Floor data error:", err); }

        try {
          if (sdk.Mattertag?.getData) {
            const allTags = await sdk.Mattertag.getData();
            console.log("🏷️ Tags:", allTags.map((t: any) => ({ sid: t.sid, label: t.label })));
            // Cache tag name → SID mapping
            allTags.forEach((t: any) => {
              if (t.label) tagsMapRef.current.set(t.label.trim().toLowerCase(), t.sid);
              if (t.sid) tagsMapRef.current.set(t.sid, t.sid);
            });
          }
        } catch {}

        // Listen for model state changes (e.g. defurnished toggle) and restore tags
        try {
          const restoreTags = async () => {
            try {
              // Small delay to let Matterport finish state transition
              await new Promise(r => setTimeout(r, 1500));
              // Re-read tags to refresh visibility
              if (sdk.Mattertag?.getData) {
                const tags = await sdk.Mattertag.getData();
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

        if (sdk.Mattertag?.Event?.CLICK) {
          sdk.on(sdk.Mattertag.Event.CLICK, (tagSid: string) => handleTagClick(sdk, tagSid));
        }
        if ((sdk as any).Tag?.Event?.CLICK) {
          sdk.on((sdk as any).Tag.Event.CLICK, (tagSid: string) => handleTagClick(sdk, tagSid));
        }
      } catch (err) {
        if (cancelled) return;
        console.log("⚠️ SDK échoué sur localhost:", err);
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

  // Navigate to a product's tag in the 3D tour, then show popup
  const navigateToProduct = useCallback((item: TourItemData) => {
    setShowProducts(false);
    if (tour?.id) trackEvent(tour.id, "product_click", item.name, String(item.id));

    const sdk = sdkRef.current;
    if (sdk && item.tagSid) {
      // Resolve SID: item.tagSid might be a tag name or an actual SID
      const resolvedSid = tagsMapRef.current.get(item.tagSid.trim().toLowerCase()) || item.tagSid;

      const doNavigate = async () => {
        try {
          // Try Mattertag.navigateToTag (v1 API)
          if (sdk.Mattertag?.navigateToTag) {
            await sdk.Mattertag.navigateToTag(resolvedSid, sdk.Mattertag.Transition?.FLY_IN || "transition.fly");
            console.log("🎯 Zoom vers tag:", resolvedSid);
          } else if ((sdk as any).Tag?.navigateTo) {
            // v2 Tag API
            await (sdk as any).Tag.navigateTo(resolvedSid);
            console.log("🎯 Zoom vers tag (v2):", resolvedSid);
          }
        } catch (err) {
          console.log("Navigation tag impossible:", err);
        }
        // Show popup after a short delay for the camera to arrive
        setTimeout(() => setSelectedItem(item), 800);
      };

      doNavigate();
    } else {
      // No SDK or no tag — just show popup directly
      setSelectedItem(item);
    }
  }, [tour?.id, trackEvent]);

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
        if (selectedTag) setSelectedTag(null);
        else if (selectedItem) setSelectedItem(null);
        else if (activeTagFilter) setActiveTagFilter(null);
        else if (showCart) setShowCart(false);
        else if (showProducts) setShowProducts(false);
        else if (showShare) setShowShare(false);
        else setShowCard(false);
      }
      if ((e.key === "f" || e.key === "F") && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) toggleFullscreen();
      if (e.key === "ArrowLeft" && prevTour) navigate(`/view/${prevTour.id}`);
      if (e.key === "ArrowRight" && nextTour)
        navigate(`/view/${nextTour.id}`);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    selectedTag,
    selectedItem,
    showShare,
    showCard,
    showCart,
    showProducts,
    toggleFullscreen,
    prevTour,
    nextTour,
    navigate,
  ]);

  // Auto-hide card
  useEffect(() => {
    if (showCard && iframeLoaded) {
      const t = setTimeout(() => setShowCard(false), 8000);
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
            Visite introuvable
          </h2>
          <p className="text-white/40 mb-8">
            Cette visite n'existe pas ou a été supprimée.
          </p>
          <button
            onClick={() => navigate("/portfolio")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all"
          >
            Retour au Portfolio
          </button>
        </div>
      </div>
    );
  }

  // Only include applicationKey on localhost (Matterport free plan rejects it on other domains)
  const embedUrl = buildEmbedUrl(tour.tourUrl, isLocalDev);

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
                  Chargement de l'expérience 3D
                </p>
                <p className="text-white/25 text-xs">{tour.name}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* iframe fills container exactly — no height offset so Matterport native buttons stay in view and clickable */}
        <iframe
          ref={iframeRef}
          id="showcase-iframe"
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-0"
          allow="xr-spatial-tracking; fullscreen; autoplay"
          allowFullScreen
          onLoad={() => setIframeLoaded(true)}
        />
        {/* 
          PrimeSpace overlay — pixel-perfect responsive bottom bar
          - Parent: absolute inside the iframe container (which is relative via overflow-hidden)
          - Mobile: flush bottom, full width with 12px margins, centered via left-50% translateX
          - Tablet (sm): floating with rounded corners, bottom-3, auto width min-280
          - Desktop (lg): fixed-width 360px badge, bottom-3, centered
          - z-[6]: above iframe (z-0) but below UI controls (z-20+)
          - pointer-events-none on wrapper: user can still navigate 3D tour
          - pointer-events-auto on the Link: PrimeSpace logo is clickable
        */}
        <div className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none flex justify-end px-3 sm:px-4 pb-0 sm:pb-3 lg:pb-3">
          <Link
            to="/"
            className="pointer-events-auto w-auto sm:min-w-[280px] lg:w-[360px] flex items-center gap-3 p-3
              bg-black/70 backdrop-blur-xl border border-white/15 shadow-2xl
              rounded-t-2xl sm:rounded-2xl
              border-b-0 sm:border-b
              hover:bg-black/80 hover:border-white/25 transition-all group"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-purple-600 to-teal-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <span className="text-white font-extrabold text-lg">P</span>
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-white/90 text-sm sm:text-base font-bold tracking-tight group-hover:text-white transition-colors">PrimeSpace</p>
              <p className="text-white/40 text-[10px] sm:text-[11px] font-medium">Studio 3D immersif</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ===== TOP-LEFT: Back Button ===== */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 z-30 pointer-events-auto"
      >
        <button
          onClick={() => navigate("/portfolio")}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-white/80 hover:text-white hover:bg-black/80 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs font-medium hidden sm:inline">Retour</span>
        </button>
      </motion.div>

      {/* ===== FLOOR SELECTOR (left side, vertically centered) ===== */}
      <AnimatePresence>
        {floors.length > 1 && sdkConnected && (
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
          onClick={() => setShowCard(!showCard)}
          className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl backdrop-blur-xl border text-xs font-medium transition-all ${
            showCard
              ? "bg-white/15 border-white/20 text-white"
              : "bg-black/60 border-white/10 text-white/70 hover:text-white hover:bg-black/80"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Info</span>
        </button>

        {/* Products */}
        {tourItems.length > 0 && (
          <button
            onClick={() => setShowProducts(!showProducts)}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl backdrop-blur-xl border text-xs font-medium transition-all ${
              showProducts
                ? "bg-white/15 border-white/20 text-white"
                : "bg-black/60 border-white/10 text-white/70 hover:text-white hover:bg-black/80"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Produits</span>
          </button>
        )}

        {/* Cart */}
        {cart.length > 0 && (
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative flex items-center gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-purple-600/80 backdrop-blur-xl border border-purple-400/30 text-white text-xs font-medium transition-all hover:bg-purple-500/80"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Panier</span>
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
                  Partager cette visite
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
                    {copied ? "Copié!" : "Copier"}
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
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-purple-600/80 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider">
                    {tour.category}
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
                <div className="space-y-2">
                  {tour.surface && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center shrink-0">
                        <Ruler className="w-4 h-4 text-teal-400" />
                      </div>
                      <div>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider font-medium">
                          Surface
                        </p>
                        <p className="text-white/80 text-sm font-semibold">
                          {tour.surface} m²
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
                      <Tag className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white/30 text-[10px] uppercase tracking-wider font-medium">
                        Catégorie
                      </p>
                      <p className="text-white/80 text-sm font-semibold">
                        {tour.category}
                      </p>
                    </div>
                  </div>
                  {tour.location && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white/30 text-[10px] uppercase tracking-wider font-medium">
                          Localisation
                        </p>
                        <p className="text-white/80 text-sm font-semibold truncate">
                          {tour.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation - Other tours */}
                {(prevTour || nextTour) && (
                  <div className="pt-2 border-t border-white/[0.06]">
                    <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold mb-2">
                      Autres visites
                    </p>
                    <div className="space-y-2">
                      {prevTour && (
                        <Link
                          to={`/view/${prevTour.id}`}
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
                              {prevTour.category}
                            </p>
                          </div>
                          <ChevronLeft className="w-3.5 h-3.5 text-white/20 shrink-0" />
                        </Link>
                      )}
                      {nextTour && (
                        <Link
                          to={`/view/${nextTour.id}`}
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
                              {nextTour.category}
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
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-teal-500 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-[10px]">P</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/60 text-[11px] font-semibold group-hover:text-white/80 transition-colors">
                      PrimeSpace Studio
                    </p>
                    <p className="text-white/20 text-[9px]">
                      Expériences 3D immersives
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
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-medium">
                      {tour.category}
                    </span>
                    {tour.surface && (
                      <span className="text-white/30 text-[10px]">
                        {tour.surface} m²
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {(prevTour || nextTour) && (
                <div className="flex border-t border-white/[0.06]">
                  {prevTour ? (
                    <Link
                      to={`/view/${prevTour.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-white/40 hover:text-white/70 text-xs transition-colors border-r border-white/[0.06]"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Précédent
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {nextTour ? (
                    <Link
                      to={`/view/${nextTour.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-white/40 hover:text-white/70 text-xs transition-colors"
                    >
                      Suivant <ChevronRight className="w-3.5 h-3.5" />
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

      {/* ===== ITEM/TAG POPUP ===== */}
      <AnimatePresence>
        {(selectedTag || selectedItem) && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedTag(null); setSelectedItem(null); }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="absolute inset-2 sm:inset-6 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[680px] md:max-h-[480px] z-50 pointer-events-auto"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.3)] flex flex-col md:flex-row h-full md:h-auto max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-3rem)] md:max-h-[480px]">
                <button
                  onClick={() => { setSelectedTag(null); setSelectedItem(null); }}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image */}
                <div className="md:w-[48%] h-36 sm:h-56 md:h-auto bg-gradient-to-br from-gray-50 to-gray-100 shrink-0 flex items-center justify-center relative overflow-hidden">
                  {selectedItem?.brand && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-gray-500 shadow-sm">
                      {selectedItem.brand}
                    </span>
                  )}
                  {(selectedItem?.imageUrl || selectedTag?.mediaSrc || selectedTag?.mediaUrl) ? (
                    <img
                      src={selectedItem?.imageUrl || selectedTag?.mediaSrc || selectedTag?.mediaUrl}
                      alt={selectedItem?.name || selectedTag?.label}
                      className="w-full h-full object-contain p-8 md:p-10"
                    />
                  ) : (
                    <ShoppingBag className="w-20 h-20 text-gray-200" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 p-4 sm:p-7 flex flex-col overflow-y-auto">
                  <div className="flex-1">
                    {!selectedItem?.brand && (selectedItem?.brand || tour.category) && (
                      <p className="text-purple-600 text-[11px] font-bold uppercase tracking-widest mb-2">
                        {tour.category}
                      </p>
                    )}
                    <h3 className="text-gray-900 font-bold text-xl sm:text-2xl md:text-3xl leading-tight">
                      {selectedItem?.name || selectedTag?.label}
                    </h3>
                    {selectedItem?.price != null && (
                      <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                        {selectedItem.price} <span className="text-lg font-semibold text-gray-400">{CURRENCY_SYMBOLS[selectedItem.currency] || selectedItem.currency}</span>
                      </p>
                    )}

                    {(selectedItem?.description || selectedTag?.description) && (
                      <p className="text-gray-500 text-sm leading-relaxed mt-4 line-clamp-4">
                        {selectedItem?.description || selectedTag?.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 shrink-0">
                    {selectedItem && (
                      <button
                        onClick={() => { addToCart(selectedItem); setSelectedItem(null); setSelectedTag(null); }}
                        className="flex-1 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        AJOUTER AU PANIER
                      </button>
                    )}
                    {(selectedItem?.externalUrl) && (
                      <a
                        href={selectedItem.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        ACHETER
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {!selectedItem && (
                      <button className="flex-1 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                        EN SAVOIR PLUS
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
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
                    Produits ({tourItems.length})
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
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                        className="w-8 h-8 rounded-lg bg-purple-600/80 hover:bg-purple-500 flex items-center justify-center text-white shrink-0 opacity-0 group-hover:opacity-100 transition-all"
                        title="Ajouter au panier"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-white/15 group-hover:text-white/40 transition-colors shrink-0" />
                    </div>
                  ))}
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
                    Mon Panier ({cartCount})
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
                    VOIR LE RÉCAPITULATIF
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

      {/* ===== BOTTOM: PRODUCT STRIP ===== */}
      {tourItems.length > 0 && (
        <div className="shrink-0 bg-[#0d0d1a] border-t border-white/10">
          <div className="px-3 py-3">
            {/* Active filter label */}
            {activeTagFilter && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-white/60 text-[10px] font-medium uppercase tracking-wider">Produit lié au tag</span>
                <button
                  onClick={() => setActiveTagFilter(null)}
                  className="text-white/40 hover:text-white text-[10px] underline transition-colors"
                >
                  Voir tout
                </button>
              </div>
            )}
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
                  Voir tout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourViewer;
