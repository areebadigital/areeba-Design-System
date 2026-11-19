import React from 'react';
import { IconButton } from '../IconButton/IconButton.js';
import { ui } from '../../core/i18n.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* The balance hero with a show/hide toggle. Hidden balances are masked on screen and for screen readers. */
function Balance(p) {
  var st = React.useState(!!p.defaultHidden), hidden = p.hidden !== undefined ? p.hidden : st[0], t = ui();
  function toggle() { st[1](!hidden); if (p.onToggle) p.onToggle(!hidden); }
  return h("div", { className: cx("ar-balance", p.className) },
    h("div", { className: "ar-balance-label" }, h("span", null, p.label || t.balance),
      h(IconButton, { icon: hidden ? "eyeOff" : "eye", label: hidden ? t.showBalance : t.hideBalance, "aria-pressed": hidden ? "false" : "true", variant: "plain", onClick: toggle, className: "ar-balance-toggle" })),
    hidden ? h("div", { className: "ar-balance-amount" }, h("span", { className: "ar-sr-only" }, t.balanceHidden), h("span", { "aria-hidden": "true" }, "••••••"))
      : h("div", { className: "ar-balance-amount", dir: "ltr" }, p.amount));
}

export { Balance };
