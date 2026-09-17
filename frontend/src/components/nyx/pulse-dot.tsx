import { cn } from 'cn'
import type { Tone } from './types'

const toneClass: Record<Tone, string> = {
  primary: 'bg-primary-container',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  error: 'bg-error',
  neutral: 'bg-on-surface-variant',
  outline: 'bg-outline',
}

export function PulseDot({
  tone = 'tertiary',
  className,
}: {
  tone?: Tone
  className?: string
}) {
  return <span className={cn('size-2 shrink-0 rounded-full', toneClass[tone], 'animate-pulse', className)} />
}
