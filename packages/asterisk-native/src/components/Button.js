import React from 'react';
import { Pressable, Animated, View, ActivityIndicator } from 'react-native';
import { useAsterisk } from '../core/theme.js';
import { useTrack, ids } from '../core/analytics.js';
import { Txt, usePressScale } from '../core/ui.js';
const h = React.createElement;

/* Same API as the web Button: variant primary | secondary | ghost | danger, size sm | md | lg, block, disabled.
   One primary per screen; primary is brand (Crimson Deep), never Signal Red. */
function Button(p) {
  const t = useAsterisk(), track = useTrack('Button', p), press = usePressScale(0.98);
  const variant = p.variant || 'primary', size = p.size || (p.block ? 'lg' : 'md');
  const bg = { primary: t.colors.brand, secondary: t.colors.brandSoft, ghost: 'transparent', danger: t.colors.danger }[variant];
  const fg = { primary: t.colors.onBrand, secondary: t.colors.brand, ghost: t.colors.brand, danger: '#ffffff' }[variant];
  const height = { sm: t.size.controlSm, md: t.size.controlMd, lg: t.size.controlLg }[size];
  return h(Animated.View, { style: [press.style, p.block ? { alignSelf: 'stretch' } : { alignSelf: 'flex-start' }, p.style] },
    h(Pressable, { ...ids(p), accessibilityRole: 'button', accessibilityLabel: p.accessibilityLabel, accessibilityState: { disabled: !!p.disabled, busy: !!p.loading },
      disabled: p.disabled || p.loading, onPressIn: press.onPressIn, onPressOut: press.onPressOut,
      onPress: (e) => { track('press', { variant }, 'button'); p.onPress && p.onPress(e); },
      style: ({ pressed }) => ({ height, minWidth: height, paddingHorizontal: size === 'sm' ? t.space.s3 : t.space.s5, borderRadius: t.radius.xs, alignItems: 'center', justifyContent: 'center',
        flexDirection: 'row', gap: t.space.s2, backgroundColor: pressed && variant === 'primary' ? t.colors.brandHover : bg, opacity: p.disabled ? 0.45 : 1 }) },
      p.loading ? h(ActivityIndicator, { color: fg }) : null,
      typeof p.children === 'string' ? h(Txt, { variant: size === 'sm' ? 'body-sm' : 'body', weight: 600, style: { color: fg } }, p.children) : h(View, { style: { flexDirection: 'row', gap: t.space.s2, alignItems: 'center' } }, p.children)));
}
export { Button };
