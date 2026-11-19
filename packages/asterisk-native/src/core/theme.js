import React from 'react';
import { I18nManager, AccessibilityInfo, useColorScheme } from 'react-native';
import { light, dark } from '@areebadigital/asterisk-tokens/native';
const h = React.createElement;

/* Theme, direction, language and analytics for every Asterisk component.
   <AsteriskProvider theme="system" locale="ar" analytics={(e) => segment.track(e.name, e)} screen="home">…</AsteriskProvider>
   - theme: "light" | "dark" | "system" (default system).
   - rtl: overrides I18nManager.isRTL (for previews and tests).
   - locale: "en" | "ar"; Arabic switches to IBM Plex Sans Arabic and turns letter spacing off. Direction follows I18nManager.isRTL
     (call I18nManager.forceRTL(true) and restart for Arabic, as React Native requires).
   - reduceMotion follows the system setting; every duration becomes 0. */
const ThemeContext = React.createContext(null);
const camel = (s) => String(s).replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

function useReduceMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    let alive = true;
    AccessibilityInfo.isReduceMotionEnabled?.().then((v) => alive && setReduce(!!v)).catch(() => {});
    const sub = AccessibilityInfo.addEventListener?.('reduceMotionChanged', (v) => setReduce(!!v));
    return () => { alive = false; sub?.remove?.(); };
  }, []);
  return reduce;
}

function AsteriskProvider({ theme = 'system', locale = 'en', rtl, analytics, screen, context, children }) {
  const parent = React.useContext(ThemeContext);
  const system = useColorScheme();
  const reduceMotion = useReduceMotion();
  const value = React.useMemo(() => {
    const name = theme === 'system' ? (system === 'dark' ? 'dark' : 'light') : theme;
    const t = name === 'dark' ? dark : light;
    const arabic = /^ar\b/i.test(locale);
    return {
      ...t, name, locale, arabic, rtl: rtl !== undefined ? rtl : I18nManager.isRTL, reduceMotion,
      duration: (k) => (reduceMotion ? 0 : t.motion.duration[k]),
      font: (weight = 400) => (arabic ? t.arabicFont[weight] : { 400: 'PlusJakartaSans-Regular', 500: 'PlusJakartaSans-Medium', 600: 'PlusJakartaSans-SemiBold', 700: 'PlusJakartaSans-Bold' }[weight]),
      text: (variant) => { const s = t.type[camel(variant)] || t.type.body; return arabic ? { ...s, fontFamily: t.arabicFont[400], letterSpacing: 0 } : s; },
      track: analytics || parent?.track || null,
      screen: screen || parent?.screen,
      context: { ...(parent?.context || {}), ...(context || {}) },
    };
  }, [theme, system, locale, rtl, reduceMotion, analytics, screen, context, parent]);
  return h(ThemeContext.Provider, { value }, children);
}

const FALLBACK = { ...light, name: 'light', locale: 'en', arabic: false, rtl: false, reduceMotion: false, duration: (k) => light.motion.duration[k],
  font: (w = 400) => ({ 400: 'PlusJakartaSans-Regular', 500: 'PlusJakartaSans-Medium', 600: 'PlusJakartaSans-SemiBold', 700: 'PlusJakartaSans-Bold' }[w]),
  text: (v) => light.type[camel(v)] || light.type.body, track: null, context: {} };
function useAsterisk() { return React.useContext(ThemeContext) || FALLBACK; }

export { AsteriskProvider, useAsterisk, ThemeContext };
