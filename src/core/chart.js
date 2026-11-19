import React from 'react';
import { isRtl } from './util.js';
const h = React.createElement;

/* Width of the chart's container, and whether it sits in right-to-left text (charts mirror in RTL:
   y-axis on the right, categories and time running right to left, as Arabic reads). */
function useWidth(initial) {
  var ref = React.useRef(null), ws = React.useState(initial), ds = React.useState(false);
  React.useEffect(function () {
    if (!ref.current || !window.ResizeObserver) return;
    var ro = new ResizeObserver(function (en) { ws[1](Math.max(240, Math.round(en[0].contentRect.width))); });
    ro.observe(ref.current); return function () { ro.disconnect(); };
  }, []);
  React.useEffect(function () { var r = isRtl(ref.current); if (r !== ds[0]) ds[1](r); });
  return [ref, ws[0], ds[0]];
}
/* Mirroring helpers: X flips an x position, XR flips a box that starts at x0 and is w wide, A swaps text anchors. */
function mirror(rtl, W) {
  return { X: function (v) { return rtl ? W - v : v; }, XR: function (x0, w) { return rtl ? W - x0 - w : x0; },
    A: function (a) { return !rtl ? a : a === "start" ? "end" : a === "end" ? "start" : a; } };
}
function niceMax(v) { if (v <= 0) return 1; var e = Math.pow(10, Math.floor(Math.log10(v))), f = v / e; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * e; }
function compact(n) { var a = Math.abs(n); return a >= 1e6 ? (n / 1e6).toFixed(a % 1e6 ? 1 : 0) + "M" : a >= 1e3 ? (n / 1e3).toFixed(a % 1e3 ? 1 : 0) + "k" : String(n); }
function Legend(series) {
  if (series.length < 2) return null;
  return h("div", { className: "ar-chart-legend" }, series.map(function (s, i) {
    return h("span", { key: s.key, className: "ar-chart-key" }, h("i", { style: { background: "var(--chart-" + (i + 1) + ")" } }), s.label);
  }));
}
function Tip(x, y, w, title, rows, fmt, rtl) {
  /* Opens on the reading side of the point (right in LTR, left in RTL) and flips when it would overflow. */
  var left = rtl ? (x - 192 >= 0 ? x - 192 : Math.min(x + 12, w - 180)) : (x + 12 + 180 > w ? Math.max(0, x - 192) : x + 12);
  return h("div", { className: "ar-chart-tip", style: { left: left + "px", top: Math.max(0, y) + "px" } },
    h("div", { className: "ar-chart-tip-title" }, title),
    rows.map(function (r) { return h("div", { key: r.key, className: "ar-chart-tip-row" }, h("i", { style: { background: r.color } }), h("span", null, r.label), h("b", { className: "ar-num", dir: "ltr" }, fmt(r.value))); }));
}

export { useWidth, mirror, niceMax, compact, Legend, Tip };
