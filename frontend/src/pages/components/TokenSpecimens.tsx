import { Specimen, SpecimenGroup } from './Specimen'

const SURFACES = [
  ['background', 'bg-background'],
  ['surface-container-lowest', 'bg-surface-container-lowest'],
  ['surface-container-low', 'bg-surface-container-low'],
  ['surface-container', 'bg-surface-container'],
  ['surface-container-high', 'bg-surface-container-high'],
  ['surface-container-highest', 'bg-surface-container-highest'],
  ['surface-bright', 'bg-surface-bright'],
  ['surface-variant', 'bg-surface-variant'],
]

const ACCENTS = [
  ['primary', 'bg-primary'],
  ['primary-container', 'bg-primary-container'],
  ['secondary', 'bg-secondary'],
  ['secondary-container', 'bg-secondary-container'],
  ['tertiary', 'bg-tertiary'],
  ['tertiary-container', 'bg-tertiary-container'],
  ['error', 'bg-error'],
  ['error-container', 'bg-error-container'],
  ['outline', 'bg-outline'],
  ['outline-variant', 'bg-outline-variant'],
  ['on-surface', 'bg-on-surface'],
  ['on-surface-variant', 'bg-on-surface-variant'],
]

const TYPE = [
  ['headline-xl', 'text-headline-xl font-heading'],
  ['headline-lg', 'text-headline-lg font-heading'],
  ['headline-md', 'text-headline-md font-heading'],
  ['title-sm', 'text-title-sm'],
  ['body-md', 'text-body-md'],
  ['body-sm', 'text-body-sm'],
  ['label-lg', 'text-label-lg font-mono'],
  ['label-md', 'text-label-md font-mono'],
  ['label-sm', 'text-label-sm font-mono'],
  ['telemetry-code', 'text-telemetry-code font-mono'],
]

export function TokenSpecimens() {
  return (
    <SpecimenGroup title="Design tokens" subtitle="Defined once in src/index.css">
      <Specimen name="Colors" note="Material tokens exposed as Tailwind utilities">
        <div className="flex flex-col gap-space-md">
          {[SURFACES, ACCENTS].map((set, index) => (
            <div key={index} className="grid grid-cols-2 gap-space-sm sm:grid-cols-4 lg:grid-cols-6">
              {set.map(([name, className]) => (
                <div key={name} className="flex flex-col gap-1">
                  <div className={`h-10 rounded ring-1 ring-surface-variant ${className}`} />
                  <span className="font-mono text-label-sm break-all text-outline">{name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Specimen>
      <Specimen name="Type scale" note="size, line-height, tracking and weight per token">
        <div className="flex flex-col gap-space-sm">
          {TYPE.map(([name, className]) => (
            <div key={name} className="flex flex-wrap items-baseline gap-space-md">
              <code className="w-40 shrink-0 font-mono text-label-sm text-outline">{name}</code>
              <span className={`text-on-surface ${className}`}>
                Central jurisdiction telemetry 0123456789
              </span>
            </div>
          ))}
        </div>
      </Specimen>
    </SpecimenGroup>
  )
}
