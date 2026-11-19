/**
 * Generates areeba Asterisk tokens for every platform from tokens.json (the only source):
 *   packages/asterisk-tokens/dist/   tokens.css, tokens.json, index.js + index.d.ts (web/JS), native.js + native.d.ts (React Native)
 *   packages/asterisk-kotlin/tokens/src/main/kotlin/com/areeba/asterisk/tokens/AsteriskTokens.kt (plain Kotlin, no dependencies)
 * Usage: node scripts/build-platform-tokens.mjs [--check]
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const t = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens.json'), 'utf8'));
const check = process.argv.includes('--check');
const outputs = {};
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const pascal = (s) => camel(s).replace(/^./, (c) => c.toUpperCase());
const px = (v) => (v === '9999px' ? 9999 : parseFloat(v));
const themed = (v, th) => (typeof v === 'string' ? v : v[th] ?? v.light);
const THEMES = t.color.themes.map((x) => x.id);

// Colours → { r, g, b, a } (hex #rgb/#rrggbb/#rrggbbaa or rgba()).
function rgba(c) {
  c = c.trim();
  let m = c.match(/^#([0-9a-f]{3,8})$/i);
  if (m) { let h = m[1]; if (h.length === 3) h = h.split('').map((x) => x + x).join(''); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 }; }
  m = c.match(/^rgba?\(([^)]+)\)$/i);
  if (m) { const [r, g, b, a = 1] = m[1].split(',').map((x) => parseFloat(x)); return { r, g, b, a }; }
  throw new Error('Unsupported colour ' + c);
}
const hex8 = ({ r, g, b, a }) => '0x' + [Math.round(a * 255), r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('').toUpperCase();
const cssColor = ({ r, g, b, a }) => (a === 1 ? '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('') : `rgba(${r}, ${g}, ${b}, ${a})`);

const color = Object.fromEntries(THEMES.map((th) => [th, Object.fromEntries(t.color.tokens.map((c) => [c.name, cssColor(rgba(themed(c.value, th)))]))]));
const scale = (group) => Object.fromEntries(t[group].tokens.map((c) => [c.name, px(c.value)]));
const motion = t.motion.tokens;
const durations = Object.fromEntries(motion.filter((m) => m.name.startsWith('duration-')).map((m) => [m.name.replace('duration-', ''), parseFloat(m.value)]));
const easings = Object.fromEntries(motion.filter((m) => m.name.startsWith('ease-')).map((m) => [m.name.replace('ease-', ''), m.value.match(/cubic-bezier\(([^)]+)\)/)[1].split(',').map(Number)]));
const distance = px(motion.find((m) => m.name === 'motion-distance').value);
const typeStyles = Object.fromEntries(t.type.groups.flatMap((g) => g.styles.map((s) => {
  const size = px(s.fontSize), ls = s.letterSpacing ? Math.round(parseFloat(s.letterSpacing) * size * 100) / 100 : 0;
  return [s.name, { family: s.family || g.family, fontSize: size, lineHeight: px(s.lineHeight), fontWeight: s.fontWeight, letterSpacing: ls, tabularNums: g.name === 'Numbers' }];
})));
const shadow = Object.fromEntries(THEMES.map((th) => [th, Object.fromEntries(t.shadow.tokens.map((s) => [s.name, themed(s.value, th)]))]));

const tokens = { name: t.name, version: t.version, color, space: scale('spacing'), radius: scale('radius'), size: scale('size'), breakpoint: scale('breakpoint'),
  motion: { duration: durations, easing: easings, distance }, type: typeStyles, shadow, fontFamily: t.type.families };

// ---- web / JS ----
const D = 'packages/asterisk-tokens/dist/';
const banner = '/* areeba Asterisk tokens: generated from tokens.json by scripts/build-platform-tokens.mjs. Do not edit. */\n';
outputs[D + 'tokens.css'] = fs.readFileSync(path.join(ROOT, 'tokens.css'), 'utf8').replace(/url\("fonts\//g, 'url("../fonts/');
outputs[D + 'tokens.json'] = JSON.stringify(t, null, 2) + '\n';
outputs[D + 'index.js'] = banner + 'export const tokens = ' + JSON.stringify(tokens, null, 2) + ';\n\n/** CSS variable for a token name: cssVar("brand") → "var(--brand)". */\nexport const cssVar = (name) => `var(--${name})`;\nexport default tokens;\n';
const keys = (o) => Object.keys(o).map((k) => JSON.stringify(k)).join(' | ');
outputs[D + 'index.d.ts'] = banner + `export type ColorToken = ${keys(color.light)};
export type ThemeName = ${THEMES.map((x) => JSON.stringify(x)).join(' | ')};
export type SpaceToken = ${keys(tokens.space)};
export type RadiusToken = ${keys(tokens.radius)};
export type TypeStyle = ${keys(typeStyles)};
export interface TextStyleToken { family: 'sans' | 'mono'; fontSize: number; lineHeight: number; fontWeight: number; letterSpacing: number; tabularNums: boolean }
export interface AsteriskTokens {
  name: string; version: string;
  color: Record<ThemeName, Record<ColorToken, string>>;
  space: Record<SpaceToken, number>; radius: Record<RadiusToken, number>; size: Record<${keys(tokens.size)}, number>; breakpoint: Record<${keys(tokens.breakpoint)}, number>;
  /** Durations in ms; easings as cubic-bezier control points; distance in px. With reduced motion use 0 for every duration. */
  motion: { duration: Record<${keys(durations)}, number>; easing: Record<${keys(easings)}, [number, number, number, number]>; distance: number };
  type: Record<TypeStyle, TextStyleToken>;
  shadow: Record<ThemeName, Record<${keys(shadow.light)}, string>>;
  fontFamily: { sans: string; mono: string };
}
export declare const tokens: AsteriskTokens;
export declare function cssVar(name: ColorToken | SpaceToken | RadiusToken | string): string;
export default tokens;
`;

// ---- React Native ----
const rnFont = (family, weight) => (family === 'mono' ? 'IBMPlexMono-Regular' : { 400: 'PlusJakartaSans-Regular', 500: 'PlusJakartaSans-Medium', 600: 'PlusJakartaSans-SemiBold', 700: 'PlusJakartaSans-Bold' }[weight]);
const rnShadow = (css) => { // first layer of a CSS box-shadow → RN shadow props + Android elevation
  const m = css.match(/(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(\d+)(?:px)?(?:\s+(-?\d+)(?:px)?)?\s+(rgba?\([^)]+\)|#[0-9a-f]+)/i);
  if (!m) return {};
  const c = rgba(m[5]); const y = +m[2], blur = +m[3];
  return { shadowColor: cssColor({ ...c, a: 1 }), shadowOpacity: Math.round(c.a * 100) / 100, shadowRadius: blur / 2, shadowOffset: { width: +m[1], height: y }, elevation: Math.max(1, Math.round(blur / 3)) };
};
const native = Object.fromEntries(THEMES.map((th) => [th, {
  dark: th === 'dark',
  colors: Object.fromEntries(Object.entries(color[th]).map(([k, v]) => [camel(k), v])),
  shadow: Object.fromEntries(Object.entries(shadow[th]).map(([k, v]) => [camel(k), rnShadow(v)])),
}]));
const nativeShared = {
  space: Object.fromEntries(Object.entries(tokens.space).map(([k, v]) => [camel(k.replace('space-', 's')), v])),
  radius: Object.fromEntries(Object.entries(tokens.radius).map(([k, v]) => [camel(k.replace('radius-', '')), v])),
  size: Object.fromEntries(Object.entries(tokens.size).map(([k, v]) => [camel(k.replace('size-', '')), v])),
  motion: tokens.motion,
  type: Object.fromEntries(Object.entries(typeStyles).map(([k, s]) => [camel(k), { fontFamily: rnFont(s.family, s.fontWeight), fontSize: s.fontSize, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, ...(s.tabularNums ? { fontVariant: ['tabular-nums'] } : {}) }])),
  arabicFont: { 400: 'IBMPlexSansArabic-Regular', 500: 'IBMPlexSansArabic-Medium', 600: 'IBMPlexSansArabic-SemiBold', 700: 'IBMPlexSansArabic-Bold' },
};
outputs[D + 'native.js'] = banner + `/* React Native theme. Fonts are the files in fonts/ (link them with react-native-asset or Expo). Arabic text uses arabicFont and never letterSpacing. */
const shared = ${JSON.stringify(nativeShared, null, 2)};
export const light = { ...shared, ...${JSON.stringify(native.light, null, 2)} };
export const dark = { ...shared, ...${JSON.stringify(native.dark, null, 2)} };
export const themes = { light, dark };
export default themes;
`;
outputs[D + 'native.d.ts'] = banner + `export interface AsteriskNativeTheme {
  dark: boolean;
  colors: Record<${Object.keys(native.light.colors).map((k) => JSON.stringify(k)).join(' | ')}, string>;
  shadow: Record<${Object.keys(native.light.shadow).map((k) => JSON.stringify(k)).join(' | ')}, { shadowColor?: string; shadowOpacity?: number; shadowRadius?: number; shadowOffset?: { width: number; height: number }; elevation?: number }>;
  space: Record<${Object.keys(nativeShared.space).map((k) => JSON.stringify(k)).join(' | ')}, number>;
  radius: Record<${Object.keys(nativeShared.radius).map((k) => JSON.stringify(k)).join(' | ')}, number>;
  size: Record<${Object.keys(nativeShared.size).map((k) => JSON.stringify(k)).join(' | ')}, number>;
  motion: { duration: Record<${keys(durations)}, number>; easing: Record<${keys(easings)}, [number, number, number, number]>; distance: number };
  type: Record<${Object.keys(nativeShared.type).map((k) => JSON.stringify(k)).join(' | ')}, { fontFamily: string; fontSize: number; lineHeight: number; letterSpacing: number; fontVariant?: string[] }>;
  arabicFont: Record<400 | 500 | 600 | 700, string>;
}
export declare const light: AsteriskNativeTheme;
export declare const dark: AsteriskNativeTheme;
export declare const themes: { light: AsteriskNativeTheme; dark: AsteriskNativeTheme };
export default themes;
`;

// ---- Kotlin (plain, no dependencies; the Compose theme wraps these) ----
const kColors = (th) => t.color.tokens.map((c) => `        val ${camel(c.name)}: Long = ${hex8(rgba(themed(c.value, th)))}`).join('\n');
const kt = `// areeba Asterisk tokens: generated from tokens.json by scripts/build-platform-tokens.mjs. Do not edit.
// Plain Kotlin with no dependencies. Colours are ARGB Longs, sizes are dp, type sizes are sp, durations are ms.
package com.areeba.asterisk.tokens

object AsteriskTokens {
    const val VERSION = "${t.version}"

    /** Colours for one theme, as ARGB (0xAARRGGBB). */
    interface Colors {
${t.color.tokens.map((c) => `        val ${camel(c.name)}: Long`).join('\n')}
    }

    object Light : Colors {
${kColors('light').replace(/        val/g, '        override val')}
    }

    object Dark : Colors {
${kColors('dark').replace(/        val/g, '        override val')}
    }

    /** Spacing in dp. */
    object Space {
${Object.entries(tokens.space).map(([k, v]) => `        const val ${pascal(k.replace('space-', 's'))}: Int = ${v}`).join('\n')}
    }

    /** Corner radius in dp. */
    object Radius {
${Object.entries(tokens.radius).map(([k, v]) => `        const val ${pascal(k.replace('radius-', ''))}: Int = ${v}`).join('\n')}
    }

    /** Control and icon sizes in dp. Touch targets are at least 48dp on card machines. */
    object Size {
${Object.entries(tokens.size).map(([k, v]) => `        const val ${pascal(k.replace('size-', ''))}: Int = ${v}`).join('\n')}
    }

    /** Motion: durations in ms, easing as cubic-bezier control points. Use 0 for every duration when animations are off. */
    object Motion {
${Object.entries(durations).map(([k, v]) => `        const val Duration${pascal(k)}: Int = ${v}`).join('\n')}
${Object.entries(easings).map(([k, v]) => `        val Ease${pascal(k)}: FloatArray = floatArrayOf(${v.map((n) => n + 'f').join(', ')})`).join('\n')}
        const val DistanceDp: Int = ${distance}
    }

    /** A text style: size and line height in sp, weight 100–900, letter spacing in sp (0 for Arabic). */
    data class TextStyle(val fontSizeSp: Float, val lineHeightSp: Float, val fontWeight: Int, val letterSpacingSp: Float, val mono: Boolean, val tabularNums: Boolean)

    object Type {
${Object.entries(typeStyles).map(([k, s]) => `        val ${pascal(k)} = TextStyle(${s.fontSize}f, ${s.lineHeight}f, ${s.fontWeight}, ${s.letterSpacing}f, ${s.family === 'mono'}, ${s.tabularNums})`).join('\n')}
    }
}
`;
outputs['packages/asterisk-kotlin/tokens/src/main/kotlin/com/areeba/asterisk/tokens/AsteriskTokens.kt'] = kt;

let stale = [];
for (const [rel, text] of Object.entries(outputs)) {
  const p = path.join(ROOT, rel);
  if (check) { if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== text) stale.push(rel); continue; }
  fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, text);
}
if (stale.length) { console.error('✗ Out of date (run node scripts/build-platform-tokens.mjs): ' + stale.join(', ')); process.exit(1); }
console.log(check ? '✓ Platform tokens are up to date.' : `Wrote ${Object.keys(outputs).length} token files for web, React Native and Kotlin.`);
