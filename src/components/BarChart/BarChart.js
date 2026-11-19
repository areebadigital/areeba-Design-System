import React from 'react';
import { Legend, Tip, compact, mirror, niceMax, useWidth } from '../../core/chart.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

function BarChart(p) {
  var data = p.data || [], series = (p.series || []).slice(0, 4), fmt = p.format || compact, H = p.height || 240;
  var r = useWidth(p.width || 640), ref = r[0], W = r[1], rtl = r[2], M = mirror(rtl, W);
  var hs = React.useState(null), hov = hs[0];
  var m = { t: 12, r: 16, b: 28, l: 48 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  var max = niceMax(Math.max.apply(null, data.reduce(function (a, d) { return a.concat(series.map(function (s) { return d[s.key] || 0; })); }, [0])));
  var y = function (v) { return m.t + ih - v / max * ih; };
  var band = iw / Math.max(1, data.length), gw = Math.min(band * .7, series.length * 28), bw = (gw - (series.length - 1) * 2) / series.length;
  var ticks = [0, .25, .5, .75, 1].map(function (f) { return f * max; });
  function barPath(x0, y0, w, hgt) { var rr = Math.min(4, w / 2, hgt); return "M" + x0 + "," + (y0 + hgt) + "V" + (y0 + rr) + "Q" + x0 + "," + y0 + " " + (x0 + rr) + "," + y0 + "H" + (x0 + w - rr) + "Q" + (x0 + w) + "," + y0 + " " + (x0 + w) + "," + (y0 + rr) + "V" + (y0 + hgt) + "Z"; }
  return h("figure", { className: cx("ar-chart", p.className), ref: ref },
    p.title && h("figcaption", { className: "ar-chart-title" }, p.title),
    Legend(series),
    h("div", { className: "ar-chart-plot" },
      h("svg", { width: W, height: H, role: "img", "aria-label": p.ariaLabel || p.title, style: { direction: "ltr" }, onMouseLeave: function () { hs[1](null); } },
        ticks.map(function (t, i) { return h("g", { key: i }, h("line", { className: i ? "ar-chart-grid" : "ar-chart-base", x1: M.X(m.l), x2: M.X(W - m.r), y1: y(t), y2: y(t) }), h("text", { className: "ar-chart-axis", x: M.X(m.l - 8), y: y(t) + 4, textAnchor: M.A("end") }, fmt(t))); }),
        data.map(function (d, i) {
          var cx0 = m.l + band * i + band / 2, x0 = cx0 - gw / 2;
          return h("g", { key: i, onMouseEnter: function () { hs[1](i); } },
            h("rect", { x: M.XR(m.l + band * i, band), y: m.t, width: band, height: ih, className: cx("ar-chart-hit", hov === i && "ar-chart-hit-on") }),
            series.map(function (s, si) { var v = d[s.key] || 0, top = y(v), hgt = m.t + ih - top; return hgt > 0 ? h("path", { key: s.key, d: barPath(M.XR(x0 + si * (bw + 2), bw), top, bw, hgt), style: { fill: "var(--chart-" + (si + 1) + ")" } }) : null; }),
            h("text", { className: "ar-chart-axis", x: M.X(cx0), y: H - 8, textAnchor: "middle" }, d.label));
        })),
      hov !== null && Tip(M.X(m.l + band * hov + band / 2 + gw / 2), m.t, W, data[hov].label, series.map(function (s, si) { return { key: s.key, label: s.label, value: data[hov][s.key] || 0, color: "var(--chart-" + (si + 1) + ")" }; }), p.format || function (v) { return v.toLocaleString("en-US"); }, rtl)));
}

export { BarChart };
