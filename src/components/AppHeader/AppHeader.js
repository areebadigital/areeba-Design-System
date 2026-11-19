import React from 'react';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* Top bar of an app screen: start action (back, avatar), centred title, end action (notifications, menu).
   variant "modal" adds a drag handle for sheets; "transparent" drops the background. */
function AppHeader(p) {
  var v = p.variant || "default";
  return h("header", { className: cx("ar-apphead", "ar-apphead-" + v, p.className) },
    v === "modal" && h("span", { className: "ar-apphead-handle", "aria-hidden": "true" }),
    h("div", { className: "ar-apphead-row" },
      h("div", { className: "ar-apphead-start" }, p.start),
      h("div", { className: "ar-apphead-mid" }, h("h1", { className: "ar-apphead-title" }, p.title), p.subtitle && h("div", { className: "ar-apphead-sub" }, p.subtitle)),
      h("div", { className: "ar-apphead-end" }, p.end)));
}

export { AppHeader };
