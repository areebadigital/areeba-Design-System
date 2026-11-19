/**
 * Merchant dashboard, Overview: what needs attention, the month's key numbers, volume and sales by store,
 * the latest transactions, the next payout and the monthly limit. For areeba's SaaS products (merchant and bank portals).
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
const { Sidebar, FilterChip, Button, Alert, StatCard, LineChart, BarChart, Panel, DataTable, DetailList, Meter, Badge, icons } = window.Areeba;

const COPY = {
  en: {
    title: 'Overview', lead: 'Green Grocer · all stores', period: '1–30 Nov 2026', export: 'Download report',
    alertTitle: 'Verify your business documents', alert: 'Upload your commercial register by 5 December to keep payouts on schedule.', upload: 'Upload documents',
    vol: 'Volume', count: 'Transactions', avg: 'Average ticket', refunds: 'Refunds', vsLast: 'vs October',
    chart: 'Daily volume', card: 'Card', qr: 'QR', days: ['1 Nov', '8 Nov', '15 Nov', '22 Nov', '30 Nov'],
    stores: 'Sales by store', storeNames: ['Downtown', 'Harbour', 'Hillside', 'Old town'], sales: 'Sales',
    latest: 'Latest transactions', viewAll: 'View all', cols: ['Reference', 'Customer', 'Status', 'Amount'], status: ['Completed', 'Pending', 'Declined'],
    customers: ['Sara Ali', 'Karim Hassan', 'Nour Saleh', 'Jad Youssef'],
    next: 'Next payout', nextDesc: 'Sent every business day at 18:00.', amount: 'Amount', date: 'Date', dateValue: '1 Dec 2026', to: 'To', viewPayouts: 'View payouts',
    limit: 'Monthly card limit', limitText: '$186,420 of $250,000', limitHint: 'Resets on 1 December. Ask your bank to raise it.',
    setup: 'Account set-up', setupText: '4 of 5 steps', setupHint: 'Left: verify your business documents.',
    nav: ['Overview', 'Transactions', 'Payouts', 'Stores', 'Reports', 'Settings'], footer: 'Green Grocer · Main branch',
  },
  ar: {
    title: 'نظرة عامة', lead: 'البقالة الخضراء · كل المتاجر', period: '1–30 نوفمبر 2026', export: 'تنزيل التقرير',
    alertTitle: 'وثّق مستندات نشاطك التجاري', alert: 'حمّل السجل التجاري قبل 5 ديسمبر لتبقى المدفوعات في موعدها.', upload: 'تحميل المستندات',
    vol: 'الحجم', count: 'المعاملات', avg: 'متوسط الفاتورة', refunds: 'المبالغ المستردة', vsLast: 'مقارنة بأكتوبر',
    chart: 'الحجم اليومي', card: 'بطاقة', qr: 'QR', days: ['1 نوفمبر', '8 نوفمبر', '15 نوفمبر', '22 نوفمبر', '30 نوفمبر'],
    stores: 'المبيعات حسب المتجر', storeNames: ['وسط المدينة', 'المرفأ', 'التلة', 'البلدة القديمة'], sales: 'المبيعات',
    latest: 'أحدث المعاملات', viewAll: 'عرض الكل', cols: ['المرجع', 'العميل', 'الحالة', 'المبلغ'], status: ['مكتمل', 'قيد الانتظار', 'مرفوض'],
    customers: ['سارة علي', 'كريم حسن', 'نور صالح', 'جاد يوسف'],
    next: 'الدفعة التالية', nextDesc: 'تُرسل كل يوم عمل الساعة 18:00.', amount: 'المبلغ', date: 'التاريخ', dateValue: '1 ديسمبر 2026', to: 'إلى', viewPayouts: 'عرض المدفوعات',
    limit: 'الحد الشهري للبطاقات', limitText: '$186,420 من $250,000', limitHint: 'يُعاد ضبطه في 1 ديسمبر. اطلب من مصرفك رفعه.',
    setup: 'إعداد الحساب', setupText: '4 من 5 خطوات', setupHint: 'المتبقي: توثيق مستندات نشاطك التجاري.',
    nav: ['نظرة عامة', 'المعاملات', 'المدفوعات', 'المتاجر', 'التقارير', 'الإعدادات'], footer: 'البقالة الخضراء · الفرع الرئيسي',
  },
};
const ROWS = [['txn_7Hq2LmA9', 0, '$1,250.00'], ['txn_3Kd8PwQ1', 1, '$89.90'], ['txn_9Zr4TbE6', 2, '$420.00'], ['txn_5Ns1XcV3', 0, '$64.30']];
const TONES = ['success', 'warning', 'danger'];
const money = (v) => '$' + (v >= 1000 ? v / 1000 + 'k' : v);

export default function Overview() {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  const rows = ROWS.map(([id, s, amount], i) => ({ id, customer: t.customers[i], status: t.status[s], tone: TONES[s], amount }));
  return (
    <div className="ar-app">
      <Sidebar value="home" footer={t.footer} items={[
        { value: 'home', label: t.nav[0], icon: 'home' }, { value: 'tx', label: t.nav[1], icon: 'list', count: '1,284' }, { value: 'payouts', label: t.nav[2], icon: 'send' },
        { value: 'stores', label: t.nav[3], icon: 'store' }, { value: 'reports', label: t.nav[4], icon: 'chart' }, { value: 'settings', label: t.nav[5], icon: 'settings' }]} />
      <main className="ar-app-main">
        <div className="ar-app-head">
          <div>
            <h1 className="ar-app-title">{t.title}</h1>
            <p className="ar-app-lead">{t.lead}</p>
          </div>
          <div className="ar-app-tools">
            <FilterChip label={t.period} hasPopup="dialog" />
            <Button variant="secondary"><icons.download width={18} height={18} />{t.export}</Button>
          </div>
        </div>
        <Alert tone="warning" title={t.alertTitle}>{t.alert}</Alert>
        <div className="ar-stats">
          <StatCard label={t.vol} value="$186,420" change={{ direction: 'up', value: '+12.4%', label: t.vsLast, good: true }} />
          <StatCard label={t.count} value="1,284" change={{ direction: 'up', value: '+8.1%', label: t.vsLast, good: true }} />
          <StatCard label={t.avg} value="$145.19" change={{ direction: 'up', value: '+3.9%', label: t.vsLast }} />
          <StatCard label={t.refunds} value="$2,310" change={{ direction: 'down', value: '−18%', label: t.vsLast, good: true }} />
        </div>
        <div className="ar-app-split">
          <div className="ar-app-col">
            <LineChart title={t.chart} height={220} series={[{ key: 'card', label: t.card }, { key: 'qr', label: t.qr }]} format={money}
              data={[{ label: t.days[0], card: 4200, qr: 900 }, { label: t.days[1], card: 5100, qr: 1400 }, { label: t.days[2], card: 4800, qr: 1700 }, { label: t.days[3], card: 6300, qr: 2100 }, { label: t.days[4], card: 7100, qr: 2600 }]} />
            <Panel title={t.latest} flush actions={<Button variant="secondary" size="sm">{t.viewAll}</Button>}>
              <DataTable rows={rows} columns={[
                { key: 'id', label: t.cols[0], mono: true }, { key: 'customer', label: t.cols[1] },
                { key: 'status', label: t.cols[2], render: (r) => <Badge tone={r.tone} dot>{r.status}</Badge> },
                { key: 'amount', label: t.cols[3], align: 'right', numeric: true },
              ]} />
            </Panel>
          </div>
          <div className="ar-app-col">
            <Panel title={t.next} description={t.nextDesc} footer={<Button variant="secondary" size="sm">{t.viewPayouts}</Button>}>
              <DetailList items={[
                { label: t.amount, value: '$12,480.00', ltr: true, emphasis: true },
                { label: t.date, value: t.dateValue },
                { label: t.to, value: 'LB62 •••• 4821', ltr: true },
              ]} />
            </Panel>
            <Panel title={t.limit}>
              <Meter aria-label={t.limit} value={186420} max={250000} valueText={t.limitText} hint={t.limitHint} />
            </Panel>
            <Panel title={t.setup} footer={<Button variant="secondary" size="sm">{t.upload}</Button>}>
              <Meter aria-label={t.setup} value={4} max={5} valueText={t.setupText} hint={t.setupHint} tone="success" />
            </Panel>
            <BarChart title={t.stores} height={200} series={[{ key: 'sales', label: t.sales }]} format={money}
              data={[{ label: t.storeNames[0], sales: 72400 }, { label: t.storeNames[1], sales: 58100 }, { label: t.storeNames[2], sales: 33900 }, { label: t.storeNames[3], sales: 22000 }]} />
          </div>
        </div>
      </main>
    </div>
  );
}
