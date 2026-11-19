import React from 'react';
import { useTrack, pressed, analyticsAttrs } from '../../core/analytics.js';
import { cx, rest } from '../../core/util.js';
const h = React.createElement;

function Button(p) {
  var variant = p.variant || "primary", size = p.size || "md", track = useTrack("Button", p);
  return h("button", Object.assign({ type: "button" }, rest(p, ["variant", "size", "block", "className", "children"]), analyticsAttrs("Button", p), {
    onClick: pressed(track, p.onClick, { variant: variant }),
    className: cx("ar-btn", "ar-btn-" + variant, size !== "md" && "ar-btn-" + size, p.block && "ar-btn-block", p.className)
  }), p.children);
}

export { Button };
