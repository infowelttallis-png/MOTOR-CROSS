import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ["acne-vector-cinema-consortium.trycloudflare.com"],
  },
  build: {
    // Esbuild is significantly faster than terser
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Manual chunking: Splits large libraries into a 'vendor' file
        // for better browser caching and instant loading
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "styled-components",
            "react-bootstrap",
          ],
        },
      },
    },
    // Reduces the size of the final build
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
  },
});
