import { InputHTMLAttributes } from "react";

export default function FormField({
  label,
  ...inputProps
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
      {label}
      <input
        {...inputProps}
        className="w-full min-w-0 rounded-lg border border-zinc-300 px-3 py-2.5 text-base font-normal text-zinc-950 focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
      />
    </label>
  );
}
