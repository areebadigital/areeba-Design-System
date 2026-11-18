/**
 * Send money: choose who, how much and why, confirm, done.
 * The recipient has 3 days to accept, then the money comes back; the confirm step says so.
 * `initialStep` opens it at any step (who, amount, confirm, done).
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
import { useState } from 'react';

const { AppHeader, IconButton, SearchField, Avatar, SettingsList, SettingsRow, AmountInput, TextField, DetailList, Alert, Button, ActionBar, Result, ltr } = window.Areeba;

const FEE = 1, MIN = 1, MAX = 2000;
const COPY = {
  en: {
    title: 'Send money', back: 'Back', close: 'Close', search: 'Search contacts', placeholder: 'Name or phone number', recent: 'Recent', contacts: 'Contacts',
    people: [['FM', 'Fouad El Mir', '+961 71 123 456'], ['LH', 'Lina Haddad', '+961 3 555 012'], ['RK', 'Rami Khoury', '+961 70 900 311'], ['OS', 'Omar Saad', '+961 76 410 220']],
    amount: 'Amount', limits: `Min ${ltr('$1')} · Max ${ltr('$2,000')} a day`, tooHigh: `You can send up to ${ltr('$2,000')} a day.`, fee: 'Transaction fee',
    reason: 'What’s it for?', reasonHint: 'They see this with the money.', reasonExample: 'Dinner on Friday', cont: 'Continue',
    confirmTitle: 'Confirm the transfer', total: 'Total', from: 'From card', to: 'To', sent: 'Amount', theyGet: 'They receive', note: 'Note',
    accept: 'The money waits for them to accept it. If they don’t within 3 days, it comes back to your card automatically.', confirm: (a) => `Confirm and send ${ltr(a)}`,
    done: 'Money sent', doneBody: (a, n) => `${ltr(a)} is waiting for ${n} to accept.`, again: 'Send to someone else',
  },
  ar: {
    title: 'إرسال الأموال', back: 'رجوع', close: 'إغلاق', search: 'البحث في جهات الاتصال', placeholder: 'الاسم أو رقم الهاتف', recent: 'الأخيرة', contacts: 'جهات الاتصال',
    people: [['ف م', 'فؤاد المير', '+961 71 123 456'], ['ل ح', 'لينا حداد', '+961 3 555 012'], ['ر خ', 'رامي خوري', '+961 70 900 311'], ['ع س', 'عمر سعد', '+961 76 410 220']],
    amount: 'المبلغ', limits: `الحد الأدنى ${ltr('$1')} · الحد الأقصى ${ltr('$2,000')} يوميًا`, tooHigh: `يمكنك إرسال ${ltr('$2,000')} كحد أقصى يوميًا.`, fee: 'رسوم المعاملة',
    reason: 'ما سبب التحويل؟', reasonHint: 'يرى المستلم هذه الملاحظة مع المبلغ.', reasonExample: 'عشاء يوم الجمعة', cont: 'متابعة',
    confirmTitle: 'تأكيد التحويل', total: 'المجموع', from: 'من البطاقة', to: 'إلى', sent: 'المبلغ', theyGet: 'يستلم', note: 'ملاحظة',
    accept: 'ينتظر المبلغ موافقة المستلم. إن لم يوافق خلال 3 أيام، يعود المبلغ إلى بطاقتك تلقائيًا.', confirm: (a) => `تأكيد وإرسال ${ltr(a)}`,
    done: 'تم إرسال المبلغ', doneBody: (a, n) => `ينتظر ${ltr(a)} موافقة ${n}.`, again: 'الإرسال إلى شخص آخر',
  },
};
const STEPS = ['who', 'amount', 'confirm', 'done'];
const money = (v) => '$' + Number(v || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function SendMoney({ initialStep = 'who', initialAmount = '100' }) {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  const [step, setStep] = useState(initialStep);
  const [who, setWho] = useState(0);
  const [amount, setAmount] = useState(initialAmount);
  const [reason, setReason] = useState(t.reasonExample);
  const person = t.people[who], n = Number(amount || 0), error = n > MAX ? t.tooHigh : '';
  const back = () => setStep(STEPS[Math.max(0, STEPS.indexOf(step) - 1)]);
  return (
    <div className="ar-screen">
      <AppHeader variant="modal" title={t.title}
        start={step !== 'who' && step !== 'done' ? <IconButton icon="back" label={t.back} onClick={back} /> : null}
        end={<IconButton icon="close" label={t.close} />} />

      {step === 'who' && (
        <main className="ar-screen-body">
          <SearchField label={t.search} placeholder={t.placeholder} />
          <section className="ar-screen-section" aria-labelledby="send-recent">
            <h2 className="ar-screen-heading" id="send-recent">{t.recent}</h2>
            <div className="ar-screen-scroll">
              {t.people.slice(0, 3).map(([ini, name], i) => (
                <button key={name} type="button" className="ar-qa" onClick={() => { setWho(i); setStep('amount'); }}>
                  <Avatar initials={ini} /><span className="ar-qa-label">{name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </section>
          <SettingsList title={t.contacts}>
            {t.people.map(([ini, name, phone], i) => (
              <SettingsRow key={name} icon={() => <Avatar initials={ini} size="sm" />} label={name} description={<span dir="ltr">{phone}</span>} onClick={() => { setWho(i); setStep('amount'); }} />
            ))}
          </SettingsList>
        </main>
      )}

      {step === 'amount' && (
        <>
          <main className="ar-screen-body">
            <div className="ar-balance">
              <Avatar initials={person[0]} size="lg" />
              <div className="body">{person[1]}</div>
              <div className="ar-screen-meta" dir="ltr">{person[2]}</div>
            </div>
            <AmountInput label={t.amount} value={amount} onChange={setAmount} fee={money(FEE)} hint={t.limits} error={error} />
            <TextField label={t.reason} hint={t.reasonHint} value={reason} onChange={(e) => setReason(e.target.value)} maxLength={60} />
          </main>
          <ActionBar><Button disabled={n < MIN || !!error} onClick={() => setStep('confirm')}>{t.cont}</Button></ActionBar>
        </>
      )}

      {step === 'confirm' && (
        <>
          <main className="ar-screen-body">
            <h2 className="ar-screen-title ar-screen-title-center">{t.confirmTitle}</h2>
            <DetailList items={[
              { label: t.total, value: money(n + FEE), ltr: true, emphasis: true },
              { label: t.from, value: '•••• 1395', ltr: true, icon: 'card' },
              { label: t.to, value: person[1], icon: 'user' },
              { label: t.sent, value: money(n), ltr: true, icon: 'arrowUpRight' },
              { label: t.fee, value: money(FEE), ltr: true, icon: 'doc' },
              { label: t.theyGet, value: money(n), ltr: true, icon: 'check' },
              { label: t.note, value: reason, icon: 'mail' },
            ]} />
            <Alert tone="info">{t.accept}</Alert>
          </main>
          <ActionBar><Button onClick={() => setStep('done')}>{t.confirm(money(n + FEE))}</Button></ActionBar>
        </>
      )}

      {step === 'done' && (
        <>
          <main className="ar-screen-body ar-screen-body-center">
            <Result title={t.done}>{t.doneBody(money(n), person[1])}</Result>
          </main>
          <ActionBar><Button variant="secondary" onClick={() => setStep('who')}>{t.again}</Button></ActionBar>
        </>
      )}
    </div>
  );
}
