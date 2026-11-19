import React from 'react';
import { ui } from '../../core/i18n.js';
import { renderIcon } from '../../core/icons.js';
import { cx } from '../../core/util.js';
const h = React.createElement;

/* A notification or money request. `actions` holds its buttons (Accept, Decline); `status` shows how it ended ({ tone, label }). */
function NotificationItem(p) {
  var tone = p.status && p.status.tone;
  return h("article", { className: cx("ar-notif", p.unread && "ar-notif-unread", p.className), "aria-label": p.unread ? ui().unread + ": " + p.title : undefined },
    h("div", { className: "ar-notif-row" },
      p.avatar || h("span", { className: "ar-notif-icon", "aria-hidden": "true" }, renderIcon(p.icon || "bell")),
      h("div", { className: "ar-notif-main" },
        h("h3", { className: "ar-notif-title" }, p.title),
        p.children && h("div", { className: "ar-notif-body" }, p.children)),
      h("div", { className: "ar-notif-meta" }, p.time && h("time", { className: "ar-notif-time", dateTime: p.dateTime }, p.time), p.unread && h("span", { className: "ar-notif-dot", "aria-hidden": "true" }))),
    p.actions && h("div", { className: "ar-notif-actions" }, p.actions),
    p.status && h("div", { className: cx("ar-notif-status", "ar-notif-status-" + (tone || "neutral")) }, renderIcon(tone === "success" ? "check" : tone === "danger" ? "alert" : "info", { className: "ar-notif-status-icon" }), p.status.label));
}

export { NotificationItem };
