<script setup lang="ts">
import GlobalCTA from '@/components/sections/GlobalCTA.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import immigration from '@/data/immigration.json'

const openFaq = ref(0)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? -1 : i
}

const trustAvatars = [
  '/testimonials/lina.jpg',
  '/testimonials/Anya.jpg',
  '/testimonials/priya.jpg',
]
</script>

<template>
  <!-- ============= HERO ============= -->
  <header class="service-hero immigration-premium-hero">
    <div class="immigration-premium-hero-inner">
      <div class="service-hero-copy">
        <h1>
          Navigate <em>global immigration</em> with experts
        </h1>
        <p class="service-hero-lede">
          Support your workforce wherever they are with the right visas and work permits to work legally.
        </p>
        <ul class="service-hero-features">
          <li class="hero-feature">
            <span class="hero-feature-check"></span> Fast setup
          </li>
          <li class="hero-feature">
            <span class="hero-feature-check"></span> Global compliance
          </li>
          <li class="hero-feature">
            <span class="hero-feature-check"></span> Local expertise
          </li>
        </ul>
        <div class="cta-row">
          <RouterLink to="/contact?reason=immigration_services" class="btn-primary">
            Start your application <span class="arrow">→</span>
          </RouterLink>
          <a href="https://calendly.com/jacksonandfrank/discover-us?month=2026-06" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="display: flex; align-items: center; justify-content: center;">
            Speak to expert
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px;">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </a>
        </div>
        <div class="trust-row">
          <div class="avatars">
            <div
              v-for="(src, i) in trustAvatars"
              :key="i"
              class="avatar"
              :style="{ backgroundImage: `url('${src}')` }"
            />
          </div>
          <span class="trust-text">
            <strong>99.5%</strong> visa approval rate across 80+ countries
          </span>
        </div>
      </div>
    </div>
  </header>

  <!-- ============= MAIN DESCRIPTION ============= -->
  <section class="section container">
    <div class="definition-block">
      <div>
        <h2 class="section-title">{{ immigration.mainDescription.title }}</h2>
      </div>
      <div class="definition-text">
        <p>{{ immigration.mainDescription.description }}</p>
      </div>
    </div>
  </section>

  <!-- ============= STATS STRIP ============= -->
  <section class="stats-strip">
    <div class="container stats-strip-inner">
      <div v-for="(s, i) in immigration.definition.trustSignals.stats" :key="i" class="stat-item">
        <strong>{{ s.value }}</strong>
        <span v-if="s.label" class="stat-label">{{ s.label }}</span>
        <span class="stat-desc">{{ s.description }}</span>
      </div>
    </div>
  </section>

  <!-- ============= SERVICES ============= -->
  <section class="section container">
    <div class="section-head">
      <span class="tag">What we deliver</span>
      <h2 class="section-title">{{ immigration.services.title }}</h2>
      <p v-if="immigration.services.description" class="section-lead">
        {{ immigration.services.description }}
      </p>
    </div>
    <div class="services-grid">
      <div v-for="(svc, i) in immigration.services.items" :key="i" class="service-card">
        <span class="service-card-num">0{{ i + 1 }}</span>
        <h3>{{ svc.title }}</h3>
        <p>{{ svc.description }}</p>
        <ul>
          <li v-for="f in svc.features" :key="f">{{ f }}</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ============= PROCESS ============= -->
  <section class="section container">
    <div class="section-head">
      <span class="tag">How it works</span>
      <h2 class="section-title">{{ immigration.process.title }}</h2>
      <p v-if="immigration.process.description" class="section-lead">
        {{ immigration.process.description }}
      </p>
    </div>
    <div class="how-grid how-grid-4">
      <div v-for="step in immigration.process.steps" :key="step.number" class="how-card">
        <span class="how-card-num">0{{ step.number }}</span>
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
        <ul>
          <li v-for="d in step.details" :key="d">{{ d }}</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ============= EOR BRIDGE ============= -->
  <section class="eor-bridge">
    <div class="container">
      <div class="section-head">
        <span class="tag">{{ immigration.eorBridge.subtitle }}</span>
        <h2 class="section-title">{{ immigration.eorBridge.title }}</h2>
        <p class="section-lead">{{ immigration.eorBridge.description }}</p>
      </div>
      <div class="eor-bridge-grid">
        <div v-for="(b, i) in immigration.eorBridge.benefits" :key="i" class="eor-bridge-card">
          <span class="eor-bridge-mark">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ b.title }}</h3>
          <p>{{ b.description }}</p>
        </div>
      </div>
      <div class="eor-bridge-cta">
        <RouterLink :to="immigration.eorBridge.ctaHref" class="btn-primary">
          {{ immigration.eorBridge.ctaText }} <span class="arrow">→</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- ============= FAQ ============= -->
  <section class="section container">
    <div class="faq-block">
      <div class="faq-head">
        <span class="tag">FAQs</span>
        <h2 class="section-title">{{ immigration.faqs.title }}</h2>
      </div>
      <div class="faq-list">
        <button
          v-for="(item, i) in immigration.faqs.items"
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
    </div>
  </section>

  <!-- ============= WARM CTA ============= -->
  <GlobalCTA title="Ready to streamline your immigration process?" />
