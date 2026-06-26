<script setup lang="ts">
import { ref } from 'vue'
import GlobalCTA from '@/components/sections/GlobalCTA.vue'

// FAQ accordion state
const openFaq = ref<number | null>(0)

const faqs = [
  {
    question: 'What is an Employer of Record (EOR)?',
    answer: 'An Employer of Record is the legal employer for your workers in a country where you do not have your own entity. We handle contracts, international payroll, taxes and contributions where applicable, and core HR while you manage day-to-day work.'
  },
  {
    question: 'How quickly can we start hiring with EOR?',
    answer: 'Most clients onboard first hires in about 48–72 hours after scope is clear - far faster than incorporating and standing up payroll locally.'
  },
  {
    question: 'Do we need a local entity for Employer of Record?',
    answer: 'No. That is the main point of EOR: hire without entity setup. We employ under our in-country structure so you can enter markets without a subsidiary.'
  },
  {
    question: 'Which countries do you support?',
    answer: 'We deliver Employer of Record and global hiring support in 160+ countries, including major European and APAC hubs. Contact us for your specific locations.'
  },
  {
    question: 'Who manages day-to-day work?',
    answer: 'You do. The EOR handles legal employment, payroll, and employment compliance execution - not how people do their jobs.'
  },
  {
    question: 'What compliance does the EOR cover?',
    answer: 'We apply local labour rules, statutory benefits, social contributions, and filing obligations for employed staff in scope so international payroll and HR stay aligned with each jurisdiction.'
  },
  {
    question: 'Can we switch from another EOR to Jackson & Frank?',
    answer: 'Yes. We plan transfers, contract continuity, and payroll handoffs so there is no gap for employees.'
  },
  {
    question: 'Do you offer immigration support with EOR?',
    answer: 'Yes. We coordinate work permits and visas alongside employment so relocation and global hiring stay in one programme.'
  }
]

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}

const topCountries = [
  { code: 'us', name: 'United States' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'de', name: 'Germany' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'fr', name: 'France' },
  { code: 'au', name: 'Australia' },
  { code: 'sg', name: 'Singapore' },
  { code: 'in', name: 'India' },
  { code: 'ae', name: 'UAE' },
  { code: 'ca', name: 'Canada' },
  { code: 'es', name: 'Spain' },
  { code: 'it', name: 'Italy' },
  { code: 'pl', name: 'Poland' },
  { code: 'br', name: 'Brazil' },
  { code: 'jp', name: 'Japan' },
  { code: 'mx', name: 'Mexico' },
]
</script>

