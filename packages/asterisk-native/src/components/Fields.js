import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { useAsterisk } from '../core/theme.js';
import { useErrorShown, useTrack, ids } from '../core/analytics.js';
import { Txt, ltr } from '../core/ui.js';
import { Icon } from '../core/icons.js';
const h = React.createElement;

/* Label, hint and error around a field. The error replaces the hint, turns the border danger and is announced. */
function FieldFrame({ label, hint, error, children, counter }) {
  const t = useAsterisk();
  return h(View, { style: { gap: 6, alignSelf: 'stretch' } },
    label ? h(Txt, { variant: 'body-sm', weight: 500, color: 'inkMuted' }, label) : null,
    children,
    (error || hint || counter) ? h(View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: t.space.s3 } },
      h(Txt, { variant: 'body-sm', color: error ? 'danger' : 'inkMuted', accessibilityLiveRegion: error ? 'assertive' : 'none', style: { flex: 1 } }, error || hint || ''),
      counter ? h(Txt, { variant: 'caption', color: 'inkMuted' }, counter) : null) : null);
}
const box = (t, error, focused, multiline) => ({ minHeight: multiline ? 96 : t.size.controlMd, flexDirection: 'row', alignItems: multiline ? 'flex-start' : 'center', gap: t.space.s2,
  paddingHorizontal: 14, paddingVertical: multiline ? 10 : 0, borderRadius: t.radius.xs, borderWidth: focused ? 2 : 1, backgroundColor: t.colors.surfaceField,
  borderColor: error ? t.colors.danger : focused ? t.colors.focus : t.colors.lineStrong });

/* TextField: label, hint, error, prefix. ltr keeps emails, phone numbers and IBANs left-to-right in Arabic. */
function TextField(p) {
  const t = useAsterisk(), [focused, setFocused] = React.useState(false);
  useErrorShown('TextField', p);
  const ltrField = p.ltr || p.dir === 'ltr';
  return h(FieldFrame, { label: p.label, hint: p.hint, error: p.error },
    h(View, { style: [box(t, p.error, focused), ltrField && t.rtl ? { flexDirection: 'row-reverse' } : null] },
      p.prefix ? h(Txt, { weight: 600, color: 'inkMuted' }, ltrField ? ltr(p.prefix) : p.prefix) : null,
      h(TextInput, { ...ids(p), value: p.value, defaultValue: p.defaultValue, onChangeText: p.onChangeText || p.onChange, placeholder: p.placeholder, placeholderTextColor: t.colors.inkMuted,
        secureTextEntry: p.secureTextEntry, keyboardType: p.keyboardType, autoComplete: p.autoComplete, textContentType: p.textContentType, editable: !p.disabled,
        accessibilityLabel: typeof p.label === 'string' ? p.label : undefined, accessibilityHint: p.error || p.hint,
        onFocus: () => setFocused(true), onBlur: () => setFocused(false),
        style: [t.text('body'), { flex: 1, minWidth: 0, color: t.colors.ink, paddingVertical: 10, textAlign: ltrField ? 'left' : t.rtl ? 'right' : 'left', writingDirection: ltrField ? 'ltr' : t.rtl ? 'rtl' : 'ltr' }] })));
}

/* TextArea: several lines; maxLength adds an "n of m characters" counter. */
function TextArea(p) {
  const t = useAsterisk(), [focused, setFocused] = React.useState(false), [val, setVal] = React.useState(p.defaultValue || '');
  useErrorShown('TextArea', p);
  const v = p.value !== undefined ? p.value : val;
  const counter = p.maxLength ? (t.arabic ? `${v.length} من ${p.maxLength} حرفًا` : `${v.length} of ${p.maxLength} characters`) : null;
  return h(FieldFrame, { label: p.label, hint: p.hint, error: p.error, counter },
    h(View, { style: box(t, p.error, focused, true) },
      h(TextInput, { ...ids(p), multiline: true, numberOfLines: p.rows || 4, maxLength: p.maxLength, value: v, onChangeText: (s) => { setVal(s); p.onChangeText && p.onChangeText(s); },
        placeholder: p.placeholder, placeholderTextColor: t.colors.inkMuted, accessibilityLabel: typeof p.label === 'string' ? p.label : undefined,
        onFocus: () => setFocused(true), onBlur: () => setFocused(false), style: [t.text('body'), { flex: 1, minWidth: 0, minHeight: 76, color: t.colors.ink, textAlignVertical: 'top', textAlign: t.rtl ? 'right' : 'left', writingDirection: t.rtl ? 'rtl' : 'ltr' }] })));
}

/* SearchField with a clear button. */
function SearchField(p) {
  const t = useAsterisk(), [val, setVal] = React.useState(p.defaultValue || ''), v = p.value !== undefined ? p.value : val;
  const set = (s) => { setVal(s); p.onChangeText && p.onChangeText(s); };
  return h(View, { style: [box(t, false, false), { paddingHorizontal: t.space.s3 }] },
    h(Icon, { name: 'search', size: 18, color: t.colors.inkMuted }),
    h(TextInput, { ...ids(p), value: v, onChangeText: set, placeholder: p.placeholder, placeholderTextColor: t.colors.inkMuted, accessibilityLabel: p.label, returnKeyType: 'search',
      style: [t.text('body'), { flex: 1, minWidth: 0, color: t.colors.ink, textAlign: t.rtl ? 'right' : 'left', writingDirection: t.rtl ? 'rtl' : 'ltr' }] }),
    v ? h(Pressable, { accessibilityRole: 'button', accessibilityLabel: t.arabic ? 'مسح البحث' : 'Clear search', onPress: () => set(''), hitSlop: 8 }, h(Icon, { name: 'close', size: 16, color: t.colors.inkMuted })) : null);
}

/* FilterChip: a toggle pill above a list; hasPopup shows a chevron. */
function FilterChip(p) {
  const t = useAsterisk(), track = useTrack('FilterChip', p), on = !!p.selected;
  return h(Pressable, { ...ids(p), accessibilityRole: 'button', accessibilityState: { selected: on }, onPress: (e) => { track('press', { selected: !on }, 'button'); p.onPress && p.onPress(e); },
    style: { height: 36, paddingHorizontal: 14, borderRadius: 18, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: t.space.s2,
      backgroundColor: on ? t.colors.brand : t.colors.surfaceRaised, borderColor: on ? t.colors.brand : t.colors.lineStrong } },
    h(Txt, { variant: 'body-sm', weight: 600, style: { color: on ? t.colors.onBrand : t.colors.ink } }, p.label),
    p.hasPopup ? h(Icon, { name: 'chevronDown', size: 16, color: on ? t.colors.onBrand : t.colors.ink }) : null);
}
export { FieldFrame, TextField, TextArea, SearchField, FilterChip };
