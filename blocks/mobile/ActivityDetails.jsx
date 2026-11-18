/**
 * Activity details: one transaction as a bottom sheet: amount, merchant, the facts, and what you can do.
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
const { AppHeader, IconButton, DetailList, Badge, Button, ActionBar, Alert, icons } = window.Areeba;

const COPY = {
  en: {
    title: 'Activity details', close: 'Close', merchant: 'StreamBox, online', date: '21 Nov 2026, 12:04', card: 'Card', original: 'Original amount',
    status: 'Status', category: 'Category', type: 'Type', reason: 'Reason', share: 'Share receipt', claim: 'Report a problem',
    pending: 'Pending', declined: 'Declined', entertainment: 'Entertainment', online: 'Online', insufficient: 'Insufficient balance',
    declinedTitle: 'Payment declined', declinedBody: 'Top up your card or use another card, then try again.',
  },
  ar: {
    title: 'تفاصيل المعاملة', close: 'إغلاق', merchant: 'ستريم بوكس، عبر الإنترنت', date: '21 نوفمبر 2026، 12:04', card: 'البطاقة', original: 'المبلغ الأصلي',
    status: 'الحالة', category: 'الفئة', type: 'النوع', reason: 'السبب', share: 'مشاركة الإيصال', claim: 'الإبلاغ عن مشكلة',
    pending: 'قيد الانتظار', declined: 'مرفوض', entertainment: 'ترفيه', online: 'عبر الإنترنت', insufficient: 'رصيد غير كافٍ',
    declinedTitle: 'تم رفض الدفع', declinedBody: 'اشحن بطاقتك أو استخدم بطاقة أخرى، ثم حاول مجددًا.',
  },
};

export default function ActivityDetails({ status = 'pending' }) {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  const declined = status === 'declined';
  return (
    <div className="ar-screen">
      <AppHeader variant="modal" title={t.title} end={<IconButton icon="close" label={t.close} />} />
      <main className="ar-screen-body">
        <div className="ar-balance">
          <div className="ar-balance-amount" dir="ltr">−$73.99</div>
          <div className="body">{t.merchant}</div>
          <div className="ar-screen-meta">{t.date}</div>
        </div>
        {declined && <Alert tone="danger" title={t.declinedTitle}>{t.declinedBody}</Alert>}
        <DetailList items={[
          { label: t.card, value: '•••• 9803', ltr: true },
          { label: t.original, value: '€70.00', ltr: true },
          { label: t.status, value: <Badge tone={declined ? 'danger' : 'warning'} dot>{declined ? t.declined : t.pending}</Badge> },
          ...(declined ? [{ label: t.reason, value: t.insufficient }] : []),
          { label: t.category, value: <Badge tone="info" icon="star">{t.entertainment}</Badge> },
          { label: t.type, value: <Badge icon="globe">{t.online}</Badge> },
        ]} />
      </main>
      <ActionBar stacked>
        <Button><icons.share width={20} height={20} />{t.share}</Button>
        <Button variant="secondary">{t.claim}</Button>
      </ActionBar>
    </div>
  );
}
