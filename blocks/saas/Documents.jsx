/**
 * Merchant portal, Business documents: what is still needed (a meter and a deadline), one panel per document with
 * file upload (uploaded, uploading, and errors), the document type as radio buttons, notes for the reviewer, and submit.
 * For areeba's SaaS products (merchant and bank portals). Uses only areeba components (window.Areeba);
 * copy in English and Arabic, chosen by <html lang>.
 */
const { Sidebar, Panel, Meter, Alert, FileUpload, RadioGroup, TextArea, Button } = window.Areeba;

const MB10 = 10 * 1024 * 1024;
const COPY = {
  en: {
    title: 'Business documents', lead: 'We need these to keep your payouts running. We review them within 2 business days.',
    progress: 'Documents ready', progressText: '2 of 4', due: 'Upload the rest by 5 December to keep payouts on schedule.',
    rules: 'PDF, JPG or PNG, up to 10 MB',
    register: 'Commercial register', registerDesc: 'The latest extract, issued in the last 3 months.',
    owner: 'Owner’s ID', ownerDesc: 'For each owner with 25% or more of the business.', idType: 'Document type', idTypes: ['National ID', 'Passport'], idHint: 'Front and back, in colour.',
    bank: 'Bank letter', bankDesc: 'On the bank’s letterhead, showing the account payouts go to.', bankError: 'Upload a bank letter to continue.',
    notes: 'Anything we should know?', notesLabel: 'Notes for the reviewer', notesHint: 'For example, a change of address or owner.',
    draft: 'Save draft', submit: 'Submit for review',
    errorsTitle: 'Two documents need attention', errorsBody: 'Replace the file that was not accepted and add the bank letter, then submit again.',
    files: { register: 'commercial-register.pdf', idFront: 'id-front.jpg', idBack: 'id-back.jpg', bad: 'bank-letter.heic' }, badType: 'This file type is not accepted.',
    nav: ['Overview', 'Transactions', 'Payouts', 'Stores', 'Reports', 'Settings'], footer: 'Green Grocer · Main branch',
  },
  ar: {
    title: 'مستندات النشاط التجاري', lead: 'نحتاج إليها لتبقى المدفوعات مستمرة. نراجعها خلال يومَي عمل.',
    progress: 'المستندات الجاهزة', progressText: '2 من 4', due: 'حمّل الباقي قبل 5 ديسمبر لتبقى المدفوعات في موعدها.',
    rules: 'PDF أو JPG أو PNG، حتى 10 ميغابايت',
    register: 'السجل التجاري', registerDesc: 'أحدث نسخة، صادرة خلال آخر 3 أشهر.',
    owner: 'هوية المالك', ownerDesc: 'لكل مالك يملك 25% أو أكثر من النشاط التجاري.', idType: 'نوع المستند', idTypes: ['بطاقة الهوية', 'جواز السفر'], idHint: 'الوجه والظهر، بالألوان.',
    bank: 'إفادة مصرفية', bankDesc: 'على ورق المصرف الرسمي، وتُظهر الحساب الذي تُحوَّل إليه المدفوعات.', bankError: 'حمّل الإفادة المصرفية للمتابعة.',
    notes: 'هل هناك ما يجب أن نعرفه؟', notesLabel: 'ملاحظات للمراجع', notesHint: 'مثلًا، تغيير العنوان أو المالك.',
    draft: 'حفظ المسودة', submit: 'إرسال للمراجعة',
    errorsTitle: 'مستندان يحتاجان إلى انتباهك', errorsBody: 'استبدل الملف غير المقبول وأضف الإفادة المصرفية، ثم أرسل مجددًا.',
    files: { register: 'السجل-التجاري.pdf', idFront: 'الهوية-الوجه.jpg', idBack: 'الهوية-الظهر.jpg', bad: 'الإفادة-المصرفية.heic' }, badType: 'نوع الملف هذا غير مقبول.',
    nav: ['نظرة عامة', 'المعاملات', 'المدفوعات', 'المتاجر', 'التقارير', 'الإعدادات'], footer: 'البقالة الخضراء · الفرع الرئيسي',
  },
};

export default function Documents({ errors = false }) {
  const t = COPY[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
  return (
    <div className="ar-app">
      <Sidebar value="settings" footer={t.footer} items={[
        { value: 'home', label: t.nav[0], icon: 'home' }, { value: 'tx', label: t.nav[1], icon: 'list', count: '1,284' }, { value: 'payouts', label: t.nav[2], icon: 'send' },
        { value: 'stores', label: t.nav[3], icon: 'store' }, { value: 'reports', label: t.nav[4], icon: 'chart' }, { value: 'settings', label: t.nav[5], icon: 'settings' }]} />
      <main className="ar-app-main">
        <form className="ar-app-narrow" onSubmit={(e) => e.preventDefault()}>
          <div>
            <h1 className="ar-app-title">{t.title}</h1>
            <p className="ar-app-lead">{t.lead}</p>
          </div>
          {errors
            ? <Alert tone="danger" title={t.errorsTitle}>{t.errorsBody}</Alert>
            : <Meter label={t.progress} value={2} max={4} valueText={t.progressText} hint={t.due} tone="success" />}

          <Panel title={t.register} description={t.registerDesc}>
            <FileUpload label={t.register} hint={t.rules} accept=".pdf,.jpg,.png" maxSize={MB10}
              defaultFiles={[{ name: t.files.register, size: 1258291, status: 'done' }]} />
          </Panel>

          <Panel title={t.owner} description={t.ownerDesc}>
            <RadioGroup label={t.idType} name="idType" orientation="horizontal" defaultValue="id"
              options={[{ value: 'id', label: t.idTypes[0] }, { value: 'passport', label: t.idTypes[1] }]} />
            <FileUpload label={t.owner} hint={`${t.idHint} ${t.rules}`} accept=".pdf,.jpg,.png" maxSize={MB10} multiple
              defaultFiles={errors
                ? [{ name: t.files.idFront, size: 845000, status: 'done' }, { name: t.files.bad, size: 3100000, status: 'error', error: t.badType }]
                : [{ name: t.files.idFront, size: 845000, status: 'done' }, { name: t.files.idBack, size: 812000, status: 'uploading', progress: 60 }]} />
          </Panel>

          <Panel title={t.bank} description={t.bankDesc}>
            <FileUpload label={t.bank} hint={errors ? undefined : t.rules} error={errors ? t.bankError : undefined} accept=".pdf,.jpg,.png" maxSize={MB10} />
          </Panel>

          <Panel title={t.notes} footer={<><Button variant="secondary">{t.draft}</Button><Button type="submit">{t.submit}</Button></>}>
            <TextArea label={t.notesLabel} hint={t.notesHint} maxLength={500} />
          </Panel>
        </form>
      </main>
    </div>
  );
}
