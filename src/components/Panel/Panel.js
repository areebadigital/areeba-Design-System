import React from 'react';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

/* A titled surface for a part of a page: a form section, a summary, a short list. Actions sit at the end of the header; the footer holds the form's buttons. */
function Panel(p) {
  var id = useId();
  return h("section", { className: cx("ar-panel", p.className), "aria-labelledby": p.title ? id : undefined },
    (p.title || p.actions) && h("div", { className: "ar-panel-head" },
      h("div", { className: "ar-panel-heading" }, p.title && h("h2", { className: "ar-panel-title", id: id }, p.title), p.description && h("p", { className: "ar-panel-desc" }, p.description)),
      p.actions && h("div", { className: "ar-panel-actions" }, p.actions)),
    h("div", { className: cx("ar-panel-body", p.flush && "ar-panel-flush") }, p.children),
    p.footer && h("div", { className: "ar-panel-foot" }, p.footer));
}

export { Panel };
