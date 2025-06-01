import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo/gp_512.png", "logo/**"],
      manifest: {
        name: "GoalPocket: Perencana dan Analisis Keuangan",
        short_name: "GoalPocket",
        description: "Aplikasi berbasis web untuk mencatat transaksi keuangan, memvisualisasikan data, dan memprediksi tabungan secara cerdas.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0f172a",
        icons: [
          {
            src: "/logo/gp_512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
