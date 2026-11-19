import React from 'react';
import { Text as RNText, Animated, Easing } from 'react-native';
import { useAsterisk } from './theme.js';
const h = React.createElement;

/* Themed text: <Txt variant="body" color="inkMuted" weight={600}>…</Txt>. Arabic switches font and drops letter spacing. */
function Txt({ variant = 'body', color = 'ink', weight, style, children, ...rest }) {
  const t = useAsterisk(), s = t.text(variant);
  return h(RNText, { ...rest, style: [s, { color: t.colors[color] || color, writingDirection: t.rtl ? 'rtl' : 'ltr' }, weight ? { fontFamily: t.font(weight) } : null, style] }, children);
}

/* Left-to-right run (amounts, IBANs, card numbers) inside any text. */
const ltr = (s) => '⁦' + s + '⁩';

/* Press feedback: scale to `to` for duration-instant (0 with reduced motion). */
function usePressScale(to = 0.98) {
  const t = useAsterisk(), v = React.useRef(new Animated.Value(1)).current;
  const run = (n) => Animated.timing(v, { toValue: n, duration: t.duration('instant'), easing: Easing.bezier(...t.motion.easing.standard), useNativeDriver: true }).start();
  return { style: { transform: [{ scale: v }] }, onPressIn: () => run(to), onPressOut: () => run(1) };
}

/* Enter animation: fade and rise by motion.distance, duration-base, ease-enter. */
function useEnter(kind = 'rise') {
  const t = useAsterisk(), v = React.useRef(new Animated.Value(t.reduceMotion ? 1 : 0)).current;
  React.useEffect(() => { Animated.timing(v, { toValue: 1, duration: t.duration(kind === 'sheet' ? 'slow' : 'base'), easing: Easing.bezier(...t.motion.easing.enter), useNativeDriver: true }).start(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const d = kind === 'sheet' ? 400 : t.motion.distance;
  return { opacity: kind === 'sheet' ? 1 : v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [d, 0] }) }] };
}

export { Txt, ltr, usePressScale, useEnter };
