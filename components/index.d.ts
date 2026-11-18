import type * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: the one main action per screen. secondary: alternatives. ghost: low-emphasis, toolbars. danger: destructive confirmations. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** sm 32px (SaaS dense only) · md 44px (default) · lg 48px (mobile primary actions) */
  size?: 'sm' | 'md' | 'lg';
  /** Full width; use for mobile primary actions. */
  block?: boolean;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  hint?: string;
  /** Replaces the hint and marks the field invalid. */
  error?: string;
  /** Leading text such as a currency symbol. */
  prefix?: React.ReactNode;
}
export declare function TextField(props: TextFieldProps): React.ReactElement;

/** A button with role="switch" (no native input). */
export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
  label?: React.ReactNode;
  checked?: boolean; defaultChecked?: boolean;
  /** Receives the new state, not a DOM event. */
  onChange?: (checked: boolean) => void;
  /** Submits `value` (default "on") in a form while on, through a hidden input. */
  name?: string; value?: string;
}
export declare function Switch(props: SwitchProps): React.ReactElement;

export interface BadgeProps { tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'; dot?: boolean; /** Leading icon (name in Areeba.icons or a component). */ icon?: string | React.ComponentType<React.SVGProps<SVGSVGElement>>; className?: string; children?: React.ReactNode }
export declare function Badge(props: BadgeProps): React.ReactElement;

export interface AlertProps { tone?: 'info' | 'success' | 'warning' | 'danger'; title?: React.ReactNode; className?: string; children?: React.ReactNode }
export declare function Alert(props: AlertProps): React.ReactElement;

export interface TabsProps { items: { value: string; label: React.ReactNode }[]; value?: string; defaultValue?: string; onChange?: (value: string) => void; label?: string;
  /** Links tabs to TabPanels: tab `${id}-${value}` controls panel `${id}-${value}-panel`. */ id?: string; className?: string }
export declare function Tabs(props: TabsProps): React.ReactElement;
/** The panel of one tab. `tabs` is the Tabs `id`, `value` the tab's value. Render only the current one. */
export declare function TabPanel(props: { tabs: string; value: string; className?: string; children?: React.ReactNode }): React.ReactElement;

export interface ListItemProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Initials or an icon in a 40px circle. */
  leading?: React.ReactNode;
  /** Formatted amount. A leading "+" renders it in success green. */
  amount?: string;
  /** Extra trailing content, e.g. a Badge. */
  trailing?: React.ReactNode;
  className?: string;
}
export declare function ListItem(props: ListItemProps): React.ReactElement;
export declare function List(props: { className?: string; children?: React.ReactNode }): React.ReactElement;

export interface TabBarProps { items: { value: string; label: string; icon: 'home' | 'card' | 'send' | 'chart' | 'user' }[]; value?: string; onChange?: (value: string) => void; label?: string; className?: string }
export declare function TabBar(props: TabBarProps): React.ReactElement;

export interface SidebarProps { items: { value: string; label: string; icon: 'home' | 'list' | 'card' | 'send' | 'store' | 'chart' | 'settings' | 'user'; href?: string; count?: string | number }[]; value?: string; onChange?: (value: string) => void; brand?: React.ReactNode; footer?: React.ReactNode; label?: string; className?: string }
export declare function Sidebar(props: SidebarProps): React.ReactElement;

export interface DataTableColumn<R> { key: string; label: React.ReactNode; align?: 'left' | 'right'; numeric?: boolean; mono?: boolean; render?: (row: R) => React.ReactNode }
export interface DataTableProps<R = Record<string, any>> { columns: DataTableColumn<R>[]; rows: R[]; caption?: React.ReactNode; empty?: React.ReactNode; className?: string }
export declare function DataTable<R>(props: DataTableProps<R>): React.ReactElement;

export interface DialogProps { open: boolean; onClose?: () => void; title: React.ReactNode; actions?: React.ReactNode; tone?: 'default' | 'danger'; /** Bottom sheet on mobile. */ sheet?: boolean; className?: string; children?: React.ReactNode }
export declare function Dialog(props: DialogProps): React.ReactElement | null;

export interface ToastProps { tone?: 'neutral' | 'success' | 'danger'; action?: string; onAction?: () => void; className?: string; children?: React.ReactNode }
export declare function Toast(props: ToastProps): React.ReactElement;

export interface PaymentCardProps { last4: string; holder: string; expiry: string; network?: string; variant?: 'night' | 'brand'; frozen?: boolean; /** Fill the container width (up to 420px) instead of the fixed 320px. */ fluid?: boolean; className?: string }
export declare function PaymentCard(props: PaymentCardProps): React.ReactElement;

