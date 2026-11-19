import React from 'react';
import { icons } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

function Alert(p) {
  var tone = p.tone || "info";
  var I = tone === "success" ? icons.check : (tone === "info" ? icons.info : icons.alert);
  return h("div", { role: tone === "danger" ? "alert" : "status", className: cx("ar-alert", "ar-alert-" + tone, p.className) },
    h(I, { className: "ar-alert-icon" }),
    h("div", null, p.title && h("p", { className: "ar-alert-title" }, p.title), h("p", { className: "ar-alert-body" }, p.children)));
}

export { Alert };
