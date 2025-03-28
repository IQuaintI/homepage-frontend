import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Ensure compatibility with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // Load environment variables correctly
  const env = loadEnv(mode, __dirname);

  return {
    plugins: [react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // 🔥 Alias added here
      },
    },

    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "https://your-secure-api.com",
          changeOrigin: true,
          secure: true,
        },
      },
    },

    build: {
      sourcemap: mode !== "production",
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
    },

    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL || "https://your-secure-api.com"),
    },

    envDir: __dirname,
  };
});