<script setup lang="ts">
import GlobalCTA from '@/components/sections/GlobalCTA.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import about from '@/data/about-us.json'

const openFaq = ref(0)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? -1 : i
}

// W.O.R.L.D values (ported from jf_website_2.0)
const worldValues = [
  { letter: 'W', title: 'Winners', description: 'We measure our success by our clients’ outcomes. If our clients win, we win.' },
  { letter: 'O', title: 'Ownership', description: 'We take responsibility from start to finish. Accountability is non-negotiable.' },
  { letter: 'R', title: 'Responsive', description: 'We are always available for our clients. We act fast and communicate clearly.' },
  { letter: 'L', title: 'Leading', description: 'We lead in workforce solutions, combining local expertise with a global perspective to keep our clients ahead.' },
  { letter: 'D', title: 'Down to Earth', description: 'We provide clear, practical advice. We explain what matters, what to do next, and why it works.' },
]

// Story milestones (ported from jf_website_2.0)
const milestones = [
  { year: '2013', description: "Founded Macee BV (Jackson & Frank's holding company) in the Netherlands, focusing on providing HR solutions to the Dutch market." },
  { year: '2014', description: 'Achieved a significant milestone of employing 100+ people, establishing a strong foundation.' },
  { year: '2015', description: 'Secured the prestigious NeN Staffing License, demonstrating our commitment to compliance and high standards.' },
  { year: '2016-2017', description: 'Expanded operations into Belgium and the Czech Republic, broadening our European presence and capabilities.' },
  { year: '2018', description: 'Reached 500+ employees by supporting 250+ companies globally, marking a new phase of growth and operational scale.' },
  { year: '2022', description: "Launched Jackson and Frank as Macee's sister company, opening entities in the Netherlands, Germany, and Italy." },
  { year: '2023', description: 'Extended our reach to Poland, France and UK, achieving a workforce of 1,400+ employees across multiple countries.' },
  { year: '2024', description: 'Worked with our 700th client while expanding into Belgium, Czech Republic, and Spain.' },
  { year: '2025', description: 'Expanded into China by launching our HR Boutique and opening offices in Shanghai and Hong Kong.' },
]

const team = [
  { name: 'Maarten Koekebakker', role: 'Partner', image: '/leadership/Maarten.webp', bio: 'With a wealth of experience in navigating the intricate landscapes of international expansion strategy and human resources, Maarten stands as a seasoned professional adept at driving organizational growth and success on a global scale.' },
  { name: 'Pawel Michalkiewicz', role: 'Managing partner', image: '/leadership/pawel2.webp', bio: 'Pawel brings over two decades of hands-on experience in international business development and human resource management, having held pivotal roles in multinational corporations across various industries.' },
]

const activeMilestone = ref(0)
let milestoneInterval: ReturnType<typeof setInterval> | undefined

function nextMilestone() {
  activeMilestone.value = (activeMilestone.value + 1) % milestones.length
}

function prevMilestone() {
  activeMilestone.value = (activeMilestone.value - 1 + milestones.length) % milestones.length
}

function setMilestone(index: number) {
  activeMilestone.value = index
}

onMounted(() => {
  milestoneInterval = setInterval(nextMilestone, 5000)
})

onUnmounted(() => {
  if (milestoneInterval) clearInterval(milestoneInterval)
})

</script>

