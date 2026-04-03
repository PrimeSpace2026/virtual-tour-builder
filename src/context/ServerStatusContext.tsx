import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ServerStatusContextType {
  isServerAwake: boolean;
  elapsedSeconds: number;
}

const ServerStatusContext = createContext<ServerStatusContextType>({
  isServerAwake: false,
  elapsedSeconds: 0,
});

export const useServerStatus = () => useContext(ServerStatusContext);

const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
const WAKE_URL = API_BASE ? `${API_BASE}/api/wake` : "/api/wake";
const PING_INTERVAL_MS = 4000;
const PING_TIMEOUT_MS = 5000;
const SHOULD_BYPASS_GATE =
  import.meta.env.DEV && import.meta.env.VITE_ENABLE_SERVER_GATE !== "true";

export function ServerStatusProvider({ children }: { children: ReactNode }) {
  const [isServerAwake, setIsServerAwake] = useState(SHOULD_BYPASS_GATE);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const startTime = useRef(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ping = useCallback(async (): Promise<boolean> => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), PING_TIMEOUT_MS);

    try {
      const res = await fetch(WAKE_URL, {
        method: "GET",
        signal: controller.signal,
        cache: "no-store",
      });
      window.clearTimeout(timeout);
      return res.ok;
    } catch {
      window.clearTimeout(timeout);
      return false;
    }
  }, []);

  useEffect(() => {
    if (SHOULD_BYPASS_GATE) {
      setIsServerAwake(true);
      setElapsedSeconds(0);
      return;
    }

    let cancelled = false;

    timerRef.current = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime.current) / 1000));
    }, 1000);

    void (async () => {
      const ok = await ping();
      if (!cancelled && ok) {
        setIsServerAwake(true);
        return;
      }

      intervalRef.current = window.setInterval(async () => {
        const ready = await ping();
        if (ready && !cancelled) {
          setIsServerAwake(true);
        }
      }, PING_INTERVAL_MS);
    })();

    return () => {
      cancelled = true;
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [ping]);

  useEffect(() => {
    if (isServerAwake) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timerRef.current) window.clearInterval(timerRef.current);
    }
  }, [isServerAwake]);

  return (
    <ServerStatusContext.Provider value={{ isServerAwake, elapsedSeconds }}>
      {children}
    </ServerStatusContext.Provider>
  );
}
