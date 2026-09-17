import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { AuthBrandRail } from './auth-brand-rail'

export function AuthLayout({
  eyebrow,
  title,
  subtitle,
  headline,
  blurb,
  footer,
  children,
}: {
  eyebrow: string
  title: string
  subtitle: string
  headline: string
  blurb: string
  footer?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-[1.1fr_1fr]">
      <AuthBrandRail headline={headline} blurb={blurb} />
      <main className="flex items-center justify-center p-space-lg">
        <div className="w-full max-w-md rounded-xl bg-surface-container-low p-space-xl shadow-md">
          <div className="mb-space-lg flex flex-col gap-space-xs">
            <Badge tone="primary" emphasis="strong" className="w-fit tracking-wider">
              {eyebrow}
            </Badge>
            <h1 className="font-heading text-headline-lg tracking-tight text-on-surface">{title}</h1>
            <p className="text-body-sm text-on-surface-variant">{subtitle}</p>
          </div>
          {children}
          {footer ? (
            <div className="mt-space-lg border-t border-surface-variant pt-space-md text-center text-body-sm text-on-surface-variant">
              {footer}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  )
}
