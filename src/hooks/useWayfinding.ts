import { useRef, useState, useCallback, useEffect } from "react";

/* ─── Types ─── */
interface SweepNode {
  sid: string;
  position: { x: number; y: number; z: number };
  neighbors: string[];
  floorIndex: number;
}

export interface WayfindingTarget {
  label: string;
  position: { x: number; y: number; z: number };
}

export type WayfindingMode = "manual" | "auto";

export interface WayfindingState {
  isNavigating: boolean;
  destination: string;
  mode: WayfindingMode;
  progress: number; // 0-1
  distanceRemaining: number; // metres
  arrived: boolean;
}

/* ─── Hook ─── */
export function useWayfinding(sdkRef: React.MutableRefObject<any>) {
  const sweepGraph = useRef<Map<string, SweepNode>>(new Map());
  const currentSweepSidRef = useRef<string | null>(null);
  const markerSidsRef = useRef<string[]>([]);
  const cancelledRef = useRef(false);
  const sweepSubRef = useRef<any>(null);
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [state, setState] = useState<WayfindingState>({
    isNavigating: false,
    destination: "",
    mode: "manual",
    progress: 0,
    distanceRemaining: 0,
    arrived: false,
  });

  /* ─── A) Collect sweep graph ─── */
  const collectSweeps = useCallback(async (): Promise<Map<string, SweepNode>> => {
    const sdk = sdkRef.current;
    if (!sdk) return new Map();

    // Already collected?
    if (sweepGraph.current.size > 0) return sweepGraph.current;

    const graph = new Map<string, SweepNode>();

    await new Promise<void>((resolve) => {
      const sub = sdk.Sweep.data.subscribe({
        onCollectionUpdated: (collection: any) => {
          const items: any[] = [];
          if (collection && typeof collection.forEach === "function") {
            collection.forEach((item: any, key: any) => items.push({ ...item, sid: key }));
          } else if (Array.isArray(collection)) {
            collection.forEach((item: any) => items.push({ ...item, sid: item.sid || item.id }));
          }
          if (items.length > 0) {
            for (const s of items) {
              const neighborSids: string[] = [];
              if (s.neighbors && typeof s.neighbors.forEach === "function") {
                s.neighbors.forEach((n: any, nKey: any) => neighborSids.push(nKey ?? n?.sid ?? n));
              } else if (Array.isArray(s.neighbors)) {
                s.neighbors.forEach((n: any) => neighborSids.push(n?.sid ?? n));
              }
              graph.set(s.sid, {
                sid: s.sid,
                position: s.position || { x: 0, y: 0, z: 0 },
                neighbors: neighborSids,
                floorIndex: s.floorIndex ?? s.floor ?? 0,
              });
            }
            sub?.cancel?.();
            resolve();
          }
        },
      });
    });

    sweepGraph.current = graph;

    // Subscribe to current sweep tracking
    if (!sweepSubRef.current) {
      sweepSubRef.current = sdk.Sweep.current.subscribe((sweep: any) => {
        if (sweep?.sid) currentSweepSidRef.current = sweep.sid;
      });
    }

    return graph;
  }, [sdkRef]);

  /* ─── B) BFS pathfinding ─── */
  const bfsPath = useCallback(
    (graph: Map<string, SweepNode>, startSid: string, endSid: string): string[] | null => {
      if (!graph.has(startSid) || !graph.has(endSid)) return null;
      if (startSid === endSid) return [startSid];

      const visited = new Set<string>([startSid]);
      const queue: string[][] = [[startSid]];

      while (queue.length > 0) {
        const path = queue.shift()!;
        const current = path[path.length - 1];
        const node = graph.get(current);
        if (!node) continue;

        for (const neighbor of node.neighbors) {
          if (visited.has(neighbor)) continue;
          visited.add(neighbor);
          const newPath = [...path, neighbor];
          if (neighbor === endSid) return newPath;
          queue.push(newPath);
        }
      }
      return null;
    },
    []
  );

  /* ─── Nearest sweep to a 3D position ─── */
  const nearestSweep = useCallback(
    (graph: Map<string, SweepNode>, pos: { x: number; y: number; z: number }): string | null => {
      let best: string | null = null;
      let bestDist = Infinity;
      for (const [sid, node] of graph) {
        const dx = node.position.x - pos.x;
        const dy = node.position.y - pos.y;
        const dz = node.position.z - pos.z;
        const dist = dx * dx + dy * dy + dz * dz;
        if (dist < bestDist) {
          bestDist = dist;
          best = sid;
        }
      }
      return best;
    },
    []
  );

  /* ─── D) Place arrow markers along the path ─── */
  const placeMarkers = useCallback(
    async (graph: Map<string, SweepNode>, path: string[]): Promise<string[]> => {
      const sdk = sdkRef.current;
      if (!sdk || path.length < 2) return [];

      const STEP = 0.5; // one marker every 0.5m
      const defs: any[] = [];

      for (let i = 0; i < path.length - 1; i++) {
        const a = graph.get(path[i])!;
        const b = graph.get(path[i + 1])!;
        const dx = b.position.x - a.position.x;
        const dy = b.position.y - a.position.y;
        const dz = b.position.z - a.position.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const steps = Math.max(1, Math.round(dist / STEP));

        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          defs.push({
            label: "➤",
            description: "",
            anchorPosition: {
              x: a.position.x + dx * t,
              y: a.position.y + dy * t - 1.4, // floor level
              z: a.position.z + dz * t,
            },
            stemVector: { x: 0, y: 0.001, z: 0 },
            color: { r: 1, g: 0.1, b: 0.1 },
          });
        }
      }

      const sids: string[] = [];
      try {
        // Try single batch
        const result = await sdk.Mattertag.add(defs);
        if (Array.isArray(result)) sids.push(...result);
      } catch {
        // Fallback: batches of 50
        for (let i = 0; i < defs.length; i += 50) {
          try {
            const batch = defs.slice(i, i + 50);
            const result = await sdk.Mattertag.add(batch);
            if (Array.isArray(result)) sids.push(...result);
          } catch (e) {
            console.log("Marker batch error:", e);
          }
        }
      }

      markerSidsRef.current = sids;
      return sids;
    },
    [sdkRef]
  );

  /* ─── G) Remove markers ─── */
  const removeMarkers = useCallback(async () => {
    const sdk = sdkRef.current;
    const sids = markerSidsRef.current;
    if (!sdk || sids.length === 0) return;
    markerSidsRef.current = [];

    // Remove in batches of 20
    for (let i = 0; i < sids.length; i += 20) {
      try {
        await sdk.Mattertag.remove(sids.slice(i, i + 20));
      } catch {}
    }
  }, [sdkRef]);

  /* ─── E) Auto-walk along path ─── */
  const autoWalk = useCallback(
    async (graph: Map<string, SweepNode>, path: string[]) => {
      const sdk = sdkRef.current;
      if (!sdk || path.length < 2) return;

      // Pre-calculate cumulative distances for progress
      const cumDist: number[] = [0];
      for (let i = 1; i < path.length; i++) {
        const a = graph.get(path[i - 1])!;
        const b = graph.get(path[i])!;
        const dx = b.position.x - a.position.x;
        const dy = b.position.y - a.position.y;
        const dz = b.position.z - a.position.z;
        cumDist.push(cumDist[i - 1] + Math.sqrt(dx * dx + dy * dy + dz * dz));
      }
      const totalDist = cumDist[cumDist.length - 1];

      for (let i = 1; i < path.length; i++) {
        if (cancelledRef.current) break;

        const isFirst = i === 1;
        const isLast = i === path.length - 1;
        const transition =
          isFirst || isLast
            ? sdk.Sweep.Transition?.FLY || "transition.fly"
            : sdk.Sweep.Transition?.INSTANT || "transition.instant";

        try {
          await sdk.Sweep.moveTo(path[i], { transition });
        } catch (e) {
          console.log("Auto-walk sweep error:", e);
        }

        const progress = cumDist[i] / totalDist;
        const remaining = totalDist - cumDist[i];
        setState((s) => ({ ...s, progress, distanceRemaining: Math.round(remaining * 10) / 10 }));
      }
    },
    [sdkRef]
  );

  /* ─── C + F) Start navigation ─── */
  const startNavigation = useCallback(
    async (target: WayfindingTarget, mode: WayfindingMode = "manual") => {
      cancelledRef.current = false;
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }

      // Clean previous markers
      await removeMarkers();

      const sdk = sdkRef.current;
      if (!sdk) return;

      setState({
        isNavigating: true,
        destination: target.label,
        mode,
        progress: 0,
        distanceRemaining: 0,
        arrived: false,
      });

      try {
        // Collect graph
        const graph = await collectSweeps();
        if (graph.size === 0) throw new Error("No sweeps");

        // Resolve start
        let startSid = currentSweepSidRef.current;
        if (!startSid) {
          try {
            const pose = await sdk.Camera.getPose();
            startSid = nearestSweep(graph, pose.position);
          } catch {}
        }
        if (!startSid) {
          startSid = graph.keys().next().value ?? null;
        }
        if (!startSid) throw new Error("No start sweep");

        // Resolve end
        const endSid = nearestSweep(graph, target.position);
        if (!endSid) throw new Error("No end sweep");

        // Compute path
        const path = bfsPath(graph, startSid, endSid);
        if (!path || path.length === 0) throw new Error("No path found");

        // Calculate total distance for initial display
        let totalDist = 0;
        for (let i = 1; i < path.length; i++) {
          const a = graph.get(path[i - 1])!;
          const b = graph.get(path[i])!;
          const dx = b.position.x - a.position.x;
          const dy = b.position.y - a.position.y;
          const dz = b.position.z - a.position.z;
          totalDist += Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        setState((s) => ({ ...s, distanceRemaining: Math.round(totalDist * 10) / 10 }));

        // Place arrows
        await placeMarkers(graph, path);

        if (cancelledRef.current) {
          await removeMarkers();
          return;
        }

        if (mode === "auto") {
          await autoWalk(graph, path);
        }

        if (!cancelledRef.current) {
          setState((s) => ({ ...s, arrived: true, progress: 1, distanceRemaining: 0 }));

          // Remove markers after 3 seconds
          cleanupTimerRef.current = setTimeout(async () => {
            await removeMarkers();
            setState((s) => ({
              ...s,
              isNavigating: false,
              arrived: false,
              progress: 0,
            }));
          }, 3000);
        }
      } catch (err) {
        console.log("Wayfinding error:", err);
        setState((s) => ({ ...s, isNavigating: false }));
      }
    },
    [sdkRef, collectSweeps, bfsPath, nearestSweep, placeMarkers, autoWalk, removeMarkers]
  );

  /* ─── Cancel navigation ─── */
  const cancelNavigation = useCallback(async () => {
    cancelledRef.current = true;
    if (cleanupTimerRef.current) {
      clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = null;
    }
    await removeMarkers();
    setState({
      isNavigating: false,
      destination: "",
      mode: "manual",
      progress: 0,
      distanceRemaining: 0,
      arrived: false,
    });
  }, [removeMarkers]);

  /* ─── Cleanup on unmount ─── */
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);
      // Best-effort remove markers
      const sdk = sdkRef.current;
      const sids = markerSidsRef.current;
      if (sdk && sids.length > 0) {
        for (let i = 0; i < sids.length; i += 20) {
          sdk.Mattertag.remove(sids.slice(i, i + 20)).catch(() => {});
        }
      }
    };
  }, []);

  return {
    ...state,
    startNavigation,
    cancelNavigation,
    collectSweeps,
  };
}
