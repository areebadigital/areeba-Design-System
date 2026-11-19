import React from 'react';
import { Pressable, Animated, View } from 'react-native';
import { useAsterisk } from '../core/theme.js';
import { useTrack, ids } from '../core/analytics.js';
import { Icon } from '../core/icons.js';
import { Txt, usePressScale } from '../core/ui.js';
const h = React.createElement;

/* A labelled round action under the balance: Top up, Send, More. Put 3–4 in QuickActions. */
function QuickAction(p) {
  const t = useAsterisk(), track = useTrack('QuickAction', p), press = usePressScale(0.94);
  return h(Pressable, { ...ids(p), accessibilityRole: 'button', accessibilityLabel: typeof p.label === 'string' ? p.label : undefined, disabled: p.disabled,
    onPressIn: press.onPressIn, onPressOut: press.onPressOut, onPress: (e) => { track('press', null, 'button'); p.onPress && p.onPress(e); },
    style: { width: 72, alignItems: 'center', gap: t.space.s2 } },
    h(Animated.View, { style: [press.style, { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: p.disabled ? t.colors.surfaceSunken : t.colors.brand }] },
      h(Icon, { name: p.icon, size: 22, color: p.disabled ? t.colors.inkDisabled : t.colors.onBrand })),
    h(Txt, { variant: 'body-sm', weight: 500, color: p.disabled ? 'inkDisabled' : 'ink', style: { textAlign: 'center' } }, p.label));
}
function QuickActions({ label, children, style }) {
  const t = useAsterisk();
  return h(View, { accessibilityRole: 'toolbar', accessibilityLabel: label, style: [{ flexDirection: 'row', justifyContent: 'space-between', gap: t.space.s3 }, style] }, children);
}
export { QuickAction, QuickActions };
