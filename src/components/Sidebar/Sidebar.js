import React from 'react';
import { useTrack } from '../../core/analytics.js';
import { ui } from '../../core/i18n.js';
import { icons } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

function Sidebar(p) {
  var track = useTrack("Sidebar", p);
  var items = p.items || [];
  return h("aside", { className: cx("ar-sidebar", p.className) },
    h("div", { className: "ar-sidebar-brand" }, p.brand || "areeba"),
    h("nav", { "aria-label": p.label || ui().nav }, items.map(function (it) {
      var I = icons[it.icon] || icons.home;
      return h("a", { key: it.value, href: it.href || "#", className: "ar-sidebar-item", "aria-current": p.value === it.value ? "page" : undefined,
        onClick: function (e) { track("change", { value: it.value }, "navigation"); if (p.onChange) { e.preventDefault(); p.onChange(it.value); } } }, h(I, null), h("span", null, it.label),
        it.count !== undefined && h("span", { className: "ar-sidebar-count", dir: "ltr" }, it.count));
    })),
    p.footer && h("div", { className: "ar-sidebar-footer" }, p.footer));
}

export { Sidebar };