<template>
  <div class="eor-modern-page">
    
    <!-- HERO -->
    <header class="service-hero eor-premium-hero">
      <div class="eor-premium-hero-inner">
        <div class="service-hero-copy">
          <h1>
            Employer of Record<br /><em>(EOR) Services</em>
          </h1>
          <p class="service-hero-lede">Simplify global expansion. We handle the complexity of hiring, payroll, and compliance so you can focus on growth.</p>
          <div class="cta-row">
            <a href="/contact" class="btn-primary">Get started today <span class="arrow">→</span></a>
            <a href="#what-is-eor" class="btn-secondary">Learn how it works</a>
          </div>
        </div>
      </div>
    </header>



    <!-- WHAT IS EOR -->
    <section class="eor-section eor-container">
      <div class="what-is-eor">
        <div class="what-is-eor-text">
          <h2>What is Employer of Record (EOR)?</h2>
          <p>
            An Employer of Record (EOR) is a third-party organization that legally employs your international workforce on your behalf. We assume all employer responsibilities, including payroll, taxes, benefits, and compliance with local labor laws, allowing you to hire talent anywhere in the world without establishing a local entity.
          </p>
        </div>
        <div class="what-is-eor-diagram">
          <svg width="100%" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Curved Arrow on Top (Right to Left) -->
            <path d="M 330 40 Q 200 0 100 40" stroke="#F7931E" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <path d="M 100 40 L 110 32 M 100 40 L 110 48" stroke="#F7931E" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            
            <!-- Bridge cables and pillars -->
            <path d="M 50 120 L 50 80 M 150 120 L 150 60 M 250 120 L 250 60 M 350 120 L 350 80" stroke="#c5c6cf" stroke-width="2" />
            <path d="M 50 80 Q 100 120 150 60 Q 200 120 250 60 Q 300 120 350 80" stroke="#c5c6cf" stroke-width="2" fill="none"/>
            <!-- Bridge base -->
            <path d="M 40 120 L 360 120" stroke="#c5c6cf" stroke-width="6" stroke-linecap="round" />
            <path d="M 40 124 L 360 124" stroke="#75777f" stroke-width="1" />
            
            <!-- Company Node (Left) -->
            <rect x="20" y="80" width="40" height="40" fill="white" stroke="#061639" stroke-width="2"/>
            <rect x="30" y="70" width="20" height="10" fill="white" stroke="#061639" stroke-width="2"/>
            <path d="M 28 90 h 4 v 4 h -4 z M 38 90 h 4 v 4 h -4 z M 48 90 h 4 v 4 h -4 z" fill="#061639"/>
            <path d="M 28 100 h 4 v 4 h -4 z M 38 100 h 4 v 4 h -4 z M 48 100 h 4 v 4 h -4 z" fill="#061639"/>
            <rect x="34" y="110" width="12" height="10" fill="none" stroke="#061639" stroke-width="2"/>
            
            <!-- JF Node (Center) -->
            <circle cx="200" cy="110" r="30" fill="#061639" />
            <text x="200" y="116" fill="#F7931E" font-family="'DM Serif Display', serif" font-size="20" font-weight="bold" font-style="italic" text-anchor="middle">JF</text>
            
            <!-- Global Node (Right) -->
            <circle cx="350" cy="100" r="20" fill="white" stroke="#061639" stroke-width="2"/>
            <path d="M 330 100 A 20 20 0 0 0 370 100 M 350 80 A 10 20 0 0 0 350 120 M 350 80 A 10 20 0 0 1 350 120 M 332 90 L 368 90 M 332 110 L 368 110" stroke="#061639" stroke-width="1" fill="none"/>


            <!-- Labels -->
            <text x="40" y="145" fill="#061639" font-family="'DM Sans', sans-serif" font-size="12" font-weight="600" text-anchor="middle">Your Company</text>
            <text x="200" y="150" fill="#061639" font-family="'DM Sans', sans-serif" font-size="12" font-weight="600" text-anchor="middle">Jackson &amp; Frank</text>
            <text x="200" y="165" fill="#061639" font-family="'DM Sans', sans-serif" font-size="12" font-weight="600" text-anchor="middle">EOR</text>
            <text x="350" y="150" fill="#061639" font-family="'DM Sans', sans-serif" font-size="12" font-weight="600" text-anchor="middle">Global</text>
            <text x="350" y="165" fill="#061639" font-family="'DM Sans', sans-serif" font-size="12" font-weight="600" text-anchor="middle">talent pool</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- DETAILED PROCESS STEPS -->
    <section class="eor-section eor-container eor-process-panel" id="what-is-eor">
      <div class="eor-process-header">
        <span class="eor-eyebrow">How our Employer of Record works</span>
        <h2>Three focused steps from agreement to payroll</h2>
        <p class="eor-process-sub">You define the roles, we employ and run international payroll compliantly.</p>
      </div>
      <div class="eor-process-steps">
        <div class="eor-process-step">
          <div class="eps-number">01</div>
          <div class="eps-body">
            <h3>Agree scope</h3>
            <p>We align on countries, roles, and commercials so Employer of Record coverage matches your global hiring plan.</p>
            <ul class="eps-bullets">
              <li>Countries and headcount</li>
              <li>Commercials and SLAs</li>
              <li>Compliance touchpoints</li>
            </ul>
          </div>
        </div>
        <div class="eor-process-step">
          <div class="eps-number">02</div>
          <div class="eps-body">
            <h3>Onboard employees</h3>
            <p>Local contracts, payroll setup, and registrations ready for day one in each market.</p>
            <ul class="eps-bullets">
              <li>Compliant employment agreements</li>
              <li>Payroll and benefits setup</li>
              <li>Tax and social registrations</li>
            </ul>
          </div>
        </div>
        <div class="eor-process-step">
          <div class="eps-number">03</div>
          <div class="eps-body">
            <h3>Run payroll & HR</h3>
            <p>Monthly payroll, filings, changes, and HR lifecycle support while you manage performance.</p>
            <ul class="eps-bullets">
              <li>Payroll and contributions</li>
              <li>Ongoing employment compliance</li>
              <li>Leavers, moves, and adjustments</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="eor-section eor-container">
      <h2 class="how-it-works-title">How it Works: Your Global Hiring Journey</h2>
      <div class="how-steps-grid">
        
        <div class="how-step">
          <div class="how-icon-row">
            <div class="how-icon">
              <!-- Globe with Magnifying Glass -->
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon-navy">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <!-- Magnifying glass overlaying bottom right -->
                <circle cx="16" cy="16" r="5" fill="white" stroke="currentColor" stroke-width="1.5"></circle>
                <line x1="19.5" y1="19.5" x2="24" y2="24" stroke="#143369" stroke-width="2"></line>
              </svg>
            </div>
            <div class="how-arrow">
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6L56 6" stroke="#c5c6cf" stroke-width="1"/>
                <path d="M52 2L58 6L52 10" stroke="#c5c6cf" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <h3>Talent Discovery</h3>
          <p>Find your ideal candidate. We assist in compliant offer letters and contracts.</p>
        </div>

        <div class="how-step">
          <div class="how-icon-row">
            <div class="how-icon">
              <!-- Handshake / Paper -->
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon-navy">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <!-- Handshake overlay -->
                <path d="M8 14l4-4 4 4" stroke="#143369" stroke-width="2"></path>
                <path d="M12 10v10" stroke="#143369" stroke-width="2"></path>
              </svg>
            </div>
            <div class="how-arrow">
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6L56 6" stroke="#c5c6cf" stroke-width="1"/>
                <path d="M52 2L58 6L52 10" stroke="#c5c6cf" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <h3>Seamless Onboarding</h3>
          <p>We handle all paperwork, visa sponsorship, and local registration quickly and compliantly.</p>
        </div>

        <div class="how-step">
          <div class="how-icon-row">
            <div class="how-icon">
              <!-- Calculator & Money Bag -->
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon-navy">
                <rect x="4" y="2" width="12" height="20" rx="2" ry="2"></rect>
                <line x1="8" y1="6" x2="12" y2="6"></line>
                <line x1="8" y1="10" x2="8.01" y2="10"></line>
                <line x1="12" y1="10" x2="12.01" y2="10"></line>
                <!-- Money bag -->
                <path d="M16 12s-4 2-4 6c0 3 2.5 4 6 4s6-1 6-4c0-4-4-6-4-6" fill="white" stroke="#143369" stroke-width="1.5"></path>
                <path d="M18 12v-2a2 2 0 0 0-4 0" stroke="#143369" stroke-width="1.5"></path>
                <text x="18" y="19" font-size="6" fill="#143369" stroke="none" text-anchor="middle">$</text>
              </svg>
            </div>
            <div class="how-arrow">
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6L56 6" stroke="#c5c6cf" stroke-width="1"/>
                <path d="M52 2L58 6L52 10" stroke="#c5c6cf" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <h3>Payroll & Benefits</h3>
          <p>We manage monthly payroll, tax filings, and comprehensive benefits packages in local currency.</p>
        </div>

        <div class="how-step">
          <div class="how-icon-row">
            <div class="how-icon">
              <!-- User & Gears -->
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon-navy">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
                <!-- Gears -->
                <circle cx="20" cy="8" r="2" stroke="#143369" stroke-width="1.5" fill="white"></circle>
                <path d="M20 4v2 M20 10v2 M16 8h2 M22 8h2" stroke="#143369" stroke-width="1.5"></path>
                <circle cx="16" cy="12" r="2" stroke="#143369" stroke-width="1.5" fill="white"></circle>
              </svg>
            </div>
            <!-- Last item has no arrow -->
          </div>
          <h3>Ongoing Support</h3>
          <p>Dedicated account management, HR support, and risk mitigation for your global team.</p>
        </div>

      </div>
    </section>

    <!-- KEY BENEFITS -->
    <section class="eor-section eor-container">
      <div class="benefits-wrapper">
        <h2 class="benefits-title">Key Benefits of Our EOR Service</h2>
        <div class="benefits-grid">
          
          <div class="benefit-card">
            <div class="benefit-icon">
              <!-- Rocket SVG -->
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
              </svg>
            </div>
            <h3>Speed to Market</h3>
            <p>Hire and onboard international talent in days, not months, with our established global infrastructure.</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <!-- Shield SVG -->
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <h3>Compliance Management</h3>
            <p>Mitigate risk with our deep understanding of local labor laws, tax regulations, and employment standards across 160+ countries.</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <!-- Coins SVG -->
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                <path d="M21 8.5c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              </svg>
            </div>
            <h3>Cost-Effective</h3>
            <p>Eliminate the high costs and administrative burden of setting up and maintaining legal entities in multiple countries.</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">
              <!-- Scalability SVG -->
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#143369" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
                <polyline points="21 15 21 21 15 21"></polyline>
                <polyline points="3 9 3 3 9 3"></polyline>
                <line x1="21" y1="21" x2="14" y2="14"></line>
                <line x1="3" y1="3" x2="10" y2="10"></line>
              </svg>
            </div>
            <h3>Scalability & Flexibility</h3>
            <p>Easily scale your global workforce up or down based on your business needs, with no long-term commitments.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- EOR VS LOCAL ENTITY -->
    <section class="eor-section eor-container">
      <div class="eor-compare-header">
        <span class="eor-eyebrow">Why EOR?</span>
        <h2>EOR vs. Setting Up a Local Entity</h2>
        <p class="eor-compare-sub">Establishing your own entity takes months and hundreds of thousands in setup costs. EOR gets you there in days.</p>
      </div>
      <div class="eor-compare-table-wrapper">
        <div class="eor-compare-table">
          <div class="ect-header">
            <div class="ect-label"></div>
            <div class="ect-col eor-col">Jackson &amp; Frank EOR</div>
            <div class="ect-col entity-col">Local Entity Setup</div>
          </div>
          <div class="ect-row">
            <div class="ect-label">Time to hire</div>
            <div class="ect-col eor-col"><span class="ect-good">✓ 48–72 hours</span></div>
            <div class="ect-col entity-col"><span class="ect-bad">✗ 3–6 months</span></div>
          </div>
          <div class="ect-row">
            <div class="ect-label">Upfront cost</div>
            <div class="ect-col eor-col"><span class="ect-good">✓ No setup fees</span></div>
            <div class="ect-col entity-col"><span class="ect-bad">✗ $20,000–$50,000+</span></div>
          </div>
          <div class="ect-row">
            <div class="ect-label">Local entity required</div>
            <div class="ect-col eor-col"><span class="ect-good">✓ Not needed</span></div>
            <div class="ect-col entity-col"><span class="ect-bad">✗ Mandatory</span></div>
          </div>
          <div class="ect-row">
            <div class="ect-label">Compliance risk</div>
            <div class="ect-col eor-col"><span class="ect-good">✓ Fully managed by JF</span></div>
            <div class="ect-col entity-col"><span class="ect-bad">✗ Company bears all risk</span></div>
          </div>
          <div class="ect-row">
            <div class="ect-label">Scalability</div>
            <div class="ect-col eor-col"><span class="ect-good">✓ Scale instantly</span></div>
            <div class="ect-col entity-col"><span class="ect-bad">✗ Slow &amp; complex</span></div>
          </div>
          <div class="ect-row">
            <div class="ect-label">Exit flexibility</div>
            <div class="ect-col eor-col"><span class="ect-good">✓ Flexible offboarding</span></div>
            <div class="ect-col entity-col"><span class="ect-bad">✗ Complex wind-down</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHO IS EOR FOR -->
    <section class="eor-section eor-container">
      <div class="eor-audience-header">
        <span class="eor-eyebrow">Built for every stage</span>
        <h2>Who is EOR designed for?</h2>
      </div>
      <div class="eor-audience-grid">
        <div class="eor-audience-card">
          <div class="eac-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            </svg>
          </div>
          <h3>Startups entering new markets</h3>
          <p>Test international markets without the commitment of a legal entity. Hire your first overseas employee in days and validate before you invest.</p>
          <ul class="eac-list">
            <li>No entity setup required</li>
            <li>Hire in any country from day 1</li>
            <li>Cancel anytime, no penalties</li>
          </ul>
        </div>
        <div class="eor-audience-card">
          <div class="eac-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3>Growing companies scaling globally</h3>
          <p>Add headcount across borders without setting up subsidiaries in each country. Our EOR structure supports rapid, compliant global expansion.</p>
          <ul class="eac-list">
            <li>One partner across 160+ countries</li>
            <li>Consistent HR processes globally</li>
            <li>Scale up or down as needed</li>
          </ul>
        </div>
        <div class="eor-audience-card">
          <div class="eac-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18"/>
              <path d="M9 21V9"/>
            </svg>
          </div>
          <h3>Enterprises with distributed teams</h3>
          <p>Centralize compliance across multiple jurisdictions. Replace fragmented local setups with one globally consistent EOR programme.</p>
          <ul class="eac-list">
            <li>Centralized payroll &amp; reporting</li>
            <li>Standardized benefits globally</li>
            <li>Single point of accountability</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- COUNTRIES COVERAGE -->
    <section class="eor-section eor-countries-section">
      <div class="eor-container">
        <div class="eor-countries-header">
          <span class="eor-eyebrow">Global coverage</span>
          <h2>Hire in <em>160+ Countries</em></h2>
          <p class="eor-countries-sub">From Amsterdam to Singapore, New York to Mumbai - if the talent is there, we'll get them hired compliantly.</p>
        </div>
        <div class="eor-countries-grid">
          <div class="ecg-item" v-for="country in topCountries" :key="country.code">
            <img :src="`https://hatscripts.github.io/circle-flags/flags/${country.code}.svg`" :alt="country.name" class="ecg-flag" />
            <span>{{ country.name }}</span>
          </div>
        </div>
        <div class="eor-countries-cta">
          <a href="/contact" class="gh-btn-gold">Explore all countries →</a>
        </div>
      </div>
    </section>

    <!-- TESTIMONIAL -->

    <section class="eor-section eor-container">
      <div class="faq-section">
        <h2 class="faq-title mb-6">Frequently Asked Questions</h2>
        <div class="faq-list">
          <div v-for="(faq, i) in faqs" :key="i" class="faq-item">
            <button class="faq-button" @click="toggleFaq(i)" :aria-expanded="openFaq === i">
              <span class="faq-icon">[{{ openFaq === i ? '-' : '+' }}]</span>
              <span class="faq-question">{{ faq.question }}</span>
              <span class="faq-indicator">
                <svg v-if="openFaq !== i" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              </span>
            </button>
            <div v-show="openFaq === i" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <GlobalCTA title="Ready to expand your team globally?" />

  </div>