export interface EmptyStateProps { title: React.ReactNode; action?: React.ReactNode; /** Heading level of the title (default 3). Use 2 when it is the first heading under the page title. */ level?: 2 | 3 | 4; className?: string; children?: React.ReactNode }
export declare function EmptyState(props: EmptyStateProps): React.ReactElement;

/** A button with role="checkbox" (no native input). */
export interface CheckboxProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
  label: React.ReactNode; hint?: React.ReactNode;
  /** Shown as a dash and announced as "mixed". Clicking it checks the box. */
  indeterminate?: boolean;
  checked?: boolean; defaultChecked?: boolean;
  /** Receives the new state, not a DOM event. */
  onChange?: (checked: boolean) => void;
  /** Submits `value` (default "on") in a form while checked, through a hidden input. */
  name?: string; value?: string; required?: boolean;
}
export declare function Checkbox(props: CheckboxProps): React.ReactElement;

/** Custom listbox (select-only combobox pattern). No native <select>. */
export interface SelectOption { value: string; label: string; disabled?: boolean }
export interface SelectProps {
  label?: string; hint?: string; error?: string; placeholder?: string;
  options: SelectOption[];
  value?: string | null; defaultValue?: string | null;
  /** Receives the chosen value, not a DOM event. */
  onChange?: (value: string, option: SelectOption) => void;
  /** Submits the value in a form through a hidden input. */
  name?: string; id?: string; disabled?: boolean; required?: boolean; defaultOpen?: boolean;
  'aria-label'?: string; className?: string;
}
export declare function Select(props: SelectProps): React.ReactElement;

export interface CalendarProps {
  value?: Date | null; onChange?: (d: Date) => void; today?: Date; min?: Date; max?: Date;
  /** BCP 47 locale for month and weekday names, e.g. "ar-LB". Defaults to <html lang>. Digits stay 0–9. */
  locale?: string;
}
export declare function Calendar(props: CalendarProps): React.ReactElement;
export interface DatePickerProps extends CalendarProps { label?: string; hint?: string; error?: string; placeholder?: string; defaultValue?: Date; defaultOpen?: boolean; id?: string; className?: string }
export declare function DatePicker(props: DatePickerProps): React.ReactElement;

export interface ChartProps<R = Record<string, any>> {
  /** Each row has a `label` (x category) plus one numeric field per series key. */
  data: (R & { label: string })[];
  /** 1–4 series; colours chart-1..chart-4 in this order. */
  series: { key: string; label: string }[];
  title?: string; ariaLabel?: string; height?: number;
  /** Formats axis ticks and tooltip values, e.g. currency. */
  format?: (v: number) => string;
  className?: string;
}
/** Wraps a left-to-right run (amount, IBAN, card or reference number) in Unicode isolates so it reads correctly inside Arabic text: `\`المتاح: ${ltr('$12,480.50')}\``. */
export declare function ltr(text: string): string;

export declare function LineChart(props: ChartProps): React.ReactElement;
export declare function BarChart(props: ChartProps): React.ReactElement;


/* ---- App building blocks (patterns from the areeba pay app) ---- */
type IconName = string;
type IconRef = IconName | React.ComponentType<React.SVGProps<SVGSVGElement>>;
export declare const icons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>;

/** Round icon-only button. `label` is the accessible name and is required. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { icon: IconRef; label: string; /** Unread dot. */ badge?: boolean; variant?: 'soft' | 'plain' }
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;

/** Top bar of an app screen: start action, centred title (h1), end actions. */
export interface AppHeaderProps { title: React.ReactNode; subtitle?: React.ReactNode; start?: React.ReactNode; end?: React.ReactNode; /** modal adds a drag handle for sheets. */ variant?: 'default' | 'modal' | 'transparent'; className?: string }
export declare function AppHeader(props: AppHeaderProps): React.ReactElement;

/** A labelled round action (Top up, Send, More). */
export interface QuickActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { icon: IconRef; label: React.ReactNode }
export declare const QuickAction: React.ForwardRefExoticComponent<QuickActionProps & React.RefAttributes<HTMLButtonElement>>;
export declare function QuickActions(props: { label?: string; className?: string; children?: React.ReactNode }): React.ReactElement;

/** Balance hero with a show/hide toggle. */
export interface BalanceProps { amount: string; label?: React.ReactNode; hidden?: boolean; defaultHidden?: boolean; onToggle?: (hidden: boolean) => void; className?: string }
export declare function Balance(props: BalanceProps): React.ReactElement;

