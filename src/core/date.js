import { ui } from './i18n.js';

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

export { MONTHS, DOW, DOW_LONG, sameDay, dateLocale, isEn, latn, intl, fmtDate, fmtMonth, weekdays, dateText };
