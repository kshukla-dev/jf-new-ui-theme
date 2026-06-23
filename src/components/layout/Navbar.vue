<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import navigation from '@/data/navigation.json'
// import { fetchServiceNavigation } from '@/services/navigation'

type DropdownKey = 'services' | 'about' | 'insights' | null

const openDropdown = ref<DropdownKey>(null)

function toggleTheme() {
  const root = document.documentElement
  if (root.getAttribute('data-theme') === 'dark') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', 'dark')
  }
}
const mobileOpen = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | null = null

watch(mobileOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

function toggle(key: Exclude<DropdownKey, null>) {
  openDropdown.value = openDropdown.value === key ? null : key
}

function openHover(key: Exclude<DropdownKey, null>) {
  if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
  openDropdown.value = key
}

function scheduleClose() {
  closeTimer = setTimeout(() => {
    openDropdown.value = null
    closeTimer = null
  }, 120)
}

function cancelClose() {
  if (closeTimer) { clearTimeout(closeTimer); closeTimer = null }
}

function close() {
  openDropdown.value = null
}

// Close on outside click
function handleOutside(e: MouseEvent) {
  const t = e.target as HTMLElement
  if (!t.closest('.nav-dropdown') && !t.closest('.nav-trigger') && !t.closest('.dropdown-wrap')) close()
}

// Close on Escape
function handleKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleOutside)
  document.removeEventListener('keydown', handleKey)
})

const services = ref(navigation.navbar.services.items)
const about = navigation.navbar.about.items
const insights = navigation.navbar.insights.items

// Featured preview tile per dropdown (matches the Halden Miller "Visit BYQ.supply" pattern)
type Preview = {
  eyebrow: string
  title: string
  blurb: string
  image: string
  href: string
  cta: string
}

const previewMap = ref<Record<Exclude<DropdownKey, null>, Preview>>({
  services: {
    eyebrow: 'Featured service',
    title: 'Employer of record',
    blurb: 'Hire across 160+ countries - without setting up a local entity.',
    image: '/services/service-page/eor.webp',
    href: '/employer-of-record',
    cta: 'Explore EOR',
  },
  about: {
    eyebrow: 'Our story',
    title: '50+ years, 160+ countries',
    blurb: 'From the Netherlands to every continent - the team behind 700+ global hires.',
    image: '/services/service-page/advantags.webp',
    href: '/about-us',
    cta: 'Meet the team',
  },
  insights: {
    eyebrow: 'Latest insight',
    title: 'Hiring your first European employee',
    blurb: 'Real all-in employer costs in 13 European countries for 2026.',
    image: '/blog-images/hiring-european-employee.webp',
    href: '/blog/hiring-your-first-european-employee',
    cta: 'Read the guide',
  },
})

onMounted(async () => {
  document.addEventListener('mousedown', handleOutside)
  document.addEventListener('keydown', handleKey)
  
  // Fetch dynamic service navigation from Sanity
  // const sanityNav = await fetchServiceNavigation()
  // if (sanityNav) {
  //   if (sanityNav.items && sanityNav.items.length > 0) {
  //     services.value = sanityNav.items
  //   }
  //   if (sanityNav.featuredPreview) {
  //     previewMap.value.services = sanityNav.featuredPreview
  //   }
  // }
})

const currentPreview = computed(() =>
  openDropdown.value ? previewMap.value[openDropdown.value] : null
)
</script>

