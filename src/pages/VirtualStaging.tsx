import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ArrowLeft, Plus, Trash2, Save, RotateCw, Move, Maximize2, Eye, EyeOff, Upload } from "lucide-react";

// Types
interface StagedObj {
  id?: number;
  tourId: number;
  furnitureModelId?: number;
  modelUrl: string;
  sweepId?: string;
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  label: string;
}

interface FurnitureItem {
  id: number;
  name: string;
  category: string;
  modelUrl: string;
  thumbnailUrl: string;
  defaultScale: number;
}

interface PlacedObject {
  stagedObj: StagedObj;
  threeObj: THREE.Object3D;
}

const MATTERPORT_KEY = "b7uar4u57xdec0zw7dwygt7md";

export default function VirtualStaging() {
  const { id: tourId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Tour data
  const [tour, setTour] = useState<any>(null);
  const [modelId, setModelId] = useState<string | null>(null);

  // SDK
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sdkRef = useRef<any>(null);

  // Three.js
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const gltfLoaderRef = useRef(new GLTFLoader());

  // State
  const [placedObjects, setPlacedObjects] = useState<PlacedObject[]>([]);
  const [furnitureList, setFurnitureList] = useState<FurnitureItem[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [mode, setMode] = useState<"place" | "move" | "rotate" | "scale">("place");
  const [showOverlay, setShowOverlay] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [placingFurniture, setPlacingFurniture] = useState<FurnitureItem | null>(null);

  // Load tour data
  useEffect(() => {
    if (!tourId) return;
    fetch(`/api/tours/${tourId}`)
      .then((r) => r.json())
      .then((data) => {
        setTour(data);
        try {
          const mid = new URL(data.tourUrl).searchParams.get("m");
          setModelId(mid);
        } catch {}
      })
      .catch(console.error);
  }, [tourId]);

  // Load furniture catalog
  useEffect(() => {
    fetch("/api/furniture")
      .then((r) => r.json())
      .then((data) => setFurnitureList(Array.isArray(data) ? data : []))
      .catch(() => setFurnitureList([]));
  }, []);

  // Load existing staged objects
  useEffect(() => {
    if (!tourId) return;
    fetch(`/api/tours/${tourId}/staged-objects`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((obj: StagedObj) => loadObjectIntoScene(obj));
        }
      })
      .catch(() => {});
  }, [tourId, sdkReady]);

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    rendererRef.current = renderer;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 10, 5);
    directional.castShadow = true;
    scene.add(directional);

    // Grid helper for placement reference
    const grid = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    grid.material.opacity = 0.3;
    grid.material.transparent = true;
    scene.add(grid);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Connect to Matterport SDK and sync camera
  useEffect(() => {
    if (!modelId || !iframeRef.current) return;
    let cancelled = false;

    const connectSdk = async () => {
      try {
        const { setupSdk } = await import("@matterport/sdk");
        const sdk = await setupSdk(MATTERPORT_KEY, {
          iframe: iframeRef.current!,
          space: modelId,
        });
        if (cancelled) return;
        sdkRef.current = sdk;
        setSdkReady(true);

        // Sync Three.js camera with Matterport camera pose
        sdk.Camera.pose.subscribe((pose: any) => {
          if (!cameraRef.current) return;
          const cam = cameraRef.current;

          // Position
          cam.position.set(pose.position.x, pose.position.y, pose.position.z);

          // Rotation from Matterport (degrees) to Three.js (radians)
          const euler = new THREE.Euler(
            THREE.MathUtils.degToRad(pose.rotation.x),
            THREE.MathUtils.degToRad(pose.rotation.y),
            0,
            "YXZ"
          );
          cam.quaternion.setFromEuler(euler);

          // Projection matrix
          if (pose.projection) {
            const projMatrix = new THREE.Matrix4();
            projMatrix.fromArray(pose.projection);
            projMatrix.transpose();
            cam.projectionMatrix.copy(projMatrix);
            cam.projectionMatrixInverse.copy(projMatrix).invert();
          }
        });
      } catch (err) {
        console.error("[VirtualStaging] SDK connect error:", err);
      }
    };

    // Wait for iframe to render
    const timer = setTimeout(connectSdk, 3000);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [modelId]);

  // Load a GLTF model into the Three.js scene
  const loadObjectIntoScene = useCallback((obj: StagedObj) => {
    if (!sceneRef.current || !obj.modelUrl) return;

    gltfLoaderRef.current.load(
      obj.modelUrl,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(obj.posX || 0, obj.posY || 0, obj.posZ || 0);
        model.rotation.set(
          THREE.MathUtils.degToRad(obj.rotX || 0),
          THREE.MathUtils.degToRad(obj.rotY || 0),
          THREE.MathUtils.degToRad(obj.rotZ || 0)
        );
        model.scale.set(obj.scaleX || 1, obj.scaleY || 1, obj.scaleZ || 1);
        model.userData.label = obj.label;
        model.userData.stagedObjId = obj.id;

        sceneRef.current!.add(model);
        setPlacedObjects((prev) => [...prev, { stagedObj: obj, threeObj: model }]);
      },
      undefined,
      (err) => console.error("[VirtualStaging] GLTF load error:", err)
    );
  }, []);

  // Place furniture at Matterport world position (click on floor)
  const handleCanvasClick = useCallback(
    async (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!placingFurniture || !sdkRef.current || !rendererRef.current) return;

      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const screenX = e.clientX - rect.left;
      const screenY = e.clientY - rect.top;

      // Use Matterport's Renderer to get world position from screen coords
      try {
        const worldData = await sdkRef.current.Renderer.getWorldPositionData({
          x: screenX / rect.width,
          y: screenY / rect.height,
        });

        if (worldData && worldData.position) {
          const pos = worldData.position;
          const newObj: StagedObj = {
            tourId: Number(tourId),
            furnitureModelId: placingFurniture.id,
            modelUrl: placingFurniture.modelUrl,
            posX: pos.x,
            posY: pos.y,
            posZ: pos.z,
            rotX: 0,
            rotY: 0,
            rotZ: 0,
            scaleX: placingFurniture.defaultScale || 1,
            scaleY: placingFurniture.defaultScale || 1,
            scaleZ: placingFurniture.defaultScale || 1,
            label: placingFurniture.name,
          };

          loadObjectIntoScene(newObj);
          setPlacingFurniture(null);
        }
      } catch (err) {
        console.error("[VirtualStaging] Click placement error:", err);
      }
    },
    [placingFurniture, tourId, loadObjectIntoScene]
  );

  // Save all placed objects to backend
  const handleSave = async () => {
    if (!tourId) return;
    setSaving(true);
    try {
      for (const placed of placedObjects) {
        const obj = placed.stagedObj;
        // Update position from Three.js object
        obj.posX = placed.threeObj.position.x;
        obj.posY = placed.threeObj.position.y;
        obj.posZ = placed.threeObj.position.z;
        obj.rotX = THREE.MathUtils.radToDeg(placed.threeObj.rotation.x);
        obj.rotY = THREE.MathUtils.radToDeg(placed.threeObj.rotation.y);
        obj.rotZ = THREE.MathUtils.radToDeg(placed.threeObj.rotation.z);
        obj.scaleX = placed.threeObj.scale.x;
        obj.scaleY = placed.threeObj.scale.y;
        obj.scaleZ = placed.threeObj.scale.z;

        if (obj.id) {
          await fetch(`/api/tours/${tourId}/staged-objects/${obj.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj),
          });
        } else {
          const res = await fetch(`/api/tours/${tourId}/staged-objects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj),
          });
          if (res.ok) {
            const saved = await res.json();
            obj.id = saved.id;
          }
        }
      }
    } catch (err) {
      console.error("[VirtualStaging] Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  // Delete selected object
  const handleDelete = async () => {
    if (selectedIdx === null) return;
    const placed = placedObjects[selectedIdx];
    if (!placed) return;

    // Remove from Three.js
    sceneRef.current?.remove(placed.threeObj);
    placed.threeObj.traverse((child: any) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach((m: any) => m.dispose());
        else child.material.dispose();
      }
    });

    // Remove from backend
    if (placed.stagedObj.id && tourId) {
      fetch(`/api/tours/${tourId}/staged-objects/${placed.stagedObj.id}`, { method: "DELETE" }).catch(() => {});
    }

    setPlacedObjects((prev) => prev.filter((_, i) => i !== selectedIdx));
    setSelectedIdx(null);
  };

  // Adjust selected object transform
  const adjustSelected = (axis: "x" | "y" | "z", delta: number) => {
    if (selectedIdx === null) return;
    const placed = placedObjects[selectedIdx];
    if (!placed) return;

    if (mode === "move") {
      placed.threeObj.position[axis] += delta;
    } else if (mode === "rotate") {
      placed.threeObj.rotation[axis] += THREE.MathUtils.degToRad(delta * 15);
    } else if (mode === "scale") {
      const s = 1 + delta * 0.1;
      placed.threeObj.scale.multiplyScalar(s);
    }
  };

  if (!tourId) return <div className="p-8 text-white">Tour ID manquant</div>;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Matterport iframe */}
      {modelId && (
        <iframe
          ref={iframeRef}
          className="absolute inset-0 w-full h-full"
          src={`https://my.matterport.com/show/?m=${modelId}&applicationKey=${MATTERPORT_KEY}&play=1&qs=1&title=0&brand=0&help=0&hl=0`}
          allow="xr-spatial-tracking"
          style={{ zIndex: 1 }}
        />
      )}

      {/* Three.js overlay canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex: showOverlay ? 2 : -1,
          pointerEvents: placingFurniture ? "auto" : "none",
          cursor: placingFurniture ? "crosshair" : "default",
        }}
        onClick={handleCanvasClick}
      />

      {/* Top bar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur text-white hover:bg-black/80 transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Retour</span>
        </button>
        <div className="px-3 py-2 rounded-lg bg-black/60 backdrop-blur text-white text-sm">
          Virtual Staging — {tour?.name || "..."}
        </div>
        <div className={`px-2 py-1 rounded text-xs ${sdkReady ? "bg-green-600/80" : "bg-yellow-600/80"} text-white`}>
          {sdkReady ? "SDK connecté" : "Connexion..."}
        </div>
      </div>

      {/* Right toolbar */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setShowOverlay(!showOverlay)}
          className="p-2 rounded-lg bg-black/60 backdrop-blur text-white hover:bg-black/80"
          title={showOverlay ? "Masquer le staging" : "Afficher le staging"}
        >
          {showOverlay ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
        <button
          onClick={() => setMode("move")}
          className={`p-2 rounded-lg backdrop-blur text-white ${mode === "move" ? "bg-blue-600" : "bg-black/60 hover:bg-black/80"}`}
          title="Déplacer"
        >
          <Move size={18} />
        </button>
        <button
          onClick={() => setMode("rotate")}
          className={`p-2 rounded-lg backdrop-blur text-white ${mode === "rotate" ? "bg-blue-600" : "bg-black/60 hover:bg-black/80"}`}
          title="Tourner"
        >
          <RotateCw size={18} />
        </button>
        <button
          onClick={() => setMode("scale")}
          className={`p-2 rounded-lg backdrop-blur text-white ${mode === "scale" ? "bg-blue-600" : "bg-black/60 hover:bg-black/80"}`}
          title="Redimensionner"
        >
          <Maximize2 size={18} />
        </button>
        {selectedIdx !== null && (
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-red-600/80 backdrop-blur text-white hover:bg-red-700"
            title="Supprimer"
          >
            <Trash2 size={18} />
          </button>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="p-2 rounded-lg bg-green-600/80 backdrop-blur text-white hover:bg-green-700 disabled:opacity-50"
          title="Sauvegarder"
        >
          <Save size={18} />
        </button>
      </div>

      {/* Bottom: transform controls for selected */}
      {selectedIdx !== null && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/70 backdrop-blur rounded-xl px-4 py-3">
          <span className="text-white text-xs self-center mr-2">
            {placedObjects[selectedIdx]?.stagedObj.label || "Objet"}
          </span>
          {(["x", "y", "z"] as const).map((axis) => (
            <div key={axis} className="flex items-center gap-1">
              <span className="text-xs text-gray-400 uppercase w-3">{axis}</span>
              <button onClick={() => adjustSelected(axis, -0.1)} className="px-2 py-1 rounded bg-white/10 text-white text-xs hover:bg-white/20">-</button>
              <button onClick={() => adjustSelected(axis, 0.1)} className="px-2 py-1 rounded bg-white/10 text-white text-xs hover:bg-white/20">+</button>
            </div>
          ))}
        </div>
      )}

      {/* Sidebar: furniture catalog */}
      {sidebarOpen && (
        <div className="absolute top-16 left-4 bottom-4 w-64 z-10 bg-black/70 backdrop-blur rounded-xl overflow-hidden flex flex-col">
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white text-sm font-medium">Mobilier</h3>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white text-xs">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {furnitureList.length === 0 ? (
              <div className="text-gray-400 text-xs text-center py-8">
                <Upload size={24} className="mx-auto mb-2 opacity-50" />
                <p>Aucun modèle 3D</p>
                <p className="mt-1">Ajoutez des meubles via l'API</p>
                <p className="mt-1 text-[10px] text-gray-500">POST /api/furniture</p>
              </div>
            ) : (
              furnitureList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPlacingFurniture(item)}
                  className={`w-full text-left p-2 rounded-lg transition ${
                    placingFurniture?.id === item.id
                      ? "bg-blue-600/60 ring-1 ring-blue-400"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {item.thumbnailUrl ? (
                    <img src={item.thumbnailUrl} alt={item.name} className="w-full h-20 object-cover rounded mb-1" />
                  ) : (
                    <div className="w-full h-20 bg-white/10 rounded mb-1 flex items-center justify-center text-gray-500 text-xs">3D</div>
                  )}
                  <p className="text-white text-xs truncate">{item.name}</p>
                  <p className="text-gray-400 text-[10px]">{item.category}</p>
                </button>
              ))
            )}
          </div>

          {/* Placed objects list */}
          {placedObjects.length > 0 && (
            <div className="border-t border-white/10 p-3">
              <h4 className="text-white text-xs font-medium mb-2">Objets placés ({placedObjects.length})</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {placedObjects.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
                    className={`w-full text-left px-2 py-1 rounded text-xs transition ${
                      selectedIdx === i ? "bg-blue-600/40 text-white" : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {p.stagedObj.label || `Objet ${i + 1}`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-16 left-4 z-10 p-2 rounded-lg bg-black/60 backdrop-blur text-white hover:bg-black/80"
        >
          <Plus size={18} />
        </button>
      )}

      {/* Placing mode banner */}
      {placingFurniture && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-lg bg-blue-600/90 text-white text-sm flex items-center gap-3">
          <span>Cliquez pour placer: <strong>{placingFurniture.name}</strong></span>
          <button onClick={() => setPlacingFurniture(null)} className="text-white/70 hover:text-white text-xs underline">Annuler</button>
        </div>
      )}
    </div>
  );
}
