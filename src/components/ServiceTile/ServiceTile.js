import React from 'react';
import { renderIcon } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* A tile in a grid of services or categories (eStore, bill payments). A button or link with an icon or initials and a label. */
function ServiceTile(p) {
  var inner = [h("span", { key: "m", className: cx("ar-tile-mark", p.tone && "ar-tile-" + p.tone), "aria-hidden": "true" }, p.icon ? renderIcon(p.icon) : p.initials),
    h("span", { key: "l", className: "ar-tile-label" }, p.label), p.description && h("span", { key: "d", className: "ar-tile-desc" }, p.description)];
  return p.href ? h("a", { href: p.href, className: cx("ar-tile", p.className) }, inner)
    : h("button", { type: "button", className: cx("ar-tile", p.className), onClick: p.onClick, disabled: p.disabled }, inner);
}

export { ServiceTile };
