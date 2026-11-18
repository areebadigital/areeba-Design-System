/**
 * Merchant portal sign in: work email and password, keep me signed in, forgotten password, beside the areeba brand panel
 * (the panel hides on small screens). For areeba's SaaS products (merchant and bank portals).
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
const { TextField, Checkbox, Button, Alert } = window.Areeba;

const COPY = {
  en: {
    headline: ['The infrastructure behind how ', 'money moves', '.'], note: 'Merchant portal for areeba acquiring, payment links and payouts.',
    title: 'Sign in to your portal', lead: 'Use the work email your bank or areeba registered for your business.', email: 'Work email', password: 'Password',
    keep: 'Keep me signed in for 7 days', forgot: 'Forgot password?', submit: 'Sign in', help: 'Need access? Ask the owner of your account to invite you.',
    errorTitle: 'We couldn’t sign you in', error: 'The email or password is wrong. After 5 tries the account locks for 15 minutes.',
  },
  ar: {
    headline: ['البنية التي تقف وراء ', 'حركة الأموال', '.'], note: 'بوابة التجار لخدمات areeba للدفع وروابط الدفع والمدفوعات.',
    title: 'سجّل الدخول إلى بوابتك', lead: 'استخدم بريد العمل الذي سجّله مصرفك أو areeba لنشاطك التجاري.', email: 'بريد العمل', password: 'كلمة المرور',
    keep: 'إبقائي مسجّلًا لمدة 7 أيام', forgot: 'نسيت كلمة المرور؟', submit: 'تسجيل الدخول', help: 'تحتاج إلى صلاحية؟ اطلب من مالك الحساب دعوتك.',
    errorTitle: 'تعذّر تسجيل دخولك', error: 'البريد أو كلمة المرور غير صحيحة. بعد 5 محاولات يُقفل الحساب لمدة 15 دقيقة.',
  },
};

export default function SignIn({ error = false }) {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  return (
    <div className="ar-app-auth">
      <div className="ar-app-auth-brand">
        <span className="ar-app-auth-logo">areeba</span>
        <p className="ar-app-auth-headline">{t.headline[0]}<em>{t.headline[1]}</em>{t.headline[2]}</p>
        <p className="ar-app-auth-note">{t.note}</p>
      </div>
      <main className="ar-app-auth-main">
        <form className="ar-app-auth-form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <h1 className="ar-app-title">{t.title}</h1>
            <p className="ar-app-lead">{t.lead}</p>
          </div>
          {error && <Alert tone="danger" title={t.errorTitle}>{t.error}</Alert>}
          <TextField label={t.email} type="email" autoComplete="username" defaultValue="rami@spinneys.com.lb" dir="ltr" />
          <TextField label={t.password} type="password" autoComplete="current-password" defaultValue={error ? '12345678' : ''} />
          <div className="ar-app-auth-row">
            <Checkbox label={t.keep} defaultChecked />
            <Button variant="ghost" size="sm">{t.forgot}</Button>
          </div>
          <Button type="submit" size="lg" block>{t.submit}</Button>
          <p className="ar-screen-meta">{t.help}</p>
        </form>
      </main>
    </div>
  );
}
