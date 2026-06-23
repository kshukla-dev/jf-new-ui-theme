import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Eagerly load the homepage (it's the entry point); lazy-load everything else.
import HomePage from '@/pages/HomePage.vue'

const StubPage = () => import('@/pages/StubPage.vue')
const BlogPage = () => import('@/pages/BlogPage.vue')
const BlogDetailPage = () => import('@/pages/BlogDetailPage.vue')
const EORPage = () => import('@/pages/EORPage.vue')
const PayrollPage = () => import('@/pages/PayrollPage.vue')
const CompliancePage = () => import('@/pages/CompliancePage.vue')
const ImmigrationPage = () => import('@/pages/ImmigrationPage.vue')
const ContractorPage = () => import('@/pages/ContractorPage.vue')
const ContactPage = () => import('@/pages/ContactPage.vue')
const AboutPage = () => import('@/pages/AboutPage.vue')
const AdvantagesPage = () => import('@/pages/AdvantagesPage.vue')
const TestimonialsPage = () => import('@/pages/TestimonialsPage.vue')
const CareerPage = () => import('@/pages/CareerPage.vue')
const CountryPage = () => import('@/pages/CountryPage.vue')
const FaqPage = () => import('@/pages/FaqPage.vue')
const CostCalculatorPage = () => import('@/pages/CostCalculatorPage.vue')
const GlobalHiringGuidePage = () => import('@/pages/GlobalHiringGuidePage.vue')
const CaseStudiesPage = () => import('@/pages/CaseStudiesPage.vue')
const CaseStudyDetailPage = () => import('@/pages/CaseStudyDetailPage.vue')
const EventsPage = () => import('@/pages/EventsPage.vue')
const PressReleasePage = () => import('@/pages/PressReleasePage.vue')
const PrivacyPolicyPage = () => import('@/pages/PrivacyPolicyPage.vue')
const SitemapPage = () => import('@/pages/SitemapPage.vue')
const UnsubscribePage = () => import('@/pages/UnsubscribePage.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage, meta: { title: 'Hire talent, anywhere' } },

  // About cluster
  { path: '/about-us', name: 'about-us', component: AboutPage, meta: { title: 'About us', cluster: 'About' } },
  { path: '/advantages', name: 'advantages', component: AdvantagesPage, meta: { title: 'Our advantages', cluster: 'About' } },
  { path: '/testimonials', name: 'testimonials', component: TestimonialsPage, meta: { title: 'Client testimonials', cluster: 'About' } },
  { path: '/career', name: 'career', component: CareerPage, meta: { title: 'Careers', cluster: 'About' } },

  // Services
  { path: '/employer-of-record', name: 'eor', component: EORPage, meta: { title: 'Employer of record', cluster: 'Services' } },
  { path: '/payroll', name: 'payroll', component: PayrollPage, meta: { title: 'Payroll', cluster: 'Services' } },
  { path: '/compliance', name: 'compliance', component: CompliancePage, meta: { title: 'Compliance', cluster: 'Services' } },
  { path: '/immigration', name: 'immigration', component: ImmigrationPage, meta: { title: 'Immigration', cluster: 'Services' } },
  { path: '/contractor', name: 'contractor', component: ContractorPage, meta: { title: 'Contractor', cluster: 'Services' } },

  // Resources / Insights
  { path: '/blog', name: 'blog', component: BlogPage, meta: { title: 'Blog', cluster: 'Resources' } },
  { path: '/blog/:slug', name: 'blog-post', component: BlogDetailPage, meta: { title: 'Blog post', cluster: 'Resources' } },
  { path: '/case-studies', name: 'case-studies', component: CaseStudiesPage, meta: { title: 'Success stories', cluster: 'Resources' } },
  { path: '/case-studies/:slug', name: 'case-study', component: CaseStudyDetailPage, meta: { title: 'Case study', cluster: 'Resources' } },
  { path: '/global-hiring-guide', name: 'global-hiring-guide', component: GlobalHiringGuidePage, meta: { title: 'Global hiring guide', cluster: 'Resources' } },
  { path: '/resources/events/china-europe-2026', name: 'press-release', component: PressReleasePage, meta: { title: 'China to Europe 2026', cluster: 'Resources' } },
  { path: '/events', name: 'events', component: EventsPage, meta: { title: 'Events', cluster: 'Resources' } },

  // Utility / static
  { path: '/contact', name: 'contact', component: ContactPage, meta: { title: 'Contact us' } },
  { path: '/faq', name: 'faq', component: FaqPage, meta: { title: 'FAQs' } },
  { path: '/cost-calculator', name: 'cost-calculator', component: CostCalculatorPage, meta: { title: 'Cost calculator' } },
  { path: '/privacy-policy', name: 'privacy', component: PrivacyPolicyPage, meta: { title: 'Privacy policy' } },
  { path: '/sitemaps', name: 'sitemaps', component: SitemapPage, meta: { title: 'Sitemap' } },
  { path: '/unsubscribe', name: 'unsubscribe', component: UnsubscribePage, meta: { title: 'Unsubscribe' } },

  // Country pages (EOR + Contractor variants) - all driven by CountryPage + country-config.ts
  { path: '/belgium', name: 'belgium', component: CountryPage, meta: { title: 'Belgium EOR', cluster: 'Country' } },
  { path: '/belgium-contractor', name: 'belgium-contractor', component: CountryPage, meta: { title: 'Belgium Contractor', cluster: 'Country' } },
  { path: '/china', name: 'china', component: CountryPage, meta: { title: 'China EOR', cluster: 'Country' } },
  { path: '/czech-republic', name: 'czech-republic', component: CountryPage, meta: { title: 'Czech Republic EOR', cluster: 'Country' } },
  { path: '/czech-republic-contractor', name: 'czech-republic-contractor', component: CountryPage, meta: { title: 'Czech Republic Contractor', cluster: 'Country' } },
  { path: '/france', name: 'france', component: CountryPage, meta: { title: 'France EOR', cluster: 'Country' } },
  { path: '/france-contractor', name: 'france-contractor', component: CountryPage, meta: { title: 'France Contractor', cluster: 'Country' } },
  { path: '/germany', name: 'germany', component: CountryPage, meta: { title: 'Germany EOR', cluster: 'Country' } },
  { path: '/germany-contractor', name: 'germany-contractor', component: CountryPage, meta: { title: 'Germany Contractor', cluster: 'Country' } },
  { path: '/hong-kong', name: 'hong-kong', component: CountryPage, meta: { title: 'Hong Kong EOR', cluster: 'Country' } },
  { path: '/india', name: 'india', component: CountryPage, meta: { title: 'India EOR', cluster: 'Country' } },
  { path: '/india-contractor', name: 'india-contractor', component: CountryPage, meta: { title: 'India Contractor', cluster: 'Country' } },
  { path: '/italy', name: 'italy', component: CountryPage, meta: { title: 'Italy EOR', cluster: 'Country' } },
  { path: '/italy-contractor', name: 'italy-contractor', component: CountryPage, meta: { title: 'Italy Contractor', cluster: 'Country' } },
  { path: '/netherlands', name: 'netherlands', component: CountryPage, meta: { title: 'Netherlands EOR', cluster: 'Country' } },
  { path: '/netherlands-contractor', name: 'netherlands-contractor', component: CountryPage, meta: { title: 'Netherlands Contractor', cluster: 'Country' } },
  { path: '/poland', name: 'poland', component: CountryPage, meta: { title: 'Poland EOR', cluster: 'Country' } },
  { path: '/poland-contractor', name: 'poland-contractor', component: CountryPage, meta: { title: 'Poland Contractor', cluster: 'Country' } },
  { path: '/spain', name: 'spain', component: CountryPage, meta: { title: 'Spain EOR', cluster: 'Country' } },
  { path: '/spain-contractor', name: 'spain-contractor', component: CountryPage, meta: { title: 'Spain Contractor', cluster: 'Country' } },
  { path: '/uae', name: 'uae', component: CountryPage, meta: { title: 'UAE EOR', cluster: 'Country' } },
  { path: '/uae-contractor', name: 'uae-contractor', component: CountryPage, meta: { title: 'UAE Contractor', cluster: 'Country' } },
  { path: '/united-kingdom', name: 'uk', component: CountryPage, meta: { title: 'United Kingdom EOR', cluster: 'Country' } },
  { path: '/united-kingdom-contractor', name: 'uk-contractor', component: CountryPage, meta: { title: 'United Kingdom Contractor', cluster: 'Country' } },

  // 404
  { path: '/:pathMatch(.*)*', name: 'not-found', component: StubPage, meta: { title: 'Not found' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

// Update document.title based on route meta
router.afterEach((to) => {
  const title = (to.meta?.title as string | undefined) ?? 'Jackson & Frank'
  document.title = `${title} - Jackson & Frank`
})
