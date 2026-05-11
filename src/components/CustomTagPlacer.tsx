import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Check, MapPin, Upload, Image, Video, Link, FileText, Type } from "lucide-react";
import TagIconPicker, { iconToDataUri, findIconByName } from "@/components/TagIconPicker";

const SDK_KEY = "b7uar4u57xdec0zw7dwygt7md";

const MEDIA_TYPES = [
  { value: "IMAGE", label: "Image", icon: Image },
  { value: "VIDEO", label: "Vidéo", icon: Video },
  { value: "YOUTUBE", label: "YouTube", icon: Video },
  { value: "INSTAGRAM", label: "Instagram", icon: Link },
  { value: "PDF", label: "PDF", icon: FileText },
  { value: "LINK", label: "Lien", icon: Link },
  { value: "TEXT", label: "Texte", icon: Type },
];

export interface CustomTagData {
  id?: number;
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
}

interface CustomTagPlacerProps {
  tourUrl: string;
  onSave: (tag: CustomTagData) => void;
  onClose: () => void;
  editTag?: CustomTagData | null;
}

function extractModelId(url: string): string | null {
  const m = url.match(/m=([a-zA-Z0-9]+)/);
  if (m) return m[1];
  const parts = url.split("/");
  const showIdx = parts.indexOf("show");
  if (showIdx >= 0 && parts[showIdx + 1]) return parts[showIdx + 1].split("?")[0];
  return null;
}

