const fs = require('fs');
let code = fs.readFileSync('src/pages/EORPage.vue', 'utf-8');

const heroMatch = /<section class="eor-hero">[\s\S]*?<\/section>/;
const newHero = `<header class="service-hero eor-premium-hero">
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
    </header>`;

code = code.replace(heroMatch, newHero);

const cssTarget = "</style>";
const newCss = `/* ============================================================
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
  background-color: #f4f1ec;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 79%) 40%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/eor-hero2.png);
  background-size: 50% auto;
  background-position: right 5% center;
  background-repeat: no-repeat;
  color: #061639; /* ink */
  min-height: 700px;
  overflow: hidden;
  margin-bottom: 40px;
}

.eor-premium-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.4), transparent 50%);
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
  color: #b09559; /* accent */
  background: rgba(176, 149, 89, 0.1);
  border: 1px solid rgba(176, 149, 89, 0.2);
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
  font-family: 'Libre Caslon Text', serif;
  font-size: clamp(48px, 5.8vw, 86px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 24px;
  color: #061639;
}

.eor-premium-hero h1 em {
  font-style: italic;
  color: #b09559;
}

.eor-premium-hero .service-hero-lede {
  color: rgba(6, 22, 57, 0.7); /* ink-soft */
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
  background: #b09559;
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(176, 149, 89, 0.3);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.eor-premium-hero .btn-primary:hover {
  background: #9a824e;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(176, 149, 89, 0.4);
}

.eor-premium-hero .btn-secondary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: transparent;
  color: #061639;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.eor-premium-hero .btn-secondary:hover {
  background: rgba(0, 0, 0, 0.08);
}

@media (max-width: 960px) {
  .eor-premium-hero {
    padding: 72px 24px 72px;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(rgba(244, 241, 236, 0.8), rgba(244, 241, 236, 0.95)), url(/services/service-page/eor-hero2.png);
  }
}

@media (max-width: 640px) {
  .eor-premium-hero {
    padding: 56px 20px 64px;
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

</style>`;

code = code.replace(cssTarget, newCss);

fs.writeFileSync('src/pages/EORPage.vue', code);
