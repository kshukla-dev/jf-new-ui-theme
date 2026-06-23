<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import GlobalCTA from '@/components/sections/GlobalCTA.vue'
import ev from '@/data/china-europe-event.json'

const carouselRef = ref<HTMLElement | null>(null)
const speakersLength = ev.speakers.length
const activeIndex = ref(speakersLength) // Start at the middle copy (index 4)

const displayedSpeakers = computed(() => {
  // Triple the speakers array for seamless infinite looping
  const tripled = [...ev.speakers, ...ev.speakers, ...ev.speakers]
  return tripled.map((sp, idx) => {
    return {
      ...sp,
      featured: idx === activeIndex.value
    }
  })
})

const selectSpeaker = (index: number) => {
  const totalLength = speakersLength * 3
  if (index >= 0 && index < totalLength) {
    activeIndex.value = index
    
    // 1. Smooth scroll to the targeted item
    setTimeout(() => {
      const track = carouselRef.value
      if (track) {
        const cards = track.querySelectorAll('.sp-card-new')
        const activeCard = cards[index] as HTMLElement
        if (activeCard) {
          const offsetLeft = activeCard.offsetLeft
          const trackWidth = track.clientWidth
          const cardWidth = activeCard.clientWidth
          
          track.scrollTo({
            left: offsetLeft - (trackWidth / 2) + (cardWidth / 2),
            behavior: 'smooth'
          })
        }
      }
    }, 60)

    // 2. Seamlessly jump to the middle copy once smooth scroll completes (approx 450ms)
    setTimeout(() => {
      const track = carouselRef.value
      if (track) {
        const cards = track.querySelectorAll('.sp-card-new')
        
        // If we scrolled into the first copy, jump instantly to the middle copy
        if (activeIndex.value < speakersLength) {
          activeIndex.value = activeIndex.value + speakersLength
          const activeCard = cards[activeIndex.value] as HTMLElement
          if (activeCard) {
            const offsetLeft = activeCard.offsetLeft
            const trackWidth = track.clientWidth
            const cardWidth = activeCard.clientWidth
            track.scrollTo({
              left: offsetLeft - (trackWidth / 2) + (cardWidth / 2),
              behavior: 'auto'
            })
          }
        }
        // If we scrolled into the third copy, jump instantly to the middle copy
        else if (activeIndex.value >= speakersLength * 2) {
          activeIndex.value = activeIndex.value - speakersLength
          const activeCard = cards[activeIndex.value] as HTMLElement
          if (activeCard) {
            const offsetLeft = activeCard.offsetLeft
            const trackWidth = track.clientWidth
            const cardWidth = activeCard.clientWidth
            track.scrollTo({
              left: offsetLeft - (trackWidth / 2) + (cardWidth / 2),
              behavior: 'auto'
            })
          }
        }
      }
    }, 550)
  }
}

const scrollLeft = () => {
  selectSpeaker(activeIndex.value - 1)
}

const scrollRight = () => {
  selectSpeaker(activeIndex.value + 1)
}

onMounted(() => {
  setTimeout(() => {
    selectSpeaker(speakersLength) // Center Pawel (index 4) on mount
  }, 300)
})
</script>

