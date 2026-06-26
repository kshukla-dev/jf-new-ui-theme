<script setup lang="ts">
import GlobalCTA from '@/components/sections/GlobalCTA.vue'
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import caseData from '@/data/case-studies.json'

const openFaq = ref(0)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? -1 : i
}

const testimonials = computed(() => caseData.caseStudies.filter(cs => cs.testimonial))

const introHeading = computed(() => {
  const p0 = caseData.intro.paragraphs[0]
  const splitIndex = p0.indexOf('.') + 1
  return p0.slice(0, splitIndex)
})

const introText1 = computed(() => {
  const p0 = caseData.intro.paragraphs[0]
  const splitIndex = p0.indexOf('.') + 1
  return p0.slice(splitIndex).trim()
})

const testiCarousel = ref<HTMLElement | null>(null)
const activeDot = ref(0)
const centerCardIndex = ref(1)

function onCarouselScroll() {
  if (!testiCarousel.value) return
  const el = testiCarousel.value
  const scrollLeft = el.scrollLeft
  const cardWidth = el.children[0].clientWidth + 24
  activeDot.value = Math.round(scrollLeft / cardWidth)

  const containerCenter = scrollLeft + el.clientWidth / 2
  let closestIndex = 0
  let minDistance = Infinity
  Array.from(el.children).forEach((child, index) => {
    const childCenter = (index * cardWidth) + (el.children[0].clientWidth / 2)
    const distance = Math.abs(childCenter - containerCenter)
    if (distance < minDistance) {
      minDistance = distance
      closestIndex = index
    }
  })
  centerCardIndex.value = closestIndex
}

onMounted(() => {
  // Wait a tick for layout to establish, then set initial center
  setTimeout(() => {
    onCarouselScroll()
  }, 100)
})

let wheelTimeout: ReturnType<typeof setTimeout> | null = null;

function onCarouselWheel(e: WheelEvent) {
  if (!testiCarousel.value) return
  const el = testiCarousel.value
  
  const isAtLeftEdge = el.scrollLeft <= 0
  const isAtRightEdge = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth

  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    if ((e.deltaY > 0 && !isAtRightEdge) || (e.deltaY < 0 && !isAtLeftEdge)) {
      e.preventDefault()
      
      // If it's a large wheel step (typical mouse wheel), smoothly scroll exactly one card
      if (Math.abs(e.deltaY) > 20) {
        if (!wheelTimeout) {
          const cardWidth = el.children[0].clientWidth + 24
          const direction = e.deltaY > 0 ? 1 : -1
          el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' })
          
          wheelTimeout = setTimeout(() => {
            wheelTimeout = null
          }, 500)
        }
      } else {
        // Trackpad: allow fluid continuous scrolling
        el.scrollBy({ left: e.deltaY, behavior: 'auto' })
      }
    }
  }
}

function scrollToDot(index: number) {
  if (!testiCarousel.value) return
  const cardWidth = testiCarousel.value.children[0].clientWidth + 24
  testiCarousel.value.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
  activeDot.value = index
}

const testiNames = ["Sarah Mitchell", "James Carter", "Laura Bennett", "Mark Davis", "Anya Petrov"]
const testiAvatars = ["/testimonials/priya.jpg", "/testimonials/James.jpg", "/testimonials/lina.jpg", "/testimonials/mark.jpg", "/testimonials/Anya.jpg"]
</script>

