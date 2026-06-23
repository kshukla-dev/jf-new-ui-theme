const fs = require('fs');
let code = fs.readFileSync('src/pages/ContractorPage.vue', 'utf-8');

// Replace template
const templateMatch = /<header class="container service-hero">[\s\S]*?<\/header>/;
const newTemplate = `<header class="service-hero contractor-hero">
    <div class="contractor-hero-inner">
      <div class="service-hero-copy">
       <h1>
          Global <em>contractors</em>,<br />compliantly managed
        </h1>
        <p class="service-hero-lede">{{ contractor.definition.description }}</p>
        <div class="service-hero-features">
          <div v-for="(f, i) in contractor.definition.keyFeatures" :key="i" class="hero-feature">
            <span class="hero-feature-dot" />
            {{ f }}
          </div>
        </div>
        <div class="cta-row">
          <RouterLink to="/contact?reason=contractor_management" class="btn-primary">
            {{ contractor.definition.primaryButtonText }} <span class="arrow">→</span>
          </RouterLink>
          <RouterLink to="/contact?reason=consultation" class="btn-secondary">
            {{ contractor.definition.secondaryButtonText.trim() }}
          </RouterLink>
        </div>
        <div class="trust-row">
          <div class="avatars">
            <div
              v-for="(src, i) in trustAvatars"
              :key="i"
              class="avatar"
              :style="{ backgroundImage: \`url('\${src}')\` }"
            />
          </div>
          <span class="trust-text">
            Pay contractors in <strong>50+</strong> currencies, across 160+ countries
          </span>
        </div>
      </div>
    </div>
  </header>`;

code = code.replace(templateMatch, newTemplate);

// Insert CSS for contractor-hero after @import
const cssTarget = "@import '@/styles/service-page.css';";
const newCss = `@import '@/styles/service-page.css';

/* ============================================================
   HERO
   ============================================================ */
.contractor-hero {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  box-sizing: border-box;
  padding: 88px 0 96px;
  display: block;
  background-color: #f4f1ec;
  background-image: linear-gradient(90deg, #f4f1ec 0%, rgb(244 241 236 / 0%) 30%, rgba(253, 251, 247, 0.4) 60%, rgba(253, 251, 247, 0) 100%), url(/services/service-page/contractor-hero.jpg);
  background-size: 50% auto;
  background-position: right 5% center;
  background-repeat: no-repeat;
  color: var(--ink);
  min-height: 700px;
  overflow: hidden;
}

.contractor-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.4), transparent 50%);
  pointer-events: none;
}

.contractor-hero > * {
  position: relative;
  z-index: 1;
}

.contractor-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

.contractor-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.contractor-hero .tag {
  color: var(--accent);
  background: rgba(176, 149, 89, 0.1);
  border: 1px solid rgba(176, 149, 89, 0.2);
  margin-bottom: 24px;
}

.contractor-hero h1 {
  color: var(--ink);
  text-shadow: none;
}

.contractor-hero .service-hero-copy h1 em {
  color: var(--accent, #b09559);
}

.contractor-hero .service-hero-lede {
  color: var(--ink-soft);
  text-shadow: none;
  font-size: 19px;
}

.contractor-hero .service-hero-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 32px;
  list-style: none;
  padding: 0;
}

.contractor-hero .hero-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-shadow: none;
}

.contractor-hero .hero-feature-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(176, 149, 89, 0.15);
  border: 1px solid rgba(176, 149, 89, 0.4);
  color: var(--accent, #b09559);
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 0 12px rgba(176, 149, 89, 0.2);
}

.contractor-hero .hero-feature-dot::after {
  content: '✓';
}

.contractor-hero .cta-row {
  margin-top: 40px;
}

.contractor-hero .btn-primary {
  background: var(--accent, #b09559);
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(176, 149, 89, 0.3);
}

.contractor-hero .btn-primary:hover {
  background: #9a824e;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(176, 149, 89, 0.4);
}

.contractor-hero .btn-secondary {
  background: rgba(0, 0, 0, 0.04);
  color: var(--ink);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.contractor-hero .btn-secondary:hover {
  background: rgba(0, 0, 0, 0.08);
  color: var(--ink);
}

.contractor-hero .trust-row {
  margin-top: 48px;
}

.contractor-hero .trust-text {
  color: var(--ink-soft);
}

.contractor-hero .avatar {
  border-color: #fdfbf7;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

@media (max-width: 960px) {
  .contractor-hero {
    padding: 72px 24px 72px;
    background-size: 70% auto;
        background-position: top 30% right;
  }
}

@media (max-width: 640px) {
  .contractor-hero {
    padding: 56px 20px 64px;
  }
  .contractor-hero .service-hero-copy h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .contractor-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .contractor-hero .btn-primary,
  .contractor-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
`;

code = code.replace(cssTarget, newCss);
fs.writeFileSync('src/pages/ContractorPage.vue', code);