<template>
  <!-- HERO -->
  <header class="pr-hero">
    <div class="pr-hero-inner container">
      <!-- Left side -->
      <div class="pr-hero-copy">
       <h1 class="pr-hero-title">China to Europe 2026:<br><span class="gold-text">Scaling Beyond Borders</span></h1>
        <p class="pr-hero-desc">
          A one-day exclusive event bringing together business leaders, investors, and experts to explore opportunities, navigate complexities, and scale your business from China to Europe.
        </p>
        
        <div class="pr-details-grid">
          <div class="pr-detail-item">
            <div class="pr-detail-icon">
              <!-- Calendar icon -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div class="pr-detail-info">
              <strong>May 15, 2026</strong>
              <span>9:00 AM - 5:30 PM</span>
            </div>
          </div>
          
          <div class="pr-detail-item">
            <div class="pr-detail-icon">
              <!-- Pin icon -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div class="pr-detail-info">
              <strong>The Ritz-Carlton</strong>
              <span>Shanghai, China</span>
            </div>
          </div>

          <div class="pr-detail-item">
            <div class="pr-detail-icon">
              <!-- Group icon -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div class="pr-detail-info">
              <strong>200+</strong>
              <span>Business Leaders</span>
            </div>
          </div>
        </div>

        <div class="cta-row">
          <RouterLink to="/contact" class="btn-primary-gold">
            {{ ev.hero.ctaText || 'Register Your Interest' }} <span class="arrow">→</span>
          </RouterLink>
        </div>
      </div>
      
      <!-- Right side -->
      <div class="pr-hero-visual">
        <img src="/case-study/china-europe.png" alt="China to Europe 2026 event" />
      </div>
    </div>
  </header>  <!-- EVENT BACKGROUND -->
  <section class="section container">
    <div class="pr-background-grid">
      <!-- Left side: Text & Stats -->
      <div class="pr-bg-copy">
        <span class="tag">{{ ev.eventBackground.tag }}</span>
        <h2 class="pr-bg-title">{{ ev.eventBackground.title }}</h2>
        <div class="pr-bg-text">
          <p v-for="(p, i) in ev.eventBackground.paragraphs" :key="i">{{ p }}</p>
        </div>
        <!-- Stats row underneath -->
        <div class="pr-bg-stats">
          <div v-for="s in ev.eventBackground.stats" :key="s.label" class="pr-bg-stat-item">
            <div class="pr-stat-icon-circle">
              <!-- Render icon based on s.icon -->
              <svg v-if="s.icon === 'globe'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <svg v-else-if="s.icon === 'group'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <svg v-else-if="s.icon === 'chart'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              <svg v-else-if="s.icon === 'shield'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            </div>
            <div class="pr-stat-text-wrap">
              <strong>{{ s.value }}</strong>
              <span>{{ s.label }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Right side: Earth Graphic -->
      <div class="pr-bg-image-wrapper">
        <img src="/case-study/WhyChinaEurope.png" alt="Global expansion network" class="pr-bg-earth-image" />
      </div>
    </div>
  </section>

  <!-- JOURNEY SECTION -->
  <section class="journey-section">
    <div class="container text-center">
      <span class="journey-tag">{{ ev.journey.tag }}</span>
      <h2 class="journey-title">{{ ev.journey.title }}</h2>
      <p class="journey-subtitle">{{ ev.journey.subtitle }}</p>
      
      <div class="journey-grid">
        <div v-for="card in ev.journey.cards" :key="card.step" class="journey-card">
          <div class="journey-card-header">
            <div class="journey-icon-wrap">
              <svg v-if="card.icon === 'target'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
              <svg v-else-if="card.icon === 'gear'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <svg v-else-if="card.icon === 'chart'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <span class="journey-number">{{ card.step }}</span>
          </div>
          <span class="journey-card-cat">{{ card.category }}</span>
          <h3 class="journey-card-title">{{ card.title }}</h3>
          <p class="journey-card-desc">{{ card.description }}</p>
          <RouterLink to="/contact" class="journey-card-link">Learn more <span aria-hidden>→</span></RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- EXPECTATIONS -->
  <section class="expect-section container">
    <div class="text-center">
      <span class="expect-tag">{{ ev.expectations.tag }}</span>
      <h2 class="expect-title">{{ ev.expectations.title }}</h2>
    </div>
    
    <div class="expect-grid">
      <div v-for="item in ev.expectations.items" :key="item.title" class="expect-item">
        <div class="expect-icon-circle">
          <!-- Render icons -->
          <svg v-if="item.icon === 'person'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <svg v-else-if="item.icon === 'chat'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <svg v-else-if="item.icon === 'network'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          <svg v-else-if="item.icon === 'document'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <svg v-else-if="item.icon === 'people'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <svg v-else-if="item.icon === 'gift'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </section>

  <!-- SPEAKERS -->
  <section id="speakers" class="section container pr-speakers-section">
    <div class="speakers-section-grid">
      <!-- Top: heading -->
      <div class="speakers-left-info">
        <div class="speakers-head-text">
          <span class="tag">LEARN FROM LOCAL EXPERTS</span>
          <h2 class="speakers-main-title">Speakers &amp; <span class="gold-text">Experts</span></h2>
          <p class="speakers-desc-text">
            Industry leaders and local experts sharing real insights and actionable strategies for your expansion journey.
          </p>
        </div>
        <RouterLink to="/contact" class="btn-primary-gold">View All Speakers <span aria-hidden>→</span></RouterLink>
      </div>
      <!-- Right side: carousel wrapper -->
      <div class="speakers-carousel-wrapper">
        <button class="carousel-arrow prev" @click="scrollLeft" aria-label="Previous Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        
        <div class="speakers-carousel-track" ref="carouselRef">
          <div v-for="(sp, idx) in displayedSpeakers" :key="sp.name" :class="['sp-card-new', { 'featured-card': sp.featured }]" @click="selectSpeaker(idx)">
            <!-- Featured Card Layout -->
            <div v-if="sp.featured" class="featured-card-inner">
              <div class="featured-card-left">
                <img :src="sp.image" :alt="sp.name" class="featured-sp-photo" />
              </div>
              <div class="featured-card-right">
                <div class="featured-tag-wrap">
                  <span class="featured-tag">⭐ FEATURED SPEAKER</span>
                </div>
                <h3 class="sp-name">{{ sp.name }}</h3>
                <p class="sp-role-comp">{{ sp.role }}</p>
                <p class="sp-company-name">{{ sp.company }}</p>
                
                <div class="sp-meta-row">
                  <span class="sp-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="meta-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {{ sp.location }}
                  </span>
                  <span class="sp-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="meta-icon"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    {{ sp.experience }}
                  </span>
                </div>

                <div class="sp-badges">
                  <span v-for="badge in sp.badges" :key="badge" class="sp-badge">{{ badge }}</span>
                </div>

                <div v-if="sp.speakingTitle" class="speaking-details-box">
                  <div class="speaking-details-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <div class="speaking-details-text">
                    <p class="speaking-label">Speaking on</p>
                    <p class="speaking-title">{{ sp.speakingTitle }}</p>
                    <p class="speaking-time">{{ sp.speakingTime }}</p>
                  </div>
                </div>

                <a :href="sp.linkedin" class="linkedin-link">
                  <span class="linkedin-icon">in</span> View LinkedIn Profile <span class="arrow-diagonal">↗</span>
                </a>
              </div>
            </div>

            <!-- Standard Card Layout -->
            <div v-else class="standard-card-inner">
              <div class="standard-card-top">
                <img :src="sp.image" :alt="sp.name" class="standard-sp-photo" />
              </div>
              <div class="standard-card-body">
                <h3 class="sp-name">{{ sp.name }}</h3>
                <p class="sp-role-comp">{{ sp.role }}</p>
                <p class="sp-company-name">{{ sp.company }}</p>
                
                <div class="sp-meta-row">
                  <span class="sp-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="meta-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {{ sp.location }}
                  </span>
                  <span class="sp-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="meta-icon"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    {{ sp.experience }}
                  </span>
                </div>

                <div class="sp-badges">
                  <span v-for="badge in sp.badges" :key="badge" class="sp-badge">{{ badge }}</span>
                </div>

                <a :href="sp.linkedin" class="linkedin-link-standard">
                  <span class="linkedin-icon">in</span> View Profile <span class="arrow-diagonal">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-arrow next" @click="scrollRight" aria-label="Next Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>


  </section>

  <!-- ============= CTA ============= -->
  <GlobalCTA title="Ready to scale from China to Europe?" />

</template>

<style scoped>
@import '@/styles/service-page.css';

/* ============================================================
   HERO SECTION
   ============================================================ */
.pr-hero {
  background: #0e0f3b;
  padding: 60px 0 0;
  position: relative;
  overflow: hidden;
  color: #ffffff;
}
.pr-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
  z-index: 1;
}
.pr-hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
  align-items: center;
  min-height: 600px;
}
.pr-hero-copy {
  padding-top: 60px;
  padding-bottom: 80px;
  max-width: 580px;
  position: relative;
  z-index: 2;
}
.pr-hero-tag {
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
.pr-hero-title {
  font-family: var(--serif);
  font-size: clamp(38px, 4.5vw, 54px);
  line-height: 1.15;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 24px;
}
.pr-hero-title .gold-text {
  color: var(--accent-warm, #F7931E);
  font-weight: 500;
  font-family: var(--serif);
}
.pr-hero-desc {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 40px;
}
.pr-details-grid {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.pr-detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.pr-detail-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: rgba(9, 64, 123, 0.15);
  border: 1px solid rgba(9, 64, 123, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-sky, #7FCDEE);
  flex-shrink: 0;
}
.pr-detail-info {
  display: flex;
  flex-direction: column;
}
.pr-detail-info strong {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
}
.pr-detail-info span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 2px;
}
.btn-primary-gold {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #F7931E;
  color: #fff;
  border: none;
  padding: 16px 32px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(247, 147, 30, 0.35);
}
.btn-primary-gold:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.45);
}
.pr-hero-visual {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
}
.pr-hero-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left center;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%);
  mask-image: linear-gradient(to right, transparent 0%, #0e103ca3 15%)
}

