/* Documentation blocks for the Foundations pages. Everything is read from tokens.json,
   so the docs cannot drift from the source of truth. */
import React from 'react';
import tokens from '../../tokens.json';
import { A } from '../areeba.js';

const h = React.createElement;

/* ---------- colour maths (WCAG 2.x) ---------- */
function rgb(hex) {
  let x = hex.replace('#', '');
  if (x.length === 3) x = x.split('').map((c) => c + c).join('');
  return { r: parseInt(x.slice(0, 2), 16), g: parseInt(x.slice(2, 4), 16), b: parseInt(x.slice(4, 6), 16), a: x.length === 8 ? parseInt(x.slice(6, 8), 16) / 255 : 1 };
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
function flatten(fg, bg) { const f = rgb(fg), b = rgb(bg); const m = (k) => Math.round(f.a * f[k] + (1 - f.a) * b[k]); return { r: m('r'), g: m('g'), b: m('b') }; }
const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
export function contrast(fg, bg) { const a = lum(flatten(fg, bg)), b = lum(rgb(bg)); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); }

const themes = tokens.color.themes.map((t) => t.id);
const value = (tok, theme) => (typeof tok.value === 'string' ? tok.value : tok.value[theme] || tok.value[themes[0]]);
const byName = Object.fromEntries(tokens.color.tokens.map((t) => [t.name, t]));

/* Which pair each colour is checked against, and the minimum it needs. */
const PAIRS = {
  ink: ['surface', 4.5], 'ink-muted': ['surface', 4.5], brand: ['surface', 4.5], 'on-brand': ['brand', 4.5], accent: ['surface', 3],
  'on-night': ['night', 4.5], 'line-strong': ['surface', 3], focus: ['surface', 3], success: ['surface', 4.5], warning: ['surface', 4.5],
  danger: ['surface', 4.5], info: ['surface', 4.5], 'chart-1': ['surface-raised', 3], 'chart-2': ['surface-raised', 3], 'chart-3': ['surface-raised', 3], 'chart-4': ['surface-raised', 3],
};

const s = {
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14, lineHeight: '20px' },
  th: { textAlign: 'left', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', color: '#131210cc', padding: '8px 12px 8px 0', borderBottom: '1px solid #e0dfdd' },
  td: { padding: '12px 12px 12px 0', borderBottom: '1px solid #e0dfdd', verticalAlign: 'top' },
  chip: { width: 40, height: 40, borderRadius: 4, boxShadow: 'inset 0 0 0 1px rgba(19,18,16,.12)', flex: 'none' },
  mono: { fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 },
  pill: (ok) => ({ display: 'inline-block', fontSize: 12, fontWeight: 600, padding: '1px 8px', borderRadius: 999, background: ok ? '#e7f8e9' : '#fdecea', color: ok ? '#007612' : '#a8141f', whiteSpace: 'nowrap' }),
  scroll: { overflowX: 'auto' },
};

function Swatch({ color, label }) {
  return h('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
    h('div', { style: { ...s.chip, background: color } }),
    h('div', null, h('div', { style: s.mono }, color.toUpperCase()), label && h('div', { style: { fontSize: 12, color: '#131210cc' } }, label)));
}

function Check({ tok, theme }) {
  const pair = PAIRS[tok.name];
  if (!pair || !byName[pair[0]]) return h('span', { style: { color: '#131210cc' } }, '—');
  const r = contrast(value(tok, theme), value(byName[pair[0]], theme));
  return h('span', { style: s.pill(r >= pair[1]), title: `against ${pair[0]}, needs ${pair[1]}:1` }, `${r >= pair[1] ? '✓' : '✕'} ${r.toFixed(2)} on ${pair[0]}`);
}

/** Every colour token: light and dark values, its WCAG check, and its usage note. */
export function ColorTable({ only }) {
  const list = tokens.color.tokens.filter((t) => !only || only.some((p) => t.name === p || t.name.startsWith(p + '-')));
  return h('div', { style: s.scroll }, h('table', { style: s.table },
    h('thead', null, h('tr', null, ['Token', ...themes.map((t) => t[0].toUpperCase() + t.slice(1)), 'Contrast', 'Usage'].map((x) => h('th', { key: x, style: s.th }, x)))),
    h('tbody', null, list.map((tok) => h('tr', { key: tok.name },
      h('td', { style: s.td }, h('code', null, tok.name), h('div', { style: { ...s.mono, color: '#131210cc', marginTop: 4 } }, `var(--${tok.name})`)),
      themes.map((th) => h('td', { key: th, style: s.td }, h(Swatch, { color: value(tok, th) }), h('div', { style: { marginTop: 6 } }, h(Check, { tok, theme: th })))),
      h('td', { style: { ...s.td, color: '#131210cc' } }, PAIRS[tok.name] ? `${PAIRS[tok.name][1]}:1 needed` : 'surface / decorative'),
      h('td', { style: { ...s.td, maxWidth: 420 } }, tok.usage))))));
}

