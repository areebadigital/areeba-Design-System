import { A, h, row, stack } from './areeba.js';

/* Every component with real Arabic copy, mirrored. The Direction toolbar switch mirrors any other
   story too; this page exists so RTL is checked with Arabic glyphs, numbers inside Arabic text and
   longer strings, not just flipped English. */
export default {
  title: 'Guides/Right-to-left',
  tags: ['!autodocs'],
  globals: { dir: 'rtl' },
  parameters: { docs: { description: { component: 'Arabic is a first-class language: every layout mirrors. Use the Direction switch in the toolbar to mirror any story.' } } },
};

const icons = A.icons;
const Section = (title, ...kids) => h('section', { style: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 } },
  h('h2', { className: 'h3', style: { margin: 0, color: 'var(--ink)' } }, title), ...kids);

const transactions = () => h(A.List, null,
  h(A.ListItem, { leading: 'س', title: 'سبينيس', subtitle: 'اليوم، 14:32 · فيزا •• 4021', amount: '−$42.00' }),
  h(A.ListItem, { leading: 'ر خ', title: 'رامي خوري', subtitle: 'أمس · تحويل وارد', amount: '+$1,250.00' }),
  h(A.ListItem, { leading: 'ن', title: 'نتفليكس', subtitle: '12 نوفمبر · اشتراك', amount: '−$15.99', trailing: h(A.Badge, { tone: 'warning' }, 'قيد الانتظار') }));

export const Actions = {
  render: () => stack(
    Section('الأزرار',
      row(h(A.Button, null, h(icons.send, { width: 20, height: 20, 'aria-hidden': true }), 'إرسال الأموال'), h(A.Button, { variant: 'secondary' }, 'تصدير CSV'), h(A.Button, { variant: 'ghost' }, 'إلغاء'), h(A.Button, { variant: 'danger' }, 'تجميد البطاقة')))),
};

export const Inputs = {
  render: () => h('div', { style: { maxWidth: 360 } }, stack(
    h(A.TextField, { label: 'المبلغ', prefix: '$', inputMode: 'decimal', placeholder: '0.00', hint: `المتاح: ${A.ltr('$12,480.50')}` }),
    h(A.TextField, { label: 'المبلغ', prefix: '$', defaultValue: '15,000.00', error: `أدخل مبلغًا حتى ${A.ltr('$12,480.50')}.` }),
    h(A.Select, { label: 'العملة', defaultValue: 'usd', options: [{ value: 'usd', label: 'USD · دولار أمريكي' }, { value: 'lbp', label: 'LBP · ليرة لبنانية' }, { value: 'eur', label: 'EUR · يورو' }, { value: 'gbp', label: 'GBP · جنيه إسترليني', disabled: true }] }),
    h(A.DatePicker, { label: 'تاريخ التسوية', defaultValue: new Date(2026, 10, 20), today: new Date(2026, 10, 17) }),
    h(A.Checkbox, { label: 'أرسل لي كشف حساب شهري', hint: 'يُرسل في الأول من كل شهر', defaultChecked: true }),
    h(A.Switch, { label: 'تجميد البطاقة', defaultChecked: true }))),
};

export const OpenControls = {
  name: 'Open select and calendar',
  render: () => h('div', { style: { display: 'flex', gap: 24, flexWrap: 'wrap', minHeight: 440 } },
    h('div', { style: { width: 300 } }, h(A.Select, { label: 'العملة', defaultValue: 'usd', defaultOpen: true, options: [{ value: 'usd', label: 'USD · دولار أمريكي' }, { value: 'lbp', label: 'LBP · ليرة لبنانية' }, { value: 'eur', label: 'EUR · يورو' }] })),
    h('div', { style: { width: 300 } }, h(A.DatePicker, { label: 'تاريخ التسوية', defaultValue: new Date(2026, 10, 20), today: new Date(2026, 10, 17), defaultOpen: true }))),
};

export const Status = {
  render: () => h('div', { style: { maxWidth: 560 } }, stack(
    row(h(A.Badge, { tone: 'success', dot: true }, 'مدفوع'), h(A.Badge, { tone: 'warning', dot: true }, 'قيد الانتظار'), h(A.Badge, { tone: 'danger', dot: true }, 'مرفوض'), h(A.Badge, { tone: 'brand' }, 'جديد')),
    h(A.Alert, { tone: 'danger', title: 'تم رفض الدفع' }, 'الرصيد غير كافٍ. اشحن حسابك أو استخدم بطاقة أخرى.'),
    h(A.Alert, { tone: 'success', title: 'تم إرسال التحويل' }, `سيصل مبلغ ${A.ltr('$250.00')} إلى رامي خوري خلال دقائق.`),
    h(A.Toast, { tone: 'success', action: 'تراجع' }, 'تم تجميد البطاقة'),
    h(A.EmptyState, { title: 'لا توجد معاملات بعد', action: h(A.Button, { variant: 'secondary' }, 'مسح عوامل التصفية') }, 'عندما يدفع العملاء عبر areeba، تظهر مدفوعاتهم هنا فورًا.'))),
};

