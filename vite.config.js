// vite.config.js
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/content.js"),
      name: "VolleySkipPlus",
      formats: ["iife"],
      fileName: () => "content.js"
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        intro: "(() => {",
        outro: "})();"
      }
    }
  },
  publicDir: false
});