import React from 'react';
import { View, Pressable, Modal, Animated } from 'react-native';
import { useAsterisk } from '../core/theme.js';
import { useTrack, ids } from '../core/analytics.js';
import { Txt, useEnter } from '../core/ui.js';
import { Icon } from '../core/icons.js';
const h = React.createElement;

/* AppHeader: start action (back, avatar), the centred title (the screen's header), end actions. variant "modal" adds a drag handle. */
function AppHeader(p) {
  const t = useAsterisk(), modal = p.variant === 'modal';
  return h(View, { style: [{ paddingHorizontal: t.space.s4, paddingVertical: t.space.s3 }, modal ? { paddingTop: t.space.s2, backgroundColor: t.colors.surfaceRaised, borderBottomWidth: 1, borderBottomColor: t.colors.line } : null] },
    modal ? h(View, { style: { alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: t.colors.lineStrong, marginBottom: t.space.s2 } }) : null,
    h(View, { style: { flexDirection: 'row', alignItems: 'center', minHeight: 44, gap: t.space.s3 } },
      h(View, { style: { minWidth: 40, alignItems: 'flex-start' } }, p.start || null),
      h(View, { style: { flex: 1, alignItems: 'center' } }, h(Txt, { variant: 'h3', weight: 600, numberOfLines: 1, accessibilityRole: 'header' }, p.title), p.subtitle ? h(Txt, { variant: 'caption', color: 'inkMuted' }, p.subtitle) : null),
      h(View, { style: { minWidth: 40, flexDirection: 'row', justifyContent: 'flex-end', gap: t.space.s2 } }, p.end || null)));
}

/* TabBar: mobile bottom navigation, 3–5 destinations. */
function TabBar(p) {
  const t = useAsterisk(), track = useTrack('TabBar', p);
  return h(View, { accessibilityRole: 'tablist', style: { flexDirection: 'row', backgroundColor: t.colors.surfaceRaised, borderTopWidth: 1, borderTopColor: t.colors.line, paddingBottom: t.space.s2 } },
    (p.items || []).map((it) => { const on = p.value === it.value;
      return h(Pressable, { key: it.value, accessibilityRole: 'tab', accessibilityState: { selected: on }, onPress: () => { track('change', { value: it.value }, 'navigation'); p.onChange && p.onChange(it.value); },
        style: { flex: 1, alignItems: 'center', gap: 2, paddingTop: t.space.s2, minHeight: t.size.tabbar } },
        h(Icon, { name: it.icon, size: 24, color: on ? t.colors.brand : t.colors.inkMuted }), h(Txt, { variant: 'caption', weight: on ? 700 : 500, color: on ? 'brand' : 'inkMuted' }, it.label)); }));
}

/* ActionBar: the bottom actions of a flow step; one primary, full width. stacked puts a secondary under it. */
function ActionBar({ stacked, children, style }) {
  const t = useAsterisk();
  return h(View, { style: [{ flexDirection: stacked ? 'column' : 'row', gap: t.space.s3, padding: t.space.s4 }, style] },
    React.Children.map(children, (c) => (c ? h(View, { style: { flex: stacked ? 0 : 1, alignSelf: 'stretch' } }, React.cloneElement(c, { block: true })) : null)));
}

/* Sheet: a bottom sheet (the mobile Dialog). Title asks the question; actions repeat the verb. Back button and backdrop close it. */
function Sheet(p) {
  const t = useAsterisk(), track = useTrack('Dialog', p);
  React.useEffect(() => { if (p.open) track('open', { sheet: true, tone: p.tone || 'default' }); }, [p.open]); // eslint-disable-line
  const close = (how) => { track('close', { how }); p.onClose && p.onClose(); };
  if (!p.open) return null;
  return h(Modal, { visible: true, transparent: true, animationType: 'none', onRequestClose: () => close('back') },
    h(SheetBody, { ...p, close, t }));
}
function SheetBody({ t, close, title, actions, children, tone }) {
  const enter = useEnter('sheet'), fade = useEnter('fade');
  return h(View, { style: { flex: 1, justifyContent: 'flex-end' } },
    h(Animated.View, { style: [{ position: 'absolute', top: 0, bottom: 0, start: 0, end: 0, backgroundColor: 'rgba(19, 18, 16, 0.56)' }, { opacity: fade.opacity }] },
      h(Pressable, { style: { flex: 1 }, accessibilityLabel: t.arabic ? 'إغلاق' : 'Close', onPress: () => close('backdrop') })),
    h(Animated.View, { accessibilityViewIsModal: true, accessibilityRole: tone === 'danger' ? 'alert' : undefined, style: [enter, { backgroundColor: t.colors.surfaceRaised, borderTopLeftRadius: t.radius.xl, borderTopRightRadius: t.radius.xl, padding: t.space.s6, gap: t.space.s4, ...t.shadow.shadow3 }] },
      h(View, { style: { alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: t.colors.lineStrong } }),
      h(Txt, { variant: 'h3', weight: 600, accessibilityRole: 'header' }, title),
      typeof children === 'string' ? h(Txt, { color: 'inkMuted' }, children) : children,
      actions ? h(View, { style: { gap: t.space.s3 } }, actions) : null));
}
export { AppHeader, TabBar, ActionBar, Sheet };
