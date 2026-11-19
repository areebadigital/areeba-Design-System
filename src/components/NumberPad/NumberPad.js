import React from 'react';
import { ui } from '../../core/i18n.js';
import { icons } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* Number pad for amounts and passcodes. onKey receives "0"–"9", "." and "back". Digits are always 0–9. */
function NumberPad(p) {
  var t = ui(), keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", p.decimal ? "." : null, "0", "back"];
  return h("div", { className: cx("ar-pad", p.className), role: "group", "aria-label": p.label || t.keypad, dir: "ltr" }, keys.map(function (k, i) {
    if (k === null) return h("span", { key: i, "aria-hidden": "true" });
    return h("button", { key: i, type: "button", className: cx("ar-pad-key", k === "back" && "ar-pad-back"), "aria-label": k === "back" ? t.del : undefined, disabled: p.disabled,
      onClick: function () { if (p.onKey) p.onKey(k); } }, k === "back" ? h(icons.backspace, null) : k);
  }));
}

export { NumberPad };
