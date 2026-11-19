import React from 'react';
import { Legend, Tip, compact, mirror, niceMax, useWidth } from '../../core/chart.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

function LineChart(p) {
  var data = p.data || [], series = (p.series || []).slice(0, 4), fmt = p.format || compact, H = p.height || 240;
  var r = useWidth(p.width || 640), ref = r[0], W = r[1], rtl = r[2], M = mirror(rtl, W);
  var hs = React.useState(null), hov = hs[0];
  var m = { t: 12, r: series.length > 1 ? 72 : 16, b: 28, l: 48 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  var max = niceMax(Math.max.apply(null, data.reduce(function (a, d) { return a.concat(series.map(function (s) { return d[s.key] || 0; })); }, [0])));
  var x = function (i) { return m.l + (data.length < 2 ? iw / 2 : i * iw / (data.length - 1)); }, y = function (v) { return m.t + ih - v / max * ih; };
  var ticks = [0, .25, .5, .75, 1].map(function (f) { return f * max; });
  var every = Math.ceil(data.length / Math.max(1, Math.floor(iw / 64)));
  function move(e) { var bx = e.currentTarget.getBoundingClientRect(), px = e.clientX - bx.left; if (rtl) px = W - px; var i = Math.round((px - m.l) / iw * (data.length - 1)); hs[1](Math.max(0, Math.min(data.length - 1, i))); }
  return h("figure", { className: cx("ar-chart", p.className), ref: ref },
    p.title && h("figcaption", { className: "ar-chart-title" }, p.title),
    Legend(series),
    h("div", { className: "ar-chart-plot" },
      h("svg", { width: W, height: H, role: "img", "aria-label": p.ariaLabel || p.title, style: { direction: "ltr" }, onMouseMove: move, onMouseLeave: function () { hs[1](null); } },
        ticks.map(function (t, i) { return h("g", { key: i }, h("line", { className: i ? "ar-chart-grid" : "ar-chart-base", x1: M.X(m.l), x2: M.X(W - m.r), y1: y(t), y2: y(t) }), h("text", { className: "ar-chart-axis", x: M.X(m.l - 8), y: y(t) + 4, textAnchor: M.A("end") }, fmt(t))); }),
        data.map(function (d, i) { return i % every ? null : h("text", { key: i, className: "ar-chart-axis", x: M.X(x(i)), y: H - 8, textAnchor: "middle" }, d.label); }),
        hov !== null && h("line", { className: "ar-chart-cross", x1: M.X(x(hov)), x2: M.X(x(hov)), y1: m.t, y2: m.t + ih }),
        series.map(function (s, si) {
          var pts = data.map(function (d, i) { return M.X(x(i)) + "," + y(d[s.key] || 0); }).join(" "), last = data[data.length - 1];
          return h("g", { key: s.key },
            h("polyline", { className: "ar-chart-line", points: pts, style: { stroke: "var(--chart-" + (si + 1) + ")" } }),
            series.length > 1 && last && h("text", { className: "ar-chart-direct", x: M.X(W - m.r + 8), y: y(last[s.key] || 0) + 4, textAnchor: M.A("start") }, s.label),
            hov !== null && h("circle", { className: "ar-chart-dot", cx: M.X(x(hov)), cy: y(data[hov][s.key] || 0), r: 4, style: { fill: "var(--chart-" + (si + 1) + ")" } }));
        })),
      hov !== null && Tip(M.X(x(hov)), m.t, W, data[hov].label, series.map(function (s, si) { return { key: s.key, label: s.label, value: data[hov][s.key] || 0, color: "var(--chart-" + (si + 1) + ")" }; }), p.format || function (v) { return v.toLocaleString("en-US"); }, rtl)));
}

export { LineChart };
