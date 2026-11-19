import React from 'react';
import { View, Pressable, Animated, Easing } from 'react-native';
import { useAsterisk } from '../core/theme.js';
import { useErrorShown, useTrack, ids } from '../core/analytics.js';
import { Txt, ltr } from '../core/ui.js';
import { Icon } from '../core/icons.js';
const h = React.createElement;

/* Applies a NumberPad key to an amount string: one point, two decimals, no leading zeros (same as the web padInput). */
function padInput(value, key, maxDigits = 9) {
  let v = String(value || '');
  if (key === 'back') return v.slice(0, -1);
  if (key === '.') return v.includes('.') ? v : (v || '0') + '.';
  if (v.includes('.') && v.split('.')[1].length >= 2) return v;
  if (v.replace('.', '').length >= maxDigits) return v;
  if (v === '0') return key;
  return v + key;
}
const group = (v) => { const [a, b] = String(v || '').split('.'); return (a || '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (b !== undefined ? '.' + b : ''); };

/* The big amount, always left-to-right; fee 0 shows Free in success; error replaces the hint and is announced. */
function AmountInput(p) {
  const t = useAsterisk(); useErrorShown('AmountInput', p);
  const free = p.fee === 0;
  return h(View, { ...ids(p), style: { alignItems: 'center', gap: t.space.s2 } },
    p.label ? h(Txt, { variant: 'body-sm', weight: 500, color: 'inkMuted' }, p.label) : null,
    h(View, { style: { flexDirection: 'row', direction: 'ltr', alignItems: 'baseline', gap: t.space.s1 }, accessibilityLabel: `${p.currency || '$'}${group(p.value) || '0'}` },
      h(Txt, { variant: 'h1', weight: 500, color: 'inkMuted' }, p.currency || '$'),
      h(Txt, { variant: 'amount-xl', weight: 600, color: p.error ? 'danger' : 'ink' }, group(p.value) || '0')),
    p.error ? h(Txt, { variant: 'caption', weight: 500, color: 'danger', accessibilityLiveRegion: 'assertive' }, p.error)
      : h(View, { style: { alignItems: 'center' } },
        p.fee !== undefined ? h(Txt, { variant: 'caption', color: 'inkMuted' }, (p.feeLabel || (t.arabic ? 'رسوم المعاملة' : 'Transaction fee')) + ' ', h(Txt, { variant: 'caption', weight: 600, color: free ? 'success' : 'ink' }, free ? (t.arabic ? 'مجاني' : 'Free') : p.fee)) : null,
        p.hint ? h(Txt, { variant: 'caption', color: 'inkMuted' }, p.hint) : null));
}

/* Number pad: digits stay 0–9 and left-to-right in Arabic, like phone keypads. onKey receives "0"–"9", "." and "back". */
function NumberPad(p) {
  const t = useAsterisk();
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', p.decimal ? '.' : '', '0', 'back'];
  return h(View, { accessibilityLabel: p.label, style: { direction: 'ltr', flexDirection: 'row', flexWrap: 'wrap', gap: t.space.s2 } }, keys.map((k, i) =>
    k === '' ? h(View, { key: i, style: { width: '31%', height: 56 } }) :
    h(Pressable, { key: i, accessibilityRole: 'button', accessibilityLabel: k === 'back' ? (t.arabic ? 'حذف' : 'Delete') : k, disabled: p.disabled, onPress: () => p.onKey && p.onKey(k),
      style: ({ pressed }) => ({ width: '31%', flexGrow: 1, height: 56, borderRadius: t.radius.md, alignItems: 'center', justifyContent: 'center',
        backgroundColor: k === 'back' ? 'transparent' : pressed ? t.colors.surfaceSunken : t.colors.surfaceRaised, borderWidth: k === 'back' ? 0 : 1, borderColor: t.colors.line,
        transform: [{ scale: pressed && !t.reduceMotion ? 0.96 : 1 }] }) },
      k === 'back' ? h(Icon, { name: 'backspace', size: 26 }) : h(Txt, { variant: 'h2', weight: 500 }, k))));
}

/* PasscodeDots: filled dots for digits entered; error shakes once (not with reduced motion) and is announced. */
function PasscodeDots(p) {
  const t = useAsterisk(), n = p.length || 6, c = Math.min(p.filled || 0, n), shake = React.useRef(new Animated.Value(0)).current;
  useErrorShown('PasscodeDots', p);
  React.useEffect(() => { if (p.error && !t.reduceMotion) Animated.sequence([-1, 1, -1, 0].map((v) => Animated.timing(shake, { toValue: v * 6, duration: t.duration('base') / 4, easing: Easing.linear, useNativeDriver: true }))).start(); }, [p.error]); // eslint-disable-line
  const col = p.error ? t.colors.danger : t.colors.ink;
  return h(View, { style: { alignItems: 'center', gap: t.space.s3 } },
    h(Animated.View, { accessibilityLabel: t.arabic ? `أُدخل ${c} من ${n} أرقام` : `${c} of ${n} digits entered`, style: { flexDirection: 'row', direction: 'ltr', gap: t.space.s4, transform: [{ translateX: shake }] } },
      Array.from({ length: n }, (_, i) => h(View, { key: i, style: { width: 14, height: 14, borderRadius: 7, borderWidth: 1.5, borderColor: i < c || p.error ? col : t.colors.lineStrong, backgroundColor: i < c ? col : 'transparent' } }))),
    p.error ? h(Txt, { variant: 'body-sm', weight: 500, color: 'danger', accessibilityLiveRegion: 'assertive', style: { textAlign: 'center' } }, p.error) : null);
}

/* Balance hero with a show/hide toggle; the amount is isolated left-to-right. */
function Balance(p) {
  const t = useAsterisk(), track = useTrack('Balance', p), [hidden, setHidden] = React.useState(!!p.defaultHidden), hide = p.hidden !== undefined ? p.hidden : hidden;
  const toggle = () => { track('toggle', { hidden: !hide }); setHidden(!hide); p.onToggle && p.onToggle(!hide); };
  return h(View, { style: { alignItems: 'center', gap: 2 } },
    h(View, { style: { flexDirection: 'row', alignItems: 'center', gap: t.space.s1 } },
      h(Txt, { variant: 'body-sm', color: 'inkMuted' }, p.label || (t.arabic ? 'الرصيد المتاح' : 'Available balance')),
      h(Pressable, { accessibilityRole: 'button', accessibilityLabel: hide ? (t.arabic ? 'إظهار الرصيد' : 'Show balance') : (t.arabic ? 'إخفاء الرصيد' : 'Hide balance'), onPress: toggle, hitSlop: 10 },
        h(Icon, { name: hide ? 'eyeOff' : 'eye', size: 18, color: t.colors.inkMuted }))),
    h(Txt, { variant: 'amount-xl', weight: 700, accessibilityLabel: hide ? (t.arabic ? 'الرصيد مخفي' : 'Balance hidden') : undefined, style: { writingDirection: 'ltr' } }, hide ? '••••••' : ltr(p.amount)));
}
export { padInput, AmountInput, NumberPad, PasscodeDots, Balance };
