import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Runs on a dedicated port so it can be served alongside the main
  // Enviraan app (which uses 5173) during local development.
  server: { port: 5174 },
  preview: { port: 5174 },
})
