/* Generates the React Native (packages/asterisk-native/src/core/icon-paths.js) and Kotlin Compose (IconPaths.kt) icons from the
   web icons (src/core/icons.js), so every platform draws the same icons.
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
// Card machine icons (Kotlin terminal header and receipts; also available in React Native).
icons.wifi = { paths: ['M2.5 9a14 14 0 0 1 19 0', 'M5.5 12.5a9.5 9.5 0 0 1 13 0', 'M8.5 16a5 5 0 0 1 7 0', 'M12 19.5h.01'], flip: false };
icons.printer = { paths: ['M7 9V3h10v6', 'M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2', 'M7 14h10v7H7z'], flip: false };
icons.contactless = { paths: ['M8 8a6 6 0 0 1 0 8', 'M12 5a10 10 0 0 1 0 14', 'M16 2a14 14 0 0 1 0 20'], flip: false };
const out = '/* Generated from src/core/icons.js by scripts/build-native-icons.mjs. Do not edit. 24×24, stroke 1.75, round caps; flip = mirrors in right-to-left. */\nexport const ICON_PATHS = ' + JSON.stringify(icons, null, 1) + ';\n';
const kt = '// Generated from src/core/icons.js by scripts/build-native-icons.mjs. Do not edit. 24×24, stroke 1.75, round caps.\n'
  + 'package com.areeba.asterisk.compose\n\n/** SVG path data for each icon; [flip] icons mirror in right-to-left. */\n'
  + 'class IconDef(val paths: List<String>, val flip: Boolean)\n\n'
  + 'val ICON_PATHS: Map<String, IconDef> = mapOf(\n'
  + Object.entries(icons).map(([k, v]) => `    "${k}" to IconDef(listOf(${v.paths.map((d) => JSON.stringify(d)).join(', ')}), ${v.flip}),`).join('\n') + '\n)\n';
const files = {
  'packages/asterisk-native/src/core/icon-paths.js': out,
  'packages/asterisk-kotlin/compose/src/commonMain/kotlin/com/areeba/asterisk/compose/IconPaths.kt': kt,
};
if (process.argv.includes('--check')) {
  const stale = Object.entries(files).filter(([f, text]) => !fs.existsSync(path.join(ROOT, f)) || fs.readFileSync(path.join(ROOT, f), 'utf8') !== text).map(([f]) => f);
  if (stale.length) { console.error('✗ icons out of date (' + stale.join(', ') + '): node scripts/build-native-icons.mjs'); process.exit(1); }
  console.log('✓ native and Kotlin icons up to date');
} else {
  for (const [f, text] of Object.entries(files)) fs.writeFileSync(path.join(ROOT, f), text);
  console.log(`Wrote ${Object.keys(icons).length} icons for React Native and Kotlin.`);
}
