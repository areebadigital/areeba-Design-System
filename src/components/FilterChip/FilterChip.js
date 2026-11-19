import React from 'react';
import { icons, renderIcon } from '../../core/icons.js';
import { cx, rest } from '../../core/util.js';
const h = React.createElement;

/* A filter pill. Toggle filters use `selected` (aria-pressed); filters that open a picker pass `hasPopup` and show a chevron. */
function FilterChip(p) {
  return h("button", Object.assign({}, rest(p, ["label", "selected", "hasPopup", "className", "icon"]), { type: "button", className: cx("ar-chip", p.selected && "ar-chip-on", p.className),
    "aria-pressed": p.hasPopup ? undefined : (p.selected ? "true" : "false"), "aria-haspopup": p.hasPopup ? p.hasPopup : undefined }),
    p.icon && renderIcon(p.icon), h("span", { dir: "auto" }, p.label), p.hasPopup && h(icons.chevronDown, { className: "ar-chip-chev" }));
}

export { FilterChip };
