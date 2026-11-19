import React from 'react';
import { icons } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

function Toast(p) {
  var tone = p.tone || "neutral";
  var I = tone === "success" ? icons.check : (tone === "danger" ? icons.alert : icons.info);
  return h("div", { role: "status", "aria-live": "polite", className: cx("ar-toast", "ar-toast-" + tone, p.className) },
    h(I, { className: "ar-toast-icon" }), h("span", { className: "ar-toast-msg" }, p.children),
    p.action && h("button", { type: "button", className: "ar-toast-action", onClick: p.onAction }, p.action));
}

export { Toast };