/* ============================================================
   EVENT BACKGROUND
   ============================================================ */
.pr-background-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}
.pr-bg-copy {
  max-width: 600px;
}
.pr-bg-copy .tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--accent, #09407B);
  margin-bottom: 16px;
}
.pr-bg-title {
  font-family: var(--serif);
  font-size: clamp(32px, 3.5vw, 42px);
  color: #111;
  font-weight: 400;
  margin-bottom: 24px;
}
.pr-bg-text p {
  font-size: 15px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 16px;
}
.pr-bg-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 40px;
  border-top: 1px solid #e5e7eb;
  padding-top: 32px;
}
.pr-bg-stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.pr-stat-icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fdfaf5;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #143369;
}
.pr-stat-text-wrap {
  display: flex;
  flex-direction: column;
}
.pr-stat-text-wrap strong {
  font-size: 20px;
  font-weight: 700;
  color: #111;
  line-height: 1.2;
}
.pr-stat-text-wrap span {
  font-size: 11px;
  color: #777;
  margin-top: 4px;
}
.pr-bg-image-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 380px;
}
.pr-bg-earth-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ============================================================
   JOURNEY SECTION
   ============================================================ */
.journey-section {
  background: var(--accent-soft);
  padding: 100px 0;
}
.journey-tag {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #143369;
  margin-bottom: 16px;
  text-transform: uppercase;
}
.journey-title {
  font-family: var(--serif);
  font-size: clamp(32px, 3.5vw, 42px);
  color: #111;
  font-weight: 400;
  margin-bottom: 16px;
}
.journey-subtitle {
  font-size: 15px;
  color: #555;
  max-width: 600px;
  margin: 0 auto 64px;
  line-height: 1.6;
}
.journey-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
}
.journey-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 16px;
  padding: 40px 32px;
  text-align: left;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  transition: all 0.3s ease;
  position: relative;
}
.journey-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}
.journey-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.journey-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fdfaf5;
  border: 1px solid #e5e7eb;
  color: #143369;
  display: flex;
  align-items: center;
  justify-content: center;
}
.journey-number {
  font-size: 22px;
  font-family: var(--serif);
  color: #e5e7eb;
  font-weight: 700;
}
.journey-card-cat {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #143369;
  margin-bottom: 8px;
}
.journey-card-title {
  font-family: var(--serif);
  font-size: 20px;
  color: #111;
  font-weight: 500;
  margin-bottom: 12px;
}
.journey-card-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
}
.journey-card-link {
  font-size: 13px;
  font-weight: 700;
  color: #143369;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.journey-card-link:hover {
  color: #09407B;
}

