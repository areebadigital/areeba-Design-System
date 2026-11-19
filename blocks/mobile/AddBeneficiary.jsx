/**
 * Add beneficiary: choose a bank account or an areeba wallet, enter the details (IBAN or phone number), an optional note,
 * and save. Shows hints before people type and clear errors after. Uses only areeba components (window.Areeba);
 * copy in English and Arabic, chosen by <html lang>.
 */
import { useState } from 'react';

const { AppHeader, IconButton, RadioGroup, TextField, Select, TextArea, Checkbox, Button, ActionBar, Alert } = window.Areeba;

const COPY = {
  en: {
    title: 'Add beneficiary', back: 'Back', lead: 'Save someone you send money to often. You can change or remove them later.',
    to: 'Send to', bank: 'Bank account', bankHint: '1–2 business days, by IBAN', wallet: 'areeba wallet', walletHint: 'Instant, by phone number',
    name: 'Full name', nameHint: 'As it appears on their bank account', nameError: 'Enter their first and last name.',
    bankName: 'Bank', bankPick: 'Choose their bank', banks: ['Example Bank', 'Harbour Bank', 'Hillside Bank'], bankError: 'Choose their bank.',
    iban: 'IBAN', ibanHint: '28 characters, starts with LB', ibanError: 'This IBAN is too short. Check the 28 characters and try again.',
    phone: 'Phone number', phoneHint: 'The number of their areeba wallet',
    nickname: 'Nickname (optional)', note: 'Note (optional)', noteHint: 'Only you see this.',
    favourite: 'Add to favourites', favouriteHint: 'Shows them first when you send money',
    save: 'Save beneficiary', errorTitle: 'Check 3 fields', errorBody: 'Some details are missing or not right. They are marked below.',
  },
  ar: {
    title: 'إضافة مستفيد', back: 'رجوع', lead: 'احفظ شخصًا ترسل إليه المال كثيرًا. يمكنك تعديله أو حذفه لاحقًا.',
    to: 'الإرسال إلى', bank: 'حساب مصرفي', bankHint: 'من يوم إلى يومَي عمل، عبر رقم الآيبان', wallet: 'محفظة areeba', walletHint: 'فوري، عبر رقم الهاتف',
    name: 'الاسم الكامل', nameHint: 'كما يظهر في حسابه المصرفي', nameError: 'أدخل الاسم الأول واسم العائلة.',
    bankName: 'المصرف', bankPick: 'اختر مصرفه', banks: ['مصرف المثال', 'مصرف المرفأ', 'مصرف التلة'], bankError: 'اختر مصرفه.',
    iban: 'رقم الآيبان (IBAN)', ibanHint: '28 خانة، يبدأ بـ LB', ibanError: 'رقم الآيبان قصير جدًا. تحقق من الخانات الـ 28 وحاول مجددًا.',
    phone: 'رقم الهاتف', phoneHint: 'رقم محفظة areeba الخاصة به',
    nickname: 'اسم مختصر (اختياري)', note: 'ملاحظة (اختيارية)', noteHint: 'تظهر لك فقط.',
    favourite: 'إضافة إلى المفضلة', favouriteHint: 'يظهر أولًا عند إرسال المال',
    save: 'حفظ المستفيد', errorTitle: 'تحقق من 3 حقول', errorBody: 'بعض التفاصيل ناقصة أو غير صحيحة، وهي مميّزة أدناه.',
  },
};

export default function AddBeneficiary({ initialType = 'bank', errors = false }) {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  const [type, setType] = useState(initialType);
  return (
    <div className="ar-screen">
      <AppHeader title={t.title} start={<IconButton icon="back" label={t.back} />} />
      <main className="ar-screen-body">
        <p className="ar-screen-lead">{t.lead}</p>
        {errors && <Alert tone="danger" title={t.errorTitle}>{t.errorBody}</Alert>}
        <form className="ar-screen-section" onSubmit={(e) => e.preventDefault()}>
          <RadioGroup label={t.to} name="type" variant="card" value={type} onChange={setType}
            options={[{ value: 'bank', label: t.bank, hint: t.bankHint }, { value: 'wallet', label: t.wallet, hint: t.walletHint }]} />
          <TextField label={t.name} autoComplete="name" defaultValue={errors ? '' : (document.documentElement.lang === 'ar' ? 'كريم حسن' : 'Karim Hassan')}
            hint={errors ? undefined : t.nameHint} error={errors ? t.nameError : undefined} />
          {type === 'bank' ? (
            <>
              <Select label={t.bankName} name="bank" placeholder={t.bankPick} defaultValue={errors ? null : 'b1'} error={errors ? t.bankError : undefined}
                options={t.banks.map((label, i) => ({ value: 'b' + (i + 1), label }))} />
              <TextField label={t.iban} dir="ltr" autoComplete="off" spellCheck={false} placeholder="LB00 0000 0000 0000 0000 0000 0000"
                defaultValue={errors ? 'LB62 0999 0000' : 'LB62 0999 0000 0001 0019 0122 4821'} hint={errors ? undefined : t.ibanHint} error={errors ? t.ibanError : undefined} />
            </>
          ) : (
            <TextField label={t.phone} type="tel" inputMode="tel" prefix="+961" dir="ltr" autoComplete="tel-national" defaultValue="70 123 456" hint={t.phoneHint} />
          )}
          <TextField label={t.nickname} />
          <TextArea label={t.note} hint={t.noteHint} maxLength={80} rows={3} />
          <Checkbox label={t.favourite} hint={t.favouriteHint} defaultChecked />
        </form>
      </main>
      <ActionBar>
        <Button type="submit">{t.save}</Button>
      </ActionBar>
    </div>
  );
}
