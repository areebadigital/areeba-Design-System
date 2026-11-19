import React from 'react';
const h = React.createElement;

/* Analytics: components describe what happened; the app decides where it goes.
   Wrap the app once:  h(AsteriskProvider, { analytics: (event) => segment.track(event.name, event), screen: 'topup' }, app)
   Without a provider (or without `analytics`) nothing is sent.

   Every event has the same shape (see ANALYTICS_EVENTS and components/index.d.ts):
     { name: 'asterisk.button.press', component: 'Button', action: 'press', analyticsId, screen, variant?, ...safe details, time }
   Privacy: components never put what people type or see into an event (amounts, IBANs, card numbers, names, codes,
   messages, file names). Details are limited to option values chosen by the product team, counts, positions and reasons.
   Extra context the product team knows is safe goes in `analyticsData`. */
const AnalyticsContext = React.createContext(null);

/* Catalogue of the events components send. Keys are `component.action`. */
const ANALYTICS_EVENTS = {
  'button.press': 'Button, IconButton, QuickAction, ServiceTile, FilterChip pressed. Details: variant.',
  'switch.change': 'Switch or Checkbox toggled. Details: checked.',
  'checkbox.change': 'Checkbox toggled. Details: checked.',
  'select.change': 'An option chosen in Select, RadioGroup or Tabs. Details: value (the option value set by the product team).',
  'radiogroup.change': 'RadioGroup option chosen. Details: value.',
  'tabs.change': 'Tab chosen. Details: value.',
  'cardpicker.change': 'Card chosen. Details: position (1-based), never the card number.',
  'datepicker.change': 'Date chosen. Details: none (dates can be personal).',
  'pagination.change': 'Page changed. Details: page, pageCount.',
  'dialog.open': 'Dialog or sheet opened.',
  'dialog.close': 'Dialog closed. Details: how (escape, backdrop, action).',
  'actionmenu.open': 'Menu opened.',
  'actionmenu.select': 'Menu item chosen. Details: position, item analyticsId if set, danger.',
  'navigation.change': 'Sidebar or TabBar destination chosen. Details: value.',
  'field.error_shown': 'An error became visible on TextField, TextArea, AmountInput, CodeInput, Select, RadioGroup or FileUpload. Details: none; name the field with analyticsId.',
  'fileupload.file_added': 'Files accepted. Details: count, types (extensions).',
  'fileupload.file_rejected': 'A file was not accepted. Details: reason (type, size).',
  'fileupload.file_removed': 'A file was removed.',
  'balance.toggle': 'Balance shown or hidden. Details: hidden.',
  'copycode.copy': 'Code copied. Details: none (never the code).',
  'toast.shown': 'Toast shown. Details: tone.',
  'toast.action': 'Toast action pressed (Undo).',
  'result.shown': 'Result screen shown. Details: tone.',
  'alert.shown': 'Alert shown. Details: tone.',
};

/* Only plain values travel: strings, numbers, booleans. Long strings are dropped (they are rarely ids). */
function safe(obj) {
  var out = {};
  if (!obj) return out;
  for (var k in obj) {
    var v = obj[k];
    if (typeof v === 'number' || typeof v === 'boolean' || (typeof v === 'string' && v.length <= 64)) out[k] = v;
  }
  return out;
}

function AsteriskProvider(p) {
  var parent = React.useContext(AnalyticsContext);
  var value = React.useMemo(function () {
    return { track: p.analytics || (parent && parent.track) || null, screen: p.screen || (parent && parent.screen), context: Object.assign({}, parent && parent.context, safe(p.context)) };
  }, [p.analytics, p.screen, parent, p.context]);
  return h(AnalyticsContext.Provider, { value: value }, p.children);
}

/* const track = useTrack('Button', p);  track('press', { variant: 'primary' })
   Sends `asterisk.<component>.<action>`. `event` overrides the component part of the name for shared events (field, navigation). */
function useTrack(component, p) {
  var ctx = React.useContext(AnalyticsContext), ref = React.useRef(p);
  ref.current = p;
  return React.useCallback(function (action, details, event) {
    if (!ctx || typeof ctx.track !== 'function') return;
    var props = ref.current || {};
    var e = Object.assign({}, ctx.context, safe(props.analyticsData), safe(details), {
      name: 'asterisk.' + (event || component.toLowerCase()) + '.' + action, component: component, action: action,
      analyticsId: props.analyticsId, screen: ctx.screen, time: Date.now(),
    });
    try { ctx.track(e); } catch (err) { /* analytics must never break the product */ }
  }, [ctx, component]);
}

/* Sends `field.error_shown` once each time `error` becomes set. */
function useErrorShown(component, p) {
  var track = useTrack(component, p), had = React.useRef(false);
  React.useEffect(function () {
    if (p.error && !had.current) track('error_shown', null, 'field');
    had.current = !!p.error;
  }, [p.error, track]);
}

/* Sends `<component>.shown` once when mounted (Toast, Result, Alert). */
function useShown(component, p, details) {
  var track = useTrack(component, p);
  React.useEffect(function () { track('shown', details); }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

/* Wraps an onClick so the press is tracked first. */
function pressed(track, onClick, details) {
  return function (e) { track('press', details, 'button'); if (onClick) return onClick(e); };
}

/* DOM attributes for tag managers (Google Tag Manager, Segment autotrack): data-analytics-id and data-analytics-component. */
function analyticsAttrs(component, p) {
  return p && p.analyticsId ? { 'data-analytics-id': p.analyticsId, 'data-analytics-component': component } : null;
}

export { AnalyticsContext, AsteriskProvider, ANALYTICS_EVENTS, useTrack, useErrorShown, useShown, analyticsAttrs, pressed, safe };
