const fs = require('fs');
let code = fs.readFileSync('src/pages/AboutPage.vue', 'utf-8');

// Replace the CSS
const newCss = `
/* =======================================
   Premium Leadership Team
   ======================================= */
.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin-top: 48px;
}
.team-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  border: 1px solid rgba(0,0,0,0.03);
  cursor: pointer;
}
.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 48px rgba(176, 149, 89, 0.12);
}
.team-photo {
  width: 100%;
  height: 380px;
  overflow: hidden;
  position: relative;
  background: var(--bg-card);
}
.team-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 40%);
  z-index: 1;
}
.team-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 0;
}
.team-card:hover .team-photo img {
  transform: scale(1.05);
}
.team-body {
  padding: 48px 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.team-body::before {
  content: '"';
  position: absolute;
  top: 32px;
  right: 40px;
  font-family: var(--serif);
  font-size: 80px;
  color: rgba(176, 149, 89, 0.15);
  line-height: 1;
  font-style: italic;
  pointer-events: none;
}
.team-body h3 {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 6px;
  color: var(--ink);
}
.team-role {
  display: block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 24px;
}
.team-body p {
  font-size: 15.5px;
  color: var(--ink-soft);
  line-height: 1.7;
  position: relative;
  z-index: 2;
}

@media (max-width: 960px) {
  .team-grid {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}
@media (max-width: 640px) {
  .team-photo {
    height: 300px;
  }
  .team-body {
    padding: 32px 24px;
  }
}
</style>`;

// We'll replace the existing .team-grid CSS block entirely.
// First, find where .team-grid starts
const oldStyleStart = code.indexOf('/* Team */');
const oldStyleEnd = code.indexOf('@media (max-width: 1024px)'); // It's right before this

if (oldStyleStart !== -1 && oldStyleEnd !== -1) {
  code = code.substring(0, oldStyleStart) + code.substring(oldStyleEnd);
}

// Now inject the new styles at the end
if (!code.includes('Premium Leadership Team')) {
  code = code.replace('</style>', newCss);
}

// Update the HTML to make sure it matches the new design perfectly
// No changes needed to HTML since it already has team-card, team-photo, team-body

fs.writeFileSync('src/pages/AboutPage.vue', code);
