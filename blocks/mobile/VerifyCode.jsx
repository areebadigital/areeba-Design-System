/**
 * Verify code: the one-time code sent by SMS before a transfer or a new device.
 * The code field accepts paste and SMS autofill (autocomplete="one-time-code").
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
const { AppHeader, IconButton, CodeInput, Button, ActionBar, ltr } = window.Areeba;

const COPY = {
  en: { title: 'Verify it’s you', back: 'Back', heading: 'Enter the code', lead: `We sent a 6-digit code by SMS to ${ltr('+961 70 ••• 456')}.`, code: 'Verification code',
    hint: 'The code expires in 2:00.', wrong: 'That code is not right. Check the SMS and try again.', resend: 'Send a new code', verify: 'Verify' },
  ar: { title: 'تأكيد هويتك', back: 'رجوع', heading: 'أدخل الرمز', lead: `أرسلنا رمزًا من 6 أرقام برسالة نصية إلى ${ltr('+961 70 ••• 456')}.`, code: 'رمز التحقق',
    hint: 'تنتهي صلاحية الرمز خلال 2:00.', wrong: 'الرمز غير صحيح. راجع الرسالة وحاول مجددًا.', resend: 'إرسال رمز جديد', verify: 'تحقق' },
};

export default function VerifyCode({ defaultValue = '', error = false }) {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  return (
    <div className="ar-screen">
      <AppHeader title={t.title} start={<IconButton icon="back" label={t.back} />} />
      <main className="ar-screen-body">
        <div>
          <h2 className="ar-screen-title">{t.heading}</h2>
          <p className="ar-screen-lead">{t.lead}</p>
        </div>
        <CodeInput label={t.code} length={6} defaultValue={defaultValue} hint={t.hint} error={error ? t.wrong : undefined} />
        <Button variant="ghost">{t.resend}</Button>
      </main>
      <ActionBar><Button>{t.verify}</Button></ActionBar>
    </div>
  );
}
