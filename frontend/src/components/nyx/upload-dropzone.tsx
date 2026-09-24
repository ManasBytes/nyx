import { useRef, useState, type DragEvent } from 'react'
import { CloudUpload } from 'lucide-react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'

export function UploadDropzone({
  hint,
  onFiles,
}: {
  hint: string
  onFiles: (files: File[]) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [over, setOver] = useState(false)

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setOver(false)
    onFiles(Array.from(event.dataTransfer.files))
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      className={cn(
        'flex flex-col items-center gap-space-sm rounded-lg border border-dashed p-space-xl text-center transition-colors',
        over ? 'border-primary-container bg-surface-container' : 'border-outline-variant bg-surface-container-lowest'
      )}
    >
      <CloudUpload className="size-7 text-primary" />
      <div className="flex flex-col gap-0.5">
        <span className="text-title-sm text-on-surface">Drop files to stage them</span>
        <span className="font-mono text-label-sm text-outline">{hint}</span>
      </div>
      <Button type="button" variant="surface" onClick={() => inputRef.current?.click()}>
        Browse files
      </Button>
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={(event) => {
          onFiles(Array.from(event.target.files ?? []))
          event.target.value = ''
        }}
      />
    </div>
  )
}
