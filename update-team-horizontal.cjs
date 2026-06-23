const fs = require('fs');
let code = fs.readFileSync('src/pages/AboutPage.vue', 'utf-8');

const newCss = `
/* =======================================
   Premium Leadership Team (Horizontal)
   ======================================= */
.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 48px;
}
.team-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 12px 36px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0,0,0,0.03);
  align-items: stretch;
}
.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(176, 149, 89, 0.15);
}
.team-photo {
  width: 260px;
  flex-shrink: 0;
  position: relative;
}
.team-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.team-body {
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.team-body h3 {
  font-family: var(--serif);
  font-size: 28px;
  margin-bottom: 6px;
  color: var(--ink);
}
.team-role {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
}
.team-body p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.65;
}

@media (max-width: 1100px) {
  .team-grid {
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: 48px auto 0;
  }
}
@media (max-width: 640px) {
  .team-card {
    flex-direction: column;
  }
  .team-photo {
    width: 100%;
    height: 300px;
  }
  .team-body {
    padding: 32px 24px;
  }
}
</style>
`;

const styleStart = code.indexOf('/* =======================================\n   Premium Leadership Team\n   ======================================= */');
const endStyle = code.indexOf('</style>');

if (styleStart !== -1) {
  code = code.substring(0, styleStart) + newCss.replace('</style>', '') + '\n</style>';
} else {
  // try \r\n
  const styleStart2 = code.indexOf('/* =======================================\r\n   Premium Leadership Team\r\n   ======================================= */');
  if (styleStart2 !== -1) {
    code = code.substring(0, styleStart2) + newCss.replace('</style>', '') + '\n</style>';
  }
}

fs.writeFileSync('src/pages/AboutPage.vue', code);
