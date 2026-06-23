import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
    // Forward `/api/*` to the live Jackson & Frank CMS so we avoid CORS in dev.
    // Production deployment should set VITE_API_BASE_URL to the appropriate origin.
    proxy: {
      '/api': {
        target: 'https://jacksonandfrank.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