<template>
  <!-- ============= HERO ============= -->
  <header class="service-hero about-premium-hero">
    <div class="about-premium-hero-inner">
      <div class="service-hero-copy">
       <h1>Global hiring,<br />made <em>human</em></h1>
        <p class="service-hero-lede">{{ about.definition.description }}</p>
        
        <div class="service-hero-features" style="display: flex; gap: 24px; margin-top: 32px; flex-wrap: wrap;">
          <div v-for="(f, i) in about.definition.keyFeatures" :key="i" class="hero-feature" style="display: flex; align-items: center; gap: 8px; font-weight: 500; font-size: 15px; color: rgba(255,255,255,0.85);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: #7FCDEE;"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M2 12H22"/><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"/></svg>
            {{ f }}
          </div>
        </div>
        
        <div class="cta-row" style="margin-top: 40px; display: flex; gap: 16px; flex-wrap: wrap;">
          <RouterLink to="/contact" class="btn-primary">
            {{ about.definition.primaryButtonText }} <span class="arrow">→</span>
          </RouterLink>
          <RouterLink to="/contact?reason=consultation" class="btn-secondary">
            {{ about.definition.secondaryButtonText }}
          </RouterLink>
        </div>

      </div>
    </div>
  </header>

  <!-- ============= STATS ============= -->
  <section class="stats-strip">
    <div class="container stats-strip-inner">
      <div v-for="(s, i) in about.definition.trustSignals.stats" :key="i" class="stat-item">
        <strong>{{ s.value }}</strong>
        <span v-if="s.label" class="stat-label">{{ s.label }}</span>
        <span class="stat-desc">{{ s.description }}</span>
      </div>
    </div>
  </section>

  <!-- ============= STORY ============= -->
  <section class="section container">
    <div class="section-head">
      <span class="tag">Our story</span>
      <h2 class="section-title">From Arnhem to <em>160+ countries</em></h2>
      <p class="section-lead">
        The milestones that shaped Jackson &amp; Frank into a global workforce solutions
        provider, from our founding in the Netherlands to our expansion worldwide.
      </p>
    </div>
    <div class="milestone-carousel">
      <div class="mc-bg" style="background-image: url('/world-map-dark.png');"></div>
      
      <div class="mc-progress">
        <button 
          v-for="(m, i) in milestones" 
          :key="'dot-'+i" 
          class="mc-dot"
          :class="{ active: i === activeMilestone }"
          @click="setMilestone(i)"
          :aria-label="'Go to milestone ' + m.year"
        ></button>
      </div>
      
      <div class="mc-content-wrapper">
        <button class="mc-nav-btn prev" @click="prevMilestone" aria-label="Previous milestone">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        
        <div class="mc-content">
          <transition name="fade-slide" mode="out-in">
            <div :key="activeMilestone" class="mc-slide">
              <div class="mc-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="3"/></svg>
                {{ milestones[activeMilestone].year }}
              </div>
              <p class="mc-desc">{{ milestones[activeMilestone].description }}</p>
            </div>
          </transition>
        </div>
        
        <button class="mc-nav-btn next" @click="nextMilestone" aria-label="Next milestone">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  </section>

  <!-- ============= VALUES ============= -->
  <section class="values-strip">
    <div class="container">
      <div class="section-head">
        <span class="tag">Our values</span>
        <h2 class="section-title">We operate by <em>W.O.R.L.D</em></h2>
        <p class="section-lead">
          The values that make us and our clients successful.
        </p>
      </div>
      <div class="values-grid">
        <div v-for="v in worldValues" :key="v.title" class="value-card">
          <span class="value-letter">{{ v.letter }}</span>
          <h3>{{ v.title }}</h3>
          <p>{{ v.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============= VISION / MISSION ============= -->
  <section class="section container">
    <div class="vm-grid">
      <div class="vm-card-premium">
        <!-- Bright, open horizon image for Vision -->
        <div class="vm-bg" style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80');"></div>
        <div class="vm-overlay"></div>
        <div class="vm-content">
          <span class="vm-badge">Vision</span>
          <p>A world in which international employability has no barriers.</p>
        </div>
      </div>
      
      <div class="vm-card-premium vm-mission">
        <!-- Collaborative global team image for Mission -->
        <div class="vm-bg" style="background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80');"></div>
        <div class="vm-overlay"></div>
        <div class="vm-content">
          <span class="vm-badge">Mission</span>
          <p>Enabling international labour mobility for organizations and people.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============= TEAM ============= -->
  <section class="section container">
    <div class="section-head">
      <span class="tag">Leadership</span>
      <h2 class="section-title">Meet our <em>leadership team</em></h2>
      <p class="section-lead">
        The visionary leaders behind our mission to make global hiring simple and accessible.
      </p>
    </div>
    <div class="team-grid">
      <div v-for="member in team" :key="member.name" class="team-card">
        <div class="team-photo">
          <img :src="member.image" :alt="member.name" />
        </div>
        <div class="team-body">
          <h3>{{ member.name }}</h3>
          <span class="team-role">{{ member.role }}</span>
          <p>{{ member.bio }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============= FAQ ============= -->
  <section class="section container">
    <div class="faq-block">
      <div class="faq-head">
        <span class="tag">FAQs</span>
        <h2 class="section-title">{{ about.faqs.title }}</h2>
        <p class="section-lead">{{ about.faqs.subtitle }}</p>
      </div>
      <div class="faq-list">
        <button
          v-for="(item, i) in about.faqs.items"
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

  <!-- ============= CTA ============= -->
  <GlobalCTA title="Let's build your team" />
</template>

<style scoped>
@import '@/styles/service-page.css';

/* Timeline */
.timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.timeline-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  position: relative;
}
.timeline-year {
  display: inline-block;
  font-family: var(--serif);
  font-style: italic;
  font-size: 30px;
  color: var(--accent);
  margin-bottom: 12px;
}
.timeline-item p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* Values */
.values-strip {
  background: #0E0F3B;
  color: var(--bg);
  padding: 100px 0;
}
.values-strip .tag { color: var(--accent-warm); }
.values-strip .section-title { color: var(--bg); }
.values-strip .section-title em { color: var(--accent-warm); }
.values-strip .section-lead { color: rgba(255, 255, 255, 0.7); }
.values-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.value-card {
  background: var(--dark-soft);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius);
  padding: 28px 24px;
}
.value-letter {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--accent);
  color: white;
  font-family: var(--serif);
  font-style: italic;
  font-size: 22px;
  margin-bottom: 18px;
}
.value-card h3 {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
  color: var(--bg);
}
.value-card p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.55;
}

