/**
 * Notifications: money requests to accept or decline, and how earlier ones ended.
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
import { useState } from 'react';

const { AppHeader, IconButton, Tabs, NotificationItem, Avatar, Button, EmptyState, ltr } = window.Areeba;

const COPY = {
  en: {
    title: 'Notifications', back: 'Back', readAll: 'Mark all as read', tabs: 'Notification type', activity: 'Activity', updates: 'Updates', today: 'Today', earlier: 'Earlier',
    request: `Maya Amin sent you ${ltr('$100.00')}`, requestBody: 'Note: Dinner on Friday', accept: 'Accept', decline: 'Decline',
    limit: `Transfer of ${ltr('$300.00')} to Ziad Khalil returned`, limitBody: 'It passed your 3-day limit, so it was declined and the money is back on your card.', expired: 'Expired',
    declined: `Jenny declined your ${ltr('$100.00')}`, declinedBody: 'The money is back on your card.', declinedTag: 'Declined',
    accepted: `You accepted ${ltr('$100.00')} from Maya Amin`, acceptedTag: 'Accepted',
    statement: 'Your November statement is ready', mon: 'Mon', sun: 'Sun', fm: 'MA', j: 'J', statementBody: 'Download it from Activity.', none: 'No updates yet', noneBody: 'News about your cards and the app shows up here.',
  },
  ar: {
    title: 'الإشعارات', back: 'رجوع', readAll: 'تعيين الكل كمقروء', tabs: 'نوع الإشعار', activity: 'النشاط', updates: 'التحديثات', today: 'اليوم', earlier: 'سابقًا',
    request: `أرسل لك مايا أمين ${ltr('$100.00')}`, requestBody: 'ملاحظة: عشاء يوم الجمعة', accept: 'قبول', decline: 'رفض',
    limit: `أُعيد تحويل ${ltr('$300.00')} إلى زياد خليل`, limitBody: 'تجاوز حدّك لثلاثة أيام، لذا رُفض وأُعيد المبلغ إلى بطاقتك.', expired: 'منتهي',
    declined: `رفضت جيني تحويلك بقيمة ${ltr('$100.00')}`, declinedBody: 'أُعيد المبلغ إلى بطاقتك.', declinedTag: 'مرفوض',
    accepted: `قبلت ${ltr('$100.00')} من مايا أمين`, acceptedTag: 'مقبول',
    statement: 'كشف حساب نوفمبر جاهز', mon: 'الاثنين', sun: 'الأحد', fm: 'م أ', j: 'ج', statementBody: 'نزّله من صفحة النشاط.', none: 'لا توجد تحديثات بعد', noneBody: 'تظهر هنا أخبار بطاقاتك والتطبيق.',
  },
};

export default function Notifications() {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  const [tab, setTab] = useState('activity');
  const [answer, setAnswer] = useState(null);
  return (
    <div className="ar-screen">
      <AppHeader title={t.title} start={<IconButton icon="back" label={t.back} />} end={<IconButton icon="check" label={t.readAll} />} />
      <main className="ar-screen-body">
        <Tabs label={t.tabs} value={tab} onChange={setTab} items={[{ value: 'activity', label: t.activity }, { value: 'updates', label: t.updates }]} />
        {tab === 'activity' ? (
          <>
            <section className="ar-screen-section" aria-labelledby="notif-today">
              <h2 className="ar-screen-heading" id="notif-today">{t.today}</h2>
              <NotificationItem unread={!answer} avatar={<Avatar initials={t.fm} />} title={t.request} time="12:10"
                actions={answer ? null : <><Button variant="secondary" size="sm" onClick={() => setAnswer('declined')}>{t.decline}</Button><Button size="sm" onClick={() => setAnswer('accepted')}>{t.accept}</Button></>}
                status={answer === 'accepted' ? { tone: 'success', label: t.acceptedTag } : answer === 'declined' ? { tone: 'neutral', label: t.declinedTag } : undefined}>
                {t.requestBody}
              </NotificationItem>
              <NotificationItem icon="transfer" title={t.limit} time="09:41" status={{ tone: 'warning', label: t.expired }}>{t.limitBody}</NotificationItem>
            </section>
            <section className="ar-screen-section" aria-labelledby="notif-earlier">
              <h2 className="ar-screen-heading" id="notif-earlier">{t.earlier}</h2>
              <NotificationItem avatar={<Avatar initials={t.j} />} title={t.declined} time={t.mon} status={{ tone: 'danger', label: t.declinedTag }}>{t.declinedBody}</NotificationItem>
              <NotificationItem avatar={<Avatar initials={t.fm} />} title={t.accepted} time={t.sun} status={{ tone: 'success', label: t.acceptedTag }} />
            </section>
          </>
        ) : (
          <NotificationItem icon="doc" unread title={t.statement} time="08:00">{t.statementBody}</NotificationItem>
        )}
      </main>
    </div>
  );
}
