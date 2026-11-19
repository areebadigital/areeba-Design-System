import React from 'react';
import { useTrack } from '../../core/analytics.js';
import { ui } from '../../core/i18n.js';
import { icons } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

function TabBar(p) {
  var track = useTrack("TabBar", p);
  var items = p.items || [];
  return h("nav", { className: cx("ar-tabbar", p.className), "aria-label": p.label || ui().nav }, items.map(function (it) {
    var I = icons[it.icon] || icons.home;
    return h("button", { key: it.value, type: "button", className: "ar-tabbar-item", "aria-current": p.value === it.value ? "page" : undefined,
      onClick: function () { track("change", { value: it.value }, "navigation"); p.onChange && p.onChange(it.value); } }, h(I, null), it.label);
  }));
}

export { TabBar };