/* Connector line decoration for desktop */
@media (min-width: 1025px) {
  .journey-card:not(:last-child)::after {
    content: '→';
    position: absolute;
    right: -24px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    color: #e5e7eb;
    pointer-events: none;
  }
}

/* ============================================================
   EXPECTATIONS SECTION
   ============================================================ */
.expect-section {
  padding: 100px 0;
}
.expect-tag {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #143369;
  margin-bottom: 16px;
  text-transform: uppercase;
}
.expect-title {
  font-family: var(--serif);
  font-size: clamp(32px, 3.5vw, 42px);
  color: #111;
  font-weight: 400;
  margin-bottom: 64px;
}
.expect-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
}
.expect-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.expect-icon-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #fdfaf5;
  border: 1px solid #e5e7eb;
  color: #143369;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.expect-item h3 {
  font-size: 15px;
  color: #111;
  font-weight: 600;
  margin-bottom: 8px;
}
.expect-item p {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

/* ============================================================
   SPEAKERS SECTION
   ============================================================ */
.pr-speakers-section {
  padding: 100px 0;
  overflow: hidden;
}
.speakers-section-grid {
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: stretch;
}
.speakers-left-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  max-width: 100%;
  width: 100%;
}
.speakers-head-text {
  max-width: 700px;
}
.speakers-left-info .tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #143369;
  margin-bottom: 16px;
}
.speakers-main-title {
  font-family: var(--serif);
  font-size: clamp(32px, 3.5vw, 42px);
  color: #111;
  font-weight: 400;
  margin-bottom: 16px;
}
.speakers-main-title .gold-text {
  color: #143369;
  font-family: var(--serif);
}
.speakers-desc-text {
  font-size: 15px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 0;
}
.speakers-carousel-wrapper {
  position: relative;
  width: 100%;
  padding: 0 48px;
}
.speakers-carousel-track {
  display: flex;
  flex-wrap: nowrap;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding: 12px 4px 24px;
  scrollbar-width: none; /* Firefox */
}
.speakers-carousel-track::-webkit-scrollbar {
  display: none; /* Safari & Chrome */
}
.sp-card-new {
  flex-shrink: 0;
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  overflow: hidden;
  scroll-snap-align: start;
}

