#!/usr/bin/env node
/* areeba Asterisk 4 CLI.
     asterisk list                          the blocks you can add
     asterisk add <block> [--dir <path>]    copy a block into your app (default ./src/screens), importing from @areebadigital/asterisk-react
     asterisk add <block> --global          keep `window.Areeba` (for pages that load the classic script)
     asterisk init                          how to set up tokens, styles, direction and analytics */
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const BLOCKS = path.join(HERE, '..', 'blocks');
const blocks = JSON.parse(fs.readFileSync(path.join(BLOCKS, 'index.json'), 'utf8'));
const [cmd, ...args] = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true) : undefined; };
const out = (s) => process.stdout.write(s + '\n');

function list() {
  for (const p of ['mobile', 'saas']) {
    out(`\n${p === 'mobile' ? 'Mobile' : 'SaaS'} blocks`);
    for (const b of blocks.filter((b) => b.platform === p)) out(`  ${b.id.padEnd(26)} ${b.summary}`);
  }
  out('\nAdd one: npx @areebadigital/asterisk-cli add mobile-send-money');
}

function add(id) {
  const b = blocks.find((x) => x.id === id || x.name.toLowerCase() === String(id).toLowerCase());
  if (!b) { out(`No block "${id}". Run \`asterisk list\` to see them.`); process.exit(1); }
  let src = fs.readFileSync(path.join(BLOCKS, b.id + '.jsx'), 'utf8');
  if (!flag('--global')) src = src.replace(/const \{([^}]+)\} = window\.Areeba;/, (_, names) => `import {${names}} from '@areebadigital/asterisk-react';`);
  const dir = path.resolve(typeof flag('--dir') === 'string' ? flag('--dir') : 'src/screens');
  const file = path.join(dir, b.name + '.jsx');
  if (fs.existsSync(file) && !flag('--force')) { out(`${path.relative(process.cwd(), file)} exists. Use --force to overwrite.`); process.exit(1); }
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, src);
  out(`Added ${b.name} → ${path.relative(process.cwd(), file)}`);
  out('Next: replace the sample data with your API, keep both COPY languages, and give the main actions an analyticsId.');
}

function init() {
  out(`Set up areeba Asterisk 4:

  npm install @areebadigital/asterisk-react @areebadigital/asterisk-tokens
  npm install -D @areebadigital/asterisk-lint

In your entry file:
  import '@areebadigital/asterisk-tokens/tokens.css';
  import '@areebadigital/asterisk-react/styles.css';
  import { AsteriskProvider } from '@areebadigital/asterisk-react';
  <AsteriskProvider analytics={(e) => yourAnalytics.track(e.name, e)}>…</AsteriskProvider>

On <html>: lang="en" dir="ltr" (or lang="ar" dir="rtl"), and data-theme="light" | "dark" to force a theme.
The packages are on GitHub Packages: add to .npmrc
  @areebadigital:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}`);
}

if (cmd === 'list') list();
else if (cmd === 'add' && args[0]) add(args[0]);
else if (cmd === 'init') init();
else out('Usage: asterisk list | asterisk add <block> [--dir path] [--global] [--force] | asterisk init');
