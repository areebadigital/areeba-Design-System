/* Arabic copy for every story. When the Direction toolbar switch is "Right to left", stories show
   Arabic: areeba.js translates the strings stories pass to components, and preview.js translates args.
   Keys are the exact English story strings. Amounts and codes inside sentences are wrapped in Unicode
   isolates (L) so they read correctly in Arabic text, the same thing Areeba.ltr() does in product code.
   Card faces (holder, network) stay in Latin: a payment card reads the same in every language. */
const L = (s) => '⁦' + s + '⁩';

export const AR = {
  // Form components (round 4)
  'Payout schedule': 'جدول المدفوعات', 'Every business day': 'كل يوم عمل', 'Every Monday': 'كل يوم اثنين', 'On the 1st of the month': 'في الأول من كل شهر', 'Payments before 18:00 are in that day’s payout.': 'تُضاف المدفوعات قبل الساعة 18:00 إلى دفعة ذلك اليوم.', 'Transfer to': 'التحويل إلى', 'Bank account': 'حساب مصرفي', '1–2 business days, by IBAN': 'من يوم إلى يومَي عمل، عبر رقم الآيبان', 'areeba wallet': 'محفظة areeba', 'Instant, by phone number': 'فوري، عبر رقم الهاتف', 'Cash pickup': 'استلام نقدي', 'Not available for this amount': 'غير متاح لهذا المبلغ', 'Account type': 'نوع الحساب', 'Current': 'جاري', 'Savings': 'توفير', 'Document type': 'نوع المستند', 'Commercial register': 'السجل التجاري', 'ID of the owner': 'هوية المالك', 'Bank letter': 'إفادة مصرفية', 'Choose the type of document you are uploading.': 'اختر نوع المستند الذي تحمّله.', 'Note to recipient': 'ملاحظة للمستلم', 'Dinner on Friday': 'عشاء يوم الجمعة', 'They see this with the transfer.': 'يراها مع التحويل.', 'Reason for the refund': 'سبب الاسترداد', 'Tell the customer why you are refunding, in a sentence or two.': 'أخبر العميل بسبب الاسترداد في جملة أو اثنتين.', 'PDF, JPG or PNG, up to 10 MB': 'PDF أو JPG أو PNG، حتى 10 ميغابايت', 'Supporting documents': 'المستندات الداعمة', 'commercial-register.pdf': 'السجل-التجاري.pdf', 'id-front.jpg': 'الهوية-الوجه.jpg', 'bank-letter.heic': 'الإفادة-المصرفية.heic', 'This file type is not accepted.': 'نوع الملف هذا غير مقبول.', 'Upload your commercial register to continue.': 'حمّل السجل التجاري للمتابعة.',
  // SaaS components (round 3)
  'Business details': 'تفاصيل النشاط التجاري', 'Shown on receipts and invoices.': 'تظهر على الإيصالات والفواتير.', 'Edit': 'تعديل', 'Save changes': 'حفظ التغييرات', 'Business name': 'اسم النشاط التجاري', 'Green Grocer': 'البقالة الخضراء', 'Country': 'البلد', 'Lebanon': 'لبنان', 'Settlement currency': 'عملة التسوية', 'Recent payouts': 'أحدث المدفوعات', 'View all': 'عرض الكل', '28 Nov': '28 نوفمبر', '21 Nov': '21 نوفمبر', 'Monthly limit': 'الحد الشهري', 'Resets on 1 December': 'يُعاد ضبطه في 1 ديسمبر', 'Close to your limit': 'قاربت الحد', 'Account set-up': 'إعداد الحساب', '3 of 5 steps': '3 من 5 خطوات', 'Business': 'النشاط التجاري', 'Team': 'الفريق', 'Business name, address and settlement account.': 'اسم النشاط التجاري وعنوانه وحساب التسوية.', 'People who can sign in to this portal.': 'الأشخاص الذين يمكنهم تسجيل الدخول إلى هذه البوابة.', 'Emails and texts about payments and payouts.': 'رسائل البريد والرسائل النصية عن المدفوعات والدفعات.', '$3,200 of $5,000': L('$3,200') + ' من ' + L('$5,000'), '$4,100 of $5,000': L('$4,100') + ' من ' + L('$5,000'), '$4,800 of $5,000': L('$4,800') + ' من ' + L('$5,000'), 'Payments stop at $5,000': 'تتوقف المدفوعات عند ' + L('$5,000'),
  // Actions
  'Send money': 'إرسال الأموال', 'Pay $42.00': 'ادفع ' + L('$42.00'), 'Export CSV': 'تصدير CSV', 'Cancel': 'إلغاء',
  'Freeze card': 'تجميد البطاقة', 'Disabled': 'غير متاح', 'Continue': 'متابعة', 'Refund': 'استرداد', 'Request': 'طلب',
  // Inputs
  'Amount': 'المبلغ', 'Available: $12,480.50': 'المتاح: ' + L('$12,480.50'), 'IBAN': 'رقم الآيبان (IBAN)',
  'IBAN is too short. Check the number and try again.': 'رقم الآيبان قصير جدًا. تحقق من الرقم وحاول مجددًا.',
  'Reference': 'المرجع', 'Currency': 'العملة', 'Choose a currency': 'اختر عملة', 'Choose a currency to continue.': 'اختر عملة للمتابعة.',
  'Store': 'المتجر', 'Choose a store': 'اختر متجرًا', 'Payouts go to this store’s account': 'تُحوَّل المدفوعات إلى حساب هذا المتجر',
  'USD · US dollar': 'USD · دولار أمريكي', 'LBP · Lebanese pound': 'LBP · ليرة لبنانية', 'EUR · Euro': 'EUR · يورو', 'GBP · Pound sterling': 'GBP · جنيه إسترليني',
  'Downtown': 'وسط المدينة', 'Harbour': 'المرفأ', 'Hillside': 'التلة', 'Old town': 'البلدة القديمة',
  'Email me a monthly statement': 'أرسل لي كشف حساب شهري', 'Sent on the 1st of each month': 'يُرسل في الأول من كل شهر',
  'Select all transactions': 'تحديد كل المعاملات', 'Accept international payments': 'قبول المدفوعات الدولية', 'Accept your first payment': 'استقبل أول دفعة',
  'Managed by your bank': 'يديرها مصرفك', 'Online payments': 'المدفوعات عبر الإنترنت', 'Contactless (set by your bank)': 'الدفع بدون تلامس (يحدده مصرفك)',
  'Settlement date': 'تاريخ التسوية', 'Select date': 'اختر تاريخًا', 'Earlier dates are disabled.': 'التواريخ السابقة غير متاحة.', 'Later dates are disabled.': 'التواريخ اللاحقة غير متاحة.',
  // Status
  'Paid': 'مدفوع', 'Pending': 'قيد الانتظار', 'Declined': 'مرفوض', 'Failed': 'فشل', 'Completed': 'مكتمل', 'Draft': 'مسودة', 'New': 'جديد',
  'Scheduled': 'مجدول', 'Verified': 'موثّق', 'Expired': 'منتهي', 'Archived': 'مؤرشف', 'Refunded': 'مُسترد', 'Live': 'مباشر',
  'Payment declined': 'تم رفض الدفع', 'Insufficient balance. Top up your account or use another card.': 'الرصيد غير كافٍ. اشحن حسابك أو استخدم بطاقة أخرى.',
  'Transfer sent': 'تم إرسال التحويل', '$250.00 to Sara Ali will arrive within minutes.': 'سيصل مبلغ ' + L('$250.00') + ' إلى سارة علي خلال دقائق.',
  'Settlement at 18:00': 'التسوية الساعة 18:00', 'Payments after 18:00 settle the next business day.': 'تُسوّى المدفوعات بعد الساعة 18:00 في يوم العمل التالي.',
  'Card expires soon': 'البطاقة تنتهي قريبًا', 'Your Visa ending 4021 expires on 30 Nov. A replacement is on its way.': 'تنتهي بطاقة فيزا المنتهية بـ 4021 في 30 نوفمبر. البطاقة البديلة في الطريق.',
  'Card frozen': 'تم تجميد البطاقة', 'Undo': 'تراجع', 'Transfer sent to Sara Ali': 'تم إرسال التحويل إلى سارة علي', 'Couldn’t export. Try again.': 'تعذّر التصدير. حاول مجددًا.',
  'No transactions yet': 'لا توجد معاملات بعد', 'When customers pay with areeba, their payments show up here in real time.': 'عندما يدفع العملاء عبر areeba، تظهر مدفوعاتهم هنا فورًا.',
  'No matches for “Downtown”': 'لا نتائج لـ «وسط المدينة»', 'Check the spelling or clear the filters.': 'تحقق من الإملاء أو امسح عوامل التصفية.', 'Clear filters': 'مسح عوامل التصفية',
  // Data display
  'Green Grocer': 'البقالة الخضراء', 'G': 'ب', 'S': 'س', 'Today, 14:32 · Visa •• 4021': 'اليوم، 14:32 · فيزا •• 4021', 'Sara Ali': 'سارة علي', 'SA': 'س ع',
  'Yesterday · Transfer in': 'أمس · تحويل وارد', 'StreamBox': 'ستريم بوكس', 'N': 'ن', '12 Nov · Subscription': '12 نوفمبر · اشتراك',
  'Recent transactions': 'أحدث المعاملات', 'Date': 'التاريخ', 'Customer': 'العميل', 'Status': 'الحالة',
  'Karim Hassan': 'كريم حسن', 'Nour Saleh': 'نور صالح', '16 Nov, 14:32': '16 نوفمبر، 14:32', '16 Nov, 11:05': '16 نوفمبر، 11:05', '15 Nov, 19:47': '15 نوفمبر، 19:47',
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
  'Green Grocer · Main branch': 'البقالة الخضراء · الفرع الرئيسي',
  // Overlays
  'Freeze this card?': 'تجميد هذه البطاقة؟', 'Payments will be declined until you unfreeze it.': 'سيتم رفض المدفوعات حتى تقوم بإلغاء التجميد.',
  'Payments with Visa ending 4021 will be declined until you unfreeze it. You can do this anytime.': 'سيتم رفض المدفوعات ببطاقة فيزا المنتهية بـ 4021 حتى تقوم بإلغاء التجميد. يمكنك ذلك في أي وقت.',
  'Open dialog': 'فتح النافذة', 'Open sheet': 'فتح اللوحة',
  // Round 2 app components
  'A': 'أ',
  'T': 'ت',
  'O': 'أ',
  'KH': 'ك ح',
  'MA': 'م أ',
  'Mobile One': 'موبايل 1', 'M1': 'م1',
  'Mobile Two': 'موبايل 2', 'M2': 'م2',
  'Home internet': 'إنترنت المنزل', 'H': 'إ',
  'Recharge vouchers': 'قسائم شحن',
  'Internet and landline': 'الإنترنت والهاتف الثابت',
  'Gift cards': 'بطاقات هدايا',
  'Streaming and games': 'البث والألعاب',
  'Verification code': 'رمز التحقق',
  'The code expires in 2:00.': 'تنتهي صلاحية الرمز خلال 2:00.',
  'That code is not right. Check the SMS and try again.': 'الرمز غير صحيح. راجع الرسالة وحاول مجددًا.',
  'Wrong passcode. 2 tries left.': 'رمز الدخول غير صحيح. تبقّى 2 محاولات.',
  'Maya Amin sent you $100.00': 'أرسل لك مايا أمين ' + L('$100.00'),
  'Note: Dinner on Friday': 'ملاحظة: عشاء يوم الجمعة',
  'Decline': 'رفض',
  'Accept': 'قبول',
  'You accepted $100.00 from Maya Amin': 'قبلت ' + L('$100.00') + ' من مايا أمين',
  'Accepted': 'مقبول',
  'Transfer of $300.00 to Ziad Khalil returned': 'أُعيد تحويل ' + L('$300.00') + ' إلى زياد خليل',
  'It passed your 3-day limit, so it was declined and the money is back on your card.': 'تجاوز حدّك لثلاثة أيام، لذا رُفض وأُعيد المبلغ إلى بطاقتك.',
  'Recharge code': 'رمز الشحن',
  'Volume': 'الحجم',
  'vs October': 'مقارنة بأكتوبر',
  'Refunds': 'المبالغ المستردة',
  // App components (areeba pay patterns)
  'Share receipt': 'مشاركة الإيصال',
  'Report a problem': 'الإبلاغ عن مشكلة',
  'Card actions': 'إجراءات البطاقة',
  'Notifications, 2 unread': 'الإشعارات، 2 غير مقروءة',
  'Back': 'رجوع',
  'Download statement': 'تنزيل كشف الحساب',
  'Close': 'إغلاق',
  'Hide balance': 'إخفاء الرصيد',
  'Top up': 'شحن',
  'Send': 'إرسال',
  'Lock': 'قفل',
  'More': 'المزيد',
  'Min $20 · Max $2,500': 'الحد الأدنى ' + L('$20') + ' · الحد الأقصى ' + L('$2,500'),
  'The maximum top up is $2,500.': 'الحد الأقصى للشحن هو ' + L('$2,500') + '.',
  'From this card': 'من هذه البطاقة',
  'Supplementary': 'بطاقة إضافية',
  'Money in': 'الوارد',
  'Money out': 'الصادر',
  '1–30 Nov': '1–30 نوفمبر',
  'Search transactions': 'البحث في المعاملات',
  'Search by merchant or name': 'ابحث باسم التاجر أو الشخص',
  'Top up successful': 'تم الشحن بنجاح',
  'You added $100.00 to card •••• 1395.': 'أضفت ' + L('$100.00') + ' إلى البطاقة ' + L('•••• 1395') + '.',
  'Top up your card or use another card, then try again.': 'اشحن بطاقتك أو استخدم بطاقة أخرى، ثم حاول مجددًا.',
  'Total': 'المجموع',
  'From card': 'من البطاقة',
  'To card': 'إلى البطاقة',
  'Transaction fee': 'رسوم المعاملة',
  'Free': 'مجاني',
  'Original amount': 'المبلغ الأصلي',
  'Type': 'النوع',
  'Online': 'عبر الإنترنت',
  'Account settings': 'إعدادات الحساب',
  'My areeba cards': 'بطاقات areeba الخاصة بي',
  'My beneficiaries': 'المستفيدون',
  'Spending limit': 'حد الإنفاق',
  '$2,500 a day': L('$2,500') + ' يوميًا',
  'Notifications': 'الإشعارات',
  'Email notifications': 'إشعارات البريد الإلكتروني',
  'SMS notifications': 'الرسائل النصية',
  'Every payment and transfer': 'كل دفعة وتحويل',
  'About areeba pay': 'عن areeba pay',
  'Sign out': 'تسجيل الخروج',
  'Activity': 'النشاط',
  'To •••• 1395': 'إلى ' + L('•••• 1395'),
  'My cards': 'بطاقاتي',
  'Lock card': 'قفل البطاقة',
  'View PIN': 'عرض الرمز السري',
  'Mark as favourite': 'تعيين كمفضلة',
  'View card info': 'معلومات البطاقة',
  'Report stolen or missing': 'الإبلاغ عن سرقة أو فقدان',
  'Passcode': 'رمز الدخول',
  'Face ID': 'بصمة الوجه',
  'Security': 'الأمان',
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
