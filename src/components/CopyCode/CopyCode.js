import React from 'react';
import { ui } from '../../core/i18n.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* A code to copy: voucher codes, references, IBANs. The button copies it and announces "Copied". */
function CopyCode(p) {
  var cs = React.useState(false), copied = cs[0], t = ui(), codeRef = React.useRef(null);
  /* Says "Copied" only after the copy worked: the clipboard API, else select-and-copy; if both fail the code is left selected. */
  function done() { cs[1](true); setTimeout(function () { cs[1](false); }, 2000); if (p.onCopy) p.onCopy(p.code); }
  function selectCode() { var el = codeRef.current, sel = window.getSelection && window.getSelection(); if (!el || !sel) return false; var r = document.createRange(); r.selectNodeContents(el); sel.removeAllRanges(); sel.addRange(r); return true; }
  function fallback() { var ok = false; try { ok = selectCode() && document.execCommand && document.execCommand("copy"); } catch (e) { ok = false; } if (ok) done(); else selectCode(); }
  function copy() {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(p.code).then(done, fallback);
    else fallback();
  }
  return h("div", { className: cx("ar-copycode", p.className) },
    p.label && h("span", { className: "ar-copycode-label" }, p.label),
    h("div", { className: "ar-copycode-row" },
      h("code", { className: "ar-copycode-code", dir: "ltr", ref: codeRef }, p.code),
      h("button", { type: "button", className: "ar-btn ar-btn-secondary ar-btn-sm", onClick: copy }, copied ? t.copied : t.copy)),
    h("span", { className: "ar-sr-only", "aria-live": "polite" }, copied ? t.copied : ""));
}

export { CopyCode };
