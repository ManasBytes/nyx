import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 rounded px-1.5 py-0.5 font-mono text-label-sm whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      tone: {
        primary: "bg-primary-container/25 text-primary",
        secondary: "bg-secondary-container/25 text-secondary",
        tertiary: "bg-tertiary-container/20 text-tertiary",
        error: "bg-error-container/30 text-error",
        neutral: "bg-surface-container-highest text-on-surface-variant",
        outline: "bg-surface-container-highest text-outline",
        inverse: "bg-on-primary-container text-primary-fixed",
        solid: "bg-primary-container text-on-primary",
      },
      emphasis: {
        default: "",
        strong: "font-bold uppercase",
      },
    },
    defaultVariants: {
      tone: "neutral",
      emphasis: "default",
    },
  }
)

function Badge({
  className,
  tone,
  emphasis,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ tone, emphasis, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
