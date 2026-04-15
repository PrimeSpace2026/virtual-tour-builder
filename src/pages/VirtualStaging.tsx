import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Plus, Trash2, Save, RotateCw, Move, Maximize2, Upload,
  Pencil, Eye, Undo2, Keyboard, ChevronDown, ChevronRight, Hand, Check, Lock, Unlock,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════ */
interface StagedObj {
  id?: number;
  _idx?: number;               // runtime index tracked by vs-app bridge
  _confirmed?: boolean;         // true after user confirms placement
  tourId: number;
  furnitureModelId?: number;
  modelUrl: string;
  sweepId?: string;
  posX: number; posY: number; posZ: number;
  rotX: number; rotY: number; rotZ: number;
  scaleX: number; scaleY: number; scaleZ: number;
  label: string;
  localScale?: number; localOffsetY?: number; localRotationY?: number;
}

interface FurnitureItem {
  id: number; name: string; category: string;
  modelUrl: string; thumbnailUrl: string; defaultScale: number;
  localScale?: number; localOffsetY?: number; localRotationY?: number;
}

const SDK_KEY = "b7uar4u57xdec0zw7dwygt7md";

/* ═══════════════════════════════════════════════════════════════════
   Transform step sizes (tunable)
   ═══════════════════════════════════════════════════════════════════ */
const MOVE_STEP  = 0.10; // metres
const ROT_STEP   = 15;   // degrees
const SCALE_STEP = 0.10; // multiplier delta

