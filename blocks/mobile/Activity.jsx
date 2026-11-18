/**
 * Activity: search, filters, and transactions grouped by day with each day's total.
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
import { useState } from 'react';

const { AppHeader, IconButton, SearchField, FilterChip, List, ListItem, Badge, EmptyState } = window.Areeba;

const COPY = {
  en: {
    title: 'Activity', back: 'Back', download: 'Download statement', search: 'Search transactions', placeholder: 'Search by merchant or name',
    period: '1–30 Nov', card: '•••• 9803', moneyIn: 'Money in', declined: 'Declined', none: 'No transactions yet', noneBody: 'Activate your card to see your latest transactions here.',
    days: [
      { name: 'Today', total: '−$28.50', rows: [['S', 'Spinneys', '15:54 · Visa •• 9803', '−$20.90'], ['RK', 'Rami Khoury', '12:10 · Transfer in', '+$12.40'], ['T', 'Toters', '09:02 · Online', '−$20.00']] },
      { name: 'Yesterday', total: '−$73.99', rows: [['N', 'Netflix', '21:04 · Subscription', '−$73.99', 'declined']] },
      { name: '15 November', total: '+$1,180.00', rows: [['A', 'areeba', '08:00 · Salary', '+$1,250.00'], ['F', 'Fuel station', '07:41 · Visa •• 9803', '−$70.00']] },
    ],
  },
  ar: {
    title: 'النشاط', back: 'رجوع', download: 'تنزيل كشف الحساب', search: 'البحث في المعاملات', placeholder: 'ابحث باسم التاجر أو الشخص',
    period: '1–30 نوفمبر', card: '•••• 9803', moneyIn: 'الوارد', declined: 'مرفوض', none: 'لا توجد معاملات بعد', noneBody: 'فعّل بطاقتك لترى آخر معاملاتك هنا.',
    days: [
      { name: 'اليوم', total: '−$28.50', rows: [['س', 'سبينيس', '15:54 · فيزا •• 9803', '−$20.90'], ['ر خ', 'رامي خوري', '12:10 · تحويل وارد', '+$12.40'], ['ت', 'توترز', '09:02 · عبر الإنترنت', '−$20.00']] },
      { name: 'أمس', total: '−$73.99', rows: [['ن', 'نتفليكس', '21:04 · اشتراك', '−$73.99', 'declined']] },
      { name: '15 نوفمبر', total: '+$1,180.00', rows: [['ع', 'areeba', '08:00 · راتب', '+$1,250.00'], ['م', 'محطة وقود', '07:41 · فيزا •• 9803', '−$70.00']] },
    ],
  },
};

export default function Activity({ empty = false }) {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  const [moneyIn, setMoneyIn] = useState(false);
  const days = t.days.map((d) => ({ ...d, rows: d.rows.filter((r) => !moneyIn || r[3].startsWith('+')) })).filter((d) => d.rows.length);
  return (
    <div className="ar-screen">
      <AppHeader title={t.title}
        start={<IconButton icon="back" label={t.back} />}
        end={<IconButton icon="download" label={t.download} />} />
      <main className="ar-screen-body">
        <div className="ar-screen-section">
          <SearchField label={t.search} placeholder={t.placeholder} />
          <div className="ar-screen-scroll">
            <FilterChip label={t.period} hasPopup="dialog" />
            <FilterChip label={t.card} hasPopup="listbox" />
            <FilterChip label={t.moneyIn} selected={moneyIn} onClick={() => setMoneyIn(!moneyIn)} />
          </div>
        </div>
        {empty ? <EmptyState level={2} title={t.none}>{t.noneBody}</EmptyState> : days.map((d) => (
          <section key={d.name} className="ar-screen-section" aria-label={d.name}>
            <h2 className="ar-screen-heading">{d.name} <small dir="ltr">{d.total}</small></h2>
            <List>
              {d.rows.map(([lead, title, sub, amount, state]) => (
                <ListItem key={title} leading={lead} title={title} subtitle={sub} amount={amount}
                  trailing={state === 'declined' ? <Badge tone="danger">{t.declined}</Badge> : undefined} />
              ))}
            </List>
          </section>
        ))}
      </main>
    </div>
  );
}
