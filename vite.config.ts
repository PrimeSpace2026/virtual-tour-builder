import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiProxyTarget = env.VITE_API_PROXY_TARGET || "http://localhost:8082";  
  return {
    appType: "spa",
    server: {
      host: "::",
      port: 8082,
      hmr: { overlay: false },
      headers: { "Permissions-Policy": "xr-spatial-tracking=*, fullscreen=*" },
      proxy: {
        "/api": { target: apiProxyTarget, changeOrigin: true },
        "/uploads": { target: apiProxyTarget, changeOrigin: true },
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
      dedupe: ["react", "react-dom", "react/jsx-runtime"],
    },
  };
});