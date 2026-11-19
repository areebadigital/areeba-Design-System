import React from 'react';
import { ui } from '../../core/i18n.js';
import { cx, rest, useId } from '../../core/util.js';
const h = React.createElement;

/* Several lines of text: a note, a reason, an address. A real textarea (text entry is the one native control we keep). `maxLength` adds a counter. */
function TextArea(p) {
  var id = useId(p.id), hintId = id + "-hint", countId = id + "-count", t = ui();
  var st = React.useState(p.defaultValue || ""), val = p.value !== undefined ? p.value : st[0];
  var desc = [(p.error || p.hint) && hintId, p.maxLength && countId].filter(Boolean).join(" ") || undefined;
  return h("div", { className: cx("ar-field", "ar-textarea", p.error && "ar-field-invalid", p.className) },
    p.label && h("label", { className: "ar-field-label", htmlFor: id }, p.label),
    h("textarea", Object.assign({ rows: 4 }, rest(p, ["label", "hint", "error", "className", "id", "value", "defaultValue", "onChange"]), {
      id: id, value: val, "aria-invalid": p.error ? "true" : undefined, "aria-describedby": desc,
      onChange: function (e) { st[1](e.target.value); if (p.onChange) p.onChange(e); } })),
    (p.error || p.hint || p.maxLength) && h("div", { className: "ar-textarea-foot" },
      (p.error || p.hint) ? h("span", { className: "ar-field-hint", id: hintId }, p.error || p.hint) : h("span", null),
      p.maxLength && h("span", { className: cx("ar-textarea-count", val.length >= p.maxLength && "ar-textarea-full"), id: countId, "aria-live": "polite" }, t.chars(val.length, p.maxLength))));
}

export { TextArea };
