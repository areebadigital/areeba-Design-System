/* Loads the real areeba bundle. bundle.js is a classic script that reads window.React,
   so React is put on window first (module order guarantees this runs before the bundle). */
import './react-global.js';
import '../components/bundle.js';

export const A = window.Areeba;
export const h = window.React.createElement;

/** A component README as its Storybook docs description (the title is already the page title). */
export const doc = (readme) => ({ docs: { description: { component: readme.replace(/^# .*\n+/, '') } } });
/** Wraps several examples in the design system's row / stack layouts. */
export const row = (...kids) => h('div', { className: 'ar-row', style: { padding: 0, alignItems: 'flex-start' } }, ...kids);
export const stack = (...kids) => h('div', { className: 'ar-stack', style: { padding: 0 } }, ...kids);
