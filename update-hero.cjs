const fs = require('fs');
let code = fs.readFileSync('src/pages/HomePage.vue', 'utf-8');

// Replace template
const templateMatch = /<header class="container hero-container">[\s\S]*?<\/header>/;
const newTemplate = `<header class="service-hero home-hero">
    <div class="home-hero-inner">
      <div class="service-hero-copy">
        <h1>
          Hire anywhere.<br />
          <em>We handle the rest.</em>
        </h1>
        <p class="service-hero-lede">
          Jackson &amp; Frank makes global hiring effortless. From onboarding to payroll and compliance — we take care of everything.
        </p>

        <div class="cta-row">
          <RouterLink class="btn-primary" to="/contact">
            Get started today <span class="arrow">→</span>
          </RouterLink>
          <a
            class="btn-secondary"
            href="https://www.youtube.com/watch?v=yG5fSc3isFs"
            target="_blank"
            rel="noopener"
          >
            Book a demo
          </a>
        </div>

        <div class="hero-features-inline">
          <div class="hf-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M2 12H22"/><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"/></svg>
            Hire in 160+ countries
          </div>
          <div class="hf-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22S8 18 8 12V5L12 3L16 5V12C16 18 12 22 12 22Z"/><path d="M9 12L11 14L15 10"/></svg>
            Compliant with local laws
          </div>
          <div class="hf-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M16 8H8V16H16"/><path d="M12 8V16"/><path d="M8 12H16"/></svg>
            Payroll in 150+ currencies
          </div>
        </div>

        <div class="hero-trust">
          <span class="hero-trust-label">Trusted by global companies</span>
          <div class="hero-trust-logos">
            <span class="ht-logo">Payoneer</span>
            <span class="ht-logo">docusign</span>
            <span class="ht-logo">ING</span>
            <span class="ht-logo">Shopify</span>
            <span class="ht-logo">DHL</span>
          </div>
        </div>
      </div>
    </div>
  </header>`;

code = code.replace(templateMatch, newTemplate);

// Replace styles
const styleStart = code.indexOf('/* ============================================================\r\n   HERO');
const styleEnd = code.indexOf('/* ============================================================\r\n   INTRO BLURB');

