/* Test page only: react-native-svg drawn as plain web SVG (react-native-web has no SVG). */
import React from 'react';
const h = React.createElement;
export default function Svg({ width, height, viewBox, fill, style, children }) {
  const flat = Array.isArray(style) ? Object.assign({}, ...style.filter(Boolean)) : style || {};
  const tf = flat.transform && flat.transform.some((x) => x.scaleX === -1) ? 'scaleX(-1)' : undefined;
  return h('svg', { width, height, viewBox, fill, 'aria-hidden': 'true', style: { transform: tf, flex: 'none' } }, children);
}
export function Path({ d, stroke, strokeWidth, strokeLinecap, strokeLinejoin }) { return h('path', { d, stroke, strokeWidth, strokeLinecap, strokeLinejoin }); }
