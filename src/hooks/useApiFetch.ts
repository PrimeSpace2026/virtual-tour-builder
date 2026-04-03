import { useServerStatus } from "@/context/ServerStatusContext";

const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export function useApiFetch() {
  const { isServerAwake } = useServerStatus();

  async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
    if (!isServerAwake) {
      throw new Error(
        "Server is not awake yet. Wrap your app in <ServerGate> to prevent premature API calls."
      );
    }

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const url = API_BASE ? `${API_BASE}${normalizedPath}` : normalizedPath;
    return fetch(url, init);
  }

  return { apiFetch, isServerAwake };
}
