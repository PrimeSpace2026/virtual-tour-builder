import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, MousePointer2, Check, RotateCw } from "lucide-react";

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
}

interface VideoScreenPlacerProps {
  tourUrl: string;
  onPlace: (screen: PlacedScreen) => void;
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

/**
 * Converts a surface normal vector to Euler rotation (degrees)
 * so the screen faces outward from the wall.
 */
function normalToEulerDeg(normal: { x: number; y: number; z: number }) {
  // The screen's default facing is +Z. We need to rotate it to face along the normal.
  const { x, y, z } = normal;
  const rotY = Math.atan2(x, z) * (180 / Math.PI);
  const rotX = -Math.asin(y) * (180 / Math.PI);
  return { rotX, rotY, rotZ: 0 };
}

export default function VideoScreenPlacer({ tourUrl, onPlace, onClose }: VideoScreenPlacerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sdkRef = useRef<any>(null);
  const previewNodeRef = useRef<any>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [clickPos, setClickPos] = useState<{ x: number; y: number; z: number } | null>(null);
  const [clickNormal, setClickNormal] = useState<{ x: number; y: number; z: number } | null>(null);
  const [screenName, setScreenName] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [screenWidth, setScreenWidth] = useState(2);
  const [screenHeight, setScreenHeight] = useState(1.2);
  const [status, setStatus] = useState("Connexion au SDK...");

  const modelId = extractModelId(tourUrl);
  const iframeSrc = modelId
    ? `https://my.matterport.com/show/?m=${modelId}&applicationKey=${SDK_KEY}&play=1&qs=1&title=0&brand=0&help=0&hl=0`
    : "";

  // Connect SDK once iframe loads
  const onIframeLoad = useCallback(async () => {
    if (!iframeRef.current || !modelId) return;
    try {
      const { setupSdk } = await import("@matterport/sdk");
      const sdk = await Promise.race([
        setupSdk(SDK_KEY, { iframe: iframeRef.current, space: modelId }),
        new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), 30000)),
      ]);
      // Wait for PLAYING
      await new Promise<void>((resolve) => {
        const sub = sdk.App.state.subscribe((s: any) => {
          if (s.phase === sdk.App.Phase.PLAYING) { sub?.cancel?.(); resolve(); }
        });
      });
      sdkRef.current = sdk;
      setSdkReady(true);
      setStatus("Cliquez sur un mur pour placer l'écran");
      setPlacing(true);
    } catch (e: any) {
      setStatus(`Erreur SDK: ${e.message}`);
    }
  }, [modelId]);

  // Listen for pointer clicks when placing
  useEffect(() => {
    const sdk = sdkRef.current;
    if (!sdk || !placing) return;

    let sub: any;
    const startListening = async () => {
      try {
        // Subscribe to pointer intersection
        sub = sdk.Pointer.intersection.subscribe((intersection: any) => {
          if (!intersection || !intersection.position) return;
          const { position, normal } = intersection;

          setClickPos({ x: position.x, y: position.y, z: position.z });
          setClickNormal(normal ? { x: normal.x, y: normal.y, z: normal.z } : { x: 0, y: 0, z: 1 });

          // Offset slightly from wall to avoid z-fighting
          const offset = 0.05;
          const placedPos = {
            x: position.x + (normal?.x || 0) * offset,
            y: position.y + (normal?.y || 0) * offset,
            z: position.z + (normal?.z || 0) * offset,
          };
          setClickPos(placedPos);

          // Create/update preview node
          updatePreview(sdk, placedPos, normal || { x: 0, y: 0, z: 1 });
        });
      } catch (e) {
        console.log("Pointer subscription error:", e);
      }
    };

    startListening();
    return () => { if (sub?.cancel) sub.cancel(); };
  }, [placing]);

  const updatePreview = async (sdk: any, pos: { x: number; y: number; z: number }, normal: { x: number; y: number; z: number }) => {
    try {
      // Remove old preview
      if (previewNodeRef.current) {
        try { previewNodeRef.current.stop(); } catch {}
        previewNodeRef.current = null;
      }

      const [sceneObject] = await sdk.Scene.createObjects(1);
      const node = sceneObject.addNode();

      node.position.set(pos.x, pos.y, pos.z);
      const euler = normalToEulerDeg(normal);
      const toRad = (d: number) => (d * Math.PI) / 180;
      node.rotation.setFromEuler({ x: toRad(euler.rotX), y: toRad(euler.rotY), z: toRad(euler.rotZ) });

      // Add a colored plane as preview
      node.addComponent("mp.planeRenderer", {
        width: screenWidth,
        height: screenHeight,
        color: { r: 0.5, g: 0.2, b: 1 },
        opacity: 0.6,
      });

      node.start();
      previewNodeRef.current = sceneObject;
    } catch (e) {
      console.log("Preview creation error:", e);
    }
  };

  const handleConfirm = () => {
    if (!clickPos || !clickNormal) return;
    const euler = normalToEulerDeg(clickNormal);
    onPlace({
      name: screenName || "Écran vidéo",
      youtubeUrl,
      posX: Math.round(clickPos.x * 100) / 100,
      posY: Math.round(clickPos.y * 100) / 100,
      posZ: Math.round(clickPos.z * 100) / 100,
      rotX: Math.round(euler.rotX * 10) / 10,
      rotY: Math.round(euler.rotY * 10) / 10,
      rotZ: 0,
      width: screenWidth,
      height: screenHeight,
    });
    // Cleanup preview
    if (previewNodeRef.current) {
      try { previewNodeRef.current.stop(); } catch {}
      previewNodeRef.current = null;
    }
    setClickPos(null);
    setClickNormal(null);
    setScreenName("");
    setYoutubeUrl("");
    setStatus("✅ Écran placé ! Cliquez pour en ajouter un autre.");
  };

  const handleReset = () => {
    if (previewNodeRef.current) {
      try { previewNodeRef.current.stop(); } catch {}
      previewNodeRef.current = null;
    }
    setClickPos(null);
    setClickNormal(null);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/90 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <MousePointer2 className="w-5 h-5 text-purple-400" />
          <span className="text-white text-sm font-medium">{status}</span>
        </div>
        <Button size="sm" variant="ghost" className="text-white hover:text-white/80" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex relative">
        {/* Matterport iframe */}
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          onLoad={onIframeLoad}
          className="flex-1 w-full h-full border-none"
          allow="xr-spatial-tracking; fullscreen"
        />

        {/* Placement form - appears when a click is detected */}
        {clickPos && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-sm font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Position détectée
              </h3>
              <button onClick={handleReset} className="text-white/50 hover:text-white">
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Coordinates display */}
            <div className="grid grid-cols-3 gap-2 text-xs text-white/60">
              <div className="bg-white/5 rounded px-2 py-1">X: {clickPos.x.toFixed(2)}</div>
              <div className="bg-white/5 rounded px-2 py-1">Y: {clickPos.y.toFixed(2)}</div>
              <div className="bg-white/5 rounded px-2 py-1">Z: {clickPos.z.toFixed(2)}</div>
            </div>

            {/* Form fields */}
            <div className="space-y-2">
              <Input
                value={screenName}
                onChange={(e) => setScreenName(e.target.value)}
                placeholder="Nom de l'écran"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm"
              />
              <Input
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-white/40">Largeur (m)</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={screenWidth}
                    onChange={(e) => setScreenWidth(Number(e.target.value))}
                    className="bg-white/10 border-white/20 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white/40">Hauteur (m)</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={screenHeight}
                    onChange={(e) => setScreenHeight(Number(e.target.value))}
                    className="bg-white/10 border-white/20 text-white text-sm"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={!youtubeUrl.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Check className="w-4 h-4 mr-2" /> Placer l'écran ici
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
