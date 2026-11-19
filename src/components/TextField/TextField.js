import React from 'react';
import { cx, rest, useId } from '../../core/util.js';
const h = React.createElement;

function TextField(p) {
  var id = useId(p.id), hintId = id + "-hint";
  return h("div", { className: cx("ar-field", p.error && "ar-field-invalid", p.className) },
    p.label && h("label", { className: "ar-field-label", htmlFor: id }, p.label),
    h("div", { className: "ar-field-box", dir: p.dir === "ltr" ? "ltr" : undefined },
      p.prefix && h("span", { className: "ar-field-prefix" }, p.prefix),
      h("input", Object.assign({}, rest(p, ["label", "hint", "error", "prefix", "className", "id"]), {
        id: id, "aria-invalid": p.error ? "true" : undefined, "aria-describedby": (p.error || p.hint) ? hintId : undefined
      }))),
    (p.error || p.hint) && h("span", { className: "ar-field-hint", id: hintId }, p.error || p.hint));
}

export { TextField };
