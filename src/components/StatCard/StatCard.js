import React from 'react';
import { renderIcon } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* A key number on a dashboard: label, value, and the change against the previous period. Change is a word and an arrow, never colour alone. */
function StatCard(p) {
  var d = p.change, up = d && d.direction === "up", down = d && d.direction === "down";
  return h("section", { className: cx("ar-stat", p.className), "aria-label": typeof p.label === "string" ? p.label : undefined },
    h("div", { className: "ar-stat-label" }, p.icon && renderIcon(p.icon, { className: "ar-stat-icon" }), p.label),
    h("div", { className: "ar-stat-value", dir: "ltr" }, p.value),
    d && h("div", { className: cx("ar-stat-change", d.good === true && "ar-stat-good", d.good === false && "ar-stat-bad") },
      h("span", { "aria-hidden": "true" }, up ? "↑" : down ? "↓" : "→"), h("span", { dir: "ltr" }, d.value), " ", h("span", null, d.label)));
}

export { StatCard };
