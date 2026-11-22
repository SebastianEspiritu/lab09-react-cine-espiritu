import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Fixed port: it is the origin the Django API allows through CORS.
  server: { port: 5173, strictPort: true },
})
