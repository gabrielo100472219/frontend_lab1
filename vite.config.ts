import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// Web de varias páginas: la landing, el panel (D5) y el "después" del desafío D6.
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        panel: fileURLToPath(new URL("./panel.html", import.meta.url)),
        d6: fileURLToPath(new URL("./d6/despues.html", import.meta.url)),
      },
    },
  },
});
