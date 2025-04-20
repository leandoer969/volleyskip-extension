// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: 'src/content.js',
      name: 'VolleySkip',
      formats: ['iife'],
      fileName: () => 'content.js'
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        intro: '(() => {',
        outro: '})();'
      }
    }
  },
  publicDir: false 
});