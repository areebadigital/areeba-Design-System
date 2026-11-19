import React from 'react';
import { useTrack, analyticsAttrs } from '../../core/analytics.js';
import { TOGGLE_KEYS, formValue, useToggle } from '../../core/toggle.js';
import { cx, rest, useId } from '../../core/util.js';
const h = React.createElement;

function Checkbox(p) {
  /* No native input: a button with role="checkbox" (WAI-ARIA checkbox pattern). Space toggles; indeterminate is aria-checked="mixed". */
  var id = useId(p.id), labelId = id + "-label", hintId = id + "-hint", t = useToggle(p), on = t[0], track = useTrack("Checkbox", p);
  function toggle() { if (p.disabled) return; t[1](); track("change", { checked: p.indeterminate ? true : !on }); }
  return h(React.Fragment, null,
    h("button", Object.assign({}, rest(p, TOGGLE_KEYS), analyticsAttrs("Checkbox", p), { type: "button", role: "checkbox", id: id, className: cx("ar-check", p.className),
      "aria-checked": p.indeterminate ? "mixed" : (on ? "true" : "false"), "aria-labelledby": labelId, "aria-describedby": p.hint ? hintId : undefined,
      "aria-required": p.required ? "true" : undefined, disabled: p.disabled, onClick: toggle,
      onKeyDown: function (e) { if (e.key === "Enter") e.preventDefault(); if (p.onKeyDown) p.onKeyDown(e); } }),
      h("span", { className: "ar-check-box", "aria-hidden": "true" },
        h("svg", { viewBox: "0 0 16 16", className: "ar-check-tick" }, h("path", { d: "M3.5 8.5l3 3 6-7" })),
        h("svg", { viewBox: "0 0 16 16", className: "ar-check-dash" }, h("path", { d: "M4 8h8" }))),
      h("span", { className: "ar-check-text" }, h("span", { id: labelId }, p.label), p.hint && h("span", { className: "ar-check-hint", id: hintId }, p.hint))),
    formValue(p, on));
}

export { Checkbox };
