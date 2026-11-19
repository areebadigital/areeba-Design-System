import React from 'react';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* A person or merchant: photo, or initials on a tinted circle. Decorative by default (the name is next to it); pass `label` when it stands alone. */
function Avatar(p) {
  var size = p.size || "md";
  return h("span", { className: cx("ar-avatar", "ar-avatar-" + size, p.className), role: p.label ? "img" : undefined, "aria-label": p.label, "aria-hidden": p.label ? undefined : "true" },
    p.src ? h("img", { src: p.src, alt: "" }) : h("span", { dir: "auto" }, p.initials),
    p.status && h("span", { className: "ar-avatar-status", "aria-hidden": "true" }));
}

export { Avatar };
