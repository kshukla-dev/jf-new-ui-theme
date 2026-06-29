const fs = require('fs');

const filesToPatch = [
  'd:/J&F/new_blue_them_UI/src/pages/AboutPage.vue',
  'd:/J&F/new_blue_them_UI/src/pages/CaseStudiesPage.vue',
  'd:/J&F/new_blue_them_UI/src/pages/EORPage.vue',
  'd:/J&F/new_blue_them_UI/src/pages/HomePage.vue',
  'd:/J&F/new_blue_them_UI/src/pages/ImmigrationPage.vue',
  'd:/J&F/new_blue_them_UI/src/pages/PayrollPage.vue',
  'd:/J&F/new_blue_them_UI/src/styles/eor-modern.css'
];

filesToPatch.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let lines = content.split('\n');
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    // Ignore the specific padding in HomePage
    if (filePath.endsWith('HomePage.vue') && lines[i].includes('padding: 0 24px 24px 80px;')) {
      continue;
    }
    
    if (lines[i].includes('padding: 0 32px;') || lines[i].includes('padding: 0 24px;')) {
      lines[i] = lines[i].replace(/padding:\s*0\s*(32px|24px)\s*;/, 'padding-inline: clamp(32px, 8vw, 96px);');
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Patched ${filePath}`);
  }
});
