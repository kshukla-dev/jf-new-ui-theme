<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import GlobalCTA from '@/components/sections/GlobalCTA.vue'
import { fetchAllBlogs, fetchCategories } from '@/services/blog'
import { formatBlogDate } from '@/utils/blog'
import type { BlogPost, Category } from '@/types/blog'
import blogData from '@/data/blog.json'

const blogs = ref<BlogPost[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const openFaq = ref(0)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? -1 : i
}

const searchQuery = ref('')
const manualCategories = [
  { name: 'EOR', count: 11 },
  { name: 'Payroll', count: 13 },
  { name: 'Immigration', count: 6 },
  { name: 'Global Hiring', count: 7 },
  { name: 'Bank Holiday', count: 3 },
  { name: 'Contractor', count: 6 },
  { name: 'Leave', count: 6 },
  { name: 'Talent Acquisition', count: 7 },
  { name: 'Global Mobility', count: 4 },
  { name: 'Visa Sponsorship', count: 6 },
  { name: 'Contractor Management', count: 2 },
  { name: 'Employee Benefits', count: 2 },
  { name: 'Compliance', count: 1 },
  { name: 'MSP', count: 1 },
]

const selectedCategoryName = ref<string>('')

// Toolbar scroll state
const toolbarRef = ref<HTMLElement | null>(null)
function scrollTabs(direction: 'left' | 'right') {
  if (!toolbarRef.value) return
  const scrollAmount = 300
  if (direction === 'left') {
    toolbarRef.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  } else {
    toolbarRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

// Newsletter signup state
const newsletterEmail = ref('')
const newsletterStatus = ref<'idle' | 'sending' | 'ok' | 'error'>('idle')
const showAllArticles = ref(false)

const sortedBlogs = computed(() =>
  [...blogs.value].sort((a, b) => {
    const da = a.publish_date ? +new Date(a.publish_date) : 0
    const db = b.publish_date ? +new Date(b.publish_date) : 0
    return (Number.isNaN(db) ? 0 : db) - (Number.isNaN(da) ? 0 : da)
  })
)

const filteredBlogs = computed(() => {
  let list = sortedBlogs.value
  if (selectedCategoryName.value) {
    const target = selectedCategoryName.value.toLowerCase()
    list = list.filter(b => {
      const catName = blogCategory(b).toLowerCase()
      if (catName === target) return true
      const slugified = target.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      if (b.category_ids?.toLowerCase().includes(slugified)) return true
      return false
    })
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(b => b.title.toLowerCase().includes(q) || (b.excerpt && b.excerpt.toLowerCase().includes(q)))
  }
  return list
})

// Resolve category id → category_name (CMS returns id strings on each blog)
const categoryById = computed(() => {
  const map = new Map<string, string>()
  for (const c of categories.value) map.set(String(c.id), c.category_name)
  return map
})

function blogCategory(b: BlogPost): string {
  const first = (b.category_ids ?? '').split(',')[0]?.trim()
  if (!first) return 'Insights'
  return categoryById.value.get(first) ?? 'Insights'
}

function getCatId(b: BlogPost): number {
  const first = (b.category_ids ?? '').split(',')[0]?.trim()
  return first ? parseInt(first) : 0
}

onMounted(async () => {
  try {
    const [bs, cats] = await Promise.all([fetchAllBlogs(), fetchCategories()])
    blogs.value = bs
    categories.value = cats
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load blogs'
  } finally {
    loading.value = false
  }
})

async function submitNewsletter(e: Event) {
  e.preventDefault()
  if (!newsletterEmail.value.trim()) return
  newsletterStatus.value = 'sending'
  try {
    const res = await fetch('/api/v1/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newsletterEmail.value.trim() }),
    })
    newsletterStatus.value = res.ok ? 'ok' : 'error'
    if (res.ok) newsletterEmail.value = ''
  } catch {
    newsletterStatus.value = 'error'
  }
}
</script>

<template>
  <div class="blog-page-wrapper">
    <!-- ============= HERO WITH MAP BACKGROUND ============= -->
    <header class="blog-hero">
      <div class="container blog-hero-inner">
        <div class="blog-hero-content">
          <h1 class="blog-hero-title">Insights, Trends &<br><em style="color: #F7931E; font-style: normal;">Global Hiring Intelligence</em></h1>
          <p class="blog-hero-subtitle">
            Expert insights on EOR, global hiring, compliance, payroll, visas, and workforce management.
          </p>
          <div class="blog-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" v-model="searchQuery" placeholder="Search articles..." />
          </div>
        </div>

        <div class="hero-floating-cards">
          <!-- Card 1 -->
          <RouterLink to="/blog" class="float-card card-1">
            <div class="float-card-img-wrap"><img src="/services/service-page/global-hiring-j&f.jpg" alt="Global Hiring" class="float-card-img" /></div>
            <div class="float-card-body">
              <span class="float-card-cat text-cat-4">Global Hiring</span>
              <h4 class="float-card-title">Top 10 Global Hiring Trends to Watch in 2026</h4>
              <span class="float-card-time">5 min read</span>
            </div>
          </RouterLink>
          
          <!-- Card 2 -->
          <RouterLink to="/blog" class="float-card card-2">
            <div class="float-card-img-wrap"><img src="/services/service-page/immigration.webp" alt="Visas" class="float-card-img" /></div>
            <div class="float-card-body">
              <span class="float-card-cat text-cat-4">Visas & Mobility</span>
              <h4 class="float-card-title">Work Visa Guide for Europe 2026</h4>
              <span class="float-card-time">6 min read</span>
            </div>
          </RouterLink>

          <!-- Card 3 -->
          <RouterLink to="/blog" class="float-card card-3">
            <div class="float-card-img-wrap"><img src="/services/main-page/compliance.webp" alt="Compliance" class="float-card-img" /></div>
            <div class="float-card-body">
              <span class="float-card-cat text-cat-4">Compliance</span>
              <h4 class="float-card-title">2026 Compliance Updates You Should Know</h4>
              <span class="float-card-time">4 min read</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- ============= TOOLBAR & GRID ============= -->
    <section class="section container">
      <div class="toolbar-slider-wrap">
        <button class="slider-btn left" @click="scrollTabs('left')" aria-label="Scroll left">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        
        <div class="blog-toolbar" ref="toolbarRef">
          <button class="filter-pill" :class="{ active: selectedCategoryName === '' }" @click="selectedCategoryName = ''">
            All Categories
            <span class="count-badge">60</span>
          </button>
          <button 
            v-for="(cat, idx) in manualCategories" 
            :key="idx" 
            class="filter-pill"
            :class="{ active: selectedCategoryName === cat.name }"
            @click="selectedCategoryName = cat.name"
          >
            {{ cat.name }}
           <!-- <span class="count-badge">{{ cat.count }}</span> -->
          </button>
        </div>

        <button class="slider-btn right" @click="scrollTabs('right')" aria-label="Scroll right">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <div v-if="loading" class="blog-main-layout">
        <!-- LEFT COLUMN: Skeleton -->
        <div class="blog-main-content">
          <div class="section-heading">
            <div class="skeleton-box" style="width: 20px; height: 20px; border-radius: 4px;"></div>
            <div class="skeleton-box" style="width: 200px; height: 32px; border-radius: 4px;"></div>
          </div>
          
          <div class="featured-card">
            <div class="featured-card-body">
               <div class="skeleton-box" style="width: 80px; height: 24px; border-radius: 12px; margin-bottom: 24px;"></div>
               <div class="skeleton-box" style="width: 90%; height: 32px; border-radius: 4px; margin-bottom: 12px;"></div>
               <div class="skeleton-box" style="width: 60%; height: 32px; border-radius: 4px; margin-bottom: 24px;"></div>
               <div class="skeleton-box" style="width: 100%; height: 80px; border-radius: 4px; margin-bottom: 32px;"></div>
               <div class="skeleton-box" style="width: 140px; height: 20px; border-radius: 4px;"></div>
            </div>
            <div class="featured-card-img-wrap skeleton-box">
            </div>
          </div>

          <div class="section-heading mt-40">
            <div class="skeleton-box" style="width: 180px; height: 32px; border-radius: 4px;"></div>
          </div>

          <div class="blog-grid">
            <div v-for="i in 4" :key="i" class="blog-card">
              <div class="blog-card-inner">
                <div class="blog-card-img-wrap skeleton-box"></div>
                <div class="blog-card-body">
                  <div class="skeleton-box" style="width: 60px; height: 16px; margin-bottom: 16px; border-radius: 4px;"></div>
                  <div class="skeleton-box" style="width: 100%; height: 24px; margin-bottom: 8px; border-radius: 4px;"></div>
                  <div class="skeleton-box" style="width: 80%; height: 24px; margin-bottom: 16px; border-radius: 4px;"></div>
                  <div class="skeleton-box" style="width: 100%; height: 40px; border-radius: 4px; margin-bottom: 16px;"></div>
                  <div style="display: flex; gap: 16px;">
                    <div class="skeleton-box" style="width: 60px; height: 14px; border-radius: 4px;"></div>
                    <div class="skeleton-box" style="width: 80px; height: 14px; border-radius: 4px;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Skeleton Sidebar -->
        <aside class="blog-sidebar">
          <div class="trending-widget">
            <div class="skeleton-box" style="width: 150px; height: 24px; margin-bottom: 24px; border-radius: 4px;"></div>
            <div class="trending-list">
              <div v-for="i in 3" :key="i" class="trending-item">
                <div class="trending-img-wrap skeleton-box"></div>
                <div class="trending-info">
                  <div class="skeleton-box" style="width: 100%; height: 16px; margin-bottom: 8px; border-radius: 4px;"></div>
                  <div class="skeleton-box" style="width: 70%; height: 16px; margin-bottom: 8px; border-radius: 4px;"></div>
                  <div class="skeleton-box" style="width: 40px; height: 12px; border-radius: 4px;"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <p v-else-if="error" class="blog-error">
        Couldn't load articles right now. Please refresh.
      </p>

      <div v-else-if="filteredBlogs.length === 0" class="blog-error">
        No articles found matching your search.
      </div>

      <div v-else class="blog-main-layout">
        <!-- LEFT COLUMN: Main Articles -->
        <div class="blog-main-content">
          <div class="section-heading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <h2>Featured Insight</h2>
          </div>
          
          <!-- Featured Card (First blog) -->
          <RouterLink v-if="filteredBlogs.length > 0" :to="`/blog/${filteredBlogs[0].slug}`" class="featured-card">
            <div class="featured-card-body">
               <span class="featured-tag">FEATURED</span>
               <h3 class="featured-title">{{ filteredBlogs[0].title }}</h3>
               <p class="featured-excerpt">{{ filteredBlogs[0].excerpt }}</p>
               <span class="btn-accent">Read Article &rarr;</span>
            </div>
            <div class="featured-card-img-wrap">
              <img v-if="filteredBlogs[0].image_url" :src="filteredBlogs[0].image_url" :alt="filteredBlogs[0].title" class="featured-card-img" />
              <!-- Mock globe vectors as placeholder -->
              <div class="featured-globe-overlay"></div>
            </div>
          </RouterLink>

          <div class="section-heading mt-40">
            <h2>Latest Articles</h2>
          </div>

          <!-- Latest Articles Grid -->
          <div class="blog-grid">
            <RouterLink
              v-for="post in (showAllArticles ? filteredBlogs.slice(1) : filteredBlogs.slice(1, 4))"
              :key="post.id"
              :to="`/blog/${post.slug}`"
              class="blog-card"
            >
              <div class="blog-card-inner">
                <div class="blog-card-img-wrap">
                  <img v-if="post.image_url" :src="post.image_url" :alt="post.title" class="blog-card-img" loading="lazy" />
                </div>
                <div class="blog-card-body">
                  <span class="blog-card-cat" :class="'text-cat-' + (getCatId(post) % 5)">
                    {{ blogCategory(post) }}
                  </span>
                  <h3 class="blog-card-title">{{ post.title }}</h3>
                  <p class="blog-card-excerpt">{{ post.excerpt }}</p>
                  <div class="blog-card-meta">
                    <span class="blog-card-time"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 5 min read</span>
                    <span class="blog-card-date"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> {{ formatBlogDate(post.publish_date) }}</span>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
          
          <div class="view-all-center" v-if="filteredBlogs.length > 4">
            <button class="btn-outline-gold" @click="showAllArticles = !showAllArticles">
              {{ showAllArticles ? 'Show fewer articles &uarr;' : 'View all articles &rarr;' }}
            </button>
          </div>
        </div>

        <!-- RIGHT COLUMN: Sidebar -->
        <aside class="blog-sidebar">
          <div class="trending-wrapper">
            <div class="section-heading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" stroke="none"><path d="M12 2c0 0-4 4-4 9a4 4 0 0 0 8 0c0-5-4-9-4-9zm0 0c0 0 4 4 4 9a4 4 0 0 1-8 0c0-5 4-9 4-9z"/></svg>
              <h2>Trending Articles</h2>
            </div>
            <div class="sidebar-widget trending-widget">
              <div class="trending-list">
                <RouterLink v-for="(post, idx) in sortedBlogs.slice(0, 3)" :key="post.id" :to="`/blog/${post.slug}`" class="trending-item">
                  <div class="trending-img-wrap">
                     <img v-if="post.image_url" :src="post.image_url" class="trending-img"/>
                  </div>
                  <div class="trending-info">
                    <h4>{{ post.title }}</h4>
                    <span>5 min read</span>
                  </div>
                </RouterLink>
              </div>
              
            </div>
          </div>

          <div class="sidebar-widget newsletter-widget">
            <div class="section-heading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <h2>Stay Updated</h2>
            </div>
            <p>Subscribe to get the latest insights on global hiring and compliance.</p>
            <form @submit="submitNewsletter" class="sidebar-newsletter-form">
              <input v-model="newsletterEmail" type="email" placeholder="Enter your email" required :disabled="newsletterStatus === 'sending'" />
              <button type="submit" class="btn-primary" :disabled="newsletterStatus === 'sending'">Subscribe</button>
            </form>
            <p v-if="newsletterStatus === 'ok'" class="newsletter-msg ok">Subscribed successfully!</p>
            <p v-if="newsletterStatus === 'error'" class="newsletter-msg error">Something went wrong.</p>
          </div>

          <div class="sidebar-widget topics-widget">
            <div class="section-heading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <h2>Popular Topics</h2>
            </div>
            <ul class="topic-list">
              <li v-for="cat in manualCategories.slice(0, 5)" :key="cat.name" @click="selectedCategoryName = cat.name">
                <span>{{ cat.name }}</span>
                <span class="topic-count">{{ cat.count }}</span>
              </li>
            </ul>
            <button class="btn-link-small" @click="selectedCategoryName = ''">View all topics &rarr;</button>
          </div>
        </aside>
      </div>
    </section>

    <!-- ============= EXPLORE RESOURCES BANNER ============= -->
    <section class="container mb-80">
      <div class="resources-banner">
        <div class="resources-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        </div>
        <div class="resources-text">
          <h3>Explore In-Depth Resources</h3>
          <p>Access guides, checklists, and reports to help you build and manage your global workforce.</p>
        </div>
        <RouterLink to="/resources" class="btn-primary">Browse Resources &rarr;</RouterLink>
      </div>
    </section>

    <!-- ============= FAQ SECTION ============= -->
    <section class="section faq-section">
      <div class="container">
        <div class="faq-block">
          <div class="faq-head">
            <h2 class="section-title" v-html="blogData.faqs.title"></h2>
          </div>
          <div class="faq-list">
            <button 
              v-for="(faq, i) in blogData.faqs.items" 
              :key="i" 
              class="faq-item"
              :class="{ open: openFaq === i }"
              @click="toggleFaq(i)"
              :aria-expanded="openFaq === i"
            >
              <span class="faq-q">{{ faq.question }}</span>
              <span class="faq-toggle">{{ openFaq === i ? '−' : '+' }}</span>
              <p v-show="openFaq === i" class="faq-a">{{ faq.answer }}</p>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ============= CTA ============= -->
    <GlobalCTA title="Ready to scale your global workforce?" />
  </div>
</template>

<style scoped>
/* ============= HERO WITH MAP BACKGROUND ============= */
.blog-hero {
  background-color: #0E0F3B;
  padding: 200px 0 80px;
  position: relative;
  overflow: hidden;

  padding-inline: clamp(32px, 8vw, 96px);}
.blog-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #0e0f3b 0%, rgba(14, 15, 59, 0.9) 35%, transparent 100%);
  z-index: 1;
}
.blog-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/services/service-page/map.png');
  background-size: contain;
  background-position: 100% center;
  background-repeat: no-repeat;
  filter: invert(1) grayscale(1) brightness(1.5);
  mix-blend-mode: screen;
  opacity: 0.35;
  z-index: 0;
}
.blog-hero-inner {
  position: relative;
  z-index: 2;
  display: flex;
}
.blog-hero-content {
  max-width: 580px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}
