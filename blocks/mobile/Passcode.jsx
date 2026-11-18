/**
 * Passcode: unlock the app with six digits on the number pad, or Face ID.
 * After too many wrong tries the account locks and offers a reset link by email.
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
import { useState } from 'react';

const { AppHeader, PasscodeDots, NumberPad, Button, IconButton, Result } = window.Areeba;

const LENGTH = 6;
const COPY = {
  en: { title: 'Enter passcode', lead: 'Enter your 6-digit passcode to unlock areeba pay.', wrong: (n) => `Wrong passcode. ${n} tries left.`, forgot: 'Forgot passcode?', faceId: 'Unlock with Face ID',
    locked: 'Too many tries', lockedBody: 'For your security, areeba pay is locked. We can email you a link to reset your passcode.', reset: 'Email me a reset link', support: 'Contact support' },
  ar: { title: 'أدخل رمز الدخول', lead: 'أدخل رمز الدخول المكوّن من 6 أرقام لفتح areeba pay.', wrong: (n) => `رمز الدخول غير صحيح. تبقّى ${n} محاولات.`, forgot: 'نسيت رمز الدخول؟', faceId: 'الفتح ببصمة الوجه',
    locked: 'محاولات كثيرة', lockedBody: 'حفاظًا على أمانك، تم قفل areeba pay. يمكننا إرسال رابط إلى بريدك لإعادة تعيين رمز الدخول.', reset: 'أرسل لي رابط إعادة التعيين', support: 'التواصل مع الدعم' },
};

export default function Passcode({ initialDigits = '', state = 'enter', onComplete }) {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  const [digits, setDigits] = useState(initialDigits);
  if (state === 'locked') {
    return (
      <div className="ar-screen">
        <main className="ar-screen-body ar-screen-body-center">
          <Result tone="danger" title={t.locked} action={<Button>{t.reset}</Button>}>{t.lockedBody}</Result>
          <Button variant="ghost">{t.support}</Button>
        </main>
      </div>
    );
  }
  const press = (k) => {
    const next = k === 'back' ? digits.slice(0, -1) : (digits + k).slice(0, LENGTH);
    setDigits(next);
    if (next.length === LENGTH && onComplete) onComplete(next);
  };
  return (
    <div className="ar-screen">
      <AppHeader title={t.title} />
      <main className="ar-screen-body ar-screen-body-center">
        <p className="ar-screen-lead ar-screen-title-center">{t.lead}</p>
        <PasscodeDots length={LENGTH} filled={digits.length} error={state === 'wrong' ? t.wrong(2) : undefined} />
      </main>
      <div className="ar-screen-pad">
        <NumberPad label={t.title} onKey={press} />
      </div>
      <div className="ar-actionbar">
        <Button variant="ghost">{t.forgot}</Button>
        <IconButton icon="faceId" label={t.faceId} />
      </div>
    </div>
  );
}
