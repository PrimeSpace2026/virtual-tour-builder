import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Check, User } from "lucide-react";

const SDK_KEY = "b7uar4u57xdec0zw7dwygt7md";

interface PlacedAvatar {
  posX: number;
  posY: number;
  posZ: number;
  rotY: number;
}

interface AvatarPlacerProps {
  tourUrl: string;
  avatarUrl: string;
  onPlace: (pos: PlacedAvatar) => void;
  onClose: () => void;
}

function extractModelId(url: string): string | null {
  const m = url.match(/m=([a-zA-Z0-9]+)/);
  if (m) return m[1];
  const parts = url.split("/");
  const showIdx = parts.indexOf("show");
  if (showIdx >= 0 && parts[showIdx + 1]) return parts[showIdx + 1].split("?")[0];
  return null;
}

export default function AvatarPlacer({ tourUrl, avatarUrl, onPlace, onClose }: AvatarPlacerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sdkRef = useRef<any>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [clickPos, setClickPos] = useState<{ x: number; y: number; z: number } | null>(null);
  const [rotY, setRotY] = useState(0);
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
      console.log("🎯 [AvatarPlacer] SDK ERROR:", e.message);
    }
  }, [modelId]);

  // Listen for floor clicks
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk || !sdkReady) return;

    let sub: any;
    const startListening = async () => {
      try {
        sub = sdk.Pointer.intersection.subscribe((intersection: any) => {
          if (!intersection || !intersection.position) return;
          const { position } = intersection;
          setClickPos({
            x: position.x,
            y: position.y,
            z: position.z,
          });
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
  }, [sdkReady]);

  // Show avatar preview at clicked position
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
        const dist = sp.z || 5;
        const scale = Math.min(1, 3 / dist);
        const pxH = 180 * scale;
        const pxW = 90 * scale;
        if (scale < 0.02) { preview.style.display = "none"; return; }

        preview.style.left = `${sp.x - pxW / 2}px`;
        preview.style.top = `${sp.y - pxH}px`;
        preview.style.width = `${pxW}px`;
        preview.style.height = `${pxH}px`;
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
  }, [clickPos]);

  const handleConfirm = () => {
    if (!clickPos) return;
    onPlace({
      posX: Math.round(clickPos.x * 100) / 100,
      posY: Math.round(clickPos.y * 100) / 100,
      posZ: Math.round(clickPos.z * 100) / 100,
      rotY: rotY,
    });
    setTimeout(() => onClose(), 300);
  };

  // Enter key to confirm
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && clickPos) {
        e.preventDefault();
        handleConfirm();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clickPos, rotY]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/90 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-purple-400" />
          <span className="text-white text-sm font-medium">
            {!sdkReady && "Chargement du tour..."}
            {sdkReady && !clickPos && "Cliquez à l'endroit où placer l'avatar"}
            {sdkReady && clickPos && "Position sélectionnée — Confirmez ou cliquez ailleurs"}
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
          allow="xr-spatial-tracking; fullscreen"
        />

        <div className="absolute inset-0 pointer-events-none">
          {/* Avatar preview at clicked position */}
          <div
            ref={previewRef}
            style={{ display: "none", position: "absolute", pointerEvents: "none" }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-contain drop-shadow-lg" style={{ filter: "drop-shadow(0 0 8px rgba(168,85,247,0.6))" }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-500/20 rounded-full border-2 border-purple-500">
                <User className="w-1/2 h-1/2 text-purple-400" />
              </div>
            )}
          </div>

          {/* Bottom controls */}
          {sdkReady && clickPos && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto">
              <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/50 px-6 py-3 shadow-2xl flex items-center gap-4">
                <div className="text-xs text-gray-400 flex gap-3">
                  <span>X: <span className="text-white font-mono">{clickPos.x.toFixed(2)}</span></span>
                  <span>Y: <span className="text-white font-mono">{clickPos.y.toFixed(2)}</span></span>
                  <span>Z: <span className="text-white font-mono">{clickPos.z.toFixed(2)}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-400">Rotation:</label>
                  <Input
                    type="number"
                    value={rotY}
                    onChange={(e) => setRotY(Number(e.target.value))}
                    className="w-20 h-7 text-xs bg-white/10 border-white/20 text-white"
                    step={15}
                  />
                  <span className="text-xs text-gray-500">°</span>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleConfirm}>
                  <Check className="w-4 h-4 mr-1" /> Confirmer
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
