import React from 'react';
import { useTrack, pressed, analyticsAttrs } from '../../core/analytics.js';
import { renderIcon } from '../../core/icons.js';
import { cx, rest } from '../../core/util.js';
const h = React.createElement;

/* A round icon-only button (header actions, close, back). `label` is its accessible name and is required. */
var IconButton = React.forwardRef(function IconButton(p, ref) {
  var track = useTrack("IconButton", p);
  return h("button", Object.assign({}, rest(p, ["icon", "label", "badge", "variant", "className"]), analyticsAttrs("IconButton", p), { ref: ref, onClick: pressed(track, p.onClick, { variant: p.variant || "soft" }), type: "button", "aria-label": p.label,
    className: cx("ar-iconbtn", p.variant === "plain" && "ar-iconbtn-plain", p.className) }),
    renderIcon(p.icon), p.badge && h("span", { className: "ar-iconbtn-dot", "aria-hidden": "true" }));
});

export { IconButton };
