/* areeba Asterisk 4, React Native. Same names, props and analytics events as @areebadigital/asterisk-react,
   with React Native conventions: onPress instead of onClick, onChangeText for text, accessibilityLabel for labels. */
import * as React from 'react';
import type { StyleProp, ViewStyle, TextStyle, KeyboardTypeOptions } from 'react-native';
import type { AsteriskNativeTheme } from '@areebadigital/asterisk-tokens/native';

/** Every interactive component sends `asterisk.<component>.<action>` through AsteriskProvider. Never put what people type or see in analyticsData. */
export interface AnalyticsProps {
  /** Stable name for this control in analytics, e.g. "topup.continue". Also set as testID and nativeID. */
  analyticsId?: string;
  /** Extra safe context (option values, counts). Strings over 64 characters are dropped. */
  analyticsData?: Record<string, string | number | boolean>;
}

export interface AsteriskEvent {
  name: string; component: string; action: string; analyticsId?: string; screen?: string; platform: 'react-native'; time: number;
  [detail: string]: string | number | boolean | undefined;
}

export type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
export type IconName = keyof typeof ICON_PATHS;

export interface AsteriskProviderProps {
  /** Default "system". */
  theme?: 'light' | 'dark' | 'system';
  /** "ar" switches to IBM Plex Sans Arabic. Default "en". */
  locale?: string;
  /** Overrides I18nManager.isRTL (previews and tests). */
  rtl?: boolean;
  analytics?: (event: AsteriskEvent) => void;
  screen?: string;
  context?: Record<string, string | number | boolean>;
  children?: React.ReactNode;
}
export interface AsteriskTheme extends AsteriskNativeTheme {
  name: 'light' | 'dark'; locale: string; arabic: boolean; rtl: boolean; reduceMotion: boolean;
  /** Token duration in ms, 0 when the system asks for reduced motion. */
  duration(key: 'instant' | 'fast' | 'base' | 'slow'): number;
  font(weight?: 400 | 500 | 600 | 700): string;
  text(variant: string): TextStyle;
}
export declare function AsteriskProvider(props: AsteriskProviderProps): React.ReactElement;
export declare function useAsterisk(): AsteriskTheme;

export declare const ICON_PATHS: Record<string, string[]>;
export declare function Icon(props: { name: string; size?: number; color?: string; style?: StyleProp<ViewStyle> }): React.ReactElement | null;
export declare function Txt(props: { variant?: string; weight?: 400 | 500 | 600 | 700; color?: string; style?: StyleProp<TextStyle>; children?: React.ReactNode; [k: string]: unknown }): React.ReactElement;
/** Keeps amounts, IBANs, phone and card numbers left to right inside Arabic text. */
export declare function ltr(text: string): string;

export interface ButtonProps extends AnalyticsProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'md' | 'lg'; block?: boolean; loading?: boolean; disabled?: boolean;
  onPress?: () => void; accessibilityLabel?: string; style?: StyleProp<ViewStyle>; children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.ReactElement;
export declare function IconButton(props: AnalyticsProps & { icon: string; label: string; variant?: 'default' | 'plain'; badge?: boolean; disabled?: boolean; onPress?: () => void; style?: StyleProp<ViewStyle> }): React.ReactElement;
export declare function QuickAction(props: AnalyticsProps & { icon: string; label: string; disabled?: boolean; onPress?: () => void }): React.ReactElement;
export declare function QuickActions(props: { label?: string; style?: StyleProp<ViewStyle>; children?: React.ReactNode }): React.ReactElement;

interface FieldProps extends AnalyticsProps { label?: string; hint?: string; error?: string; placeholder?: string; value?: string; defaultValue?: string; onChangeText?: (text: string) => void }
export declare function TextField(props: FieldProps & {
  prefix?: string; /** Keep the value left to right (IBAN, phone, email). */ ltr?: boolean; dir?: 'ltr' | 'rtl'; disabled?: boolean; secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions; autoComplete?: string; textContentType?: string; onChange?: (text: string) => void;
}): React.ReactElement;
export declare function TextArea(props: FieldProps & { rows?: number; maxLength?: number }): React.ReactElement;
export declare function SearchField(props: Omit<FieldProps, 'hint' | 'error'>): React.ReactElement;
export declare function FilterChip(props: AnalyticsProps & { label: string; selected?: boolean; hasPopup?: boolean | string; onPress?: () => void }): React.ReactElement;

