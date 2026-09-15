import { ButtonHTMLAttributes, ReactNode } from "react";

const variantClasses = {
  success:
    "bg-tertiary text-slate-950 hover:bg-emerald-400 active:bg-emerald-500",
  warning: "bg-primary text-slate-950 hover:bg-amber-500 active:bg-amber-600",
  info: "bg-secondary text-slate-950 hover:bg-sky-400 active:bg-sky-500",
  danger: "bg-error text-slate-950 hover:bg-red-400 active:bg-red-500",
  neutral:
    "border border-outline bg-transparent text-on-surface-variant hover:text-on-surface",
};

type ButtonProps = {
  action?: "button" | "submit" | "reset";
  children: ReactNode;
  pending?: boolean;
  pendingLabel?: string;
  variant?: keyof typeof variantClasses;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export default function Button({
  action = "button",
  children,
  className = "",
  disabled,
  pending = false,
  pendingLabel,
  variant = "warning",
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      type={action}
      disabled={disabled || pending}
      className={`inline-flex items-center justify-center gap-2 rounded-none px-4 py-2.5 text-sm font-semibold shadow-[0_0_24px_rgba(245,158,11,0.25)] transition-all duration-150 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] disabled:opacity-60 ${variantClasses[variant]} ${className}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
