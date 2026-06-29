<script setup lang="ts">
import { RouterLink } from 'vue-router'
import eventsData from '@/data/events.json'

function fmtDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <header class="container ev-hero">
    <h1 class="section-title">Where we'll <em>be next</em></h1>
    <p>{{ eventsData.metadata.description }}</p>
  </header>

  <section class="section container">
    <div class="ev-list">
      <RouterLink
        v-for="ev in eventsData.events"
        :key="ev.id"
        to="/resources/events/china-europe-2026"
        class="ev-card"
      >
        <div class="ev-card-date">
          <span class="ev-day">{{ new Date(ev.startDate).getDate() }}</span>
          <span class="ev-month">{{ new Date(ev.startDate).toLocaleDateString('en-US', { month: 'short' }) }}</span>
        </div>
        <div class="ev-card-body">
          <span class="ev-type">{{ ev.type }}</span>
          <h3>{{ ev.title }}</h3>
          <p>{{ ev.excerpt }}</p>
          <div class="ev-meta">
            <span>📍 {{ ev.venue }}</span>
            <span>🕒 {{ ev.time }} · {{ fmtDate(ev.startDate) }}</span>
          </div>
        </div>
        <span class="ev-cta">View details <span aria-hidden>→</span></span>
      </RouterLink>
    </div>
  </section>

  <section class="cta-warm-wrap">
    <div class="cta-warm">
      <span class="cta-tag">Stay in the loop</span>
      <h2>Never miss an <em>event</em></h2>
      <p>Get notified about upcoming workshops, webinars, and conferences.</p>
      <div class="cta-warm-buttons">
        <RouterLink to="/contact" class="btn-primary">
          Get in touch <span class="arrow">→</span>
        </RouterLink>
        <RouterLink to="/blog" class="btn-secondary">Read the blog</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import '@/styles/service-page.css';

.ev-hero {
  padding: 140px 32px 40px;
  text-align: center;
  max-width: 760px;
}
.ev-hero .tag { margin-bottom: 16px; }
.ev-hero .section-title { margin-bottom: 16px; }
.ev-hero p { font-size: 17px; color: var(--ink-soft); max-width: 560px; margin: 0 auto; }

.ev-list { display: flex; flex-direction: column; gap: 20px; }
.ev-card {
  display: grid;
  grid-template-columns: 90px 1fr auto;
  gap: 28px;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  text-decoration: none;
  color: var(--ink);
  transition: border-color 0.2s, transform 0.2s;
}
.ev-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.ev-card-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--ink);
  color: var(--bg);
  border-radius: 14px;
  padding: 16px 0;
}
.ev-day { font-family: var(--serif); font-size: clamp(22px, 4vw, 34px); line-height: 1; }
.ev-month { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; color: var(--accent-warm); }
.ev-type {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}
.ev-card-body h3 {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 400;
  line-height: 1.15;
  margin: 8px 0 10px;
}
.ev-card-body p { font-size: 14px; color: var(--ink-soft); line-height: 1.6; margin-bottom: 12px; }
.ev-meta { display: flex; gap: 20px; flex-wrap: wrap; font-size: 13px; color: var(--ink-muted); }
.ev-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 999px;
  background: var(--ink);
  color: var(--bg);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.2s;
}
.ev-card:hover .ev-cta { background: var(--accent); }

@media (max-width: 768px) {
  .ev-hero { padding-top: 110px; }
  .ev-card { grid-template-columns: 1fr; gap: 16px; text-align: left; }
  .ev-card-date { flex-direction: row; gap: 8px; align-self: flex-start; padding: 10px 18px; }
}
</style>
