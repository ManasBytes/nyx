import { CircleAlert, CircleCheck } from 'lucide-react'
import { cn } from 'cn'

export function FormAlert({ tone, children }: { tone: 'error' | 'success'; children: string }) {
  const Icon = tone === 'error' ? CircleAlert : CircleCheck

  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-space-xs rounded px-space-sm py-space-sm text-body-sm',
        tone === 'error'
          ? 'bg-error-container/30 text-error'
          : 'bg-tertiary-container/20 text-tertiary'
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  )
}
