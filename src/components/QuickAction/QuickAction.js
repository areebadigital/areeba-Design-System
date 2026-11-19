import React from 'react';
import { useTrack, pressed, analyticsAttrs } from '../../core/analytics.js';
import { renderIcon } from '../../core/icons.js';
import { cx, rest } from '../../core/util.js';
const h = React.createElement;

/* A labelled round action under the balance: Top up, Send, More. */
var QuickAction = React.forwardRef(function QuickAction(p, ref) {
  var track = useTrack("QuickAction", p);
  return h("button", Object.assign({}, rest(p, ["icon", "label", "className"]), analyticsAttrs("QuickAction", p), { ref: ref, onClick: pressed(track, p.onClick), type: "button", className: cx("ar-qa", p.className) }),
    h("span", { className: "ar-qa-circle", "aria-hidden": "true" }, renderIcon(p.icon)), h("span", { className: "ar-qa-label" }, p.label));
});
function QuickActions(p) { return h("div", { className: cx("ar-qas", p.className), role: "group", "aria-label": p.label }, p.children); }

export { QuickAction, QuickActions };
