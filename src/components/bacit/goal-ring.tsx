import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function GoalRing({
  value,
  max,
  color = 'var(--primary)',
  size = 64,
  className,
  children,
}: {
  value: number
  max: number
  color?: string
  size?: number
  className?: string
  children?: ReactNode
}) {
  const r = size / 2 - 5
  const circumference = 2 * Math.PI * r
  const ratio = max ? Math.min(1, value / max) : 0
  return (
    <div
      className={cn('relative shrink-0', className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${value} din ${max}`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={7}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
          className="transition-[stroke-dashoffset] duration-500 motion-reduce:transition-none"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-xs font-bold">
        {children}
      </div>
    </div>
  )
}
