const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src');

function walk(dir, callback) {
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walk(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

const replacements = [
  // Legacy brown colors replacements
  { search: /rgba\(115,\s*78,\s*42,/g, replace: 'rgba(9, 64, 123,' },
  { search: /rgba\(105,\s*72,\s*41,/g, replace: 'rgba(9, 64, 123,' },
  { search: /rgba\(77,\s*52,\s*30,/g, replace: 'rgba(9, 64, 123,' },
  { search: /rgba\(160,\s*125,\s*77,/g, replace: 'rgba(9, 64, 123,' },
  { search: /rgba\(158,\s*118,\s*80,/g, replace: 'rgba(9, 64, 123,' },
  { search: /rgba\(130,\s*94,\s*58,/g, replace: 'rgba(9, 64, 123,' },
  { search: /#b69a72/gi, replace: '#7FCDEE' },
  { search: /#9d7b4f/gi, replace: '#e07d10' },

  // Restoring solution page original images
  { search: /\/case-study\/immigration\.png/g, replace: '/services/service-page/immigration.webp' },
  { search: /\/case-study\/contract-detail\.png/g, replace: '/services/service-page/contract.webp' }
];

walk(directory, (filePath) => {
  const ext = path.extname(filePath);
  if (ext === '.vue' || ext === '.css') {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    replacements.forEach(({ search, replace }) => {
      if (search.test(content)) {
        content = content.replace(search, replace);
        hasChanges = true;
      }
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
