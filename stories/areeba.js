/* Loads the real areeba bundle. bundle.js is a classic script that reads window.React,
   so React is put on window first (module order guarantees this runs before the bundle). */
import './react-global.js';
import '../components/bundle.js';

import { t, tDeep } from './i18n.js';

export const A = window.Areeba;

/* createElement that shows Arabic story copy when the page is right-to-left (see i18n.js).
   PaymentCard is left alone: a card face reads the same in every language. */
export const h = (type, props, ...kids) => window.React.createElement(type, type === A.PaymentCard ? props : tDeep(props), ...kids.map((k) => (typeof k === 'string' ? t(k) : k)));

/** A component README as its Storybook docs description (the title is already the page title). */
export const doc = (readme) => ({ docs: { description: { component: readme.replace(/^# .*\n+/, '') } } });
/** Wraps several examples in the design system's row / stack layouts. */
export const row = (...kids) => h('div', { className: 'ar-row', style: { padding: 0, alignItems: 'flex-start' } }, ...kids);
export const stack = (...kids) => h('div', { className: 'ar-stack', style: { padding: 0 } }, ...kids);
