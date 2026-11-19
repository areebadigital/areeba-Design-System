import React from 'react';
import { dateLocale, dateText, fmtDate, fmtMonth, sameDay, weekdays } from '../../core/date.js';
import { cx, isRtl, useId } from '../../core/util.js';
const h = React.createElement;

function Calendar(p) {
  /* WAI-ARIA date grid: rows of gridcells, one roving tab stop. Arrows move by day/week,
     Home/End to the week's edges, PageUp/PageDown by month, Enter/Space chooses. */
  var sel = p.value, today = p.today || new Date(), loc = dateLocale(p), txt = dateText(loc);
  var fs = React.useState(function () { return sel || today; }), focus = fs[0];
  var view = new Date(focus.getFullYear(), focus.getMonth(), 1);
  var grid = React.useRef(null), moved = React.useRef(false);
  var first = (view.getDay() + 6) % 7, days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  var cells = []; for (var i = 0; i < first; i++) cells.push(null); for (var d = 1; d <= days; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));
  while (cells.length % 7) cells.push(null);
  var weeks = []; for (var w = 0; w < cells.length; w += 7) weeks.push(cells.slice(w, w + 7));
  function off(c) { return (p.min && c < p.min) || (p.max && c > p.max); }
  function go(dt) { moved.current = true; fs[1](dt); }
  function shift(n) { var t = new Date(focus.getFullYear(), focus.getMonth() + n, 1); var last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate(); go(new Date(t.getFullYear(), t.getMonth(), Math.min(focus.getDate(), last))); }
  function onKey(e) {
    var k = e.key, y = focus.getFullYear(), m = focus.getMonth(), dd = focus.getDate(), dow = (focus.getDay() + 6) % 7, t = null;
    if (isRtl(grid.current)) { if (k === "ArrowLeft") k = "ArrowRight"; else if (k === "ArrowRight") k = "ArrowLeft"; } /* arrows follow the mirrored grid */
    if (k === "ArrowLeft") t = new Date(y, m, dd - 1); else if (k === "ArrowRight") t = new Date(y, m, dd + 1);
    else if (k === "ArrowUp") t = new Date(y, m, dd - 7); else if (k === "ArrowDown") t = new Date(y, m, dd + 7);
    else if (k === "Home") t = new Date(y, m, dd - dow); else if (k === "End") t = new Date(y, m, dd + 6 - dow);
    else if (k === "PageUp") { e.preventDefault(); shift(-1); return; } else if (k === "PageDown") { e.preventDefault(); shift(1); return; }
    if (t) { e.preventDefault(); go(t); }
  }
  React.useEffect(function () {
    if (!moved.current || !grid.current) return; moved.current = false;
    var el = grid.current.querySelector('[data-focus="true"]'); if (el) el.focus();
  });
  var Chev = function (dir) { return h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: dir < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6" })); };
  var title = fmtMonth(view, loc), titleId = useId() + "-t";
  return h("div", { className: "ar-cal", role: "group", "aria-labelledby": titleId },
    h("div", { className: "ar-cal-head" },
      h("button", { type: "button", className: "ar-cal-nav", "aria-label": txt.prev, onClick: function () { fs[1](new Date(view.getFullYear(), view.getMonth() - 1, 1)); } }, Chev(-1)),
      h("span", { className: "ar-cal-title", id: titleId, "aria-live": "polite" }, title),
      h("button", { type: "button", className: "ar-cal-nav", "aria-label": txt.next, onClick: function () { fs[1](new Date(view.getFullYear(), view.getMonth() + 1, 1)); } }, Chev(1))),
    h("div", { className: "ar-cal-grid", role: "grid", "aria-labelledby": titleId, ref: grid, onKeyDown: onKey },
      h("div", { className: "ar-cal-row", role: "row" }, weekdays(loc).map(function (wd, i) { return h("span", { key: i, className: "ar-cal-dow", role: "columnheader", "aria-label": wd[1] }, wd[0]); })),
      weeks.map(function (wk, wi) {
        return h("div", { key: wi, className: "ar-cal-row", role: "row" }, wk.map(function (c, ci) {
          if (!c) return h("span", { key: ci, role: "gridcell", className: "ar-cal-cell" });
          var isSel = sameDay(c, sel), isFocus = sameDay(c, focus);
          return h("span", { key: ci, role: "gridcell", className: "ar-cal-cell", "aria-selected": isSel ? "true" : "false" },
            h("button", { type: "button", disabled: off(c), tabIndex: isFocus ? 0 : -1, "data-focus": isFocus ? "true" : undefined, "aria-label": fmtDate(c, loc),
              "aria-current": sameDay(c, today) ? "date" : undefined, "aria-pressed": isSel ? "true" : "false",
              className: cx("ar-cal-day", sameDay(c, today) && "ar-cal-today"), onFocus: function () { if (!isFocus) fs[1](c); },
              onClick: function () { if (!off(c) && p.onChange) p.onChange(c); } }, c.getDate()));
        }));
      })));
}

export { Calendar };