<template>
  <!-- ============= HERO ============= -->
  <header class="cs-dark-hero">
    <div class="cs-dark-hero-inner container">
      <div class="cs-hero-content">
         <h1 class="hero-title">Real success stories.<br>Real business <em>impact.</em></h1>
        <p class="hero-desc">
          Discover how businesses around the world simplified global hiring, ensured compliance, and scaled faster with Jackson & Frank.
        </p>
        <button class="btn-outline-gold">
          <span class="btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </span>
          See how we make an impact
        </button>
      </div>
      
      <div class="cs-hero-stats">
        <div class="stat-glass-card">
          <div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></div>
          <div class="stat-value">150+</div>
          <div class="stat-label">Countries<br>covered</div>
        </div>
        <div class="stat-glass-card">
          <div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
          <div class="stat-value">50,000+</div>
          <div class="stat-label">Employees<br>onboarded globally</div>
        </div>
        <div class="stat-glass-card">
          <div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          <div class="stat-value">98%</div>
          <div class="stat-label">Client satisfaction<br>rate</div>
        </div>
        <div class="stat-glass-card">
          <div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <div class="stat-value">10+</div>
          <div class="stat-label">Years of global<br>HR expertise</div>
        </div>
      </div>
    </div>
  </header>

  <!-- ============= WHY IT MATTERS ============= -->
  <section class="section why-matters-section">
    <div class="why-matters-container container">
      <div class="why-left">
        <img src="/case-study/WhyMatters.png" alt="Global network" class="why-globe" />
      </div>
      <div class="why-right">
        <div class="why-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          WHY IT MATTERS
        </div>
        <h2 class="why-heading">{{ introHeading }}</h2>
        <p class="why-desc">{{ introText1 }}</p>
        <p class="why-desc">{{ caseData.intro.paragraphs[1] }}</p>
      </div>
    </div>
  </section>



  <!-- ============= CASE STUDIES LIST ============= -->
  <section class="section container">
    <div class="cs-list">
      <div
        v-for="(cs, index) in caseData.caseStudies"
        :key="cs.id"
        class="cs-list-item"
        :class="{ 'img-left': index % 2 !== 0 }"
      >
        <!-- CONTENT SIDE -->
        <div class="cs-item-content-wrap">
          <div class="cs-item-text">
            <span class="tag cs-tag">{{ cs.service }}</span>
            <h3>{{ cs.title }}</h3>
            <p>{{ cs.excerpt }}</p>
            <RouterLink :to="`/case-studies/${cs.slug}`" class="read-story-link">Read full story <span>&rarr;</span></RouterLink>
          </div>
          <div class="cs-item-stats">
            <div class="cs-stat" v-for="(stat, i) in cs.results.slice(0, 4)" :key="i">
              <div class="cs-stat-icon">
                <svg v-if="i === 0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <svg v-else-if="i === 1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <svg v-else-if="i === 2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div class="cs-stat-info">
                <strong>{{ stat.metric }}</strong>
                <span>{{ stat.label }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- IMAGE SIDE -->
        <div class="cs-item-img-wrap">
          <img :src="cs.image" :alt="cs.title" loading="lazy" />
          <div class="cs-item-logo-overlay" :class="index % 2 !== 0 ? 'left' : 'right'">
            <span class="logo-letter">{{ cs.clientName ? cs.clientName.charAt(0).toUpperCase() : 'C' }}</span>
            <span class="logo-text">{{ cs.clientName ? cs.clientName.split(' ')[0] : 'Client' }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============= IMPACT SECTION ============= -->
  <section class="section impact-section container">
    <div class="impact-inner">
      <div class="impact-left">
        <h2>The impact<br>we create</h2>
        <p>Real results. Measurable impact.<br>Stronger businesses.</p>
      </div>
      <div class="impact-right">
        <div class="impact-stat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="1.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          <strong>+250%</strong>
          <span>Average growth in<br>team capacity</span>
        </div>
        <div class="impact-stat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <strong>-70%</strong>
          <span>Reduction in<br>compliance risk</span>
        </div>
        <div class="impact-stat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <strong>3x</strong>
          <span>Faster time<br>to hire</span>
        </div>
        <div class="impact-stat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          <strong>100%</strong>
          <span>Focus on core<br>business</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ============= TESTIMONIALS SECTION ============= -->
  <section class="section testimonials-section container">
    <div class="testi-header">
      <h2>What our clients say</h2>
      <RouterLink to="/testimonials" class="view-all-link">View all testimonials <span>&rarr;</span></RouterLink>
    </div>
    
    <div class="testi-carousel" ref="testiCarousel" @scroll="onCarouselScroll" @wheel="onCarouselWheel">
      <div :class="['testi-card', { 'is-center': centerCardIndex === index }]" v-for="(t, index) in testimonials" :key="t.id">
        <div class="quote-mark">“</div>
        <p class="testi-text">{{ t.testimonial }}</p>
        
        <div class="testi-footer">
          <div class="testi-author">
            <div class="author-avatar">
              <img :src="testiAvatars[index % testiAvatars.length]" alt="Avatar" />
            </div>
            <div class="author-info">
              <strong>{{ testiNames[index % testiNames.length] }}</strong>
              <span>{{ t.clientRole }}</span>
            </div>
          </div>
          
          <div class="testi-company-logo">
            <span class="t-logo-letter" :style="{ color: ['#7b2cbf', '#0b80a1', '#2e8b57', '#d97706'][index % 4] }">
              {{ t.clientName ? t.clientName.charAt(0).toUpperCase() : 'C' }}
            </span>
            <span class="t-logo-text">{{ t.clientName ? t.clientName.split(' ')[0] : 'Client' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="testi-dots" v-if="testimonials.length > 0">
      <button 
        v-for="(_, index) in testimonials" 
        :key="index"
        :class="['dot', { active: activeDot === index }]"
        @click="scrollToDot(index)"
        aria-label="Go to slide"
      ></button>
    </div>
  </section>

  <section class="section container">
    <div class="faq-block">
      <div class="faq-head">
        <span class="tag">FAQs</span>
        <h2 class="section-title">{{ caseData.faqs.title }}</h2>
        <p class="section-lead">{{ caseData.faqs.subtitle }}</p>
      </div>
      <div class="faq-list">
        <button
          v-for="(item, i) in caseData.faqs.items"
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

  <GlobalCTA title="Write your own success story" />
</template>

<style scoped>
@import '@/styles/service-page.css';

/* ============================================================
   DARK HERO
   ============================================================ */
.cs-dark-hero {
  background-color: #0E0F3B;
  background-image: linear-gradient(to right, rgba(14,15,59,0.95) 0%, rgba(14,15,59,0.7) 40%, rgba(14,15,59,0.4) 100%), url('/case-study/Market Entry Workforce Setup.png');
  background-size: cover;
  background-position: center;
  color: #fff;
  padding: 180px 0 200px; /* Extra bottom padding for overlap */
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
}

.cs-dark-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
  z-index: 1;
}

.cs-dark-hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

.cs-hero-content {
  max-width: 540px;
  position: relative;
  z-index: 2;
}

.hero-tag {
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

.hero-title {
  font-family: var(--serif);
  font-size: clamp(36px, 4vw, 56px);
  line-height: 1.1;
  
  margin-bottom: 24px;
  color: #fff;
}

.hero-title em {
  color: var(--accent-warm, #F7931E);
  font-style: italic;
}

.hero-desc {
  font-size: 17px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 40px;
}

.btn-outline-gold {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(127, 205, 238, 0.4);
  padding: 8px 24px 8px 8px;
  border-radius: 40px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline-gold:hover {
  background: rgba(127, 205, 238, 0.1);
  border-color: var(--accent-sky, #7FCDEE);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--accent-sky, #7FCDEE);
  color: var(--accent-sky, #7FCDEE);
}

/* Glass Stats Grid */
.cs-hero-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
}

.stat-glass-card {
  padding: 40px 32px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.stat-glass-card:nth-child(even) {
  border-right: none;
}
.stat-glass-card:nth-child(3),
.stat-glass-card:nth-child(4) {
  border-bottom: none;
}

.stat-icon {
  color: var(--accent);
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.stat-value {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #fff;
}

.stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
}

/* ============================================================
   FEATURED STORY CARD
   ============================================================ */
.featured-story-wrap {
  margin-bottom: 80px;
}

.featured-story-card {
  display: flex;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
}

.featured-img-col {
  flex: 0 0 45%;
  position: relative;
}

.featured-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-logo-overlay {
  position: absolute;
  bottom: 24px;
  left: 24px;
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  min-width: 90px;
}

.logo-letter {
  font-size: 36px;
  font-weight: 800;
  color: #7b2cbf; /* Avenza purple */
  line-height: 1;
  margin-bottom: 4px;
}

.logo-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
}

.featured-content-col {
  padding: 56px;
  flex: 1;
}

.featured-tag {
  color: var(--accent);
  background: transparent;
  border: none;
  padding: 0;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 24px;
  display: block;
}

.featured-content-col h2 {
  font-family: var(--serif);
  font-size: 36px;
  
  line-height: 1.2;
  margin-bottom: 16px;
  color: var(--ink);
}

.featured-content-col p {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 40px;
}

.featured-stats-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 24px;
  margin-bottom: 40px;
}

.f-stat {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.f-stat svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.f-stat strong {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 4px;
}

.f-stat span {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.4;
  display: block;
}

.read-story-link {
  font-size: 15px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;
}

.read-story-link:hover {
  opacity: 0.8;
}

.read-story-link span {
  transition: transform 0.2s;
}

.read-story-link:hover span {
  transform: translateX(4px);
}

@media (max-width: 1024px) {
  .cs-dark-hero-inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .cs-dark-hero {
    padding: 140px 0 160px;
  }
  .cs-hero-content {
    max-width: 100%;
    text-align: center;
  }
  .hero-desc {
    margin: 0 auto 32px;
  }
  
  .featured-story-card {
    flex-direction: column;
  }
  .featured-img-col {
    height: 300px;
  }
}

@media (max-width: 640px) {
  .cs-dark-hero {
    padding: 120px 0 140px;
  }
  .stat-glass-card {
    padding: 24px 16px;
  }
  .stat-value {
    font-size: 26px;
    margin-bottom: 4px;
  }
  .stat-label {
    font-size: 12px;
  }
  .stat-icon {
    margin-bottom: 12px;
  }
  .stat-icon svg {
    width: 20px;
    height: 20px;
  }
  .featured-content-col {
    padding: 32px 24px;
  }
  .featured-content-col h2 {
    font-size: 28px;
  }
  .featured-stats-row {
    flex-direction: column;
    gap: 20px;
  }
}

/* ============================================================
   WHY IT MATTERS SECTION
   ============================================================ */
.why-matters-section {
  position: relative;
  z-index: 10;
  margin-top: -200px;
}
.why-matters-container {
  display: flex;
  background: #fcfcfc;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
}
.why-left {
  flex: 0 0 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}
.why-globe {
  max-width: 100%;
  height: auto;
  opacity: 0.9;
}
.why-right {
  flex: 1;
  padding: 20px;
}
.why-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}
.why-heading {
  font-family: var(--serif);
  font-size: 36px;
  font-weight: 400;
  color: var(--ink);
  line-height: 1.3;
  margin-bottom: 24px;
}
.why-desc {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 16px;
}
.why-desc:last-child {
  margin-bottom: 0;
}

/* ============================================================
   CASE STUDIES LIST
   ============================================================ */
.cs-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.cs-list-item {
  display: flex;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0,0,0,0.05);
}

.cs-list-item.img-left {
  flex-direction: row-reverse;
}

.cs-item-content-wrap {
  flex: 1;
  padding: 48px;
  display: flex;
  gap: 40px;
  align-items: center;
}

.cs-item-text {
  flex: 1;
}

.cs-tag {
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
  display: block;
}

.cs-item-text h3 {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 400;
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 16px;
}

.cs-item-text p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 24px;
}

.cs-item-stats {
  flex: 0 0 200px;
  background: var(--accent-soft);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cs-stat {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.cs-stat-icon {
  margin-top: 2px;
  color: var(--accent);
}

.cs-stat-info strong {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 2px;
}

.cs-stat-info span {
  display: block;
  font-size: 11px;
  color: var(--ink-soft);
  line-height: 1.3;
}

.cs-item-img-wrap {
  flex: 0 0 45%;
  position: relative;
}

.cs-item-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cs-item-logo-overlay {
  position: absolute;
  bottom: 24px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  min-width: 80px;
}

.cs-item-logo-overlay.left {
  left: 24px;
}

.cs-item-logo-overlay.right {
  right: 24px;
}

.cs-item-logo-overlay .logo-letter {
  font-size: 28px;
  font-weight: 800;
  color: #0b80a1; /* default color, can vary */
  line-height: 1;
  margin-bottom: 4px;
}

.cs-item-logo-overlay .logo-text {
  font-size: 11px;
  font-weight: 600;
  color: var(--ink);
}

/* ============================================================
   IMPACT SECTION
   ============================================================ */
.impact-section {
  padding-bottom: 60px;
}

.impact-inner {
  background: var(--accent-soft);
  border-radius: 24px;
  padding: 60px 48px;
  display: flex;
  align-items: center;
  gap: 60px;
}

.impact-left {
  flex: 0 0 280px;
}

.impact-left h2 {
  font-family: var(--serif);
  font-size: 36px;
  
  color: var(--ink);
  line-height: 1.1;
  margin-bottom: 12px;
}

.impact-left p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
}

.impact-right {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.impact-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.impact-stat svg {
  margin-bottom: 16px;
}

.impact-stat strong {
  font-size: 32px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
}

.impact-stat span {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.4;
}

/* ============================================================
   TESTIMONIALS SECTION
   ============================================================ */
.testimonials-section {
  padding-bottom: 80px;
}
.testi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.testi-header h2 {
  font-family: var(--serif);
  font-size: 32px;
  color: var(--ink);
  
}
.view-all-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: transform 0.2s;
}
.view-all-link:hover span {
  transform: translateX(4px);
}
.testi-carousel {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 24px;
  scrollbar-width: none; /* Firefox */
}
.testi-carousel::-webkit-scrollbar {
  display: none; /* Chrome */
}
.testi-card {
  flex: 0 0 calc(33.333% - 16px);
  min-width: 340px;
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.05);
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.testi-card.is-center {
  border-color: rgba(9, 64, 123, 0.5); /* Gold outline */
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.1); /* Soft gold shadow */
  transform: translateY(-4px); /* Lift it up slightly */
}
.quote-mark {
  font-family: var(--serif);
  font-size: 60px;
  color: var(--accent);
  line-height: 0.6;
  margin-bottom: 16px;
}
.testi-text {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  flex: 1;
  margin-bottom: 32px;
}
.testi-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.testi-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.author-avatar {
  width: 40px;
  height: 40px;
  background: var(--accent-soft);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-soft);
  overflow: hidden;
}
.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.author-info strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}
.author-info span {
  font-size: 12px;
  color: var(--ink-soft);
}
.testi-company-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fcfcfc;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.03);
}
.t-logo-letter {
  font-size: 24px;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 2px;
}
.t-logo-text {
  font-size: 10px;
  font-weight: 600;
  color: var(--ink);
}

