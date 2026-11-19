import React from 'react';
import { renderIcon } from '../../core/icons.js';
import { cx, ltr } from '../../core/util.js';
const h = React.createElement;

/* Label/value rows for summaries and receipts. Item: { label, value, ltr } (ltr isolates amounts and card numbers). */
function DetailList(p) {
  return h("dl", { className: cx("ar-dl", p.className) }, (p.items || []).map(function (it, i) {
    return h("div", { key: i, className: cx("ar-dl-row", it.emphasis && "ar-dl-strong") }, h("dt", null, it.icon && renderIcon(it.icon, { className: "ar-dl-icon" }), it.label),
      h("dd", { dir: it.ltr ? "ltr" : undefined }, it.value));
  }));
}

export { DetailList };
