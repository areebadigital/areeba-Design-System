import React from 'react';
import { Switch } from '../Switch/Switch.js';
import { icons, renderIcon } from '../../core/icons.js';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

/* A titled group of rows for settings and "More" menus. */
function SettingsList(p) {
  var id = useId();
  return h("section", { className: cx("ar-set", p.className), "aria-labelledby": p.title ? id : undefined },
    p.title && h("h2", { className: "ar-set-title", id: id }, p.title), h("div", { className: "ar-set-group", role: "list" }, p.children));
}
/* One settings row: a link (href), a button (onClick), a switch (toggle: { checked, defaultChecked, onChange }) or plain info.
   tone "danger" for Report stolen / Sign out. */
function SettingsRow(p) {
  var id = useId(), labelId = id + "-l", clickable = !!(p.href || p.onClick), tg = p.toggle;
  var body = [renderIcon(p.icon, { key: "i", className: "ar-set-icon" }),
    h("span", { key: "t", className: "ar-set-text" }, h("span", { id: labelId, className: "ar-set-label" }, p.label, p.badge && h("span", { className: "ar-set-badge" }, p.badge)),
      p.description && h("span", { className: "ar-set-desc" }, p.description)),
    p.value !== undefined && h("span", { key: "v", className: "ar-set-value", dir: "auto" }, p.value),
    tg && h(Switch, { key: "s", "aria-labelledby": labelId, checked: tg.checked, defaultChecked: tg.defaultChecked, onChange: tg.onChange, disabled: p.disabled }),
    clickable && h(icons.chevronRight, { key: "c", className: "ar-set-chev" })];
  var cls = cx("ar-set-row", p.tone === "danger" && "ar-set-danger", p.disabled && "ar-set-disabled");
  var inner = p.href ? h("a", { href: p.href, className: cls, onClick: p.onClick }, body)
    : p.onClick ? h("button", { type: "button", className: cls, onClick: p.onClick, disabled: p.disabled }, body)
    : h("div", { className: cls }, body);
  return h("div", { role: "listitem", className: "ar-set-item" }, inner);
}

export { SettingsList, SettingsRow };
