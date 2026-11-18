/**
 * eStore vouchers: browse services, pick a recharge voucher, confirm with your card, get the code.
 * Prices show in USD and LBP; every price includes taxes and fees, and the list says so.
 * `initialStep` opens it at any step (store, list, confirm, done).
 * Uses only areeba components (window.Areeba); copy in English and Arabic, chosen by <html lang>.
 */
import { useState } from 'react';

const { AppHeader, IconButton, SearchField, ServiceTile, SettingsList, SettingsRow, Alert, CardPicker, DetailList, Button, ActionBar, Result, CopyCode, TabBar, ltr } = window.Areeba;

const VOUCHERS = [['15.15', '17.04', '1,525,080', 65], ['22.73', '25.56', '2,287,620', 90], ['45.45', '51.11', '4,574,345', 180]];
const COPY = {
  en: {
    store: 'eStore', history: 'My vouchers', back: 'Back', close: 'Close', search: 'Search services', placeholder: 'Mobile recharge, streaming, bills',
    mobile: 'Mobile recharge', bills: 'Bills', streaming: 'Streaming and games',
    tiles: [['M1', 'Mobile One', 'Recharge vouchers', 'brand'], ['M2', 'Mobile Two', 'Recharge vouchers', 'info'], ['H', 'Home internet', 'Internet and landline', 'success'], ['S', 'Streaming', 'Gift cards', 'warning']],
    listTitle: 'Mobile One recharge', taxes: 'All prices include taxes and fees.', credit: (c) => `${ltr('$' + c)} credit`, valid: (d) => `Valid for ${d} days`,
    pay: 'Pay with', cont: 'Continue', confirmTitle: 'Confirm your purchase', usd: 'Total in USD', lbp: 'Total in LBP', creditL: 'Credit', days: 'Validity', daysV: (d) => `${d} days`,
    from: 'From card', fee: 'Transaction fee', confirm: (a) => `Pay ${ltr(a)}`, done: 'Voucher ready', doneBody: 'Enter the code in your line’s recharge menu.', code: 'Recharge code',
    share: 'Share code', tabs: ['My cards', 'eStore', 'Payments', 'Profile'],
  },
  ar: {
    store: 'المتجر', history: 'قسائمي', back: 'رجوع', close: 'إغلاق', search: 'البحث في الخدمات', placeholder: 'شحن الخط، البث، الفواتير',
    mobile: 'شحن الهاتف', bills: 'الفواتير', streaming: 'البث والألعاب',
    tiles: [['م1', 'موبايل 1', 'قسائم شحن', 'brand'], ['م2', 'موبايل 2', 'قسائم شحن', 'info'], ['إ', 'إنترنت المنزل', 'الإنترنت والهاتف الثابت', 'success'], ['ب', 'البث', 'بطاقات هدايا', 'warning']],
    listTitle: 'شحن موبايل 1', taxes: 'جميع الأسعار تشمل الضرائب والرسوم.', credit: (c) => `رصيد ${ltr('$' + c)}`, valid: (d) => `صالح لمدة ${d} يومًا`,
    pay: 'الدفع بواسطة', cont: 'متابعة', confirmTitle: 'تأكيد الشراء', usd: 'المجموع بالدولار', lbp: 'المجموع بالليرة', creditL: 'الرصيد', days: 'الصلاحية', daysV: (d) => `${d} يومًا`,
    from: 'من البطاقة', fee: 'رسوم المعاملة', confirm: (a) => `ادفع ${ltr(a)}`, done: 'القسيمة جاهزة', doneBody: 'أدخل الرمز في قائمة الشحن الخاصة بخطك.', code: 'رمز الشحن',
    share: 'مشاركة الرمز', tabs: ['بطاقاتي', 'المتجر', 'المدفوعات', 'الملف'],
  },
};
const STEPS = ['store', 'list', 'confirm', 'done'];