/** The type scale, each style rendered with its real tokens.css class. */
export function TypeScale() {
  return h('div', null, tokens.type.groups.map((g) => h('section', { key: g.name, style: { marginBottom: 32 } },
    h('h3', { style: { fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em', color: '#131210cc', margin: '0 0 8px' } }, g.name),
    g.styles.map((st) => h('div', { key: st.name, style: { display: 'grid', gridTemplateColumns: 'minmax(140px, 200px) minmax(0, 1fr)', gap: 16, padding: '16px 0', borderTop: '1px solid #e0dfdd', alignItems: 'baseline' } },
      h('div', null, h('code', null, '.' + st.name),
        h('div', { style: { ...s.mono, color: '#131210cc', marginTop: 4 } }, `${st.fontSize} / ${st.lineHeight} / ${st.fontWeight}${st.letterSpacing ? ' / ' + st.letterSpacing : ''}`),
        h('div', { style: { fontSize: 12, color: '#131210cc', marginTop: 4 } }, st.usage)),
      h('div', { className: st.name, style: { color: '#131210', overflowWrap: 'anywhere' } }, st.sample || 'The infrastructure behind how money moves'))))));
}

/** A simple name / value / preview / usage table for any non-colour token family. */
export function TokenTable({ family, preview }) {
  const list = tokens[family].tokens;
  const note = tokens[family].note;
  return h('div', null, note && h('p', null, note), h('div', { style: s.scroll }, h('table', { style: s.table },
    h('thead', null, h('tr', null, ['Token', 'Value', 'Preview', 'Usage'].map((x) => h('th', { key: x, style: s.th }, x)))),
    h('tbody', null, list.map((t) => {
      const v = typeof t.value === 'string' ? t.value : t.value.light;
      return h('tr', { key: t.name },
        h('td', { style: s.td }, h('code', null, t.name)),
        h('td', { style: { ...s.td, ...s.mono } }, typeof t.value === 'string' ? t.value : Object.entries(t.value).map(([k, x]) => h('div', { key: k }, `${k}: ${x}`))),
        h('td', { style: s.td }, preview ? preview(v, t) : null),
        h('td', { style: { ...s.td, maxWidth: 420 } }, t.usage));
    })))));
}

export const previews = {
  spacing: (v) => h('div', { style: { width: v, height: 16, background: '#630c0c', borderRadius: 2 } }),
  radius: (v) => h('div', { style: { width: 64, height: 40, background: '#f3f2ef', border: '1px solid #8a8782', borderRadius: v } }),
  shadow: (v) => h('div', { style: { width: 96, height: 56, background: '#fff', borderRadius: 8, boxShadow: v } }),
  size: (v) => h('div', { style: { width: 120, height: v, maxHeight: 64, background: '#f3f2ef', border: '1px solid #8a8782', borderRadius: 4 } }),
};

/** Logo files from assets/Logos, each on the background it is made for. */
export function Logos() {
  const items = [
    ['areeba-logo.svg', 'Primary', 'White and Chalk backgrounds', '#ffffff'],
    ['areeba-logo-chalk.svg', 'Chalk', 'Obsidian, Crimson Deep and photography', '#131210'],
    ['areeba-logo-contained.svg', 'Contained', 'Next to other brands', '#f3f2ef'],
    ['areeba-logomark.svg', 'Logomark', 'App icons, avatars, tight spaces', '#ffffff'],
  ];
  return h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 } }, items.map(([f, name, use, bg]) =>
    h('figure', { key: f, style: { margin: 0, border: '1px solid #e0dfdd', borderRadius: 8, overflow: 'hidden' } },
      h('div', { style: { background: bg, height: 140, display: 'grid', placeItems: 'center', padding: 24 } }, h('img', { src: `assets/Logos/${f}`, alt: `areeba ${name.toLowerCase()} logo`, style: { maxWidth: '80%', maxHeight: 72 } })),
      h('figcaption', { style: { padding: 12, fontSize: 14 } }, h('b', null, name), h('div', { style: { color: '#131210cc' } }, use), h('code', { style: { fontSize: 12 } }, `assets/Logos/${f}`)))));
}

/** Every icon exported on window.Areeba.icons. */
export function Icons() {
  return h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 } }, Object.keys(A.icons).map((k) =>
    h('div', { key: k, style: { border: '1px solid #e0dfdd', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#131210' } },
      h(A.icons[k], { width: 24, height: 24 }), h('code', { style: { fontSize: 12 } }, k))));
}
