/**
 * Top up: choose how, pick the card, enter the amount, confirm, done.
 * One component holds the whole flow; `initialStep` opens it at any step (method, card, amount, confirm, done).
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
import { useState } from 'react';

const { AppHeader, IconButton, SettingsList, SettingsRow, CardPicker, AmountInput, NumberPad, padInput, DetailList, Button, ActionBar, Result, Alert, ltr } = window.Areeba;

const MIN = 20, MAX = 2500;
const COPY = {
  en: {
    title: 'Top up', subtitle: 'To •••• 1395', back: 'Back', close: 'Close', how: 'Add money to my card', howBody: 'Top up from another areeba card or any international card.',
    fromAreeba: 'From my areeba card', fromAreebaSub: 'Instant · No fees', international: 'From an international card', internationalSub: 'Instant · $1.00 fee',
    pick: 'From this card', supplementary: 'Supplementary', amount: 'Amount', limits: `Min ${ltr('$20')} · Max ${ltr('$2,500')}`,
    tooLow: `The minimum top up is ${ltr('$20')}.`, tooHigh: `The maximum top up is ${ltr('$2,500')}.`, cont: 'Continue',
    confirmTitle: 'Confirm your top up', total: 'Total', from: 'From card', to: 'To card', fee: 'Transaction fee', free: 'Free', confirm: (a) => `Confirm and top up ${ltr(a)}`,
    note: 'Money is available on the card straight away.', done: 'Top up successful', doneBody: (a) => `You added ${ltr(a)} to card ${ltr('•••• 1395')}.`, view: 'View receipt',
  },
  ar: {
    title: 'شحن', subtitle: `إلى ${ltr('•••• 1395')}`, back: 'رجوع', close: 'إغلاق', how: 'إضافة أموال إلى بطاقتي', howBody: 'اشحن من بطاقة areeba أخرى أو من أي بطاقة دولية.',
    fromAreeba: 'من بطاقة areeba الخاصة بي', fromAreebaSub: 'فوري · بدون رسوم', international: 'من بطاقة دولية', internationalSub: `فوري · رسوم ${ltr('$1.00')}`,
    pick: 'من هذه البطاقة', supplementary: 'بطاقة إضافية', amount: 'المبلغ', limits: `الحد الأدنى ${ltr('$20')} · الحد الأقصى ${ltr('$2,500')}`,
    tooLow: `الحد الأدنى للشحن هو ${ltr('$20')}.`, tooHigh: `الحد الأقصى للشحن هو ${ltr('$2,500')}.`, cont: 'متابعة',
    confirmTitle: 'تأكيد الشحن', total: 'المجموع', from: 'من البطاقة', to: 'إلى البطاقة', fee: 'رسوم المعاملة', free: 'مجاني', confirm: (a) => `تأكيد وشحن ${ltr(a)}`,
    note: 'يصبح المبلغ متاحًا على البطاقة فورًا.', done: 'تم الشحن بنجاح', doneBody: (a) => `أضفت ${ltr(a)} إلى البطاقة ${ltr('•••• 1395')}.`, view: 'عرض الإيصال',
  },
};
const STEPS = ['method', 'card', 'amount', 'confirm', 'done'];
const money = (v) => '$' + Number(v || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function TopUp({ initialStep = 'method', initialAmount = '' }) {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  const [step, setStep] = useState(initialStep);
  const [card, setCard] = useState('5678');
  const [amount, setAmount] = useState(initialAmount);
  const n = Number(amount || 0), error = amount && n < MIN ? t.tooLow : n > MAX ? t.tooHigh : '';
  const back = () => setStep(STEPS[Math.max(0, STEPS.indexOf(step) - 1)]);
  return (
    <div className="ar-screen">
      <AppHeader variant="modal" title={t.title} subtitle={<span dir="auto">{t.subtitle}</span>}
        start={step !== 'method' && step !== 'done' ? <IconButton icon="back" label={t.back} onClick={back} /> : null}
        end={<IconButton icon="close" label={t.close} />} />

      {step === 'method' && (
        <main className="ar-screen-body">
          <div>
            <h2 className="ar-screen-title">{t.how}</h2>
            <p className="ar-screen-lead">{t.howBody}</p>
          </div>
          <SettingsList>
            <SettingsRow icon="card" label={t.fromAreeba} description={t.fromAreebaSub} onClick={() => setStep('card')} />
            <SettingsRow icon="globe" label={t.international} description={t.internationalSub} onClick={() => setStep('card')} />
          </SettingsList>
        </main>
      )}

      {step === 'card' && (
        <>
          <main className="ar-screen-body">
            <CardPicker label={t.pick} value={card} onChange={setCard} name="fromCard" cards={[
              { value: '5678', last4: '5678', balance: '$1,395.72' },
              { value: '9101', last4: '9101', balance: '$240.10', variant: 'brand' },
              { value: '1121', last4: '1121', note: t.supplementary, disabled: true },
            ]} />
          </main>
          <ActionBar><Button onClick={() => setStep('amount')}>{t.cont}</Button></ActionBar>
        </>
      )}

      {step === 'amount' && (
        <>
          <main className="ar-screen-body ar-screen-body-center">
            <AmountInput label={t.amount} value={amount} readOnly fee={0} hint={t.limits} error={error} />
          </main>
          <div className="ar-screen-pad">
            <NumberPad decimal onKey={(k) => setAmount(padInput(amount, k))} />
          </div>
          <ActionBar><Button disabled={!n || !!error} onClick={() => setStep('confirm')}>{t.cont}</Button></ActionBar>
        </>
      )}

      {step === 'confirm' && (
        <>
          <main className="ar-screen-body">
            <h2 className="ar-screen-title ar-screen-title-center">{t.confirmTitle}</h2>
            <DetailList items={[
              { label: t.total, value: money(amount), ltr: true, emphasis: true },
              { label: t.from, value: '•••• ' + card, ltr: true, icon: 'card' },
              { label: t.to, value: '•••• 1395', ltr: true, icon: 'card' },
              { label: t.fee, value: t.free, icon: 'doc' },
            ]} />
            <Alert tone="info">{t.note}</Alert>
          </main>
          <ActionBar><Button onClick={() => setStep('done')}>{t.confirm(money(amount))}</Button></ActionBar>
        </>
      )}

      {step === 'done' && (
        <>
          <main className="ar-screen-body ar-screen-body-center">
            <Result title={t.done}>{t.doneBody(money(amount))}</Result>
          </main>
          <ActionBar><Button variant="secondary">{t.view}</Button></ActionBar>
        </>
      )}
    </div>
  );
}