/* Featured Speaker layout */
.featured-card {
  width: 480px;
}
.featured-card-inner {
  display: flex;
  height: 100%;
  gap: 20px;
}
.featured-card-left {
  width: 200px;
  height: 100%;
  flex-shrink: 0;
}
.featured-sp-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.featured-card-right {
  flex: 1;
  padding: 24px 24px 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.featured-tag-wrap {
  margin-bottom: 12px;
}
.featured-tag {
  font-size: 10px;
  font-weight: 800;
  color: #143369;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  padding: 4px 10px;
  border-radius: 12px;
  letter-spacing: 0.05em;
}

/* Standard Speaker layout */
.sp-card-new:not(.featured-card) {
  width: 240px;
}
.standard-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.standard-card-top {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #fdfaf5;
}
.standard-sp-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.standard-card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* Common Card Typography */
.featured-card .sp-name {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 500;
  color: #111;
  margin-bottom: 6px;
}
.sp-name {
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 500;
  color: #111;
  margin-bottom: 6px;
}
.sp-role-comp {
  font-size: 12px;
  font-weight: 500;
  color: #666;
  margin-bottom: 2px;
}
.sp-company-name {
  font-size: 12px;
  color: #888;
  margin-bottom: 12px;
}
.sp-meta-row {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
  margin-top: auto;
}
.sp-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #555;
}
.meta-icon {
  color: var(--accent, #09407B);
  flex-shrink: 0;
}
.sp-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.sp-badge {
  font-size: 10px;
  font-weight: 700;
  color: var(--accent, #09407B);
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

/* Speaking on Box */
.speaking-details-box {
  display: flex;
  gap: 12px;
  background: #f8fafc;
  border: 1px dashed #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  text-align: left;
}
.speaking-details-icon {
  color: var(--accent, #09407B);
  flex-shrink: 0;
  margin-top: 2px;
}
.speaking-details-text {
  display: flex;
  flex-direction: column;
}
.speaking-label {
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  color: #888;
}
.speaking-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent, #09407B);
  margin-top: 2px;
}
.speaking-time {
  font-size: 11px;
  color: #666;
  margin-top: 2px;
}

/* LinkedIn Link */
.linkedin-link {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent, #09407B);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1.5px solid #e5e7eb;
  padding: 10px 16px;
  border-radius: 8px;
  width: 100%;
  transition: all 0.2s ease;
  margin-top: 16px;
  background: #ffffff;
}
.linkedin-link:hover {
  background: #f8fafc;
  color: #0e254e;
}
.linkedin-link-standard {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent, #09407B);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  margin-top: auto;
  transition: color 0.2s ease;
}
.linkedin-link-standard:hover {
  color: #0e254e;
}
.linkedin-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background: var(--accent, #09407B);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  border-radius: 2px;
  line-height: 1;
}

/* Navigation Arrow Button Styling */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent, #09407B);
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.carousel-arrow:hover {
  background: #09407B;
  transform: translateY(-50%) scale(1.08);
}
.carousel-arrow.prev {
  left: 8px;
}
.carousel-arrow.next {
  right: 8px;
}

/* Bottom stats banner */
.speakers-stats-strip {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 40px 48px;
  margin-top: 80px;
  gap: 24px;
}
.stats-watermark-map {
  position: absolute;
  left: 0;
  top: 0;
  width: 40%;
  height: 100%;
  background-image: url('/world-map-dark.png');
  background-size: cover;
  background-position: left center;
  opacity: 0.05;
  filter: invert(0.85) sepia(1) saturate(1.8) hue-rotate(15deg);
  pointer-events: none;
  z-index: 1;
}
.s-stat-item {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}
.s-stat-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(9, 64, 123, 0.08);
  border: 1px solid #e5e7eb;
  color: var(--accent, #09407B);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.s-stat-info {
  display: flex;
  flex-direction: column;
}
.s-stat-info h3 {
  font-family: var(--serif);
  font-size: 32px;
  color: #111;
  font-weight: 500;
  line-height: 1.1;
}
.s-stat-info p {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  line-height: 1.4;
}

/* ============================================================
   REGISTER CTA
   ============================================================ */
.register-cta-strip {
  background: #0f1319;
  color: #fff;
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}
.register-cta-dotted-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
  opacity: 0.8;
  z-index: 1;
}
.register-cta-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
}
.reg-tag {
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--accent-sky, #7FCDEE);
  margin-bottom: 24px;
  text-transform: uppercase;
}
.register-cta-content h2 {
  font-family: var(--serif);
  font-size: clamp(32px, 4.5vw, 48px);
  line-height: 1.2;
  font-weight: 400;
  margin-bottom: 24px;
}
.register-cta-content p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  line-height: 1.6;
}
.btn-primary-gold-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #F7931E;
  color: #fff;
  border: none;
  padding: 18px 36px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}
