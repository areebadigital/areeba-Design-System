/* areeba Asterisk tokens: generated from tokens.json by scripts/build-platform-tokens.mjs. Do not edit. */
export interface AsteriskNativeTheme {
  dark: boolean;
  colors: Record<"brand" | "brandHover" | "brandSoft" | "onBrand" | "accent" | "night" | "onNight" | "mint" | "surface" | "surfaceSunken" | "surfaceRaised" | "surfaceField" | "ink" | "inkMuted" | "inkDisabled" | "line" | "lineStrong" | "focus" | "success" | "successSoft" | "warning" | "warningSoft" | "danger" | "dangerSoft" | "info" | "infoSoft" | "chart1" | "chart2" | "chart3" | "chart4" | "chartGrid", string>;
  shadow: Record<"shadow1" | "shadow2" | "shadow3", { shadowColor?: string; shadowOpacity?: number; shadowRadius?: number; shadowOffset?: { width: number; height: number }; elevation?: number }>;
  space: Record<"s1" | "s2" | "s3" | "s4" | "s5" | "s6" | "s8" | "s10" | "s12" | "s16", number>;
  radius: Record<"xs" | "sm" | "md" | "lg" | "xl" | "full", number>;
  size: Record<"controlSm" | "controlMd" | "controlLg" | "icon" | "tabbar", number>;
  motion: { duration: Record<"instant" | "fast" | "base" | "slow", number>; easing: Record<"standard" | "enter" | "exit", [number, number, number, number]>; distance: number };
  type: Record<"displayXl" | "displayLg" | "display" | "h1" | "h2" | "h3" | "bodyLg" | "body" | "bodySm" | "label" | "caption" | "amountXl" | "amount" | "code", { fontFamily: string; fontSize: number; lineHeight: number; letterSpacing: number; fontVariant?: string[] }>;
  arabicFont: Record<400 | 500 | 600 | 700, string>;
}
export declare const light: AsteriskNativeTheme;
export declare const dark: AsteriskNativeTheme;
export declare const themes: { light: AsteriskNativeTheme; dark: AsteriskNativeTheme };
export default themes;
