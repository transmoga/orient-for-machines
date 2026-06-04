/**
 * One-time converter: legacy/*.html → src/pages/*.astro
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const LEGACY = path.join(ROOT, 'legacy');
const OUT = path.join(ROOT, 'src', 'pages');

const PRIVATE = new Set(['pricing', 'strategy']);
const SKIP = new Set(['Hero Directions']);

const GA_SNIPPET = `
{import.meta.env.PUBLIC_GA_MEASUREMENT_ID && (
  <>
    <script async src={\`https://www.googletagmanager.com/gtag/js?id=\${import.meta.env.PUBLIC_GA_MEASUREMENT_ID}\`}></script>
    <script is:inline define:vars={{ gaId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID }}>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', gaId);
    </script>
  </>
)}
`;

function slugFromName(name) {
  if (name === 'index') return 'index.astro';
  return `${name}.astro`;
}

for (const file of fs.readdirSync(LEGACY)) {
  if (!file.endsWith('.html')) continue;
  const base = file.replace(/\.html$/, '');
  if (SKIP.has(base)) continue;

  const html = fs.readFileSync(path.join(LEGACY, file), 'utf8');
  const prerender = PRIVATE.has(base) ? 'false' : 'true';
  const frontmatter = `---
export const prerender = ${prerender};
---\n`;

  let body = html
    .replace(/href="(?!https?:\/\/|\/|#)([^"]+)"/g, 'href="/$1"')
    .replace(/src="(?!https?:\/\/|\/)([^"]+)"/g, 'src="/$1"')
    .replace(/<script src="\/(landing|machines)\.js">/g, '<script is:inline src="/$1.js">');

  if (body.includes('</head>')) {
    body = body.replace('</head>', `${GA_SNIPPET}\n</head>`);
  }

  const outName = slugFromName(base);
  fs.writeFileSync(path.join(OUT, outName), frontmatter + body);
  console.log('wrote', outName, `(prerender=${prerender})`);
}
