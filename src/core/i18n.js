

/* Built-in words, in the page's language (<html lang>). Every one can be overridden by a prop. */
var UI_TEXT = {
  en: { nav: "Main", empty: "No results", select: "Select", frozen: "Frozen", card: function (n, l4, fz) { return (n || "Card") + " ending " + l4 + (fz ? ", frozen" : ""); },
    prev: "Previous month", next: "Next month", pick: "Select date",
    balance: "Available balance", showBalance: "Show balance", hideBalance: "Hide balance", balanceHidden: "Balance hidden", more: "More actions",
    search: "Search", clear: "Clear search", keypad: "Number pad", del: "Delete", fee: "Transaction fee", free: "Free", position: function (c, n) { return c + " of " + n; },
    digits: function (c, n) { return c + " of " + n + " digits entered"; }, unread: "Unread", copy: "Copy", copied: "Copied",
    pages: "Pages", prevPage: "Previous page", nextPage: "Next page", page: function (n) { return "Page " + n; }, range: function (a, b, n) { return a + "–" + b + " of " + n; },
    chars: function (n, m) { return n + " of " + m + " characters"; }, drop: "Drag a file here or", dropMany: "Drag files here or", choose: "Choose file", chooseMany: "Choose files",
    remove: function (n) { return "Remove " + n; }, tooBig: function (m) { return "Too large. The limit is " + m + "."; }, badType: "This file type is not accepted.",
    uploading: "Uploading", uploaded: "Uploaded", kb: "KB", mb: "MB", files: "Files" },
  ar: { nav: "التنقل الرئيسي", empty: "لا توجد نتائج", select: "اختر", frozen: "مجمّدة", card: function (n, l4, fz) { return "بطاقة " + (n || "") + " تنتهي بـ " + l4 + (fz ? "، مجمّدة" : ""); },
    prev: "الشهر السابق", next: "الشهر التالي", pick: "اختر تاريخًا",
    balance: "الرصيد المتاح", showBalance: "إظهار الرصيد", hideBalance: "إخفاء الرصيد", balanceHidden: "الرصيد مخفي", more: "إجراءات إضافية",
    search: "بحث", clear: "مسح البحث", keypad: "لوحة الأرقام", del: "حذف", fee: "رسوم المعاملة", free: "مجاني", position: function (c, n) { return c + " من " + n; },
    digits: function (c, n) { return "أُدخل " + c + " من " + n + " أرقام"; }, unread: "غير مقروء", copy: "نسخ", copied: "تم النسخ",
    pages: "الصفحات", prevPage: "الصفحة السابقة", nextPage: "الصفحة التالية", page: function (n) { return "الصفحة " + n; }, range: function (a, b, n) { return a + "–" + b + " من " + n; },
    chars: function (n, m) { return n + " من " + m + " حرفًا"; }, drop: "اسحب ملفًا إلى هنا أو", dropMany: "اسحب الملفات إلى هنا أو", choose: "اختر ملفًا", chooseMany: "اختر ملفات",
    remove: function (n) { return "إزالة " + n; }, tooBig: function (m) { return "الملف كبير جدًا. الحد الأقصى " + m + "."; }, badType: "نوع الملف هذا غير مقبول.",
    uploading: "جارٍ التحميل", uploaded: "تم التحميل", kb: "كيلوبايت", mb: "ميغابايت", files: "الملفات" },
};
function ui(lang) { var l = String(lang || (typeof document !== "undefined" && document.documentElement.lang) || "en").slice(0, 2).toLowerCase(); return UI_TEXT[l] || UI_TEXT.en; }

export { UI_TEXT, ui };