if (styleStart !== -1 && styleEnd !== -1) {
  const newStyles = `/* ============================================================
   HERO
   ============================================================ */
.home-hero {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  box-sizing: border-box;
  padding: 20px 0 96px;
  display: block;
  background-color: #f4f1ec;
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 52%) 40%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/about2.png);
  background-size: 60% auto;
  background-position: right 0% center;
  background-repeat: no-repeat;
  color: var(--ink);
  min-height: 700px;
  overflow: hidden;
}

.home-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.4), transparent 50%);
  pointer-events: none;
}

.home-hero > * {
  position: relative;
  z-index: 1;
}

.home-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

.home-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.home-hero h1 {
  font-family: var(--serif);
  font-size: clamp(48px, 5.8vw, 86px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 400;
  color: var(--ink);
  text-shadow: none;
}
.home-hero h1 em {
  font-style: italic;
  color: var(--accent, #b09559);
}

.home-hero .service-hero-lede {
  color: var(--ink-soft);
  text-shadow: none;
  font-size: 19px;
  margin-top: 24px;
  max-width: 520px;
  line-height: 1.6;
}

.home-hero .cta-row {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.home-hero .btn-primary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: var(--accent-warm, #b09559);
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(176, 149, 89, 0.3);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.home-hero .btn-primary:hover {
  background: #9a824e;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(176, 149, 89, 0.4);
}

.home-hero .btn-secondary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.home-hero .btn-secondary:hover {
  background: rgba(0, 0, 0, 0.08);
}

.home-hero .hero-features-inline {
  display: flex;
  gap: 26px;
  margin-top: 36px;
  flex-wrap: wrap;
}
.home-hero .hf-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--ink);
  font-weight: 500;
}
.home-hero .hf-item svg {
  color: var(--accent);
}

.home-hero .hero-trust {
  margin-top: 64px;
  border-top: 1px solid var(--border);
  padding-top: 32px;
}
.home-hero .hero-trust-label {
  display: block;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--ink-muted);
  text-transform: uppercase;
  margin-bottom: 20px;
}
.home-hero .hero-trust-logos {
  display: flex;
  align-items: center;
  gap: 36px;
  flex-wrap: wrap;
}
.home-hero .ht-logo {
  font-family: var(--sans);
  font-weight: 700;
  font-size: 20px;
  color: var(--ink-soft);
  opacity: 0.4;
  letter-spacing: -0.03em;
  transition: opacity 0.3s;
}
.home-hero .ht-logo:hover {
  opacity: 0.8;
}

@media (max-width: 960px) {
  .home-hero {
    padding: 72px 24px 72px;
    background-size: cover;
    background-position: right -200px center;
  }
}
@media (max-width: 640px) {
  .home-hero {
    padding: 56px 20px 64px;
  }
  .home-hero h1 {
    font-size: clamp(36px, 8vw, 48px);
  }
  .home-hero .cta-row {
    flex-direction: column;
    gap: 16px;
  }
  .home-hero .btn-primary,
  .home-hero .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

`;

  // also check for \n instead of \r\n
  let start = code.indexOf('/* ============================================================\n   HERO');
  let end = code.indexOf('/* ============================================================\n   INTRO BLURB');
  if (start === -1) {
    start = styleStart;
    end = styleEnd;
  }

  if (start !== -1 && end !== -1) {
    code = code.substring(0, start) + newStyles + code.substring(end);
  } else {
    console.log("Could not find style section");
  }

} else {
  // Try without \r
  const styleStart2 = code.indexOf('/* ============================================================\n   HERO');
  const styleEnd2 = code.indexOf('/* ============================================================\n   INTRO BLURB');
  if (styleStart2 !== -1 && styleEnd2 !== -1) {
    const newStyles = `/* ============================================================
   HERO
   ============================================================ */
.home-hero {
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
  background-image: linear-gradient(90deg, #0e0f3b 0%, rgb(14 15 59 / 0%) 40%, rgb(14 15 59 / 0%) 70%, transparent 100%), url(/services/service-page/about2.png);
  background-size: 60% auto;
  background-position: right 0% center;
  background-repeat: no-repeat;
  color: var(--ink);
  min-height: 700px;
  overflow: hidden;
}

.home-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.4), transparent 50%);
  pointer-events: none;
}

.home-hero > * {
  position: relative;
  z-index: 1;
}

.home-hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

.home-hero .service-hero-copy {
  max-width: 720px;
  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-slide-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.home-hero h1 {
  font-family: var(--serif);
  font-size: clamp(48px, 5.8vw, 86px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 400;
  color: var(--ink);
  text-shadow: none;
}
.home-hero h1 em {
  font-style: italic;
  color: var(--accent, #b09559);
}

.home-hero .service-hero-lede {
  color: var(--ink-soft);
  text-shadow: none;
  font-size: 19px;
  margin-top: 24px;
  max-width: 520px;
  line-height: 1.6;
}

.home-hero .cta-row {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.home-hero .btn-primary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: var(--accent, #b09559);
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 24px rgba(176, 149, 89, 0.3);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.home-hero .btn-primary:hover {
  background: #9a824e;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(176, 149, 89, 0.4);
}

.home-hero .btn-secondary {
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.home-hero .btn-secondary:hover {
  background: rgba(0, 0, 0, 0.08);
}

.home-hero .hero-features-inline {
  display: flex;
  gap: 26px;
  margin-top: 36px;
  flex-wrap: wrap;
}
.home-hero .hf-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--ink);
  font-weight: 500;
}
.home-hero .hf-item svg {
  color: var(--accent);
}

.home-hero .hero-trust {
  margin-top: 64px;
  border-top: 1px solid var(--border);
  padding-top: 32px;
}
.home-hero .hero-trust-label {
  display: block;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--ink-muted);
  text-transform: uppercase;
  margin-bottom: 20px;
}
.home-hero .hero-trust-logos {
  display: flex;
  align-items: center;
  gap: 36px;
  flex-wrap: wrap;
}
.home-hero .ht-logo {
  font-family: var(--sans);
  font-weight: 700;
  font-size: 20px;
  color: var(--ink-soft);
  opacity: 0.4;
  letter-spacing: -0.03em;
  transition: opacity 0.3s;
}
.home-hero .ht-logo:hover {
  opacity: 0.8;
}

`;
    code = code.substring(0, styleStart2) + newStyles + code.substring(styleEnd2);
  } else {
    console.log("Could not find style section");
  }
}

fs.writeFileSync('src/pages/HomePage.vue', code);
