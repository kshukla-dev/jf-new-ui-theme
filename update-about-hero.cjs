const fs = require('fs');
let code = fs.readFileSync('src/pages/AboutPage.vue', 'utf-8');

const heroMatch = /<header class="container service-hero">[\s\S]*?<\/header>/;

const newHero = `<header class="service-hero about-premium-hero">
    <div class="about-premium-hero-inner">
      <div class="service-hero-copy">
       <h1>Global hiring,<br />made <em>human</em></h1>
        <p class="service-hero-lede">{{ about.definition.description }}</p>
        
        <div class="service-hero-features" style="display: flex; gap: 24px; margin-top: 32px; flex-wrap: wrap;">
          <div v-for="(f, i) in about.definition.keyFeatures" :key="i" class="hero-feature" style="display: flex; align-items: center; gap: 8px; font-weight: 500; font-size: 15px; color: var(--ink);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--accent);"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M2 12H22"/><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"/></svg>
            {{ f }}
          </div>
        </div>
        
        <div class="cta-row" style="margin-top: 40px; display: flex; gap: 16px; flex-wrap: wrap;">
          <RouterLink to="/contact" class="btn-primary" style="padding: 14px 28px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; background: var(--accent); color: white; text-decoration: none; border: none; box-shadow: 0 8px 24px rgba(176, 149, 89, 0.3); font-weight: 600;">
            {{ about.definition.primaryButtonText }} <span class="arrow" style="margin-left: 6px;">→</span>
          </RouterLink>
          <RouterLink to="/contact?reason=consultation" class="btn-secondary" style="padding: 14px 28px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; background: transparent; color: var(--ink); border: 1px solid rgba(0,0,0,0.1); text-decoration: none; font-weight: 500;">
            {{ about.definition.secondaryButtonText }}
          </RouterLink>
        </div>

      </div>
    </div>
  </header>`;

code = code.replace(heroMatch, newHero);

const newCss = `
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
  background-color: #f4f1ec;
  background-image: linear-gradient(90deg, #f4f1ec 0%, rgb(244 241 236 / 0%) 30%, rgba(253, 251, 247, 0.4) 60%, rgba(253, 251, 247, 0) 100%), url(/services/service-page/about2.png);
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  color: var(--ink);
  min-height: 700px;
  overflow: hidden;
}

.about-premium-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.4), transparent 50%);
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
  color: var(--accent);
}

.about-premium-hero .service-hero-lede {
  font-size: 19px;
  color: var(--ink-soft);
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
    background-size: cover;
    background-position: right -200px center;
    padding: 72px 0;
  }
}

@media (max-width: 640px) {
  .about-premium-hero {
    padding: 56px 0 64px;
    background-position: top center;
    background-image: linear-gradient(to bottom, rgba(244, 241, 236, 0.5) 0%, #f4f1ec 60%), url(/services/service-page/about2.png);
  }
  .about-premium-hero .cta-row {
    flex-direction: column;
  }
  .about-premium-hero .cta-row > * {
    width: 100%;
  }
}
</style>
`;

if (!code.includes('About Us Premium Hero')) {
  code = code.replace('</style>', newCss);
}

fs.writeFileSync('src/pages/AboutPage.vue', code);
