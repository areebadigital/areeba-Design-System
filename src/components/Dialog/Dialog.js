import React from 'react';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

function Dialog(p) {
  var titleId = useId(), descId = titleId + "-d", box = React.useRef(null);
  /* WAI-ARIA dialog: focus moves in on open (first field or button), Tab stays inside, Escape closes, focus returns to the opener. */
  React.useEffect(function () {
    if (!p.open) return;
    var opener = document.activeElement, sel = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),textarea,[tabindex]:not([tabindex="-1"])';
    var list = function () { return box.current ? Array.prototype.slice.call(box.current.querySelectorAll(sel)) : []; };
    var first = list().filter(function (el) { return el.tagName === "INPUT"; })[0] || list()[0] || box.current; if (first) first.focus();
    function onKey(e) {
      if (e.key === "Escape" && p.onClose) p.onClose();
      if (e.key !== "Tab") return; var els = list(); if (!els.length) return;
      var a = els[0], z = els[els.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return function () { document.removeEventListener("keydown", onKey); if (opener && opener.focus && document.contains(opener)) opener.focus(); };
  }, [p.open]);
  if (!p.open) return null;
  return h("div", { className: "ar-dialog-backdrop", onClick: function (e) { if (e.target === e.currentTarget && p.onClose) p.onClose(); } },
    h("div", { ref: box, tabIndex: -1, role: p.tone === "danger" ? "alertdialog" : "dialog", "aria-modal": "true", "aria-labelledby": titleId, "aria-describedby": descId, className: cx("ar-dialog", p.sheet && "ar-dialog-sheet", p.className) },
      h("h2", { id: titleId, className: "ar-dialog-title" }, p.title),
      h("div", { id: descId, className: "ar-dialog-body" }, p.children),
      p.actions && h("div", { className: "ar-dialog-actions" }, p.actions)));
}

export { Dialog };
