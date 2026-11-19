/**
 * Profile: who you are, then grouped settings (account, notifications, security, help) and sign out.
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
const { AppHeader, IconButton, Avatar, SettingsList, SettingsRow, TabBar } = window.Areeba;

const COPY = {
  en: {
    title: 'My profile', notifications: 'Notifications', edit: 'Edit photo', name: 'Sara Ali', ini: 'SA', id: 'areeba ID', password: 'Change password', email: 'Update email',
    account: 'Account', cards: 'My areeba cards', saved: 'Saved cards', newTag: 'New', beneficiaries: 'My beneficiaries',
    notif: 'Notifications', emailN: 'Email notifications', smsN: 'SMS notifications', txN: 'Every transaction', txNSub: 'Payments, transfers and top ups',
    security: 'Security', passcode: 'Passcode', faceId: 'Unlock with Face ID', help: 'Help', support: 'Customer support', report: 'Report a problem',
    more: 'More', about: 'About areeba pay', signOut: 'Sign out', tabs: ['My cards', 'eStore', 'Payments', 'Profile'],
  },
  ar: {
    title: 'ملفي الشخصي', notifications: 'الإشعارات', edit: 'تعديل الصورة', name: 'سارة علي', ini: 'س ع', id: 'حساب areeba ID', password: 'تغيير كلمة المرور', email: 'تحديث البريد الإلكتروني',
    account: 'الحساب', cards: 'بطاقات areeba الخاصة بي', saved: 'البطاقات المحفوظة', newTag: 'جديد', beneficiaries: 'المستفيدون',
    notif: 'الإشعارات', emailN: 'إشعارات البريد الإلكتروني', smsN: 'الرسائل النصية', txN: 'كل معاملة', txNSub: 'المدفوعات والتحويلات والشحن',
    security: 'الأمان', passcode: 'رمز الدخول', faceId: 'الفتح ببصمة الوجه', help: 'المساعدة', support: 'خدمة العملاء', report: 'الإبلاغ عن مشكلة',
    more: 'المزيد', about: 'عن areeba pay', signOut: 'تسجيل الخروج', tabs: ['بطاقاتي', 'المتجر', 'المدفوعات', 'الملف'],
  },
};

export default function Profile() {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  return (
    <div className="ar-screen">
      <AppHeader title={t.title} end={<IconButton icon="bell" label={t.notifications} />} />
      <main className="ar-screen-body">
        <div className="ar-balance">
          <Avatar initials={t.ini} size="lg" />
          <h2 className="ar-screen-title">{t.name}</h2>
          <div className="ar-screen-meta" dir="ltr">r••••@g••••.com · +961 70 ••• 456</div>
        </div>
        <SettingsList title={t.id}>
          <SettingsRow icon="lock" label={t.password} onClick={() => {}} />
          <SettingsRow icon="mail" label={t.email} onClick={() => {}} />
        </SettingsList>
        <SettingsList title={t.account}>
          <SettingsRow icon="card" label={t.cards} value="3" onClick={() => {}} />
          <SettingsRow icon="card" label={t.saved} badge={t.newTag} onClick={() => {}} />
          <SettingsRow icon="user" label={t.beneficiaries} onClick={() => {}} />
        </SettingsList>
        <SettingsList title={t.notif}>
          <SettingsRow icon="mail" label={t.emailN} toggle={{ defaultChecked: true }} />
          <SettingsRow icon="phone" label={t.smsN} toggle={{}} />
          <SettingsRow icon="transfer" label={t.txN} description={t.txNSub} toggle={{ defaultChecked: true }} />
        </SettingsList>
        <SettingsList title={t.security}>
          <SettingsRow icon="lock" label={t.passcode} onClick={() => {}} />
          <SettingsRow icon="faceId" label={t.faceId} toggle={{ defaultChecked: true }} />
        </SettingsList>
        <SettingsList title={t.help}>
          <SettingsRow icon="help" label={t.support} onClick={() => {}} />
          <SettingsRow icon="alert" label={t.report} onClick={() => {}} />
        </SettingsList>
        <SettingsList title={t.more}>
          <SettingsRow icon="info" label={t.about} value="v1.203.1" onClick={() => {}} />
          <SettingsRow icon="logout" label={t.signOut} tone="danger" onClick={() => {}} />
        </SettingsList>
      </main>
      <TabBar value="me" label={t.title}
        items={[{ value: 'cards', label: t.tabs[0], icon: 'card' }, { value: 'store', label: t.tabs[1], icon: 'store' }, { value: 'pay', label: t.tabs[2], icon: 'send' }, { value: 'me', label: t.tabs[3], icon: 'user' }]} />
    </div>
  );
}