/** Applies a NumberPad key ("0"-"9", ".", "back") to an amount string. */
export declare function padInput(value: string, key: string, maxDigits?: number): string;
export declare function AmountInput(props: AnalyticsProps & { value: string; currency?: string; label?: string; hint?: string; error?: string; fee?: string; feeLabel?: string }): React.ReactElement;
export declare function NumberPad(props: AnalyticsProps & { onKey: (key: string) => void; decimal?: boolean; disabled?: boolean; label?: string }): React.ReactElement;
export declare function PasscodeDots(props: AnalyticsProps & { filled: number; length?: number; error?: string }): React.ReactElement;
export declare function Balance(props: AnalyticsProps & { amount: string; label?: string; hidden?: boolean; defaultHidden?: boolean; onToggle?: (hidden: boolean) => void }): React.ReactElement;

interface ToggleProps extends AnalyticsProps { label: string; checked?: boolean; defaultChecked?: boolean; disabled?: boolean; onChange?: (checked: boolean) => void }
export declare function Switch(props: ToggleProps): React.ReactElement;
export declare function Checkbox(props: ToggleProps & { hint?: string; indeterminate?: boolean }): React.ReactElement;
export interface RadioOption { value: string; label: string; description?: string; disabled?: boolean }
export declare function RadioGroup(props: AnalyticsProps & {
  label: string; options: RadioOption[]; value?: string; defaultValue?: string; onChange?: (value: string) => void;
  hint?: string; error?: string; disabled?: boolean; variant?: 'default' | 'card'; orientation?: 'vertical' | 'horizontal';
}): React.ReactElement;

export declare function Badge(props: { tone?: Tone; dot?: boolean; icon?: string; children?: React.ReactNode }): React.ReactElement;
export declare function Alert(props: AnalyticsProps & { tone?: Exclude<Tone, 'neutral' | 'brand'>; title?: string; children?: React.ReactNode }): React.ReactElement;
export declare function Toast(props: AnalyticsProps & { tone?: 'success' | 'info' | 'danger'; action?: string; onAction?: () => void; children?: React.ReactNode }): React.ReactElement;
export declare function Result(props: AnalyticsProps & { tone?: 'success' | 'danger' | 'warning' | 'info'; title: string; action?: React.ReactNode; children?: React.ReactNode }): React.ReactElement;
export declare function EmptyState(props: { icon?: string; title: string; action?: React.ReactNode; children?: React.ReactNode }): React.ReactElement;

export declare function ListItem(props: AnalyticsProps & { title: string; subtitle?: string; amount?: string; leading?: React.ReactNode; trailing?: React.ReactNode; onPress?: () => void }): React.ReactElement;
export declare function List(props: { style?: StyleProp<ViewStyle>; children?: React.ReactNode }): React.ReactElement;
export declare function SettingsList(props: { title?: string; children?: React.ReactNode }): React.ReactElement;
export declare function SettingsRow(props: AnalyticsProps & {
  label: string; description?: string; icon?: string; value?: string; tone?: 'default' | 'danger'; disabled?: boolean; onPress?: () => void;
  toggle?: { checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void };
}): React.ReactElement;
export declare function DetailList(props: { items: { label: string; value: React.ReactNode; ltr?: boolean; emphasis?: boolean }[] }): React.ReactElement;

export declare function AppHeader(props: { title?: string; subtitle?: string; variant?: 'default' | 'modal'; start?: React.ReactNode; end?: React.ReactNode }): React.ReactElement;
export declare function TabBar(props: AnalyticsProps & { items: { value: string; label: string; icon: string; badge?: boolean }[]; value: string; onChange?: (value: string) => void }): React.ReactElement;
export declare function ActionBar(props: { stacked?: boolean; style?: StyleProp<ViewStyle>; children?: React.ReactNode }): React.ReactElement;
export declare function Sheet(props: AnalyticsProps & { open: boolean; onClose?: () => void; title?: string; tone?: 'default' | 'danger'; actions?: React.ReactNode; children?: React.ReactNode }): React.ReactElement | null;

export declare function Avatar(props: { initials: string; size?: 'sm' | 'md' | 'lg'; status?: 'online' | 'offline'; label?: string }): React.ReactElement;
export declare function PaymentCard(props: { last4: string; holder?: string; expiry?: string; network?: string; variant?: 'night' | 'brand'; frozen?: boolean; label?: string }): React.ReactElement;
export declare function PageDots(props: { count: number; current: number }): React.ReactElement;
export declare function CodeInput(props: AnalyticsProps & {
  length?: number; value?: string; defaultValue?: string; onChange?: (code: string) => void; onComplete?: (code: string) => void;
  label?: string; hint?: string; error?: string; autoFocus?: boolean;
}): React.ReactElement;
