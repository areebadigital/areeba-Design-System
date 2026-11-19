import React from 'react';
import { useAsterisk } from './theme.js';

/* Same events as the web package: asterisk.<component>.<action>, safe details only (never amounts, IBANs, names, codes). */
function safe(obj) { const out = {}; if (!obj) return out; for (const k in obj) { const v = obj[k]; if (typeof v === 'number' || typeof v === 'boolean' || (typeof v === 'string' && v.length <= 64)) out[k] = v; } return out; }

function useTrack(component, p) {
  const ctx = useAsterisk(), ref = React.useRef(p);
  ref.current = p;
  return React.useCallback((action, details, event) => {
    if (typeof ctx.track !== 'function') return;
    const props = ref.current || {};
    try {
      ctx.track({ ...ctx.context, ...safe(props.analyticsData), ...safe(details), name: `asterisk.${event || component.toLowerCase()}.${action}`, component, action,
        analyticsId: props.analyticsId, screen: ctx.screen, platform: 'react-native', time: Date.now() });
    } catch (e) { /* analytics never breaks the product */ }
  }, [ctx, component]);
}
function useErrorShown(component, p) {
  const track = useTrack(component, p), had = React.useRef(false);
  React.useEffect(() => { if (p.error && !had.current) track('error_shown', null, 'field'); had.current = !!p.error; }, [p.error, track]);
}
function useShown(component, p, details) { const track = useTrack(component, p); React.useEffect(() => { track('shown', details); }, []); } // eslint-disable-line react-hooks/exhaustive-deps
/* testID and nativeID from analyticsId, so UI tests and analytics SDKs that read view ids can find the element. */
const ids = (p) => (p.analyticsId ? { testID: p.testID || p.analyticsId, nativeID: p.analyticsId } : p.testID ? { testID: p.testID } : null);

export { useTrack, useErrorShown, useShown, safe, ids };