export default function Vouchers({ initialStep = 'store' }) {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  const [step, setStep] = useState(initialStep);
  const [pick, setPick] = useState(0);
  const [card, setCard] = useState('5678');
  const [credit, usd, lbp, days] = VOUCHERS[pick];
  const back = () => setStep(STEPS[Math.max(0, STEPS.indexOf(step) - 1)]);

  if (step === 'store') {
    return (
      <div className="ar-screen">
        <AppHeader title={t.store} end={<IconButton icon="doc" label={t.history} />} />
        <main className="ar-screen-body">
          <SearchField label={t.search} placeholder={t.placeholder} />
          <section className="ar-screen-section" aria-labelledby="store-mobile">
            <h2 className="ar-screen-heading" id="store-mobile">{t.mobile}</h2>
            <div className="ar-tiles">
              {t.tiles.slice(0, 2).map(([ini, name, desc, tone]) => <ServiceTile key={name} initials={ini} label={name} description={desc} tone={tone} onClick={() => setStep('list')} />)}
            </div>
          </section>
          <section className="ar-screen-section" aria-labelledby="store-more">
            <h2 className="ar-screen-heading" id="store-more">{t.bills} · {t.streaming}</h2>
            <div className="ar-tiles">
              {t.tiles.slice(2).map(([ini, name, desc, tone]) => <ServiceTile key={name} initials={ini} label={name} description={desc} tone={tone} />)}
            </div>
          </section>
        </main>
        <TabBar value="store" label={t.store}
          items={[{ value: 'cards', label: t.tabs[0], icon: 'card' }, { value: 'store', label: t.tabs[1], icon: 'store' }, { value: 'pay', label: t.tabs[2], icon: 'send' }, { value: 'me', label: t.tabs[3], icon: 'user' }]} />
      </div>
    );
  }
  return (
    <div className="ar-screen">
      <AppHeader variant="modal" title={t.listTitle}
        start={step !== 'done' ? <IconButton icon="back" label={t.back} onClick={back} /> : null}
        end={<IconButton icon="close" label={t.close} />} />

      {step === 'list' && (
        <>
          <main className="ar-screen-body">
            <Alert tone="warning">{t.taxes}</Alert>
            <SettingsList>
              {VOUCHERS.map(([c, u, l, d], i) => (
                <SettingsRow key={c} icon="phone" label={<span dir="ltr">{'$' + u + ' · LBP ' + l}</span>} description={t.credit(c) + ' · ' + t.valid(d)} onClick={() => { setPick(i); setStep('confirm'); }} />
              ))}
            </SettingsList>
          </main>
        </>
      )}

      {step === 'confirm' && (
        <>
          <main className="ar-screen-body">
            <h2 className="ar-screen-title ar-screen-title-center">{t.confirmTitle}</h2>
            <DetailList items={[
              { label: t.usd, value: '$' + usd, ltr: true, emphasis: true },
              { label: t.lbp, value: 'LBP ' + lbp, ltr: true },
              { label: t.creditL, value: '$' + credit, ltr: true },
              { label: t.days, value: t.daysV(days) },
              { label: t.fee, value: '$0.75', ltr: true },
            ]} />
            <CardPicker label={t.pay} value={card} onChange={setCard} cards={[{ value: '5678', last4: '5678', balance: '$1,395.72' }, { value: '9101', last4: '9101', balance: '$240.10', variant: 'brand' }]} />
          </main>
          <ActionBar><Button onClick={() => setStep('done')}>{t.confirm('$' + (Number(usd) + 0.75).toFixed(2))}</Button></ActionBar>
        </>
      )}

      {step === 'done' && (
        <>
          <main className="ar-screen-body ar-screen-body-center">
            <Result title={t.done}>{t.doneBody}</Result>
            <CopyCode label={t.code} code="3FBV 953N DN71" />
          </main>
          <ActionBar><Button variant="secondary">{t.share}</Button></ActionBar>
        </>
      )}
    </div>
  );
}