/* Vision / Mission */
.vm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.vm-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 56px 48px;
}
.vm-card .tag { margin-bottom: 20px; }
.vm-card p {
  font-family: var(--serif);
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 400;
  line-height: 1.2;
  color: var(--ink);
}
.vm-card-dark {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}
.vm-card-dark .tag { color: rgba(255, 255, 255, 0.7); }
.vm-card-dark p { color: white; }

@media (max-width: 1024px) {
  .timeline { grid-template-columns: repeat(2, 1fr); }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .vm-grid, .team-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .timeline { grid-template-columns: 1fr; }
  .values-grid { grid-template-columns: 1fr; }
  .team-card { grid-template-columns: 1fr; }
  .team-photo { aspect-ratio: 16 / 10; }
}

/* =======================================
   About Us Premium Hero
   ======================================= */
.about-premium-hero {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  box-sizing: border-box;
  padding: 100px 0 120px;
  display: block;
  background-color: #0E0F3B;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 0%) 40%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/about2.png);
  background-size: 55% auto;
  background-position: right 0% center;
  background-repeat: no-repeat;
  color: #ffffff;
  min-height: 700px;
  overflow: hidden;
}

.about-premium-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.about-premium-hero > * {
  position: relative;
  z-index: 1;
}

.about-premium-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

.about-premium-hero .service-hero-copy {
  max-width: 640px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.about-premium-hero h1 {
  font-family: var(--serif);
  font-size: clamp(48px, 5.5vw, 86px);
  line-height: 1.05;
  margin-bottom: 24px;
  font-weight: 400;
  letter-spacing: -0.02em;
}

.about-premium-hero h1 em {
  font-style: italic;
  color: #F7931E;
}

.about-premium-hero .service-hero-lede {
  font-size: 19px;
  color: rgba(255,255,255,0.82);
  line-height: 1.6;
  max-width: 520px;
}

.about-premium-hero .tag {
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 12px;
}

@media (max-width: 960px) {
  .about-premium-hero {
    background-size: 70% auto;
    background-position: right -50px center;
    padding: 72px 0;
  }
  .about-premium-hero-inner {
    padding: 0 20px;
  }
}

@media (max-width: 640px) {
  .about-premium-hero {
    min-height: auto;
    padding: 260px 20px 60px;
    background-image: none;
    background-color: #0E0F3B;
  }
  .about-premium-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/about2.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .about-premium-hero .cta-row {
    flex-direction: column;
    gap: 12px;
  }
  .about-premium-hero .cta-row > * {
    width: 100%;
  }
}

.about-premium-hero .btn-primary {
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 999px;
  background: #F7931E;
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.4);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.about-premium-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.5);
}

