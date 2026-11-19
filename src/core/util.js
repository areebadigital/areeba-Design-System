import React from 'react';

function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
var NOT_DOM = ["analyticsId", "analyticsData"];
function rest(p, keys) { var o = {}; for (var k in p) if (keys.indexOf(k) < 0 && NOT_DOM.indexOf(k) < 0) o[k] = p[k]; return o; }
let uid = 0; function useId(given) { var r = React.useRef(given || "ar-" + (++uid)); return r.current; }
function isRtl(el) { return !!el && typeof getComputedStyle === "function" && getComputedStyle(el).direction === "rtl"; }
/* Wraps a left-to-right run (an amount, IBAN, card or reference number) in Unicode isolates (LRI…PDI),
   so inside Arabic text "$12,480.50" keeps its symbol and sign where they belong. Use it on amounts you
   place inside translated sentences; components that show amounts already isolate them. */
function ltr(text) { return "\u2066" + text + "\u2069"; }

export { cx, rest, useId, isRtl, ltr };
