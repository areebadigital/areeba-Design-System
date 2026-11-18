/**
 * Sign in: phone number and password, with forgotten password and sign up.
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
const { AppHeader, TextField, Button, ActionBar } = window.Areeba;

const COPY = {
  en: { title: 'Sign in', heading: 'Welcome back', lead: 'Sign in with the phone number and password of your areeba ID.', phone: 'Phone number', password: 'Password',
    forgot: 'Forgot password?', submit: 'Sign in', noAccount: 'New to areeba pay?', signUp: 'Create an account', error: 'Phone number or password is wrong. Try again or reset your password.' },
  ar: { title: 'تسجيل الدخول', heading: 'مرحبًا بعودتك', lead: 'سجّل الدخول برقم الهاتف وكلمة المرور الخاصين بحساب areeba ID.', phone: 'رقم الهاتف', password: 'كلمة المرور',
    forgot: 'نسيت كلمة المرور؟', submit: 'تسجيل الدخول', noAccount: 'جديد على areeba pay؟', signUp: 'إنشاء حساب', error: 'رقم الهاتف أو كلمة المرور غير صحيحة. حاول مجددًا أو أعد تعيين كلمة المرور.' },
};

export default function SignIn({ error = false }) {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  return (
    <div className="ar-screen">
      <AppHeader title={t.title} />
      <main className="ar-screen-body">
        <div>
          <h2 className="ar-screen-title">{t.heading}</h2>
          <p className="ar-screen-lead">{t.lead}</p>
        </div>
        <form className="ar-screen-section" onSubmit={(e) => e.preventDefault()}>
          <TextField label={t.phone} prefix="+961" type="tel" inputMode="tel" autoComplete="tel-national" defaultValue="70 123 456" dir="ltr" />
          <TextField label={t.password} type="password" autoComplete="current-password" defaultValue={error ? '12345678' : ''} error={error ? t.error : undefined} />
          <Button variant="ghost" type="button">{t.forgot}</Button>
        </form>
      </main>
      <ActionBar stacked>
        <Button>{t.submit}</Button>
        <Button variant="secondary">{t.signUp}</Button>
      </ActionBar>
    </div>
  );
}
