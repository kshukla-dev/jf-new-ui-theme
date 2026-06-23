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
  { search: /rgba\(176,\s*149,\s*89,/g, replace: 'rgba(9, 64, 123,' },
  { search: /rgba\(176,149,89,/g, replace: 'rgba(9,64,123,' },
  { search: /#9a824e/gi, replace: '#e07d10' },
  { search: /#ede9e0/gi, replace: 'var(--border, #e5e7eb)' },
  { search: /#f0ece5/gi, replace: 'var(--border, #e5e7eb)' },
  { search: /#f6f4f0/gi, replace: 'var(--bg-card, #f9fafb)' },
  { search: /#e4d8c2/gi, replace: 'var(--dark, #0E0F3B)' },
  { search: /#a26748/gi, replace: '#06305d' },
  { search: /#947a44/gi, replace: '#09407B' },
  { search: /#F8D38D/g, replace: '#7FCDEE' }
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
      console.log(`Updated colors in: ${filePath}`);
    }
  }
});
