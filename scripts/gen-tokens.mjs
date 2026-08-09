// Regenerates tokens.json from src/tokens.js, and checks that every token
// declared there also appears in styles/bt-professional.css (the cascade's source of
// truth). Run after editing either file: `npm run tokens`.
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { themeJson, COLOR_GROUPS, RADII } from '../src/tokens.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'styles', 'bt-professional.css'), 'utf8');

const declared = [...COLOR_GROUPS.flatMap(g => g.tokens.map(t => t.token)), ...RADII.map(r => r.token)];
const missing = declared.filter(token => !css.includes(`${token}:`));
if (missing.length) {
  console.error(`Tokens in src/tokens.js but not declared in styles/bt-professional.css:\n  ${missing.join('\n  ')}`);
  process.exit(1);
}

writeFileSync(join(root, 'tokens.json'), JSON.stringify(themeJson(), null, 2) + '\n');
console.log(`tokens.json written (${declared.length} tokens).`);
