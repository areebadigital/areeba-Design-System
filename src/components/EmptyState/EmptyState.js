import React from 'react';
import { cx } from '../../core/util.js';
const h = React.createElement;

function EmptyState(p) {
  return h("div", { className: cx("ar-empty", p.className) },
    h("svg", { className: "ar-empty-art", viewBox: "0 0 96 64", "aria-hidden": "true" },
      h("rect", { x: 4, y: 8, width: 64, height: 40, rx: 8, className: "ar-empty-a" }),
      h("rect", { x: 28, y: 18, width: 64, height: 40, rx: 8, className: "ar-empty-b" }),
      h("rect", { x: 38, y: 44, width: 16, height: 4, rx: 2, className: "ar-empty-c" }),
      h("rect", { x: 58, y: 44, width: 16, height: 4, rx: 2, className: "ar-empty-c" })),
    h("h" + (p.level || 3), { className: "ar-empty-title" }, p.title),
    p.children && h("p", { className: "ar-empty-body" }, p.children),
    p.action && h("div", { className: "ar-empty-action" }, p.action));
}

export { EmptyState };
