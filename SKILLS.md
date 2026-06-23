# Jackson & Frank — Design Scheme (jf-vue)

This is the single source of truth for how pages in `jf-vue` look and behave.
Follow it for **every new page or component** so the site stays consistent.
The aesthetic is the "Halden Miller" editorial style — **cream canvas, serif
display headings with italic accents, navy as the brand accent, warm sunset
gradient for high-energy CTAs**. Clean, calm, premium. Not corporate-generic.

> Reference note: competitor sites (e.g. TopSource) are cleaner/more corporate,
> but we **do not copy** them. Our identity is the warm editorial serif look.
> When in doubt, prefer restraint, whitespace, and typographic hierarchy.

---

## 1. Design tokens (source: `src/styles/global.css` `:root`)

### Colors
| Token | Value | Use |
|---|---|---|
| `--bg` | `#f4f1ec` | Page background (cream) |
| `--bg-card` | `#ffffff` | Cards, panels |
| `--ink` | `#1a1a1a` | Primary text, dark sections |
| `--ink-soft` | `#4a4a4a` | Body copy |
| `--ink-muted` | `#8a8680` | Eyebrows, captions, meta |
| `--accent` | `#143369` | **JF navy** — primary accent, links, italic heading accents |
| `--accent-soft` | `#e6e8f0` | Tints, icon chips, image placeholders |
| `--accent-warm` | `#d4b896` | Warm highlight on **dark** backgrounds (NOT on cream) |
| `--dark` | `#161616` | Dark sections (stats strip, CTA block, footer) |
| `--dark-soft` | `#2a2a2a` | Cards inside dark sections |
| `--border` | `#e2ddd4` | All hairline borders |

**Rules**
- Italic heading accents (`em`) are **navy** (`--accent`) on light backgrounds,
  **warm** (`--accent-warm`) on dark backgrounds.
- The warm sunset gradient is reserved for the **bottom CTA** and "explore" cards:
  `linear-gradient(135deg, #f4a467 0%, #e87a4d 30%, #d35d4d 65%, #c25c8b 100%)`
- Never put `--accent-warm` text on the cream background (low contrast).

### Radius & shape
| Token | Value | Use |
|---|---|---|
| `--radius` | `14px` | Cards, inputs, chips |
| `--radius-lg` | `22px` | Large panels, hero visuals, CTA blocks |
| pills/buttons | `999px` | All buttons and tag pills |

---

## 2. Typography

- **Display / headings:** `--serif` = **Instrument Serif** (400 + italic). Always
  `font-weight: 400` — never bold the serif. Use *italic* for the accent word only.
- **Body / UI:** `--sans` = **Inter** (400/500/600/700).
- Loaded once in `index.html`. Never import other font families.

### Type scale (use these, don't invent sizes)
| Element | Style |
|---|---|
| Hero H1 | `var(--serif)` · `clamp(44px, 5.8vw, 84px)` · line-height 1 · `letter-spacing: -0.025em` |
| Section title (`.section-title`) | `var(--serif)` · `clamp(36px, 4.5vw, 56px)` · line-height 1.05 |
| Card/sub heading | `var(--serif)` · 20–28px · weight 400 |
| Eyebrow (`.tag`) | `var(--sans)` · 11px · `letter-spacing: 0.15–0.18em` · uppercase · `--ink-muted` |
| Lead paragraph | `var(--sans)` · 17px · `--ink-soft` · line-height 1.6 |
| Body | `var(--sans)` · 14–16px · `--ink-soft` · line-height 1.6–1.7 |
| Meta/caption | `var(--sans)` · 11–13px · `--ink-muted` |

### Heading accent pattern (signature)
```html
<h2 class="section-title">When the stakes rise, the right partner matters <em>most</em></h2>
```
One italic accent word per heading — no more. Keep it meaningful.

---

## 3. Reusable building blocks

