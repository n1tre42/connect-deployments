import { Link } from '@tanstack/react-router'

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 rounded-md font-display text-xl font-extrabold tracking-tight outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-base text-primary-foreground shadow-sm">
        B
      </span>
      <span>
        Bac<span className="text-primary">It</span>
      </span>
    </Link>
  )
}