.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 99px;
  background: rgba(14, 15, 59, 0.1);
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.blog-hero-title {
  font-family: var(--serif);
  font-size: clamp(36px, 4vw, 56px);
  line-height: 1.15;
  color: #ffffff;
}
.blog-hero-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}
.blog-search {
  position: relative;
  margin-top: 10px;
  width: 100%;
  max-width: 400px;
}
.blog-search svg {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
}
.blog-search input {
  width: 100%;
  padding: 16px 20px 16px 48px;
  border-radius: 99px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-family: var(--sans);
  font-size: 14px;
  outline: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.blog-search input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.blog-search input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(14, 15, 59, 0.15);
}

/* Hero Floating Cards */
.hero-floating-cards {
    position: absolute;
    right: -20px;
    top: 0;
    bottom: 0;
    width: 55%;
    max-width: 700px;
    pointer-events: none;
    z-index: 2;
}
.float-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 6px 12px 6px 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 12px 30px rgba(14, 15, 59, 0.08);
  pointer-events: auto;
  text-decoration: none;
  color: var(--ink);
  transition: transform 0.3s, box-shadow 0.3s;
  width: max-content;
  max-width: 220px;
}
.float-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(14, 15, 59, 0.12);
}
.float-card-img-wrap {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f0f0f0;
}
.float-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.float-card-body {
  display: flex;
  flex-direction: column;
}
.float-card-cat {
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}
.float-card-title {
  font-family: var(--sans);
  font-size: 10px;
  line-height: 1.3;
  margin-bottom: 2px;
}
.float-card-time {
  font-size: 9px;
  color: var(--ink-muted);
}
.card-1 { top: 20%; right: 0%; }
.card-2 { top: 48%; left: 15%; }
.card-3 { bottom: 12%; right: 15%; }


