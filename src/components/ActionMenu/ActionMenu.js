import React from 'react';
import { IconButton } from '../IconButton/IconButton.js';
import { QuickAction } from '../QuickAction/QuickAction.js';
import { ui } from '../../core/i18n.js';
import { renderIcon } from '../../core/icons.js';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

/* WAI-ARIA menu button. Items: { label, icon, onSelect, disabled, danger }. `button` renders a custom trigger
   (it receives ref and ARIA props), e.g. a QuickAction; the default is an IconButton with the "more" icon. */
function ActionMenu(p) {
  var items = p.items || [], os = React.useState(false), open = os[0], as = React.useState(0), active = as[0];
  var wrap = React.useRef(null), trig = React.useRef(null), menuId = useId() + "-menu", refs = React.useRef([]);
  var enabled = items.map(function (it, i) { return it.disabled ? -1 : i; }).filter(function (i) { return i >= 0; });
  var ps = React.useState(null), pos = ps[0];
  /* The menu is placed against the viewport, so a scrolling parent (a table) does not cut it off. */
  function place() {
    var el = trig.current; if (!el) return; var r = el.getBoundingClientRect(), rtl = getComputedStyle(el).direction === "rtl", end = p.align !== "start";
    var o = { position: "fixed", top: r.bottom + 4 };
    if (end !== rtl) { o.right = document.documentElement.clientWidth - r.right; o.left = "auto"; } else { o.left = r.left; o.right = "auto"; }
    ps[1](o);
  }
  function openAt(i) { place(); os[1](true); as[1](i); }
  function close(refocus) { os[1](false); if (refocus && trig.current) trig.current.focus(); }
  function move(d) { var k = enabled.indexOf(active); as[1](enabled[(k + d + enabled.length) % enabled.length]); }
  function choose(i) { var it = items[i]; if (!it || it.disabled) return; close(true); if (it.onSelect) it.onSelect(); }
  React.useEffect(function () { if (open && refs.current[active]) refs.current[active].focus({ preventScroll: true }); }, [open, active]);
  React.useEffect(function () {
    if (!open) return;
    function out(e) { if (wrap.current && !wrap.current.contains(e.target)) close(false); }
    function shut() { close(false); }
    document.addEventListener("mousedown", out); window.addEventListener("resize", shut); window.addEventListener("scroll", shut, true);
    return function () { document.removeEventListener("mousedown", out); window.removeEventListener("resize", shut); window.removeEventListener("scroll", shut, true); };
  }, [open]);
  function onTrigKey(e) { if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") { e.preventDefault(); openAt(enabled[0]); } else if (e.key === "ArrowUp") { e.preventDefault(); openAt(enabled[enabled.length - 1]); } }
  function onMenuKey(e) {
    var k = e.key;
    if (k === "ArrowDown") { e.preventDefault(); move(1); } else if (k === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (k === "Home") { e.preventDefault(); as[1](enabled[0]); } else if (k === "End") { e.preventDefault(); as[1](enabled[enabled.length - 1]); }
    else if (k === "Escape") { e.preventDefault(); close(true); } else if (k === "Tab") { close(false); }
    else if (k === "Enter" || k === " ") { e.preventDefault(); choose(active); }
    else if (k.length === 1) { var q = k.toLowerCase(), hit = enabled.filter(function (i) { return String(items[i].label).toLowerCase().indexOf(q) === 0; })[0]; if (hit !== undefined) as[1](hit); }
  }
  var trigProps = { ref: trig, "aria-haspopup": "menu", "aria-expanded": open ? "true" : "false", "aria-controls": open ? menuId : undefined,
    onClick: function () { open ? close(false) : openAt(enabled[0]); }, onKeyDown: onTrigKey };
  return h("div", { className: cx("ar-menu-wrap", p.className), ref: wrap },
    p.button ? p.button(trigProps) : h(IconButton, Object.assign({ icon: "more", label: p.label || ui().more }, trigProps)),
    open && h("ul", { className: cx("ar-menu", p.align === "start" && "ar-menu-start"), style: pos || undefined, role: "menu", id: menuId, "aria-label": p.label || ui().more, onKeyDown: onMenuKey },
      items.map(function (it, i) {
        return h("li", { key: i, role: "menuitem", tabIndex: -1, ref: function (el) { refs.current[i] = el; }, "aria-disabled": it.disabled ? "true" : undefined,
          className: cx("ar-menu-item", it.danger && "ar-menu-danger"), onClick: function () { choose(i); }, onMouseEnter: function () { if (!it.disabled) as[1](i); } },
          h("span", null, it.label), it.icon && renderIcon(it.icon, { className: "ar-menu-icon" }));
      })));
}

export { ActionMenu };
