const fs = require('fs');
const path = require('path');
const dir = 'd:/J&F/new_blue_them_UI/src/pages/';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if(!file.endsWith('.vue')) return;
  let p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');
  let original = content;
  
  if (file === 'CountryPage.vue') {
    content = content.replace(/<div class="cp-hero-tag">[\s\S]*?<\/div>\s*/, '');
  } else {
    // Looks for a span with class containing tag/eyebrow that immediately precedes an <h1>
    content = content.replace(/<span class="[^"]*(tag|eyebrow)[^"]*">\s*.*?\s*<\/span>\s*(?=<h1)/gi, '');
  }
  
  if (content !== original) {
    fs.writeFileSync(p, content, 'utf8');
    console.log('Updated ' + file);
  }
});
