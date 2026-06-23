const fs = require('fs');

const path = 'd:/J&F/Sanity/jf_vue/src/pages/BlogPage.vue';
let content = fs.readFileSync(path, 'utf8');

// 1. Replace the ref/computed section
const old_script = `const blogs = ref<BlogPost[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Newsletter signup state
const newsletterEmail = ref('')
const newsletterStatus = ref<'idle' | 'sending' | 'ok' | 'error'>('idle')

const sortedBlogs = computed(() =>
  [...blogs.value].sort((a, b) => {
    const da = a.publish_date ? +new Date(a.publish_date) : 0
    const db = b.publish_date ? +new Date(b.publish_date) : 0
    return (Number.isNaN(db) ? 0 : db) - (Number.isNaN(da) ? 0 : da)
  })
)

const featured = computed(() => sortedBlogs.value[0])
const recent = computed(() => sortedBlogs.value.slice(1, 7)) // up to 6 below the featured
const remaining = computed(() => sortedBlogs.value.slice(7))

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
}`;

const new_script = `const blogs = ref<BlogPost[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const searchQuery = ref('')
const selectedCategory = ref<string>('')

// Newsletter signup state
const newsletterEmail = ref('')
const newsletterStatus = ref<'idle' | 'sending' | 'ok' | 'error'>('idle')

const sortedBlogs = computed(() =>
  [...blogs.value].sort((a, b) => {
    const da = a.publish_date ? +new Date(a.publish_date) : 0
    const db = b.publish_date ? +new Date(b.publish_date) : 0
    return (Number.isNaN(db) ? 0 : db) - (Number.isNaN(da) ? 0 : da)
  })
)

const filteredBlogs = computed(() => {
  let list = sortedBlogs.value
  if (selectedCategory.value) {
    list = list.filter(b => {
      const first = String((b.category_ids ?? '').split(',')[0]?.trim())
      return first === String(selectedCategory.value)
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
}`;

content = content.replace(old_script, new_script);

// 2. Replace Template Section up to Newsletter
const template_start = content.indexOf('  <!-- ============= DARK HERO + FEATURED ============= -->');
const template_end = content.indexOf('  <!-- ============= NEWSLETTER ============= -->');

const new_template = `  <!-- ============= CLEAN HERO ============= -->
  <header class="blog-clean-hero">
    <div class="container blog-hero-inner">
      <div class="blog-hero-content">
        <span class="tag"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> Blog</span>
        <h1 class="blog-hero-title">Insight and Updates</h1>
        <p class="blog-hero-subtitle">
          A collection of hand-picked articles. Deep dives, insights, and honest advice to navigate the landscape.
        </p>
      </div>
    </div>
  </header>

  <!-- ============= TOOLBAR & GRID ============= -->
  <section class="section container">
    <div class="blog-toolbar">
      <div class="blog-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" v-model="searchQuery" placeholder="Search articles..." />
      </div>
      <div class="blog-filters">
        <button class="filter-pill" :class="{ active: selectedCategory === '' }" @click="selectedCategory = ''">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          All Articles
        </button>
        <button 
          v-for="cat in categories" 
          :key="cat.id" 
          class="filter-pill"
          :class="{ active: selectedCategory === String(cat.id) }"
          @click="selectedCategory = String(cat.id)"
        >
          <span class="cat-dot" :class="'bg-cat-' + (Number(cat.id) % 5)"></span>
          {{ cat.category_name }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="blog-grid">
      <div v-for="i in 6" :key="i" class="blog-card blog-card-skeleton">
        <div class="skeleton-shimmer" />
      </div>
    </div>

    <p v-else-if="error" class="blog-error">
      Couldn't load articles right now. Please refresh, or
      <RouterLink to="/contact">contact us</RouterLink>.
    </p>

    <div v-else-if="filteredBlogs.length === 0" class="blog-error">
      No articles found matching your search.
    </div>

    <div v-else class="blog-grid">
      <RouterLink
        v-for="post in filteredBlogs"
        :key="post.id"
        :to="\`/blog/\${post.slug}\`"
        class="blog-card"
      >
        <div class="blog-card-inner">
          <div class="blog-card-img-wrap">
            <img
              v-if="post.image_url"
              :src="post.image_url"
              :alt="post.title"
              class="blog-card-img"
              loading="lazy"
            />
          </div>
          <div class="blog-card-body">
            <div class="blog-card-meta">
              <span class="blog-card-cat" :class="'text-cat-' + (getCatId(post) % 5)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="8"/></svg>
                {{ blogCategory(post) }}
              </span>
              <span class="blog-card-date">
                {{ formatBlogDate(post.publish_date) }}
              </span>
            </div>
            <h3 class="blog-card-title">{{ post.title }}</h3>
            <p class="blog-card-excerpt">{{ post.excerpt }}</p>
            <span class="blog-card-link">Learn More <span aria-hidden>→</span></span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>

`;

