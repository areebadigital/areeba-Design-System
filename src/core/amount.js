
/* Applies a NumberPad key to an amount string: one decimal point, two decimals, no leading zeros, `max` digits. */
function padInput(value, key, maxDigits) {
  var v = String(value || "");
  if (key === "back") return v.slice(0, -1);
  if (key === ".") return v.indexOf(".") >= 0 ? v : (v || "0") + ".";
  if (v.indexOf(".") >= 0 && v.split(".")[1].length >= 2) return v;
  if (v.replace(".", "").length >= (maxDigits || 9)) return v;
  return v === "0" ? key : v + key;
}
function groupDigits(v) { var s = String(v || ""), parts = s.split("."); parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); return parts.join("."); }

export { padInput, groupDigits };
