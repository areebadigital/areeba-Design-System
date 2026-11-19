import React from 'react';
import { IconButton } from '../IconButton/IconButton.js';
import { ui } from '../../core/i18n.js';
import { icons } from '../../core/icons.js';
import { cx, useId } from '../../core/util.js';
const h = React.createElement;

/* Add files by dropping them or with a button. The browser's file input stays hidden: it is the only way to open the system file picker.
   Files are checked against `accept` and `maxSize`; each row shows its state (uploading with progress, uploaded, error) and can be removed. */
function fileSize(n, t) { return n < 1024 * 1024 ? Math.max(1, Math.round(n / 1024)) + " " + t.kb : (Math.round(n / 1024 / 1024 * 10) / 10) + " " + t.mb; }
function fileOk(f, accept) {
  if (!accept) return true; var name = (f.name || "").toLowerCase(), type = f.type || "";
  return accept.split(",").some(function (a) { a = a.trim().toLowerCase(); return a.charAt(0) === "." ? name.slice(-a.length) === a : a.slice(-2) === "/*" ? type.indexOf(a.slice(0, -1)) === 0 : type === a; });
}
function FileUpload(p) {
  var id = useId(p.id), labelId = id + "-label", hintId = id + "-hint", input = React.useRef(null), t = ui();
  var st = React.useState(p.defaultFiles || []), files = p.files !== undefined ? p.files : st[0], ds = React.useState(false), over = ds[0];
  function set(list) { st[1](list); if (p.onChange) p.onChange(list); }
  function add(list) {
    var items = Array.prototype.slice.call(list || []).map(function (f) {
      var err = !fileOk(f, p.accept) ? t.badType : p.maxSize && f.size > p.maxSize ? t.tooBig(fileSize(p.maxSize, t)) : null;
      return { name: f.name, size: f.size, file: f, status: err ? "error" : "done", error: err || undefined };
    });
    if (items.length) set(p.multiple ? files.concat(items) : items.slice(0, 1));
  }
  function remove(i) { var next = files.filter(function (_, j) { return j !== i; }); set(next); if (p.onRemove) p.onRemove(files[i], i); }
  var many = !!p.multiple;
  return h("div", { className: cx("ar-upload", p.error && "ar-upload-invalid", p.className) },
    p.label && h("span", { className: "ar-field-label", id: labelId }, p.label),
    h("div", { className: cx("ar-upload-zone", over && "ar-upload-over", p.disabled && "ar-upload-disabled"),
      onDragOver: function (e) { if (p.disabled) return; e.preventDefault(); ds[1](true); }, onDragLeave: function () { ds[1](false); },
      onDrop: function (e) { e.preventDefault(); ds[1](false); if (!p.disabled) add(e.dataTransfer.files); } },
      h(icons.upload, { className: "ar-upload-icon" }),
      h("span", { className: "ar-upload-text" }, many ? t.dropMany : t.drop),
      h("button", { type: "button", className: "ar-btn ar-btn-secondary ar-btn-sm", disabled: p.disabled, "aria-describedby": (p.error || p.hint) ? hintId : undefined,
        "aria-labelledby": p.label ? labelId + " " + id + "-btn" : undefined, id: id + "-btn", onClick: function () { if (input.current) input.current.click(); } }, many ? t.chooseMany : t.choose),
      h("input", { ref: input, type: "file", className: "ar-sr-only", tabIndex: -1, "aria-hidden": "true", accept: p.accept, multiple: many, name: p.name, disabled: p.disabled,
        onChange: function (e) { add(e.target.files); e.target.value = ""; } })),
    (p.error || p.hint) && h("span", { className: "ar-field-hint", id: hintId, role: p.error ? "alert" : undefined }, p.error || p.hint),
    files.length > 0 && h("ul", { className: "ar-upload-list", "aria-label": p.label ? undefined : t.files, "aria-labelledby": p.label ? labelId : undefined }, files.map(function (f, i) {
      var bad = f.status === "error", busy = f.status === "uploading";
      return h("li", { key: f.name + i, className: cx("ar-upload-file", bad && "ar-upload-file-error") },
        h(bad ? icons.alert : icons.doc, { className: "ar-upload-file-icon" }),
        h("span", { className: "ar-upload-file-main" },
          h("span", { className: "ar-upload-file-name", dir: "auto" }, f.name),
          h("span", { className: "ar-upload-file-meta" }, bad ? f.error : busy ? t.uploading + " · " + (f.progress || 0) + "%" : [f.size != null && fileSize(f.size, t), t.uploaded].filter(Boolean).join(" · ")),
          busy && h("span", { className: "ar-upload-bar", role: "progressbar", "aria-label": f.name, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": f.progress || 0 }, h("span", { style: { width: (f.progress || 0) + "%" } }))),
        h(IconButton, { icon: "close", variant: "plain", label: t.remove(f.name), onClick: function () { remove(i); } }));
    })));
}

export { fileSize, fileOk, FileUpload };
