<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import faqData from '@/data/faq-page.json'

const query = ref('')
const openFaq = ref(-1)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return faqData.items
  return faqData.items.filter(
    (item) =>
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
  )
})

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? -1 : i
}
</script>

<template>
  <header class="container faq-hero">
    <h1 class="section-title">{{ faqData.title }}</h1>
    <p>{{ faqData.subtitle }}</p>
    <div class="faq-search">
      <input v-model="query" type="search" :placeholder="faqData.searchPlaceholder" />
    </div>
  </header>

  <section class="section container">
    <p v-if="filtered.length === 0" class="faq-noresults">{{ faqData.noResults }}</p>
    <div v-else class="faq-list faq-list-full">
      <button
        v-for="(item, i) in filtered"
        :key="i"
        class="faq-item"
        :class="{ open: openFaq === i }"
        @click="toggleFaq(i)"
        :aria-expanded="openFaq === i"
      >
        <span class="faq-q">{{ item.question }}</span>
        <span class="faq-toggle" aria-hidden>{{ openFaq === i ? '−' : '+' }}</span>
        <p v-show="openFaq === i" class="faq-a">{{ item.answer }}</p>
      </button>
    </div>
  </section>

  <section class="cta-warm-wrap">
    <div class="cta-warm">
      <span class="cta-tag">Still have questions?</span>
      <h2>We're ready to <em>help</em></h2>
      <p>Can't find what you're looking for? Our team responds within 24 hours.</p>
      <div class="cta-warm-buttons">
        <RouterLink to="/contact" class="btn-primary">
          Contact our team <span class="arrow">→</span>
        </RouterLink>
        <RouterLink to="/blog" class="btn-secondary">Read the blog</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import '@/styles/service-page.css';

.faq-hero {
  padding: 140px 32px 40px;
  text-align: center;
  max-width: 760px;
}
.faq-hero .tag { margin-bottom: 16px; }
.faq-hero .section-title { margin-bottom: 16px; }
.faq-hero p {
  font-size: 17px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin: 0 auto 28px;
  max-width: 560px;
}
.faq-search input {
  font-family: var(--sans);
  font-size: 16px;
  padding: 16px 24px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-card);
  width: 100%;
  max-width: 480px;
  outline: none;
  transition: border-color 0.2s;
}
.faq-search input:focus { border-color: var(--accent); }

.faq-list-full {
  max-width: 820px;
  margin: 0 auto;
}
.faq-noresults {
  text-align: center;
  color: var(--ink-soft);
  padding: 48px 0;
}

@media (max-width: 640px) {
  .faq-hero { padding-top: 110px; }
}
</style>