<template>
  <nav>
    <div class="container nav-inner">
      <!-- Logo (left) -->
      <RouterLink to="/" class="logo" @click="close">
        <img src="/logo-dark.svg" alt="Jackson & Frank" class="logo-img" />
      </RouterLink>

      <!-- Center nav -->
      <div class="nav-links">
        <button
          class="nav-trigger"
          :class="{ active: openDropdown === 'services' }"
          @click="toggle('services')"
          @mouseenter="openHover('services')"
          @mouseleave="scheduleClose"
          aria-haspopup="true"
          :aria-expanded="openDropdown === 'services'"
        >
          Solutions
        </button>

        <button
          class="nav-trigger"
          :class="{ active: openDropdown === 'insights' }"
          @click="toggle('insights')"
          @mouseenter="openHover('insights')"
          @mouseleave="scheduleClose"
          aria-haspopup="true"
          :aria-expanded="openDropdown === 'insights'"
        >
          Resources
        </button>

        <button
          class="nav-trigger"
          :class="{ active: openDropdown === 'about' }"
          @click="toggle('about')"
          @mouseenter="openHover('about')"
          @mouseleave="scheduleClose"
          aria-haspopup="true"
          :aria-expanded="openDropdown === 'about'"
        >
          About Us
        </button>

        <RouterLink to="/contact" class="nav-trigger" @click="close">
          Contact
        </RouterLink>
      </div>

      <!-- Right CTA -->
      <div class="nav-right">
        <!-- <button @click="toggleTheme" class="theme-toggle" aria-label="Toggle Theme" title="Switch Theme">
          <Palette :size="20" />
        </button> -->
        <RouterLink to="/contact" class="btn-consultation" @click="close">
          Book a consultation
        </RouterLink>
        <button class="mobile-toggle" @click="mobileOpen = true" aria-label="Open menu" aria-haspopup="true" :aria-expanded="mobileOpen">
          <Menu :size="28" />
        </button>
      </div>
    </div>

    <!-- Full-width dropdown panel (positioned below the nav, spans the container) -->
    <Transition name="dropdown">
      <div v-if="openDropdown" class="dropdown-wrap" @mouseenter="cancelClose" @mouseleave="scheduleClose">
        <div class="container">
          <div class="nav-dropdown">
            <!-- Left: items grid -->
            <div class="dropdown-items">
              <span class="dropdown-eyebrow">
                {{
                  openDropdown === 'services'
                    ? 'What we do'
                    : openDropdown === 'about'
                    ? 'Who we are'
                    : 'Insights & tools'
                }}
              </span>

              <div class="dropdown-grid">
                <template v-if="openDropdown === 'services'">
                  <RouterLink
                    v-for="item in services"
                    :key="item.title"
                    :to="item.href"
                    class="dropdown-item"
                    @click="close"
                  >
                    <strong>{{ item.title }}</strong>
                    <span>{{ item.description }}</span>
                  </RouterLink>
                </template>
                <template v-else-if="openDropdown === 'about'">
                  <RouterLink
                    v-for="item in about"
                    :key="item.title"
                    :to="item.href"
                    class="dropdown-item"
                    @click="close"
                  >
                    <strong>{{ item.title }}</strong>
                    <span>{{ item.description }}</span>
                  </RouterLink>
                </template>
                <template v-else>
                  <RouterLink
                    v-for="item in insights"
                    :key="item.title"
                    :to="item.href"
                    class="dropdown-item"
                    @click="close"
                  >
                    <strong>{{ item.title }}</strong>
                    <span>{{ item.description }}</span>
                  </RouterLink>
                </template>
              </div>
            </div>

            <!-- Right: featured preview tile -->
            <div v-if="currentPreview" class="dropdown-preview">
              <div
                class="dropdown-preview-img"
                :style="{ backgroundImage: `url('${currentPreview.image}')` }"
              />
              <span class="dropdown-preview-eyebrow">{{ currentPreview.eyebrow }}</span>
              <h4>{{ currentPreview.title }}</h4>
              <p>{{ currentPreview.blurb }}</p>
              <RouterLink
                :to="currentPreview.href"
                class="dropdown-preview-cta"
                @click="close"
              >
                {{ currentPreview.cta }} <span aria-hidden>→</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile drawer -->
    <Teleport to="body">
      <Transition name="mobile">
        <div v-if="mobileOpen">
          <div class="mobile-overlay" @click="mobileOpen = false" aria-hidden="true"></div>
          <div class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
            <button class="mobile-close" @click="mobileOpen = false" aria-label="Close menu">
              <X :size="32" />
            </button>
            <div class="mobile-section">
              <span class="dropdown-eyebrow">Solutions</span>
              <RouterLink
                v-for="item in services"
                :key="item.title"
                :to="item.href"
                @click="mobileOpen = false"
              >
                {{ item.title }}
              </RouterLink>
            </div>
            <div class="mobile-section">
              <span class="dropdown-eyebrow">Resources</span>
              <RouterLink
                v-for="item in insights"
                :key="item.title"
                :to="item.href"
                @click="mobileOpen = false"
              >
                {{ item.title }}
              </RouterLink>
            </div>
            <div class="mobile-section">
              <span class="dropdown-eyebrow">About Us</span>
              <RouterLink
                v-for="item in about"
                :key="item.title"
                :to="item.href"
                @click="mobileOpen = false"
              >
                {{ item.title }}
              </RouterLink>
            </div>
            <div class="mobile-section">
              <RouterLink to="/contact" @click="mobileOpen = false" style="font-weight: 700; border-bottom: none;">
                Contact Us
              </RouterLink>
            </div>
            <RouterLink to="/contact" class="btn-consultation mobile-cta" @click="mobileOpen = false">
              Book a consultation
            </RouterLink>
          </div>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>

