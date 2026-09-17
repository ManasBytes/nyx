import type { ComponentProps } from 'react'
import { cn } from 'cn'
import { Label } from '@/components/ui/label'

export function SelectField({
  id,
  label,
  options,
  placeholder = 'Select…',
  className,
  ...props
}: ComponentProps<'select'> & { id: string; label: string; options: string[]; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-space-xs">
      <Label htmlFor={id} className="font-mono text-label-sm tracking-wider text-outline uppercase">
        {label}
      </Label>
      <select
        id={id}
        className={cn(
          'w-full rounded border border-transparent bg-surface-container px-space-md py-space-sm text-body-md text-on-surface transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50',
          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
