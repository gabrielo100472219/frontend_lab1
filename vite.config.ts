import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// Web de dos páginas: la landing y el panel (D5).
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        panel: fileURLToPath(new URL("./panel.html", import.meta.url)),
      },
    },
  },
});