### Buttons (`global.css`)
- `.btn-primary` — ink fill, cream text → navy on hover. Primary action.
- `.btn-secondary` — outline, ink border → fills ink on hover. Secondary action.
- Always pill-shaped. Arrow uses `<span class="arrow">→</span>` (animates on hover).
- On dark/warm backgrounds, invert: white fill + ink text.

### Eyebrow + title + lead (standard section header)
```html
<div class="section-head">
  <span class="tag">Section label</span>
  <h2 class="section-title">Heading with an <em>accent</em></h2>
  <p class="section-lead">Optional supporting sentence.</p>
</div>
```

### Shared service-page styles: `src/styles/service-page.css`
Import in any page that needs the standard sections:
```html
<style scoped>
@import '@/styles/service-page.css';
/* page-specific overrides below */
</style>
```
Provides: `.service-hero`, `.stats-strip`, `.how-grid` / `.how-card`,
`.included-grid`, `.comparison-card`, `.faq-block` / `.faq-item`,
`.cta-warm`, `.definition-block`, `.section-head`, `.section-lead`.

### Lead-capture modal: `src/components/ui/LeadModal.vue`
Reusable dialog that posts to the real contact API. Use it anywhere a CTA
should open a form instead of navigating (e.g. blog CTAs).
```html
<button class="btn-primary" @click="modalOpen = true">Get expert help</button>
<LeadModal :open="modalOpen" title="…" subtitle="…" reason="general_inquiry"
           @close="modalOpen = false" />
```
- Teleports to `<body>`, locks scroll, closes on overlay click / Esc, shows a
  success state. Grid fields MUST keep `min-width: 0` so they never overflow the
  modal (caused a horizontal scrollbar before — don't remove it).

### Marquee (logo / country strip)
Infinite horizontal loop = two identical `.marquee-track`s side by side, both
animating `translateX(0 → -100%)`. Edge fade via CSS `mask-image`, pause on
hover, and `prefers-reduced-motion` falls back to a scrollable row. See the
brand strip in `HomePage.vue`.

---

## 4. Canonical page skeleton

Every content page follows this vertical rhythm:

1. **Hero** — `.service-hero` (split: copy left, image-with-badge right) OR a
   centered hero for list/utility pages. Eyebrow → serif H1 (with italic accent)
   → lead → feature bullets → primary + secondary CTA.
2. **Dark stats strip** — `.stats-strip` on `--ink`, 4 stats, serif numbers in
   `--accent-warm`.
3. **Body sections** — alternate cream and `--bg-card`/`--ink` backgrounds for
   rhythm. Cards use `--bg-card` + `--border` + `--radius`.
4. **FAQ** — `.faq-block` two-column (label left, accordion right).
5. **Warm CTA** — `.cta-warm` full-bleed sunset gradient, centered, white text,
   white primary button.

Section vertical padding: `.section { padding: 100px 0; }` (60px on mobile).

---

## 5. Section background rhythm

Alternate to create depth (never two identical adjacent backgrounds):
`cream (--bg)` → `white card strip (--bg-card)` → `cream` → `dark (--ink)` →
`cream` → `warm gradient CTA`. The dark stats strip and dark feature sections
break up long cream stretches.

---

## 6. Motion

- Hover lifts: `transform: translateY(-2px to -4px)`, `transition: 0.2–0.3s`.
- Image zoom on card hover: `scale(1.04)`, `transition: 0.5–0.6s`.
- Arrow nudge: `translateX(3–4px)` on hover.
- Global fade-in-on-scroll: add class `fade-in` (App.vue IntersectionObserver
  toggles `.visible`).
- All motion is disabled under `prefers-reduced-motion` (handled globally).

---

## 7. Data & content

- Page content lives in `src/data/*.json` (copied from the Next.js site — same shape).
- **Services** read their own JSON (`eor.json`, `payroll.json`, …).
- **Country pages** are ONE template (`CountryPage.vue`) driven by
  `src/data/country-config.ts` (route → name/type/image/flag/dataKey).
- **Blog** is live from the CMS API via `src/services/blog.ts`
  (`/api/v1/dynamic-page`), **merged with manual posts** from
  `src/data/manual-blog-posts.ts` (hardcoded long-form articles whose HTML lives
  in the `*-blog.content.ts` files). `fetchAllBlogs` merges both; `fetchBlogBySlug`
  checks manual first. If the API is down, manual posts still render.
- **Forms** post to the real API via `src/services/contact.ts`
  (`/api/v1/contact-us`, `/api/v1/newsletter/*`).

### Rendering CMS blog HTML (BlogDetailPage)
CMS bodies are raw HTML rendered with `v-html` inside `.blog-content`. Before
rendering, the pipeline (in order) does:
1. `ensureImageAlt` — adds missing `alt`.
2. `applyStatCorrections` — fixes legacy stat phrasing.
3. `demoteBodyH1s` — `<h1>` → `<h2>` so the page has one H1 (the title).
4. Replace `<!--BLOG_TOC_INSERT-->` with a styled `.blog-toc` built from
   `blog.toc_html` (or strip the marker if no TOC). TOC anchors (`#id`) jump to
   section ids; `scroll-padding-top` (global) clears the navbar.
5. Wrap every `<table>` in `.blog-table-wrap` (overflow-x: auto) so wide tables
   scroll instead of squashing. Tables get `min-width: 880px` so columns stay
   readable; dark header row, zebra rows, cell borders.

CMS authors use `<details class="country-accordion info|warning">` for toggles.
Style them as cards: `summary { display:block }` (kills the native triangle),
a custom **+ / −** indicator, the inner `<h3>` rendered inline, warm tint for
`.warning`. All these live in `BlogDetailPage.vue`'s scoped `:deep(...)` rules.

### Canonical company numbers (keep consistent everywhere)
- **1,000+** companies · **2,000+** employees hired for clients
- **12+** countries with local offices · **50+** years combined HR expertise
- **160+** countries in the partner network
- **Two founders:** Maarten Koekebakker (Partner) & Pawel Michalkiewicz
  (Managing Partner). Always show **both** when featuring leadership.

---

## 8. Images

- Live under `public/` mirroring the Next.js paths:
  `services/service-page/*`, `countries/*` (`eor-*`, `contractor-*`, `flag/*`),
  `leadership/*`, `testimonials/*`, `case-study/*`, `speakers/*`, `blog-images/*`.
- Country hero slugs differ from route slugs (UK→`uk`, Italy→`Italy`,
  Czech→`czech`/`czec-republic`) — resolved in `country-config.ts`. Don't guess.
- Use `loading="lazy"` on below-the-fold images.
- Image wrappers get a `--accent-soft` background so a missing/slow image never
  shows a raw broken box.

---

## 9. Layout & responsive

- `.container` = `max-width: 1240px`, `padding: 0 32px` (20px on mobile).
- Breakpoints: **1024px** (collapse multi-col grids to 1–2 col) and **640px**
  (single column, reduce hero top padding to ~100–110px to clear the navbar).
- The navbar is fixed; pages start with ~120–140px top padding on the hero.

---

## 10. Accessibility (baked into global.css — keep it)

- `:focus-visible` shows a navy outline. Don't remove it.
- Brand `::selection` color.
- `prefers-reduced-motion` kills animations/scroll-smooth.
- Always set real `alt` text. Decorative marks use `aria-hidden`.
- FAQ accordions are `<button>` with `:aria-expanded`.

---

## 11. Do / Don't

**Do**
- Reuse `service-page.css` classes before writing new CSS.
- One italic serif accent per heading.
- Alternate section backgrounds for rhythm.
- Keep the warm gradient for the bottom CTA only.
- Show both founders together.

**Don't**
- Bold the serif font (always weight 400).
- Use `--accent-warm` text on the cream background.
- Introduce new fonts, new radii, or off-palette colors.
- Copy competitor layouts — adapt content into our system.
- Hardcode stale stats (use the canonical numbers in §7).
