import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const authServiceUrl = env.AUTH_SERVICE_URL || "http://localhost:8001";

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        "/lp": {
          target: authServiceUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/lp/, ""),
        },
      },
    },
  };
});
