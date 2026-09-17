import { cn } from 'cn'
import type { EvidenceAsset, Tone } from './types'

const tileClass: Record<Tone, string> = {
  primary: 'bg-primary-container/20 text-primary',
  secondary: 'bg-secondary-container/20 text-secondary',
  tertiary: 'bg-tertiary-container/20 text-tertiary',
  error: 'bg-error-container/20 text-error',
  neutral: 'bg-surface-container-highest text-on-surface-variant',
  outline: 'bg-surface-container-highest text-outline',
}

const statusClass: Record<Tone, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  error: 'text-error',
  neutral: 'text-on-surface-variant',
  outline: 'text-outline',
}

export function EvidenceAssetRow({
  asset,
  onOpen,
}: {
  asset: EvidenceAsset
  onOpen?: (id: string) => void
}) {
  const { icon: Icon } = asset

  return (
    <button
      type="button"
      onClick={() => onOpen?.(asset.id)}
      className="flex items-center justify-between gap-space-sm rounded bg-surface-container p-2.5 text-left transition-colors hover:bg-surface-container-high"
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span className={cn('flex size-7 shrink-0 items-center justify-center rounded', tileClass[asset.tone])}>
          <Icon className="size-4" />
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-title-sm font-medium text-on-surface">{asset.name}</span>
          <div className="flex items-center gap-1.5 font-mono text-label-sm text-outline">
            {asset.incidentCode ? (
              <span className="font-semibold text-primary">{asset.incidentCode}</span>
            ) : null}
            <span>{asset.incidentCode ? `• ${asset.note}` : asset.note}</span>
          </div>
        </div>
      </div>
      {asset.status ? (
        <span className={cn('shrink-0 font-mono text-label-sm font-semibold uppercase', statusClass[asset.status.tone ?? 'tertiary'])}>
          {asset.status.label}
        </span>
      ) : (
        <span className="shrink-0 font-mono text-label-sm text-outline">{asset.timeAgo}</span>
      )}
    </button>
  )
}
