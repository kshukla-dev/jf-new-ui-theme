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
  <div class="privacy-page">
    <!-- ============= HERO ============= -->
    <header class="privacy-hero">
      <div class="privacy-hero-bg"></div>
      <div class="container privacy-hero-inner">
        <div class="hero-badge" v-if="privacy.hero.badge">
          <svg v-if="privacy.hero.badge.icon === 'Shield'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hero-badge-icon"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
          <span>{{ privacy.hero.badge.text }}</span>
        </div>
        <h1 class="hero-title">{{ privacy.hero.title }}</h1>
        <p class="hero-desc">{{ privacy.hero.description }}</p>
        <div class="hero-divider"></div>
      </div>
    </header>

    <!-- ============= CONTENT ============= -->
    <section class="privacy-content-section">
      <div class="container">
        <div class="privacy-card">
          <div v-for="(s, i) in sections" :key="i" class="privacy-section">
            <span v-if="s.subtitle" class="privacy-subtitle">{{ s.subtitle }}</span>
            <h2>{{ s.title }}</h2>
            <p v-for="(p, j) in asArray(s.content)" :key="'p-'+j">{{ p }}</p>
            <p v-if="s.subContent" class="privacy-subcontent">{{ s.subContent }}</p>
            <ul v-if="s.list" class="privacy-list">
              <li v-for="(item, k) in s.list" :key="'li-'+k">{{ item }}</li>
            </ul>
          </div>

          <!-- Contact Details -->
          <div v-if="privacy.contact" class="privacy-contact-box">
            <h3>{{ privacy.contact.company }}</h3>
            <p>{{ privacy.contact.address.line1 }}</p>
            <p>{{ privacy.contact.address.line2 }}</p>
            <p class="mb-3">{{ privacy.contact.address.country }}</p>
            <p><strong>Phone:</strong> {{ privacy.contact.phone }}</p>
            <p><strong>Email:</strong> <a :href="'mailto:' + privacy.contact.email">{{ privacy.contact.email }}</a></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import '@/styles/service-page.css';

.privacy-page {
  background-color: #f8fafc;
  min-height: 100vh;
}

/* --- HERO --- */
.privacy-hero {
  position: relative;
  padding: 140px 20px 80px;
  background: linear-gradient(135deg, #0e0f3b 0%, #09407b 50%, #143369 100%);
  overflow: hidden;
  text-align: center;
}
.privacy-hero-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
  background-size: 50px 50px;
  pointer-events: none;
}
.privacy-hero-inner {
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 24px;
  border-radius: 99px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.hero-badge-icon {
  width: 18px;
  height: 18px;
}
.hero-title {
  font-family: var(--serif);
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.1;
  text-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.hero-desc {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
}
.hero-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  margin: 40px auto 0;
  border-radius: 2px;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .hero-title { font-size: clamp(22px, 4vw, 36px); }
  .hero-desc { font-size: 18px; }
}

/* --- CONTENT --- */
.privacy-content-section {
  padding: -40px 20px 80px;
  transform: translateY(-40px);
}
.privacy-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.04);
  padding: 40px 32px;
  max-width: 900px;
  margin: 0 auto;
}

@media (min-width: 900px) {
  .privacy-card {
    padding: 64px 80px;
  }
}

.privacy-section {
  margin-bottom: 48px;
}
.privacy-subtitle {
  display: block;
  font-size: 24px;
  color: var(--accent);
  margin-bottom: 16px;
  font-family: var(--serif);
}
.privacy-section h2 {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 32px);
  color: #111827;
  margin-bottom: 20px;
  line-height: 1.2;
}
.privacy-section p {
  font-size: 16px;
  color: #4b5563;
  line-height: 1.75;
  margin-bottom: 16px;
}
.privacy-subcontent {
  font-weight: 600;
  color: #111827 !important;
  margin-top: 24px;
}
.privacy-list {
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.privacy-list li {
  position: relative;
  padding-left: 24px;
  font-size: 16px;
  color: #4b5563;
  line-height: 1.6;
}
.privacy-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  background-color: var(--accent);
  border-radius: 50%;
}

/* --- CONTACT BOX --- */
.privacy-contact-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 32px;
  margin-top: 64px;
}
.privacy-contact-box h3 {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
}
.privacy-contact-box p {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 4px;
}
.privacy-contact-box p.mb-3 {
  margin-bottom: 16px;
}
.privacy-contact-box strong {
  color: #111827;
  font-weight: 600;
}
.privacy-contact-box a {
  color: var(--accent);
  text-decoration: none;
}
.privacy-contact-box a:hover {
  text-decoration: underline;
}
</style>
