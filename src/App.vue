<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'

const router = useRouter()

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

// Global fade-in on scroll
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
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
