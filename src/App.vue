<script setup lang="ts">
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useHead } from '@unhead/vue'
import { useRouter, useRoute } from 'vue-router'
import Lenis from 'lenis'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'

const router = useRouter()
const route = useRoute()

// Global metadata and SEO
useHead({
  titleTemplate: '%s - Jackson & Frank',
  htmlAttrs: { lang: 'en' },
  meta: [
    { name: 'description', content: 'Jackson & Frank — Hire talent, anywhere. International payroll and employment compliance.' },
    { property: 'og:title', content: 'Jackson & Frank' },
    { property: 'og:description', content: 'Hire talent anywhere. Employer of record, international payroll, and compliance.' },
    { property: 'og:image', content: 'https://jacksonandfrank.com/og-image.jpg' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'canonical', href: () => `https://jacksonandfrank.com${router.currentRoute.value.path}` }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Jackson & Frank",
        "url": "https://jacksonandfrank.com",
        "logo": "https://jacksonandfrank.com/logo.png",
        "description": "Global expansion and employer of record services."
      })
    }
  ]
})

// Smooth Scrolling with Lenis
let lenis: Lenis | null = null

const initLenis = () => {
  lenis = new Lenis({
    autoRaf: true,
  })
}

// Global fade-in on scroll
const initObserver = () => {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.fade-in:not(.visible)').forEach((el) => observer.observe(el))
}

onMounted(() => {
  initLenis()
  initObserver()
})

onUnmounted(() => {
  if (lenis) {
    lenis.destroy()
  }
})

watch(() => route.path, async () => {
  await nextTick()
  initObserver()
  // Reset scroll to top instantly on route change
  if (lenis) {
    lenis.scrollTo(0, { immediate: true })
  } else {
    window.scrollTo(0, 0)
  }
})
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
  </main>
  <Footer />
  <ScrollToTop />
</template>