.btn-primary-gold-cta:hover {
  background: #e07d10;
  transform: translateY(-2px);
}

/* ============================================================
   RESPONSIVE DESIGN / MEDIA QUERIES
   ============================================================ */
@media (max-width: 1024px) {
  .pr-hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0;
  }
  .pr-hero-copy {
    max-width: 100%;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pr-details-grid {
    justify-content: center;
  }
  .pr-hero-visual {
    position: relative;
    width: 100%;
    height: auto;
    order: -1;
    margin-bottom: 40px;
    justify-content: center;
  }
  .pr-hero-visual img {
    max-width: 100%;
    height: auto;
    transform: translateX(0);
    -webkit-mask-image: none;
    mask-image: none;
  }
  .pr-background-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .journey-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .expect-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .speakers-section-grid {
    gap: 32px;
  }
  .speakers-left-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
  }
  .speakers-stats-strip {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 32px;
    margin-top: 48px;
  }
}

@media (max-width: 768px) {
  .pr-bg-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .journey-grid {
    grid-template-columns: 1fr;
  }
  .expect-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .featured-card {
    width: 290px;
  }
  .featured-card-inner {
    flex-direction: column;
  }
  .featured-card-left {
    width: 100%;
    height: 200px;
  }
  .featured-card-right {
    padding: 20px;
  }
  .speakers-stats-strip {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 20px;
  }
  .pr-hero {
    min-height: auto;
    padding: 260px 20px 60px;
    background-size: cover;
    background-position: center;
    background-image: none;
    background-color: #0E0F3B;
  }
  .pr-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/case-study/china-europe.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .pr-hero-inner {
    padding-left: 0;
    padding-right: 0;
  }
  .pr-hero-visual {
    display: none;
  }
}
</style>
