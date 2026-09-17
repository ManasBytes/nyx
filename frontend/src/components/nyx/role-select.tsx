import { RadioGroup } from 'radix-ui'
import { cn } from 'cn'
import { ROLES, type Role } from '@/lib/roles'

export function RoleSelect({
  value,
  onValueChange,
  name = 'role',
}: {
  value: Role
  onValueChange: (role: Role) => void
  name?: string
}) {
  return (
    <div className="flex flex-col gap-space-xs">
      <span className="font-mono text-label-sm tracking-wider text-outline uppercase">
        Requesting Access As
      </span>
      <RadioGroup.Root
        name={name}
        value={value}
        onValueChange={(next) => onValueChange(next as Role)}
        className="grid grid-cols-1 gap-space-sm sm:grid-cols-3"
      >
        {ROLES.map((option) => (
          <RadioGroup.Item
            key={option.id}
            value={option.id}
            className={cn(
              'flex items-center gap-space-xs rounded bg-surface-container px-space-sm py-space-sm transition-colors',
              'hover:bg-surface-container-high focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
              'data-[state=checked]:bg-surface-container-high data-[state=checked]:ring-1 data-[state=checked]:ring-primary-container'
            )}
          >
            <option.icon className="size-4 shrink-0 text-primary" />
            <span className="text-title-sm text-on-surface">{option.label}</span>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  )
}
