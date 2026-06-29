const fs = require('fs');
const path = require('path');

const dir = 'd:/J&F/new_blue_them_UI/src';

function scan(d) {
    fs.readdirSync(d).forEach(f => {
        let p = path.join(d, f);
        if (fs.statSync(p).isDirectory()) scan(p);
        else if (p.endsWith('.vue') || p.endsWith('.css')) {
            let code = fs.readFileSync(p, 'utf8');
            let lines = code.split('\n');
            lines.forEach((line, i) => {
                if (line.includes('padding: 0 32px') || line.includes('padding: 0 24px') || line.includes('padding: 0 5%')) {
                    console.log(`${p}:${i+1} -> ${line.trim()}`);
                }
            });
        }
    });
}
scan(dir);
