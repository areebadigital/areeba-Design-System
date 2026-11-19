import React from 'react';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* A small card face for pickers and summaries. */
function MiniCard(p) { return h("span", { className: cx("ar-minicard", "ar-minicard-" + (p.variant || "night"), p.className), "aria-hidden": "true" }); }

export { MiniCard };
