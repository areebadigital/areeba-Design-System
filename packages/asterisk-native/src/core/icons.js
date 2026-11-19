import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ICON_PATHS } from './icon-paths.js';
import { useAsterisk } from './theme.js';
const h = React.createElement;

/* <Icon name="send" size={20} color={t.colors.ink} />. Directional icons (back, forward, chevrons) mirror in right-to-left. */
function Icon({ name, size = 24, color, style }) {
  const t = useAsterisk(), def = ICON_PATHS[name];
  if (!def) return null;
  return h(Svg, { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', style: [def.flip && t.rtl ? { transform: [{ scaleX: -1 }] } : null, style],
    accessible: false, importantForAccessibility: 'no-hide-descendants' },
    def.paths.map((d, i) => h(Path, { key: i, d, stroke: color || t.colors.ink, strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' })));
}
export { Icon, ICON_PATHS };
