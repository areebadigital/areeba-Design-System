import React from 'react';
import { TOGGLE_KEYS, formValue, useToggle } from '../../core/toggle.js';
import { cx, rest, useId } from '../../core/util.js';
const h = React.createElement;

function Switch(p) {
  /* No native input: a button with role="switch" (WAI-ARIA switch pattern). Space and Enter toggle. */
  var id = useId(p.id), labelId = id + "-label", t = useToggle(p), on = t[0];
  return h(React.Fragment, null,
    h("button", Object.assign({}, rest(p, TOGGLE_KEYS), { type: "button", role: "switch", id: id, className: cx("ar-switch", p.className),
      "aria-checked": on ? "true" : "false", "aria-labelledby": p.label ? labelId : p["aria-labelledby"], disabled: p.disabled, onClick: t[1] }),
      h("span", { className: "ar-switch-track", "aria-hidden": "true" }),
      p.label && h("span", { id: labelId, className: "ar-switch-label" }, p.label)),
    formValue(p, on));
}

export { Switch };
