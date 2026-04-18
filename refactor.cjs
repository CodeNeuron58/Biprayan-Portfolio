const fs = require('fs');

let css = fs.readFileSync('src/styles/main.scss', 'utf8');

// Colors
css = css.replace(/--bg: #0a0a0a;/g, '--bg: #0f172a;');
css = css.replace(/--bg-2: #0f0f0f;/g, '--bg-2: #1e293b;');
css = css.replace(/--bg-card: #111111;/g, '--bg-card: #1e293b;');
css = css.replace(/--bg-card-hover: #161616;/g, '--bg-card-hover: #334155;');
css = css.replace(/--cyan: #00f5ff;/g, '--accent: #10b981;');
css = css.replace(/--cyan-dim: rgba\(0,245,255,0\.15\);/g, '--accent-dim: rgba(16,185,129,0.15);');
css = css.replace(/--cyan-glow: rgba\(0,245,255,0\.08\);/g, '--accent-glow: rgba(16,185,129,0.08);');
css = css.replace(/--cyan-border: rgba\(0,245,255,0\.25\);/g, '--accent-border: rgba(16,185,129,0.25);');

css = css.replace(/rgba\(0,245,255/g, 'rgba(16,185,129'); // catch any missed rgbas
css = css.replace(/--cyan/g, '--accent');

css = css.replace(/--text: #e8e8e8;/g, '--text: #f8fafc;');
css = css.replace(/--text-dim: #888;/g, '--text-dim: #cbd5e1;');
css = css.replace(/--text-muted: #555;/g, '--text-muted: #94a3b8;');

// Font variables
css = css.replace(/--font-body: 'Inter', sans-serif;/g, `--font-heading: 'Instrument Serif', serif;\n  --font-body: 'Plus Jakarta Sans', sans-serif;`);

// Font usage in headings
css = css.replace(/\.hero-name \{\s+font-family: var\(--font-mono\);/g, `.hero-name {\n  font-family: var(--font-heading);\n  font-weight: 400;`);
css = css.replace(/\.contact-headline \{\s+font-family: var\(--font-mono\);/g, `.contact-headline {\n  font-family: var(--font-heading);\n  font-weight: 400;`);
css = css.replace(/font-family: var\(--font-mono\);\n\s+font-size: clamp\(1\.6rem, 3vw, 2\.2rem\);\n\s+font-weight: 800;/g, 'font-family: var(--font-heading);\n  font-size: clamp(2.2rem, 4vw, 3rem);\n  font-weight: 400;');

fs.writeFileSync('src/styles/main.scss', css);
console.log('Done refactoring');
