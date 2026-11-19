import React from 'react';
import { View, TextInput } from 'react-native';
import { useAsterisk } from '../core/theme.js';
import { useErrorShown, ids } from '../core/analytics.js';
import { Txt, ltr } from '../core/ui.js';
import { Icon } from '../core/icons.js';
const h = React.createElement;

/* Avatar: initials on a tinted circle; sm 32, md 48, lg 88. Decorative unless `label` is given. */
function Avatar({ initials, size = 'md', status, label }) {
  const t = useAsterisk(), d = { sm: 32, md: 48, lg: 88 }[size], fs = { sm: 12, md: 16, lg: 28 }[size];
  return h(View, { accessible: !!label, accessibilityLabel: label, importantForAccessibility: label ? 'yes' : 'no-hide-descendants',
    style: { width: d, height: d, borderRadius: d / 2, alignItems: 'center', justifyContent: 'center', backgroundColor: t.colors.brandSoft } },
    h(Txt, { weight: 700, style: { color: t.colors.brand, fontSize: fs, lineHeight: Math.round(fs * 1.3) } }, initials),
    status ? h(View, { style: { position: 'absolute', bottom: 2, end: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: t.colors.success, borderWidth: 2, borderColor: t.colors.surfaceRaised } }) : null);
}

/* PaymentCard: the card face, Night or brand; reads like the physical card in every language (left-to-right). */
function PaymentCard({ last4, holder, expiry, network = 'VISA', variant = 'night', frozen, label }) {
  const t = useAsterisk(), brand = variant === 'brand', fg = brand ? t.colors.onBrand : t.colors.onNight;
  return h(View, { accessibilityLabel: label || `${t.arabic ? 'بطاقة تنتهي بـ' : 'Card ending'} ${last4}${frozen ? (t.arabic ? '، مجمّدة' : ', frozen') : ''}`, accessible: true,
    style: { aspectRatio: 1.586, alignSelf: 'stretch', maxWidth: 420, borderRadius: t.radius.lg, padding: t.space.s5, justifyContent: 'space-between', backgroundColor: brand ? t.colors.brand : t.colors.night, opacity: frozen ? 0.7 : 1 } },
    h(View, { style: { flexDirection: t.rtl ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' } }, h(Txt, { variant: 'h3', weight: 700, style: { color: fg } }, 'areeba'),
      frozen ? h(Txt, { variant: 'caption', weight: 600, style: { color: fg } }, t.arabic ? 'مجمّدة' : 'Frozen') : null),
    h(View, { style: { alignItems: t.rtl ? 'flex-end' : 'flex-start' } }, h(Icon, { name: 'contactless', size: 24, color: fg })),
    h(Txt, { variant: 'amount', weight: 500, style: { color: fg, letterSpacing: 2, textAlign: t.rtl ? 'right' : 'left', writingDirection: 'ltr' } }, ltr('•••• •••• •••• ' + last4)),
    h(View, { style: { flexDirection: t.rtl ? 'row-reverse' : 'row', justifyContent: 'space-between' } }, h(Txt, { variant: 'caption', weight: 600, style: { color: fg } }, ltr(String(holder || '').toUpperCase())),
      h(Txt, { variant: 'caption', weight: 600, style: { color: fg } }, ltr(`${expiry}   ${network}`))));
}

/* PageDots: carousel position; the current dot is a wider ink bar. */
function PageDots({ count, current }) {
  const t = useAsterisk();
  return h(View, { accessibilityLabel: t.arabic ? `${current + 1} من ${count}` : `${current + 1} of ${count}`, style: { flexDirection: 'row', justifyContent: 'center', gap: 6 } },
    Array.from({ length: count }, (_, i) => h(View, { key: i, style: { width: i === current ? 16 : 6, height: 6, borderRadius: 3, backgroundColor: i === current ? t.colors.ink : t.colors.lineStrong } })));
}

/* CodeInput: one real input drawn as boxes, so paste and SMS autofill (textContentType oneTimeCode) work. Digits 0–9, left-to-right. */
function CodeInput(p) {
  const t = useAsterisk(), n = p.length || 6, [v, setV] = React.useState(p.defaultValue || ''), val = p.value !== undefined ? p.value : v;
  useErrorShown('CodeInput', p);
  const set = (s) => { s = s.replace(/\D/g, '').slice(0, n); setV(s); p.onChange && p.onChange(s); if (s.length === n && p.onComplete) p.onComplete(s); };
  return h(View, { style: { alignItems: 'center', gap: 6 } },
    h(View, { style: { direction: 'ltr' } },
      h(View, { style: { flexDirection: 'row', gap: t.space.s2 } }, Array.from({ length: n }, (_, i) => h(View, { key: i, style: { width: 48, height: 56, borderRadius: t.radius.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: t.colors.surfaceField,
        borderWidth: i === Math.min(val.length, n - 1) ? 2 : 1, borderColor: p.error ? t.colors.danger : i === Math.min(val.length, n - 1) ? t.colors.brand : val[i] ? t.colors.inkMuted : t.colors.lineStrong } },
        h(Txt, { variant: 'h2', weight: 600 }, val[i] || '')))),
      h(TextInput, { ...ids(p), value: val, onChangeText: set, keyboardType: 'number-pad', textContentType: 'oneTimeCode', autoComplete: 'sms-otp', autoFocus: p.autoFocus, caretHidden: true,
        accessibilityLabel: typeof p.label === 'string' ? p.label : (t.arabic ? 'رمز التحقق' : 'Verification code'), style: { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0, opacity: 0.02, color: 'transparent' } })),
    (p.error || p.hint) ? h(Txt, { variant: 'body-sm', color: p.error ? 'danger' : 'inkMuted', accessibilityLiveRegion: p.error ? 'assertive' : 'none', style: { textAlign: 'center' } }, p.error || p.hint) : null);
}
export { Avatar, PaymentCard, PageDots, CodeInput };