</template>

<style scoped>
@import '@/styles/service-page.css';

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}
.service-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 34px 30px;
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.08);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 50px rgba(9, 64, 123, 0.12);
}
.service-card-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--bg);
  font-family: var(--serif);
  font-style: italic;
  font-size: 20px;
  margin-bottom: 22px;
}
.service-card h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 14px;
  color: var(--ink);
}
.service-card p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.75;
  margin-bottom: 20px;
}
.service-card ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 20px;
  border-top: 1px solid rgba(9, 64, 123, 0.12);
  padding-top: 18px;
  margin-top: 18px;
}
.service-card li {
  font-size: 13px;
  color: var(--ink-soft);
  position: relative;
  padding-left: 22px;
}
.service-card li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 2px;
  color: var(--accent);
  font-weight: 700;
}

.how-grid-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.how-card {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(9, 64, 123, 0.14);
  border-radius: var(--radius-lg);
  padding: 34px 32px;
  box-shadow: 0 18px 40px rgba(9, 64, 123, 0.08);
  position: relative;
  overflow: hidden;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.how-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 48px rgba(9, 64, 123, 0.12);
}
.how-card::before {
  content: '';
  position: absolute;
  inset: 0;
  left: auto;
  width: 6px;
  background: linear-gradient(180deg, var(--accent), #7FCDEE);
  border-radius: 999px;
}
.how-card-num {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg);
  color: var(--accent);
  font-family: var(--serif);
  font-style: italic;
  font-size: 20px;
  margin-bottom: 18px;
}
.how-card h3 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 12px;
  color: var(--ink);
  position: relative;
  z-index: 1;
}
.how-card p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.75;
  margin-bottom: 18px;
  position: relative;
  z-index: 1;
}
.how-card ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;
  position: relative;
  z-index: 1;
}
.how-card li {
  font-size: 13px;
  color: var(--ink-soft);
  position: relative;
  padding-left: 20px;
}
.how-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 3px;
  color: var(--accent);
  font-size: 18px;
}

/* EOR bridge */
.eor-bridge {
  color: var(--ink);
  padding: 120px 0;
}
.eor-bridge .section-head {
  max-width: 720px;
  margin-bottom: 42px;
}
.eor-bridge .tag {
  color: var(--accent-warm);
}
.eor-bridge .section-title {
  color: var(--ink);
}
.eor-bridge .section-title em {
  color: var(--accent);
}
.eor-bridge .section-lead {
  color: var(--ink-soft);
  line-height: 1.75;
  max-width: 680px;
}
.eor-bridge-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  margin-bottom: 52px;
}
.eor-bridge-card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(9, 64, 123, 0.14);
  border-radius: var(--radius-lg);
  padding: 34px;
  box-shadow: 0 22px 55px rgba(9, 64, 123, 0.08);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.eor-bridge-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 28px 65px rgba(9, 64, 123, 0.12);
}
.eor-bridge-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  font-family: var(--serif);
  font-style: italic;
  font-size: 20px;
  color: var(--bg);
  background: var(--accent);
  margin-bottom: 18px;
}
.eor-bridge-card h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 14px;
  color: var(--ink);
}
.eor-bridge-card p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.75;
}
.eor-bridge-cta {
  text-align: center;
}
.eor-bridge-cta .btn-primary {
  background: var(--accent-warm);
  color: var(--bg);
  border: 1px solid transparent;
}
.eor-bridge-cta .btn-primary:hover {
  background: #e07d10;
  color: var(--bg);
}
.eor-bridge-cta .btn-secondary {
  margin-left: 12px;
  border-color: rgba(26, 26, 26, 0.16);
  color: var(--ink);
}
.eor-bridge-cta .btn-secondary:hover {
  background: rgba(26, 26, 26, 0.04);
  color: var(--ink);
}

