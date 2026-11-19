/* Test page for @areebadigital/asterisk-native, rendered with react-native-web. ?theme=dark&lang=ar for dark and Arabic. */
import React from 'react';
import { AppRegistry, View, ScrollView } from 'react-native';
import * as A from '../src/index.js';
const h = React.createElement;
const q = new URLSearchParams(location.search), ar = q.get('lang') === 'ar', theme = q.get('theme') || 'light';
document.documentElement.dir = ar ? 'rtl' : 'ltr'; document.documentElement.lang = ar ? 'ar' : 'en';
window.__events = [];
const T = (en, a) => (ar ? a : en);

function Section({ title, children }) {
  const t = A.useAsterisk();
  return h(View, { style: { gap: 12, padding: 16, borderRadius: 16, backgroundColor: t.colors.surface, borderWidth: 1, borderColor: t.colors.line, width: 360 } },
    h(A.Txt, { variant: 'caption', weight: 600, color: 'inkMuted' }, title), children);
}
function Screen() {
  const t = A.useAsterisk(), [amount, setAmount] = React.useState('100'), [sheet, setSheet] = React.useState(false), [type, setType] = React.useState('bank');
  return h(ScrollView, { style: { backgroundColor: t.colors.surfaceSunken }, contentContainerStyle: { padding: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' } },
    h(Section, { title: T('Header, balance, quick actions', 'الترويسة والرصيد') },
      h(A.AppHeader, { title: T('My cards', 'بطاقاتي'), start: h(A.Avatar, { initials: T('SA', 'س ع'), size: 'sm' }), end: h(A.IconButton, { icon: 'bell', label: T('Notifications', 'الإشعارات'), badge: true, analyticsId: 'demo.bell' }) }),
      h(A.Balance, { amount: '$12,480.50', analyticsId: 'demo.balance' }),
      h(A.QuickActions, { label: T('Card actions', 'إجراءات البطاقة') },
        h(A.QuickAction, { icon: 'plus', label: T('Top up', 'شحن'), analyticsId: 'demo.topup' }), h(A.QuickAction, { icon: 'send', label: T('Send', 'إرسال') }),
        h(A.QuickAction, { icon: 'lock', label: T('Lock', 'قفل') }), h(A.QuickAction, { icon: 'more', label: T('More', 'المزيد'), disabled: true })),
      h(A.PageDots, { count: 3, current: 0 })),
    h(Section, { title: T('Card and list', 'البطاقة والقائمة') },
      h(A.PaymentCard, { last4: '1395', holder: 'Sara Ali', expiry: '09/29', variant: 'brand' }),
      h(A.List, null, h(A.ListItem, { leading: T('G', 'ب'), title: T('Green Grocer', 'البقالة الخضراء'), subtitle: T('Today, 09:32', 'اليوم، 09:32'), amount: '−$20.90' }),
        h(A.ListItem, { leading: T('SA', 'س ع'), title: T('Sara Ali', 'سارة علي'), subtitle: T('Transfer in', 'تحويل وارد'), amount: '+$50.00', trailing: h(A.Badge, { tone: 'success', dot: true }, T('Paid', 'مدفوع')) }))),
    h(Section, { title: T('Amount and number pad', 'المبلغ ولوحة الأرقام') },
      h(A.AmountInput, { label: T('Amount', 'المبلغ'), value: amount, fee: 0, hint: T('Min $20 · Max $2,500', 'الحد الأدنى $20 · الأقصى $2,500') }),
      h(A.NumberPad, { decimal: true, onKey: (k) => setAmount(A.padInput(amount, k)) }),
      h(A.ActionBar, null, h(A.Button, { analyticsId: 'demo.continue', onPress: () => setSheet(true) }, T('Continue', 'متابعة')))),
    h(Section, { title: T('Fields', 'الحقول') },
      h(A.RadioGroup, { label: T('Send to', 'الإرسال إلى'), variant: 'card', value: type, onChange: setType, analyticsId: 'demo.type',
        options: [{ value: 'bank', label: T('Bank account', 'حساب مصرفي'), hint: T('1–2 business days', 'من يوم إلى يومَي عمل') }, { value: 'wallet', label: T('areeba wallet', 'محفظة areeba'), hint: T('Instant', 'فوري') }] }),
      h(A.TextField, { label: 'IBAN', ltr: true, defaultValue: 'LB62 0999 0000', error: T('This IBAN is too short.', 'رقم الآيبان قصير جدًا.'), analyticsId: 'demo.iban' }),
      h(A.TextField, { label: T('Phone number', 'رقم الهاتف'), prefix: '+961', ltr: true, defaultValue: '70 123 456' }),
      h(A.TextArea, { label: T('Note', 'ملاحظة'), maxLength: 80, defaultValue: T('Dinner on Friday', 'عشاء يوم الجمعة') }),
      h(A.SearchField, { label: T('Search', 'بحث'), placeholder: T('Search transactions', 'البحث في المعاملات') }),
      h(View, { style: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' } }, h(A.FilterChip, { label: T('All', 'الكل'), selected: true }), h(A.FilterChip, { label: T('This month', 'هذا الشهر'), hasPopup: true }))),
    h(Section, { title: T('Controls and codes', 'عناصر التحكم والرموز') },
      h(A.Switch, { label: T('Freeze card', 'تجميد البطاقة'), defaultChecked: true, analyticsId: 'demo.freeze' }),
      h(A.Checkbox, { label: T('Save as favourite', 'حفظ في المفضلة'), hint: T('Shows them first', 'يظهر أولًا'), defaultChecked: true }),
      h(A.CodeInput, { defaultValue: '481', hint: T('Sent to +961 •• ••• 123', 'أُرسل إلى +961 •• ••• 123') }),
      h(A.PasscodeDots, { filled: 6, error: T('Wrong passcode. 2 tries left.', 'رمز المرور غير صحيح. بقيت محاولتان.') })),
    h(Section, { title: T('Status and settings', 'الحالة والإعدادات') },
      h(A.Alert, { tone: 'warning', title: T('Card expires soon', 'البطاقة تنتهي قريبًا') }, T('A replacement is on its way.', 'البطاقة البديلة في الطريق.')),
      h(A.Toast, { tone: 'success', action: T('Undo', 'تراجع') }, T('Transfer sent', 'تم إرسال التحويل')),
      h(A.SettingsList, { title: T('Security', 'الأمان') },
        h(A.SettingsRow, { icon: 'faceId', label: T('Face ID', 'بصمة الوجه'), toggle: { defaultChecked: true } }),
        h(A.SettingsRow, { icon: 'globe', label: T('Language', 'اللغة'), value: T('English', 'العربية'), onPress: () => {} }),
        h(A.SettingsRow, { icon: 'logout', label: T('Sign out', 'تسجيل الخروج'), tone: 'danger', onPress: () => {} })),
      h(A.DetailList, { items: [{ label: T('Total', 'المجموع'), value: '$100.00', ltr: true, emphasis: true }, { label: T('Fee', 'الرسوم'), value: T('Free', 'مجاني') }] })),
    h(Section, { title: T('Result and tab bar', 'النتيجة وشريط التبويب') },
      h(A.Result, { title: T('Top up successful', 'تم الشحن بنجاح') }, T('$100.00 was added to your card.', 'أُضيف $100.00 إلى بطاقتك.')),
      h(A.TabBar, { value: 'cards', items: [{ value: 'cards', label: T('Cards', 'البطاقات'), icon: 'card' }, { value: 'send', label: T('Send', 'إرسال'), icon: 'send' }, { value: 'me', label: T('Profile', 'الملف'), icon: 'user' }] })),
    h(A.Sheet, { open: sheet, onClose: () => setSheet(false), title: T('Confirm top up', 'تأكيد الشحن'), actions: [h(A.Button, { key: 'c', block: true }, T('Top up $100.00', 'اشحن $100.00')), h(A.Button, { key: 'x', variant: 'secondary', block: true, onPress: () => setSheet(false) }, T('Cancel', 'إلغاء'))] },
      T('From your card ending 4821.', 'من بطاقتك المنتهية بـ 4821.')));
}
function App() { return h(A.AsteriskProvider, { theme, locale: ar ? 'ar' : 'en', rtl: ar, analytics: (e) => window.__events.push(e), screen: 'demo' }, h(Screen)); }
AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });
