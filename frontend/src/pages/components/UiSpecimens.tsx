import { Fingerprint, Radar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Specimen, SpecimenGroup } from './Specimen'

const TONES = ['primary', 'secondary', 'tertiary', 'error', 'neutral', 'outline', 'inverse', 'solid'] as const
const VARIANTS = ['default', 'surface', 'primary-container', 'secondary-container', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const
const SIZES = ['xs', 'sm', 'default', 'lg'] as const

export function UiSpecimens() {
  return (
    <SpecimenGroup title="UI kit" subtitle="shadcn/ui primitives • src/components/ui">
      <Specimen name="Badge" note="tone + emphasis variants">
        <div className="flex flex-wrap gap-space-sm">
          {TONES.map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
          {TONES.slice(0, 4).map((tone) => (
            <Badge key={`${tone}-strong`} tone={tone} emphasis="strong">
              {tone} strong
            </Badge>
          ))}
        </div>
      </Specimen>
      <Specimen name="Button" note="variants and sizes">
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-wrap items-center gap-space-sm">
            {VARIANTS.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            {SIZES.map((size) => (
              <Button key={size} variant="surface" size={size}>
                <Fingerprint />
                size {size}
              </Button>
            ))}
            <Button size="icon" aria-label="Radar">
              <Radar />
            </Button>
          </div>
        </div>
      </Specimen>
      <Specimen name="Card / Input / Label / Textarea" note="form + container primitives">
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Card description on the surface-container-low token.</CardDescription>
            </CardHeader>
            <CardContent className="text-body-sm text-on-surface-variant">Card content slot.</CardContent>
          </Card>
          <div className="flex flex-col gap-space-sm">
            <Label htmlFor="specimen-input">Label</Label>
            <Input id="specimen-input" placeholder="Input placeholder" />
            <Textarea rows={3} placeholder="Textarea placeholder" />
          </div>
        </div>
      </Specimen>
    </SpecimenGroup>
  )
}
