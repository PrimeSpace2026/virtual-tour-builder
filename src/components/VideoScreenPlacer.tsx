import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Check, Monitor, Link2 } from "lucide-react";

const SDK_KEY = "b7uar4u57xdec0zw7dwygt7md";

interface PlacedScreen {
  name: string;
  youtubeUrl: string;
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  width: number;
  height: number;
  iconType: string;
  visibilityRange: number;
}

interface VideoScreenPlacerProps {
  tourUrl: string;
  onPlace: (screen: PlacedScreen) => void;
  onClose: () => void;
  initialScreen?: PlacedScreen;
}

function extractModelId(url: string): string | null {
  const m = url.match(/m=([a-zA-Z0-9]+)/);
  if (m) return m[1];
  const parts = url.split("/");
  const showIdx = parts.indexOf("show");
  if (showIdx >= 0 && parts[showIdx + 1]) return parts[showIdx + 1].split("?")[0];
  return null;
}

function normalToEulerDeg(normal: { x: number; y: number; z: number }) {
  const { x, y, z } = normal;
  const rotY = Math.atan2(x, z) * (180 / Math.PI);
  const rotX = -Math.asin(y) * (180 / Math.PI);
  return { rotX, rotY, rotZ: 0 };
}

function eulerDegToNormal(rotX: number, rotY: number) {
  const rx = -rotX * Math.PI / 180;
  const ry = rotY * Math.PI / 180;
  return { x: Math.sin(ry) * Math.cos(rx), y: -Math.sin(rx), z: Math.cos(ry) * Math.cos(rx) };
}

type Step = "navigate" | "placed" | "url" | "edit";

