import React from 'react';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* Sticky bottom actions for a flow step. Children are Buttons; `stacked` puts them one above the other. */
function ActionBar(p) { return h("div", { className: cx("ar-actionbar", p.stacked && "ar-actionbar-stacked", p.className) }, p.children); }

export { ActionBar };
