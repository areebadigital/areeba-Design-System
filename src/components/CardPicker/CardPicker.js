import React from 'react';
import { useTrack } from '../../core/analytics.js';
import { MiniCard } from '../MiniCard/MiniCard.js';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

/* Choose one card: WAI-ARIA radio group with roving focus. Card: { value, last4, balance, variant, disabled, note }. */
function CardPicker(p) {
  var cards = p.cards || [], st = React.useState(p.defaultValue !== undefined ? p.defaultValue : null), val = p.value !== undefined ? p.value : st[0];
  var refs = React.useRef([]), id = useId();
  var focusIdx = Math.max(0, cards.findIndex(function (c) { return c.value === val && !c.disabled; }));
  if (val == null || cards[focusIdx] && cards[focusIdx].disabled) focusIdx = cards.findIndex(function (c) { return !c.disabled; });
  var track = useTrack("CardPicker", p);
  function choose(i) { var c = cards[i]; if (!c || c.disabled) return; if (c.value !== val) track("change", { position: i + 1 }); st[1](c.value); if (p.onChange) p.onChange(c.value, c); }
  function onKey(e, i) {
    var d = (e.key === "ArrowDown" || e.key === "ArrowRight") ? 1 : (e.key === "ArrowUp" || e.key === "ArrowLeft") ? -1 : 0;
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); choose(i); return; }
    if (!d) return; e.preventDefault();
    for (var k = 1; k <= cards.length; k++) { var j = (i + d * k + cards.length * k) % cards.length; if (!cards[j].disabled) { choose(j); if (refs.current[j]) refs.current[j].focus(); return; } }
  }
  return h("div", { className: cx("ar-cardpick", p.className) },
    p.label && h("div", { className: "ar-cardpick-label", id: id }, p.label),
    h("div", { role: "radiogroup", "aria-labelledby": p.label ? id : undefined, className: "ar-cardpick-list" }, cards.map(function (c, i) {
      var on = c.value === val;
      return h("div", { key: c.value, ref: function (el) { refs.current[i] = el; }, role: "radio", "aria-checked": on ? "true" : "false", "aria-disabled": c.disabled ? "true" : undefined,
        tabIndex: i === focusIdx ? 0 : -1, className: cx("ar-cardpick-opt", on && "ar-cardpick-on"), onClick: function () { choose(i); }, onKeyDown: function (e) { onKey(e, i); } },
        h(MiniCard, { variant: c.variant }), h("span", { className: "ar-cardpick-num", dir: "ltr" }, "•••• " + c.last4),
        c.balance && h("span", { className: "ar-cardpick-bal", dir: "ltr" }, c.balance), c.note && h("span", { className: "ar-badge" }, c.note),
        h("span", { className: "ar-cardpick-dot", "aria-hidden": "true" }));
    })),
    p.name && h("input", { type: "hidden", name: p.name, value: val == null ? "" : val }));
}

export { CardPicker };
