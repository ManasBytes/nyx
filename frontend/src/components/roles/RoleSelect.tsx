import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { roleLabel } from '@/lib/role-display'
import type { Role } from '@/lib/roles'

export function RoleSelect({
  roles,
  value,
  onChange,
}: {
  roles: Role[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="grid gap-2">
      <Label>Role</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.id} value={String(role.id)}>
              {roleLabel(role)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
