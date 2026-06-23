<script setup lang="ts">
import privacy from '@/data/privacy-policy.json'

// content can be a string or string[]; list/subContent are optional.
type Section = {
  title: string
  subtitle?: string
  content?: string | string[]
  subContent?: string
  list?: string[]
}
const sections = privacy.sections as Section[]
function asArray(c?: string | string[]): string[] {
  if (!c) return []
  return Array.isArray(c) ? c : [c]
}
</script>

<template>
  <header class="container legal-hero">
    <h1 class="section-title">{{ privacy.hero.title }}</h1>
    <p>{{ privacy.hero.description }}</p>
  </header>

  <section class="container legal-body">
    <div v-for="(s, i) in sections" :key="i" class="legal-section">
      <span v-if="s.subtitle" class="tag">{{ s.subtitle }}</span>
      <h2>{{ s.title }}</h2>
      <p v-for="(p, j) in asArray(s.content)" :key="j">{{ p }}</p>
      <p v-if="s.subContent" class="legal-subcontent">{{ s.subContent }}</p>
      <ul v-if="s.list">
        <li v-for="item in s.list" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div v-if="privacy.contact" class="legal-contact">
      <h2>Contact</h2>
      <p>{{ typeof privacy.contact === 'string' ? privacy.contact : (privacy.contact as any).content ?? '' }}</p>
    </div>
  </section>
</template>

<style scoped>
@import '@/styles/service-page.css';

.legal-hero {
  padding: 140px 32px 40px;
  text-align: center;
  max-width: 760px;
}
.legal-hero .tag { margin-bottom: 16px; }
.legal-hero .section-title { margin-bottom: 16px; }
.legal-hero p { font-size: 17px; color: var(--ink-soft); max-width: 540px; margin: 0 auto; }

.legal-body {
  max-width: 760px;
  margin: 0 auto;
  padding: 40px 32px 100px;
}
.legal-section { margin-bottom: 48px; }
.legal-section .tag { margin-bottom: 10px; }
.legal-section h2 {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 16px;
  color: var(--ink);
}
.legal-section p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.7;
  margin-bottom: 14px;
}
.legal-subcontent { font-weight: 500; color: var(--ink); }
.legal-section ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}
.legal-section li {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.6;
  padding-left: 22px;
  position: relative;
}
.legal-section li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--accent);
}
.legal-contact {
  border-top: 1px solid var(--border);
  padding-top: 32px;
}
.legal-contact h2 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 12px;
}
.legal-contact p { font-size: 15px; color: var(--ink-soft); line-height: 1.7; }

@media (max-width: 640px) {
  .legal-hero { padding-top: 110px; }
}
</style>
