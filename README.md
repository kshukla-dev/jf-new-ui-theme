# jf-vue

Vue 3 + Vite clone of the Jackson & Frank website, based on the Halden Miller homepage template aesthetic with JF content.

This project is a sibling of `jf_website_2.0/` and does NOT touch the Next.js source. JF data (navigation, testimonials, advantages, etc.) is copied into `src/data/` as static JSON.

## Stack
- Vue 3 (Composition API, `<script setup lang="ts">`)
- Vite
- TypeScript
- Vue Router (file-based-ish routing in `src/router/`)

## Fonts
- Instrument Serif (headings, italic accents)
- Inter (UI / body)

## Scripts
```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Status
Homepage + nav with dropdowns + footer + route stubs for every JF page. Pages get fleshed out iteratively.
"# jf-new-ui-theme" 
