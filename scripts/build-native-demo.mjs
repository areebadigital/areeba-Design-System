/* Builds the React Native test page (packages/asterisk-native/demo/dist/) with react-native-web, for screenshots and analytics tests. */
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'packages/asterisk-native/demo/dist');
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
await build({ entryPoints: [path.join(ROOT, 'packages/asterisk-native/demo/App.js')], bundle: true, outfile: path.join(OUT, 'app.js'), format: 'iife', logLevel: 'error',
  alias: { 'react-native': 'react-native-web', 'react-native-svg': path.join(ROOT, 'packages/asterisk-native/demo/svg-shim.js') },
  define: { 'process.env.NODE_ENV': '"production"', __DEV__: 'false', global: 'globalThis' }, loader: { '.js': 'jsx' } });
fs.cpSync(path.join(ROOT, 'fonts'), path.join(OUT, 'fonts'), { recursive: true });
const face = (fam, file, w) => `@font-face { font-family: '${fam}'; src: url('fonts/${file}') format('woff2'); }`;
const css = [['PlusJakartaSans-Regular', 'PlusJakartaSans-400.woff2'], ['PlusJakartaSans-Medium', 'PlusJakartaSans-500.woff2'], ['PlusJakartaSans-SemiBold', 'PlusJakartaSans-600.woff2'], ['PlusJakartaSans-Bold', 'PlusJakartaSans-700.woff2'],
  ['IBMPlexSansArabic-Regular', 'IBMPlexSansArabic-400.woff2'], ['IBMPlexSansArabic-Medium', 'IBMPlexSansArabic-500.woff2'], ['IBMPlexSansArabic-SemiBold', 'IBMPlexSansArabic-600.woff2'], ['IBMPlexSansArabic-Bold', 'IBMPlexSansArabic-700.woff2'],
  ['IBMPlexMono-Regular', 'IBMPlexMono-400.woff2']].map(([f, file]) => face(f, file)).join('\n')
  // As on the web: Arabic families use Plex Sans Arabic for Arabic letters and Plus Jakarta Sans for Latin (phones fall back to the system font).
  + '\n' + [400, 500, 600, 700].map((w) => `@font-face { font-family: '${{400: 'IBMPlexSansArabic-Regular', 500: 'IBMPlexSansArabic-Medium', 600: 'IBMPlexSansArabic-SemiBold', 700: 'IBMPlexSansArabic-Bold'}[w]}'; src: url('fonts/PlusJakartaSans-${w}.woff2') format('woff2'); unicode-range: U+0000-05FF, U+2000-206F, U+20A0-20CF; }`).join('\n');
fs.writeFileSync(path.join(OUT, 'index.html'), `<!doctype html><html><head><meta charset="utf-8"><title>Asterisk native test page</title><style>${css}\nhtml,body,#root{height:100%;margin:0}</style></head><body><div id="root"></div><script src="app.js"></script></body></html>`);
console.log('Built packages/asterisk-native/demo/dist');
