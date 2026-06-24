<script setup lang="ts">
import GlobalCTA from '@/components/sections/GlobalCTA.vue'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import advantages from '@/data/advantages.json'

const openFaq = ref(0)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? -1 : i
}

const trustAvatars = [
  '/testimonials/lina.jpg',
  '/testimonials/Anya.jpg',
  '/testimonials/priya.jpg',
]

// FAQ tabs logic (same as landing page)
const faqTabs = [
  { id: 'About EOR', icon: 'user' },
  { id: 'Hiring & Onboarding', icon: 'users' },
  { id: 'Payroll & Compliance', icon: 'shield' },
  { id: 'Support & Others', icon: 'headset' }
]
const activeTab = ref('')

const categorizedFaqs = computed(() => {
  const list = advantages.faqs.items || []
  return list.map((item, idx) => {
    let category = 'About EOR'
    if ([1, 4, 7].includes(idx)) category = 'Hiring & Onboarding'
    else if ([2, 6].includes(idx)) category = 'Payroll & Compliance'
    else if ([3, 5].includes(idx)) category = 'Support & Others'
    return { ...item, category }
  })
})

const filteredFaqs = computed(() => {
  if (!activeTab.value) return categorizedFaqs.value
  return categorizedFaqs.value.filter(q => q.category === activeTab.value)
})
</script>

<template>
  <header class="service-hero advantages-hero">
    <div class="advantages-hero-inner">
      <div class="service-hero-copy">
        <h1>Why teams choose <em>Jackson &amp; Frank</em></h1>
        <p class="service-hero-lede">{{ advantages.definition.description }}</p>
        <ul class="service-hero-features">
          <li v-for="(f, i) in advantages.definition.keyFeatures" :key="i" class="hero-feature">
            <span class="hero-feature-check">✓</span>
            {{ f }}
          </li>
        </ul>
        <div class="cta-row">
          <RouterLink to="/contact" class="btn-primary">
            {{ advantages.definition.primaryButtonText }} <span class="arrow">→</span>
          </RouterLink>
          <RouterLink to="/contact?reason=consultation" class="btn-secondary">
            {{ advantages.definition.secondaryButtonText }}
          </RouterLink>
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
            <strong>50+ years</strong> of combined HR expertise
          </span>
        </div>
      </div>
    </div>
  </header>

  <section class="stats-strip">
    <div class="container stats-strip-inner">
      <div v-for="(s, i) in advantages.definition.trustSignals.stats" :key="i" class="stat-item">
        <strong>{{ s.value }}</strong>
        <span v-if="s.label" class="stat-label">{{ s.label }}</span>
        <span class="stat-desc">{{ s.description }}</span>
      </div>
    </div>
  </section>

  <!-- Advantages list -->
  <section class="section container">
    <div class="section-head">
      <span class="tag">What sets us apart</span>
      <h2 class="section-title">{{ advantages.advantages.title }}</h2>
      <p class="section-lead">{{ advantages.advantages.description }}</p>
    </div>
    <div class="adv-grid">
      <div v-for="(adv, i) in advantages.advantages.items" :key="i" class="adv-card">
        <span class="adv-num">0{{ i + 1 }}</span>
        <h3>{{ adv.title }}</h3>
        <ul>
          <li v-for="p in adv.points" :key="p">
            <span class="li-check" aria-hidden>✓</span> {{ p }}
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Certifications -->
  <section class="cert-strip">
    <div class="container">
      <div class="section-head">
        <span class="tag">Trust &amp; compliance</span>
        <h2 class="section-title">{{ advantages.certifications.title }}</h2>
      </div>
      <div class="cert-grid">
        <div v-for="cert in advantages.certifications.items" :key="cert.title" class="cert-card">
          <div class="cert-card-header">
            <div class="cert-icon-wrapper" v-if="cert.icon">
              <img :src="cert.icon" :alt="cert.iconAlt || cert.title" class="cert-icon-img" />
            </div>
            <h3>{{ cert.title }}</h3>
          </div>
          <ul>
            <li v-for="p in cert.points" :key="p">
              <span class="li-check" aria-hidden>✓</span> {{ p }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section container">
    <div class="faq-block">
      <div class="faq-head">
        <span class="tag">FAQs</span>
        <h2 class="section-title">{{ advantages.faqs.title }}</h2>
      </div>
      <div>
       

        <div class="faq-list">
          <button
            v-for="(item, i) in filteredFaqs"
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
    </div>
  </section>

  <GlobalCTA title="Ready to work" />
</template>

<style scoped>
@import '@/styles/service-page.css';

.advantages-hero {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  box-sizing: border-box;
  padding: 0px 0 96px;
  display: block;
  background-color: #0E0F3B;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 0%) 40%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/advantages.png);
  background-size: 60% auto;
  background-position: right 0% center;
  background-repeat: no-repeat;
  color: #ffffff;
  min-height: 700px;
  overflow: hidden;
}

.advantages-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.advantages-hero > * {
  position: relative;
  z-index: 1;
}

.advantages-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 10px 32px;
}

.advantages-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.advantages-hero .tag {
  color: var(--accent);
  background: rgba(9, 64, 123, 0.1);
  border: 1px solid rgba(9, 64, 123, 0.2);
  margin-bottom: 24px;
}

