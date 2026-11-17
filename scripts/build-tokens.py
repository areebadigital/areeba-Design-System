#!/usr/bin/env python3
"""Regenerate tokens.css from tokens.json:  python3 scripts/build-tokens.py"""
import json, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = json.load(open(os.path.join(R, 'tokens.json')))
def val(x, th): return x if isinstance(x, str) else x.get(th, x.get('light'))
out = ['/* areeba — generated from tokens.json by scripts/build-tokens.py. Do not edit by hand. */']
for f in t['type'].get('fonts', []):
    out.append(f"@font-face {{ font-family: \"{f['family']}\"; src: url(\"{f['file']}\") format(\"woff2\"); font-weight: {f['weight']}; font-style: normal; font-display: swap;" + (f" unicode-range: {f['unicodeRange']};" if f.get('unicodeRange') else '') + " }")
themed = t['color']['tokens'] + t['shadow']['tokens']
for th, sel in [('light', ':root, [data-theme="light"]'), ('dark', '[data-theme="dark"]')]:
    out += [sel + ' {'] + [f"  --{c['name']}: {val(c['value'], th)};" for c in themed] + ['}']
out += ['@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {'] + [f"  --{c['name']}: {val(c['value'], 'dark')};" for c in themed] + ['} }']
out += [':root {'] + [f"  --{c['name']}: {c['value']};" for f in ['spacing', 'radius', 'size', 'breakpoint'] for c in t[f]['tokens']]
out += [f"  --font-{k}: {v};" for k, v in t['type']['families'].items()] + ['}']
for g in t['type']['groups']:
    for s in g['styles']:
        fam = s.get('family', g['family'])
        d = f"font-family: var(--font-{fam}); font-size: {s['fontSize']}; line-height: {s['lineHeight']}; font-weight: {s['fontWeight']};"
        if 'letterSpacing' in s: d += f" letter-spacing: {s['letterSpacing']};"
        if g['name'] == 'Numbers' and fam == 'sans': d += " font-variant-numeric: tabular-nums;"
        out.append(f".{s['name']} {{ {d} }}")
# Arabic letters join; tracking breaks the joins, so Arabic text is never letter-spaced.
tracked = [s['name'] for g in t['type']['groups'] for s in g['styles'] if 'letterSpacing' in s]
if tracked: out.append(', '.join(f':lang(ar) .{n}' for n in tracked) + ' { letter-spacing: 0; }')
open(os.path.join(R, 'tokens.css'), 'w').write('\n'.join(out) + '\n')
print('tokens.css written')
