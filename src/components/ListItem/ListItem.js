import React from 'react';
import { cx } from '../../core/util.js';
const h = React.createElement;

function ListItem(p) {
  var amount = p.amount;
  var incoming = typeof amount === "string" && amount.charAt(0) === "+";
  return h("div", { className: cx("ar-item", p.className), role: "listitem" },
    p.leading !== undefined && h("div", { className: "ar-item-lead", "aria-hidden": "true" }, p.leading),
    h("div", { className: "ar-item-main" }, h("p", { className: "ar-item-title" }, p.title), p.subtitle && h("p", { className: "ar-item-sub" }, p.subtitle)),
    (amount || p.trailing) && h("div", { className: "ar-item-trail" },
      amount && h("span", { className: cx("ar-item-amount", incoming && "ar-item-amount-in"), dir: "ltr" }, amount),
      p.trailing));
}
function List(p) { return h("div", { className: cx("ar-list", p.className), role: "list" }, p.children); }

export { ListItem, List };
