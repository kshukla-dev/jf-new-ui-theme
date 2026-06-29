const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

const targetDir = 'd:/J&F/new_blue_them_UI/src';

walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('.css') || filePath.endsWith('.vue')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Find font-size: 30px up to 99px that are not inside a clamp
        content = content.replace(/font-size:\s*([3-9][0-9])px;/g, (match, p1) => {
            const size = parseInt(p1, 10);
            if (size > 26) {
                modified = true;
                const minSize = Math.max(22, Math.floor(size * 0.6));
                return `font-size: clamp(${minSize}px, 4vw, ${size}px);`;
            }
            return match;
        });

        // Also handle cases with !important
        content = content.replace(/font-size:\s*([3-9][0-9])px\s*!important;/g, (match, p1) => {
            const size = parseInt(p1, 10);
            if (size > 26) {
                modified = true;
                const minSize = Math.max(22, Math.floor(size * 0.6));
                return `font-size: clamp(${minSize}px, 4vw, ${size}px) !important;`;
            }
            return match;
        });

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});

console.log("Done updating font sizes.");
