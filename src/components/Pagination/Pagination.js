import React from 'react';
import { useTrack } from '../../core/analytics.js';
import { ui } from '../../core/i18n.js';
import { icons } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* Page numbers for long tables. 1-based `page`; `total` and `pageSize` add the "1–25 of 1,284" range. */
function pageList(page, count) {
  if (count <= 7) return Array.from({ length: count }, function (_, i) { return i + 1; });
  var out = [1], a = Math.max(2, page - 1), b = Math.min(count - 1, page + 1);
  if (page <= 3) { a = 2; b = 4; } else if (page >= count - 2) { a = count - 3; b = count - 1; }
  if (a > 2) out.push("…a"); for (var i = a; i <= b; i++) out.push(i); if (b < count - 1) out.push("…b"); out.push(count); return out;
}
function Pagination(p) {
  var t = ui(), count = Math.max(1, p.pageCount || Math.ceil((p.total || 0) / (p.pageSize || 25))), page = Math.min(Math.max(1, p.page || 1), count);
  var fmt = function (n) { return Number(n).toLocaleString("en-US"); };
  var track = useTrack("Pagination", p);
  function go(n) { if (n >= 1 && n <= count && n !== page) { track("change", { page: n, pageCount: count }); if (p.onChange) p.onChange(n); } }
  var range = p.total != null && p.pageSize ? t.range(fmt((page - 1) * p.pageSize + 1), fmt(Math.min(page * p.pageSize, p.total)), fmt(p.total)) : null;
  return h("nav", { className: cx("ar-pager", p.className), "aria-label": p.label || t.pages },
    range && h("span", { className: "ar-pager-range" }, h("bdi", null, range)),
    h("div", { className: "ar-pager-pages" },
      h("button", { type: "button", className: "ar-pager-btn", "aria-label": t.prevPage, disabled: page === 1, onClick: function () { go(page - 1); } }, h(icons.chevronLeft, null)),
      pageList(page, count).map(function (n) {
        return typeof n === "string" ? h("span", { key: n, className: "ar-pager-gap", "aria-hidden": "true" }, "…")
          : h("button", { key: n, type: "button", className: cx("ar-pager-btn", n === page && "ar-pager-on"), "aria-label": t.page(n), "aria-current": n === page ? "page" : undefined, onClick: function () { go(n); } }, n);
      }),
      h("button", { type: "button", className: "ar-pager-btn", "aria-label": t.nextPage, disabled: page === count, onClick: function () { go(page + 1); } }, h(icons.chevronRight, null))));
}

export { pageList, Pagination };
