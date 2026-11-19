import React from 'react';
import { cx, rest } from '../../core/util.js';
const h = React.createElement;

function Button(p) {
  var variant = p.variant || "primary", size = p.size || "md";
  return h("button", Object.assign({ type: "button" }, rest(p, ["variant", "size", "block", "className", "children"]), {
    className: cx("ar-btn", "ar-btn-" + variant, size !== "md" && "ar-btn-" + size, p.block && "ar-btn-block", p.className)
  }), p.children);
}

export { Button };
