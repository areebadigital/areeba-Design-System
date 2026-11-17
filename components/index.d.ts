import type * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: the one main action per screen. secondary: alternatives. ghost: low-emphasis, toolbars. danger: destructive confirmations. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** sm 32px (SaaS dense only) · md 40px (SaaS default) · lg 48px (mobile default) */
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

export interface BadgeProps { tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'; dot?: boolean; className?: string; children?: React.ReactNode }
export declare function Badge(props: BadgeProps): React.ReactElement;

export interface AlertProps { tone?: 'info' | 'success' | 'warning' | 'danger'; title?: React.ReactNode; className?: string; children?: React.ReactNode }
export declare function Alert(props: AlertProps): React.ReactElement;

export interface TabsProps { items: { value: string; label: React.ReactNode }[]; value?: string; defaultValue?: string; onChange?: (value: string) => void; label?: string; className?: string }
export declare function Tabs(props: TabsProps): React.ReactElement;

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

export interface PaymentCardProps { last4: string; holder: string; expiry: string; network?: string; variant?: 'night' | 'brand'; frozen?: boolean; className?: string }
export declare function PaymentCard(props: PaymentCardProps): React.ReactElement;

export interface EmptyStateProps { title: React.ReactNode; action?: React.ReactNode; className?: string; children?: React.ReactNode }
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

export interface CalendarProps { value?: Date | null; onChange?: (d: Date) => void; today?: Date; min?: Date; max?: Date }
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
export declare function LineChart(props: ChartProps): React.ReactElement;
export declare function BarChart(props: ChartProps): React.ReactElement;

declare global { interface Window { Areeba: { Button: typeof Button; TextField: typeof TextField; Switch: typeof Switch; Badge: typeof Badge; Alert: typeof Alert; Tabs: typeof Tabs; ListItem: typeof ListItem; List: typeof List; TabBar: typeof TabBar; Sidebar: typeof Sidebar; DataTable: typeof DataTable; Dialog: typeof Dialog; Toast: typeof Toast; PaymentCard: typeof PaymentCard; EmptyState: typeof EmptyState; Checkbox: typeof Checkbox; Select: typeof Select; Calendar: typeof Calendar; DatePicker: typeof DatePicker; LineChart: typeof LineChart; BarChart: typeof BarChart } } }
