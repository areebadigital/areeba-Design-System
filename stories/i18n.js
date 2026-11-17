/* Arabic copy for every story. When the Direction toolbar switch is "Right to left", stories show
   Arabic: areeba.js translates the strings stories pass to components, and preview.js translates args.
   Keys are the exact English story strings. Amounts and codes inside sentences are wrapped in Unicode
   isolates (L) so they read correctly in Arabic text, the same thing Areeba.ltr() does in product code.
   Card faces (holder, network) stay in Latin: a payment card reads the same in every language. */
const L = (s) => '⁦' + s + '⁩';

export const AR = {
  // Actions
  'Send money': 'إرسال الأموال', 'Pay $42.00': 'ادفع ' + L('$42.00'), 'Export CSV': 'تصدير CSV', 'Cancel': 'إلغاء',
  'Freeze card': 'تجميد البطاقة', 'Disabled': 'غير متاح', 'Continue': 'متابعة', 'Refund': 'استرداد', 'Request': 'طلب',
  // Inputs
  'Amount': 'المبلغ', 'Available: $12,480.50': 'المتاح: ' + L('$12,480.50'), 'IBAN': 'رقم الآيبان (IBAN)',
  'IBAN is too short. Check the number and try again.': 'رقم الآيبان قصير جدًا. تحقق من الرقم وحاول مجددًا.',
  'Reference': 'المرجع', 'Currency': 'العملة', 'Choose a currency': 'اختر عملة', 'Choose a currency to continue.': 'اختر عملة للمتابعة.',
  'Store': 'المتجر', 'Choose a store': 'اختر متجرًا', 'Payouts go to this store’s account': 'تُحوَّل المدفوعات إلى حساب هذا المتجر',
  'USD · US dollar': 'USD · دولار أمريكي', 'LBP · Lebanese pound': 'LBP · ليرة لبنانية', 'EUR · Euro': 'EUR · يورو', 'GBP · Pound sterling': 'GBP · جنيه إسترليني',
  'Hamra': 'الحمرا', 'Achrafieh': 'الأشرفية', 'Jounieh': 'جونية', 'Zahle': 'زحلة',
  'Email me a monthly statement': 'أرسل لي كشف حساب شهري', 'Sent on the 1st of each month': 'يُرسل في الأول من كل شهر',
  'Select all transactions': 'تحديد كل المعاملات', 'Accept international payments': 'قبول المدفوعات الدولية', 'Accept your first payment': 'استقبل أول دفعة',
  'Managed by your bank': 'يديرها مصرفك', 'Online payments': 'المدفوعات عبر الإنترنت', 'Contactless (set by your bank)': 'الدفع بدون تلامس (يحدده مصرفك)',
  'Settlement date': 'تاريخ التسوية', 'Select date': 'اختر تاريخًا', 'Earlier dates are disabled.': 'التواريخ السابقة غير متاحة.', 'Later dates are disabled.': 'التواريخ اللاحقة غير متاحة.',
  // Status
  'Paid': 'مدفوع', 'Pending': 'قيد الانتظار', 'Declined': 'مرفوض', 'Failed': 'فشل', 'Completed': 'مكتمل', 'Draft': 'مسودة', 'New': 'جديد',
  'Scheduled': 'مجدول', 'Verified': 'موثّق', 'Expired': 'منتهي', 'Archived': 'مؤرشف', 'Refunded': 'مُسترد', 'Live': 'مباشر',
  'Payment declined': 'تم رفض الدفع', 'Insufficient balance. Top up your account or use another card.': 'الرصيد غير كافٍ. اشحن حسابك أو استخدم بطاقة أخرى.',
  'Transfer sent': 'تم إرسال التحويل', '$250.00 to Rami Khoury will arrive within minutes.': 'سيصل مبلغ ' + L('$250.00') + ' إلى رامي خوري خلال دقائق.',
  'Settlement at 18:00': 'التسوية الساعة 18:00', 'Payments after 18:00 settle the next business day.': 'تُسوّى المدفوعات بعد الساعة 18:00 في يوم العمل التالي.',
  'Card expires soon': 'البطاقة تنتهي قريبًا', 'Your Visa ending 4021 expires on 30 Nov. A replacement is on its way.': 'تنتهي بطاقة فيزا المنتهية بـ 4021 في 30 نوفمبر. البطاقة البديلة في الطريق.',
  'Card frozen': 'تم تجميد البطاقة', 'Undo': 'تراجع', 'Transfer sent to Rami Khoury': 'تم إرسال التحويل إلى رامي خوري', 'Couldn’t export. Try again.': 'تعذّر التصدير. حاول مجددًا.',
  'No transactions yet': 'لا توجد معاملات بعد', 'When customers pay with areeba, their payments show up here in real time.': 'عندما يدفع العملاء عبر areeba، تظهر مدفوعاتهم هنا فورًا.',
  'No matches for “Hamra”': 'لا نتائج لـ «الحمرا»', 'Check the spelling or clear the filters.': 'تحقق من الإملاء أو امسح عوامل التصفية.', 'Clear filters': 'مسح عوامل التصفية',
  // Data display
  'Spinneys': 'سبينيس', 'S': 'س', 'Today, 14:32 · Visa •• 4021': 'اليوم، 14:32 · فيزا •• 4021', 'Rami Khoury': 'رامي خوري', 'RK': 'ر خ',
  'Yesterday · Transfer in': 'أمس · تحويل وارد', 'Netflix': 'نتفليكس', 'N': 'ن', '12 Nov · Subscription': '12 نوفمبر · اشتراك',
  'Recent transactions': 'أحدث المعاملات', 'Date': 'التاريخ', 'Customer': 'العميل', 'Status': 'الحالة',
  'Lina Haddad': 'لينا حداد', 'Omar Saad': 'عمر سعد', '16 Nov, 14:32': '16 نوفمبر، 14:32', '16 Nov, 11:05': '16 نوفمبر، 11:05', '15 Nov, 19:47': '15 نوفمبر، 19:47',
  'No transactions in this period': 'لا توجد معاملات في هذه الفترة',
  // Charts
  'Payment volume': 'حجم المدفوعات', 'Card volume': 'حجم البطاقات', 'Card': 'بطاقة', 'QR': 'QR', 'Pay link': 'رابط دفع',
  'Jun': 'يونيو', 'Jul': 'يوليو', 'Aug': 'أغسطس', 'Sep': 'سبتمبر', 'Oct': 'أكتوبر', 'Nov': 'نوفمبر',
  'Transactions by weekday': 'المعاملات حسب اليوم', 'This week': 'هذا الأسبوع', 'Last week': 'الأسبوع الماضي', 'Payouts by store': 'المدفوعات حسب المتجر', 'Payouts': 'المدفوعات',
  'Mon': 'الاثنين', 'Tue': 'الثلاثاء', 'Wed': 'الأربعاء', 'Thu': 'الخميس', 'Fri': 'الجمعة', 'Sat': 'السبت', 'Sun': 'الأحد',
  // Navigation
  'Period': 'الفترة', 'Day': 'يوم', 'Week': 'أسبوع', 'Month': 'شهر', 'Year': 'سنة', 'All': 'الكل', 'In': 'وارد', 'Out': 'صادر',
  'Main': 'الرئيسية', 'Home': 'الرئيسية', 'Cards': 'البطاقات', 'Pay': 'الدفع', 'Insights': 'التحليلات', 'Profile': 'الملف',
  'Overview': 'نظرة عامة', 'Transactions': 'المعاملات', 'Stores': 'المتاجر', 'Reports': 'التقارير', 'Settings': 'الإعدادات',
  'Spinneys Merchant · Beirut': 'سبينيس للتجار · بيروت',
  // Overlays
  'Freeze this card?': 'تجميد هذه البطاقة؟', 'Payments will be declined until you unfreeze it.': 'سيتم رفض المدفوعات حتى تقوم بإلغاء التجميد.',
  'Payments with Visa ending 4021 will be declined until you unfreeze it. You can do this anytime.': 'سيتم رفض المدفوعات ببطاقة فيزا المنتهية بـ 4021 حتى تقوم بإلغاء التجميد. يمكنك ذلك في أي وقت.',
  'Open dialog': 'فتح النافذة', 'Open sheet': 'فتح اللوحة',
};

export const isRtl = () => typeof document !== 'undefined' && document.documentElement.dir === 'rtl';

/** Arabic for a story string when the page is RTL; anything not in the dictionary is left as is. */
export function t(s) { return isRtl() && typeof s === 'string' && Object.prototype.hasOwnProperty.call(AR, s) ? AR[s] : s; }

/** Translates strings inside props, arrays and plain objects (items, options, rows, series, data). */
export function tDeep(v, depth = 0) {
  if (!isRtl() || depth > 6) return v;
  if (typeof v === 'string') return t(v);
  if (Array.isArray(v)) return v.map((x) => tDeep(x, depth + 1));
  if (v && typeof v === 'object' && !v.$$typeof && Object.getPrototypeOf(v) === Object.prototype) { // not React elements
    const o = {}; for (const k of Object.keys(v)) o[k] = tDeep(v[k], depth + 1); return o;
  }
  return v;
}
