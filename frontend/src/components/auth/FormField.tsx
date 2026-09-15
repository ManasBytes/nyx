import { InputHTMLAttributes } from "react";

export default function FormField({
  label,
  icon,
  ...inputProps
}: {
  label: string;
  icon?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-1.5 text-xs font-medium text-on-surface-variant">
      {label}
      <div className="grid">
        {icon && (
          <span className="material-symbols-outlined pointer-events-none relative top-2 z-10 col-start-1 row-start-1 flex w-10 self-center justify-center text-[19px] leading-none text-on-surface-variant">
            {icon}
          </span>
        )}
        <input
          {...inputProps}
          className={`col-start-1 row-start-1 w-full min-w-0 rounded-none border border-outline bg-surface px-3.5 py-2.5 font-mono text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary/80 focus:ring-1 focus:ring-primary/50 focus:outline-none ${icon ? "pl-10" : ""}`}
        />
      </div>
    </label>
  );
}
