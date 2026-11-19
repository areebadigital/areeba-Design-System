import React from 'react';
import { View, Pressable, Animated, Easing } from 'react-native';
import { useAsterisk } from '../core/theme.js';
import { useShown, useTrack, ids } from '../core/analytics.js';
import { Txt, useEnter } from '../core/ui.js';
import { Icon } from '../core/icons.js';
const h = React.createElement;
const toneIcon = { success: 'check', danger: 'alert', warning: 'alert', info: 'info', neutral: 'info' };

/* Badge: status is always a word (and a dot or icon), never colour alone. */
function Badge({ tone = 'neutral', dot, icon, children }) {
  const t = useAsterisk(), c = t.colors;
  const [bg, fg] = { neutral: [c.surfaceSunken, c.inkMuted], brand: [c.brandSoft, c.brand], success: [c.successSoft, c.success], warning: [c.warningSoft, c.warning], danger: [c.dangerSoft, c.danger], info: [c.infoSoft, c.info] }[tone];
  return h(View, { style: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: t.space.s2, height: 24, borderRadius: 12, backgroundColor: bg } },
    dot ? h(View, { style: { width: 6, height: 6, borderRadius: 3, backgroundColor: fg } }) : null, icon ? h(Icon, { name: icon, size: 14, color: fg }) : null,
    h(Txt, { variant: 'caption', weight: 600, style: { color: fg } }, children));
}

/* Alert: an inline message with a title and what to do. */
function Alert(p) {
  const t = useAsterisk(), tone = p.tone || 'info', c = t.colors, enter = useEnter('rise');
  useShown('Alert', p, { tone });
  const [bg, fg] = { info: [c.infoSoft, c.info], success: [c.successSoft, c.success], warning: [c.warningSoft, c.warning], danger: [c.dangerSoft, c.danger] }[tone];
  return h(Animated.View, { accessibilityRole: tone === 'danger' ? 'alert' : 'summary', accessibilityLiveRegion: tone === 'danger' ? 'assertive' : 'polite',
    style: [enter, { flexDirection: 'row', gap: t.space.s3, padding: t.space.s4, borderRadius: t.radius.md, backgroundColor: bg }] },
    h(Icon, { name: toneIcon[tone], size: 20, color: fg }),
    h(View, { style: { flex: 1, gap: 2 } }, p.title ? h(Txt, { variant: 'body-sm', weight: 600 }, p.title) : null, h(Txt, { variant: 'body-sm' }, p.children)));
}

/* Toast: a short confirmation after an action, with an optional action (Undo). Show it near the bottom of the screen. */
function Toast(p) {
  const t = useAsterisk(), tone = p.tone || 'neutral', track = useTrack('Toast', p), enter = useEnter('rise');
  useShown('Toast', p, { tone });
  return h(Animated.View, { accessibilityLiveRegion: 'polite', style: [enter, { alignSelf: 'center', maxWidth: 420, flexDirection: 'row', alignItems: 'center', gap: t.space.s3, minHeight: 48,
    paddingHorizontal: t.space.s4, paddingVertical: t.space.s3, borderRadius: t.radius.md, backgroundColor: t.colors.night, ...t.shadow.shadow2 }] },
    h(Icon, { name: toneIcon[tone], size: 20, color: tone === 'success' ? t.colors.mint : t.colors.onNight }),
    h(Txt, { variant: 'body-sm', weight: 500, style: { color: t.colors.onNight, flexShrink: 1 } }, p.children),
    p.action ? h(Pressable, { accessibilityRole: 'button', onPress: (e) => { track('action'); p.onAction && p.onAction(e); }, hitSlop: 8 },
      h(Txt, { variant: 'body-sm', weight: 700, style: { color: t.colors.onNight, textDecorationLine: 'underline' } }, p.action)) : null);
}

/* Result: the end of a flow, success or failure; the check pops once. */
function Result(p) {
  const t = useAsterisk(), tone = p.tone || 'success', ok = tone !== 'danger', pop = React.useRef(new Animated.Value(t.reduceMotion ? 1 : 0)).current, enter = useEnter('rise');
  useShown('Result', p, { tone });
  React.useEffect(() => { Animated.timing(pop, { toValue: 1, duration: t.duration('slow'), easing: Easing.bezier(...t.motion.easing.enter), useNativeDriver: true }).start(); }, []); // eslint-disable-line
  return h(View, { accessibilityRole: ok ? 'summary' : 'alert', style: { alignItems: 'center', gap: t.space.s3, paddingVertical: t.space.s8, paddingHorizontal: t.space.s4 } },
    h(Animated.View, { style: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: ok ? t.colors.successSoft : t.colors.dangerSoft,
      opacity: pop, transform: [{ scale: pop.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.6, 1.06, 1] }) }] } }, h(Icon, { name: ok ? 'check' : 'alert', size: 36, color: ok ? t.colors.success : t.colors.danger })),
    h(Animated.View, { style: [enter, { alignItems: 'center', gap: t.space.s3 }] },
      h(Txt, { variant: 'h3', weight: 600, accessibilityRole: 'header', style: { textAlign: 'center' } }, p.title),
      p.children ? h(Txt, { color: 'inkMuted', style: { textAlign: 'center', maxWidth: 320 } }, p.children) : null, p.action || null));
}

/* EmptyState: first-run and no-results screens: what is missing and the action that fixes it. */
function EmptyState(p) {
  const t = useAsterisk();
  return h(View, { style: { alignItems: 'center', gap: t.space.s3, padding: t.space.s8 } },
    h(View, { style: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: t.colors.surfaceSunken } }, h(Icon, { name: p.icon || 'list', size: 26, color: t.colors.inkMuted })),
    h(Txt, { variant: 'h3', weight: 600, accessibilityRole: 'header', style: { textAlign: 'center' } }, p.title),
    p.children ? h(Txt, { color: 'inkMuted', style: { textAlign: 'center', maxWidth: 320 } }, p.children) : null, p.action || null);
}
export { Badge, Alert, Toast, Result, EmptyState };
