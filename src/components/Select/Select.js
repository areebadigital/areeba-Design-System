import React from 'react';
import { useTrack, useErrorShown } from '../../core/analytics.js';
import { ui } from '../../core/i18n.js';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

function Select(p) {
  /* Custom listbox: the select-only combobox pattern (WAI-ARIA APG). No native <select>. */
  var id = useId(p.id), labelId = id + "-label", listId = id + "-list", hintId = id + "-hint";
  var opts = p.options || [];
  var vs = React.useState(p.defaultValue !== undefined ? p.defaultValue : null), val = p.value !== undefined ? p.value : vs[0];
  var os = React.useState(!!p.defaultOpen), open = os[0];
  var as = React.useState(-1), active = as[0];
  var wrap = React.useRef(null), list = React.useRef(null), typed = React.useRef({ s: "", t: 0 });
  var selIdx = -1; for (var i = 0; i < opts.length; i++) if (opts[i].value === val) selIdx = i;
  var selected = selIdx >= 0 ? opts[selIdx] : null;
  function enabled(i) { return opts[i] && !opts[i].disabled; }
  function step(from, dir) { for (var i = from + dir; i >= 0 && i < opts.length; i += dir) if (enabled(i)) return i; return from; }
  function first() { return step(-1, 1); } function last() { return step(opts.length, -1); }
  var track = useTrack("Select", p); useErrorShown("Select", p);
  function openAt(i) { if (p.disabled) return; os[1](true); as[1](i >= 0 ? i : (selIdx >= 0 ? selIdx : first())); }
  function close() { os[1](false); }
  function choose(i) { if (!enabled(i)) return; var o = opts[i]; if (i !== selIdx) track("change", { value: o.value }); vs[1](o.value); close(); if (p.onChange) p.onChange(o.value, o); }
  function match(ch) {
    var now = Date.now(), t = typed.current; t.s = (now - t.t > 600 ? "" : t.s) + ch.toLowerCase(); t.t = now;
    var start = open ? active : selIdx;
    for (var k = 1; k <= opts.length; k++) { var i = (start + k + opts.length) % opts.length; if (enabled(i) && String(opts[i].label).toLowerCase().indexOf(t.s) === 0) return i; }
    return -1;
  }
  function onKey(e) {
    var k = e.key;
    if (!open) {
      if (k === "ArrowDown" || k === "ArrowUp" || k === "Enter" || k === " ") { e.preventDefault(); openAt(selIdx >= 0 ? selIdx : (k === "ArrowUp" ? last() : first())); }
      else if (k === "Home") { e.preventDefault(); openAt(first()); }
      else if (k === "End") { e.preventDefault(); openAt(last()); }
      else if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { var m = match(k); if (m >= 0) openAt(m); }
      return;
    }
    if (k === "ArrowDown") { e.preventDefault(); if (e.altKey) return; as[1](step(active, 1)); }
    else if (k === "ArrowUp") { e.preventDefault(); if (e.altKey) { choose(active); return; } as[1](step(active, -1)); }
    else if (k === "Home") { e.preventDefault(); as[1](first()); }
    else if (k === "End") { e.preventDefault(); as[1](last()); }
    else if (k === "PageDown") { e.preventDefault(); var d = active; for (var n = 0; n < 10; n++) d = step(d, 1); as[1](d); }
    else if (k === "PageUp") { e.preventDefault(); var u = active; for (var q = 0; q < 10; q++) u = step(u, -1); as[1](u); }
    else if (k === "Enter" || k === " ") { e.preventDefault(); choose(active); }
    else if (k === "Escape") { e.preventDefault(); close(); }
    else if (k === "Tab") { if (active >= 0 && active !== selIdx) choose(active); else close(); }
    else if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { var mm = match(k); if (mm >= 0) as[1](mm); }
  }
  React.useEffect(function () {
    if (!open) return;
    function out(e) { if (wrap.current && !wrap.current.contains(e.target)) close(); }
    document.addEventListener("mousedown", out); return function () { document.removeEventListener("mousedown", out); };
  }, [open]);
  React.useEffect(function () {
    if (!open || active < 0 || !list.current) return;
    var el = list.current.children[active]; if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
  }, [open, active]);
  var Tick = h("svg", { className: "ar-option-tick", viewBox: "0 0 16 16", "aria-hidden": "true" }, h("path", { d: "M3.5 8.5l3 3 6-7" }));
  return h("div", { className: cx("ar-field ar-select", p.error && "ar-field-invalid", p.className), ref: wrap },
    p.label && h("label", { className: "ar-field-label", id: labelId, htmlFor: id }, p.label),
    h("button", { type: "button", id: id, role: "combobox", className: "ar-field-box ar-select-trigger", disabled: p.disabled,
      "aria-haspopup": "listbox", "aria-expanded": open ? "true" : "false", "aria-controls": listId,
      "aria-labelledby": p.label ? labelId + " " + id : undefined, "aria-label": p.label ? undefined : p["aria-label"],
      "aria-activedescendant": open && active >= 0 ? id + "-o" + active : undefined,
      "aria-invalid": p.error ? "true" : undefined, "aria-required": p.required ? "true" : undefined,
      "aria-describedby": (p.error || p.hint) ? hintId : undefined,
      onClick: function () { open ? close() : openAt(-1); }, onKeyDown: onKey, onBlur: function (e) { if (wrap.current && !wrap.current.contains(e.relatedTarget)) close(); } },
      h("span", { className: cx("ar-select-value", !selected && "ar-select-ph") }, selected ? selected.label : (p.placeholder || ui().select)),
      h("svg", { className: "ar-select-chev", viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M6 9l6 6 6-6" }))),
    p.name && h("input", { type: "hidden", name: p.name, value: val == null ? "" : val }),
    h("div", { className: "ar-pop", hidden: !open },
      h("ul", { className: "ar-listbox", role: "listbox", id: listId, ref: list, tabIndex: -1, "aria-labelledby": p.label ? labelId : undefined },
        opts.map(function (o, i) {
          return h("li", { key: o.value, id: id + "-o" + i, role: "option", className: "ar-option", "aria-selected": i === selIdx ? "true" : "false",
            "aria-disabled": o.disabled ? "true" : undefined, "data-active": i === active ? "true" : undefined,
            onMouseDown: function (e) { e.preventDefault(); }, onMouseEnter: function () { if (!o.disabled) as[1](i); }, onClick: function () { choose(i); } },
            h("span", { className: "ar-option-label" }, o.label), i === selIdx && Tick);
        }))),
    (p.error || p.hint) && h("span", { className: "ar-field-hint", id: hintId }, p.error || p.hint));
}

export { Select };
