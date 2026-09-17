import type { ComponentProps, ReactNode } from 'react'
import { cn } from 'cn'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AuthField({
  id,
  label,
  action,
  className,
  ...props
}: ComponentProps<'input'> & { id: string; label: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-space-xs">
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={id} className="font-mono text-label-sm tracking-wider text-outline uppercase">
          {label}
        </Label>
        {action}
      </div>
      <Input
        id={id}
        className={cn(
          'h-auto rounded border-transparent bg-surface-container px-space-md py-space-sm text-body-md text-on-surface transition-colors placeholder:text-outline/70 focus-visible:border-transparent focus-visible:ring-1 focus-visible:ring-ring md:text-body-md dark:bg-surface-container',
          className
        )}
        {...props}
      />
    </div>
  )
}