<style scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  background: var(--header-bg);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding-top: 18px;
  padding-bottom: 18px;
  gap: 24px;
}
.logo {
  font-family: 'DM Serif Display', var(--serif);
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--ink);
  text-decoration: none;
  justify-self: start;
  display: flex;
  align-items: center;
}
.logo-img {
  height: 38px;
  width: auto;
  display: block;
  transition: height 0.2s ease;
}
.logo em {
  font-style: italic;
  color: var(--accent);
}
.nav-links {
  display: flex;
  gap: 28px;
  align-items: center;
  justify-self: center;
}
.nav-trigger {
  display: inline-flex;
  align-items: center;
  color: var(--ink);
  font-size: 16px;
  font-weight: 600;
  padding: 8px 0;
  transition: color 0.2s;
  font-family: var(--sans);
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
.nav-trigger:hover,
.nav-trigger.active {
  color: #09407B;
}
.theme-toggle {
  background: transparent;
  border: none;
  color: var(--ink);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
}
.theme-toggle:hover {
  background: var(--border);
}

.btn-consultation {
  background: #F7931E;
  color: #ffffff !important;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  font-family: var(--sans);
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(247, 147, 30, 0.3);
}
.btn-consultation:hover {
  background: #e07d10;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(247, 147, 30, 0.45);
}

/* ============================================================
   FULL-WIDTH DROPDOWN PANEL
   ============================================================ */
.dropdown-wrap {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 60;
  padding-top: 12px;
  padding-bottom: 16px;
  background: var(--bg);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.12);
}
.nav-dropdown {
  background: transparent;
  padding: 36px 40px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 48px;
}
.dropdown-eyebrow {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 18px;
}
.dropdown-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 24px;
}
.dropdown-item {
  display: block;
  padding: 14px 16px;
  border-radius: 12px;
  transition: background 0.18s ease, transform 0.18s ease;
  text-decoration: none;
}
.dropdown-item:hover {
  background: var(--accent-soft);
  transform: translateX(2px);
}
.dropdown-item strong {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 4px;
  font-family: var(--sans);
}
.dropdown-item span {
  display: block;
  font-size: 12.5px;
  color: var(--ink-muted);
  line-height: 1.5;
}

/* Featured preview tile on the right */
.dropdown-preview {
  position: relative;
  padding: 24px;
  border-radius: var(--radius);
  background: var(--bg);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 10px;
  isolation: isolate;
}
.dropdown-preview-img {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  margin-bottom: 4px;
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.18);
}
.dropdown-preview-eyebrow {
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.dropdown-preview h4 {
  font-family: var(--serif);
  font-size: 22px;
  line-height: 1.2;
  font-weight: 400;
  color: var(--ink);
}
.dropdown-preview p {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.5;
}
.dropdown-preview-cta {
  margin-top: auto;
  align-self: flex-start;
  background: var(--ink);
  color: var(--bg);
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s, transform 0.2s, gap 0.2s;
}
.dropdown-preview-cta:hover {
  background: var(--accent);
  transform: translateY(-1px);
  gap: 10px;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ============================================================
   RIGHT-SIDE CTA + MOBILE
   ============================================================ */
.nav-right {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-self: end;
}
.mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--ink);
  padding: 6px;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
}
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(14, 15, 59, 0.4);
  backdrop-filter: blur(4px);
  z-index: 190;
}
.mobile-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 85%;
  max-width: 400px;
  background: var(--bg);
  z-index: 200;
  padding: 80px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow-y: auto;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
}
.mobile-close {
  position: absolute;
  top: 18px;
  right: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--ink);
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 210;
}
.mobile-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mobile-section a {
  font-size: 16px;
  color: var(--ink);
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
}
.mobile-cta {
  align-self: flex-start;
  margin-top: 12px;
}
.mobile-enter-active,
.mobile-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-enter-active .mobile-drawer,
.mobile-leave-active .mobile-drawer {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-enter-from,
.mobile-leave-to {
  opacity: 0;
}
.mobile-enter-from .mobile-drawer,
.mobile-leave-to .mobile-drawer {
  transform: translateX(100%);
}

@media (max-width: 1024px) {
  .nav-dropdown {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .dropdown-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }
  .mobile-toggle {
    display: inline-flex;
  }
  .nav-inner {
    grid-template-columns: 1fr auto;
  }
  .btn-consultation {
    display: none;
  }
  .dropdown-wrap {
    display: none;
  }
}
@media (max-width: 768px) {
  .logo {
    font-size: 24px;
    white-space: nowrap;
  }
  .logo-img {
    height: 30px;
  }
}
</style>