/* ============= TOOLBAR ============= */
.toolbar-slider-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    background: #ffffff;
    padding: 8px 16px;
    border-radius: 100px;
    border: 1px solid rgb(14 15 59 / 25%);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
    margin-top: 2rem;
}
.blog-toolbar {
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  padding: 8px 0;
  flex: 1;
}
.blog-toolbar::-webkit-scrollbar {
  display: none;
}
.slider-btn {
  background: #f4f5f7;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ink-soft);
  flex-shrink: 0;
  transition: all 0.2s;
}
.slider-btn.left { margin-right: 12px; }
.slider-btn.right { margin-left: 12px; }
.slider-btn:hover {
  background: #e2e4e8;
  color: var(--ink);
}
.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--sans);
  background: transparent;
  border: none;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.filter-pill:hover {
  background: rgba(0, 0, 0, 0.03);
  color: var(--ink);
}
.filter-pill.active {
  background: var(--accent); /* using theme accent color for active state */
  color: #ffffff;
}

.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.06);
  color: var(--ink-soft);
  font-size: 11px;
  font-weight: 600;
  border-radius: 99px;
  padding: 2px 8px;
  min-width: 24px;
}
.resources-text p {
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.5;
}

/* FAQ Typography Standardizations */
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

.filter-pill.active .count-badge {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}
.text-cat-2 { color: #1A8A47; }
.text-cat-3 { color: #7B4FB3; }
.text-cat-4 { color: var(--accent); }

/* ============= MAIN LAYOUT ============= */
.blog-main-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 40px;
  margin-bottom: 80px;
}
.section-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.section-heading h2 {
  font-family: var(--sans);
  font-size: 20px;
  
  color: var(--ink);
}
.mt-40 { margin-top: 48px; }

/* ============= FEATURED CARD ============= */
.featured-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 420px;
}
.featured-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(14, 15, 59, 0.1);
}
.featured-card-body {
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.featured-tag {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.featured-title {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 32px);
  
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 16px;
}
.featured-excerpt {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 90%;
}
.btn-accent {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  background: var(--accent);
  color: var(--btn-text, #ffffff);
  font-size: 14px;
  font-weight: 600;
  transition: transform 0.2s, background 0.2s;
}
.btn-accent:hover {
  background: var(--ink);
  transform: translateY(-2px);
}
.featured-card-img-wrap {
  position: relative;
  background: #fdfaf5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.featured-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  mask-image: linear-gradient(to right, transparent, black 40%);
}
.featured-globe-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(247, 241, 230, 0.8) 100%);
}