.about-premium-hero .btn-secondary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.about-premium-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255,255,255,0.7);
}

/* Milestone Carousel */
.milestone-carousel {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: #0E0F3B;
  padding: 60px 40px;
  color: white;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
  box-shadow: 0 24px 48px rgba(0,0,0,0.2);
}

.mc-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  z-index: 1;
}

.milestone-carousel::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 0%, #0E0F3B 100%);
  z-index: 2;
  pointer-events: none;
}

.mc-progress {
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 5;
  width: 90%;
  max-width: 600px;
}

.mc-dot {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.mc-dot:hover {
  background: rgba(255,255,255,0.4);
}

.mc-dot.active {
  background: white;
  box-shadow: 0 0 8px rgba(255,255,255,0.5);
}

.mc-content-wrapper {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.mc-nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.mc-nav-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.4);
}

.mc-content {
  flex: 1;
  text-align: center;
  padding: 0 40px;
  max-width: 800px;
  margin: 0 auto;
}

.mc-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mc-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 32px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.8);
  background: var(--accent);
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin-bottom: 32px;
  box-shadow: 0 8px 24px var(--accent-soft);
}

.mc-desc {
  font-size: clamp(20px, 3vw, 28px);
  line-height: 1.4;
  font-weight: 600;
  color: white;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 640px) {
  .milestone-carousel {
    padding: 50px 16px 36px;
    min-height: auto;
  }
  .mc-content-wrapper {
    gap: 20px;
  }
  .mc-nav-btn {
    width: 38px;
    height: 38px;
  }
  .mc-content {
    padding: 0 8px;
  }
  .mc-badge {
    font-size: 18px;
    padding: 8px 20px;
    margin-bottom: 20px;
  }
  .mc-desc {
    font-size: 18px;
  }
}

/* =======================================
   Premium Vision / Mission Cards
   ======================================= */
.vm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 40px;
}

.vm-card-premium {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 20px 40px rgba(0,0,0,0.06);
  cursor: pointer;
  background: white;
}

.vm-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.vm-card-premium:hover .vm-bg {
  transform: scale(1.05);
}

/* Vision uses a light overlay so text is dark */
.vm-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0) 100%);
  z-index: 2;
  transition: opacity 0.4s ease;
}

.vm-content {
  position: relative;
  z-index: 3;
  padding: 48px;
  color: var(--ink);
  transform: translateY(16px);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.vm-card-premium:hover .vm-content {
  transform: translateY(0);
}

.vm-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(8px);
  color: var(--ink);
}

.vm-content p {
  font-family: var(--serif);
  font-size: clamp(28px, 3.5vw, 42px);
  line-height: 1.25;
  font-weight: 400;
  margin: 0;
}

/* Mission uses a rich golden overlay so text is white */
.vm-card-premium.vm-mission .vm-overlay {
  background: linear-gradient(to top, rgba(9, 64, 123,1) 0%, rgba(9, 64, 123,0.8) 40%, rgba(9, 64, 123,0) 100%);
}

.vm-card-premium.vm-mission .vm-content {
  color: white;
}

.vm-card-premium.vm-mission .vm-badge {
  border-color: rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.15);
  color: white;
}

@media (max-width: 960px) {
  .vm-grid {
    grid-template-columns: 1fr;
  }
  .vm-card-premium {
    min-height: 400px;
  }
}


/* =======================================
   Premium Leadership Team (Horizontal)
   ======================================= */
.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 48px;
}
.team-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 12px 36px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0,0,0,0.03);
  align-items: stretch;
}
.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(9, 64, 123, 0.15);
}
.team-photo {
  width: 260px;
  flex-shrink: 0;
  position: relative;
}
.team-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.team-body {
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.team-body h3 {
  font-family: var(--serif);
  font-size: 28px;
  margin-bottom: 6px;
  color: var(--ink);
}
.team-role {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
}
.team-body p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.65;
}

@media (max-width: 1100px) {
  .team-grid {
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: 48px auto 0;
  }
}
@media (max-width: 640px) {
  .team-card {
    flex-direction: column;
  }
  .team-photo {
    width: 100%;
    height: 300px;
  }
  .team-body {
    padding: 32px 24px;
  }
}


</style>