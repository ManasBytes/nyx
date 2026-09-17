import type { CSSProperties, ReactNode } from 'react'

export function AppShell({
  sidebar,
  header,
  sidebarWidth,
  topbarHeight,
  children,
}: {
  sidebar: ReactNode
  header: ReactNode
  sidebarWidth?: string
  topbarHeight?: string
  children: ReactNode
}) {
  const layout = {
    ...(sidebarWidth ? { '--spacing-sidebar': sidebarWidth } : {}),
    ...(topbarHeight ? { '--spacing-topbar': topbarHeight } : {}),
  } as CSSProperties

  return (
    <div className="min-h-svh bg-background pl-sidebar" style={layout}>
      {sidebar}
      {header}
      <main className="relative w-full px-gutter pt-topbar">
        <div className="flex w-full flex-col pb-12 text-on-surface">{children}</div>
      </main>
    </div>
  )
}
