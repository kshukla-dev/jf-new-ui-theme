<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import caseData from '@/data/case-studies.json'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const study = computed(() =>
  caseData.caseStudies.find((c) => c.slug === slug.value) ?? null
)

const others = computed(() =>
  caseData.caseStudies.filter((c) => c.slug !== slug.value).slice(0, 2)
)

watch(study, (s) => {
  if (s) document.title = `${s.title} - Jackson & Frank`
}, { immediate: true })
watch(slug, () => window.scrollTo({ top: 0, behavior: 'smooth' }))
</script>

<template>
  <article v-if="study" class="cs-detail">
    <!-- Breadcrumb -->
    <nav class="container cs-breadcrumb">
      <RouterLink to="/">Home</RouterLink>
      <span class="sep">/</span>
      <RouterLink to="/case-studies">Case studies</RouterLink>
      <span class="sep">/</span>
      <span class="current">{{ study.title }}</span>
    </nav>

    <!-- Header -->
    <header class="container cs-detail-header">
      <h1>{{ study.title }}</h1>
      <p class="cs-detail-excerpt">{{ study.excerpt }}</p>
    </header>

    <figure class="container cs-detail-hero">
      <img :src="study.image" :alt="study.title" />
    </figure>

    <!-- Results stats -->
    <section class="stats-strip">
      <div class="container stats-strip-inner">
        <div v-for="(r, i) in study.results" :key="i" class="stat-item">
          <strong>{{ r.metric }}</strong>
          <span class="stat-label">{{ r.label }}</span>
          <span class="stat-desc">{{ r.description }}</span>
        </div>
      </div>
    </section>

    <!-- Body -->
    <div class="container cs-detail-body">
      <div class="cs-section">
        <span class="tag">{{ study.background.title }}</span>
        <p>{{ study.background.content }}</p>
      </div>
      <div class="cs-section">
        <span class="tag">{{ study.problem.title }}</span>
        <p>{{ study.problem.content }}</p>
      </div>
      <div class="cs-section">
        <span class="tag">{{ study.solution.title }}</span>
        <p>{{ study.solution.content }}</p>
      </div>

      <!-- Testimonial -->
      <blockquote class="cs-quote">
        "{{ study.testimonial }}"
        <footer>
          <strong>{{ study.clientName }}</strong>
          <span>{{ study.clientRole }}</span>
        </footer>
      </blockquote>
    </div>

    <!-- Other case studies -->
    <section v-if="others.length" class="section container">
      <h2 class="section-title">More <em>stories</em></h2>
      <div class="cs-other-grid">
        <RouterLink
          v-for="o in others"
          :key="o.id"
          :to="`/case-studies/${o.slug}`"
          class="cs-other-card"
        >
          <div class="cs-other-img"><img :src="o.image" :alt="o.title" loading="lazy" /></div>
          <div class="cs-other-body">
            <span class="cs-other-meta">{{ o.industry }}</span>
            <h3>{{ o.title }}</h3>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="cta-warm-wrap">
      <div class="cta-warm">
        <span class="cta-tag">Get started</span>
        <h2>Ready for a similar <em>outcome?</em></h2>
        <p>Tell us your expansion plan and we'll outline a tailored approach.</p>
        <div class="cta-warm-buttons">
          <RouterLink to="/contact" class="btn-primary">
            Get a proposal <span class="arrow">→</span>
          </RouterLink>
          <RouterLink to="/case-studies" class="btn-secondary">All case studies</RouterLink>
        </div>
      </div>
    </section>
  </article>

  <div v-else class="container cs-404">
    <h1 class="section-title">We couldn't find that <em>case study</em></h1>
    <RouterLink to="/case-studies" class="btn-primary">
      All case studies <span class="arrow">→</span>
    </RouterLink>
  </div>
</template>

<style scoped>
@import '@/styles/service-page.css';

.cs-detail { padding-top: 20px; }
.cs-breadcrumb {
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-muted);
  margin-bottom: 32px;
  align-items: center;
}
.cs-breadcrumb a { color: var(--ink-soft); }
.cs-breadcrumb a:hover { color: var(--accent); }
.cs-breadcrumb .current {
  color: var(--ink);
  max-width: 360px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cs-detail-header {
  max-width: 820px;
  margin: 0 auto 40px;
  text-align: center;
}
.cs-detail-header .tag { margin-bottom: 20px; }
.cs-detail-header h1 {
  font-family: var(--serif);
  font-size: clamp(34px, 4.5vw, 56px);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 24px;
}
.cs-detail-excerpt {
  font-size: 18px;
  color: var(--ink-soft);
  line-height: 1.55;
}
.cs-detail-hero {
  max-width: 1080px;
  margin: 0 auto 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: var(--accent-soft);
}
.cs-detail-hero img { width: 100%; height: 100%; object-fit: cover; }
.stats-strip { margin-top: 0; }
.cs-detail-body {
  max-width: 760px;
  margin: 80px auto 0;
}
.cs-section { margin-bottom: 48px; }
.cs-section .tag { margin-bottom: 12px; }
.cs-section p {
  font-size: 17px;
  color: var(--ink-soft);
  line-height: 1.7;
}
.cs-quote {
  margin: 56px 0 0;
  padding: 40px 48px;
  background: var(--ink);
  color: var(--bg);
  border-radius: var(--radius-lg);
  font-family: var(--serif);
  font-size: 24px;
  line-height: 1.4;
}
.cs-quote footer {
  margin-top: 24px;
  font-family: var(--sans);
  font-size: 14px;
}
.cs-quote footer strong { display: block; color: var(--accent-warm); }
.cs-quote footer span { color: rgba(255, 255, 255, 0.6); }

.cs-other-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 40px;
}
.cs-other-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  color: var(--ink);
  transition: transform 0.3s;
}
.cs-other-card:hover { transform: translateY(-3px); }
.cs-other-img { aspect-ratio: 16 / 9; overflow: hidden; background: var(--accent-soft); }
.cs-other-img img { width: 100%; height: 100%; object-fit: cover; }
.cs-other-body { padding: 24px; }
.cs-other-meta {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}
.cs-other-body h3 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 400;
  line-height: 1.25;
  margin-top: 8px;
}

.cs-404 { padding: 200px 0 120px; text-align: center; }
.cs-404 .tag { margin-bottom: 12px; }
.cs-404 h1 { margin-bottom: 28px; }

@media (max-width: 900px) {
  .cs-other-grid { grid-template-columns: 1fr; }
  .cs-quote { padding: 32px 28px; font-size: 20px; }
}

@media (max-width: 768px) {
  .cs-breadcrumb {
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .cs-detail-header {
    margin-bottom: 32px;
  }
  .cs-detail-header h1 {
    font-size: 32px;
    margin-bottom: 16px;
  }
  .cs-detail-excerpt {
    font-size: 16px;
  }
  .cs-detail-body {
    margin: 48px auto 0;
  }
  .cs-section {
    margin-bottom: 32px;
  }
  .cs-quote {
    margin: 40px 0 0;
    padding: 24px;
    font-size: 18px;
    border-radius: var(--radius);
  }
  .cs-other-grid {
    margin-top: 24px;
  }
}
</style>