/** WAI-ARIA menu button. */
export interface ActionMenuItem { label: string; icon?: IconRef; onSelect?: () => void; disabled?: boolean; danger?: boolean }
export interface ActionMenuProps { items: ActionMenuItem[]; label?: string; /** Custom trigger; spread the props it receives (ref and ARIA) onto a button. */ button?: (props: Record<string, any>) => React.ReactElement; align?: 'end' | 'start'; className?: string }
export declare function ActionMenu(props: ActionMenuProps): React.ReactElement;

/** Titled group of settings rows. */
export declare function SettingsList(props: { title?: React.ReactNode; className?: string; children?: React.ReactNode }): React.ReactElement;
export interface SettingsRowProps { label: React.ReactNode; icon?: IconRef; description?: React.ReactNode; value?: React.ReactNode; badge?: React.ReactNode; href?: string; onClick?: () => void;
  /** Turns the row into a switch row. */ toggle?: { checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void }; tone?: 'default' | 'danger'; disabled?: boolean }
export declare function SettingsRow(props: SettingsRowProps): React.ReactElement;

/** Label/value rows for summaries and receipts. */
export interface DetailItem { label: React.ReactNode; value: React.ReactNode; icon?: IconRef; /** Isolate left-to-right (amounts, card numbers). */ ltr?: boolean; /** Bold row with a divider, for totals. */ emphasis?: boolean }
export declare function DetailList(props: { items: DetailItem[]; className?: string }): React.ReactElement;

/** Filter pill: toggle (selected) or picker trigger (hasPopup). */
export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { label: React.ReactNode; selected?: boolean; hasPopup?: 'dialog' | 'listbox' | 'menu'; icon?: IconRef }
export declare function FilterChip(props: FilterChipProps): React.ReactElement;

/** Search input with a clear button. onChange receives the text. */
export interface SearchFieldProps { label?: string; placeholder?: string; value?: string; defaultValue?: string; onChange?: (value: string) => void; className?: string }
export declare function SearchField(props: SearchFieldProps): React.ReactElement;

/** Number pad: onKey receives "0"–"9", "." and "back". */
export interface NumberPadProps { onKey?: (key: string) => void; decimal?: boolean; label?: string; disabled?: boolean; className?: string }
export declare function NumberPad(props: NumberPadProps): React.ReactElement;
/** Applies a NumberPad key to an amount string (one point, two decimals, no leading zeros). */
export declare function padInput(value: string, key: string, maxDigits?: number): string;

/** Large amount entry with fee and limits. value is a plain number string, e.g. "1250.5". */
export interface AmountInputProps { value?: string; defaultValue?: string; onChange?: (value: string) => void; label?: React.ReactNode; currency?: string;
  /** 0 shows "Free". */ fee?: number | React.ReactNode; feeLabel?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; /** Driven by a NumberPad. */ readOnly?: boolean; id?: string; className?: string }
export declare function AmountInput(props: AmountInputProps): React.ReactElement;

export declare function MiniCard(props: { variant?: 'night' | 'brand'; className?: string }): React.ReactElement;

/** Choose one card (WAI-ARIA radio group). */
export interface PickerCard { value: string; last4: string; balance?: string; variant?: 'night' | 'brand'; note?: React.ReactNode; disabled?: boolean }
export interface CardPickerProps { cards: PickerCard[]; value?: string | null; defaultValue?: string | null; onChange?: (value: string, card: PickerCard) => void; label?: React.ReactNode; name?: string; className?: string }
export declare function CardPicker(props: CardPickerProps): React.ReactElement;

/** Sticky bottom actions for a flow step. */
export declare function ActionBar(props: { stacked?: boolean; className?: string; children?: React.ReactNode }): React.ReactElement;
/** Carousel position. */
export declare function PageDots(props: { count: number; current: number; label?: string; className?: string }): React.ReactElement;
/** End of a flow: success or failure. */
export declare function Result(props: { title: React.ReactNode; tone?: 'success' | 'danger'; action?: React.ReactNode; className?: string; children?: React.ReactNode }): React.ReactElement;