.immigration-premium-hero {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  box-sizing: border-box;
  padding: 88px 0 96px;
  display: block;
  background-color: #0E0F3B;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(20 19 58 / 77%) 40%, rgb(14 15 59 / 39%) 70%, #0000001a 100%), url(/case-study/immigration.png);
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  color: #ffffff;
  min-height: 700px;
  overflow: hidden;
  margin-bottom: 40px;
}

.immigration-premium-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.immigration-premium-hero > * {
  position: relative;
  z-index: 1;
}

.immigration-premium-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

.immigration-premium-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.immigration-premium-hero .tag {
  color: var(--accent-sky, #7FCDEE);
  background: rgba(127, 205, 238, 0.1);
  border: 1px solid rgba(127, 205, 238, 0.2);
  margin-bottom: 24px;
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.immigration-premium-hero h1 {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(48px, 5.8vw, 86px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 24px;
  color: #ffffff;
}

.immigration-premium-hero h1 em {
  font-style: italic;
  color: var(--accent-warm, #F7931E);
}

.immigration-premium-hero .service-hero-lede {
  color: rgba(255, 255, 255, 0.85);
  font-size: 19px;
  margin-top: 24px;
  max-width: 520px;
  line-height: 1.6;
}

.immigration-premium-hero .service-hero-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 32px;
  list-style: none;
  padding: 0;
}

.immigration-premium-hero .hero-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.immigration-premium-hero .hero-feature-check,
.immigration-premium-hero .hero-feature-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(9, 64, 123, 0.15);
  border: 1px solid rgba(9, 64, 123, 0.4);
  color: var(--accent-sky, #7FCDEE);
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}

.immigration-premium-hero .hero-feature-check::after,
.immigration-premium-hero .hero-feature-dot::after {
  content: '✓';
}

.immigration-premium-hero .cta-row {
  margin-top: 40px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.immigration-premium-hero .btn-primary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: var(--accent-warm, #F7931E);
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.35);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.immigration-premium-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.45);
}

.immigration-premium-hero .btn-secondary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.immigration-premium-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
}

.immigration-premium-hero .trust-row {
  margin-top: 48px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.immigration-premium-hero .avatars {
  display: flex;
}

.immigration-premium-hero .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-size: cover;
  background-position: center;
  margin-left: -8px;
}

.immigration-premium-hero .avatar:first-child {
  margin-left: 0;
}

.immigration-premium-hero .trust-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
}

@media (max-width: 960px) {
  .immigration-premium-hero {
    padding: 72px 24px 72px;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(14, 15, 59, 0.8), rgba(14, 15, 59, 0.95)), url(/services/service-page/immigration.webp);
  }
}

@media (max-width: 640px) {
  .immigration-premium-hero {
    min-height: auto;
    padding: 260px 20px 64px;
    background-image: none;
    background-color: #0E0F3B;
  }
  .immigration-premium-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/immigration.webp);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .immigration-premium-hero h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .immigration-premium-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .immigration-premium-hero .btn-primary,
  .immigration-premium-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 960px) {
  .how-grid-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .services-grid,
  .eor-bridge-grid,
  .how-grid-4,
  .service-card ul {
    grid-template-columns: 1fr;
  }
  .service-card {
    padding: 24px;
  }
  .how-card {
    padding: 24px;
  }
  .eor-bridge-card {
    padding: 24px;
  }
}
</style>
