import { FileText, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export type QueuedUpload = { id: string; name: string; size: number; status: string }

const formatSize = (bytes: number) =>
  bytes > 1_048_576 ? `${(bytes / 1_048_576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`

export function UploadQueueRow({
  upload,
  onRemove,
}: {
  upload: QueuedUpload
  onRemove?: (id: string) => void
}) {
  return (
    <div className="flex items-center justify-between gap-space-sm rounded bg-surface-container p-2.5">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded bg-surface-container-lowest text-secondary">
          <FileText className="size-4" />
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-title-sm font-medium text-on-surface">{upload.name}</span>
          <span className="font-mono text-label-sm text-outline">{formatSize(upload.size)}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-space-sm">
        <Badge tone="primary">{upload.status}</Badge>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={`Remove ${upload.name}`}
          onClick={() => onRemove?.(upload.id)}
        >
          <X />
        </Button>
      </div>
    </div>
  )
}
