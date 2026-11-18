/**
 * Home: balance, card carousel, quick actions and today's activity.
 * Uses only areeba components (window.Areeba). Copy text lives in COPY, English and Arabic;
 * the page language comes from <html lang>.
 */
const { AppHeader, IconButton, Balance, PaymentCard, PageDots, QuickActions, QuickAction, ActionMenu, List, ListItem, Badge, Button, TabBar, icons } = window.Areeba;

const COPY = {
  en: {
    title: 'My cards', profile: 'Profile', notifications: 'Notifications, 2 unread', topUp: 'Top up', send: 'Send', more: 'More',
    lock: 'Lock card', pin: 'View PIN', favourite: 'Mark as favourite', info: 'View card info', stolen: 'Report stolen or missing',
    today: 'Today’s activity', seeAll: 'See all activity', pending: 'Pending', actions: 'Card actions',
    rows: [['RK', 'Rami Khoury', 'Today, 15:54 · Transfer in', '+$50.00'], ['JD', 'Jean Daw', 'Today, 12:10 · Transfer out', '−$100.00'], ['G', 'Green Grocer', 'Today, 09:32 · Visa •• 1395', '−$20.90']],
    tabs: ['My cards', 'eStore', 'Payments', 'Profile'],
  },
  ar: {
    title: 'بطاقاتي', profile: 'الملف الشخصي', notifications: 'الإشعارات، 2 غير مقروءة', topUp: 'شحن', send: 'إرسال', more: 'المزيد',
    lock: 'قفل البطاقة', pin: 'عرض الرمز السري', favourite: 'تعيين كمفضلة', info: 'معلومات البطاقة', stolen: 'الإبلاغ عن سرقة أو فقدان',
    today: 'نشاط اليوم', seeAll: 'عرض كل النشاط', pending: 'قيد الانتظار', actions: 'إجراءات البطاقة',
    rows: [['ر خ', 'رامي خوري', 'اليوم، 15:54 · تحويل وارد', '+$50.00'], ['ج د', 'جان ضو', 'اليوم، 12:10 · تحويل صادر', '−$100.00'], ['ب', 'البقالة الخضراء', 'اليوم، 09:32 · فيزا •• 1395', '−$20.90']],
    tabs: ['بطاقاتي', 'المتجر', 'المدفوعات', 'الملف'],
  },
};

export default function Home() {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  return (
    <div className="ar-screen">
      <AppHeader title={t.title}
        start={<IconButton icon="user" label={t.profile} />}
        end={<IconButton icon="bell" label={t.notifications} badge />} />
      <main className="ar-screen-body">
        <Balance amount="$1,395.72" />
        <div className="ar-screen-section">
          <PaymentCard last4="1395" holder="Rami Khoury" expiry="09/29" network="VISA" variant="brand" fluid />
          <PageDots count={2} current={0} />
        </div>
        <QuickActions label={t.actions}>
          <QuickAction icon="plus" label={t.topUp} />
          <QuickAction icon="arrowUpRight" label={t.send} />
          <ActionMenu label={t.more}
            button={(props) => <QuickAction icon="more" label={t.more} {...props} />}
            items={[
              { label: t.lock, icon: 'lock' },
              { label: t.pin, icon: 'pin' },
              { label: t.favourite, icon: 'star', disabled: true },
              { label: t.info, icon: 'card' },
              { label: t.stolen, icon: 'alert', danger: true },
            ]} />
        </QuickActions>
        <section className="ar-screen-section" aria-labelledby="home-today">
          <h2 className="ar-screen-heading" id="home-today">{t.today}</h2>
          <List>
            {t.rows.map(([lead, title, sub, amount], i) => (
              <ListItem key={title} leading={lead} title={title} subtitle={sub} amount={amount}
                trailing={i === 1 ? <Badge tone="warning">{t.pending}</Badge> : undefined} />
            ))}
          </List>
          <Button variant="ghost">{t.seeAll} <icons.forward width={18} height={18} /></Button>
        </section>
      </main>
      <TabBar value="cards" label={t.title}
        items={[{ value: 'cards', label: t.tabs[0], icon: 'card' }, { value: 'store', label: t.tabs[1], icon: 'store' }, { value: 'pay', label: t.tabs[2], icon: 'send' }, { value: 'me', label: t.tabs[3], icon: 'user' }]} />
    </div>
  );
}