export const Mobile = {
  name: 'Mobile screen',
  render: () => h('div', { style: { width: 375, border: '1px solid var(--line)', borderRadius: 24, overflow: 'hidden', background: 'var(--surface-sunken)' } },
    h('div', { style: { padding: 16, display: 'flex', flexDirection: 'column', gap: 16 } },
      h('div', { className: 'h2', style: { color: 'var(--ink)' } }, 'مرحبًا، رامي'),
      h(A.PaymentCard, { last4: '4021', holder: 'Rami Khoury', expiry: '09/29', network: 'VISA' }),
      h(A.Tabs, { label: 'الفترة', defaultValue: 'w', items: [{ value: 'd', label: 'يوم' }, { value: 'w', label: 'أسبوع' }, { value: 'm', label: 'شهر' }, { value: 'y', label: 'سنة' }] }),
      transactions()),
    h(A.TabBar, { value: 'home', items: [{ value: 'home', label: 'الرئيسية', icon: 'home' }, { value: 'cards', label: 'البطاقات', icon: 'card' }, { value: 'pay', label: 'الدفع', icon: 'send' }, { value: 'insights', label: 'التحليلات', icon: 'chart' }, { value: 'me', label: 'الملف', icon: 'user' }] })),
};

const columns = [
  { key: 'id', label: 'المرجع', mono: true }, { key: 'date', label: 'التاريخ' }, { key: 'customer', label: 'العميل' },
  { key: 'status', label: 'الحالة', render: (r) => h(A.Badge, { tone: r.tone, dot: true }, r.status) },
  { key: 'amount', label: 'المبلغ', align: 'right', numeric: true },
];
const rows = [
  { id: 'txn_7Hq2LmA9', date: '16 نوفمبر، 14:32', customer: 'رامي خوري', status: 'مكتمل', tone: 'success', amount: '$1,250.00' },
  { id: 'txn_3Kd8PwQ1', date: '16 نوفمبر، 11:05', customer: 'لينا حداد', status: 'قيد الانتظار', tone: 'warning', amount: '$89.90' },
  { id: 'txn_9Zr4TbE6', date: '15 نوفمبر، 19:47', customer: 'عمر سعد', status: 'مرفوض', tone: 'danger', amount: '$420.00' },
];

export const Dashboard = {
  name: 'SaaS screen',
  parameters: { layout: 'fullscreen' },
  render: () => h('div', { style: { display: 'flex', minHeight: 720, background: 'var(--surface-sunken)' } },
    h(A.Sidebar, { value: 'tx', footer: 'سبينيس للتجار · بيروت', items: [{ value: 'home', label: 'نظرة عامة', icon: 'home' }, { value: 'tx', label: 'المعاملات', icon: 'list', count: '1,284' }, { value: 'cards', label: 'البطاقات', icon: 'card' }, { value: 'payouts', label: 'المدفوعات', icon: 'send' }, { value: 'stores', label: 'المتاجر', icon: 'store' }, { value: 'reports', label: 'التقارير', icon: 'chart' }, { value: 'settings', label: 'الإعدادات', icon: 'settings' }] }),
    h('main', { style: { flex: 1, minWidth: 0, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 } },
      h('div', { className: 'h1', style: { color: 'var(--ink)' } }, 'المعاملات'),
      h(A.LineChart, { title: 'حجم المدفوعات', height: 220, series: [{ key: 'card', label: 'بطاقة' }, { key: 'qr', label: 'QR' }, { key: 'link', label: 'رابط دفع' }], format: (v) => '$' + (v >= 1000 ? v / 1000 + 'k' : v),
        data: [{ label: 'يونيو', card: 42000, qr: 12000, link: 6000 }, { label: 'يوليو', card: 46000, qr: 15000, link: 7500 }, { label: 'أغسطس', card: 44000, qr: 19000, link: 9000 }, { label: 'سبتمبر', card: 51000, qr: 23000, link: 9500 }, { label: 'أكتوبر', card: 56000, qr: 27500, link: 12000 }, { label: 'نوفمبر', card: 61000, qr: 33000, link: 14500 }] }),
      h(A.BarChart, { title: 'المعاملات حسب اليوم', height: 200, series: [{ key: 'a', label: 'هذا الأسبوع' }, { key: 'b', label: 'الأسبوع الماضي' }],
        data: [{ label: 'الاثنين', a: 820, b: 760 }, { label: 'الثلاثاء', a: 910, b: 880 }, { label: 'الأربعاء', a: 870, b: 900 }, { label: 'الخميس', a: 1040, b: 950 }, { label: 'الجمعة', a: 1260, b: 1180 }, { label: 'السبت', a: 1420, b: 1310 }, { label: 'الأحد', a: 690, b: 720 }] }),
      h(A.DataTable, { caption: 'أحدث المعاملات', columns, rows }))),
};

export const DialogSheet = {
  name: 'Dialog',
  parameters: { layout: 'fullscreen' },
  render: () => h('div', { style: { minHeight: 400 } }, h(A.Dialog, { open: true, tone: 'danger', title: 'تجميد هذه البطاقة؟',
    actions: [h(A.Button, { key: 'c', variant: 'ghost' }, 'إلغاء'), h(A.Button, { key: 'f', variant: 'danger' }, 'تجميد البطاقة')] },
    h('p', null, 'سيتم رفض المدفوعات حتى تقوم بإلغاء التجميد.'))),
};
