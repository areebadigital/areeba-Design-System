import React from 'react';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

/* Choose one of a few options you can see at once. WAI-ARIA radio group: one tab stop, arrows move and choose, Space chooses.
   variant "card" draws each option as a bordered tile (with a hint line). The value travels in a hidden input when `name` is set. */
function RadioGroup(p) {
  var opts = p.options || [], id = useId(p.id), labelId = id + "-label", hintId = id + "-hint", refs = React.useRef([]);
  var st = React.useState(p.defaultValue !== undefined ? p.defaultValue : null), cur = p.value !== undefined ? p.value : st[0];
  var enabled = opts.map(function (o, i) { return o.disabled || p.disabled ? -1 : i; }).filter(function (i) { return i >= 0; });
  var sel = opts.findIndex(function (o) { return o.value === cur; }), stop = sel >= 0 && enabled.indexOf(sel) >= 0 ? sel : enabled[0];
  function choose(i, focus) { var o = opts[i]; if (!o || o.disabled || p.disabled) return; st[1](o.value); if (p.onChange) p.onChange(o.value, o); if (focus && refs.current[i]) refs.current[i].focus(); }
  function onKey(e, i) {
    var k = e.key, d = 0, rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    if (k === "ArrowDown") d = 1; else if (k === "ArrowUp") d = -1; else if (k === "ArrowRight") d = rtl ? -1 : 1; else if (k === "ArrowLeft") d = rtl ? 1 : -1;
    else if (k === " ") { e.preventDefault(); choose(i, false); return; } else return;
    e.preventDefault(); var at = enabled.indexOf(i); choose(enabled[(at + d + enabled.length) % enabled.length], true);
  }
  var described = p.error || p.hint ? hintId : undefined;
  return h("div", { className: cx("ar-radios", p.variant === "card" && "ar-radios-card", p.orientation === "horizontal" && "ar-radios-row", p.error && "ar-radios-invalid", p.className) },
    p.label && h("span", { className: "ar-field-label", id: labelId }, p.label),
    h("div", { role: "radiogroup", "aria-labelledby": p.label ? labelId : undefined, "aria-label": p.label ? undefined : p["aria-label"], "aria-describedby": described,
      "aria-required": p.required ? "true" : undefined, "aria-invalid": p.error ? "true" : undefined, className: "ar-radios-list" },
      opts.map(function (o, i) {
        var on = i === sel, dis = o.disabled || p.disabled, oid = id + "-" + i;
        return h("div", { key: o.value, ref: function (el) { refs.current[i] = el; }, role: "radio", id: oid, "aria-checked": on ? "true" : "false", "aria-disabled": dis ? "true" : undefined,
          "aria-describedby": o.hint ? oid + "-hint" : undefined, tabIndex: i === stop ? 0 : -1, className: cx("ar-radio", on && "ar-radio-on"),
          onClick: function () { choose(i, true); }, onKeyDown: function (e) { onKey(e, i); } },
          h("span", { className: "ar-radio-dot", "aria-hidden": "true" }),
          h("span", { className: "ar-radio-text" }, h("span", { className: "ar-radio-label" }, o.label), o.hint && h("span", { className: "ar-radio-hint", id: oid + "-hint" }, o.hint)));
      })),
    (p.error || p.hint) && h("span", { className: "ar-field-hint", id: hintId, role: p.error ? "alert" : undefined }, p.error || p.hint),
    p.name && cur != null && h("input", { type: "hidden", name: p.name, value: cur }));
}

export { RadioGroup };
