/* @ds-bundle: {"format":4,"namespace":"Areeba","components":[{"name":"Button"},{"name":"TextField"},{"name":"Switch"},{"name":"Badge"},{"name":"Alert"},{"name":"Tabs"},{"name":"ListItem"},{"name":"TabBar"},{"name":"Sidebar"},{"name":"DataTable"},{"name":"Dialog"},{"name":"Toast"},{"name":"PaymentCard"},{"name":"EmptyState"},{"name":"Checkbox"},{"name":"Select"},{"name":"DatePicker"},{"name":"LineChart"},{"name":"BarChart"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function rest(p, keys) { var o = {}; for (var k in p) if (keys.indexOf(k) < 0) o[k] = p[k]; return o; }
  var uid = 0; function useId(given) { var r = React.useRef(given || "ar-" + (++uid)); return r.current; }

  function Icon(path) {
    return function (props) {
      return h("svg", Object.assign({ viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, props), path.map(function (d, i) { return h("path", { key: i, d: d }); }));
    };
  }
  var icons = {
    home: Icon(["M3 10.5 12 3l9 7.5", "M5 9.5V20h5v-6h4v6h5V9.5"]),
    card: Icon(["M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z", "M3 10h18", "M7 15h3"]),
    send: Icon(["M12 19V5", "M6 11l6-6 6 6"]),
    chart: Icon(["M4 20V10", "M10 20V4", "M16 20v-7", "M22 20H2"]),
    user: Icon(["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M4 21a8 8 0 0 1 16 0"]),
    list: Icon(["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"]),
    store: Icon(["M4 9l1.5-5h13L20 9", "M4 9v11h16V9", "M4 9h16", "M10 20v-6h4v6"]),
    settings: Icon(["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"]),
    info: Icon(["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 11v5", "M12 8h.01"]),
    check: Icon(["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M8 12l3 3 5-6"]),
    alert: Icon(["M12 3 2 20h20z", "M12 10v4", "M12 17h.01"])
  };

  /* Built-in words, in the page's language (<html lang>). Every one can be overridden by a prop. */
  var UI_TEXT = {
    en: { nav: "Main", empty: "No results", select: "Select", frozen: "Frozen", card: function (n, l4, fz) { return (n || "Card") + " ending " + l4 + (fz ? ", frozen" : ""); },
      prev: "Previous month", next: "Next month", pick: "Select date" },
    ar: { nav: "التنقل الرئيسي", empty: "لا توجد نتائج", select: "اختر", frozen: "مجمّدة", card: function (n, l4, fz) { return "بطاقة " + (n || "") + " تنتهي بـ " + l4 + (fz ? "، مجمّدة" : ""); },
      prev: "الشهر السابق", next: "الشهر التالي", pick: "اختر تاريخًا" },
  };
  function ui(lang) { var l = String(lang || (typeof document !== "undefined" && document.documentElement.lang) || "en").slice(0, 2).toLowerCase(); return UI_TEXT[l] || UI_TEXT.en; }

  function Button(p) {
    var variant = p.variant || "primary", size = p.size || "md";
    return h("button", Object.assign({ type: "button" }, rest(p, ["variant", "size", "block", "className", "children"]), {
      className: cx("ar-btn", "ar-btn-" + variant, size !== "md" && "ar-btn-" + size, p.block && "ar-btn-block", p.className)
    }), p.children);
  }

  function TextField(p) {
    var id = useId(p.id), hintId = id + "-hint";
    return h("div", { className: cx("ar-field", p.error && "ar-field-invalid", p.className) },
      p.label && h("label", { className: "ar-field-label", htmlFor: id }, p.label),
      h("div", { className: "ar-field-box" },
        p.prefix && h("span", { className: "ar-field-prefix" }, p.prefix),
        h("input", Object.assign({}, rest(p, ["label", "hint", "error", "prefix", "className", "id"]), {
          id: id, "aria-invalid": p.error ? "true" : undefined, "aria-describedby": (p.error || p.hint) ? hintId : undefined
        }))),
      (p.error || p.hint) && h("span", { className: "ar-field-hint", id: hintId }, p.error || p.hint));
  }

  /* Shared on/off state for Checkbox and Switch: controlled (`checked`) or uncontrolled (`defaultChecked`). */
  function useToggle(p) {
    var st = React.useState(!!p.defaultChecked), on = p.checked !== undefined ? !!p.checked : st[0];
    function toggle() { if (p.disabled) return; var next = p.indeterminate ? true : !on; st[1](next); if (p.onChange) p.onChange(next); }
    return [on, toggle];
  }
  var TOGGLE_KEYS = ["label", "hint", "className", "id", "checked", "defaultChecked", "onChange", "indeterminate", "name", "value", "required", "disabled"];
  function formValue(p, on) { return p.name && on ? h("input", { type: "hidden", name: p.name, value: p.value !== undefined ? p.value : "on" }) : null; }

  function Switch(p) {
    /* No native input: a button with role="switch" (WAI-ARIA switch pattern). Space and Enter toggle. */
    var id = useId(p.id), labelId = id + "-label", t = useToggle(p), on = t[0];
    return h(React.Fragment, null,
      h("button", Object.assign({}, rest(p, TOGGLE_KEYS), { type: "button", role: "switch", id: id, className: cx("ar-switch", p.className),
        "aria-checked": on ? "true" : "false", "aria-labelledby": p.label ? labelId : undefined, disabled: p.disabled, onClick: t[1] }),
        h("span", { className: "ar-switch-track", "aria-hidden": "true" }),
        p.label && h("span", { id: labelId, className: "ar-switch-label" }, p.label)),
      formValue(p, on));
  }

  function Badge(p) {
    var tone = p.tone || "neutral";
    return h("span", { className: cx("ar-badge", tone !== "neutral" && "ar-badge-" + tone, p.className) },
      p.dot && h("span", { className: "ar-badge-dot", "aria-hidden": "true" }), p.children);
  }

  function Alert(p) {
    var tone = p.tone || "info";
    var I = tone === "success" ? icons.check : (tone === "info" ? icons.info : icons.alert);
    return h("div", { role: tone === "danger" ? "alert" : "status", className: cx("ar-alert", "ar-alert-" + tone, p.className) },
      h(I, { className: "ar-alert-icon" }),
      h("div", null, p.title && h("p", { className: "ar-alert-title" }, p.title), h("p", { className: "ar-alert-body" }, p.children)));
  }

  function Tabs(p) {
    var items = p.items || [];
    var st = React.useState(p.defaultValue || (items[0] && items[0].value)), cur = p.value !== undefined ? p.value : st[0];
    return h("div", { role: "tablist", "aria-label": p.label, className: cx("ar-tabs", p.className) }, items.map(function (it) {
      return h("button", { key: it.value, role: "tab", type: "button", className: "ar-tab", "aria-selected": cur === it.value ? "true" : "false",
        onClick: function () { st[1](it.value); p.onChange && p.onChange(it.value); } }, it.label);
    }));
  }

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

  function TabBar(p) {
    var items = p.items || [];
    return h("nav", { className: cx("ar-tabbar", p.className), "aria-label": p.label || ui().nav }, items.map(function (it) {
      var I = icons[it.icon] || icons.home;
      return h("button", { key: it.value, type: "button", className: "ar-tabbar-item", "aria-current": p.value === it.value ? "page" : undefined,
        onClick: function () { p.onChange && p.onChange(it.value); } }, h(I, null), it.label);
    }));
  }

  function Sidebar(p) {
    var items = p.items || [];
    return h("aside", { className: cx("ar-sidebar", p.className) },
      h("div", { className: "ar-sidebar-brand" }, p.brand || "areeba"),
      h("nav", { "aria-label": p.label || ui().nav }, items.map(function (it) {
        var I = icons[it.icon] || icons.home;
        return h("a", { key: it.value, href: it.href || "#", className: "ar-sidebar-item", "aria-current": p.value === it.value ? "page" : undefined,
          onClick: function (e) { if (p.onChange) { e.preventDefault(); p.onChange(it.value); } } }, h(I, null), h("span", null, it.label),
          it.count !== undefined && h("span", { className: "ar-sidebar-count", dir: "ltr" }, it.count));
      })),
      p.footer && h("div", { className: "ar-sidebar-footer" }, p.footer));
  }

  function DataTable(p) {
    var cols = p.columns || [], rows = p.rows || [];
    return h("div", { className: cx("ar-table-wrap", p.className) },
      h("table", { className: "ar-table" },
        p.caption && h("caption", null, p.caption),
        h("thead", null, h("tr", null, cols.map(function (c) { return h("th", { key: c.key, scope: "col", className: c.align === "right" ? "ar-right" : undefined }, c.label); }))),
        h("tbody", null, rows.length ? rows.map(function (r, i) {
          return h("tr", { key: r.id || i }, cols.map(function (c) {
            var v = c.render ? c.render(r) : r[c.key];
            return h("td", { key: c.key, className: cx(c.align === "right" && "ar-right", c.numeric && "ar-num", c.mono && "ar-mono") }, c.numeric || c.mono ? h("span", { dir: "ltr" }, v) : v);
          }));
        }) : h("tr", null, h("td", { colSpan: cols.length, className: "ar-table-empty" }, p.empty || ui().empty)))));
  }

  function Dialog(p) {
    var titleId = useId(), descId = titleId + "-d";
    React.useEffect(function () {
      if (!p.open) return;
      function onKey(e) { if (e.key === "Escape" && p.onClose) p.onClose(); }
      document.addEventListener("keydown", onKey); return function () { document.removeEventListener("keydown", onKey); };
    }, [p.open]);
    if (!p.open) return null;
    return h("div", { className: "ar-dialog-backdrop", onClick: function (e) { if (e.target === e.currentTarget && p.onClose) p.onClose(); } },
      h("div", { role: p.tone === "danger" ? "alertdialog" : "dialog", "aria-modal": "true", "aria-labelledby": titleId, "aria-describedby": descId, className: cx("ar-dialog", p.sheet && "ar-dialog-sheet", p.className) },
        h("h2", { id: titleId, className: "ar-dialog-title" }, p.title),
        h("div", { id: descId, className: "ar-dialog-body" }, p.children),
        p.actions && h("div", { className: "ar-dialog-actions" }, p.actions)));
  }

  function Toast(p) {
    var tone = p.tone || "neutral";
    var I = tone === "success" ? icons.check : (tone === "danger" ? icons.alert : icons.info);
    return h("div", { role: "status", "aria-live": "polite", className: cx("ar-toast", "ar-toast-" + tone, p.className) },
      h(I, { className: "ar-toast-icon" }), h("span", { className: "ar-toast-msg" }, p.children),
      p.action && h("button", { type: "button", className: "ar-toast-action", onClick: p.onAction }, p.action));
  }

  function PaymentCard(p) {
    return h("div", { className: cx("ar-pcard", "ar-pcard-" + (p.variant || "night"), p.className), dir: "ltr", role: "img", "aria-label": ui().card(p.network, p.last4, p.frozen) },
      h("div", { className: "ar-pcard-top" }, h("span", { className: "ar-pcard-logo" }, "areeba"), p.frozen && h("span", { className: "ar-pcard-frozen", dir: "auto" }, ui().frozen)),
      h("svg", { className: "ar-pcard-chip", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", "aria-hidden": "true" },
        h("path", { d: "M8 8a6 6 0 0 1 0 8" }), h("path", { d: "M12 5a10 10 0 0 1 0 14" }), h("path", { d: "M16 2a14 14 0 0 1 0 20" })),
      h("div", { className: "ar-pcard-num ar-num" }, "•••• •••• •••• " + p.last4),
      h("div", { className: "ar-pcard-bottom" }, h("span", null, p.holder), h("span", { className: "ar-pcard-meta" }, h("span", { className: "ar-num" }, p.expiry), " ", h("b", null, p.network))));
  }

  function EmptyState(p) {
    return h("div", { className: cx("ar-empty", p.className) },
      h("svg", { className: "ar-empty-art", viewBox: "0 0 96 64", "aria-hidden": "true" },
        h("rect", { x: 4, y: 8, width: 64, height: 40, rx: 8, className: "ar-empty-a" }),
        h("rect", { x: 28, y: 18, width: 64, height: 40, rx: 8, className: "ar-empty-b" }),
        h("rect", { x: 38, y: 44, width: 16, height: 4, rx: 2, className: "ar-empty-c" }),
        h("rect", { x: 58, y: 44, width: 16, height: 4, rx: 2, className: "ar-empty-c" })),
      h("h3", { className: "ar-empty-title" }, p.title),
      p.children && h("p", { className: "ar-empty-body" }, p.children),
      p.action && h("div", { className: "ar-empty-action" }, p.action));
  }

  function Checkbox(p) {
    /* No native input: a button with role="checkbox" (WAI-ARIA checkbox pattern). Space toggles; indeterminate is aria-checked="mixed". */
    var id = useId(p.id), labelId = id + "-label", hintId = id + "-hint", t = useToggle(p), on = t[0];
    return h(React.Fragment, null,
      h("button", Object.assign({}, rest(p, TOGGLE_KEYS), { type: "button", role: "checkbox", id: id, className: cx("ar-check", p.className),
        "aria-checked": p.indeterminate ? "mixed" : (on ? "true" : "false"), "aria-labelledby": labelId, "aria-describedby": p.hint ? hintId : undefined,
        "aria-required": p.required ? "true" : undefined, disabled: p.disabled, onClick: t[1],
        onKeyDown: function (e) { if (e.key === "Enter") e.preventDefault(); if (p.onKeyDown) p.onKeyDown(e); } }),
        h("span", { className: "ar-check-box", "aria-hidden": "true" },
          h("svg", { viewBox: "0 0 16 16", className: "ar-check-tick" }, h("path", { d: "M3.5 8.5l3 3 6-7" })),
          h("svg", { viewBox: "0 0 16 16", className: "ar-check-dash" }, h("path", { d: "M4 8h8" }))),
        h("span", { className: "ar-check-text" }, h("span", { id: labelId }, p.label), p.hint && h("span", { className: "ar-check-hint", id: hintId }, p.hint))),
      formValue(p, on));
  }

  function Select(p) {
    /* Custom listbox: the select-only combobox pattern (WAI-ARIA APG). No native <select>. */
    var id = useId(p.id), labelId = id + "-label", listId = id + "-list", hintId = id + "-hint";
    var opts = p.options || [];
    var vs = React.useState(p.defaultValue !== undefined ? p.defaultValue : null), val = p.value !== undefined ? p.value : vs[0];
    var os = React.useState(!!p.defaultOpen), open = os[0];
    var as = React.useState(-1), active = as[0];
    var wrap = React.useRef(null), list = React.useRef(null), typed = React.useRef({ s: "", t: 0 });
    var selIdx = -1; for (var i = 0; i < opts.length; i++) if (opts[i].value === val) selIdx = i;
    var selected = selIdx >= 0 ? opts[selIdx] : null;
    function enabled(i) { return opts[i] && !opts[i].disabled; }
    function step(from, dir) { for (var i = from + dir; i >= 0 && i < opts.length; i += dir) if (enabled(i)) return i; return from; }
    function first() { return step(-1, 1); } function last() { return step(opts.length, -1); }
    function openAt(i) { if (p.disabled) return; os[1](true); as[1](i >= 0 ? i : (selIdx >= 0 ? selIdx : first())); }
    function close() { os[1](false); }
    function choose(i) { if (!enabled(i)) return; var o = opts[i]; vs[1](o.value); close(); if (p.onChange) p.onChange(o.value, o); }
    function match(ch) {
      var now = Date.now(), t = typed.current; t.s = (now - t.t > 600 ? "" : t.s) + ch.toLowerCase(); t.t = now;
      var start = open ? active : selIdx;
      for (var k = 1; k <= opts.length; k++) { var i = (start + k + opts.length) % opts.length; if (enabled(i) && String(opts[i].label).toLowerCase().indexOf(t.s) === 0) return i; }
      return -1;
    }
    function onKey(e) {
      var k = e.key;
      if (!open) {
        if (k === "ArrowDown" || k === "ArrowUp" || k === "Enter" || k === " ") { e.preventDefault(); openAt(selIdx >= 0 ? selIdx : (k === "ArrowUp" ? last() : first())); }
        else if (k === "Home") { e.preventDefault(); openAt(first()); }
        else if (k === "End") { e.preventDefault(); openAt(last()); }
        else if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { var m = match(k); if (m >= 0) openAt(m); }
        return;
      }
      if (k === "ArrowDown") { e.preventDefault(); if (e.altKey) return; as[1](step(active, 1)); }
      else if (k === "ArrowUp") { e.preventDefault(); if (e.altKey) { choose(active); return; } as[1](step(active, -1)); }
      else if (k === "Home") { e.preventDefault(); as[1](first()); }
      else if (k === "End") { e.preventDefault(); as[1](last()); }
      else if (k === "PageDown") { e.preventDefault(); var d = active; for (var n = 0; n < 10; n++) d = step(d, 1); as[1](d); }
      else if (k === "PageUp") { e.preventDefault(); var u = active; for (var q = 0; q < 10; q++) u = step(u, -1); as[1](u); }
      else if (k === "Enter" || k === " ") { e.preventDefault(); choose(active); }
      else if (k === "Escape") { e.preventDefault(); close(); }
      else if (k === "Tab") { if (active >= 0 && active !== selIdx) choose(active); else close(); }
      else if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { var mm = match(k); if (mm >= 0) as[1](mm); }
    }
    React.useEffect(function () {
      if (!open) return;
      function out(e) { if (wrap.current && !wrap.current.contains(e.target)) close(); }
      document.addEventListener("mousedown", out); return function () { document.removeEventListener("mousedown", out); };
    }, [open]);
    React.useEffect(function () {
      if (!open || active < 0 || !list.current) return;
      var el = list.current.children[active]; if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
    }, [open, active]);
    var Tick = h("svg", { className: "ar-option-tick", viewBox: "0 0 16 16", "aria-hidden": "true" }, h("path", { d: "M3.5 8.5l3 3 6-7" }));
    return h("div", { className: cx("ar-field ar-select", p.error && "ar-field-invalid", p.className), ref: wrap },
      p.label && h("label", { className: "ar-field-label", id: labelId, htmlFor: id }, p.label),
      h("button", { type: "button", id: id, role: "combobox", className: "ar-field-box ar-select-trigger", disabled: p.disabled,
        "aria-haspopup": "listbox", "aria-expanded": open ? "true" : "false", "aria-controls": listId,
        "aria-labelledby": p.label ? labelId + " " + id : undefined, "aria-label": p.label ? undefined : p["aria-label"],
        "aria-activedescendant": open && active >= 0 ? id + "-o" + active : undefined,
        "aria-invalid": p.error ? "true" : undefined, "aria-required": p.required ? "true" : undefined,
        "aria-describedby": (p.error || p.hint) ? hintId : undefined,
        onClick: function () { open ? close() : openAt(-1); }, onKeyDown: onKey, onBlur: function (e) { if (wrap.current && !wrap.current.contains(e.relatedTarget)) close(); } },
        h("span", { className: cx("ar-select-value", !selected && "ar-select-ph") }, selected ? selected.label : (p.placeholder || ui().select)),
        h("svg", { className: "ar-select-chev", viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M6 9l6 6 6-6" }))),
      p.name && h("input", { type: "hidden", name: p.name, value: val == null ? "" : val }),
      h("div", { className: "ar-pop", hidden: !open },
        h("ul", { className: "ar-listbox", role: "listbox", id: listId, ref: list, tabIndex: -1, "aria-labelledby": p.label ? labelId : undefined },
          opts.map(function (o, i) {
            return h("li", { key: o.value, id: id + "-o" + i, role: "option", className: "ar-option", "aria-selected": i === selIdx ? "true" : "false",
              "aria-disabled": o.disabled ? "true" : undefined, "data-active": i === active ? "true" : undefined,
              onMouseDown: function (e) { e.preventDefault(); }, onMouseEnter: function () { if (!o.disabled) as[1](i); }, onClick: function () { choose(i); } },
              h("span", { className: "ar-option-label" }, o.label), i === selIdx && Tick);
          }))),
      (p.error || p.hint) && h("span", { className: "ar-field-hint", id: hintId }, p.error || p.hint));
  }

  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var DOW = ["Mo","Tu","We","Th","Fr","Sa","Su"], DOW_LONG = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  function sameDay(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
  /* Locale for dates: the `locale` prop, else the page's <html lang>. English keeps the house format
     ("20 Nov 2026", "Mo Tu …"); other languages use Intl with Latin digits, matching how amounts are written. */
  function dateLocale(p) { return p.locale || (typeof document !== "undefined" && document.documentElement.lang) || "en"; }
  function isEn(loc) { return /^en\b/i.test(loc); }
  function latn(loc) { return /-u-.*nu-/.test(loc) ? loc : loc + (loc.indexOf("-u-") > 0 ? "-nu-latn" : "-u-nu-latn"); }
  function intl(loc, o) { try { return new Intl.DateTimeFormat(latn(loc), o); } catch (e) { return new Intl.DateTimeFormat("en-GB", o); } }
  function fmtDate(d, loc) { if (!d) return ""; if (!loc || isEn(loc)) return d.getDate() + " " + MONTHS[d.getMonth()].slice(0, 3) + " " + d.getFullYear(); return intl(loc, { day: "numeric", month: "short", year: "numeric" }).format(d); }
  function fmtMonth(d, loc) { return isEn(loc) ? MONTHS[d.getMonth()] + " " + d.getFullYear() : intl(loc, { month: "long", year: "numeric" }).format(d); }
  function weekdays(loc) {
    if (isEn(loc)) return DOW.map(function (s, i) { return [s, DOW_LONG[i]]; });
    var n = intl(loc, { weekday: "narrow" }), l = intl(loc, { weekday: "long" }); /* 1 Jan 2024 is a Monday */
    return DOW.map(function (_, i) { var d = new Date(2024, 0, 1 + i); return [n.format(d), l.format(d)]; });
  }
  function dateText(loc) { return ui(loc); }
  function isRtl(el) { return !!el && typeof getComputedStyle === "function" && getComputedStyle(el).direction === "rtl"; }

  function Calendar(p) {
    /* WAI-ARIA date grid: rows of gridcells, one roving tab stop. Arrows move by day/week,
       Home/End to the week's edges, PageUp/PageDown by month, Enter/Space chooses. */
    var sel = p.value, today = p.today || new Date(), loc = dateLocale(p), txt = dateText(loc);
    var fs = React.useState(function () { return sel || today; }), focus = fs[0];
    var view = new Date(focus.getFullYear(), focus.getMonth(), 1);
    var grid = React.useRef(null), moved = React.useRef(false);
    var first = (view.getDay() + 6) % 7, days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    var cells = []; for (var i = 0; i < first; i++) cells.push(null); for (var d = 1; d <= days; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    while (cells.length % 7) cells.push(null);
    var weeks = []; for (var w = 0; w < cells.length; w += 7) weeks.push(cells.slice(w, w + 7));
    function off(c) { return (p.min && c < p.min) || (p.max && c > p.max); }
    function go(dt) { moved.current = true; fs[1](dt); }
    function shift(n) { var t = new Date(focus.getFullYear(), focus.getMonth() + n, 1); var last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate(); go(new Date(t.getFullYear(), t.getMonth(), Math.min(focus.getDate(), last))); }
    function onKey(e) {
      var k = e.key, y = focus.getFullYear(), m = focus.getMonth(), dd = focus.getDate(), dow = (focus.getDay() + 6) % 7, t = null;
      if (isRtl(grid.current)) { if (k === "ArrowLeft") k = "ArrowRight"; else if (k === "ArrowRight") k = "ArrowLeft"; } /* arrows follow the mirrored grid */
      if (k === "ArrowLeft") t = new Date(y, m, dd - 1); else if (k === "ArrowRight") t = new Date(y, m, dd + 1);
      else if (k === "ArrowUp") t = new Date(y, m, dd - 7); else if (k === "ArrowDown") t = new Date(y, m, dd + 7);
      else if (k === "Home") t = new Date(y, m, dd - dow); else if (k === "End") t = new Date(y, m, dd + 6 - dow);
      else if (k === "PageUp") { e.preventDefault(); shift(-1); return; } else if (k === "PageDown") { e.preventDefault(); shift(1); return; }
      if (t) { e.preventDefault(); go(t); }
    }
    React.useEffect(function () {
      if (!moved.current || !grid.current) return; moved.current = false;
      var el = grid.current.querySelector('[data-focus="true"]'); if (el) el.focus();
    });
    var Chev = function (dir) { return h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: dir < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6" })); };
    var title = fmtMonth(view, loc), titleId = useId() + "-t";
    return h("div", { className: "ar-cal", role: "group", "aria-labelledby": titleId },
      h("div", { className: "ar-cal-head" },
        h("button", { type: "button", className: "ar-cal-nav", "aria-label": txt.prev, onClick: function () { fs[1](new Date(view.getFullYear(), view.getMonth() - 1, 1)); } }, Chev(-1)),
        h("span", { className: "ar-cal-title", id: titleId, "aria-live": "polite" }, title),
        h("button", { type: "button", className: "ar-cal-nav", "aria-label": txt.next, onClick: function () { fs[1](new Date(view.getFullYear(), view.getMonth() + 1, 1)); } }, Chev(1))),
      h("div", { className: "ar-cal-grid", role: "grid", "aria-labelledby": titleId, ref: grid, onKeyDown: onKey },
        h("div", { className: "ar-cal-row", role: "row" }, weekdays(loc).map(function (wd, i) { return h("span", { key: i, className: "ar-cal-dow", role: "columnheader", "aria-label": wd[1] }, wd[0]); })),
        weeks.map(function (wk, wi) {
          return h("div", { key: wi, className: "ar-cal-row", role: "row" }, wk.map(function (c, ci) {
            if (!c) return h("span", { key: ci, role: "gridcell", className: "ar-cal-cell" });
            var isSel = sameDay(c, sel), isFocus = sameDay(c, focus);
            return h("span", { key: ci, role: "gridcell", className: "ar-cal-cell", "aria-selected": isSel ? "true" : "false" },
              h("button", { type: "button", disabled: off(c), tabIndex: isFocus ? 0 : -1, "data-focus": isFocus ? "true" : undefined, "aria-label": fmtDate(c, loc),
                "aria-current": sameDay(c, today) ? "date" : undefined, "aria-pressed": isSel ? "true" : "false",
                className: cx("ar-cal-day", sameDay(c, today) && "ar-cal-today"), onFocus: function () { if (!isFocus) fs[1](c); },
                onClick: function () { if (!off(c) && p.onChange) p.onChange(c); } }, c.getDate()));
          }));
        })));
  }

  function DatePicker(p) {
    var id = useId(p.id), loc = dateLocale(p);
    var vs = React.useState(p.defaultValue || null), val = p.value !== undefined ? p.value : vs[0];
    var os = React.useState(!!p.defaultOpen), open = os[0];
    var wrap = React.useRef(null), touched = React.useRef(false), trig = React.useRef(null);
    function close(refocus) { os[1](false); if (refocus && trig.current) trig.current.focus(); }
    React.useEffect(function () {
      if (!open) return;
      if (!p.defaultOpen || touched.current) { var f = wrap.current && (wrap.current.querySelector('.ar-cal-day[aria-pressed="true"]') || wrap.current.querySelector(".ar-cal-today") || wrap.current.querySelector(".ar-cal-day:not(:disabled)")); if (f) f.focus(); }
      function out(e) { if (wrap.current && !wrap.current.contains(e.target)) os[1](false); }
      function key(e) { if (e.key === "Escape") close(true); }
      document.addEventListener("mousedown", out); document.addEventListener("keydown", key);
      return function () { document.removeEventListener("mousedown", out); document.removeEventListener("keydown", key); };
    }, [open]);
    return h("div", { className: cx("ar-field ar-date", p.error && "ar-field-invalid", p.className), ref: wrap },
      p.label && h("label", { className: "ar-field-label", htmlFor: id }, p.label),
      h("button", { type: "button", id: id, ref: trig, className: "ar-field-box ar-date-trigger", "aria-haspopup": "dialog", "aria-expanded": open ? "true" : "false", onClick: function () { touched.current = true; os[1](!open); } },
        h("span", { className: val ? "" : "ar-date-ph", dir: "auto" }, val ? fmtDate(val, loc) : (p.placeholder || dateText(loc).pick)),
        h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" }), h("path", { d: "M4 10h16M8 3v4M16 3v4" }))),
      (p.error || p.hint) && h("span", { className: "ar-field-hint" }, p.error || p.hint),
      open && h("div", { className: "ar-date-pop" }, h(Calendar, { value: val, today: p.today, min: p.min, max: p.max, locale: p.locale, onChange: function (d) { vs[1](d); p.onChange && p.onChange(d); close(true); } })));
  }

  /* ---- charts ---- */
  /* Width of the chart's container, and whether it sits in right-to-left text (charts mirror in RTL:
     y-axis on the right, categories and time running right to left, as Arabic reads). */
  function useWidth(initial) {
    var ref = React.useRef(null), ws = React.useState(initial), ds = React.useState(false);
    React.useEffect(function () {
      if (!ref.current || !window.ResizeObserver) return;
      var ro = new ResizeObserver(function (en) { ws[1](Math.max(240, Math.round(en[0].contentRect.width))); });
      ro.observe(ref.current); return function () { ro.disconnect(); };
    }, []);
    React.useEffect(function () { var r = isRtl(ref.current); if (r !== ds[0]) ds[1](r); });
    return [ref, ws[0], ds[0]];
  }
  /* Mirroring helpers: X flips an x position, XR flips a box that starts at x0 and is w wide, A swaps text anchors. */
  function mirror(rtl, W) {
    return { X: function (v) { return rtl ? W - v : v; }, XR: function (x0, w) { return rtl ? W - x0 - w : x0; },
      A: function (a) { return !rtl ? a : a === "start" ? "end" : a === "end" ? "start" : a; } };
  }
  function niceMax(v) { if (v <= 0) return 1; var e = Math.pow(10, Math.floor(Math.log10(v))), f = v / e; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * e; }
  function compact(n) { var a = Math.abs(n); return a >= 1e6 ? (n / 1e6).toFixed(a % 1e6 ? 1 : 0) + "M" : a >= 1e3 ? (n / 1e3).toFixed(a % 1e3 ? 1 : 0) + "k" : String(n); }
  function Legend(series) {
    if (series.length < 2) return null;
    return h("div", { className: "ar-chart-legend" }, series.map(function (s, i) {
      return h("span", { key: s.key, className: "ar-chart-key" }, h("i", { style: { background: "var(--chart-" + (i + 1) + ")" } }), s.label);
    }));
  }
  function Tip(x, y, w, title, rows, fmt, rtl) {
    /* Opens on the reading side of the point (right in LTR, left in RTL) and flips when it would overflow. */
    var left = rtl ? (x - 192 >= 0 ? x - 192 : Math.min(x + 12, w - 180)) : (x + 12 + 180 > w ? Math.max(0, x - 192) : x + 12);
    return h("div", { className: "ar-chart-tip", style: { left: left + "px", top: Math.max(0, y) + "px" } },
      h("div", { className: "ar-chart-tip-title" }, title),
      rows.map(function (r) { return h("div", { key: r.key, className: "ar-chart-tip-row" }, h("i", { style: { background: r.color } }), h("span", null, r.label), h("b", { className: "ar-num", dir: "ltr" }, fmt(r.value))); }));
  }

  function LineChart(p) {
    var data = p.data || [], series = (p.series || []).slice(0, 4), fmt = p.format || compact, H = p.height || 240;
    var r = useWidth(p.width || 640), ref = r[0], W = r[1], rtl = r[2], M = mirror(rtl, W);
    var hs = React.useState(null), hov = hs[0];
    var m = { t: 12, r: series.length > 1 ? 72 : 16, b: 28, l: 48 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
    var max = niceMax(Math.max.apply(null, data.reduce(function (a, d) { return a.concat(series.map(function (s) { return d[s.key] || 0; })); }, [0])));
    var x = function (i) { return m.l + (data.length < 2 ? iw / 2 : i * iw / (data.length - 1)); }, y = function (v) { return m.t + ih - v / max * ih; };
    var ticks = [0, .25, .5, .75, 1].map(function (f) { return f * max; });
    var every = Math.ceil(data.length / Math.max(1, Math.floor(iw / 64)));
    function move(e) { var bx = e.currentTarget.getBoundingClientRect(), px = e.clientX - bx.left; if (rtl) px = W - px; var i = Math.round((px - m.l) / iw * (data.length - 1)); hs[1](Math.max(0, Math.min(data.length - 1, i))); }
    return h("figure", { className: cx("ar-chart", p.className), ref: ref },
      p.title && h("figcaption", { className: "ar-chart-title" }, p.title),
      Legend(series),
      h("div", { className: "ar-chart-plot" },
        h("svg", { width: W, height: H, role: "img", "aria-label": p.ariaLabel || p.title, style: { direction: "ltr" }, onMouseMove: move, onMouseLeave: function () { hs[1](null); } },
          ticks.map(function (t, i) { return h("g", { key: i }, h("line", { className: i ? "ar-chart-grid" : "ar-chart-base", x1: M.X(m.l), x2: M.X(W - m.r), y1: y(t), y2: y(t) }), h("text", { className: "ar-chart-axis", x: M.X(m.l - 8), y: y(t) + 4, textAnchor: M.A("end") }, fmt(t))); }),
          data.map(function (d, i) { return i % every ? null : h("text", { key: i, className: "ar-chart-axis", x: M.X(x(i)), y: H - 8, textAnchor: "middle" }, d.label); }),
          hov !== null && h("line", { className: "ar-chart-cross", x1: M.X(x(hov)), x2: M.X(x(hov)), y1: m.t, y2: m.t + ih }),
          series.map(function (s, si) {
            var pts = data.map(function (d, i) { return M.X(x(i)) + "," + y(d[s.key] || 0); }).join(" "), last = data[data.length - 1];
            return h("g", { key: s.key },
              h("polyline", { className: "ar-chart-line", points: pts, style: { stroke: "var(--chart-" + (si + 1) + ")" } }),
              series.length > 1 && last && h("text", { className: "ar-chart-direct", x: M.X(W - m.r + 8), y: y(last[s.key] || 0) + 4, textAnchor: M.A("start") }, s.label),
              hov !== null && h("circle", { className: "ar-chart-dot", cx: M.X(x(hov)), cy: y(data[hov][s.key] || 0), r: 4, style: { fill: "var(--chart-" + (si + 1) + ")" } }));
          })),
        hov !== null && Tip(M.X(x(hov)), m.t, W, data[hov].label, series.map(function (s, si) { return { key: s.key, label: s.label, value: data[hov][s.key] || 0, color: "var(--chart-" + (si + 1) + ")" }; }), p.format || function (v) { return v.toLocaleString("en-US"); }, rtl)));
  }

  function BarChart(p) {
    var data = p.data || [], series = (p.series || []).slice(0, 4), fmt = p.format || compact, H = p.height || 240;
    var r = useWidth(p.width || 640), ref = r[0], W = r[1], rtl = r[2], M = mirror(rtl, W);
    var hs = React.useState(null), hov = hs[0];
    var m = { t: 12, r: 16, b: 28, l: 48 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
    var max = niceMax(Math.max.apply(null, data.reduce(function (a, d) { return a.concat(series.map(function (s) { return d[s.key] || 0; })); }, [0])));
    var y = function (v) { return m.t + ih - v / max * ih; };
    var band = iw / Math.max(1, data.length), gw = Math.min(band * .7, series.length * 28), bw = (gw - (series.length - 1) * 2) / series.length;
    var ticks = [0, .25, .5, .75, 1].map(function (f) { return f * max; });
    function barPath(x0, y0, w, hgt) { var rr = Math.min(4, w / 2, hgt); return "M" + x0 + "," + (y0 + hgt) + "V" + (y0 + rr) + "Q" + x0 + "," + y0 + " " + (x0 + rr) + "," + y0 + "H" + (x0 + w - rr) + "Q" + (x0 + w) + "," + y0 + " " + (x0 + w) + "," + (y0 + rr) + "V" + (y0 + hgt) + "Z"; }
    return h("figure", { className: cx("ar-chart", p.className), ref: ref },
      p.title && h("figcaption", { className: "ar-chart-title" }, p.title),
      Legend(series),
      h("div", { className: "ar-chart-plot" },
        h("svg", { width: W, height: H, role: "img", "aria-label": p.ariaLabel || p.title, style: { direction: "ltr" }, onMouseLeave: function () { hs[1](null); } },
          ticks.map(function (t, i) { return h("g", { key: i }, h("line", { className: i ? "ar-chart-grid" : "ar-chart-base", x1: M.X(m.l), x2: M.X(W - m.r), y1: y(t), y2: y(t) }), h("text", { className: "ar-chart-axis", x: M.X(m.l - 8), y: y(t) + 4, textAnchor: M.A("end") }, fmt(t))); }),
          data.map(function (d, i) {
            var cx0 = m.l + band * i + band / 2, x0 = cx0 - gw / 2;
            return h("g", { key: i, onMouseEnter: function () { hs[1](i); } },
              h("rect", { x: M.XR(m.l + band * i, band), y: m.t, width: band, height: ih, className: cx("ar-chart-hit", hov === i && "ar-chart-hit-on") }),
              series.map(function (s, si) { var v = d[s.key] || 0, top = y(v), hgt = m.t + ih - top; return hgt > 0 ? h("path", { key: s.key, d: barPath(M.XR(x0 + si * (bw + 2), bw), top, bw, hgt), style: { fill: "var(--chart-" + (si + 1) + ")" } }) : null; }),
              h("text", { className: "ar-chart-axis", x: M.X(cx0), y: H - 8, textAnchor: "middle" }, d.label));
          })),
        hov !== null && Tip(M.X(m.l + band * hov + band / 2 + gw / 2), m.t, W, data[hov].label, series.map(function (s, si) { return { key: s.key, label: s.label, value: data[hov][s.key] || 0, color: "var(--chart-" + (si + 1) + ")" }; }), p.format || function (v) { return v.toLocaleString("en-US"); }, rtl)));
  }


  /* Wraps a left-to-right run (an amount, IBAN, card or reference number) in Unicode isolates (LRI…PDI),
     so inside Arabic text "$12,480.50" keeps its symbol and sign where they belong. Use it on amounts you
     place inside translated sentences; components that show amounts already isolate them. */
  function ltr(text) { return "\u2066" + text + "\u2069"; }

  window.Areeba = Object.assign(window.Areeba || {}, { Button: Button, TextField: TextField, Switch: Switch, Badge: Badge, Alert: Alert, Tabs: Tabs, ListItem: ListItem, List: List, TabBar: TabBar, Sidebar: Sidebar, DataTable: DataTable, Dialog: Dialog, Toast: Toast, PaymentCard: PaymentCard, EmptyState: EmptyState, Checkbox: Checkbox, Select: Select, DatePicker: DatePicker, Calendar: Calendar, LineChart: LineChart, BarChart: BarChart, icons: icons, ltr: ltr });
})();
