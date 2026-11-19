import React from 'react';
import { cx, rest } from '../../core/util.js';
const h = React.createElement;

/* WAI-ARIA tabs: one tab stop, arrows move and select (they follow reading direction), Home/End jump.
   Pass `id` to link tabs to panels: tab `${id}-${value}` controls the panel `${id}-${value}-panel` (see TabPanel). */
function Tabs(p) {
  var items = p.items || [], refs = React.useRef({});
  var st = React.useState(p.defaultValue || (items[0] && items[0].value)), cur = p.value !== undefined ? p.value : st[0];
  function choose(v) { st[1](v); if (p.onChange) p.onChange(v); var el = refs.current[v]; if (el) el.focus(); }
  function onKey(e, i) {
    var rtl = getComputedStyle(e.currentTarget).direction === "rtl", n = items.length, k = e.key, j = -1;
    if (k === "ArrowRight") j = rtl ? i - 1 : i + 1; else if (k === "ArrowLeft") j = rtl ? i + 1 : i - 1; else if (k === "Home") j = 0; else if (k === "End") j = n - 1; else return;
    e.preventDefault(); choose(items[(j + n) % n].value);
  }
  return h("div", { role: "tablist", "aria-label": p.label, className: cx("ar-tabs", p.className) }, items.map(function (it, i) {
    var on = cur === it.value;
    return h("button", { key: it.value, ref: function (el) { refs.current[it.value] = el; }, role: "tab", type: "button", className: "ar-tab", id: p.id ? p.id + "-" + it.value : undefined,
      "aria-controls": p.id ? p.id + "-" + it.value + "-panel" : undefined, "aria-selected": on ? "true" : "false", tabIndex: on ? 0 : -1,
      onClick: function () { choose(it.value); }, onKeyDown: function (e) { onKey(e, i); } }, it.label);
  }));
}
/* The panel for one tab of a Tabs with an `id`. Render only the current one. */
function TabPanel(p) {
  return h("div", Object.assign({}, rest(p, ["tabs", "value", "className", "children"]), { role: "tabpanel", id: p.tabs + "-" + p.value + "-panel", "aria-labelledby": p.tabs + "-" + p.value, tabIndex: 0, className: cx("ar-tabpanel", p.className) }), p.children);
}

export { Tabs, TabPanel };
