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

        // Replace `padding: 60px 24px;` or similar with `padding-top: 60px; padding-bottom: 60px; padding-inline: clamp(...)`
        // Actually, let's just forcefully inject padding-inline into the specific components where hero is missing it.
        const classesToPatch = [
            '.global-hero',
            '.gh-hero',
            '.event-detail-hero',
            '.event-hero',
            '.press-hero',
            '.blog-hero',
            '.contact-hero',
            '.about-hero',
            '.compliance-hero',
            '.contractor-hero',
            '.borderless-header'
        ];

        classesToPatch.forEach(cls => {
            const regex = new RegExp(`(${cls.replace('.', '\\.')}\\s*\\{[^}]*)`, 'g');
            content = content.replace(regex, (match, p1) => {
                if (!match.includes('padding-inline')) {
                    modified = true;
                    return p1 + '\n  padding-inline: clamp(32px, 8vw, 96px);';
                }
                return match;
            });
        });

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated padding in ${filePath}`);
        }
    }
});

console.log("Done checking heroes.");
