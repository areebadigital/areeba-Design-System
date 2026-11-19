/* areeba Asterisk tokens: generated from tokens.json by scripts/build-platform-tokens.mjs. Do not edit. */
export type ColorToken = "brand" | "brand-hover" | "brand-soft" | "on-brand" | "accent" | "night" | "on-night" | "mint" | "surface" | "surface-sunken" | "surface-raised" | "surface-field" | "ink" | "ink-muted" | "ink-disabled" | "line" | "line-strong" | "focus" | "success" | "success-soft" | "warning" | "warning-soft" | "danger" | "danger-soft" | "info" | "info-soft" | "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-grid";
export type ThemeName = "light" | "dark";
export type SpaceToken = "space-1" | "space-2" | "space-3" | "space-4" | "space-5" | "space-6" | "space-8" | "space-10" | "space-12" | "space-16";
export type RadiusToken = "radius-xs" | "radius-sm" | "radius-md" | "radius-lg" | "radius-xl" | "radius-full";
export type TypeStyle = "display-xl" | "display-lg" | "display" | "h1" | "h2" | "h3" | "body-lg" | "body" | "body-sm" | "label" | "caption" | "amount-xl" | "amount" | "code";
export interface TextStyleToken { family: 'sans' | 'mono'; fontSize: number; lineHeight: number; fontWeight: number; letterSpacing: number; tabularNums: boolean }
export interface AsteriskTokens {
  name: string; version: string;
  color: Record<ThemeName, Record<ColorToken, string>>;
  space: Record<SpaceToken, number>; radius: Record<RadiusToken, number>; size: Record<"size-control-sm" | "size-control-md" | "size-control-lg" | "size-icon" | "size-tabbar", number>; breakpoint: Record<"bp-sm" | "bp-md" | "bp-lg" | "bp-xl", number>;
  /** Durations in ms; easings as cubic-bezier control points; distance in px. With reduced motion use 0 for every duration. */
  motion: { duration: Record<"instant" | "fast" | "base" | "slow", number>; easing: Record<"standard" | "enter" | "exit", [number, number, number, number]>; distance: number };
  type: Record<TypeStyle, TextStyleToken>;
  shadow: Record<ThemeName, Record<"shadow-1" | "shadow-2" | "shadow-3", string>>;
  fontFamily: { sans: string; mono: string };
}
export declare const tokens: AsteriskTokens;
export declare function cssVar(name: ColorToken | SpaceToken | RadiusToken | string): string;
export default tokens;
