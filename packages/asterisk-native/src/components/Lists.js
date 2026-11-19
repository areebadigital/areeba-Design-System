import React from 'react';
import { View, Pressable } from 'react-native';
import { useAsterisk } from '../core/theme.js';
import { useTrack, ids } from '../core/analytics.js';
import { Txt, ltr } from '../core/ui.js';
import { Icon } from '../core/icons.js';
import { Switch } from './Controls.js';
const h = React.createElement;

/* ListItem: a transaction or account row. A leading "+" on the amount makes it a credit (success); spending stays ink. */
function ListItem(p) {
  const t = useAsterisk(), credit = typeof p.amount === 'string' && p.amount.charAt(0) === '+';
  const body = [
    p.leading !== undefined ? h(View, { key: 'l', style: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: t.colors.surfaceSunken } },
      typeof p.leading === 'string' ? h(Txt, { variant: 'body-sm', weight: 700 }, p.leading) : p.leading) : null,
    h(View, { key: 'm', style: { flex: 1, minWidth: 0 } }, h(Txt, { weight: 500, numberOfLines: 1 }, p.title), p.subtitle ? h(Txt, { variant: 'body-sm', color: 'inkMuted', numberOfLines: 1 }, p.subtitle) : null),
    h(View, { key: 'a', style: { alignItems: 'flex-end', gap: 2 } }, p.amount ? h(Txt, { variant: 'amount', weight: 600, color: credit ? 'success' : 'ink', style: { writingDirection: 'ltr' } }, ltr(p.amount)) : null, p.trailing || null)];
  const style = { flexDirection: 'row', alignItems: 'center', gap: t.space.s3, paddingVertical: t.space.s3, paddingHorizontal: t.space.s4 };
  return p.onPress ? h(Pressable, { ...ids(p), accessibilityRole: 'button', onPress: p.onPress, style: ({ pressed }) => [style, pressed ? { backgroundColor: t.colors.surfaceSunken } : null] }, body) : h(View, { style }, body);
}
function List({ children, style }) {
  const t = useAsterisk(), kids = React.Children.toArray(children);
  return h(View, { accessibilityRole: 'list', style: [{ backgroundColor: t.colors.surfaceRaised, borderRadius: t.radius.lg, borderWidth: 1, borderColor: t.colors.line, overflow: 'hidden' }, style] },
    kids.map((k, i) => h(View, { key: i, style: i ? { borderTopWidth: 1, borderTopColor: t.colors.line } : null }, k)));
}

/* SettingsList: a titled group of SettingsRow (link, value, switch, danger). Chevrons flip in right-to-left. */
function SettingsList({ title, children }) {
  const t = useAsterisk();
  return h(View, { style: { gap: t.space.s2 } }, title ? h(Txt, { weight: 600, accessibilityRole: 'header' }, title) : null, h(List, null, children));
}
function SettingsRow(p) {
  const t = useAsterisk(), track = useTrack('SettingsRow', p), danger = p.tone === 'danger', tg = p.toggle;
  const col = p.disabled ? 'inkDisabled' : danger ? 'danger' : 'ink';
  const inner = h(View, { style: { flexDirection: 'row', alignItems: 'center', gap: t.space.s3, minHeight: 52, paddingHorizontal: t.space.s4, paddingVertical: t.space.s3 } },
    p.icon ? h(Icon, { name: p.icon, size: 20, color: danger ? t.colors.danger : p.disabled ? t.colors.inkDisabled : t.colors.inkMuted }) : null,
    h(View, { style: { flex: 1 } }, h(Txt, { weight: 500, color: col }, p.label), p.description ? h(Txt, { variant: 'caption', color: 'inkMuted' }, p.description) : null),
    p.value !== undefined ? h(Txt, { variant: 'body-sm', color: 'inkMuted' }, p.value) : null,
    tg ? h(Switch, { checked: tg.checked, defaultChecked: tg.defaultChecked, onChange: tg.onChange, disabled: p.disabled, analyticsId: p.analyticsId }) : null,
    p.onPress && !tg ? h(Icon, { name: 'chevronRight', size: 18, color: danger ? t.colors.danger : t.colors.inkMuted }) : null);
  return p.onPress && !tg ? h(Pressable, { ...ids(p), accessibilityRole: 'button', disabled: p.disabled, onPress: (e) => { track('press', { danger }, 'button'); p.onPress(e); },
    style: ({ pressed }) => (pressed ? { backgroundColor: t.colors.surfaceSunken } : null) }, inner) : inner;
}

/* DetailList: label and value rows (receipts, summaries). ltr isolates amounts and card numbers; emphasis makes the total. */
function DetailList({ items = [] }) {
  const t = useAsterisk();
  return h(View, null, items.map((it, i) => h(View, { key: i, style: [{ flexDirection: 'row', justifyContent: 'space-between', gap: t.space.s4, paddingVertical: t.space.s2 },
    it.emphasis ? { paddingVertical: t.space.s3, borderBottomWidth: 1, borderBottomColor: t.colors.line, marginBottom: t.space.s1 } : null] },
    h(Txt, { color: it.emphasis ? 'ink' : 'inkMuted', weight: it.emphasis ? 700 : 400 }, it.label),
    typeof it.value === 'string' ? h(Txt, { weight: it.emphasis ? 700 : 500, style: { textAlign: 'right', flexShrink: 1, writingDirection: it.ltr ? 'ltr' : undefined } }, it.ltr ? ltr(it.value) : it.value) : it.value)));
}
export { ListItem, List, SettingsList, SettingsRow, DetailList };
