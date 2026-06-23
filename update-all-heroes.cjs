const fs = require('fs');

function updatePageHero(filePath, dataObjName) {
  let code = fs.readFileSync(filePath, 'utf-8');
  
  const headerStart = code.indexOf('<header class="container service-hero">');
  if (headerStart === -1) {
    console.log("Could not find header in " + filePath);
    return;
  }
  const headerEnd = code.indexOf('</header>') + 9;
  
  const oldHeader = code.substring(headerStart, headerEnd);
  
  const tagMatch = oldHeader.match(/<span class="tag">(.*?)<\\/span>/);
  const tag = tagMatch ? tagMatch[0] : '';
  
  const h1Match = oldHeader.match(/<h1>([\\s\\S]*?)<\\/h1>/);
  const h1 = h1Match ? h1Match[0] : '';
  
  const ledeMatch = oldHeader.match(/<p class="service-hero-lede">([\\s\\S]*?)<\\/p>/);
  const lede = ledeMatch ? ledeMatch[0] : '';
  
  const ctaMatch = oldHeader.match(/<div class="cta-row">([\\s\\S]*?)<\\/div>/);
  const ctaHTML = ctaMatch ? ctaMatch[1].trim() : '';
  
  const badgeMatch = oldHeader.match(/<div class="service-hero-badge">([\\s\\S]*?)<\\/div>/);
  const badgeHTML = badgeMatch ? badgeMatch[1].trim() : '';

  let imageSrc = '';
  if (dataObjName === 'tp') imageSrc = 'tp.definition.image';
  if (dataObjName === 'advantages') imageSrc = 'advantages.definition.image';
  if (dataObjName === 'career') imageSrc = 'career.definition.image';

  let trustRow = '';
  if (badgeHTML) {
    const formattedBadge = badgeHTML
      .replace(/<strong>/, '<strong style="color: var(--accent); font-weight: 700; font-size: 16px; margin-right: 8px;">')
      .replace(/<span>/, '<span style="font-size: 14px; color: var(--ink-soft); font-weight: 500;">');
    trustRow = '<div class="trust-row" style="display: inline-flex; align-items: center; gap: 16px; background: rgba(255,255,255,0.8); padding: 12px 24px; border-radius: 999px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 8px 24px rgba(0,0,0,0.03);">' + formattedBadge + '</div>';
  }

  const featuresCode = '<div class="service-hero-features" style="display: flex; gap: 24px; margin-top: 32px; flex-wrap: wrap;">' +
    '<div v-for="(f, i) in ' + dataObjName + '.definition.keyFeatures" :key="i" class="hero-feature" style="display: flex; align-items: center; gap: 8px; font-weight: 500; font-size: 15px; color: var(--ink);">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--accent);"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M2 12H22"/><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"/></svg>' +
      '{{ f }}' +
    '</div>' +
  '</div>';

  const newHeader = '  <!-- ============= HERO ============= -->\\n' +
    '  <header class="service-hero shared-premium-hero" :style="{ backgroundImage: \\'linear-gradient(90deg, #f4f1ec 0%, rgb(244 241 236 / 95%) 30%, rgba(253, 251, 247, 0.5) 65%, rgba(253, 251, 247, 0) 100%), url(\\' + ' + imageSrc + ' + \\')\\' }">\\n' +
    '    <div class="shared-premium-hero-inner">\\n' +
    '      <div class="service-hero-copy">\\n' +
    '        ' + tag + '\\n' +
    '        ' + h1 + '\\n' +
    '        ' + lede + '\\n\\n' +
    '        ' + featuresCode + '\\n\\n' +
    '        <div class="cta-row" style="margin-top: 40px; display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 32px;">\\n' +
    '          ' + ctaHTML + '\\n' +
    '        </div>\\n\\n' +
    '        ' + trustRow + '\\n' +
    '      </div>\\n' +
    '    </div>\\n' +
    '  </header>';

  code = code.replace(oldHeader, newHeader);
  fs.writeFileSync(filePath, code);
  console.log("Updated " + filePath);
}

updatePageHero('src/pages/TestimonialsPage.vue', 'tp');
updatePageHero('src/pages/AdvantagesPage.vue', 'advantages');
updatePageHero('src/pages/CareerPage.vue', 'career');

let globalCss = fs.readFileSync('src/styles/service-page.css', 'utf-8');
if (!globalCss.includes('Shared Premium Hero')) {
  const css = "\\n/* =======================================\\n" +
  "   Shared Premium Hero\\n" +
  "   ======================================= */\\n" +
  ".shared-premium-hero {\\n" +
  "  position: relative;\\n" +
  "  left: 50%;\\n" +
  "  right: 50%;\\n" +
  "  margin-left: -50vw;\\n" +
  "  margin-right: -50vw;\\n" +
  "  width: 100vw;\\n" +
  "  box-sizing: border-box;\\n" +
  "  padding: 100px 0 120px;\\n" +
  "  display: block;\\n" +
  "  background-color: #f4f1ec;\\n" +
  "  background-size: 55% auto;\\n" +
  "  background-position: right 0% center;\\n" +
  "  background-repeat: no-repeat;\\n" +
  "  color: var(--ink);\\n" +
  "  min-height: 700px;\\n" +
  "  overflow: hidden;\\n" +
  "  margin-bottom: 40px;\\n" +
  "}\\n" +
  ".shared-premium-hero-inner {\\n" +
  "  max-width: 1240px;\\n" +
  "  margin: 0 auto;\\n" +
  "  padding: 0 32px;\\n" +
  "}\\n" +
  ".shared-premium-hero .service-hero-copy {\\n" +
  "  max-width: 640px;\\n" +
  "  animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;\\n" +
  "}\\n" +
  ".shared-premium-hero h1 {\\n" +
  "  font-family: var(--serif);\\n" +
  "  font-size: clamp(48px, 5.5vw, 86px);\\n" +
  "  line-height: 1.05;\\n" +
  "  margin-bottom: 24px;\\n" +
  "  font-weight: 400;\\n" +
  "  letter-spacing: -0.02em;\\n" +
  "}\\n" +
  ".shared-premium-hero h1 em {\\n" +
  "  font-style: italic;\\n" +
  "  color: var(--accent);\\n" +
  "}\\n" +
  ".shared-premium-hero .service-hero-lede {\\n" +
  "  font-size: 19px;\\n" +
  "  color: var(--ink-soft);\\n" +
  "  line-height: 1.6;\\n" +
  "  max-width: 520px;\\n" +
  "}\\n" +
  ".shared-premium-hero .tag {\\n" +
  "  color: var(--accent);\\n" +
  "  font-weight: 600;\\n" +
  "  text-transform: uppercase;\\n" +
  "  letter-spacing: 0.1em;\\n" +
  "  font-size: 12px;\\n" +
  "  margin-bottom: 20px;\\n" +
  "  display: inline-block;\\n" +
  "}\\n" +
  ".shared-premium-hero .btn-primary {\\n" +
  "  padding: 14px 28px;\\n" +
  "  border-radius: 999px;\\n" +
  "  display: inline-flex;\\n" +
  "  align-items: center;\\n" +
  "  justify-content: center;\\n" +
  "  background: var(--accent);\\n" +
  "  color: white;\\n" +
  "  text-decoration: none;\\n" +
  "  border: none;\\n" +
  "  box-shadow: 0 8px 24px rgba(176, 149, 89, 0.3);\\n" +
  "  font-weight: 600;\\n" +
  "  transition: all 0.3s;\\n" +
  "}\\n" +
  ".shared-premium-hero .btn-primary:hover {\\n" +
  "  background: #9a824e;\\n" +
  "  transform: translateY(-2px);\\n" +
  "  box-shadow: 0 12px 32px rgba(176, 149, 89, 0.4);\\n" +
  "}\\n" +
  ".shared-premium-hero .btn-secondary {\\n" +
  "  padding: 14px 28px;\\n" +
  "  border-radius: 999px;\\n" +
  "  display: inline-flex;\\n" +
  "  align-items: center;\\n" +
  "  justify-content: center;\\n" +
  "  background: transparent;\\n" +
  "  color: var(--ink);\\n" +
  "  border: 1px solid rgba(0,0,0,0.1);\\n" +
  "  text-decoration: none;\\n" +
  "  font-weight: 500;\\n" +
  "  transition: all 0.3s;\\n" +
  "}\\n" +
  ".shared-premium-hero .btn-secondary:hover {\\n" +
  "  background: rgba(0,0,0,0.03);\\n" +
  "}\\n" +
  "@media (max-width: 960px) {\\n" +
  "  .shared-premium-hero {\\n" +
  "    background-size: 70% auto;\\n" +
  "    background-position: right -50px center;\\n" +
  "    padding: 72px 0;\\n" +
  "  }\\n" +
  "}\\n" +
  "@media (max-width: 640px) {\\n" +
  "  .shared-premium-hero {\\n" +
  "    background-size: cover;\\n" +
  "    background-position: center;\\n" +
  "    padding: 56px 0 64px;\\n" +
  "    background-image: linear-gradient(0deg, #f4f1ec 0%, #f4f1ec 70%, rgba(244,241,236,0) 100%) !important;\\n" +
  "  }\\n" +
  "  .shared-premium-hero .service-hero-copy {\\n" +
  "    margin-top: 180px;\\n" +
  "  }\\n" +
  "  .shared-premium-hero h1 {\\n" +
  "    font-size: clamp(36px, 8vw, 48px);\\n" +
  "  }\\n" +
  "}\\n";

  fs.appendFileSync('src/styles/service-page.css', css);
}
