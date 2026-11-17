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

  function Switch(p) {
    return h("label", { className: cx("ar-switch", p.className) },
      h("input", Object.assign({ type: "checkbox", role: "switch" }, rest(p, ["label", "className"]))),
      h("span", { className: "ar-switch-track", "aria-hidden": "true" }),
      p.label && h("span", null, p.label));
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
    return h("div", { className: cx("ar-item", p.className) },
      p.leading !== undefined && h("div", { className: "ar-item-lead", "aria-hidden": "true" }, p.leading),
      h("div", { className: "ar-item-main" }, h("p", { className: "ar-item-title" }, p.title), p.subtitle && h("p", { className: "ar-item-sub" }, p.subtitle)),
      (amount || p.trailing) && h("div", { className: "ar-item-trail" },
        amount && h("span", { className: cx("ar-item-amount", incoming && "ar-item-amount-in") }, amount),
        p.trailing));
  }
  function List(p) { return h("div", { className: cx("ar-list", p.className), role: "list" }, p.children); }

  function TabBar(p) {
    var items = p.items || [];
    return h("nav", { className: cx("ar-tabbar", p.className), "aria-label": p.label || "Main" }, items.map(function (it) {
      var I = icons[it.icon] || icons.home;
      return h("button", { key: it.value, type: "button", className: "ar-tabbar-item", "aria-current": p.value === it.value ? "page" : undefined,
        onClick: function () { p.onChange && p.onChange(it.value); } }, h(I, null), it.label);
    }));
  }

  function Sidebar(p) {
    var items = p.items || [];
    return h("aside", { className: cx("ar-sidebar", p.className) },
      h("div", { className: "ar-sidebar-brand" }, p.brand || "areeba"),
      h("nav", { "aria-label": p.label || "Main" }, items.map(function (it) {
        var I = icons[it.icon] || icons.home;
        return h("a", { key: it.value, href: it.href || "#", className: "ar-sidebar-item", "aria-current": p.value === it.value ? "page" : undefined,
          onClick: function (e) { if (p.onChange) { e.preventDefault(); p.onChange(it.value); } } }, h(I, null), h("span", null, it.label),
          it.count !== undefined && h("span", { className: "ar-sidebar-count" }, it.count));
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
            return h("td", { key: c.key, className: cx(c.align === "right" && "ar-right", c.numeric && "ar-num", c.mono && "ar-mono") }, v);
          }));
        }) : h("tr", null, h("td", { colSpan: cols.length, className: "ar-table-empty" }, p.empty || "No results")))));
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
    return h("div", { className: cx("ar-pcard", "ar-pcard-" + (p.variant || "night"), p.className), role: "img", "aria-label": (p.network || "Card") + " ending " + p.last4 + (p.frozen ? ", frozen" : "") },
      h("div", { className: "ar-pcard-top" }, h("span", { className: "ar-pcard-logo" }, "areeba"), p.frozen && h("span", { className: "ar-pcard-frozen" }, "Frozen")),
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
    var ref = React.useRef(null);
    React.useEffect(function () { if (ref.current) ref.current.indeterminate = !!p.indeterminate; }, [p.indeterminate]);
    return h("label", { className: cx("ar-check", p.className) },
      h("input", Object.assign({ type: "checkbox", ref: ref }, rest(p, ["label", "hint", "className", "indeterminate"]))),
      h("span", { className: "ar-check-box", "aria-hidden": "true" },
        h("svg", { viewBox: "0 0 16 16", className: "ar-check-tick" }, h("path", { d: "M3.5 8.5l3 3 6-7" })),
        h("svg", { viewBox: "0 0 16 16", className: "ar-check-dash" }, h("path", { d: "M4 8h8" }))),
      h("span", { className: "ar-check-text" }, h("span", null, p.label), p.hint && h("span", { className: "ar-check-hint" }, p.hint)));
  }

  function Select(p) {
    var id = useId(p.id), hintId = id + "-hint";
    return h("div", { className: cx("ar-field", p.error && "ar-field-invalid", p.className) },
      p.label && h("label", { className: "ar-field-label", htmlFor: id }, p.label),
      h("div", { className: "ar-field-box ar-select" },
        h("select", Object.assign({}, rest(p, ["label", "hint", "error", "options", "placeholder", "className", "id"]), {
          id: id, "aria-invalid": p.error ? "true" : undefined, "aria-describedby": (p.error || p.hint) ? hintId : undefined,
          defaultValue: p.value === undefined ? (p.defaultValue !== undefined ? p.defaultValue : (p.placeholder ? "" : undefined)) : undefined }),
          p.placeholder && h("option", { value: "", disabled: true }, p.placeholder),
          (p.options || []).map(function (o) { return h("option", { key: o.value, value: o.value, disabled: o.disabled }, o.label); })),
        h("svg", { className: "ar-select-chev", viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M6 9l6 6 6-6" }))),
      (p.error || p.hint) && h("span", { className: "ar-field-hint", id: hintId }, p.error || p.hint));
  }

  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var DOW = ["Mo","Tu","We","Th","Fr","Sa","Su"];
  function sameDay(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
  function fmtDate(d) { return d ? d.getDate() + " " + MONTHS[d.getMonth()].slice(0, 3) + " " + d.getFullYear() : ""; }

  function Calendar(p) {
    var sel = p.value, today = p.today || new Date();
    var vs = React.useState(function () { var b = sel || today; return new Date(b.getFullYear(), b.getMonth(), 1); }), view = vs[0];
    var first = (view.getDay() + 6) % 7, days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    var cells = []; for (var i = 0; i < first; i++) cells.push(null); for (var d = 1; d <= days; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    function shift(n) { vs[1](new Date(view.getFullYear(), view.getMonth() + n, 1)); }
    var Chev = function (dir) { return h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: dir < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6" })); };
    return h("div", { className: "ar-cal", role: "group", "aria-label": "Choose date" },
      h("div", { className: "ar-cal-head" },
        h("button", { type: "button", className: "ar-cal-nav", "aria-label": "Previous month", onClick: function () { shift(-1); } }, Chev(-1)),
        h("span", { className: "ar-cal-title", "aria-live": "polite" }, MONTHS[view.getMonth()] + " " + view.getFullYear()),
        h("button", { type: "button", className: "ar-cal-nav", "aria-label": "Next month", onClick: function () { shift(1); } }, Chev(1))),
      h("div", { className: "ar-cal-grid", role: "grid" },
        DOW.map(function (w) { return h("span", { key: w, className: "ar-cal-dow", role: "columnheader" }, w); }),
        cells.map(function (c, i) {
          if (!c) return h("span", { key: "e" + i });
          var off = (p.min && c < p.min) || (p.max && c > p.max);
          return h("button", { key: i, type: "button", role: "gridcell", disabled: off, "aria-selected": sameDay(c, sel) ? "true" : "false", "aria-label": fmtDate(c),
            className: cx("ar-cal-day", sameDay(c, today) && "ar-cal-today"), onClick: function () { p.onChange && p.onChange(c); } }, c.getDate());
        })));
  }

  function DatePicker(p) {
    var id = useId(p.id);
    var vs = React.useState(p.defaultValue || null), val = p.value !== undefined ? p.value : vs[0];
    var os = React.useState(!!p.defaultOpen), open = os[0];
    var wrap = React.useRef(null);
    React.useEffect(function () {
      if (!open) return;
      function out(e) { if (wrap.current && !wrap.current.contains(e.target)) os[1](false); }
      function key(e) { if (e.key === "Escape") os[1](false); }
      document.addEventListener("mousedown", out); document.addEventListener("keydown", key);
      return function () { document.removeEventListener("mousedown", out); document.removeEventListener("keydown", key); };
    }, [open]);
    return h("div", { className: cx("ar-field ar-date", p.error && "ar-field-invalid", p.className), ref: wrap },
      p.label && h("label", { className: "ar-field-label", htmlFor: id }, p.label),
      h("button", { type: "button", id: id, className: "ar-field-box ar-date-trigger", "aria-haspopup": "dialog", "aria-expanded": open ? "true" : "false", onClick: function () { os[1](!open); } },
        h("span", { className: val ? "" : "ar-date-ph" }, val ? fmtDate(val) : (p.placeholder || "Select date")),
        h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" }), h("path", { d: "M4 10h16M8 3v4M16 3v4" }))),
      (p.error || p.hint) && h("span", { className: "ar-field-hint" }, p.error || p.hint),
      open && h("div", { className: "ar-date-pop" }, h(Calendar, { value: val, today: p.today, min: p.min, max: p.max, onChange: function (d) { vs[1](d); p.onChange && p.onChange(d); os[1](false); } })));
  }

  /* ---- charts ---- */
  function useWidth(initial) {
    var ref = React.useRef(null), ws = React.useState(initial);
    React.useEffect(function () {
      if (!ref.current || !window.ResizeObserver) return;
      var ro = new ResizeObserver(function (en) { ws[1](Math.max(240, Math.round(en[0].contentRect.width))); });
      ro.observe(ref.current); return function () { ro.disconnect(); };
    }, []);
    return [ref, ws[0]];
  }
  function niceMax(v) { if (v <= 0) return 1; var e = Math.pow(10, Math.floor(Math.log10(v))), f = v / e; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * e; }
  function compact(n) { var a = Math.abs(n); return a >= 1e6 ? (n / 1e6).toFixed(a % 1e6 ? 1 : 0) + "M" : a >= 1e3 ? (n / 1e3).toFixed(a % 1e3 ? 1 : 0) + "k" : String(n); }
  function Legend(series) {
    if (series.length < 2) return null;
    return h("div", { className: "ar-chart-legend" }, series.map(function (s, i) {
      return h("span", { key: s.key, className: "ar-chart-key" }, h("i", { style: { background: "var(--chart-" + (i + 1) + ")" } }), s.label);
    }));
  }
  function Tip(x, y, w, title, rows, fmt) {
    var left = x + 12 + 180 > w ? Math.max(0, x - 192) : x + 12;
    return h("div", { className: "ar-chart-tip", style: { left: left + "px", top: Math.max(0, y) + "px" } },
      h("div", { className: "ar-chart-tip-title" }, title),
      rows.map(function (r) { return h("div", { key: r.key, className: "ar-chart-tip-row" }, h("i", { style: { background: r.color } }), h("span", null, r.label), h("b", { className: "ar-num" }, fmt(r.value))); }));
  }

  function LineChart(p) {
    var data = p.data || [], series = (p.series || []).slice(0, 4), fmt = p.format || compact, H = p.height || 240;
    var r = useWidth(p.width || 640), ref = r[0], W = r[1];
    var hs = React.useState(null), hov = hs[0];
    var m = { t: 12, r: series.length > 1 ? 72 : 16, b: 28, l: 48 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
    var max = niceMax(Math.max.apply(null, data.reduce(function (a, d) { return a.concat(series.map(function (s) { return d[s.key] || 0; })); }, [0])));
    var x = function (i) { return m.l + (data.length < 2 ? iw / 2 : i * iw / (data.length - 1)); }, y = function (v) { return m.t + ih - v / max * ih; };
    var ticks = [0, .25, .5, .75, 1].map(function (f) { return f * max; });
    var every = Math.ceil(data.length / Math.max(1, Math.floor(iw / 64)));
    function move(e) { var bx = e.currentTarget.getBoundingClientRect(); var i = Math.round((e.clientX - bx.left - m.l) / iw * (data.length - 1)); hs[1](Math.max(0, Math.min(data.length - 1, i))); }
    return h("figure", { className: cx("ar-chart", p.className), ref: ref },
      p.title && h("figcaption", { className: "ar-chart-title" }, p.title),
      Legend(series),
      h("div", { className: "ar-chart-plot" },
        h("svg", { width: W, height: H, role: "img", "aria-label": p.ariaLabel || p.title, onMouseMove: move, onMouseLeave: function () { hs[1](null); } },
          ticks.map(function (t, i) { return h("g", { key: i }, h("line", { className: i ? "ar-chart-grid" : "ar-chart-base", x1: m.l, x2: W - m.r, y1: y(t), y2: y(t) }), h("text", { className: "ar-chart-axis", x: m.l - 8, y: y(t) + 4, textAnchor: "end" }, fmt(t))); }),
          data.map(function (d, i) { return i % every ? null : h("text", { key: i, className: "ar-chart-axis", x: x(i), y: H - 8, textAnchor: "middle" }, d.label); }),
          hov !== null && h("line", { className: "ar-chart-cross", x1: x(hov), x2: x(hov), y1: m.t, y2: m.t + ih }),
          series.map(function (s, si) {
            var pts = data.map(function (d, i) { return x(i) + "," + y(d[s.key] || 0); }).join(" "), last = data[data.length - 1];
            return h("g", { key: s.key },
              h("polyline", { className: "ar-chart-line", points: pts, style: { stroke: "var(--chart-" + (si + 1) + ")" } }),
              series.length > 1 && last && h("text", { className: "ar-chart-direct", x: W - m.r + 8, y: y(last[s.key] || 0) + 4 }, s.label),
              hov !== null && h("circle", { className: "ar-chart-dot", cx: x(hov), cy: y(data[hov][s.key] || 0), r: 4, style: { fill: "var(--chart-" + (si + 1) + ")" } }));
          })),
        hov !== null && Tip(x(hov), m.t, W, data[hov].label, series.map(function (s, si) { return { key: s.key, label: s.label, value: data[hov][s.key] || 0, color: "var(--chart-" + (si + 1) + ")" }; }), p.format || function (v) { return v.toLocaleString("en-US"); })));
  }

  function BarChart(p) {
    var data = p.data || [], series = (p.series || []).slice(0, 4), fmt = p.format || compact, H = p.height || 240;
    var r = useWidth(p.width || 640), ref = r[0], W = r[1];
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
        h("svg", { width: W, height: H, role: "img", "aria-label": p.ariaLabel || p.title, onMouseLeave: function () { hs[1](null); } },
          ticks.map(function (t, i) { return h("g", { key: i }, h("line", { className: i ? "ar-chart-grid" : "ar-chart-base", x1: m.l, x2: W - m.r, y1: y(t), y2: y(t) }), h("text", { className: "ar-chart-axis", x: m.l - 8, y: y(t) + 4, textAnchor: "end" }, fmt(t))); }),
          data.map(function (d, i) {
            var cx0 = m.l + band * i + band / 2, x0 = cx0 - gw / 2;
            return h("g", { key: i, onMouseEnter: function () { hs[1](i); } },
              h("rect", { x: m.l + band * i, y: m.t, width: band, height: ih, className: cx("ar-chart-hit", hov === i && "ar-chart-hit-on") }),
              series.map(function (s, si) { var v = d[s.key] || 0, top = y(v), hgt = m.t + ih - top; return hgt > 0 ? h("path", { key: s.key, d: barPath(x0 + si * (bw + 2), top, bw, hgt), style: { fill: "var(--chart-" + (si + 1) + ")" } }) : null; }),
              h("text", { className: "ar-chart-axis", x: cx0, y: H - 8, textAnchor: "middle" }, d.label));
          })),
        hov !== null && Tip(m.l + band * hov + band / 2 + gw / 2, m.t, W, data[hov].label, series.map(function (s, si) { return { key: s.key, label: s.label, value: data[hov][s.key] || 0, color: "var(--chart-" + (si + 1) + ")" }; }), p.format || function (v) { return v.toLocaleString("en-US"); })));
  }


  window.Areeba = Object.assign(window.Areeba || {}, { Button: Button, TextField: TextField, Switch: Switch, Badge: Badge, Alert: Alert, Tabs: Tabs, ListItem: ListItem, List: List, TabBar: TabBar, Sidebar: Sidebar, DataTable: DataTable, Dialog: Dialog, Toast: Toast, PaymentCard: PaymentCard, EmptyState: EmptyState, Checkbox: Checkbox, Select: Select, DatePicker: DatePicker, Calendar: Calendar, LineChart: LineChart, BarChart: BarChart, icons: icons });
})();
