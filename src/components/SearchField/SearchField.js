import React from 'react';
import { ui } from '../../core/i18n.js';
import { icons } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* Search box: a real text input (type=search) with a clear button. `label` names it for screen readers. */
function SearchField(p) {
  var st = React.useState(p.defaultValue || ""), val = p.value !== undefined ? p.value : st[0], ref = React.useRef(null), t = ui();
  function set(v) { st[1](v); if (p.onChange) p.onChange(v); }
  return h("div", { className: cx("ar-search", p.className), role: "search" },
    h(icons.search, { className: "ar-search-icon" }),
    h("input", { ref: ref, type: "search", className: "ar-search-input", "aria-label": p.label || t.search, placeholder: p.placeholder, value: val, onChange: function (e) { set(e.target.value); } }),
    val && h("button", { type: "button", className: "ar-search-clear", "aria-label": t.clear, onClick: function () { set(""); if (ref.current) ref.current.focus(); } }, h(icons.close, null)));
}

export { SearchField };
