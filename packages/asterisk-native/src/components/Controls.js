import React from 'react';
import { View, Pressable, Animated, Easing } from 'react-native';
import { useAsterisk } from '../core/theme.js';
import { useErrorShown, useTrack, ids } from '../core/analytics.js';
import { Txt } from '../core/ui.js';
import { Icon } from '../core/icons.js';
const h = React.createElement;

function useToggle(p) {
  const [v, setV] = React.useState(!!p.defaultChecked), on = p.checked !== undefined ? !!p.checked : v;
  return [on, () => { if (p.disabled) return; setV(!on); p.onChange && p.onChange(!on); }];
}

/* Switch: instant on/off settings. The label names it. */
function Switch(p) {
  const t = useAsterisk(), track = useTrack('Switch', p), [on, toggle] = useToggle(p);
  const x = React.useRef(new Animated.Value(on ? 1 : 0)).current;
  React.useEffect(() => { Animated.timing(x, { toValue: on ? 1 : 0, duration: t.duration('fast'), easing: Easing.bezier(...t.motion.easing.standard), useNativeDriver: true }).start(); }, [on]); // eslint-disable-line
  const dir = t.rtl ? -1 : 1;
  return h(Pressable, { ...ids(p), accessibilityRole: 'switch', accessibilityState: { checked: on, disabled: !!p.disabled }, accessibilityLabel: typeof p.label === 'string' ? p.label : undefined,
    onPress: () => { track('change', { checked: !on }); toggle(); }, style: { flexDirection: 'row', alignItems: 'center', gap: t.space.s3, opacity: p.disabled ? 0.5 : 1 } },
    h(View, { style: { width: 44, height: 26, borderRadius: 13, padding: 3, backgroundColor: on ? t.colors.brand : t.colors.lineStrong } },
      h(Animated.View, { style: { width: 20, height: 20, borderRadius: 10, backgroundColor: on ? t.colors.onBrand : t.colors.surfaceRaised, transform: [{ translateX: x.interpolate({ inputRange: [0, 1], outputRange: [0, 18 * dir] }) }] } })),
    p.label ? h(Txt, { weight: 500, style: { flexShrink: 1 } }, p.label) : null);
}

/* Checkbox: multi-select and consent. hint adds a line under the label. */
function Checkbox(p) {
  const t = useAsterisk(), track = useTrack('Checkbox', p), [on, toggle] = useToggle(p);
  return h(Pressable, { ...ids(p), accessibilityRole: 'checkbox', accessibilityState: { checked: p.indeterminate ? 'mixed' : on, disabled: !!p.disabled },
    accessibilityLabel: typeof p.label === 'string' ? p.label : undefined, onPress: () => { track('change', { checked: !on }); toggle(); },
    style: { flexDirection: 'row', alignItems: 'flex-start', gap: t.space.s2, opacity: p.disabled ? 0.5 : 1 } },
    h(View, { style: { width: 18, height: 18, marginTop: 2, borderRadius: t.radius.xs, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
      borderColor: on || p.indeterminate ? t.colors.brand : t.colors.lineStrong, backgroundColor: on || p.indeterminate ? t.colors.brand : t.colors.surfaceRaised } },
      on || p.indeterminate ? h(Icon, { name: p.indeterminate ? 'dash' : 'tick', size: 14, color: t.colors.onBrand }) : null),
    h(View, { style: { flexShrink: 1 } }, h(Txt, { variant: 'body-sm', weight: 500 }, p.label), p.hint ? h(Txt, { variant: 'body-sm', color: 'inkMuted' }, p.hint) : null));
}

/* RadioGroup: choose one of 2–6 visible options; variant "card" draws bordered tiles with a hint. */
function RadioGroup(p) {
  const t = useAsterisk(), track = useTrack('RadioGroup', p), [v, setV] = React.useState(p.defaultValue ?? null), cur = p.value !== undefined ? p.value : v;
  useErrorShown('RadioGroup', p);
  const card = p.variant === 'card', row = p.orientation === 'horizontal';
  return h(View, { accessibilityRole: 'radiogroup', accessibilityLabel: typeof p.label === 'string' ? p.label : undefined, style: { gap: t.space.s2 } },
    p.label ? h(Txt, { variant: 'body-sm', weight: 500, color: 'inkMuted' }, p.label) : null,
    h(View, { style: { flexDirection: row ? 'row' : 'column', flexWrap: 'wrap', gap: card ? t.space.s2 : t.space.s3 } }, (p.options || []).map((o) => {
      const on = o.value === cur, dis = o.disabled || p.disabled;
      return h(Pressable, { key: o.value, accessibilityRole: 'radio', accessibilityState: { checked: on, disabled: !!dis }, disabled: dis,
        onPress: () => { if (!on) track('change', { value: o.value }); setV(o.value); p.onChange && p.onChange(o.value, o); },
        style: [{ flexDirection: 'row', alignItems: 'flex-start', gap: t.space.s2, opacity: dis ? 0.5 : 1 },
          card ? { padding: t.space.s4, paddingVertical: t.space.s3, borderRadius: t.radius.md, borderWidth: on ? 2 : 1, borderColor: on ? t.colors.brand : t.colors.line, backgroundColor: t.colors.surfaceRaised, flexGrow: row ? 1 : 0 } : null] },
        h(View, { style: { width: 18, height: 18, marginTop: 2, borderRadius: 9, borderWidth: on ? 5 : 1, borderColor: on ? t.colors.brand : t.colors.lineStrong, backgroundColor: on ? t.colors.onBrand : t.colors.surfaceRaised } }),
        h(View, { style: { flexShrink: 1 } }, h(Txt, { variant: card ? 'body' : 'body-sm', weight: 500 }, o.label), o.hint ? h(Txt, { variant: 'caption', color: 'inkMuted' }, o.hint) : null));
    })),
    (p.error || p.hint) ? h(Txt, { variant: 'body-sm', color: p.error ? 'danger' : 'inkMuted', accessibilityLiveRegion: p.error ? 'assertive' : 'none' }, p.error || p.hint) : null);
}
export { Switch, Checkbox, RadioGroup };
