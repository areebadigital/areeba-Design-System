/**
 * Merchant dashboard, Payouts: the next payout and where it goes, the payout schedule (change it in a dialog),
 * and the payout history with pages. For areeba's SaaS products (merchant and bank portals).
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
import { useEffect, useState } from 'react';

const { Sidebar, FilterChip, Button, Panel, DataTable, Pagination, DetailList, Badge, Dialog, Select, Toast, icons } = window.Areeba;

const COPY = {
  en: {
    title: 'Payouts', lead: 'Money from your sales, sent to your bank account.', period: 'Last 90 days', statement: 'Download statement',
    history: 'Payout history', cols: ['Date', 'Reference', 'Transactions', 'Status', 'Amount'], status: ['Paid', 'In transit', 'Failed'],
    next: 'Next payout', amount: 'Amount', date: 'Date', dateValue: '1 Dec 2026, 18:00', account: 'Account', bank: 'Bank', bankName: 'Bank Audi',
    schedule: 'Payout schedule', change: 'Change', frequency: 'Frequency', cutoff: 'Cut-off time', minimum: 'Minimum payout',
    freq: { daily: 'Every business day', weekly: 'Every Monday', monthly: 'On the 1st of the month' },
    dialogTitle: 'Change payout schedule', dialogBody: 'Payments before 18:00 Beirut time are included in that day’s payout.', cancel: 'Cancel', save: 'Save schedule', saved: 'Payout schedule saved',
    months: ['30 Nov', '29 Nov', '28 Nov', '27 Nov', '26 Nov', '25 Nov', '22 Nov', '21 Nov'],
    nav: ['Overview', 'Transactions', 'Payouts', 'Stores', 'Reports', 'Settings'], footer: 'Spinneys Merchant · Beirut',
  },
  ar: {
    title: 'المدفوعات', lead: 'أموال مبيعاتك، تُرسل إلى حسابك المصرفي.', period: 'آخر 90 يومًا', statement: 'تنزيل الكشف',
    history: 'سجل المدفوعات', cols: ['التاريخ', 'المرجع', 'المعاملات', 'الحالة', 'المبلغ'], status: ['مدفوع', 'قيد التحويل', 'فشل'],
    next: 'الدفعة التالية', amount: 'المبلغ', date: 'التاريخ', dateValue: '1 ديسمبر 2026، 18:00', account: 'الحساب', bank: 'المصرف', bankName: 'بنك عودة',
    schedule: 'جدول المدفوعات', change: 'تغيير', frequency: 'التكرار', cutoff: 'وقت الإقفال', minimum: 'الحد الأدنى للدفعة',
    freq: { daily: 'كل يوم عمل', weekly: 'كل يوم اثنين', monthly: 'في الأول من كل شهر' },
    dialogTitle: 'تغيير جدول المدفوعات', dialogBody: 'تُضاف المدفوعات قبل الساعة 18:00 بتوقيت بيروت إلى دفعة ذلك اليوم.', cancel: 'إلغاء', save: 'حفظ الجدول', saved: 'تم حفظ جدول المدفوعات',
    months: ['30 نوفمبر', '29 نوفمبر', '28 نوفمبر', '27 نوفمبر', '26 نوفمبر', '25 نوفمبر', '22 نوفمبر', '21 نوفمبر'],
    nav: ['نظرة عامة', 'المعاملات', 'المدفوعات', 'المتاجر', 'التقارير', 'الإعدادات'], footer: 'سبينيس للتجار · بيروت',
  },
};
const ROWS = [['po_8Fk2Qa', 214, 1, '$12,480.00'], ['po_7Lm9Rb', 198, 0, '$11,032.75'], ['po_6Xc4Tn', 176, 0, '$9,912.40'], ['po_5Hv1Pw', 231, 2, '$13,204.10'],
  ['po_4Jd7Ks', 189, 0, '$10,488.00'], ['po_3Bq5Mz', 162, 0, '$8,970.25'], ['po_2Ny8Ge', 240, 0, '$14,115.60'], ['po_1Wr3Vu', 205, 0, '$11,760.90']];
const TONES = ['success', 'info', 'danger'];

export default function Payouts() {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  const [page, setPage] = useState(1);
  const [freq, setFreq] = useState('daily');
  const [draft, setDraft] = useState('daily');
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const rows = ROWS.map(([id, n, s, amount], i) => ({ id, date: t.months[i], n, status: t.status[s], tone: TONES[s], amount }));
  useEffect(() => { if (!saved) return undefined; const id = setTimeout(() => setSaved(false), 4000); return () => clearTimeout(id); }, [saved]);
  const save = () => { setFreq(draft); setOpen(false); setSaved(true); };
  return (
    <div className="ar-app">
      <Sidebar value="payouts" footer={t.footer} items={[
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
            <Button variant="secondary"><icons.download width={18} height={18} />{t.statement}</Button>
          </div>
        </div>
        {saved && <Toast tone="success">{t.saved}</Toast>}
        <div className="ar-app-split">
          <Panel title={t.history} flush footer={<Pagination page={page} total={1960} pageSize={8} onChange={setPage} />}>
            <DataTable rows={rows} columns={[
              { key: 'date', label: t.cols[0] }, { key: 'id', label: t.cols[1], mono: true }, { key: 'n', label: t.cols[2], align: 'right', numeric: true },
              { key: 'status', label: t.cols[3], render: (r) => <Badge tone={r.tone} dot>{r.status}</Badge> },
              { key: 'amount', label: t.cols[4], align: 'right', numeric: true },
            ]} />
          </Panel>
          <div className="ar-app-col">
            <Panel title={t.next}>
              <DetailList items={[
                { label: t.amount, value: '$12,480.00', ltr: true, emphasis: true },
                { label: t.date, value: t.dateValue },
                { label: t.bank, value: t.bankName },
                { label: t.account, value: 'LB62 0999 •••• 4821', ltr: true },
              ]} />
            </Panel>
            <Panel title={t.schedule} actions={<Button variant="ghost" size="sm" onClick={() => { setDraft(freq); setOpen(true); }}>{t.change}</Button>}>
              <DetailList items={[
                { label: t.frequency, value: t.freq[freq] },
                { label: t.cutoff, value: '18:00', ltr: true },
                { label: t.minimum, value: '$50.00', ltr: true },
              ]} />
            </Panel>
          </div>
        </div>
      </main>
      <Dialog open={open} onClose={() => setOpen(false)} title={t.dialogTitle}
        actions={<><Button variant="secondary" onClick={() => setOpen(false)}>{t.cancel}</Button><Button onClick={save}>{t.save}</Button></>}>
        <p>{t.dialogBody}</p>
        <Select label={t.frequency} value={draft} onChange={setDraft} options={['daily', 'weekly', 'monthly'].map((v) => ({ value: v, label: t.freq[v] }))} />
      </Dialog>
    </div>
  );
}
