import React from 'react';
import { useErrorShown } from '../../core/analytics.js';
import { ui } from '../../core/i18n.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* Passcode progress: filled dots for digits entered. Announces "3 of 6 digits entered" politely; `error` shakes the dots and is announced. */
function PasscodeDots(p) {
  useErrorShown("PasscodeDots", p);
  var n = p.length || 6, c = Math.min(p.filled || 0, n), t = ui();
  return h("div", { className: cx("ar-passdots", p.error && "ar-passdots-error", p.className) },
    h("div", { className: "ar-passdots-row", dir: "ltr", "aria-hidden": "true" }, Array.from({ length: n }, function (_, i) { return h("span", { key: i, className: cx("ar-passdot", i < c && "ar-passdot-on") }); })),
    h("span", { className: "ar-sr-only", "aria-live": "polite" }, t.digits(c, n)),
    p.error && h("span", { className: "ar-passdots-msg", role: "alert" }, p.error));
}

export { PasscodeDots };