</template>

<style scoped>
@import '@/styles/eor-modern.css';
@import '@/styles/eor-sections.css';
/* ============================================================
   PREMIUM HERO
   ============================================================ */
.eor-premium-hero {
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
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 79%) 40%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/eor-hero2.png);
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  color: #ffffff;
  min-height: 700px;
  overflow: hidden;
  margin-bottom: 40px;
}

.eor-premium-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(9, 64, 123, 0.3), transparent 60%);
  pointer-events: none;
}

.eor-premium-hero > * {
  position: relative;
  z-index: 1;
}

.eor-premium-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

.eor-premium-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.eor-premium-hero .tag {
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

.eor-premium-hero h1 {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(48px, 5.8vw, 86px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 24px;
  color: #ffffff;
}

.eor-premium-hero h1 em {
  font-style: italic;
  color: var(--accent-warm, #F7931E);
}

.eor-premium-hero .service-hero-lede {
  color: rgba(255, 255, 255, 0.85);
  font-size: 19px;
  margin-top: 24px;
  max-width: 520px;
  line-height: 1.6;
}

.eor-premium-hero .cta-row {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.eor-premium-hero .btn-primary {
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

.eor-premium-hero .btn-primary:hover {
  background: #e07d10;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(247, 147, 30, 0.45);
}

.eor-premium-hero .btn-secondary {
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

.eor-premium-hero .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 960px) {
  .eor-premium-hero {
    padding: 72px 24px 72px;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(14, 15, 59, 0.8), rgba(14, 15, 59, 0.95)), url(/services/service-page/eor-hero2.png);
  }
}

@media (max-width: 640px) {
  .eor-premium-hero {
    min-height: auto;
    padding: 260px 20px 64px;
    background-image: none;
    background-color: #0E0F3B;
  }
  .eor-premium-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 280px;
    background-image: url(/services/service-page/eor-hero2.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
    pointer-events: none;
  }
  .eor-premium-hero h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .eor-premium-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .eor-premium-hero .btn-primary,
  .eor-premium-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

</style>
