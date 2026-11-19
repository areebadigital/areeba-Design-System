import React from 'react';
import { renderIcon } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

function Badge(p) {
  var tone = p.tone || "neutral";
  return h("span", { className: cx("ar-badge", tone !== "neutral" && "ar-badge-" + tone, p.className) },
    p.dot && h("span", { className: "ar-badge-dot", "aria-hidden": "true" }), p.icon && renderIcon(p.icon, { className: "ar-badge-icon" }), p.children);
}

export { Badge };
