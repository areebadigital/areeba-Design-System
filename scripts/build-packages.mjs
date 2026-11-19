/**
 * Builds the areeba Asterisk 4 packages in packages/ from the sources in this repo:
 *   asterisk-react   dist/index.js (ESM, React external), dist/asterisk.css, dist/index.d.ts, dist/components.json,
 *                    dist/asterisk.global.js (classic script, window.Areeba), plus AGENTS.md and llms.txt
 *   asterisk-tokens  fonts/ (dist/ comes from scripts/build-platform-tokens.mjs)
 *   asterisk-cli     blocks/ (the copyable screens)
 * Usage: node scripts/build-packages.mjs
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const P = (...a) => path.join(ROOT, 'packages', ...a);
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const copyDir = (from, to) => { fs.rmSync(to, { recursive: true, force: true }); fs.cpSync(from, to, { recursive: true }); };

// ---- asterisk-react ----
const D = P('asterisk-react', 'dist');
fs.rmSync(D, { recursive: true, force: true });
await build({ entryPoints: [path.join(ROOT, 'src/index.js')], bundle: true, format: 'esm', target: 'es2019', external: ['react', 'react-dom'],
  outfile: path.join(D, 'index.js'), charset: 'utf8', legalComments: 'inline', logLevel: 'error',
  banner: { js: '/* @areebadigital/asterisk-react: areeba Asterisk 4. Built from src/ by scripts/build-packages.mjs. */' } });
fs.copyFileSync(path.join(ROOT, 'components/bundle.css'), path.join(D, 'asterisk.css'));
fs.copyFileSync(path.join(ROOT, 'components/bundle.js'), path.join(D, 'asterisk.global.js'));
write(path.join(D, 'index.d.ts'), '/* @areebadigital/asterisk-react types. */\n' + read('components/index.d.ts'));

// components.json: every component with its group, guidelines and props (docs as data, for agents and tools).
const dts = read('components/index.d.ts');
const components = fs.readdirSync(path.join(ROOT, 'components')).filter((n) => fs.existsSync(path.join(ROOT, 'components', n, 'README.md')) && n !== 'Cover').sort().map((name) => {
  const readme = read(`components/${name}/README.md`);
  const preview = fs.existsSync(path.join(ROOT, `components/${name}/preview.html`)) ? read(`components/${name}/preview.html`) : '';
  const group = (preview.match(/@dsCard group="([^"]+)"/) || [])[1] || 'Other';
  const lines = readme.replace(/^# .*\n+/, '').split('\n');
  const summary = lines.find((l) => l.trim()) || '';
  const rules = lines.filter((l) => l.startsWith('- ')).map((l) => l.slice(2));
  const iface = dts.match(new RegExp(`export interface ${name}Props[^{]*\\{([\\s\\S]*?)\\n?\\}\\s*\\n`)) || dts.match(new RegExp(`export declare function ${name}\\(props: \\{([^}]*)\\}`));
  const props = iface ? [...iface[1].matchAll(/(?:\/\*\*\s*([^*]*?)\s*\*\/\s*)?'?([A-Za-z-]+)'?(\?)?:\s*([^;]+);/g)].map((m) => ({ name: m[2], type: m[4].trim(), required: !m[3], ...(m[1] ? { doc: m[1].trim() } : {}) })) : [];
  return { name, group, summary, rules, props, docs: `https://areebadigital.github.io/areeba-Design-System/?path=/docs/components-${group.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase()}--docs` };
});
write(path.join(D, 'components.json'), JSON.stringify({ name: 'areeba Asterisk 4', package: '@areebadigital/asterisk-react', components }, null, 2) + '\n');

// llms.txt and AGENTS.md: one file an agent can read to use the system correctly.
const rulesMd = read('docs/agents/rules.md');
const byGroup = {};
for (const c of components) (byGroup[c.group] ||= []).push(c);
const llms = ['# areeba Asterisk 4', '', '> areeba\'s design system for web apps, SaaS portals, React Native apps and Kotlin card machines. React package: @areebadigital/asterisk-react. Tokens: @areebadigital/asterisk-tokens.', '',
  rulesMd.trim(), '', '## Components', '',
  ...Object.entries(byGroup).flatMap(([g, cs]) => [`### ${g}`, ...cs.map((c) => `- **${c.name}**: ${c.summary}${c.props.length ? ' Props: ' + c.props.map((p) => p.name + (p.required ? '' : '?')).join(', ') + '.' : ''}`), '']),
  '## Blocks (copy with `npx @areebadigital/asterisk-cli add <name>`)', '',
  ...listBlocks().map((b) => `- \`${b.id}\`: ${b.summary}`), ''].join('\n');
write(P('asterisk-react', 'llms.txt'), llms);
write(P('asterisk-react', 'AGENTS.md'), read('docs/agents/AGENTS.md'));
write(P('asterisk-tokens', 'AGENTS.md'), read('docs/agents/AGENTS.md'));
write(path.join(ROOT, 'llms.txt'), llms);

// ---- asterisk-tokens fonts ----
copyDir(path.join(ROOT, 'fonts'), P('asterisk-tokens', 'fonts'));

// ---- asterisk-cli blocks ----
const B = P('asterisk-cli', 'blocks');
fs.rmSync(B, { recursive: true, force: true });
for (const b of listBlocks()) write(path.join(B, b.id + '.jsx'), read(b.file));
write(path.join(B, 'index.json'), JSON.stringify(listBlocks().map(({ id, name, platform, summary }) => ({ id, name, platform, summary })), null, 2) + '\n');

function listBlocks() {
  const out = [];
  for (const platform of ['mobile', 'saas']) for (const f of fs.readdirSync(path.join(ROOT, 'blocks', platform)).filter((f) => f.endsWith('.jsx')).sort()) {
    const src = read(`blocks/${platform}/${f}`), name = f.replace('.jsx', '');
    const doc = (src.match(/\/\*\*([\s\S]*?)\*\//) || [, ''])[1].split('\n').map((l) => l.replace(/^\s*\*\s?/, '').trim()).filter(Boolean)[0] || '';
    out.push({ id: `${platform}-${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`, name, platform, summary: doc, file: `blocks/${platform}/${f}` });
  }
  return out;
}
console.log(`Built packages: asterisk-react (${components.length} components), asterisk-tokens fonts, asterisk-cli (${listBlocks().length} blocks), llms.txt.`);
