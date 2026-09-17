import type { ComponentProps, ReactNode } from 'react'
import { Search, type LucideIcon } from 'lucide-react'
import { cn } from 'cn'
import { Input } from '@/components/ui/input'

export function SearchField({
  icon: Icon = Search,
  trailing,
  className,
  ...props
}: ComponentProps<'input'> & { icon?: LucideIcon; trailing?: ReactNode }) {
  return (
    <div className="relative flex items-center">
      <Icon className="pointer-events-none absolute left-3 size-4.5 text-outline" />
      <Input
        type="search"
        className={cn(
          'h-auto rounded border-transparent bg-surface-container-lowest py-1.5 pl-9 text-body-sm text-on-surface placeholder:text-outline/70 focus-visible:border-transparent focus-visible:ring-1 focus-visible:ring-ring md:text-body-sm dark:bg-surface-container-lowest',
          trailing ? 'pr-20' : 'pr-3',
          className
        )}
        {...props}
      />
      {trailing ? <div className="absolute right-2 flex items-center">{trailing}</div> : null}
    </div>
  )
}