/* ---- Round 2 app components ---- */
export interface AvatarProps { initials?: string; src?: string; size?: 'sm' | 'md' | 'lg'; /** Accessible name when the avatar stands alone. */ label?: string; /** Small success dot (can receive, online). */ status?: boolean; className?: string }
export declare function Avatar(props: AvatarProps): React.ReactElement;
/** One-time code: one real input drawn as boxes (paste and SMS autofill work). Digits 0–9 only. */
export interface CodeInputProps { length?: number; value?: string; defaultValue?: string; onChange?: (code: string) => void; onComplete?: (code: string) => void; label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; autoFocus?: boolean; id?: string; className?: string }
export declare function CodeInput(props: CodeInputProps): React.ReactElement;
export declare function PasscodeDots(props: { length?: number; filled: number; error?: React.ReactNode; className?: string }): React.ReactElement;
export interface NotificationItemProps { title: React.ReactNode; time?: React.ReactNode; dateTime?: string; unread?: boolean; avatar?: React.ReactNode; icon?: string; actions?: React.ReactNode;
  /** How a request ended: a word and an icon. */ status?: { tone?: 'success' | 'danger' | 'warning' | 'neutral'; label: React.ReactNode }; className?: string; children?: React.ReactNode }
export declare function NotificationItem(props: NotificationItemProps): React.ReactElement;
export interface ServiceTileProps { label: React.ReactNode; description?: React.ReactNode; initials?: string; icon?: string; tone?: 'brand' | 'info' | 'success' | 'warning'; href?: string; onClick?: () => void; disabled?: boolean; className?: string }
export declare function ServiceTile(props: ServiceTileProps): React.ReactElement;
export interface StatCardProps { label: React.ReactNode; value: React.ReactNode; icon?: string; change?: { direction: 'up' | 'down' | 'flat'; value: string; label?: React.ReactNode; /** true: success colour, false: danger, undefined: neutral. */ good?: boolean }; className?: string }
export declare function StatCard(props: StatCardProps): React.ReactElement;
export declare function CopyCode(props: { code: string; label?: React.ReactNode; onCopy?: (code: string) => void; className?: string }): React.ReactElement;

/** A titled surface for part of a page. `flush` drops the body padding (for a table or list). */
export interface PanelProps { title?: React.ReactNode; description?: React.ReactNode; actions?: React.ReactNode; footer?: React.ReactNode; flush?: boolean; className?: string; children?: React.ReactNode }
export declare function Panel(props: PanelProps): React.ReactElement;
/** Page numbers for long tables. `page` is 1-based; give `pageCount`, or `total` and `pageSize` (which also shows "1–25 of 1,284"). */
export interface PaginationProps { page: number; pageCount?: number; total?: number; pageSize?: number; onChange?: (page: number) => void; label?: string; className?: string }
export declare function Pagination(props: PaginationProps): React.ReactElement;
/** How much of something is used (role="meter"). Tone defaults to brand, warning from 75%, danger from 90%. */
export interface MeterProps { value: number; max?: number; label?: React.ReactNode; valueText?: string; hint?: React.ReactNode; tone?: 'brand' | 'success' | 'warning' | 'danger'; 'aria-label'?: string; className?: string }
export declare function Meter(props: MeterProps): React.ReactElement;

declare global { interface Window { Areeba: { Button: typeof Button; TextField: typeof TextField; Switch: typeof Switch; Badge: typeof Badge; Alert: typeof Alert; Tabs: typeof Tabs; ListItem: typeof ListItem; List: typeof List; TabBar: typeof TabBar; Sidebar: typeof Sidebar; DataTable: typeof DataTable; Dialog: typeof Dialog; Toast: typeof Toast; PaymentCard: typeof PaymentCard; EmptyState: typeof EmptyState; Checkbox: typeof Checkbox; Select: typeof Select; Calendar: typeof Calendar; DatePicker: typeof DatePicker; LineChart: typeof LineChart; BarChart: typeof BarChart; ltr: typeof ltr;
  icons: typeof icons; IconButton: typeof IconButton; AppHeader: typeof AppHeader; QuickAction: typeof QuickAction; QuickActions: typeof QuickActions; Balance: typeof Balance; ActionMenu: typeof ActionMenu; SettingsList: typeof SettingsList; SettingsRow: typeof SettingsRow; DetailList: typeof DetailList; FilterChip: typeof FilterChip; SearchField: typeof SearchField; NumberPad: typeof NumberPad; padInput: typeof padInput; AmountInput: typeof AmountInput; MiniCard: typeof MiniCard; CardPicker: typeof CardPicker; ActionBar: typeof ActionBar; PageDots: typeof PageDots; Result: typeof Result;
  Avatar: typeof Avatar; CodeInput: typeof CodeInput; PasscodeDots: typeof PasscodeDots; NotificationItem: typeof NotificationItem; ServiceTile: typeof ServiceTile; StatCard: typeof StatCard; CopyCode: typeof CopyCode;
  TabPanel: typeof TabPanel; Panel: typeof Panel; Pagination: typeof Pagination; Meter: typeof Meter } } }
