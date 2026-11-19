import React from 'react';
import { Pressable, Animated, View } from 'react-native';
import { useAsterisk } from '../core/theme.js';
import { useTrack, ids } from '../core/analytics.js';
import { Icon } from '../core/icons.js';
import { usePressScale } from '../core/ui.js';
const h = React.createElement;

/* Round icon-only button. `label` is required (screen readers). `badge` adds an unread dot. variant soft | plain. */
function IconButton(p) {
  const t = useAsterisk(), track = useTrack('IconButton', p), press = usePressScale(0.94), plain = p.variant === 'plain';
  return h(Animated.View, { style: [press.style, p.style] },
    h(Pressable, { ...ids(p), accessibilityRole: 'button', accessibilityLabel: p.label, hitSlop: 4, disabled: p.disabled, onPressIn: press.onPressIn, onPressOut: press.onPressOut,
      onPress: (e) => { track('press', { variant: plain ? 'plain' : 'soft' }, 'button'); p.onPress && p.onPress(e); },
      style: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: plain ? 'transparent' : t.colors.surfaceSunken } },
      h(Icon, { name: p.icon, size: 20, color: plain ? t.colors.inkMuted : t.colors.ink }),
      p.badge ? h(View, { style: { position: 'absolute', top: 8, end: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: t.colors.brand, borderWidth: 2, borderColor: t.colors.surfaceSunken } }) : null));
}
export { IconButton };
