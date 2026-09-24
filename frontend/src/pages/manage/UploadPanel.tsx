import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FormAlert,
  PanelHeader,
  SectionCard,
  UploadDropzone,
  UploadQueueRow,
  type QueuedUpload,
} from '@/components/nyx'

const HINT = 'CCTV, CDR sheets, seizure photos, forensic PDFs — up to 200 MB each'

export function UploadPanel({ scopeLabel }: { scopeLabel: string }) {
  const [queue, setQueue] = useState<QueuedUpload[]>([])

  function addFiles(files: File[]) {
    setQueue((prev) => [
      ...files.map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        size: file.size,
        status: 'Staged',
      })),
      ...prev,
    ])
  }

  return (
    <SectionCard className="rounded-xl shadow-md">
      <PanelHeader
        title="Upload & Staging"
        badge={<Badge tone="neutral">{scopeLabel}</Badge>}
        action={
          queue.length ? (
            <Button variant="ghost" size="xs" className="uppercase" onClick={() => setQueue([])}>
              Clear all
            </Button>
          ) : null
        }
      />
      <div className="flex flex-col gap-space-md">
        <UploadDropzone hint={HINT} onFiles={addFiles} />
        {queue.length ? (
          <>
            <div className="flex flex-col gap-space-xs">
              {queue.map((upload) => (
                <UploadQueueRow
                  key={upload.id}
                  upload={upload}
                  onRemove={(id) => setQueue((prev) => prev.filter((item) => item.id !== id))}
                />
              ))}
            </div>
            <FormAlert tone="success">
              {`${queue.length} file(s) staged on this device. They are attached to records once records sync is switched on.`}
            </FormAlert>
          </>
        ) : null}
      </div>
    </SectionCard>
  )
}
