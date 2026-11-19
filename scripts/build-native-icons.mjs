/* Generates packages/asterisk-native/src/core/icon-paths.js from the web icons (src/core/icons.js), so both platforms draw the same icons.
   Usage: node scripts/build-native-icons.mjs [--check] */
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const src = fs.readFileSync(path.join(ROOT, 'src/core/icons.js'), 'utf8');
const icons = {};
for (const m of src.matchAll(/^\s*(\w+): Icon\((\[[^\]]*\])(, true)?\)/gm)) icons[m[1]] = { paths: JSON.parse(m[2]), flip: !!m[3] };
// Drawn inside components on the web (Checkbox tick and dash, PaymentCard contactless), shared here as icons.
icons.tick = { paths: ['M5.25 12.75l4.5 4.5 9-10.5'], flip: false };
icons.dash = { paths: ['M6 12h12'], flip: false };
icons.contactless = { paths: ['M8 8a6 6 0 0 1 0 8', 'M12 5a10 10 0 0 1 0 14', 'M16 2a14 14 0 0 1 0 20'], flip: false };
const out = '/* Generated from src/core/icons.js by scripts/build-native-icons.mjs. Do not edit. 24×24, stroke 1.75, round caps; flip = mirrors in right-to-left. */\nexport const ICON_PATHS = ' + JSON.stringify(icons, null, 1) + ';\n';
const file = path.join(ROOT, 'packages/asterisk-native/src/core/icon-paths.js');
if (process.argv.includes('--check')) { if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== out) { console.error('✗ native icons out of date: node scripts/build-native-icons.mjs'); process.exit(1); } console.log('✓ native icons up to date'); }
else { fs.writeFileSync(file, out); console.log(`Wrote ${Object.keys(icons).length} icons for React Native.`); }
