import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 py-8 sm:py-10">
      <div className="max-w-reading space-y-2">
        {eyebrow && (
          <p className="text-xs font-semibold tracking-wider text-primary uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
        {description && <p className="text-muted-foreground text-pretty">{description}</p>}
      </div>
      {actions}
    </div>
  )
}
