import React from 'react';
import { Calendar } from '../Calendar/Calendar.js';
import { dateLocale, dateText, fmtDate } from '../../core/date.js';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

function DatePicker(p) {
  var id = useId(p.id), loc = dateLocale(p);
  var vs = React.useState(p.defaultValue || null), val = p.value !== undefined ? p.value : vs[0];
  var os = React.useState(!!p.defaultOpen), open = os[0];
  var wrap = React.useRef(null), touched = React.useRef(false), trig = React.useRef(null);
  function close(refocus) { os[1](false); if (refocus && trig.current) trig.current.focus(); }
  React.useEffect(function () {
    if (!open) return;
    if (!p.defaultOpen || touched.current) { var f = wrap.current && (wrap.current.querySelector('.ar-cal-day[aria-pressed="true"]') || wrap.current.querySelector(".ar-cal-today") || wrap.current.querySelector(".ar-cal-day:not(:disabled)")); if (f) f.focus(); }
    function out(e) { if (wrap.current && !wrap.current.contains(e.target)) os[1](false); }
    function key(e) { if (e.key === "Escape") close(true); }
    document.addEventListener("mousedown", out); document.addEventListener("keydown", key);
    return function () { document.removeEventListener("mousedown", out); document.removeEventListener("keydown", key); };
  }, [open]);
  return h("div", { className: cx("ar-field ar-date", p.error && "ar-field-invalid", p.className), ref: wrap },
    p.label && h("label", { className: "ar-field-label", htmlFor: id }, p.label),
    h("button", { type: "button", id: id, ref: trig, className: "ar-field-box ar-date-trigger", "aria-haspopup": "dialog", "aria-expanded": open ? "true" : "false", onClick: function () { touched.current = true; os[1](!open); } },
      h("span", { className: val ? "" : "ar-date-ph", dir: "auto" }, val ? fmtDate(val, loc) : (p.placeholder || dateText(loc).pick)),
      h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" }), h("path", { d: "M4 10h16M8 3v4M16 3v4" }))),
    (p.error || p.hint) && h("span", { className: "ar-field-hint" }, p.error || p.hint),
    open && h("div", { className: "ar-date-pop" }, h(Calendar, { value: val, today: p.today, min: p.min, max: p.max, locale: p.locale, onChange: function (d) { vs[1](d); p.onChange && p.onChange(d); close(true); } })));
}

export { DatePicker };
