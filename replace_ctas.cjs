const fs = require('fs');
const pages = {
  'ImmigrationPage.vue': 'Ready to streamline your immigration process?',
  'PayrollPage.vue': 'Ready to streamline your global payroll?',
  'CompliancePage.vue': 'Ready to ensure full compliance?',
  'ContractorPage.vue': 'Ready to simplify contractor management?',
  'CaseStudiesPage.vue': 'Write your own success story',
  'GlobalHiringGuidePage.vue': 'Start hiring globally today',
  'AboutPage.vue': "Let's build your team",
  'AdvantagesPage.vue': 'Ready to work',
  'TestimonialsPage.vue': 'Become our next success story',
  'CareerPage.vue': "Don't see the right role?"
};

for (const [file, title] of Object.entries(pages)) {
  const filePath = 'src/pages/' + file;
  if (!fs.existsSync(filePath)) {
    console.log('Not found: ' + file);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Inject import if not present
  if (!content.includes('GlobalCTA')) {
    content = content.replace(/<script setup[^>]*>/, match => match + '\nimport GlobalCTA from \'@/components/sections/GlobalCTA.vue\'');
  }

  // Replace cta-warm-wrap section
  const ctaRegex = /<section class=\"cta-warm-wrap\">[\s\S]*?<\/section>/;
  if (ctaRegex.test(content)) {
    content = content.replace(ctaRegex, `<GlobalCTA title="${title}" />`);
  } else {
    // If not found, append before </template>
    content = content.replace('</template>', `\n  <GlobalCTA title="${title}" />\n</template>`);
  }

  fs.writeFileSync(filePath, content);
  console.log('Updated ' + file);
}
