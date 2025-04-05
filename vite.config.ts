import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [(react as any)(), tailwindcss()],
  server: {
    proxy: {
      "/ws": {
        target: "http://localhost:8000",
        ws: true,
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});