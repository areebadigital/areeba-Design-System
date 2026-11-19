/**
 * Merchant dashboard, Settings: business details (a form), the settlement account, the team (invite people in a dialog)
 * and notification preferences, in tabs. For areeba's SaaS products (merchant and bank portals).
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
import { useState } from 'react';

const { Sidebar, Tabs, TabPanel, Panel, TextField, Select, Button, DetailList, DataTable, Avatar, Badge, ActionMenu, Dialog, SettingsList, SettingsRow } = window.Areeba;

const COPY = {
  en: {
    title: 'Settings', tabs: ['Business', 'Team', 'Notifications'],
    business: 'Business details', businessDesc: 'Shown on receipts, invoices and payment links.', name: 'Business name', legal: 'Legal name', country: 'Country', currency: 'Settlement currency',
    email: 'Support email', phone: 'Support phone', address: 'Address', countries: ['Lebanon', 'Jordan', 'United Arab Emirates'], currencies: ['USD · US dollar', 'LBP · Lebanese pound'],
    cancel: 'Cancel', save: 'Save changes',
    settlement: 'Settlement account', settlementDesc: 'Payouts go to this account. Changing it needs a second approver.', bank: 'Bank', bankName: 'Example Bank', holder: 'Account holder', change: 'Change account',
    team: 'Team', teamDesc: '4 people can sign in to this portal.', invite: 'Invite member', cols: ['Name', 'Role', 'Last active', 'Actions'],
    roles: { owner: 'Owner', admin: 'Admin', finance: 'Finance', viewer: 'Viewer' }, actionsFor: 'Actions for', changeRole: 'Change role', resend: 'Resend invite', remove: 'Remove from team',
    people: [['Sara Ali', 'sara@example.com', 'owner', 'Now'], ['Karim Hassan', 'karim@example.com', 'admin', 'Today'], ['Nour Saleh', 'nour@example.com', 'finance', 'Yesterday'], ['Jad Youssef', 'jad@example.com', 'viewer', 'Invited']],
    initials: ['SA', 'KH', 'NS', 'JY'],
    inviteTitle: 'Invite a team member', inviteBody: 'They get an email with a link to set a password. The link works for 7 days.', inviteEmail: 'Work email', role: 'Role', send: 'Send invite',
    payments: 'Payments', payouts: 'Payouts', declined: 'Declined payments', declinedDesc: 'An email for each declined card payment', refund: 'Refund requests', daily: 'Daily summary', dailyDesc: 'Sales and refunds, every morning at 8:00',
    sent: 'Payout sent', failed: 'Payout failed', failedDesc: 'Also sent by text message to the owner',
    nav: ['Overview', 'Transactions', 'Payouts', 'Stores', 'Reports', 'Settings'], footer: 'Green Grocer · Main branch',
  },
  ar: {
    title: 'الإعدادات', tabs: ['النشاط التجاري', 'الفريق', 'الإشعارات'],
    business: 'تفاصيل النشاط التجاري', businessDesc: 'تظهر على الإيصالات والفواتير وروابط الدفع.', name: 'اسم النشاط التجاري', legal: 'الاسم القانوني', country: 'البلد', currency: 'عملة التسوية',
    email: 'بريد الدعم', phone: 'هاتف الدعم', address: 'العنوان', countries: ['لبنان', 'الأردن', 'الإمارات العربية المتحدة'], currencies: ['USD · دولار أمريكي', 'LBP · ليرة لبنانية'],
    cancel: 'إلغاء', save: 'حفظ التغييرات',
    settlement: 'حساب التسوية', settlementDesc: 'تُحوَّل المدفوعات إلى هذا الحساب. يحتاج تغييره إلى موافقة شخص ثانٍ.', bank: 'المصرف', bankName: 'مصرف المثال', holder: 'صاحب الحساب', change: 'تغيير الحساب',
    team: 'الفريق', teamDesc: '4 أشخاص يمكنهم تسجيل الدخول إلى هذه البوابة.', invite: 'دعوة عضو', cols: ['الاسم', 'الدور', 'آخر نشاط', 'الإجراءات'],
    roles: { owner: 'المالك', admin: 'مشرف', finance: 'المالية', viewer: 'مشاهد' }, actionsFor: 'إجراءات لـ', changeRole: 'تغيير الدور', resend: 'إعادة إرسال الدعوة', remove: 'إزالة من الفريق',
    people: [['سارة علي', 'sara@example.com', 'owner', 'الآن'], ['كريم حسن', 'karim@example.com', 'admin', 'اليوم'], ['نور صالح', 'nour@example.com', 'finance', 'أمس'], ['جاد يوسف', 'jad@example.com', 'viewer', 'مدعوة']],
    initials: ['س ع', 'ك ح', 'ن ص', 'ج ي'],
    inviteTitle: 'دعوة عضو إلى الفريق', inviteBody: 'يصله بريد برابط لتعيين كلمة المرور. يعمل الرابط لمدة 7 أيام.', inviteEmail: 'بريد العمل', role: 'الدور', send: 'إرسال الدعوة',
    payments: 'المدفوعات', payouts: 'الدفعات', declined: 'المدفوعات المرفوضة', declinedDesc: 'بريد لكل دفعة بطاقة مرفوضة', refund: 'طلبات الاسترداد', daily: 'ملخص يومي', dailyDesc: 'المبيعات والمبالغ المستردة، كل صباح الساعة 8:00',
    sent: 'تم إرسال الدفعة', failed: 'فشل الدفعة', failedDesc: 'تُرسل أيضًا برسالة نصية إلى المالك',
    nav: ['نظرة عامة', 'المعاملات', 'المدفوعات', 'المتاجر', 'التقارير', 'الإعدادات'], footer: 'البقالة الخضراء · الفرع الرئيسي',
  },
};

export default function Settings({ tab = 'business' }) {
  const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en', t = COPY[lang];
  const [cur, setCur] = useState(tab);
  const [invite, setInvite] = useState(false);
  const roleOptions = ['admin', 'finance', 'viewer'].map((v) => ({ value: v, label: t.roles[v] }));
  const people = t.people.map(([name, email, role, last], i) => ({ name, email, role, last, initials: t.initials[i] }));
  return (
    <div className="ar-app">
      <Sidebar value="settings" footer={t.footer} items={[
        { value: 'home', label: t.nav[0], icon: 'home' }, { value: 'tx', label: t.nav[1], icon: 'list', count: '1,284' }, { value: 'payouts', label: t.nav[2], icon: 'send' },
        { value: 'stores', label: t.nav[3], icon: 'store' }, { value: 'reports', label: t.nav[4], icon: 'chart' }, { value: 'settings', label: t.nav[5], icon: 'settings' }]} />
      <main className="ar-app-main">
        <div className="ar-app-narrow">
          <h1 className="ar-app-title">{t.title}</h1>
          <Tabs id="settings" label={t.title} value={cur} onChange={setCur}
            items={[{ value: 'business', label: t.tabs[0] }, { value: 'team', label: t.tabs[1] }, { value: 'alerts', label: t.tabs[2] }]} />

          {cur === 'business' && (
            <TabPanel tabs="settings" value="business">
              <Panel title={t.business} description={t.businessDesc} footer={<><Button variant="secondary">{t.cancel}</Button><Button type="submit" form="business-form">{t.save}</Button></>}>
                <form id="business-form" className="ar-app-form" onSubmit={(e) => e.preventDefault()}>
                  <TextField label={t.name} defaultValue={lang === 'ar' ? 'البقالة الخضراء' : 'Green Grocer'} autoComplete="organization" />
                  <TextField label={t.legal} defaultValue={lang === 'ar' ? 'شركة البقالة الخضراء ش.م.ل.' : 'Green Grocer SAL'} />
                  <Select label={t.country} name="country" defaultValue="lb" options={[{ value: 'lb', label: t.countries[0] }, { value: 'jo', label: t.countries[1] }, { value: 'ae', label: t.countries[2] }]} />
                  <Select label={t.currency} name="currency" defaultValue="usd" options={[{ value: 'usd', label: t.currencies[0] }, { value: 'lbp', label: t.currencies[1] }]} />
                  <TextField label={t.email} type="email" defaultValue="support@example.com" autoComplete="email" dir="ltr" />
                  <TextField label={t.phone} type="tel" prefix="+961" defaultValue="1 123 456" autoComplete="tel-national" dir="ltr" />
                  <TextField className="ar-app-form-wide" label={t.address} defaultValue={lang === 'ar' ? '12 شارع السوق' : '12 Market Street'} autoComplete="street-address" />
                </form>
              </Panel>
              <Panel title={t.settlement} description={t.settlementDesc} actions={<Button variant="secondary" size="sm">{t.change}</Button>}>
                <DetailList items={[
                  { label: t.bank, value: t.bankName }, { label: t.holder, value: lang === 'ar' ? 'شركة البقالة الخضراء ش.م.ل.' : 'Green Grocer SAL' },
                  { label: 'IBAN', value: 'LB62 0999 0000 0001 0019 0122 4821', ltr: true },
                ]} />
              </Panel>
            </TabPanel>
          )}

          {cur === 'team' && (
            <TabPanel tabs="settings" value="team">
              <Panel title={t.team} description={t.teamDesc} flush actions={<Button onClick={() => setInvite(true)}>{t.invite}</Button>}>
                <DataTable rows={people} columns={[
                  { key: 'name', label: t.cols[0], render: (r) => (
                    <span className="ar-app-tools"><Avatar initials={r.initials} size="sm" /><span>{r.name}<br /><span className="ar-screen-meta" dir="ltr">{r.email}</span></span></span>) },
                  { key: 'role', label: t.cols[1], render: (r) => <Badge tone={r.role === 'owner' ? 'brand' : 'neutral'}>{t.roles[r.role]}</Badge> },
                  { key: 'last', label: t.cols[2] },
                  { key: 'actions', label: <span className="ar-sr-only">{t.cols[3]}</span>, align: 'right', render: (r) => r.role === 'owner' ? null : (
                    <ActionMenu label={t.actionsFor + ' ' + r.name} items={[{ label: t.changeRole }, { label: t.resend, disabled: r.last !== t.people[3][3] }, { label: t.remove, danger: true }]} />) },
                ]} />
              </Panel>
            </TabPanel>
          )}

          {cur === 'alerts' && (
            <TabPanel tabs="settings" value="alerts">
              <SettingsList title={t.payments}>
                <SettingsRow label={t.declined} description={t.declinedDesc} toggle={{ defaultChecked: true }} />
                <SettingsRow label={t.refund} toggle={{ defaultChecked: true }} />
                <SettingsRow label={t.daily} description={t.dailyDesc} toggle={{ defaultChecked: false }} />
              </SettingsList>
              <SettingsList title={t.payouts}>
                <SettingsRow label={t.sent} toggle={{ defaultChecked: true }} />
                <SettingsRow label={t.failed} description={t.failedDesc} toggle={{ defaultChecked: true }} />
              </SettingsList>
            </TabPanel>
          )}
        </div>
      </main>
      <Dialog open={invite} onClose={() => setInvite(false)} title={t.inviteTitle}
        actions={<><Button variant="secondary" onClick={() => setInvite(false)}>{t.cancel}</Button><Button onClick={() => setInvite(false)}>{t.send}</Button></>}>
        <p>{t.inviteBody}</p>
        <TextField label={t.inviteEmail} type="email" placeholder="name@company.com" autoComplete="email" dir="ltr" />
        <Select label={t.role} defaultValue="viewer" options={roleOptions} />
      </Dialog>
    </div>
  );
}
