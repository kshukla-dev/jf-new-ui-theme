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

let findings = [];

walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('.css') || filePath.endsWith('.vue')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find things like `padding: 0 32px;` or `padding: 40px 32px;` or `padding: 60px 32px 80px;`
        // We look for blocks.
        const blockRegex = /([\.a-zA-Z0-9_-]+)[^{]*\{([^}]*?padding:\s*([\d\.]+(?:px|rem|em)|0)\s+([\d\.]+(?:px|rem|em))\s*(?:([\d\.]+(?:px|rem|em)|0)\s*)?(?:([\d\.]+(?:px|rem|em)|0)\s*)?(?:!important)?\s*;[^}]*)\}/g;
        
        let match;
        while ((match = blockRegex.exec(content)) !== null) {
            const selector = match[1].trim();
            const cssBody = match[2];
            const pTop = match[3];
            const pRight = match[4];
            const pBottom = match[5];
            const pLeft = match[6];
            
            // Check if right/left padding is around 24-40px (common container padding)
            if (pRight === '32px' || pRight === '24px' || pRight === '40px' || pRight === '20px') {
                // Ignore small elements like buttons, cards, inputs
                const lowerSel = selector.toLowerCase();
                if (lowerSel.includes('btn') || lowerSel.includes('button') || lowerSel.includes('card') || lowerSel.includes('input') || lowerSel.includes('icon')) {
                    continue;
                }
                
                // If it's a 2-value padding (top/bottom, right/left) or 3-value or 4-value
                findings.push({ file: path.basename(filePath), selector, padding: `top:${pTop} right:${pRight} bottom:${pBottom} left:${pLeft}` });
            }
        }
    }
});

console.log(JSON.stringify(findings, null, 2));
