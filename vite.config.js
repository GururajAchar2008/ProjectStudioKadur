import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  // Repository project page is served from /ProjectStudio/ on GitHub Pages.
  base: "/ProjectStudio/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        cseprojects: resolve(rootDir, "cse-projects/index.html"),
        smallworks: resolve(rootDir, "smallworks/index.html"),
        professionalprojects: resolve(
          rootDir,
          "professional-projects/index.html",
        ),
        thankyou: resolve(rootDir, "thankyou/index.html"),
      },
    },
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
});
