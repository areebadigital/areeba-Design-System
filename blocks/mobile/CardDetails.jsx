/**
 * Card details: the card, its four actions, card settings and the card's recent activity.
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
const { AppHeader, IconButton, ActionMenu, PaymentCard, QuickActions, QuickAction, SettingsList, SettingsRow, List, ListItem } = window.Areeba;

const COPY = {
  en: {
    title: 'Card details', back: 'Back', more: 'More card actions', lock: 'Lock', pin: 'View PIN', details: 'Details', favourite: 'Favourite',
    rename: 'Rename card', replace: 'Request a replacement', settings: 'More', statement: 'Request statement', statementSub: 'PDF sent to your email',
    payments: 'Payment settings', limits: 'Spending limit', limit: '$2,500 a day', stolen: 'Report stolen or missing', recent: 'Recent card activity', actions: 'Card actions',
    rows: [['SA', 'From Sara Ali', 'Today, 15:54', '+$50.00'], ['ZK', 'To Ziad Khalil', 'Today, 12:10', '−$100.00'], ['S', 'StreamBox', '12 Nov · Subscription', '−$15.99']],
  },
  ar: {
    title: 'تفاصيل البطاقة', back: 'رجوع', more: 'إجراءات إضافية للبطاقة', lock: 'قفل', pin: 'الرمز السري', details: 'التفاصيل', favourite: 'المفضلة',
    rename: 'إعادة تسمية البطاقة', replace: 'طلب بطاقة بديلة', settings: 'المزيد', statement: 'طلب كشف حساب', statementSub: 'يُرسل ملف PDF إلى بريدك',
    payments: 'إعدادات الدفع', limits: 'حد الإنفاق', limit: '$2,500 يوميًا', stolen: 'الإبلاغ عن سرقة أو فقدان', recent: 'آخر نشاط للبطاقة', actions: 'إجراءات البطاقة',
    rows: [['س ع', 'من سارة علي', 'اليوم، 15:54', '+$50.00'], ['ز خ', 'إلى زياد خليل', 'اليوم، 12:10', '−$100.00'], ['س', 'ستريم بوكس', '12 نوفمبر · اشتراك', '−$15.99']],
  },
};

export default function CardDetails() {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  return (
    <div className="ar-screen">
      <AppHeader title={t.title}
        start={<IconButton icon="back" label={t.back} />}
        end={<ActionMenu label={t.more} items={[{ label: t.rename, icon: 'card' }, { label: t.replace, icon: 'transfer' }]} />} />
      <main className="ar-screen-body">
        <PaymentCard last4="1395" holder="Sara Ali" expiry="09/29" network="VISA" variant="brand" fluid />
        <QuickActions label={t.actions}>
          <QuickAction icon="lock" label={t.lock} />
          <QuickAction icon="pin" label={t.pin} />
          <QuickAction icon="card" label={t.details} />
          <QuickAction icon="star" label={t.favourite} />
        </QuickActions>
        <SettingsList title={t.settings}>
          <SettingsRow icon="doc" label={t.statement} description={t.statementSub} onClick={() => {}} />
          <SettingsRow icon="settings" label={t.payments} onClick={() => {}} />
          <SettingsRow icon="chart" label={t.limits} value={t.limit} onClick={() => {}} />
          <SettingsRow icon="alert" label={t.stolen} tone="danger" onClick={() => {}} />
        </SettingsList>
        <section className="ar-screen-section" aria-labelledby="card-recent">
          <h2 className="ar-screen-heading" id="card-recent">{t.recent}</h2>
          <List>
            {t.rows.map(([lead, title, sub, amount]) => <ListItem key={title} leading={lead} title={title} subtitle={sub} amount={amount} />)}
          </List>
        </section>
      </main>
    </div>
  );
}
