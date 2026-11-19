import React from 'react';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

/* One-time code entry: one real input (so paste and SMS autofill work), drawn as boxes.
   Digits only, 0–9, always left-to-right. onComplete fires when every box is filled. */
function CodeInput(p) {
  var n = p.length || 6, id = useId(p.id), hintId = id + "-hint", st = React.useState(p.defaultValue || ""), val = p.value !== undefined ? p.value : st[0];
  var fs = React.useState(false), focused = fs[0];
  function set(v) { v = v.replace(/\D/g, "").slice(0, n); st[1](v); if (p.onChange) p.onChange(v); if (v.length === n && p.onComplete) p.onComplete(v); }
  var boxes = []; for (var i = 0; i < n; i++) boxes.push(h("span", { key: i, className: cx("ar-code-box", focused && i === Math.min(val.length, n - 1) && "ar-code-active", val[i] && "ar-code-filled") }, val[i] || ""));
  return h("div", { className: cx("ar-code", p.error && "ar-code-invalid", p.className) },
    p.label && h("label", { className: "ar-field-label", htmlFor: id }, p.label),
    h("div", { className: "ar-code-row", dir: "ltr" },
      h("input", { id: id, className: "ar-code-input", value: val, inputMode: "numeric", autoComplete: "one-time-code", pattern: "[0-9]*", /* no maxLength: pasted codes with spaces or dashes must reach set() whole */
        "aria-invalid": p.error ? "true" : undefined, "aria-describedby": (p.error || p.hint) ? hintId : undefined, autoFocus: p.autoFocus,
        onChange: function (e) { set(e.target.value); }, onFocus: function () { fs[1](true); }, onBlur: function () { fs[1](false); } }),
      h("div", { className: "ar-code-boxes", "aria-hidden": "true" }, boxes)),
    (p.error || p.hint) && h("span", { className: "ar-field-hint", id: hintId, role: p.error ? "alert" : undefined }, p.error || p.hint));
}

export { CodeInput };
