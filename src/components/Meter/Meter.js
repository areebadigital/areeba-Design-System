import React from 'react';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

/* How much of something is used: a limit, a quota, onboarding steps. A WAI-ARIA meter; `valueText` is what is read and shown ("$3,200 of $5,000"). */
function Meter(p) {
  var id = useId(), max = p.max || 100, v = Math.min(Math.max(p.value || 0, 0), max), pct = Math.round(v / max * 100);
  var tone = p.tone || (pct >= 90 ? "danger" : pct >= 75 ? "warning" : "brand");
  return h("div", { className: cx("ar-meter", "ar-meter-" + tone, p.className) },
    (p.label || p.valueText) && h("div", { className: "ar-meter-head" }, p.label && h("span", { className: "ar-meter-label", id: id }, p.label), h("span", { className: "ar-meter-value" }, h("bdi", null, p.valueText || pct + "%"))),
    h("div", { className: "ar-meter-track", role: "meter", "aria-labelledby": p.label ? id : undefined, "aria-label": p.label ? undefined : p["aria-label"], "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": v, "aria-valuetext": p.valueText || pct + "%" },
      h("span", { className: "ar-meter-fill", style: { width: pct + "%" } })),
    p.hint && h("span", { className: "ar-meter-hint" }, p.hint));
}

export { Meter };
