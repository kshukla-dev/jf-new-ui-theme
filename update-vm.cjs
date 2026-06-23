const fs = require('fs');
let code = fs.readFileSync('src/pages/AboutPage.vue', 'utf-8');

const oldVm = `  <!-- ============= VISION / MISSION ============= -->
  <section class="section container">
    <div class="vm-grid">
      <div class="vm-card">
        <span class="tag">Vision</span>
        <p>A world in which international employability has no barriers.</p>
      </div>
      <div class="vm-card vm-card-dark">
        <span class="tag">Mission</span>
        <p>Enabling international labour mobility for organizations and people.</p>
      </div>
    </div>
  </section>`;

const newVm = `  <!-- ============= VISION / MISSION ============= -->
  <section class="section container">
    <div class="vm-grid">
      <div class="vm-card-premium">
        <!-- Bright, open horizon image for Vision -->
        <div class="vm-bg" style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80');"></div>
        <div class="vm-overlay"></div>
        <div class="vm-content">
          <span class="vm-badge">Vision</span>
          <p>A world in which international employability has no barriers.</p>
        </div>
      </div>
      
      <div class="vm-card-premium vm-mission">
        <!-- Collaborative global team image for Mission -->
        <div class="vm-bg" style="background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80');"></div>
        <div class="vm-overlay"></div>
        <div class="vm-content">
          <span class="vm-badge">Mission</span>
          <p>Enabling international labour mobility for organizations and people.</p>
        </div>
      </div>
    </div>
  </section>`;

code = code.replace(oldVm, newVm);

const newCss = `
/* =======================================
   Premium Vision / Mission Cards
   ======================================= */
.vm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 40px;
}

.vm-card-premium {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 20px 40px rgba(0,0,0,0.06);
  cursor: pointer;
  background: white;
}

.vm-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.vm-card-premium:hover .vm-bg {
  transform: scale(1.05);
}

/* Vision uses a light overlay so text is dark */
.vm-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0) 100%);
  z-index: 2;
  transition: opacity 0.4s ease;
}

.vm-content {
  position: relative;
  z-index: 3;
  padding: 48px;
  color: var(--ink);
  transform: translateY(16px);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.vm-card-premium:hover .vm-content {
  transform: translateY(0);
}

.vm-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(8px);
  color: var(--ink);
}

.vm-content p {
  font-family: var(--serif);
  font-size: clamp(28px, 3.5vw, 42px);
  line-height: 1.25;
  font-weight: 400;
  margin: 0;
}

/* Mission uses a rich golden overlay so text is white */
.vm-card-premium.vm-mission .vm-overlay {
  background: linear-gradient(to top, rgba(176,149,89,1) 0%, rgba(176,149,89,0.8) 40%, rgba(176,149,89,0) 100%);
}

.vm-card-premium.vm-mission .vm-content {
  color: white;
}

.vm-card-premium.vm-mission .vm-badge {
  border-color: rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.15);
  color: white;
}

@media (max-width: 960px) {
  .vm-grid {
    grid-template-columns: 1fr;
  }
  .vm-card-premium {
    min-height: 400px;
  }
}
</style>
`;

if (!code.includes('Premium Vision / Mission Cards')) {
  code = code.replace('</style>', newCss);
}

fs.writeFileSync('src/pages/AboutPage.vue', code);