.advantages-hero h1 {
  color: #ffffff;
  text-shadow: none;
}

.advantages-hero .service-hero-copy h1 em {
  color: #F7931E;
}

.advantages-hero .service-hero-lede {
  color: rgba(255,255,255,0.82);
  text-shadow: none;
  font-size: 19px;
}

.advantages-hero .service-hero-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 32px;
  list-style: none;
  padding: 0;
}

.advantages-hero .hero-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255,255,255,0.85);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-shadow: none;
}

.advantages-hero .hero-feature-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #F7931E;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}

.advantages-hero .cta-row {
  margin-top: 40px;
}

.advantages-hero .btn-primary {
  background: #F7931E;
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.4);
}

.advantages-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.5);
}

.advantages-hero .btn-secondary {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.advantages-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255,255,255,0.7);
  color: #ffffff;
}

.advantages-hero .trust-row {
  margin-top: 48px;
}

.advantages-hero .trust-text {
  color: rgba(255,255,255,0.8);
}

.advantages-hero .avatar {
  border-color: #fdfbf7;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

@media (max-width: 1440px) {
  .advantages-hero {
    background-size: 65% auto;
  }
}

@media (max-width: 1280px) {
  .advantages-hero {
    background-size: 75% auto;
    background-position: right -5% center;
  }
}

@media (max-width: 1024px) {
  .advantages-hero {
    background-size: 85% auto;
    background-position: right -15% center;
  }
}

@media (max-width: 960px) {
  .advantages-hero {
    padding: 72px 24px 72px;
            background-size: 100% auto;
        background-position: top 20% center;
  }
}

@media (max-width: 640px) {
  .advantages-hero {
    min-height: auto;
    padding: 260px 20px 60px;
    background-image: none;
    background-color: #0E0F3B;
  }
  .advantages-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/advantages.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .advantages-hero-inner {
    padding-left: 0;
    padding-right: 0;
  }
  .advantages-hero .service-hero-copy h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .advantages-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .advantages-hero .btn-primary,
  .advantages-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

/* Redesigned Cards */
.adv-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}
.adv-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 38px 34px;
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.06);
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.adv-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 50px rgba(9, 64, 123, 0.12);
}
.adv-num {
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
  box-shadow: 0 4px 10px rgba(9, 64, 123, 0.2);
}
.adv-card h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 18px;
  color: var(--ink);
}
.adv-card ul,
.cert-card ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.adv-card li,
.cert-card li {
  font-size: 14px;
  color: var(--ink-soft);
  display: flex;
  gap: 10px;
  line-height: 1.5;
}
.li-check {
  color: var(--accent);
  flex-shrink: 0;
}

/* Redesigned Certifications */
.cert-strip {
  border-top: 1px solid var(--border);
  padding: 100px 0;
}
.cert-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
.cert-card {
  background: var(--bg);
  border: 1px solid rgba(9, 64, 123, 0.15);
  border-radius: var(--radius-lg);
  padding: 36px 32px;
  box-shadow: 0 16px 32px rgba(9, 64, 123, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}
.cert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px rgba(9, 64, 123, 0.08);
}
.cert-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(9, 64, 123, 0.12);
}
.cert-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: #ffffff;
  border: 1px solid rgba(9, 64, 123, 0.12);
  border-radius: 50%;
  overflow: hidden;
  padding: 6px;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}
.cert-icon-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}
.cert-card h3 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  margin: 0;
  color: var(--ink);
}

/* FAQ Section */
.faq-block {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.faq-head .tag {
  margin-bottom: 16px;
}
.faq-tabs-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 32px;
}
.faq-tabs {
  display: inline-flex;
  background: rgba(9, 64, 123, 0.08);
  padding: 6px;
  border-radius: 999px;
  gap: 4px;
  flex-wrap: wrap;
}
.faq-tab {
  background: transparent;
  border: none;
  color: var(--ink-soft);
  padding: 10px 24px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: none;
}
.faq-tab:hover {
  color: var(--accent);
}
.faq-tab.active {
  background: white;
  color: var(--accent);
  box-shadow: 0 2px 8px rgba(9, 64, 123, 0.12);
}
.faq-list {
  display: flex;
  flex-direction: column;
}
.faq-item {
  text-align: left;
  background: transparent;
  border: none;
  border-top: 1px solid var(--border);
  padding: 24px 0;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: 16px;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
}
.faq-item:last-child {
  border-bottom: 1px solid var(--border);
}
.faq-q {
  font-family: var(--sans);
  font-size: 19px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--ink);
  transition: color 0.2s;
}
.faq-item.open .faq-q {
  color: var(--accent);
}
.faq-toggle {
  font-size: 24px;
  color: var(--ink-muted);
  line-height: 1;
  transition: color 0.2s;
}
.faq-item.open .faq-toggle {
  color: var(--accent);
}
.faq-a {
  grid-column: 1 / -1;
  margin-top: 14px;
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.65;
}

@media (max-width: 1024px) {
  .adv-grid, .cert-grid { grid-template-columns: 1fr; }
  .faq-block {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>

