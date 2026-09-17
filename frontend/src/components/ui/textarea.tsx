import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-w-0 rounded border border-transparent bg-surface-container p-space-md text-body-sm text-on-surface transition-colors outline-none placeholder:text-outline/70 focus-visible:bg-surface-container-high disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
