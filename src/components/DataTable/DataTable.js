import React from 'react';
import { ui } from '../../core/i18n.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

function DataTable(p) {
  var cols = p.columns || [], rows = p.rows || [];
  return h("div", { className: cx("ar-table-wrap", p.className) },
    h("table", { className: "ar-table" },
      p.caption && h("caption", null, p.caption),
      h("thead", null, h("tr", null, cols.map(function (c) { return h("th", { key: c.key, scope: "col", className: c.align === "right" ? "ar-right" : undefined }, c.label); }))),
      h("tbody", null, rows.length ? rows.map(function (r, i) {
        return h("tr", { key: r.id || i }, cols.map(function (c) {
          var v = c.render ? c.render(r) : r[c.key];
          return h("td", { key: c.key, className: cx(c.align === "right" && "ar-right", c.numeric && "ar-num", c.mono && "ar-mono") }, c.numeric || c.mono ? h("span", { dir: "ltr" }, v) : v);
        }));
      }) : h("tr", null, h("td", { colSpan: cols.length, className: "ar-table-empty" }, p.empty || ui().empty)))));
}

export { DataTable };