/* ═══════════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════════ */
export default function VirtualStaging() {
  const { id: tourId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /* ── Core state ── */
  const [tour, setTour] = useState<any>(null);
  const [modelId, setModelId] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /* ── Edit Mode toggle ── */
  const [editMode, setEditMode] = useState(true);

  /* ── Object state ── */
  const [placedObjects, setPlacedObjects] = useState<StagedObj[]>([]);
  const [furnitureList, setFurnitureList] = useState<FurnitureItem[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [transformMode, setTransformMode] = useState<"move" | "rotate" | "scale">("move");

  /* ── UI state ── */
  const [saving, setSaving] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [placingFurniture, setPlacingFurniture] = useState<FurnitureItem | null>(null);
  const [showKeybinds, setShowKeybinds] = useState(false);
  const [cameraLocked, setCameraLocked] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  /* ── Refs (for event callbacks that read latest state) ── */
  const placingRef = useRef<FurnitureItem | null>(null);
  const selectedRef = useRef<number | null>(null);
  const transformRef = useRef<"move" | "rotate" | "scale">("move");
  const objectsRef = useRef<StagedObj[]>([]);
  const nextIdxRef = useRef(0);

  useEffect(() => { placingRef.current = placingFurniture; }, [placingFurniture]);
  useEffect(() => { selectedRef.current = selectedIdx; }, [selectedIdx]);
  useEffect(() => { transformRef.current = transformMode; }, [transformMode]);
  useEffect(() => { objectsRef.current = placedObjects; }, [placedObjects]);

  /* ── Toast helper ── */
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  /* ═══════════════════════════════════════════════════════════════════
     PostMessage helpers
     ═══════════════════════════════════════════════════════════════════ */
  const postToVsApp = useCallback((type: string, payload?: any) => {
    iframeRef.current?.contentWindow?.postMessage({ type, payload }, "*");
  }, []);

  /* ═══════════════════════════════════════════════════════════════════
     Data loading
     ═══════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!tourId) return;
    fetch(`/api/tours/${tourId}`)
      .then(r => r.json())
      .then(data => {
        setTour(data);
        try { setModelId(new URL(data.tourUrl).searchParams.get("m")); } catch {}
      })
      .catch(console.error);
  }, [tourId]);

  useEffect(() => {
    fetch("/api/furniture")
      .then(r => r.json())
      .then(data => setFurnitureList(Array.isArray(data) ? data : []))
      .catch(() => setFurnitureList([]));
  }, []);

  /* ═══════════════════════════════════════════════════════════════════
     PostMessage listener  (bridge ↔ vs-app)
     ═══════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const { type, payload } = event.data || {};

      /* SDK ready */
      if (type === "VS_SDK_READY") {
        setSdkReady(true);
        console.log("[VStaging] vs-app SDK ready");
      }

      /* Placement rejected (clicked on wall/ceiling) */
      if (type === "VS_PLACEMENT_REJECTED") {
        showToast("⚠ Can't place on walls — click on the floor");
      }

      /* Object confirmed placed */
      if (type === "VS_OBJECT_PLACED" && payload?._idx != null) {
        // Update the _idx on the placed object so future updates target the right one
        setPlacedObjects(prev => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last && last._idx == null) last._idx = payload._idx;
          return copy;
        });
      }

      /* Drag finished → update object with final transform values */
      if (type === "VS_DRAG_END" && payload?._idx != null) {
        setIsDragging(false);
        const idx = objectsRef.current.findIndex(o => o._idx === payload._idx);
        if (idx === -1) return;
        const obj = { ...objectsRef.current[idx] };

        if (payload.mode === "move") {
          obj.posX = payload.posX;
          obj.posY = payload.posY;
          obj.posZ = payload.posZ;
        } else if (payload.mode === "rotate") {
          obj.rotY = payload.rotY;
        } else if (payload.mode === "scale") {
          obj.scaleX = payload.scaleX;
          obj.scaleY = payload.scaleY;
          obj.scaleZ = payload.scaleZ;
        }

        // Recreate scene object at final position so SDK state is consistent
        postToVsApp("VS_PLACE_OBJECT", obj);
        setPlacedObjects(prev => prev.map((p, i) => i === idx ? obj : p));
        showToast(`✓ ${obj.label} ${payload.mode}d`);
      }

      /* Click in placement mode → create new object at 3D position */
      if (type === "VS_PLACEMENT_CLICK" && payload?.position) {
        const furniture = placingRef.current;
        if (!furniture) return;
        const pos = payload.position;
        // Use the raw raycast hit Y — the floor surface
        const floorY = pos.y;

        const idx = nextIdxRef.current++;
        const newObj: StagedObj = {
          _idx: idx,
          tourId: Number(tourId),
          furnitureModelId: furniture.id,
          modelUrl: furniture.modelUrl,
          posX: pos.x, posY: floorY, posZ: pos.z,
          rotX: 0, rotY: 0, rotZ: 0,
          scaleX: furniture.defaultScale || 1,
          scaleY: furniture.defaultScale || 1,
          scaleZ: furniture.defaultScale || 1,
          label: furniture.name,
          localScale: furniture.localScale,
          localOffsetY: furniture.localOffsetY,
          localRotationY: furniture.localRotationY,
        };

        postToVsApp("VS_PLACE_OBJECT", { ...newObj, _idx: idx });
        setPlacedObjects(prev => [...prev, newObj]);
        const newIndex = placedObjects.length;
        setSelectedIdx(newIndex);
        setPlacingFurniture(null);
        setTransformMode("move");
        // Auto-start drag so user can reposition immediately with mouse
        setTimeout(() => {
          postToVsApp("VS_START_DRAG", { _idx: idx, mode: "move" });
          setIsDragging(true);
        }, 300);
        console.log("[VStaging] Placed:", furniture.name, `(${pos.x.toFixed(2)}, ${floorY.toFixed(2)}, ${pos.z.toFixed(2)})`);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [tourId, postToVsApp, showToast]);

  /* ═══════════════════════════════════════════════════════════════════
     Load existing staged objects once SDK is ready
     ═══════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!tourId || !sdkReady) return;
    fetch(`/api/tours/${tourId}/staged-objects`)
      .then(r => r.json())
      .then((data: StagedObj[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const withIdx = data.map((obj, i) => ({ ...obj, _idx: i }));
          nextIdxRef.current = data.length;
          postToVsApp("VS_LOAD_OBJECTS", data);
          setPlacedObjects(withIdx);
          console.log("[VStaging] Loaded", data.length, "objects from DB");
        }
      })
      .catch(() => {});
  }, [tourId, sdkReady, postToVsApp]);

  /* ═══════════════════════════════════════════════════════════════════
     Enter placement mode when furniture selected
     ═══════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (placingFurniture && sdkReady) {
      postToVsApp("VS_ENTER_PLACEMENT");
    }
  }, [placingFurniture, sdkReady, postToVsApp]);

  /* ═══════════════════════════════════════════════════════════════════
     Drag: grab and move/rotate/scale by mouse
     ═══════════════════════════════════════════════════════════════════ */
  const startDrag = useCallback(() => {
    if (selectedIdx === null) return;
    const obj = placedObjects[selectedIdx];
    if (obj?._idx == null || !sdkReady) return;
    setIsDragging(true);
    postToVsApp("VS_START_DRAG", { _idx: obj._idx, mode: transformMode });
  }, [selectedIdx, placedObjects, sdkReady, transformMode, postToVsApp]);

  const cancelDrag = useCallback(() => {
    setIsDragging(false);
    postToVsApp("VS_STOP_DRAG");
  }, [postToVsApp]);

  /* ── Confirm placement (hides bounding box) ── */
  const confirmSelected = useCallback(() => {
    if (selectedIdx === null) return;
    const obj = placedObjects[selectedIdx];
    if (!obj || obj._confirmed) return;
    const confirmed = { ...obj, _confirmed: true };
    postToVsApp("VS_CONFIRM_OBJECT", confirmed);
    setPlacedObjects(prev => prev.map((p, i) => i === selectedIdx ? confirmed : p));
    setSelectedIdx(null);
    showToast(`✓ ${obj.label} confirmed`);
  }, [selectedIdx, placedObjects, postToVsApp, showToast]);

  /* ═══════════════════════════════════════════════════════════════════
     Keyboard shortcuts  (WASD / QE / RF for transform)
     ═══════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!editMode) return;

    const handler = (e: KeyboardEvent) => {
      // Don't capture if typing in an input
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;

      const sel = selectedRef.current;

      // Mode shortcuts
      if (e.key === "g" || e.key === "G") { setTransformMode("move"); return; }
      if (e.key === "r" || e.key === "R") { setTransformMode("rotate"); return; }
      if (e.key === "s" || e.key === "S") { setTransformMode("scale"); return; }
      if (e.key === "Escape") { setSelectedIdx(null); setPlacingFurniture(null); if (isDragging) cancelDrag(); return; }
      if (e.key === "Enter") { confirmSelected(); return; }
      if (e.key === "Delete" || e.key === "Backspace") {
        if (sel !== null) handleDeleteByIdx(sel);
        return;
      }

      // Transform shortcuts (only when an object is selected)
      if (sel === null) return;
      const obj = { ...objectsRef.current[sel] };
      if (!obj) return;

      let changed = false;
      const mode = transformRef.current;

      if (mode === "move") {
        if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft")  { obj.posX -= MOVE_STEP; changed = true; }
        if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") { obj.posX += MOVE_STEP; changed = true; }
        if (e.key === "w" || e.key === "W" || e.key === "ArrowUp")    { obj.posZ -= MOVE_STEP; changed = true; }
        if (e.key === "ArrowDown")                                     { obj.posZ += MOVE_STEP; changed = true; }
        if (e.key === "q" || e.key === "Q")                            { obj.posY -= MOVE_STEP; changed = true; }
        if (e.key === "e" || e.key === "E")                            { obj.posY += MOVE_STEP; changed = true; }
      } else if (mode === "rotate") {
        if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft")  { obj.rotY -= ROT_STEP; changed = true; }
        if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") { obj.rotY += ROT_STEP; changed = true; }
        if (e.key === "w" || e.key === "W" || e.key === "ArrowUp")    { obj.rotX -= ROT_STEP; changed = true; }
        if (e.key === "ArrowDown")                                     { obj.rotX += ROT_STEP; changed = true; }
        if (e.key === "q" || e.key === "Q")                            { obj.rotZ -= ROT_STEP; changed = true; }
        if (e.key === "e" || e.key === "E")                            { obj.rotZ += ROT_STEP; changed = true; }
      } else if (mode === "scale") {
        const up = 1 + SCALE_STEP;
        const down = 1 - SCALE_STEP;
        if (e.key === "d" || e.key === "D" || e.key === "ArrowRight" || e.key === "e" || e.key === "E") {
          obj.scaleX *= up; obj.scaleY *= up; obj.scaleZ *= up; changed = true;
        }
        if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft" || e.key === "q" || e.key === "Q") {
          obj.scaleX *= down; obj.scaleY *= down; obj.scaleZ *= down; changed = true;
        }
      }

      if (changed) {
        e.preventDefault();
        postToVsApp("VS_PLACE_OBJECT", obj);
        setPlacedObjects(prev => prev.map((p, i) => i === sel ? obj : p));
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [editMode, postToVsApp, isDragging, cancelDrag, confirmSelected]);

  /* ═══════════════════════════════════════════════════════════════════
     Transform via button clicks
     ═══════════════════════════════════════════════════════════════════ */
  const adjustSelected = (axis: "x" | "y" | "z", delta: number) => {
    if (selectedIdx === null) return;
    const obj = { ...placedObjects[selectedIdx] };

    if (transformMode === "move") {
      const key = `pos${axis.toUpperCase()}` as "posX" | "posY" | "posZ";
      obj[key] = (obj[key] || 0) + delta;
    } else if (transformMode === "rotate") {
      const key = `rot${axis.toUpperCase()}` as "rotX" | "rotY" | "rotZ";
      obj[key] = (obj[key] || 0) + delta * ROT_STEP;
    } else if (transformMode === "scale") {
      const s = 1 + delta * SCALE_STEP;
      obj.scaleX *= s; obj.scaleY *= s; obj.scaleZ *= s;
    }

    postToVsApp("VS_PLACE_OBJECT", obj);
    setPlacedObjects(prev => prev.map((p, i) => i === selectedIdx ? obj : p));
  };

  /* ═══════════════════════════════════════════════════════════════════
     Save  →  Persist to DB  +  saveStagingData() console log
     ═══════════════════════════════════════════════════════════════════ */
  const saveStagingData = useCallback(() => {
    const data = placedObjects.map(obj => ({
      id: obj.id,
      tourId: obj.tourId,
      furnitureModelId: obj.furnitureModelId,
      modelUrl: obj.modelUrl,
      label: obj.label,
      position: { x: obj.posX, y: obj.posY, z: obj.posZ },
      rotation: { x: obj.rotX, y: obj.rotY, z: obj.rotZ },
      scale:    { x: obj.scaleX, y: obj.scaleY, z: obj.scaleZ },
    }));
    console.log("[saveStagingData]", JSON.stringify(data, null, 2));
    return data;
  }, [placedObjects]);

  const handleSave = async () => {
    if (!tourId) return;
    setSaving(true);

    // Log to console (skeleton as requested)
    saveStagingData();

    try {
      for (const obj of placedObjects) {
        const body = { ...obj };
        delete (body as any)._idx; // strip runtime field

        if (obj.id) {
          await fetch(`/api/tours/${tourId}/staged-objects/${obj.id}`, {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        } else {
          const res = await fetch(`/api/tours/${tourId}/staged-objects`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (res.ok) obj.id = (await res.json()).id;
        }
      }
      showToast(`Saved ${placedObjects.length} objects`);
    } catch (err) {
      console.error("[VStaging] Save error:", err);
      showToast("Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* ═══════════════════════════════════════════════════════════════════
     Delete
     ═══════════════════════════════════════════════════════════════════ */
  const handleDeleteByIdx = useCallback((idx: number) => {
    const obj = objectsRef.current[idx];
    if (!obj) return;

    // Remove from vs-app scene
    if (obj._idx != null) postToVsApp("VS_REMOVE_OBJECT", { _idx: obj._idx });

    // Remove from DB
    if (obj.id && tourId) {
      fetch(`/api/tours/${tourId}/staged-objects/${obj.id}`, { method: "DELETE" }).catch(() => {});
    }

    setPlacedObjects(prev => prev.filter((_, i) => i !== idx));
    setSelectedIdx(null);
    showToast("Object deleted");
  }, [tourId, postToVsApp, showToast]);

  const handleDelete = () => {
    if (selectedIdx !== null) handleDeleteByIdx(selectedIdx);
  };

  /* ═══════════════════════════════════════════════════════════════════
     Derived data
     ═══════════════════════════════════════════════════════════════════ */
  const categories = [...new Set(furnitureList.map(f => f.category))];

  if (!tourId) return <div className="p-8 text-white">Tour ID manquant</div>;

  const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
  const vsAppBase = isLocal ? "http://localhost:8000" : "/vs-app";
  const bundleSrc = modelId
    ? `${vsAppBase}/?m=${modelId}&applicationKey=${SDK_KEY}&play=1&qs=1&title=0&brand=0&help=0&hl=0`
    : null;

  /* ═══════════════════════════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════════════════════════ */
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-950">
      {/* ── Matterport iframe ── */}
      {bundleSrc && (
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full"
          src={bundleSrc}
          allow="xr-spatial-tracking"
          style={{ zIndex: 1 }}
        />
      )}

      {/* ══════════ TOP BAR ══════════ */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        {/* Left section */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur text-white hover:bg-white/20 transition text-sm"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur text-white text-sm font-medium">
            {tour?.name || "Loading..."}
          </div>

          <div className={`px-2 py-1 rounded text-xs font-medium ${
            sdkReady ? "bg-emerald-500/80 text-white" : "bg-amber-500/80 text-white animate-pulse"
          }`}>
            {sdkReady ? "SDK Connected" : "Connecting..."}
          </div>
        </div>

        {/* Right section: Edit Mode toggle */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => { setEditMode(!editMode); setPlacingFurniture(null); setSelectedIdx(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur transition ${
              editMode
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {editMode ? <Pencil size={16} /> : <Eye size={16} />}
            {editMode ? "Edit Mode" : "Preview Mode"}
          </button>
        </div>
      </div>

      {/* ══════════ EDIT MODE OVERLAY ══════════ */}
      {editMode && (
        <>
          {/* ── Right toolbar ── */}
          <div className="absolute top-20 right-4 z-20 flex flex-col gap-2">
            {[
              { mode: "move" as const, icon: Move, label: "Translate (G)", color: "blue" },
              { mode: "rotate" as const, icon: RotateCw, label: "Rotate (R)", color: "purple" },
              { mode: "scale" as const, icon: Maximize2, label: "Scale (S)", color: "orange" },
            ].map(({ mode, icon: Icon, label, color }) => (
              <button
                key={mode}
                onClick={() => setTransformMode(mode)}
                className={`group relative p-2.5 rounded-lg backdrop-blur transition ${
                  transformMode === mode
                    ? `bg-${color}-600 text-white shadow-lg`
                    : "bg-black/50 text-white/70 hover:bg-black/70 hover:text-white"
                }`}
                title={label}
              >
                <Icon size={18} />
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-black/90 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition">
                  {label}
                </span>
              </button>
            ))}

            <div className="w-full h-px bg-white/10 my-1" />

            {selectedIdx !== null && (
              <button
                onClick={handleDelete}
                className="p-2.5 rounded-lg bg-red-600/80 backdrop-blur text-white hover:bg-red-600 transition"
                title="Delete (Del)"
              >
                <Trash2 size={18} />
              </button>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="p-2.5 rounded-lg bg-emerald-600/80 backdrop-blur text-white hover:bg-emerald-600 disabled:opacity-50 transition"
              title="Save (Ctrl+S)"
            >
              <Save size={18} />
            </button>

            <div className="w-full h-px bg-white/10 my-1" />

            <button
              onClick={() => setShowKeybinds(!showKeybinds)}
              className="p-2.5 rounded-lg bg-black/50 backdrop-blur text-white/70 hover:bg-black/70 hover:text-white transition"
              title="Keyboard shortcuts"
            >
              <Keyboard size={18} />
            </button>

            <button
              onClick={() => {
                const next = !cameraLocked;
                setCameraLocked(next);
                postToVsApp(next ? "VS_LOCK_CAMERA" : "VS_UNLOCK_CAMERA");
              }}
              className={`group relative p-2.5 rounded-lg backdrop-blur transition ${
                cameraLocked
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                  : "bg-black/50 text-white/70 hover:bg-black/70 hover:text-white"
              }`}
              title={cameraLocked ? "Unlock Camera" : "Lock Camera"}
            >
              {cameraLocked ? <Lock size={18} /> : <Unlock size={18} />}
              <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-black/90 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition">
                {cameraLocked ? "Unlock Camera" : "Lock Camera"}
              </span>
            </button>
          </div>

          {/* ── Keybinds tooltip ── */}
          {showKeybinds && (
            <div className="absolute top-20 right-16 z-30 w-56 bg-gray-900/95 backdrop-blur border border-white/10 rounded-xl p-4 text-xs text-white/80 space-y-2">
              <h4 className="text-white font-semibold text-sm mb-2">Keyboard Shortcuts</h4>
              <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">G</kbd> Translate mode</div>
              <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">R</kbd> Rotate mode</div>
              <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">S</kbd> Scale mode</div>
              <div className="border-t border-white/10 pt-2 mt-2" />
              <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">W/A/S/D</kbd> Transform X/Z</div>
              <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Q/E</kbd> Transform Y</div>
              <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Esc</kbd> Deselect</div>
              <div><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Del</kbd> Delete object</div>
            </div>
          )}

          {/* ── Bottom transform controls (when object selected) ── */}
          {selectedIdx !== null && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center gap-3 bg-gray-900/90 backdrop-blur border border-white/10 rounded-2xl px-5 py-3 shadow-2xl">
                <span className="text-white text-sm font-medium mr-2 max-w-[140px] truncate">
                  {placedObjects[selectedIdx]?.label || "Object"}
                </span>

                <div className="w-px h-8 bg-white/10" />

                {/* ── Grab / Drag button ── */}
                <button
                  onClick={isDragging ? cancelDrag : startDrag}
                  disabled={!sdkReady}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isDragging
                      ? "bg-amber-500 text-white animate-pulse"
                      : "bg-blue-600 text-white hover:bg-blue-500"
                  }`}
                  title={isDragging ? "Click in scene to finish — or click here to cancel" : `Drag to ${transformMode}`}
                >
                  <Hand size={14} />
                  {isDragging ? "Dragging..." : "Grab"}
                </button>

                <div className="w-px h-8 bg-white/10" />

                {(["x", "y", "z"] as const).map((axis) => (
                  <div key={axis} className="flex items-center gap-1">
                    <span className={`text-xs font-bold uppercase w-4 text-center ${
                      axis === "x" ? "text-red-400" : axis === "y" ? "text-green-400" : "text-blue-400"
                    }`}>{axis}</span>
                    <button
                      onClick={() => adjustSelected(axis, -1)}
                      className="w-7 h-7 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 flex items-center justify-center transition"
                    >−</button>
                    <button
                      onClick={() => adjustSelected(axis, 1)}
                      className="w-7 h-7 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 flex items-center justify-center transition"
                    >+</button>
                  </div>
                ))}

                <div className="w-px h-8 bg-white/10" />

                <span className="text-gray-400 text-[10px] uppercase tracking-wider">
                  {transformMode}
                </span>

                {/* ── Confirm button (only for unconfirmed objects) ── */}
                {placedObjects[selectedIdx] && !placedObjects[selectedIdx]._confirmed && (
                  <>
                    <div className="w-px h-8 bg-white/10" />
                    <button
                      onClick={confirmSelected}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-500 transition"
                      title="Confirm placement (hides bounding box)"
                    >
                      <Check size={14} />
                      Confirm
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── Left sidebar: Asset catalog + Placed objects ── */}
          {sidebarOpen ? (
            <div className="absolute top-20 left-4 bottom-4 w-72 z-20 bg-gray-900/90 backdrop-blur border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-white font-semibold">3D Assets</h3>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white transition">✕</button>
              </div>

              {/* Furniture catalog (grouped by category) */}
              <div className="flex-1 overflow-y-auto">
                {furnitureList.length === 0 ? (
                  <div className="text-gray-500 text-xs text-center py-12 px-4">
                    <Upload size={28} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm">No 3D models</p>
                    <p className="mt-2 text-gray-600">Add furniture via <code className="bg-white/5 px-1 rounded">POST /api/furniture</code></p>
                  </div>
                ) : (
                  <div className="p-3 space-y-1">
                    {categories.map(cat => (
                      <div key={cat}>
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === cat ? null : cat)}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 transition text-sm"
                        >
                          {expandedCategory === cat ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          <span className="font-medium">{cat}</span>
                          <span className="ml-auto text-xs text-gray-500">
                            {furnitureList.filter(f => f.category === cat).length}
                          </span>
                        </button>
                        {expandedCategory === cat && (
                          <div className="pl-2 pr-1 pb-2 space-y-1.5">
                            {furnitureList.filter(f => f.category === cat).map(item => (
                              <button
                                key={item.id}
                                onClick={() => setPlacingFurniture(item)}
                                disabled={!sdkReady}
                                className={`w-full text-left p-2.5 rounded-xl transition ${
                                  placingFurniture?.id === item.id
                                    ? "bg-blue-600/30 ring-1 ring-blue-500"
                                    : "bg-white/5 hover:bg-white/10"
                                } disabled:opacity-30`}
                              >
                                {item.thumbnailUrl ? (
                                  <img src={item.thumbnailUrl} alt={item.name}
                                    className="w-full h-20 object-cover rounded-lg mb-1.5" />
                                ) : (
                                  <div className="w-full h-20 bg-white/5 rounded-lg mb-1.5 flex items-center justify-center text-gray-600 text-xs font-mono">
                                    .glb
                                  </div>
                                )}
                                <p className="text-white text-xs font-medium truncate">{item.name}</p>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Placed objects list */}
              {placedObjects.length > 0 && (
                <div className="border-t border-white/10 p-4">
                  <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">
                    Placed ({placedObjects.length})
                  </h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {placedObjects.map((obj, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
                        className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-xs transition ${
                          selectedIdx === i
                            ? "bg-blue-600/30 text-white ring-1 ring-blue-500/50"
                            : "text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          selectedIdx === i ? "bg-blue-400" : obj._confirmed ? "bg-emerald-500" : "bg-amber-400 animate-pulse"
                        }`} />
                        <span className="flex-1 truncate">{obj.label || `Object ${i + 1}`}</span>
                        {!obj._confirmed && <span className="text-amber-400 text-[10px]">⏳</span>}
                        <span className="text-gray-500 text-[10px] font-mono">
                          {obj.posX?.toFixed(1)},{obj.posY?.toFixed(1)},{obj.posZ?.toFixed(1)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute top-20 left-4 z-20 p-2.5 rounded-lg bg-black/60 backdrop-blur text-white hover:bg-black/80 transition"
            >
              <Plus size={18} />
            </button>
          )}

          {/* ── Placement mode banner ── */}
          {placingFurniture && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 rounded-xl bg-blue-600/90 backdrop-blur shadow-2xl text-white text-sm flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Click in the scene to place <strong>{placingFurniture.name}</strong></span>
              <button
                onClick={() => setPlacingFurniture(null)}
                className="text-white/60 hover:text-white text-xs underline"
              >Cancel</button>
            </div>
          )}

          {/* ── Dragging mode banner ── */}
          {isDragging && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 rounded-xl bg-amber-500/90 backdrop-blur shadow-2xl text-white text-sm flex items-center gap-4">
              <Hand size={16} className="animate-pulse" />
              <span>
                {transformMode === "move" && "Move the cursor to reposition — click to confirm"}
                {transformMode === "rotate" && "Drag left/right to rotate — click to confirm"}
                {transformMode === "scale" && "Drag up/down to resize — click to confirm"}
              </span>
              <button
                onClick={cancelDrag}
                className="text-white/60 hover:text-white text-xs underline"
              >Cancel</button>
            </div>
          )}
        </>
      )}

      {/* ══════════ TOAST ══════════ */}
      {toast && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-gray-900/95 border border-white/10 text-white text-sm backdrop-blur shadow-xl animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
