import React from 'react';
import { ui } from '../../core/i18n.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* Position in a carousel. Decorative for sighted users; screen readers hear "Card 1 of 2". */
function PageDots(p) {
  var n = p.count || 0, c = p.current || 0;
  return h("div", { className: cx("ar-dots", p.className), role: "img", "aria-label": p.label || ui().position(c + 1, n) },
    Array.from({ length: n }, function (_, i) { return h("span", { key: i, className: cx("ar-dot", i === c && "ar-dot-on") }); }));
}

export { PageDots };
