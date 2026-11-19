import React from 'react';
import { renderIcon } from '../../core/icons.js';
import { cx, rest } from '../../core/util.js';
const h = React.createElement;

/* A round icon-only button (header actions, close, back). `label` is its accessible name and is required. */
var IconButton = React.forwardRef(function IconButton(p, ref) {
  return h("button", Object.assign({}, rest(p, ["icon", "label", "badge", "variant", "className"]), { ref: ref, type: "button", "aria-label": p.label,
    className: cx("ar-iconbtn", p.variant === "plain" && "ar-iconbtn-plain", p.className) }),
    renderIcon(p.icon), p.badge && h("span", { className: "ar-iconbtn-dot", "aria-hidden": "true" }));
});

export { IconButton };
