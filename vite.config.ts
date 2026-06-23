import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Sitemap({
      hostname: 'https://jacksonandfrank.com',
      dynamicRoutes: [
        '/blog/international-business-expansion-costs-vs-savings',
        '/blog/what-is-employer-of-record-eor',
        '/blog/what-is-payroll-outsourcing',
        '/case-studies/fintech-europe-expansion',
        '/case-studies/saas-global-remote-team'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    dirStyle: 'nested'
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'https://jacksonandfrank.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
