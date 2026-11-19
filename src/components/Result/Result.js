import React from 'react';
import { useShown } from '../../core/analytics.js';
import { icons } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* The end of a flow: success or failure with what happened and what next. */
function Result(p) {
  var tone = p.tone || "success";
  useShown("Result", p, { tone: tone });
  return h("div", { className: cx("ar-result", "ar-result-" + tone, p.className), role: tone === "danger" ? "alert" : "status" },
    h("span", { className: "ar-result-icon", "aria-hidden": "true" }, h(tone === "danger" ? icons.alert : icons.check, null)),
    h("h2", { className: "ar-result-title" }, p.title), p.children && h("div", { className: "ar-result-body" }, p.children), p.action && h("div", { className: "ar-result-action" }, p.action));
}

export { Result };