/* ============= ARTICLES GRID ============= */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.blog-card {
  text-decoration: none;
  display: block;
}
.blog-card-inner {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.blog-card:hover .blog-card-inner {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.06);
}
.blog-card-img-wrap {
  aspect-ratio: 16 / 9;
  background: #f3f3f3;
  overflow: hidden;
}
.blog-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.blog-card:hover .blog-card-img {
  transform: scale(1.05);
}
.blog-card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.blog-card-cat {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}
.blog-card-title {
  font-family: var(--serif);
  font-size: 20px;
  
  line-height: 1.3;
  color: var(--ink);
  margin-bottom: 12px;
}
.blog-card-excerpt {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.blog-card-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: var(--ink-muted);
  font-weight: 500;
}
.blog-card-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}
.view-all-center {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.btn-outline-gold {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-outline-gold:hover {
  background: var(--accent-soft);
}

/* ============= SIDEBAR ============= */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.sidebar-widget {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}
.btn-link-small {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  padding: 0;
  margin-top: 20px;
}

/* Trending List */
.trending-widget {
  height: 420px;
  display: flex;
  flex-direction: column;
}
.trending-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.trending-item {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 16px;
  align-items: center;
  text-decoration: none;
  color: var(--ink);
}
.trending-item:hover h4 { color: var(--accent); }
.trending-img-wrap {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: #f0f0f0;
  overflow: hidden;
}
.trending-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.trending-info h4 {
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 4px;
  transition: color 0.2s;
}
.trending-info span {
  font-size: 12px;
  color: var(--ink-muted);
}

/* Newsletter Widget */
.newsletter-widget p {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 16px;
}
.sidebar-newsletter-form {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.sidebar-newsletter-form input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 13px;
  outline: none;
  min-width: 0;
}
.sidebar-newsletter-form input:focus {
  border-color: var(--accent);
}
.sidebar-newsletter-form .btn-primary {
  width: auto;
  padding: 10px 16px;
  background: var(--accent-warm);
  color: var(--btn-text, #fff);
  border-radius: 8px;
  font-size: 13px;
}
.sidebar-newsletter-form .btn-primary:hover {
  background: var(--ink);
}

/* Topics Widget */
.topic-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.topic-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--ink-soft);
  cursor: pointer;
  padding: 6px 0;
  transition: color 0.2s;
}
.topic-list li:hover { color: var(--accent); }
.topic-count {
  font-size: 12px;
  background: rgba(0, 0, 0, 0.04);
  padding: 2px 8px;
  border-radius: 99px;
  color: var(--ink-muted);
}

/* ============= RESOURCES BANNER ============= */
.resources-banner {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}
.resources-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  box-shadow: 0 4px 16px rgba(14, 15, 59, 0.1);
  flex-shrink: 0;
}
.resources-text { flex: 1; }
.resources-text h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 8px;
}
.resources-text p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* ============= RESPONSIVE ============= */
@media (max-width: 1440px) {
  .hero-floating-cards {
    width: 45%;
  }
  .float-card {
    max-width: 200px;
  }
  .card-1 { top: 20%; right: 10%; }
  .card-2 { top: 50%; left: 5%; }
  .card-3 { bottom: 10%; right: 20%; }
}
@media (max-width: 1280px) {
  .blog-hero {
    padding: 160px 0 80px;
  
  padding-inline: clamp(32px, 8vw, 96px);}
  .blog-hero-content {
    max-width: 500px;
  }
  .hero-floating-cards {
    width: 40%;
  }
  .float-card {
    max-width: 180px;
  }
  .float-card-img-wrap {
    width: 36px;
    height: 36px;
  }
  .float-card-title {
    font-size: 9px;
  }
  .card-1 { top: 20%; right: 5%; }
  .card-2 { top: 50%; left: 0%; }
  .card-3 { bottom: 10%; right: 10%; }
}
@media (max-width: 1024px) {
  .hero-floating-cards { display: none; }
  .blog-main-layout {
    grid-template-columns: 1fr;
  }
  .blog-hero {
    padding: 100px 0 60px;
  
  padding-inline: clamp(32px, 8vw, 96px);}
  .resources-banner {
    flex-direction: column;
    text-align: center;
    padding: 32px;
  }
  .featured-card,
  .trending-widget {
    height: auto;
  }
}
@media (max-width: 768px) {
  .blog-hero {
    min-height: auto;
    padding: 260px 20px 60px;
    background-image: none;
    background-color: #0E0F3B;
  
  padding-inline: clamp(32px, 8vw, 96px);}
  .blog-hero::before {
    background: url('/services/service-page/map.png');
    background-size: 150% auto;
    background-position: top center;
    background-repeat: no-repeat;
    bottom: auto;
    height: 280px;
    -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  }
  .blog-hero-inner {
    padding-left: 0;
    padding-right: 0;
  }
  .featured-card {
    grid-template-columns: 1fr;
  }
  .featured-card-body {
    padding: 24px;
  }
  .featured-title {
    font-size: 24px;
  }
  .featured-card-img-wrap {
    aspect-ratio: 16 / 9;
    order: -1;
  }
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .toolbar-slider-wrap {
    padding: 6px 8px;
    border-radius: 24px;
    margin-bottom: 32px;
  }
  .slider-btn {
    width: 28px;
    height: 28px;
  }
  .slider-btn.left { margin-right: 8px; }
  .slider-btn.right { margin-left: 8px; }
  .blog-toolbar {
    gap: 8px;
  }
  .filter-pill {
    padding: 8px 14px;
    font-size: 12px;
  }
  .count-badge {
    padding: 2px 6px;
    min-width: 20px;
  }
  .sidebar-newsletter-form {
    flex-direction: column;
  }
  .sidebar-newsletter-form .btn-primary {
    width: 100%;
  }
}

/* ============= FAQ ============= */
.faq-section {
  padding: 80px 0;
}
.faq-block {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
@media (max-width: 900px) {
  .faq-block {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
.faq-list {
  display: flex;
  flex-direction: column;
}
.faq-item {
  text-align: left;
  background: transparent;
  border: none;
  border-top: 1px solid #e2e8f0;
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
  border-bottom: 1px solid #e2e8f0;
}
.faq-q {
  font-family: var(--serif);
  font-size: 22px;
  line-height: 1.3;
  color: var(--ink);
  transition: color 0.2s, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.faq-item:hover .faq-q {
  color: var(--accent);
  transform: translateX(6px);
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
</style>

<style>
/* ============= SKELETON LOADING ============= */
.skeleton-box {
  background-color: #e2e5e9;
  position: relative;
  overflow: hidden;
}
.skeleton-box::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.5) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translateX(-100%);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