.testi-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}
.testi-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e2e0da;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s;
}
.testi-dots .dot.active {
  background: var(--accent);
  width: 24px;
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .cs-dark-hero {
    padding: 140px 0 160px;
  }
  .cs-dark-hero-inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .cs-hero-stats {
    max-width: 600px;
  }
  .why-matters-section {
    margin-top: -120px;
  }
  .why-matters-container {
    flex-direction: column;
  }
  .why-left {
    padding: 32px 32px 0 32px;
  }
  .why-right {
    padding: 32px;
  }
  
  .intro-block { grid-template-columns: 1fr; gap: 32px; }
  
  .cs-list { gap: 48px; }

  .cs-list-item {
    flex-direction: column;
  }
  .cs-list-item.img-left {
    flex-direction: column;
  }
  .cs-item-img-wrap {
    height: 300px;
    order: -1;
  }
  .cs-item-logo-overlay.left,
  .cs-item-logo-overlay.right {
    bottom: 16px;
    left: 16px;
    right: auto;
  }
  .cs-item-content-wrap {
    flex-direction: column;
    padding: 32px;
    gap: 24px;
  }
  .cs-item-stats {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .impact-inner {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
  .impact-left {
    flex: auto;
  }
  .impact-right {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
  }
  .testi-card {
    flex: 0 0 calc(50% - 12px);
  }
}

@media (max-width: 640px) {
  .cs-dark-hero {
    padding: 120px 0 120px;
  }
  .why-matters-section {
    margin-top: -80px;
  }
  .cs-list { gap: 32px; }
  
  .impact-inner {
    padding: 40px 24px;
  }
  .cs-item-content-wrap {
    padding: 24px;
    gap: 20px;
  }
  .cs-item-stats {
    flex-direction: column;
  }
  .testi-card {
    flex: 0 0 calc(100% - 24px);
  }
  .testi-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
