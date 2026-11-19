import React from 'react';
import { useTrack, pressed, analyticsAttrs } from '../../core/analytics.js';
import { icons, renderIcon } from '../../core/icons.js';
import { cx, rest } from '../../core/util.js';
const h = React.createElement;

/* A filter pill. Toggle filters use `selected` (aria-pressed); filters that open a picker pass `hasPopup` and show a chevron. */
function FilterChip(p) {
  var track = useTrack("FilterChip", p);
  return h("button", Object.assign({}, rest(p, ["label", "selected", "hasPopup", "className", "icon"]), analyticsAttrs("FilterChip", p), { type: "button", onClick: pressed(track, p.onClick, { selected: !p.selected }), className: cx("ar-chip", p.selected && "ar-chip-on", p.className),
    "aria-pressed": p.hasPopup ? undefined : (p.selected ? "true" : "false"), "aria-haspopup": p.hasPopup ? p.hasPopup : undefined }),
    p.icon && renderIcon(p.icon), h("span", { dir: "auto" }, p.label), p.hasPopup && h(icons.chevronDown, { className: "ar-chip-chev" }));
}

export { FilterChip };
