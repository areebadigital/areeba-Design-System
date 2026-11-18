/**
 * Merchant dashboard, Transactions: key numbers for the period, volume over time, and the transactions table
 * with search, filters, export and pages. For areeba's SaaS products (merchant and bank portals).
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
import { useState } from 'react';

const { Sidebar, SearchField, FilterChip, Button, StatCard, LineChart, DataTable, Pagination, Badge, icons } = window.Areeba;

const COPY = {
  en: {
    title: 'Transactions', period: '1–30 Nov 2026', store: 'All stores', export: 'Export CSV', search: 'Search transactions', placeholder: 'Reference, customer or card',
    status: ['Completed', 'Pending', 'Declined'], vol: 'Volume', count: 'Transactions', avg: 'Average ticket', refunds: 'Refunds', vsLast: 'vs October',
    chart: 'Daily volume', card: 'Card', qr: 'QR', table: 'Latest transactions', cols: ['Reference', 'Date', 'Customer', 'Status', 'Amount'], empty: 'No transactions match these filters.',
    customers: ['Rami Khoury', 'Lina Haddad', 'Omar Saad', 'Maya Nassar', 'Karim Aoun'], dates: ['30 Nov, 14:32', '30 Nov, 11:05', '29 Nov, 19:47', '29 Nov, 16:20', '29 Nov, 09:12'],
    nav: ['Overview', 'Transactions', 'Payouts', 'Stores', 'Reports', 'Settings'], footer: 'Spinneys Merchant · Beirut', days: ['1 Nov', '8 Nov', '15 Nov', '22 Nov', '30 Nov'],
  },
  ar: {
    title: 'المعاملات', period: '1–30 نوفمبر 2026', store: 'كل المتاجر', export: 'تصدير CSV', search: 'البحث في المعاملات', placeholder: 'المرجع أو العميل أو البطاقة',
    status: ['مكتمل', 'قيد الانتظار', 'مرفوض'], vol: 'الحجم', count: 'المعاملات', avg: 'متوسط الفاتورة', refunds: 'المبالغ المستردة', vsLast: 'مقارنة بأكتوبر',
    chart: 'الحجم اليومي', card: 'بطاقة', qr: 'QR', table: 'أحدث المعاملات', cols: ['المرجع', 'التاريخ', 'العميل', 'الحالة', 'المبلغ'], empty: 'لا توجد معاملات تطابق عوامل التصفية.',
    customers: ['رامي خوري', 'لينا حداد', 'عمر سعد', 'مايا نصار', 'كريم عون'], dates: ['30 نوفمبر، 14:32', '30 نوفمبر، 11:05', '29 نوفمبر، 19:47', '29 نوفمبر، 16:20', '29 نوفمبر، 09:12'],
    nav: ['نظرة عامة', 'المعاملات', 'المدفوعات', 'المتاجر', 'التقارير', 'الإعدادات'], footer: 'سبينيس للتجار · بيروت', days: ['1 نوفمبر', '8 نوفمبر', '15 نوفمبر', '22 نوفمبر', '30 نوفمبر'],
  },
};
const ROWS = [['txn_7Hq2LmA9', 0, '$1,250.00'], ['txn_3Kd8PwQ1', 1, '$89.90'], ['txn_9Zr4TbE6', 2, '$420.00'], ['txn_5Ns1XcV3', 0, '$64.30'], ['txn_2Lp7WqR8', 0, '$212.75']];
const TONES = ['success', 'warning', 'danger'];

export default function Transactions() {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  const [only, setOnly] = useState(null);
  const [page, setPage] = useState(1);
  const rows = ROWS.map(([id, s, amount], i) => ({ id, date: t.dates[i], customer: t.customers[i], status: t.status[s], tone: TONES[s], amount, s }))
    .filter((r) => only === null || r.s === only);
  return (
    <div className="ar-app">
      <Sidebar value="tx" footer={t.footer} items={[
        { value: 'home', label: t.nav[0], icon: 'home' }, { value: 'tx', label: t.nav[1], icon: 'list', count: '1,284' }, { value: 'payouts', label: t.nav[2], icon: 'send' },
        { value: 'stores', label: t.nav[3], icon: 'store' }, { value: 'reports', label: t.nav[4], icon: 'chart' }, { value: 'settings', label: t.nav[5], icon: 'settings' }]} />
      <main className="ar-app-main">
        <div className="ar-app-head">
          <h1 className="ar-app-title">{t.title}</h1>
          <div className="ar-app-tools">
            <FilterChip label={t.period} hasPopup="dialog" />
            <FilterChip label={t.store} hasPopup="listbox" />
            <Button variant="secondary"><icons.download width={18} height={18} />{t.export}</Button>
          </div>
        </div>
        <div className="ar-stats">
          <StatCard label={t.vol} value="$186,420" change={{ direction: 'up', value: '+12.4%', label: t.vsLast, good: true }} />
          <StatCard label={t.count} value="1,284" change={{ direction: 'up', value: '+8.1%', label: t.vsLast, good: true }} />
          <StatCard label={t.avg} value="$145.19" change={{ direction: 'up', value: '+3.9%', label: t.vsLast }} />
          <StatCard label={t.refunds} value="$2,310" change={{ direction: 'down', value: '−18%', label: t.vsLast, good: true }} />
        </div>
        <LineChart title={t.chart} height={220} series={[{ key: 'card', label: t.card }, { key: 'qr', label: t.qr }]}
          format={(v) => '$' + (v >= 1000 ? v / 1000 + 'k' : v)}
          data={[{ label: t.days[0], card: 4200, qr: 900 }, { label: t.days[1], card: 5100, qr: 1400 }, { label: t.days[2], card: 4800, qr: 1700 }, { label: t.days[3], card: 6300, qr: 2100 }, { label: t.days[4], card: 7100, qr: 2600 }]} />
        <section className="ar-screen-section" aria-label={t.table}>
          <div className="ar-app-head">
            <div className="ar-app-search"><SearchField label={t.search} placeholder={t.placeholder} /></div>
            <div className="ar-app-tools">
              {t.status.map((s, i) => <FilterChip key={s} label={s} selected={only === i} onClick={() => setOnly(only === i ? null : i)} />)}
            </div>
          </div>
          <DataTable caption={t.table} empty={t.empty} rows={rows} columns={[
            { key: 'id', label: t.cols[0], mono: true }, { key: 'date', label: t.cols[1] }, { key: 'customer', label: t.cols[2] },
            { key: 'status', label: t.cols[3], render: (r) => <Badge tone={r.tone} dot>{r.status}</Badge> },
            { key: 'amount', label: t.cols[4], align: 'right', numeric: true },
          ]} />
          <Pagination page={page} total={1284} pageSize={25} onChange={setPage} />
        </section>
      </main>
    </div>
  );
}
