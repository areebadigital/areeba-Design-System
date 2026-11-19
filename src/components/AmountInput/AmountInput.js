import React from 'react';
import { NumberPad } from '../NumberPad/NumberPad.js';
import { groupDigits } from '../../core/amount.js';
import { ui } from '../../core/i18n.js';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

/* The big amount entry. Type it (inputMode decimal) or drive it from a NumberPad (readOnly). Shows fee and limits. */
function AmountInput(p) {
  var id = useId(p.id), hintId = id + "-hint", st = React.useState(p.defaultValue || ""), val = p.value !== undefined ? p.value : st[0];
  function set(v) { st[1](v); if (p.onChange) p.onChange(v); }
  var invalid = !!p.error;
  return h("div", { className: cx("ar-amount", invalid && "ar-amount-invalid", p.className) },
    p.label && h("label", { className: "ar-amount-label", htmlFor: id }, p.label),
    h("div", { className: "ar-amount-row", dir: "ltr" },
      h("span", { className: "ar-amount-cur", "aria-hidden": "true" }, p.currency || "$"),
      h("input", { id: id, className: "ar-amount-input", inputMode: p.readOnly ? "none" : "decimal", readOnly: p.readOnly, autoComplete: "off", placeholder: "0",
        value: groupDigits(val), "aria-invalid": invalid ? "true" : undefined, "aria-describedby": hintId,
        onChange: function (e) { var raw = e.target.value.replace(/[^\d.]/g, ""), dot = raw.indexOf("."); if (dot >= 0) raw = raw.slice(0, dot + 1) + raw.slice(dot + 1).replace(/\./g, "").slice(0, 2); set(raw); },
        style: { width: Math.max(1, groupDigits(val).length || 1) + 0.5 + "ch" } })),
    h("div", { className: "ar-amount-meta", id: hintId },
      p.fee !== undefined && h("span", null, p.feeLabel || ui().fee, " ", h("b", { className: cx(p.fee === 0 || p.fee === ui().free ? "ar-amount-free" : ""), dir: "auto" }, p.fee === 0 ? ui().free : p.fee)),
      invalid ? h("span", { className: "ar-amount-error", role: "alert" }, p.error) : p.hint && h("span", { dir: "auto" }, p.hint)));
}

export { AmountInput };