if (template_start !== -1 && template_end !== -1) {
    content = content.substring(0, template_start) + new_template + content.substring(template_end);
} else {
    console.log("Template markers not found!");
}

// 3. Replace CSS related to the old hero and blog grid
const css_start = content.indexOf('/* ============= DARK HERO ============= */');
const css_end = content.indexOf('/* ============= NEWSLETTER ============= */');

const new_css = `/* ============= CLEAN HERO ============= */
.blog-clean-hero {
  padding: 120px 0 60px;
  background: var(--bg);
  text-align: center;
}
.blog-hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-hero-content {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.blog-hero-title {
  font-family: var(--serif);
  font-size: clamp(40px, 5vw, 64px);
  line-height: 1.1;
  color: var(--ink);
  font-weight: 500;
  letter-spacing: -0.02em;
}
.blog-hero-subtitle {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.6;
  max-width: 580px;
}

/* ============= TOOLBAR ============= */
.blog-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;
}
.blog-search {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 280px;
  max-width: 400px;
}
.blog-search svg {
  position: absolute;
  left: 16px;
  color: var(--ink-muted);
}
.blog-search input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  border-radius: 99px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #ffffff;
  font-family: var(--sans);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.blog-search input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(176, 149, 89, 0.15);
}

.blog-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--sans);
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s ease;
}
.filter-pill:hover {
  border-color: rgba(0, 0, 0, 0.2);
  color: var(--ink);
}
.filter-pill.active {
  background: rgba(176, 149, 89, 0.1);
  border-color: var(--accent);
  color: var(--accent);
}

.cat-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.bg-cat-0 { background: #E66A46; } /* Orange */
.bg-cat-1 { background: #2B5CB3; } /* Blue */
.bg-cat-2 { background: #1A8A47; } /* Green */
.bg-cat-3 { background: #7B4FB3; } /* Purple */
.bg-cat-4 { background: #B09559; } /* Gold */

.text-cat-0 { color: #E66A46; }
.text-cat-1 { color: #2B5CB3; }
.text-cat-2 { color: #1A8A47; }
.text-cat-3 { color: #7B4FB3; }
.text-cat-4 { color: #B09559; }

/* ============= ARTICLES GRID ============= */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-bottom: 60px;
}
.blog-card {
  text-decoration: none;
  color: var(--ink);
  display: block;
}
.blog-card-inner {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.blog-card:hover .blog-card-inner {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
}

.blog-card-img-wrap {
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background: var(--accent-soft);
  margin-bottom: 20px;
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
  padding: 0 8px 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.blog-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.blog-card-cat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.blog-card-date {
  font-size: 12px;
  color: var(--ink-muted);
}
.blog-card-title {
  font-family: var(--sans);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 8px;
  color: var(--ink);
}
.blog-card-excerpt {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.blog-card-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: gap 0.2s;
}
.blog-card:hover .blog-card-link {
  gap: 8px;
}

.blog-error {
  text-align: center;
  color: var(--ink-soft);
  padding: 80px 0;
  background: #ffffff;
  border-radius: 20px;
  border: 1px dashed rgba(0, 0, 0, 0.1);
}

`;

if (css_start !== -1 && css_end !== -1) {
    content = content.substring(0, css_start) + new_css + content.substring(css_end);
} else {
    console.log("CSS markers not found!");
}

fs.writeFileSync(path, content, 'utf8');
console.log("Done");