export default function VideoScreenPlacer({ tourUrl, onPlace, onClose, initialScreen }: VideoScreenPlacerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sdkRef = useRef<any>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const isEdit = !!initialScreen;
  const [step, setStep] = useState<Step>(isEdit ? "edit" : "navigate");
  const [clickPos, setClickPos] = useState<{ x: number; y: number; z: number } | null>(
    initialScreen ? { x: initialScreen.posX, y: initialScreen.posY, z: initialScreen.posZ } : null
  );
  const [clickNormal, setClickNormal] = useState<{ x: number; y: number; z: number } | null>(
    initialScreen ? eulerDegToNormal(initialScreen.rotX, initialScreen.rotY) : null
  );
  const [youtubeUrl, setYoutubeUrl] = useState(initialScreen?.youtubeUrl || "");
  const [screenWidth, setScreenWidth] = useState(initialScreen?.width || 2);
  const [screenHeight, setScreenHeight] = useState(initialScreen?.height || 1.2);
  const [screenName, setScreenName] = useState(initialScreen?.name || "Écran vidéo");
  const [iconType, setIconType] = useState(initialScreen?.iconType || "youtube");
  const [visibilityRange, setVisibilityRange] = useState(initialScreen?.visibilityRange || 8);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const modelId = extractModelId(tourUrl);
  const iframeSrc = modelId
    ? `https://my.matterport.com/show/?m=${modelId}&applicationKey=${SDK_KEY}&play=1&qs=1&title=0&brand=0&help=0&hl=0&newtags=0&noannotations=1&search=0`
    : "";

  // Connect SDK
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
      console.log("🎯 [Placer] SDK ERROR:", e.message);
    }
  }, [modelId]);

  // Listen for wall clicks — one click = place/move screen
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk || !sdkReady || (step !== "navigate" && step !== "edit")) return;

    let sub: any;
    const startListening = async () => {
      try {
        sub = sdk.Pointer.intersection.subscribe((intersection: any) => {
          if (!intersection || !intersection.position) return;
          const { position, normal } = intersection;
          const n = normal || { x: 0, y: 0, z: 1 };
          const offset = 0.05;
          setClickPos({
            x: position.x + n.x * offset,
            y: position.y + n.y * offset,
            z: position.z + n.z * offset,
          });
          setClickNormal(n);
          // Reclaim keyboard focus from iframe so Enter shortcut works after navigation
          if (document.activeElement?.tagName === 'IFRAME') {
            window.focus();
          }
        });
      } catch (e) {
        console.log("Pointer subscription error:", e);
      }
    };
    startListening();
    return () => { if (sub?.cancel) sub.cancel(); };
  }, [sdkReady, step]);

  const handleLockPosition = () => {
    if (!clickPos) return;
    setStep("placed");
  };

  // Show screen preview on the wall using worldToScreen
  useEffect(() => {
    const sdk = sdkRef.current;
    const preview = previewRef.current;
    const container = containerRef.current;
    if (!sdk || !preview || !container || !clickPos) {
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
        const pxW = screenWidth * 120;
        const pxH = screenHeight * 120;
        const dist = sp.z || 5;
        const scale = Math.min(1, 2.5 / dist);
        if (scale < 0.02) { preview.style.display = "none"; return; }

        preview.style.left = `${sp.x - (pxW * scale) / 2}px`;
        preview.style.top = `${sp.y - (pxH * scale) / 2}px`;
        preview.style.width = `${pxW * scale}px`;
        preview.style.height = `${pxH * scale}px`;
        preview.style.display = "block";
      } else {
        preview.style.display = "none";
      }
    };
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId);
      if (poseSub?.cancel) poseSub.cancel();
    };
  }, [clickPos, screenWidth, screenHeight]);

  const handleConfirmPosition = () => {
    setStep("url");
  };

  const handleSubmitUrl = () => {
    if (!clickPos || !clickNormal || !youtubeUrl.trim()) return;
    const euler = normalToEulerDeg(clickNormal);
    onPlace({
      name: screenName,
      youtubeUrl,
      posX: Math.round(clickPos.x * 100) / 100,
      posY: Math.round(clickPos.y * 100) / 100,
      posZ: Math.round(clickPos.z * 100) / 100,
      rotX: Math.round(euler.rotX * 10) / 10,
      rotY: Math.round(euler.rotY * 10) / 10,
      rotZ: 0,
      width: screenWidth,
      height: screenHeight,
      iconType,
      visibilityRange,
    });
    setTimeout(() => onClose(), 500);
  };

  const handleEditSave = () => {
    if (!clickPos || !clickNormal) return;
    const euler = normalToEulerDeg(clickNormal);
    onPlace({
      name: screenName,
      youtubeUrl,
      posX: Math.round(clickPos.x * 100) / 100,
      posY: Math.round(clickPos.y * 100) / 100,
      posZ: Math.round(clickPos.z * 100) / 100,
      rotX: Math.round(euler.rotX * 10) / 10,
      rotY: Math.round(euler.rotY * 10) / 10,
      rotZ: 0,
      width: screenWidth,
      height: screenHeight,
      iconType,
      visibilityRange,
    });
    setTimeout(() => onClose(), 500);
  };

  const handleReset = () => {
    setClickPos(null);
    setClickNormal(null);
    setYoutubeUrl("");
    setStep("navigate");
  };

  // Enter key shortcuts per step
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      // Don't trigger if typing in an input
      if ((e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA") return;
      if (step === "navigate" && clickPos) { e.preventDefault(); handleLockPosition(); }
      else if (step === "placed" && clickPos) { e.preventDefault(); handleConfirmPosition(); }
      else if (step === "edit" && clickPos) { e.preventDefault(); handleEditSave(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, clickPos, screenName, youtubeUrl, screenWidth, screenHeight, iconType, visibilityRange]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/90 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <Monitor className="w-5 h-5 text-purple-400" />
          <span className="text-white text-sm font-medium">
            {!sdkReady && "Chargement du tour..."}
            {sdkReady && step === "navigate" && "Cliquez sur un mur pour placer un écran"}
            {sdkReady && step === "edit" && "Cliquez sur un mur pour déplacer l'écran — modifiez les réglages à droite"}
            {step === "placed" && "Écran positionné — validez ou repositionnez"}
            {step === "url" && "Ajoutez le lien YouTube"}
          </span>
        </div>
        <Button size="sm" variant="ghost" className="text-white hover:text-white/80 border border-white/20" onClick={onClose}>
          <X className="w-5 h-5 mr-1" /> Fermer
        </Button>
      </div>

      {/* Main */}
      <div className="flex-1 flex relative" ref={containerRef}>
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          onLoad={onIframeLoad}
          className="flex-1 w-full h-full border-none"
          style={{ pointerEvents: (step === "navigate" || step === "edit") ? "auto" : "none" }}
          allow="xr-spatial-tracking; fullscreen"
        />

        <div className="absolute inset-0 pointer-events-none">

          {/* Screen preview on wall */}
          <div
            ref={previewRef}
            style={{ display: "none", position: "absolute", border: "3px solid #ef4444", borderRadius: "4px", background: "rgba(239,68,68,0.15)", boxShadow: "0 0 24px rgba(239,68,68,0.5), inset 0 0 12px rgba(239,68,68,0.1)", pointerEvents: "none" }}
          >
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Monitor style={{ width: "30%", height: "30%", color: "rgba(239,68,68,0.8)" }} />
            </div>
            {/* Corner markers */}
            <div style={{ position: "absolute", top: -4, left: -4, width: 8, height: 8, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px #ef4444" }} />
            <div style={{ position: "absolute", top: -4, right: -4, width: 8, height: 8, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px #ef4444" }} />
            <div style={{ position: "absolute", bottom: -4, left: -4, width: 8, height: 8, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px #ef4444" }} />
            <div style={{ position: "absolute", bottom: -4, right: -4, width: 8, height: 8, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px #ef4444" }} />
          </div>

          {/* Step 1: Show coordinates while navigating */}
          {sdkReady && step === "navigate" && clickPos && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto">
              <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-green-500/50 px-6 py-3 shadow-2xl flex items-center gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
                <div className="text-xs text-white/80 flex gap-3 font-mono">
                  <span>X: {clickPos.x.toFixed(2)}</span>
                  <span>Y: {clickPos.y.toFixed(2)}</span>
                  <span>Z: {clickPos.z.toFixed(2)}</span>
                </div>
                <Button size="sm" onClick={handleLockPosition} className="bg-green-600 hover:bg-green-700 text-white text-xs">
                  <Check className="w-3 h-3 mr-1" /> Placer ici
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Position locked — confirm or adjust size */}
          {step === "placed" && clickPos && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto">
              <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/50 px-6 py-4 shadow-2xl space-y-3 w-[420px]">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-bold flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-purple-400" /> {initialScreen ? "Modifier l'écran" : "Écran positionné"}
                  </span>
                  <button onClick={handleReset} className="text-white/50 hover:text-white text-xs underline">
                    Repositionner
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-white/60">
                  <div className="bg-white/5 rounded px-2 py-1 text-center">X: {clickPos.x.toFixed(2)}</div>
                  <div className="bg-white/5 rounded px-2 py-1 text-center">Y: {clickPos.y.toFixed(2)}</div>
                  <div className="bg-white/5 rounded px-2 py-1 text-center">Z: {clickPos.z.toFixed(2)}</div>
                </div>
                <div>
                  <label className="text-[10px] text-white/40">Nom</label>
                  <Input value={screenName} onChange={(e) => setScreenName(e.target.value)} placeholder="Écran vidéo" className="bg-white/10 border-white/20 text-white text-sm h-8" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-white/40">Largeur (m)</label>
                    <Input type="number" step="0.1" min="0.1" value={screenWidth} onChange={(e) => setScreenWidth(Number(e.target.value))} className="bg-white/10 border-white/20 text-white text-sm h-8" />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/40">Hauteur (m)</label>
                    <Input type="number" step="0.1" min="0.1" value={screenHeight} onChange={(e) => setScreenHeight(Number(e.target.value))} className="bg-white/10 border-white/20 text-white text-sm h-8" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-white/40">Visibility Range: {visibilityRange}m</label>
                  <input
                    type="range" min="2" max="30" step="1" value={visibilityRange}
                    onChange={(e) => setVisibilityRange(Number(e.target.value))}
                    className="w-full h-1.5 mt-1 rounded-lg appearance-none cursor-pointer bg-white/10 accent-purple-500"
                  />
                  <div className="flex justify-between text-[9px] text-white/30 mt-0.5"><span>2m</span><span>30m</span></div>
                </div>
                <div>
                  <label className="text-[10px] text-white/40">Icône</label>
                  <div className="flex gap-1.5 mt-1">
                    {[
                      { value: "youtube", label: "▶ YT" },
                      { value: "play", label: "▶️" },
                      { value: "film", label: "🎬" },
                      { value: "tv", label: "📺" },
                      { value: "live", label: "🔴" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setIconType(opt.value)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${iconType === opt.value ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 text-white/40 hover:text-white/70"}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleConfirmPosition} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Check className="w-4 h-4 mr-2" /> Valider la position
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Enter YouTube URL */}
          {step === "url" && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto">
              <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/50 px-6 py-4 shadow-2xl space-y-3 w-96">
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-purple-400" />
                  <span className="text-white text-sm font-bold">Lien YouTube</span>
                </div>
                <Input
                  autoFocus
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && youtubeUrl.trim()) handleSubmitUrl(); }}
                  placeholder="https://youtube.com/watch?v=..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm"
                />
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setStep("placed")} className="flex-1 text-white/60 hover:text-white border border-white/10">
                    Retour
                  </Button>
                  <Button onClick={handleSubmitUrl} disabled={!youtubeUrl.trim()} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                    <Check className="w-4 h-4 mr-2" /> Valider
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Edit mode — floating right panel, tour stays interactive */}
          {step === "edit" && (
            <div className="absolute top-4 right-4 pointer-events-auto">
              <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/50 px-5 py-4 shadow-2xl space-y-3 w-72">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-bold flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-purple-400" /> Modifier l'écran
                  </span>
                </div>
                {clickPos && (
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] text-white/50 font-mono">
                    <div className="bg-white/5 rounded px-1.5 py-0.5 text-center">X: {clickPos.x.toFixed(2)}</div>
                    <div className="bg-white/5 rounded px-1.5 py-0.5 text-center">Y: {clickPos.y.toFixed(2)}</div>
                    <div className="bg-white/5 rounded px-1.5 py-0.5 text-center">Z: {clickPos.z.toFixed(2)}</div>
                  </div>
                )}
                <div>
                  <label className="text-[10px] text-white/40">Nom</label>
                  <Input value={screenName} onChange={(e) => setScreenName(e.target.value)} placeholder="Écran vidéo" className="bg-white/10 border-white/20 text-white text-sm h-8" />
                </div>
                <div>
                  <label className="text-[10px] text-white/40">URL YouTube</label>
                  <Input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="bg-white/10 border-white/20 text-white text-sm h-8" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-white/40">Largeur (m)</label>
                    <Input type="number" step="0.1" min="0.1" value={screenWidth} onChange={(e) => setScreenWidth(Number(e.target.value))} className="bg-white/10 border-white/20 text-white text-sm h-8" />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/40">Hauteur (m)</label>
                    <Input type="number" step="0.1" min="0.1" value={screenHeight} onChange={(e) => setScreenHeight(Number(e.target.value))} className="bg-white/10 border-white/20 text-white text-sm h-8" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-white/40">Visibility: {visibilityRange}m</label>
                  <input
                    type="range" min="2" max="30" step="1" value={visibilityRange}
                    onChange={(e) => setVisibilityRange(Number(e.target.value))}
                    className="w-full h-1.5 mt-1 rounded-lg appearance-none cursor-pointer bg-white/10 accent-purple-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white/40">Icône</label>
                  <div className="flex gap-1 mt-1">
                    {[
                      { value: "youtube", label: "▶ YT" },
                      { value: "play", label: "▶️" },
                      { value: "film", label: "🎬" },
                      { value: "tv", label: "📺" },
                      { value: "live", label: "🔴" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setIconType(opt.value)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-all ${iconType === opt.value ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 text-white/40 hover:text-white/70"}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleEditSave} disabled={!clickPos} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Check className="w-4 h-4 mr-2" /> Sauvegarder
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
