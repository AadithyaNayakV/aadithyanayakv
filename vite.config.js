import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The WebGL stack is split out by the lazy import of Scene.jsx rather than by a
// manual chunk rule.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
