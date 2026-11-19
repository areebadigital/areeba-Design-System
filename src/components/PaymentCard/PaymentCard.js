import React from 'react';
import { ui } from '../../core/i18n.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

function PaymentCard(p) {
  return h("div", { className: cx("ar-pcard", "ar-pcard-" + (p.variant || "night"), p.fluid && "ar-pcard-fluid", p.className), dir: "ltr", role: "img", "aria-label": ui().card(p.network, p.last4, p.frozen) },
    h("div", { className: "ar-pcard-top" }, h("span", { className: "ar-pcard-logo" }, "areeba"), p.frozen && h("span", { className: "ar-pcard-frozen", dir: "auto" }, ui().frozen)),
    h("svg", { className: "ar-pcard-chip", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", "aria-hidden": "true" },
      h("path", { d: "M8 8a6 6 0 0 1 0 8" }), h("path", { d: "M12 5a10 10 0 0 1 0 14" }), h("path", { d: "M16 2a14 14 0 0 1 0 20" })),
    h("div", { className: "ar-pcard-num ar-num" }, "•••• •••• •••• " + p.last4),
    h("div", { className: "ar-pcard-bottom" }, h("span", null, p.holder), h("span", { className: "ar-pcard-meta" }, h("span", { className: "ar-num" }, p.expiry), " ", h("b", null, p.network))));
}

export { PaymentCard };