export default function CustomTagPlacer({ tourUrl, onSave, onClose, editTag }: CustomTagPlacerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sdkRef = useRef<any>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [clickPos, setClickPos] = useState<{ x: number; y: number; z: number } | null>(
    editTag ? { x: editTag.anchorX, y: editTag.anchorY, z: editTag.anchorZ } : null
  );
  const [clickNormal, setClickNormal] = useState<{ x: number; y: number; z: number } | null>(
    editTag?.stemDirX != null ? { x: editTag.stemDirX!, y: editTag.stemDirY ?? 1, z: editTag.stemDirZ ?? 0 } : null
  );
  const [step, setStep] = useState<"place" | "form">(editTag ? "form" : "place");
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewTagRef = useRef<string | null>(null);

  // Form state
  const [label, setLabel] = useState(editTag?.label || "");
  const [description, setDescription] = useState(editTag?.description || "");
  const [mediaType, setMediaType] = useState(editTag?.mediaType || "IMAGE");
  const [mediaUrl, setMediaUrl] = useState(editTag?.mediaUrl || "");
  const [iconUrl, setIconUrl] = useState(editTag?.iconUrl || "");
  const [tagIconName, setTagIconName] = useState(() => {
    // Try to detect if editTag has a picker icon name stored in iconUrl
    return editTag?.iconName || "";
  });
  const [color, setColor] = useState(editTag?.color || "#4A90D9");
  const [stemHeight, setStemHeight] = useState(editTag?.stemHeight ?? 0.5);

  const modelId = extractModelId(tourUrl);
  const iframeSrc = modelId
    ? `https://my.matterport.com/show/?m=${modelId}&applicationKey=${SDK_KEY}&play=1&qs=1&title=0&brand=0&help=0&hl=0&newtags=0&noannotations=1&search=0`
    : "";

  const onIframeLoad = useCallback(async () => {
    if (!iframeRef.current || !modelId) return;
    try {
      const { setupSdk } = await import("@matterport/sdk");
      const sdk = await Promise.race([
        setupSdk(SDK_KEY, { iframe: iframeRef.current, space: modelId }),
        new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout 30s")), 30000)),
      ]);
      await new Promise<void>((resolve) => {
        const sub = sdk.App.state.subscribe((s: any) => {
          if (s.phase === sdk.App.Phase.PLAYING) { sub?.cancel?.(); resolve(); }
        });
      });
      sdkRef.current = sdk;
      setSdkReady(true);
    } catch (e: any) {
      console.log("🏷️ [CustomTagPlacer] SDK ERROR:", e.message);
    }
  }, [modelId]);

  // Pointer intersection for tag placement
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk || !sdkReady || step !== "place") return;

    let sub: any;
    const startListening = async () => {
      try {
        sub = sdk.Pointer.intersection.subscribe((intersection: any) => {
          if (!intersection || !intersection.position) return;
          const { position, normal } = intersection;
          setClickPos({ x: position.x, y: position.y, z: position.z });
          setClickNormal(normal || { x: 0, y: 1, z: 0 });
          if (document.activeElement?.tagName === "IFRAME") window.focus();
        });
      } catch (e) {
        console.log("Pointer subscription error:", e);
      }
    };
    startListening();
    return () => { if (sub?.cancel) sub.cancel(); };
  }, [sdkReady, step]);

  // Preview tag marker at clicked position
  useEffect(() => {
    const sdk = sdkRef.current;
    const preview = previewRef.current;
    const container = containerRef.current;
    if (!sdk || !preview || !container || !clickPos || step !== "place") {
      if (preview) preview.style.display = "none";
      return;
    }

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

      const size = { w: container.clientWidth, h: container.clientHeight };
      const sp = sdk.Conversion.worldToScreen(clickPos, currentPose, size);

      if (sp && typeof sp.x === "number" && sp.z > 0) {
        const dist = sp.z || 5;
        const scale = Math.min(1, 3 / dist);
        const pxSize = 40 * scale;
        if (scale < 0.02) { preview.style.display = "none"; return; }

        preview.style.left = `${sp.x - pxSize / 2}px`;
        preview.style.top = `${sp.y - pxSize}px`;
        preview.style.width = `${pxSize}px`;
        preview.style.height = `${pxSize}px`;
        preview.style.display = "flex";
      } else {
        preview.style.display = "none";
      }
    };
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId);
      if (poseSub?.cancel) poseSub.cancel();
    };
  }, [clickPos, step]);

  // Add preview mattertag when position is confirmed
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk || !sdkReady || step !== "form" || !clickPos) return;

    const addPreview = async () => {
      try {
        // Remove previous preview
        if (previewTagRef.current) {
          try { await sdk.Mattertag.remove(previewTagRef.current); } catch {}
          previewTagRef.current = null;
        }

        const hex = color.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;

        const [sid] = await sdk.Mattertag.add([{
          label: label || "Nouveau tag",
          description: "",
          anchorPosition: { x: clickPos.x, y: clickPos.y, z: clickPos.z },
          stemVector: clickNormal
            ? { x: clickNormal.x * stemHeight, y: clickNormal.y * stemHeight, z: clickNormal.z * stemHeight }
            : { x: 0, y: stemHeight, z: 0 },
          color: { r, g, b },
        }]);
        previewTagRef.current = sid;
        // Center camera on the tag after iframe shrinks for the form panel
        setTimeout(() => {
          try { sdk.Mattertag.navigateToTag(sid, sdk.Mattertag.Transition.FLY); } catch {}
        }, 300);
      } catch (e) {
        console.log("Preview tag error:", e);
      }
    };
    addPreview();

    return () => {
      if (previewTagRef.current && sdkRef.current) {
        try { sdkRef.current.Mattertag.remove(previewTagRef.current); } catch {}
        previewTagRef.current = null;
      }
    };
  }, [step, clickPos, clickNormal, color, stemHeight, label]);

  const handleConfirmPosition = () => {
    if (!clickPos) return;
    setStep("form");
  };

  // Allow Enter key to confirm position during placement step
  useEffect(() => {
    if (step !== "place" || !clickPos) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") { e.preventDefault(); handleConfirmPosition(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, clickPos]);

  const handleUploadIcon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setIconUrl(data.url);
    } catch (err) {
      console.error("Icon upload error:", err);
    }
  };

  const handleUploadMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setMediaUrl(data.url);
    } catch (err) {
      console.error("Media upload error:", err);
    }
  };

  const handleSave = () => {
    if (!clickPos || !label.trim()) return;
    onSave({
      id: editTag?.id,
      label: label.trim(),
      description: description.trim(),
      mediaType,
      mediaUrl: mediaUrl.trim(),
      iconUrl: iconUrl.trim(),
      iconName: tagIconName || undefined,
      color,
      anchorX: Math.round(clickPos.x * 100) / 100,
      anchorY: Math.round(clickPos.y * 100) / 100,
      anchorZ: Math.round(clickPos.z * 100) / 100,
      stemHeight,
      stemDirX: clickNormal ? Math.round(clickNormal.x * 1000) / 1000 : 0,
      stemDirY: clickNormal ? Math.round(clickNormal.y * 1000) / 1000 : 1,
      stemDirZ: clickNormal ? Math.round(clickNormal.z * 1000) / 1000 : 0,
      floorIndex: 0,
      enabled: true,
    });
  };

  const showMediaUpload = mediaType === "IMAGE" || mediaType === "PDF" || mediaType === "VIDEO";
  const showMediaUrl = mediaType !== "TEXT";

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-black/90 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
          <span className="text-white text-xs sm:text-sm font-medium truncate">
            {!sdkReady && "Chargement..."}
            {sdkReady && step === "place" && !clickPos && "Touchez pour placer le tag"}
            {sdkReady && step === "place" && clickPos && "Position OK — Suivant"}
            {step === "form" && "Configurez votre tag"}
          </span>
        </div>
        <Button size="sm" variant="ghost" className="text-white hover:text-white/80 border border-white/20 shrink-0" onClick={onClose}>
          <X className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1" /> <span className="hidden sm:inline">Fermer</span>
        </Button>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row relative" ref={containerRef}>
        {/* 3D Viewer */}
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          onLoad={onIframeLoad}
          className={`border-none ${step === "form" ? "h-[35%] sm:h-full w-full sm:w-[60%]" : "w-full h-full"} transition-all`}
          allow="xr-spatial-tracking; fullscreen"
        />

        {/* Tag preview dot during placement */}
        {step === "place" && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              ref={previewRef}
              style={{ display: "none", position: "absolute", pointerEvents: "none" }}
              className="items-center justify-center"
            >
              <div className="w-full h-full rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: color }} />
            </div>

            {sdkReady && clickPos && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto w-[90%] sm:w-auto">
                <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-blue-500/50 px-4 sm:px-6 py-3 shadow-2xl flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
                  <div className="text-[10px] sm:text-xs text-gray-400 flex gap-2 sm:gap-3">
                    <span>X: <span className="text-white font-mono">{clickPos.x.toFixed(2)}</span></span>
                    <span>Y: <span className="text-white font-mono">{clickPos.y.toFixed(2)}</span></span>
                    <span>Z: <span className="text-white font-mono">{clickPos.z.toFixed(2)}</span></span>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleConfirmPosition}>
                    <Check className="w-4 h-4 mr-1" /> Suivant
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Form panel */}
        {step === "form" && (
          <div className="w-full h-[65%] sm:h-full sm:w-[40%] bg-[#1a1a2e] border-t sm:border-t-0 sm:border-l border-white/10 flex flex-col">
            <div className="flex-1 overflow-y-auto p-3 sm:p-5">
            <h2 className="text-white text-sm sm:text-lg font-semibold mb-3 sm:mb-5 flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              {editTag ? "Modifier le tag" : "Nouveau tag personnalisé"}
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {/* Label */}
              <div>
                <Label className="text-gray-300 text-sm">Titre *</Label>
                <Input
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Nom du tag"
                  className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>

              {/* Description */}
              <div>
                <Label className="text-gray-300 text-sm">Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description du tag..."
                  className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-gray-500 min-h-[60px] sm:min-h-[80px]"
                />
              </div>

              {/* Media Type */}
              <div>
                <Label className="text-gray-300 text-sm">Type de média</Label>
                <select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                  className="mt-1 w-full h-10 rounded-md border border-white/20 bg-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                  {MEDIA_TYPES.map((t) => (
                    <option key={t.value} value={t.value} className="bg-[#1a1a2e] text-white">
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Media URL */}
              {showMediaUrl && (
                <div>
                  <Label className="text-gray-300 text-sm">
                    {mediaType === "YOUTUBE" ? "Lien YouTube" :
                     mediaType === "INSTAGRAM" ? "Lien Instagram" :
                     mediaType === "LINK" ? "URL du lien" :
                     mediaType === "PDF" ? "URL du PDF" :
                     mediaType === "IMAGE" ? "URL de l'image" :
                     "URL de la vidéo"}
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                      placeholder={
                        mediaType === "YOUTUBE" ? "https://youtu.be/..." :
                        mediaType === "INSTAGRAM" ? "https://www.instagram.com/p/..." :
                        "https://..."
                      }
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    />
                    {showMediaUpload && (
                      <label className="cursor-pointer">
                        <input type="file" className="hidden" accept={
                          mediaType === "IMAGE" ? "image/*" :
                          mediaType === "PDF" ? ".pdf" :
                          "video/*"
                        } onChange={handleUploadMedia} />
                        <div className="flex items-center justify-center h-10 px-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
                          <Upload className="w-4 h-4" />
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* Custom Icon */}
              <div>
                <Label className="text-gray-300 text-sm">Icône du tag</Label>
                <TagIconPicker
                  value={tagIconName}
                  color={color}
                  onChange={(name, dataUri) => {
                    setTagIconName(name);
                    if (name) {
                      setIconUrl(dataUri);
                    } else {
                      setIconUrl("");
                    }
                  }}
                />
              </div>

              {/* Or custom icon URL */}
              <div>
                <Label className="text-gray-300 text-xs text-gray-500">Ou icône personnalisée (URL)</Label>
                <div className="flex gap-2 mt-1 items-center">
                  <Input
                    value={tagIconName ? "" : iconUrl}
                    onChange={(e) => { setIconUrl(e.target.value); setTagIconName(""); }}
                    placeholder="URL de l'icône (optionnel)"
                    disabled={!!tagIconName}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 text-xs"
                  />
                  <label className="cursor-pointer">
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => { handleUploadIcon(e); setTagIconName(""); }} />
                    <div className="flex items-center justify-center h-10 px-3 bg-purple-600 hover:bg-purple-700 rounded-md text-white text-sm">
                      <Upload className="w-4 h-4" />
                    </div>
                  </label>
                  {!tagIconName && iconUrl && (
                    <img src={iconUrl} alt="icon" className="w-10 h-10 rounded-md object-cover border border-white/20" />
                  )}
                </div>
              </div>

              {/* Color */}
              <div>
                <Label className="text-gray-300 text-sm">Couleur du tag</Label>
                <div className="flex items-center gap-3 mt-1">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
                  />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-28 bg-white/10 border-white/20 text-white font-mono text-sm"
                  />
                </div>
              </div>

              {/* Stem Height */}
              <div>
                <Label className="text-gray-300 text-sm">Hauteur de la tige</Label>
                <Input
                  type="number"
                  value={stemHeight}
                  onChange={(e) => setStemHeight(Number(e.target.value))}
                  step={0.1}
                  min={0}
                  max={5}
                  className="mt-1 w-32 bg-white/10 border-white/20 text-white"
                />
              </div>

              {/* Position info */}
              {clickPos && (
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <Label className="text-gray-400 text-xs">Position 3D</Label>
                  <div className="flex gap-4 mt-1 text-xs text-gray-300 font-mono">
                    <span>X: {clickPos.x.toFixed(2)}</span>
                    <span>Y: {clickPos.y.toFixed(2)}</span>
                    <span>Z: {clickPos.z.toFixed(2)}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 text-xs border-white/20 text-gray-300 hover:text-white"
                    onClick={() => setStep("place")}
                  >
                    Repositionner
                  </Button>
                </div>
              )}
            </div>
            </div>

              {/* Save / Cancel — sticky bottom */}
              <div className="flex gap-3 p-3 sm:p-5 pt-3 border-t border-white/10 shrink-0 bg-[#1a1a2e]">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSave} disabled={!label.trim()}>
                  <Check className="w-4 h-4 mr-2" />
                  {editTag ? "Enregistrer" : "Créer le tag"}
                </Button>
                <Button variant="outline" className="border-white/20 text-gray-300 hover:text-white" onClick={onClose}>
                  Annuler
                </Button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
