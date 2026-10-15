import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves under /ebrahim-adel-portfolio/
  base: process.env.GITHUB_PAGES === 'true' ? '/ebrahim-adel-portfolio/' : '/',
})
