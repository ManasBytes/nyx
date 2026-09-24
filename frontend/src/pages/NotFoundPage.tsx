import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/nyx'

export function NotFoundPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-space-lg">
      <div className="w-full max-w-lg">
        <EmptyState
          icon={FileQuestion}
          eyebrow="404"
          title="This page does not exist"
          description="The address you opened is not part of this workspace. Check the link, or head back to your dashboard."
          action={
            <Button variant="primary-container" size="lg" asChild>
              <Link to="/">Back to my dashboard</Link>
            </Button>
          }
        />
      </div>
    </div>
  )
}
