import { CodeXml, Database, Laptop, Network, Terminal } from 'lucide-react'

import { courseColor, type Course, type CourseIcon as IconName } from '@/data/courses'
import { cn } from '@/lib/utils'

const icons: Record<IconName, typeof Terminal> = {
  python: Terminal,
  database: Database,
  network: Network,
  html: CodeXml,
  device: Laptop,
}

export function CourseIcon({ course, className }: { course: Course; className?: string }) {
  const Icon = icons[course.icon]
  const color = courseColor(course)
  return (
    <span
      aria-hidden
      className={cn(
        'inline-grid size-11 shrink-0 place-items-center rounded-xl',
        className,
      )}
      style={{ color, background: `color-mix(in oklch, ${color} 14%, transparent)` }}
    >
      <Icon className="size-[55%]" strokeWidth={2} />
    </span>
  )
}
